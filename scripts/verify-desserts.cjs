const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/recipes.json', 'utf8'));
const checks = [
  ['FRA', 'Bretagne', 'Kouign-Amann'],
  ['FRA', 'Île-de-France', 'Paris-Brest'],
  ['ESP', 'Galicia', 'Tarta de Santiago'],
  ['ESP', 'Murcia', 'Paparajotes Murcianos'],
  ['ITA', 'Veneto', 'Tiramisù'],
  ['ITA', 'Sicilia', 'Cannoli'],
  ['GRC', 'Attica', 'Loukoumades'],
  ['GRC', 'Crete', 'Xerotigana'],
];
checks.forEach(([country, region, expected]) => {
  const d = data[country].regions[region].dessert;
  const found = d.dish.includes(expected);
  console.log((found ? '✓' : '✗') + ' ' + country + '/' + region + ': ' + d.dish);
});
const stats = fs.statSync('./src/recipes.json');
console.log('\nJSON file size: ' + (stats.size / 1024 / 1024).toFixed(2) + ' MB');
console.log('File is valid JSON: yes (parsed without errors)');
