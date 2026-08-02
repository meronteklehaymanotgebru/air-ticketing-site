import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    const existing = await prisma.refundRegister.findUnique({ 
      where: { id },
      include: { createdBy: true }
    });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    const isCreator = existing.createdById === session.id;
    const isManagerOfBranch = session.role?.toUpperCase() === "MANAGER" && session.branch === existing.createdBy?.branch;

    if (session.role?.toUpperCase() !== "ADMIN" && !isCreator && !isManagerOfBranch) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    data.refundAmount = parseFloat(data.refundAmount);
    if (data.date) data.date = new Date(data.date).toISOString();

    delete data.id;
    delete data.createdById;
    delete data.createdAt;
    delete data.updatedAt;

    if (data.agentCodeId === "") delete data.agentCodeId;
    if (data.nonIataId === "") delete data.nonIataId;

    const updated = await prisma.refundRegister.update({
      where: { id },
      data,
      include: { agentCode: true, nonIata: true }
    });

    await logAuditAction("UPDATE", "RefundRegister", id, `Updated refund for PNR ${updated.pnr}`, session.id);

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    const existing = await prisma.refundRegister.findUnique({ 
      where: { id },
      include: { createdBy: true }
    });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    const isCreator = existing.createdById === session.id;
    const isManagerOfBranch = session.role?.toUpperCase() === "MANAGER" && session.branch === existing.createdBy?.branch;

    if (session.role?.toUpperCase() !== "ADMIN" && !isCreator && !isManagerOfBranch) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.refundRegister.delete({ where: { id } });
    
    await logAuditAction("DELETE", "RefundRegister", id, `Deleted refund for PNR ${existing.pnr}`, session.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
