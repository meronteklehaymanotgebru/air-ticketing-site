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

export async function GET(req: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const model = getModel(entity);
  if (!model) return NextResponse.json({ error: "Invalid entity" }, { status: 400 });

  try {
    const data = await (model as any).findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const model = getModel(entity);
  if (!model) return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
  
  try {
    const body = await req.json();
    const data = await (model as any).create({ data: body });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
