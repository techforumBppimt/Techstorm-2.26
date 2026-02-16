const jwt = require('jsonwebtoken');
const { User, ROLES } = require('../models/User');

/**
 * Middleware to authenticate admin users
 */
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Admin authentication required'
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token - admin user not found'
      });
    }

    // Verify user is an admin (has one of the three roles)
    if (!Object.values(ROLES).includes(user.role)) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'User does not have admin privileges'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Admin account is deactivated'
      });
    }

    if (user.isLocked) {
      return res.status(401).json({
        error: 'Account locked',
        message: 'Account is temporarily locked'
      });
    }

    // Add user to request object
    req.admin = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      eventAbbr: user.eventAbbr,
      eventName: user.eventName,
      isActive: user.isActive,
      getPermissions: user.getPermissions.bind(user),
      hasPermission: user.hasPermission.bind(user),
      canCreate: user.canCreate.bind(user),
      canRead: user.canRead.bind(user),
      canUpdate: user.canUpdate.bind(user),
      canDelete: user.canDelete.bind(user)
    };

    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid admin token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Session expired',
        message: 'Admin session has expired. Please login again.'
      });
    }
    
    return res.status(500).json({
      error: 'Authentication failed',
      message: 'Internal server error during authentication'
    });
  }
};

/**
 * Middleware to ensure user can only access their own role routes
 * Usage: requireOwnRole('core') or requireOwnRole('coordinator')
 */
const requireOwnRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in as an admin'
      });
    }

    if (req.admin.role !== requiredRole) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: `This route is restricted to ${requiredRole} role only. Your role: ${req.admin.role}`,
        yourRole: req.admin.role,
        requiredRole: requiredRole
      });
    }

    next();
  };
};

/**
 * Middleware to ensure Core role access only
 */
const requireCoreRole = requireOwnRole(ROLES.CORE);

/**
 * Middleware to ensure Coordinator role access only
 */
const requireCoordinatorRole = requireOwnRole(ROLES.COORDINATOR);

/**
 * Middleware to ensure Volunteer role access only
 */
const requireVolunteerRole = requireOwnRole(ROLES.VOLUNTEER);

/**
 * Middleware to allow Core OR Coordinator access
 */
const requireCoreOrCoordinator = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'You must be logged in as an admin'
    });
  }

  if (req.admin.role !== ROLES.CORE && req.admin.role !== ROLES.COORDINATOR) {
    return res.status(403).json({
      error: 'Access forbidden',
      message: 'This route is restricted to Core or Coordinator roles only',
      yourRole: req.admin.role,
      requiredRoles: [ROLES.CORE, ROLES.COORDINATOR]
    });
  }

  next();
};

/**
 * Middleware to allow any admin role access
 */
const requireAnyAdminRole = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'You must be logged in as an admin'
    });
  }

  next();
};

/**
 * Middleware to ensure admin can only access their own event data
 * (for coordinator and volunteer roles)
 */
const requireOwnEventAccess = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'You must be logged in as an admin'
    });
  }

  // Core users have access to all events
  if (req.admin.role === ROLES.CORE) {
    return next();
  }

  // Extract event abbreviation from route params or query
  const eventAbbr = req.params.eventAbbr || req.query.eventAbbr || req.body.eventAbbr;

  if (!eventAbbr) {
    return res.status(400).json({
      error: 'Bad request',
      message: 'Event abbreviation is required'
    });
  }

  // Check if admin's event matches the requested event
  if (req.admin.eventAbbr !== eventAbbr) {
    return res.status(403).json({
      error: 'Access forbidden',
      message: 'You can only access data for your assigned event',
      yourEvent: req.admin.eventName,
      requestedEvent: eventAbbr
    });
  }

  next();
};

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

/**
 * Middleware to log admin actions for audit
 */
const logAdminAction = (action) => {
  return (req, res, next) => {
    if (req.admin) {
      console.log(`[ADMIN ACTION] ${action}`, {
        admin: req.admin.email,
        role: req.admin.role,
        event: req.admin.eventName || 'N/A',
        timestamp: new Date().toISOString(),
        ip: req.ip,
        method: req.method,
        path: req.path
      });
    }
    next();
  };
};

module.exports = {
  authenticateAdmin,
  requireOwnRole,
  requireCoreRole,
  requireCoordinatorRole,
  requireVolunteerRole,
  requireCoreOrCoordinator,
  requireAnyAdminRole,
  requireOwnEventAccess,
  logAdminAction
};
