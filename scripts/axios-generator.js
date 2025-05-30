#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

console.log('Generating TypeScript API client from Swagger...');

const swaggerPath = path.join(__dirname, '..', 'swagger.json');
const outputPath = path.join(__dirname, '..', 'web', 'api');

exec(`npx openapi-typescript-codegen --input ${swaggerPath} --output ${outputPath} --client axios`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating API client: ${error.message}`);
    process.exit(1);
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  
  console.log(stdout);
  console.log('✅ API client generated successfully');
});