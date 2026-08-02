const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const agencies = [
  "ABDIHOYO TRAVEL",
  "AFLAX TRAVEL",
  "AL RAHEN TRAVEL",
  "ALPHA TRAVEL",
  "ALWAYS TRAVEL",
  "ASK TRAVEL",
  "AYEZEN TRAVEL",
  "BAKOS TRAVEL",
  "DEAL TRAVEL",
  "DORUK TRAVEL",
  "DREAM TRAVEL",
  "ELSH TRAVEL",
  "FLAMINGO TRAVEL",
  "GENET TRAVEL",
  "GURXAN TRAVEL",
  "HABESHA HUB TRAVEL",
  "HOST ETHIOPIAN TRAVEL",
  "HUSINA TRAVEL",
  "KEGNA TRAVEL",
  "LEO TRAVEL",
  "LINA TRAVEL",
  "MA TRAVEL",
  "MAKS TRAVEL",
  "MARBI TRAVEL",
  "NICOLAS TRAVEL",
  "NOLAWI TRAVEL",
  "ORIGINE TRAVEL",
  "PEGASUS TRAVEL",
  "PISSA TRAVEL",
  "RAKI TRAVEL",
  "SAN TRAVEL",
  "STELLAR TRAVEL",
  "VISION TRAVEL",
  "YEAB TRAVEL",
  "ZANTA TRAVEL"
];

async function main() {
  let count = 0;
  for (const name of agencies) {
    try {
      await prisma.nonIata.upsert({
        where: { name: name },
        update: {},
        create: { name: name, status: true }
      });
      console.log("Added: " + name);
      count++;
    } catch (e) {
      console.log("Failed to add: " + name, e.message);
    }
  }
  console.log(`\nSuccessfully added/verified ${count} NON IATA entries.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
