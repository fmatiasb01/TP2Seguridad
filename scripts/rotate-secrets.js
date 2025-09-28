// scripts/rotate-secrets.js
const crypto = require('crypto');
const fs = require('fs');

function generateApiKey() {
  return crypto.randomBytes(24).toString('hex');
}

function main() {
  const newKey = generateApiKey();
  const payload = {
    newOpenWeatherKey: newKey,
    generatedAt: new Date().toISOString()
  };

  // Guardar localmente en archivo que está en .gitignore para simulación
  fs.writeFileSync('secrets.json', JSON.stringify(payload, null, 2), { mode: 0o600 });
  console.log('Nuevo API key generado y almacenado en secrets.json (file ignored in git).');
  console.log('IMPORTANTE: No commitees este archivo. Actualizá el GitHub Secret OPENWEATHER_API_KEY con el nuevo valor.');
  console.log(`Valor (mostrar sólo para la demo): ${newKey}`);
  console.log('Para actualizar el secret en GitHub (recomendado usar la UI o gh CLI):');
  console.log('  gh secret set OPENWEATHER_API_KEY --body "<NEW_KEY>" --repo fmatiasb01/TP2Seguridad');
}

if (require.main === module) {
  main();
}

module.exports = { generateApiKey };
