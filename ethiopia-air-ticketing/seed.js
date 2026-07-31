const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst({ where: { email: 'admin@flyethiopia.com' } });
  if (existing) {
    console.log('Admin already exists.');
    return;
  }
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@flyethiopia.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'ADMIN',
      branch: 'Headquarters',
    },
  });
  console.log('Admin user created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
