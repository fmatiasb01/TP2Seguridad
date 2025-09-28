// scripts/simulate-deploy.js
const fs = require('fs');
const pkg = require('../package.json');

console.log(`Simulated deploy of ${pkg.name} v${pkg.version}`);
console.log('Simulating build artifacts...');
// Simular creación de un artifact
const artifact = {
  deployedAt: new Date().toISOString(),
  version: pkg.version
};
fs.writeFileSync('deploy-artifact.json', JSON.stringify(artifact, null, 2));
console.log('deploy-artifact.json created.');
console.log('Simulated deployment complete.');
