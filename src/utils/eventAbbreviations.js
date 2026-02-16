/**
 * Event Abbreviation Generator
 * Converts event names to abbreviations following specific rules
 */

/**
 * Generate event abbreviation from event name
 * @param {string} eventName - The full event name
 * @returns {string} - The generated abbreviation (max 6 chars)
 */
export const generateEventAbbr = (eventName) => {
  if (!eventName || typeof eventName !== 'string') {
    return '';
  }

  // Convert to lowercase
  let cleaned = eventName.toLowerCase();
  
  // Remove special characters (keep only letters, numbers, and spaces)
  cleaned = cleaned.replace(/[^a-z0-9\s]/g, '');
  
  // Split by spaces
  const words = cleaned.split(/\s+/).filter(word => word.length > 0);
  
  let abbr = '';
  
  if (words.length === 0) {
    return '';
  } else if (words.length === 1) {
    // Single word - take first 3-4 characters
    const word = words[0];
    abbr = word.substring(0, Math.min(4, word.length));
  } else {
    // Multiple words - take first letter of each word
    abbr = words.map(word => word.charAt(0)).join('');
  }
  
  // Limit to max 6 characters
  abbr = abbr.substring(0, 6);
  
  return abbr;
};

/**
 * Generate coordinator email from event abbreviation
 * @param {string} eventAbbr - Event abbreviation
 * @returns {string} - Coordinator email
 */
export const generateCoordEmail = (eventAbbr) => {
  return `coord${eventAbbr}@techstorm.com`;
};

/**
 * Generate coordinator password from event abbreviation
 * @param {string} eventAbbr - Event abbreviation
 * @returns {string} - Coordinator password
 */
export const generateCoordPassword = (eventAbbr) => {
  return `coord${eventAbbr}`;
};

/**
 * Generate volunteer email from event abbreviation
 * @param {string} eventAbbr - Event abbreviation
 * @returns {string} - Volunteer email
 */
export const generateVolunteerEmail = (eventAbbr) => {
  return `volt${eventAbbr}@techstorm.com`;
};

/**
 * Generate volunteer password from event abbreviation
 * @param {string} eventAbbr - Event abbreviation
 * @returns {string} - Volunteer password
 */
export const generateVolunteerPassword = (eventAbbr) => {
  return `volt${eventAbbr}`;
};

/**
 * Extract event abbreviation from email
 * @param {string} email - The email address
 * @returns {string|null} - Event abbreviation or null
 */
export const extractEventAbbrFromEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return null;
  }
  
  // Match coord<abbr>@techstorm.com or volt<abbr>@techstorm.com
  const coordMatch = email.match(/^coord([a-z0-9]+)@techstorm\.com$/i);
  if (coordMatch) {
    return coordMatch[1].toLowerCase();
  }
  
  const voltMatch = email.match(/^volt([a-z0-9]+)@techstorm\.com$/i);
  if (voltMatch) {
    return voltMatch[1].toLowerCase();
  }
  
  return null;
};

/**
 * Determine role from email
 * @param {string} email - The email address
 * @returns {string|null} - Role (core, coordinator, volunteer) or null
 */
export const getRoleFromEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return null;
  }
  
  const lowerEmail = email.toLowerCase();
  
  if (lowerEmail === 'core@techstorm.com') {
    return 'core';
  }
  
  if (lowerEmail.startsWith('coord') && lowerEmail.endsWith('@techstorm.com')) {
    return 'coordinator';
  }
  
  if (lowerEmail.startsWith('volt') && lowerEmail.endsWith('@techstorm.com')) {
    return 'volunteer';
  }
  
  return null;
};

/**
 * Validate credential format
 * @param {string} email - Email address
 * @param {string} password - Password
 * @param {string} role - Expected role
 * @returns {boolean} - Whether format is valid
 */
export const validateCredentialFormat = (email, password, role) => {
  const detectedRole = getRoleFromEmail(email);
  
  if (detectedRole !== role) {
    return false;
  }
  
  if (role === 'core') {
    return email === 'core@techstorm.com' && password === 'sapbad@2026';
  }
  
  const eventAbbr = extractEventAbbrFromEmail(email);
  if (!eventAbbr) {
    return false;
  }
  
  if (role === 'coordinator') {
    return password === `coord${eventAbbr}`;
  }
  
  if (role === 'volunteer') {
    return password === `volt${eventAbbr}`;
  }
  
  return false;
};

export default {
  generateEventAbbr,
  generateCoordEmail,
  generateCoordPassword,
  generateVolunteerEmail,
  generateVolunteerPassword,
  extractEventAbbrFromEmail,
  getRoleFromEmail,
  validateCredentialFormat
};
