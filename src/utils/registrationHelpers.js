/**
 * Registration Helper Utilities
 * Common functions for handling registration responses
 */

/**
 * Extract registration number from API response
 * Handles multiple possible response structures from the backend
 * 
 * @param {object} response - The API response object
 * @returns {string|null} The registration number or null if not found
 */
export const extractRegistrationNumber = (response) => {
  if (!response) {
    console.error('extractRegistrationNumber: Response is null or undefined');
    return null;
  }

  // Log the full response for debugging
  console.log('📋 Extracting registration number from response:', response);

  // Try multiple possible response structures
  // PRIORITY ORDER: registrationNumber first, then registrationId as fallback
  const possiblePaths = [
    response.data?.registrationNumber,           // { data: { registrationNumber: "..." } } - PREFERRED
    response.registrationNumber,                 // { registrationNumber: "..." }
    response.data?.registrationId,               // { data: { registrationId: "..." } } - FALLBACK (MongoDB _id)
    response.registrationId,                     // { registrationId: "..." }
    response.data?.registration?.registrationNumber, // { data: { registration: { registrationNumber: "..." } } }
    response.registration?.registrationNumber,   // { registration: { registrationNumber: "..." } }
    response.data?.registration?.registrationId, // { data: { registration: { registrationId: "..." } } }
    response.registration?.registrationId,       // { registration: { registrationId: "..." } }
    response.data?.regNumber,                    // Alternative field name
    response.regNumber,                          // Alternative field name
    response.data?.reg_number,                   // Snake case variant
    response.reg_number,                         // Snake case variant
    response.data?._id,                          // MongoDB ID as last resort
    response._id                                 // MongoDB ID as last resort
  ];

  // Find the first non-null, non-undefined value
  const registrationNumber = possiblePaths.find(path => 
    path !== null && path !== undefined && path !== ''
  );

  if (registrationNumber) {
    console.log('✅ Registration number found:', registrationNumber);
    return registrationNumber;
  }

  // If not found, log the response structure for debugging
  console.error('❌ Registration number not found in response');
  console.error('Response structure:', JSON.stringify(response, null, 2));
  
  return null;
};

/**
 * Validate registration number format
 * Expected format: EVENT-XXXXXXXX-XXX (e.g., "TEC-MLW3VXWZ-MPK")
 * 
 * @param {string} registrationNumber - The registration number to validate
 * @returns {boolean} True if valid format
 */
export const isValidRegistrationNumber = (registrationNumber) => {
  if (!registrationNumber || typeof registrationNumber !== 'string') {
    return false;
  }

  // Basic format check: XXX-XXXXXXXX-XXX
  const pattern = /^[A-Z]{3}-[A-Z0-9]{8}-[A-Z0-9]{3}$/;
  return pattern.test(registrationNumber);
};

/**
 * Format error message for registration failures
 * 
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export const formatRegistrationError = (error) => {
  const message = error?.message || '';

  if (message.includes('duplicate')) {
    return 'You have already registered for this event with this email or phone number.';
  }
  
  if (message.includes('validation')) {
    return 'Please check your form data and try again.';
  }
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'Network error. Please check your internet connection and try again.';
  }
  
  if (message.includes('Registration number not')) {
    return 'Registration was submitted but confirmation number was not generated. Please contact support.';
  }

  return message || 'Registration failed. Please try again.';
};
