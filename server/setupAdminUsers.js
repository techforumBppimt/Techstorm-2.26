const mongoose = require('mongoose');
const { User, ROLES } = require('./models/User');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupAdminUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Load role credentials from JSON file
    const credentialsPath = path.join(__dirname, 'roleCredentials.json');
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

    let created = 0;
    let skipped = 0;

    // Create Core user
    const existingCore = await User.findOne({ email: credentials.core.email });
    if (!existingCore) {
      const coreUser = new User({
        name: credentials.core.name,
        email: credentials.core.email,
        password: credentials.core.password,
        role: ROLES.CORE,
        department: 'Administration',
        isActive: true
      });
      await coreUser.save();
      console.log(`✅ Created: ${credentials.core.email}`);
      created++;
    } else {
      console.log(`⏭️  Skipped (exists): ${credentials.core.email}`);
      skipped++;
    }

    // Create Coordinators
    for (const [eventAbbr, coord] of Object.entries(credentials.coordinators)) {
      const existing = await User.findOne({ email: coord.email });
      if (!existing) {
        const coordUser = new User({
          name: coord.name,
          email: coord.email,
          password: coord.password,
          role: ROLES.COORDINATOR,
          eventName: coord.event,
          eventAbbr: eventAbbr,
          department: 'Event Coordination',
          isActive: true
        });
        await coordUser.save();
        console.log(`✅ Created: ${coord.email} (${coord.event})`);
        created++;
      } else {
        console.log(`⏭️  Skipped (exists): ${coord.email}`);
        skipped++;
      }
    }

    // Create Volunteers
    for (const [eventAbbr, volt] of Object.entries(credentials.volunteers)) {
      const existing = await User.findOne({ email: volt.email });
      if (!existing) {
        const voltUser = new User({
          name: volt.name,
          email: volt.email,
          password: volt.password,
          role: ROLES.VOLUNTEER,
          eventName: volt.event,
          eventAbbr: eventAbbr,
          department: 'Volunteer',
          isActive: true
        });
        await voltUser.save();
        console.log(`✅ Created: ${volt.email} (${volt.event})`);
        created++;
      } else {
        console.log(`⏭️  Skipped (exists): ${volt.email}`);
        skipped++;
      }
    }

    console.log('\n========================================');
    console.log('📊 Setup Summary:');
    console.log(`   Created: ${created} users`);
    console.log(`   Skipped: ${skipped} users (already exist)`);
    console.log('========================================\n');

    console.log('✅ All admin users are ready!');
    console.log('\n📝 Sample Login Credentials:');
    console.log('   Core: core@techstorm.com / CoreSecure2026!');
    console.log('   Coordinator (CodeBee): coordCB@techstorm.com / CoordCB2026!');
    console.log('   Volunteer (CodeBee): voltCB@techstorm.com / VoltCB2026!');
    console.log('\n🚀 You can now start the server and test the login!');

  } catch (error) {
    console.error('❌ Error setting up admin users:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

setupAdminUsers();
