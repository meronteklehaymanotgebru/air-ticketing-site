import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

import { logAuditAction } from "@/lib/audit";

export async function GET() {
  try {
    const expenses = await prisma.expenseRegister.findMany({
      include: {
        agentCode: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Failed to fetch expenses", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    
    // Ensure numeric types
    data.amount = parseFloat(data.amount);
    
    // Convert date string to ISO
    if (data.date) {
      data.date = new Date(data.date).toISOString();
    }
    
    data.createdById = session.id;

    const expense = await prisma.expenseRegister.create({
      data,
      include: {
        agentCode: true,
      },
    });
    
    await logAuditAction("CREATE", "ExpenseRegister", expense.id, `Created expense for ${expense.amount}`, session.id);
    
    return NextResponse.json(expense);
  } catch (error) {
    console.error("Failed to create expense", error);
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}
