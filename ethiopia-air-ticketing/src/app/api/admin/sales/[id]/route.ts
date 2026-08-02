import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    // Check authorization
    const existing = await prisma.ticketSale.findUnique({ 
      where: { id },
      include: { branchOffice: true }
    });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    const isCreator = existing.createdById === session.id;
    const isManagerOfBranch = session.role?.toUpperCase() === "MANAGER" && session.branch === existing.branchOffice.name;

    if (session.role?.toUpperCase() !== "ADMIN" && !isCreator && !isManagerOfBranch) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const data = {
      ...body,
      date: new Date(body.date),
      grossPayment: parseFloat(body.grossPayment),
      systemFare: parseFloat(body.systemFare),
      commission: parseFloat(body.commission),
      receiptIssued: Boolean(body.receiptIssued),
    };
    if (data.nonIataId === "") data.nonIataId = null;
    if (data.agentCodeId === "") delete data.agentCodeId; // Should not happen since required, but safeguard
    if (data.branchOfficeId === "") delete data.branchOfficeId;
    if (data.paymentModeId === "") delete data.paymentModeId;
    
    // Don't update tracking fields
    delete data.id;
    delete data.createdById;
    delete data.createdAt;
    delete data.updatedAt;

    // Validate passenger document for specific airlines
    const requiredAirlines = ["MS", "FZ", "SV"];
    const airlineCode = data.airlineCode?.toUpperCase() || existing.airlineCode?.toUpperCase() || "";
    if (requiredAirlines.includes(airlineCode)) {
      if (!data.passengerDocument || data.passengerDocument.trim() === "") {
        return NextResponse.json(
          { error: `Passenger document is required for airline ${airlineCode}` },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.ticketSale.update({
      where: { id },
      data,
      include: {
        paymentMode: true,
        branchOffice: true,
        agentCode: true,
        nonIata: true,
      }
    });

    await logAuditAction("UPDATE", "TicketSale", id, `Updated sale for PNR ${updated.pnr}`, session.id);

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    const existing = await prisma.ticketSale.findUnique({ 
      where: { id },
      include: { branchOffice: true }
    });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    const isCreator = existing.createdById === session.id;
    const isManagerOfBranch = session.role?.toUpperCase() === "MANAGER" && session.branch === existing.branchOffice.name;

    if (session.role?.toUpperCase() !== "ADMIN" && !isCreator && !isManagerOfBranch) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.ticketSale.delete({ where: { id } });
    
    await logAuditAction("DELETE", "TicketSale", id, `Deleted sale for PNR ${existing.pnr}`, session.id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
