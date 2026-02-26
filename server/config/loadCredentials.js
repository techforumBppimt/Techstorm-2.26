/**
 * Load role credentials from environment variables or JSON file
 * Priority: Environment variables > JSON file
 */
const fs = require('fs');
const path = require('path');

function loadCredentialsFromEnv() {
  const credentials = {
    core: [],
    coordinator: [],
    volunteer: []
  };

  // Load Core
  if (process.env.CORE_EMAIL && process.env.CORE_PASSWORD) {
    credentials.core.push({
      name: process.env.CORE_NAME || 'TechStorm Core Team',
      email: process.env.CORE_EMAIL,
      password: process.env.CORE_PASSWORD,
      role: 'core'
    });
  }

  // Event abbreviations
  const eventAbbrs = ['CB', 'HS', 'TM', 'OM', 'TH', 'RN', 'RC', 'RS', 'RT', 'CC', 'PR', 'FH', 'FM', 'KH', 'RU'];

  // Load Coordinators
  eventAbbrs.forEach(abbr => {
    const email = process.env[`COORD_${abbr}_EMAIL`];
    const password = process.env[`COORD_${abbr}_PASSWORD`];
    
    if (email && password) {
      credentials.coordinator.push({
        name: process.env[`COORD_${abbr}_NAME`] || `${abbr} Coordinator`,
        email,
        password,
        event: process.env[`COORD_${abbr}_EVENT`] || abbr,
        eventAbbr: (process.env[`COORD_${abbr}_ABBR`] || abbr).toLowerCase(),
        role: 'coordinator'
      });
    }
  });

  // Load Volunteers
  eventAbbrs.forEach(abbr => {
    const email = process.env[`VOLT_${abbr}_EMAIL`];
    const password = process.env[`VOLT_${abbr}_PASSWORD`];
    
    if (email && password) {
      credentials.volunteer.push({
        name: process.env[`VOLT_${abbr}_NAME`] || `${abbr} Volunteer`,
        email,
        password,
        event: process.env[`VOLT_${abbr}_EVENT`] || abbr,
        eventAbbr: (process.env[`VOLT_${abbr}_ABBR`] || abbr).toLowerCase(),
        role: 'volunteer'
      });
    }
  });

  return credentials;
}

function loadCredentialsFromFile() {
  try {
    const credentialsPath = path.join(__dirname, 'roleCredentials.json');
    if (fs.existsSync(credentialsPath)) {
      return JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading credentials from file:', error);
  }
  return null;
}

function getRoleCredentials() {
  // Try environment variables first
  const envCredentials = loadCredentialsFromEnv();
  
  // Check if we have at least core credentials from env
  if (envCredentials.core.length > 0) {
    console.log('✅ Using credentials from environment variables');
    return envCredentials;
  }
  
  // Fallback to JSON file
  console.log('⚠️  No environment variables found, falling back to roleCredentials.json');
  const fileCredentials = loadCredentialsFromFile();
  
  if (!fileCredentials) {
    throw new Error('No credentials found! Please set environment variables or create roleCredentials.json');
  }
  
  return fileCredentials;
}

module.exports = getRoleCredentials();
