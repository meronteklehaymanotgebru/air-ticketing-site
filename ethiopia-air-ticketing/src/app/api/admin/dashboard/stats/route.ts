import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "all";
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let dateFilter: any = undefined;
    const now = new Date();

    if (range === "today") {
      const start = new Date(now.setHours(0, 0, 0, 0));
      const end = new Date(now.setHours(23, 59, 59, 999));
      dateFilter = { gte: start, lte: end };
    } else if (range === "yesterday") {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const start = new Date(yesterday.setHours(0, 0, 0, 0));
      const end = new Date(yesterday.setHours(23, 59, 59, 999));
      dateFilter = { gte: start, lte: end };
    } else if (range === "month") {
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      monthAgo.setHours(0, 0, 0, 0);
      dateFilter = { gte: monthAgo };
    } else if (range === "custom" && from && to) {
      const start = new Date(from);
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      dateFilter = { gte: start, lte: end };
    }

    const dateWhereClause = dateFilter ? { date: dateFilter } : {};

    const salesStats = await prisma.ticketSale.aggregate({
      where: dateWhereClause,
      _sum: { grossPayment: true, commission: true },
      _count: { id: true }
    });

    const refundsStats = await prisma.refundRegister.aggregate({
      where: dateWhereClause,
      _sum: { refundAmount: true },
      _count: { id: true }
    });

    const expensesStats = await prisma.expenseRegister.aggregate({
      where: dateWhereClause,
      _sum: { amount: true },
      _count: { id: true }
    });

    // Recent Activity (fetch top 10 from each to ensure we get a good mix when combining)
    const recentSales = await prisma.ticketSale.findMany({
      where: dateWhereClause,
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { agentCode: true }
    });
    
    const recentRefunds = await prisma.refundRegister.findMany({
      where: dateWhereClause,
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { agentCode: true }
    });
    
    const recentExpenses = await prisma.expenseRegister.findMany({
      where: dateWhereClause,
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { agentCode: true }
    });

    const activityFeed = [
      ...recentSales.map(s => ({ type: 'SALE', id: s.id, date: s.createdAt, amount: s.grossPayment, user: s.agentCode?.code, desc: `Ticket ${s.ticketNumber} to ${s.sector}` })),
      ...recentRefunds.map(r => ({ type: 'REFUND', id: r.id, date: r.createdAt, amount: r.refundAmount, user: r.agentCode?.code, desc: `Refund ${r.ticketNumber} (${r.passengerName})` })),
      ...recentExpenses.map(e => ({ type: 'EXPENSE', id: e.id, date: e.createdAt, amount: e.amount, user: e.agentCode?.code, desc: e.reason }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

    // Chart Data: Last 7 Days Sales Trend (We keep this un-filtered so the chart always provides context)
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0,0,0,0);
      return d;
    });

    const trendData = [];
    for (let i = 0; i < last7Days.length; i++) {
      const start = last7Days[i];
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      
      const daySales = await prisma.ticketSale.aggregate({
        where: { date: { gte: start, lt: end } },
        _sum: { grossPayment: true }
      });
      
      trendData.push({
        name: start.toLocaleDateString('en-US', { weekday: 'short' }),
        sales: daySales._sum.grossPayment || 0
      });
    }

    // Chart Data: Airline Performance (Subject to date filter)
    const airlineGroups = await prisma.ticketSale.groupBy({
      by: ['airlineCode'],
      where: dateWhereClause,
      _sum: {
        grossPayment: true
      },
      orderBy: {
        _sum: { grossPayment: 'desc' }
      },
      take: 5
    });

    // Net Cash On Hand Calculation: Total Collected - Total Refunded - Total Expensed
    const grossSales = salesStats._sum.grossPayment || 0;
    const refunds = refundsStats._sum.refundAmount || 0;
    const expenses = expensesStats._sum.amount || 0;
    const commission = salesStats._sum.commission || 0;
    const netBalance = grossSales - refunds - expenses;

    return NextResponse.json({
      totals: {
        grossSales,
        commission,
        refunds,
        expenses,
        salesCount: salesStats._count.id,
        netBalance
      },
      activityFeed,
      trendData,
      airlineData: airlineGroups.map(g => ({ name: g.airlineCode, value: g._sum.grossPayment || 0 }))
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
