const express = require('express');
const { 
  authenticateAdmin,
  requireCoreRole,
  requireCoordinatorRole,
  requireVolunteerRole,
  requireCoreOrCoordinator,
  requireAnyAdminRole,
  requireOwnEventAccess,
  logAdminAction
} = require('../middleware/adminAuth');
const { asyncHandler } = require('../middleware/errorHandler');
const adminCredentials = require('../config/adminCredentials.json');

const router = express.Router();

/**
 * All routes require admin authentication
 */
router.use(authenticateAdmin);

/**
 * Get admin dashboard data
 * GET /api/admin/dashboard
 * Access: All authenticated admins
 */
router.get('/dashboard',
  requireAnyAdminRole,
  logAdminAction('VIEW_DASHBOARD'),
  asyncHandler(async (req, res) => {
    const admin = req.admin;
    
    const dashboardData = {
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        event: admin.eventName,
        permissions: admin.getPermissions()
      },
      accessLevel: {
        canCreate: admin.canCreate(),
        canRead: admin.canRead(),
        canUpdate: admin.canUpdate(),
        canDelete: admin.canDelete()
      },
      timestamp: new Date().toISOString()
    };

    // Core users get full system stats
    if (admin.role === 'core') {
      dashboardData.systemStats = {
        totalEvents: adminCredentials.events.length,
        totalAdmins: adminCredentials.metadata.totalAdmins
      };
    } else {
      // Event-specific data
      const eventInfo = adminCredentials.events.find(
        e => e.abbreviation === admin.eventAbbr
      );
      dashboardData.eventInfo = eventInfo || null;
    }

    res.json({
      message: 'Dashboard data retrieved successfully',
      data: dashboardData
    });
  })
);

/**
 * Core-only routes
 * GET /api/admin/core/*
 */
router.get('/core/stats',
  requireCoreRole,
  logAdminAction('VIEW_CORE_STATS'),
  asyncHandler(async (req, res) => {
    res.json({
      message: 'Core administrator statistics',
      stats: {
        events: adminCredentials.events.map(e => ({
          name: e.name,
          abbreviation: e.abbreviation,
          category: e.category
        })),
        totalEvents: adminCredentials.events.length,
        metadata: adminCredentials.metadata
      }
    });
  })
);

router.post('/core/create-event',
  requireCoreRole,
  logAdminAction('CREATE_EVENT'),
  asyncHandler(async (req, res) => {
    // Example: Core can create new events
    const { eventName, category } = req.body;

    if (!eventName || !category) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Event name and category are required'
      });
    }

    // In a real implementation, you would save to database
    res.json({
      message: 'Event creation initiated (Core only)',
      event: {
        name: eventName,
        category: category,
        createdBy: req.admin.email,
        timestamp: new Date().toISOString()
      }
    });
  })
);

/**
 * Coordinator routes
 * GET /api/admin/coordinator/*
 */
router.get('/coordinator/event-data',
  requireCoordinatorRole,
  requireOwnEventAccess,
  logAdminAction('VIEW_EVENT_DATA'),
  asyncHandler(async (req, res) => {
    const eventInfo = adminCredentials.events.find(
      e => e.abbreviation === req.admin.eventAbbr
    );

    res.json({
      message: 'Event data retrieved successfully',
      event: {
        name: eventInfo.name,
        abbreviation: eventInfo.abbreviation,
        category: eventInfo.category,
        coordinator: req.admin.name
      },
      permissions: {
        canUpdate: req.admin.canUpdate(),
        canRead: req.admin.canRead(),
        canCreate: req.admin.canCreate(),
        canDelete: req.admin.canDelete()
      }
    });
  })
);

router.put('/coordinator/update-event/:eventAbbr',
  requireCoordinatorRole,
  requireOwnEventAccess,
  logAdminAction('UPDATE_EVENT_DATA'),
  asyncHandler(async (req, res) => {
    const { eventAbbr } = req.params;
    const updates = req.body;

    // Verify coordinator can only update their own event
    if (eventAbbr !== req.admin.eventAbbr) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'You can only update your assigned event'
      });
    }

    res.json({
      message: 'Event updated successfully (Coordinator)',
      event: eventAbbr,
      updates: updates,
      updatedBy: req.admin.email,
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * Volunteer routes (Read-only)
 * GET /api/admin/volunteer/*
 */
router.get('/volunteer/event-info',
  requireVolunteerRole,
  requireOwnEventAccess,
  logAdminAction('VIEW_EVENT_INFO'),
  asyncHandler(async (req, res) => {
    const eventInfo = adminCredentials.events.find(
      e => e.abbreviation === req.admin.eventAbbr
    );

    res.json({
      message: 'Event information retrieved successfully',
      event: {
        name: eventInfo.name,
        abbreviation: eventInfo.abbreviation,
        category: eventInfo.category
      },
      volunteer: req.admin.name,
      permissions: {
        canRead: req.admin.canRead(),
        canUpdate: req.admin.canUpdate(),
        canCreate: req.admin.canCreate(),
        canDelete: req.admin.canDelete()
      },
      note: 'Volunteers have read-only access'
    });
  })
);

/**
 * Test permission enforcement
 * These routes demonstrate the permission system
 */
router.post('/test/create',
  requireAnyAdminRole,
  asyncHandler(async (req, res) => {
    if (!req.admin.canCreate()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'Your role does not have CREATE permission',
        role: req.admin.role,
        permissions: req.admin.getPermissions()
      });
    }

    res.json({
      message: 'CREATE operation allowed',
      performedBy: req.admin.email,
      role: req.admin.role
    });
  })
);

router.put('/test/update',
  requireAnyAdminRole,
  asyncHandler(async (req, res) => {
    if (!req.admin.canUpdate()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'Your role does not have UPDATE permission',
        role: req.admin.role,
        permissions: req.admin.getPermissions()
      });
    }

    res.json({
      message: 'UPDATE operation allowed',
      performedBy: req.admin.email,
      role: req.admin.role
    });
  })
);

router.delete('/test/delete',
  requireAnyAdminRole,
  asyncHandler(async (req, res) => {
    if (!req.admin.canDelete()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'Your role does not have DELETE permission',
        role: req.admin.role,
        permissions: req.admin.getPermissions()
      });
    }

    res.json({
      message: 'DELETE operation allowed',
      performedBy: req.admin.email,
      role: req.admin.role
    });
  })
);

/**
 * Get all events (accessible by all admin roles)
 * GET /api/admin/events
 */
router.get('/events',
  requireAnyAdminRole,
  logAdminAction('VIEW_EVENTS_LIST'),
  asyncHandler(async (req, res) => {
    let events = adminCredentials.events;

    // Filter for event-specific admins
    if (req.admin.role !== 'core') {
      events = events.filter(e => e.abbreviation === req.admin.eventAbbr);
    }

    res.json({
      message: 'Events retrieved successfully',
      events: events.map(e => ({
        name: e.name,
        abbreviation: e.abbreviation,
        category: e.category
      })),
      total: events.length
    });
  })
);

module.exports = router;
