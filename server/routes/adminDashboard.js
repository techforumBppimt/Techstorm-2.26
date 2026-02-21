const express = require('express');
const { authenticateAdmin } = require('../middleware/adminAuth');
const { asyncHandler } = require('../middleware/errorHandler');
const EventRegistrationFactory = require('../models/EventRegistration');
const adminCredentials = require('../config/adminCredentials.json');

const router = express.Router();

/**
 * All routes require admin authentication
 */
router.use(authenticateAdmin);

/**
 * Get dashboard statistics
 * GET /api/admin-dashboard/stats
 */
router.get('/stats',
  asyncHandler(async (req, res) => {
    const admin = req.admin;
    
    // Get all events from credentials
    const allEvents = adminCredentials.events;
    
    // Filter events based on role
    let eventsToQuery = allEvents;
    if (admin.role !== 'core' && admin.eventAbbr) {
      eventsToQuery = allEvents.filter(e => e.abbreviation === admin.eventAbbr);
    }
    
    // Fetch statistics for each event
    const eventStats = await Promise.all(
      eventsToQuery.map(async (event) => {
        try {
          const model = EventRegistrationFactory.getModel(event.name);
          
          const [
            totalRegistrations,
            confirmedRegistrations,
            pendingRegistrations,
            pendingPayments,
            confirmedPayments
          ] = await Promise.all([
            model.countDocuments(),
            model.countDocuments({ registrationStatus: 'confirmed' }),
            model.countDocuments({ registrationStatus: 'pending' }),
            model.countDocuments({ paymentStatus: 'pending' }),
            model.countDocuments({ paymentStatus: 'verified' })
          ]);
          
          return {
            eventName: event.name,
            eventAbbr: event.abbreviation,
            category: event.category,
            totalRegistrations,
            confirmedRegistrations,
            pendingRegistrations,
            pendingPayments,
            confirmedPayments
          };
        } catch (error) {
          console.error(`Error fetching stats for ${event.name}:`, error);
          return {
            eventName: event.name,
            eventAbbr: event.abbreviation,
            category: event.category,
            totalRegistrations: 0,
            confirmedRegistrations: 0,
            pendingRegistrations: 0,
            pendingPayments: 0,
            confirmedPayments: 0
          };
        }
      })
    );
    
    // Calculate totals
    const totals = eventStats.reduce((acc, stat) => ({
      totalRegistrations: acc.totalRegistrations + stat.totalRegistrations,
      confirmedRegistrations: acc.confirmedRegistrations + stat.confirmedRegistrations,
      pendingRegistrations: acc.pendingRegistrations + stat.pendingRegistrations,
      pendingPayments: acc.pendingPayments + stat.pendingPayments,
      confirmedPayments: acc.confirmedPayments + stat.confirmedPayments
    }), {
      totalRegistrations: 0,
      confirmedRegistrations: 0,
      pendingRegistrations: 0,
      pendingPayments: 0,
      confirmedPayments: 0
    });
    
    res.json({
      message: 'Dashboard statistics retrieved successfully',
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        eventName: admin.eventName,
        eventAbbr: admin.eventAbbr
      },
      totals,
      eventStats,
      totalEvents: eventsToQuery.length
    });
  })
);

/**
 * Get all registrations with filters
 * GET /api/admin-dashboard/registrations
 */
router.get('/registrations',
  asyncHandler(async (req, res) => {
    const admin = req.admin;
    const { 
      eventName, 
      search, 
      paymentStatus, 
      registrationStatus,
      page = 1,
      limit = 50
    } = req.query;
    
    // Get all events from credentials
    const allEvents = adminCredentials.events;
    
    // Filter events based on role
    let eventsToQuery = allEvents;
    if (admin.role !== 'core' && admin.eventAbbr) {
      eventsToQuery = allEvents.filter(e => e.abbreviation === admin.eventAbbr);
    }
    
    // Further filter by specific event if requested
    if (eventName && eventName !== 'all') {
      eventsToQuery = eventsToQuery.filter(e => e.name === eventName);
    }
    
    // Fetch registrations from all relevant events
    const allRegistrations = [];
    
    for (const event of eventsToQuery) {
      try {
        const model = EventRegistrationFactory.getModel(event.name);
        
        // Build query
        const query = {};
        
        if (paymentStatus) {
          query.paymentStatus = paymentStatus;
        }
        
        if (registrationStatus) {
          query.registrationStatus = registrationStatus;
        }
        
        if (search) {
          query.$or = [
            { fullName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { emailAddress: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { contactNumber: { $regex: search, $options: 'i' } },
            { registrationNumber: { $regex: search, $options: 'i' } }
          ];
        }
        
        const registrations = await model
          .find(query)
          .sort({ submittedAt: -1 })
          .select('-paymentReceiptData -paymentScreenshotData -cashReceiptData -idProofData -idFileData')
          .lean();
        
        // Add event name to each registration
        registrations.forEach(reg => {
          reg.eventName = event.name;
          reg.eventAbbr = event.abbreviation;
        });
        
        allRegistrations.push(...registrations);
      } catch (error) {
        console.error(`Error fetching registrations for ${event.name}:`, error);
      }
    }
    
    // Sort all registrations by date
    allRegistrations.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedRegistrations = allRegistrations.slice(skip, skip + parseInt(limit));
    
    res.json({
      message: 'Registrations retrieved successfully',
      registrations: paginatedRegistrations,
      pagination: {
        total: allRegistrations.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(allRegistrations.length / parseInt(limit))
      }
    });
  })
);

/**
 * Get single registration details
 * GET /api/admin-dashboard/registrations/:id
 */
router.get('/registrations/:eventName/:id',
  asyncHandler(async (req, res) => {
    const { eventName, id } = req.params;
    const admin = req.admin;
    
    // Check if admin has access to this event
    if (admin.role !== 'core') {
      const event = adminCredentials.events.find(e => e.name === eventName);
      if (!event || event.abbreviation !== admin.eventAbbr) {
        return res.status(403).json({
          error: 'Access forbidden',
          message: 'You do not have access to this event'
        });
      }
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    const registration = await model.findById(id).lean();
    
    if (!registration) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Registration not found'
      });
    }
    
    res.json({
      message: 'Registration retrieved successfully',
      registration
    });
  })
);

