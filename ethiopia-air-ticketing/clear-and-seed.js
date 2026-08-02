const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.ticketSale.deleteMany({});
  await prisma.refundRegister.deleteMany({});
  await prisma.expenseRegister.deleteMany({});

  console.log("Cleared existing records.");

  // get user
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found.");
    return;
  }

  const agent = await prisma.agentCode.findFirst({ where: { status: true }});
  const branch = await prisma.branchOffice.findFirst({ where: { status: true }});
  const paymentMode = await prisma.paymentMode.findFirst({ where: { status: true }});
  const nonIata = await prisma.nonIata.findFirst({ where: { status: true }});

  if (!agent || !branch || !paymentMode) {
    console.log("Missing required lookups.");
    return;
  }

  // Create 2 Sales
  await prisma.ticketSale.createMany({
    data: [
      {
        date: new Date(),
        sector: "ADD-DXB",
        pnr: "XYZ123",
        ticketNumber: "0712345678901",
        paymentModeId: paymentMode.id,
        ticketType: "New Ticket",
        grossPayment: 50000,
        systemFare: 48000,
        commission: 2000,
        phoneNumber: "0911223344",
        receiptIssued: true,
        ticketStatus: "Issued",
        agentCodeId: agent.id,
        nonIataId: nonIata?.id || null,
        airlineCode: "ET",
        passengerDocument: "P1234567",
        branchOfficeId: branch.id,
        tripType: "International",
        remark: "Test sale 1",
        createdById: user.id
      },
      {
        date: new Date(),
        sector: "ADD-JED",
        pnr: "ABC987",
        ticketNumber: "0712345678902",
        paymentModeId: paymentMode.id,
        ticketType: "Exchange",
        grossPayment: 15000,
        systemFare: 15000,
        commission: 0,
        phoneNumber: "0922334455",
        receiptIssued: false,
        ticketStatus: "Reissued",
        agentCodeId: agent.id,
        nonIataId: nonIata?.id || null,
        airlineCode: "SV",
        passengerDocument: "P9876543",
        branchOfficeId: branch.id,
        tripType: "International",
        remark: "Test sale 2",
        createdById: user.id
      }
    ]
  });

  // Create 2 Refunds
  await prisma.refundRegister.createMany({
    data: [
      {
        date: new Date(),
        agentCodeId: agent.id,
        airlineCode: "ET",
        refundAmount: 45000,
        nonIataId: nonIata?.id || null,
        phoneNumber: "0911223344",
        pnr: "XYZ123",
        ticketNumber: "0712345678901",
        passengerName: "Abebe Kebede",
        sector: "ADD-DXB",
        createdById: user.id
      },
      {
        date: new Date(),
        agentCodeId: agent.id,
        airlineCode: "EK",
        refundAmount: 12000,
        nonIataId: nonIata?.id || null,
        phoneNumber: "0933445566",
        pnr: "LMN456",
        ticketNumber: "1762345678903",
        passengerName: "Almaz Tesfaye",
        sector: "ADD-DXB",
        createdById: user.id
      }
    ]
  });

  // Create 2 Cashouts
  await prisma.expenseRegister.createMany({
    data: [
      {
        date: new Date(),
        amount: 500,
        reason: "Office Internet Bill",
        agentCodeId: agent.id,
        createdById: user.id
      },
      {
        date: new Date(),
        amount: 1200,
        reason: "Transport for dispatch",
        agentCodeId: agent.id,
        createdById: user.id
      }
    ]
  });

  console.log("Successfully re-seeded 2 Sales, 2 Refunds, and 2 Cashouts with ownership attached.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
