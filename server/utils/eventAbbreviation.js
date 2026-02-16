/**
 * Event Abbreviation Generator
 * Generates consistent abbreviations for event names
 */

/**
 * Generate event abbreviation from event name
 * Rules:
 * - Convert to lowercase
 * - Remove special characters
 * - Multi-word: first letter of each word
 * - Single long word: first 3-4 characters
 * - Max length: 6 characters
 */
function generateEventAbbreviation(eventName) {
  if (!eventName || typeof eventName !== 'string') {
    return '';
  }

  // Convert to lowercase and remove special characters (keep spaces and hyphens)
  let cleaned = eventName.toLowerCase().replace(/[^a-z0-9\s-]/g, '');
  
  // Split by spaces or hyphens
  const words = cleaned.split(/[\s-]+/).filter(word => word.length > 0);
  
  let abbreviation = '';
  
  if (words.length === 0) {
    return '';
  } else if (words.length === 1) {
    // Single word: take first 3-4 characters
    const word = words[0];
    abbreviation = word.substring(0, Math.min(4, word.length));
  } else {
    // Multiple words: take first letter of each word
    abbreviation = words.map(word => word[0]).join('');
  }
  
  // Limit to 6 characters
  return abbreviation.substring(0, 6);
}

/**
 * Generate email from role and event abbreviation
 */
function generateEmail(role, eventAbbr = null) {
  if (role === 'core') {
    return 'core@techstorm.com';
  }
  
  if (!eventAbbr) {
    throw new Error('Event abbreviation required for coordinator and volunteer roles');
  }
  
  const prefix = role === 'coordinator' ? 'coord' : 'volt';
  return `${prefix}${eventAbbr}@techstorm.com`;
}

/**
 * Generate password from role and event abbreviation
 */
function generatePassword(role, eventAbbr = null) {
  if (role === 'core') {
    return 'sapbad@2026';
  }
  
  if (!eventAbbr) {
    throw new Error('Event abbreviation required for coordinator and volunteer roles');
  }
  
  const prefix = role === 'coordinator' ? 'coord' : 'volt';
  return `${prefix}${eventAbbr}`;
}

/**
 * Parse email to extract role and event abbreviation
 */
function parseEmail(email) {
  if (!email || typeof email !== 'string') {
    return null;
  }
  
  email = email.toLowerCase().trim();
  
  // Core user
  if (email === 'core@techstorm.com') {
    return {
      role: 'core',
      eventAbbr: null
    };
  }
  
  // Coordinator pattern: coord<eventAbbr>@techstorm.com
  const coordMatch = email.match(/^coord([a-z0-9]+)@techstorm\.com$/);
  if (coordMatch) {
    return {
      role: 'coordinator',
      eventAbbr: coordMatch[1]
    };
  }
  
  // Volunteer pattern: volt<eventAbbr>@techstorm.com
  const voltMatch = email.match(/^volt([a-z0-9]+)@techstorm\.com$/);
  if (voltMatch) {
    return {
      role: 'volunteer',
      eventAbbr: voltMatch[1]
    };
  }
  
  return null;
}

/**
 * Validate credentials
 */
function validateCredentials(email, password) {
  const parsed = parseEmail(email);
  if (!parsed) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  const expectedPassword = generatePassword(parsed.role, parsed.eventAbbr);
  
  if (password !== expectedPassword) {
    return { valid: false, error: 'Invalid password' };
  }
  
  return {
    valid: true,
    role: parsed.role,
    eventAbbr: parsed.eventAbbr
  };
}

module.exports = {
  generateEventAbbreviation,
  generateEmail,
  generatePassword,
  parseEmail,
  validateCredentials
};
