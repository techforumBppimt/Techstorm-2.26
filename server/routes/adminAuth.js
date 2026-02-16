const express = require('express');
const jwt = require('jsonwebtoken');
const { User, ROLES } = require('../models/User');
const { validateCredentials, parseEmail } = require('../utils/eventAbbreviation');
const adminCredentials = require('../config/adminCredentials.json');
const { asyncHandler } = require('../middleware/errorHandler');
const { securityLogger } = require('../middleware/logger');

const router = express.Router();

/**
 * Generate JWT token
 */
const generateToken = (userId, role, eventAbbr) => {
  return jwt.sign(
    { 
      userId,
      role,
      eventAbbr: eventAbbr || null
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

/**
 * Get all events with credentials info (for debugging/admin)
 * GET /api/admin-auth/events
 */
router.get('/events',
  asyncHandler(async (req, res) => {
    const events = adminCredentials.events.map(event => ({
      name: event.name,
      abbreviation: event.abbreviation,
      category: event.category,
      coordinator: {
        email: event.coordinator.email
      },
      volunteer: {
        email: event.volunteer.email
      }
    }));

    res.json({
      message: 'Events retrieved successfully',
      events,
      core: {
        email: adminCredentials.core.email
      },
      total: events.length
    });
  })
);

/**
 * Admin login endpoint
 * POST /api/admin-auth/login
 * Body: { email, password }
 */
router.post('/login',
  securityLogger('ADMIN_LOGIN_ATTEMPT'),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Email and password are required'
      });
    }

    // Parse email to get role and event abbreviation
    const parsed = parseEmail(email);
    
    if (!parsed) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email format for admin access'
      });
    }

    // Validate credentials against the pattern
    const validation = validateCredentials(email, password);
    
    if (!validation.valid) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials'
      });
    }

    // Find or create user in database
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Create new admin user
      const eventInfo = parsed.eventAbbr 
        ? adminCredentials.events.find(e => e.abbreviation === parsed.eventAbbr)
        : null;

      user = new User({
        name: parsed.role === 'core' 
          ? 'Core Administrator' 
          : `${parsed.role === 'coordinator' ? 'Coordinator' : 'Volunteer'} - ${eventInfo ? eventInfo.name : 'Unknown Event'}`,
        email: email.toLowerCase(),
        password: password,
        role: parsed.role,
        eventAbbr: parsed.eventAbbr,
        eventName: eventInfo ? eventInfo.name : null,
        department: 'Admin',
        isActive: true
      });

      await user.save();
      console.log(`✅ New admin user created: ${email} (${parsed.role})`);
    } else {
      // Verify user is not locked
      if (user.isLocked) {
        return res.status(423).json({
          error: 'Account locked',
          message: 'Account is temporarily locked due to multiple failed login attempts'
        });
      }

      // Verify user is active
      if (!user.isActive) {
        return res.status(401).json({
          error: 'Account deactivated',
          message: 'Your account has been deactivated'
        });
      }

      // Reset login attempts on successful login
      await user.resetLoginAttempts();
    }

    // Generate token
    const token = generateToken(user._id, user.role, user.eventAbbr);

    // Prepare response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      eventAbbr: user.eventAbbr,
      eventName: user.eventName,
      isActive: user.isActive,
      lastLogin: new Date(),
      permissions: user.getPermissions()
    };

    console.log(`✅ Admin login successful: ${email} (${user.role})`);

    res.json({
      message: 'Login successful',
      user: userResponse,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  })
);

/**
 * Verify admin token and get current admin info
 * GET /api/admin-auth/verify
 * Headers: Authorization: Bearer <token>
 */
router.get('/verify',
  asyncHandler(async (req, res) => {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Authentication token is required'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({
          error: 'Invalid token',
          message: 'User not found'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          error: 'Account deactivated',
          message: 'Your account has been deactivated'
        });
      }

      res.json({
        valid: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          eventAbbr: user.eventAbbr,
          eventName: user.eventName,
          permissions: user.getPermissions()
        }
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Token expired',
          message: 'Your session has expired. Please login again.'
        });
      }
      
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Authentication token is invalid'
      });
    }
  })
);

/**
 * Admin logout
 * POST /api/admin-auth/logout
 */
router.post('/logout',
  securityLogger('ADMIN_LOGOUT'),
  asyncHandler(async (req, res) => {
    // JWT logout is handled client-side by removing the token
    // This endpoint is for logging purposes
    res.json({
      message: 'Logout successful'
    });
  })
);

/**
 * Get admin credentials for a specific event (debugging only - should be removed in production)
 * GET /api/admin-auth/credentials/:eventAbbr
 */
router.get('/credentials/:eventAbbr',
  asyncHandler(async (req, res) => {
    const { eventAbbr } = req.params;
    
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        error: 'Not available in production',
        message: 'This endpoint is not available in production'
      });
    }

    const event = adminCredentials.events.find(e => e.abbreviation === eventAbbr);
    
    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
        message: `No event found with abbreviation: ${eventAbbr}`
      });
    }

    res.json({
      event: event.name,
      abbreviation: event.abbreviation,
      coordinator: event.coordinator,
      volunteer: event.volunteer
    });
  })
);

/**
 * Helper function to extract token from request
 */
function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  if (req.cookies && req.cookies.adminToken) {
    return req.cookies.adminToken;
  }
  
  return null;
}

module.exports = router;
