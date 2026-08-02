import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

import { logAuditAction } from "@/lib/audit";

export async function GET() {
  try {
    const sales = await prisma.ticketSale.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        paymentMode: true,
        branchOffice: true,
        agentCode: true,
        nonIata: true,
      }
    });
    return NextResponse.json(sales);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    
    // Parse numeric values and dates
    const data = {
      ...body,
      date: new Date(body.date),
      grossPayment: parseFloat(body.grossPayment),
      systemFare: parseFloat(body.systemFare),
      commission: parseFloat(body.commission),
      receiptIssued: Boolean(body.receiptIssued),
      createdById: session.id,
    };

    // If nonIataId is empty string, make it null
    if (!data.nonIataId) {
      delete data.nonIataId;
    }

    // Validate passenger document for specific airlines
    const requiredAirlines = ["MS", "FZ", "SV"];
    const airlineCode = data.airlineCode?.toUpperCase() || "";
    if (requiredAirlines.includes(airlineCode)) {
      if (!data.passengerDocument || data.passengerDocument.trim() === "") {
        return NextResponse.json(
          { error: `Passenger document is required for airline ${airlineCode}` },
          { status: 400 }
        );
      }
    }

    const sale = await prisma.ticketSale.create({ data });
    
    await logAuditAction("CREATE", "TicketSale", sale.id, `Created sale for PNR ${sale.pnr}`, session.id);
    
    return NextResponse.json(sale);
  } catch (err: any) {
    console.error("Sales API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
