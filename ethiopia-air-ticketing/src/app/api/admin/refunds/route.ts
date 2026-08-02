import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

import { logAuditAction } from "@/lib/audit";

export async function GET() {
  try {
    const refunds = await prisma.refundRegister.findMany({
      include: {
        agentCode: true,
        nonIata: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(refunds);
  } catch (error) {
    console.error("Failed to fetch refunds", error);
    return NextResponse.json({ error: "Failed to fetch refunds" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    
    // Ensure numeric types
    data.refundAmount = parseFloat(data.refundAmount);
    
    // Convert date string to ISO
    if (data.date) {
      data.date = new Date(data.date).toISOString();
    }
    
    data.createdById = session.id;

    const refund = await prisma.refundRegister.create({
      data,
      include: {
        agentCode: true,
        nonIata: true,
      },
    });
    
    await logAuditAction("CREATE", "RefundRegister", refund.id, `Created refund for PNR ${refund.pnr}`, session.id);
    
    return NextResponse.json(refund);
  } catch (error) {
    console.error("Failed to create refund", error);
    return NextResponse.json({ error: "Failed to create refund" }, { status: 500 });
  }
}
