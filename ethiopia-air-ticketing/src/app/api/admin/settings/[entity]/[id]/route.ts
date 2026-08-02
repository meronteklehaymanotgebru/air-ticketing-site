import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function getModel(entity: string) {
  switch (entity) {
    case 'payment-modes': return prisma.paymentMode;
    case 'branch-offices': return prisma.branchOffice;
    case 'non-iata': return prisma.nonIata;
    case 'agent-codes': return prisma.agentCode;
    default: return null;
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  const model = getModel(entity);
  if (!model) return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
  
  try {
    const body = await req.json();
    const data = await (model as any).update({
      where: { id: id },
      data: body
    });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  const model = getModel(entity);
  if (!model) return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
  
  try {
    await (model as any).delete({ where: { id: id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