/**
 * Update registration (full update)
 * PUT /api/admin-dashboard/registrations/:eventName/:id
 */
router.put('/registrations/:eventName/:id',
  asyncHandler(async (req, res) => {
    const { eventName, id } = req.params;
    const admin = req.admin;
    
    // Check permissions
    if (!admin.canUpdate()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to update registrations'
      });
    }
    
    // Check if admin has access to this event
    if (admin.role !== 'core') {
      const event = adminCredentials.events.find(e => e.name === eventName);
      if (!event || event.abbreviation !== admin.eventAbbr) {
        return res.status(403).json({
          error: 'Access forbidden',
          message: 'You do not have access to this event'
        });
      }
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    
    // Update with all provided fields
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };
    
    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.registrationNumber;
    delete updateData.submittedAt;
    delete updateData.createdAt;
    delete updateData.__v;
    
    const registration = await model.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    
    if (!registration) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Registration not found'
      });
    }
    
    res.json({
      message: 'Registration updated successfully',
      registration
    });
  })
);

/**
 * Update registration status (partial update)
 * PATCH /api/admin-dashboard/registrations/:eventName/:id
 */
router.patch('/registrations/:eventName/:id',
  asyncHandler(async (req, res) => {
    const { eventName, id } = req.params;
    const { paymentStatus, registrationStatus } = req.body;
    const admin = req.admin;
    
    // Check permissions
    if (!admin.canUpdate()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to update registrations'
      });
    }
    
    // Check if admin has access to this event
    if (admin.role !== 'core') {
      const event = adminCredentials.events.find(e => e.name === eventName);
      if (!event || event.abbreviation !== admin.eventAbbr) {
        return res.status(403).json({
          error: 'Access forbidden',
          message: 'You do not have access to this event'
        });
      }
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    
    const updateData = {};
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (registrationStatus) updateData.registrationStatus = registrationStatus;
    updateData.updatedAt = new Date();
    
    const registration = await model.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).lean();
    
    if (!registration) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Registration not found'
      });
    }
    
    res.json({
      message: 'Registration updated successfully',
      registration
    });
  })
);

/**
 * Delete registration
 * DELETE /api/admin-dashboard/registrations/:eventName/:id
 */
router.delete('/registrations/:eventName/:id',
  asyncHandler(async (req, res) => {
    const { eventName, id } = req.params;
    const admin = req.admin;
    
    // Check permissions
    if (!admin.canDelete()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to delete registrations'
      });
    }
    
    // Check if admin has access to this event
    if (admin.role !== 'core') {
      const event = adminCredentials.events.find(e => e.name === eventName);
      if (!event || event.abbreviation !== admin.eventAbbr) {
        return res.status(403).json({
          error: 'Access forbidden',
          message: 'You do not have access to this event'
        });
      }
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    const registration = await model.findByIdAndDelete(id);
    
    if (!registration) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Registration not found'
      });
    }
    
    res.json({
      message: 'Registration deleted successfully',
      deletedId: id
    });
  })
);

/**
 * Create new registration (Core only)
 * POST /api/admin-dashboard/registrations/:eventName
 */
router.post('/registrations/:eventName',
  asyncHandler(async (req, res) => {
    const { eventName } = req.params;
    const admin = req.admin;
    
    // Check permissions
    if (!admin.canCreate()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to create registrations'
      });
    }
    
    // Check if admin has access to this event
    if (admin.role !== 'core') {
      const event = adminCredentials.events.find(e => e.name === eventName);
      if (!event || event.abbreviation !== admin.eventAbbr) {
        return res.status(403).json({
          error: 'Access forbidden',
          message: 'You do not have access to this event'
        });
      }
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    
    // Add metadata
    const registrationData = {
      ...req.body,
      eventName,
      source: 'admin',
      submittedAt: new Date()
    };
    
    const registration = new model(registrationData);
    await registration.save();
    
    res.status(201).json({
      message: 'Registration created successfully',
      registration
    });
  })
);

/**
 * Get events list
 * GET /api/admin-dashboard/events
 */
router.get('/events',
  asyncHandler(async (req, res) => {
    const admin = req.admin;
    
    let events = adminCredentials.events;
    
    // Filter for event-specific admins
    if (admin.role !== 'core' && admin.eventAbbr) {
      events = events.filter(e => e.abbreviation === admin.eventAbbr);
    }
    
    res.json({
      message: 'Events retrieved successfully',
      events: events.map(e => ({
        name: e.name,
        abbreviation: e.abbreviation,
        category: e.category
      }))
    });
  })
);

module.exports = router;
