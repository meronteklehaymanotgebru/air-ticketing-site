// scripts/generate-airports.ts (run with ts-node)
import fs from 'fs';

const csv = await fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(r => r.text());
const airports = csv.split('\n')
  .filter(line => line.includes(',')) // skip empty
  .map(line => {
    const parts = line.split(',');
    return {
      code: parts[4].replace(/"/g, ''),
      city: parts[2].replace(/"/g, ''),
      country: parts[3].replace(/"/g, ''),
    };
  })
  .filter(a => a.code && a.city && a.country) // remove entries without IATA code
  .sort((a, b) => a.city.localeCompare(b.city));

fs.writeFileSync('public/airports.json', JSON.stringify(airports));