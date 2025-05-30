#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

console.log('Starting database setup...');

const sqlFilePath = path.join(__dirname, '..', 'ci', 'create-db.sql');

// Execute MySQL command
const command = `sudo mysql -u root -p < ${sqlFilePath}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('Error setting up database.');
    console.error(error.message);
    process.exit(1);
  }

  console.log('Database setup completed successfully.');
  console.log('- Database \'freelance-template\' created');
  console.log('- User \'admin\' created and granted permissions');
  
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
});