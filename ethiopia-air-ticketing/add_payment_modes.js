const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const modes = [
  "CBE",
  "BOA",
  "CBE YT",
  "BOA YT",
  "CBE DT",
  "BOA DT",
  "Awash Bank",
  "Tele Birr",
  "Cash",
  "Ambessa Bank",
  "Dashen Bank",
  "Hibret Bank",
  "Wegagen Bank",
  "ZEMEN BANK",
  "Credit",
  "LMIS System",
  "Abay Bank",
  "Oromia Bank",
  "Tele Birr YT",
  "Brhan Bank",
  "Nib Bank",
  "Buna Bank",
  "CBE ASK"
];

async function main() {
  let count = 0;
  for (const name of modes) {
    try {
      await prisma.paymentMode.upsert({
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
  console.log(`\nSuccessfully added/verified ${count} Payment Modes.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
