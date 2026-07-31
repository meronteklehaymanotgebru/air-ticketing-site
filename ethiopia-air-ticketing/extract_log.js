const fs = require('fs');
const readline = require('readline');

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\HP\\.gemini\\antigravity\\brain\\9b3beb77-8ebe-45ca-b092-3c0f9406d620\\.system_generated\\logs\\transcript_full.jsonl');
  
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('SERVICES_DATA') && line.includes('ethiopia-air-ticketing/src/app/services/page.tsx')) {
      const obj = JSON.parse(line);
      if (obj.content && obj.content.includes('SERVICES_DATA')) {
        fs.writeFileSync('extracted_services.txt', obj.content);
        console.log('Found and extracted to extracted_services.txt');
        return;
      }
    }
  }
  console.log('Not found');
}

extract();
