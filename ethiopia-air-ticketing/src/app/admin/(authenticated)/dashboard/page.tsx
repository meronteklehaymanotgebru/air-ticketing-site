"use client";

import { useEffect, useState, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, RefreshCw, Wallet, ArrowDownRight, ArrowUpRight, Calendar, Calculator } from "lucide-react";

type DashboardStats = {
  totals: {
    grossSales: number;
    commission: number;
    refunds: number;
    expenses: number;
    salesCount: number;
    netBalance: number;
  };
  activityFeed: any[];
  trendData: any[];
  airlineData: any[];
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter States
  const [dateRange, setDateRange] = useState("today");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    let url = `/api/admin/dashboard/stats?range=${dateRange}`;
    if (dateRange === "custom" && dateFrom && dateTo) {
      url += `&from=${dateFrom}&to=${dateTo}`;
    }
    try {
      const res = await fetch(url);
      if (res.ok) {
        setStats(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, dateFrom, dateTo]);

  useEffect(() => {
    if (dateRange !== "custom" || (dateFrom && dateTo)) {
      fetchStats();
    }
  }, [fetchStats, dateRange, dateFrom, dateTo]);

  if (!stats) return (
    <div className="flex h-[80vh] items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-brand-gold rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-brand-900 rounded-full animate-bounce delay-75"></div>
      <div className="w-4 h-4 bg-brand-gold rounded-full animate-bounce delay-150"></div>
    </div>
  );

  const COLORS = ['#1e293b', '#fbbf24', '#3b82f6', '#ef4444', '#10b981', '#6366f1'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-500">
      
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-brand-900 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-brand-gold" />
            Shift Calculator & Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">Calculate exact totals for your shift closures</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={dateRange} 
              onChange={e => setDateRange(e.target.value)} 
              className="bg-transparent text-sm font-semibold outline-none text-gray-700 cursor-pointer"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="month">Last 30 Days</option>
              <option value="all">All Time</option>
              <option value="custom">Custom Date Range</option>
            </select>
          </div>

          {dateRange === "custom" && (
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                value={dateFrom} 
                onChange={e => setDateFrom(e.target.value)}
                className="bg-gray-50 border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <span className="text-gray-400">to</span>
              <input 
                type="date" 
                value={dateTo} 
                onChange={e => setDateTo(e.target.value)}
                className="bg-gray-50 border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-gold w-1/3 animate-pulse rounded-full"></div>
        </div>
      )}

      {/* Net Balance Calculator Card */}
      <div className="bg-brand-900 text-white rounded-2xl p-6 shadow-lg border border-brand-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-gray-300 font-semibold mb-1">Net Cash in Drawer Expected</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl md:text-5xl font-black text-white">{stats.totals.netBalance.toLocaleString()}</h2>
              <span className="text-xl text-brand-gold font-bold">ETB</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Formula: (Gross Sales) - (Refunds) - (Cash Out)
            </p>
          </div>
          
          {/* Mini breakdown inside the calculator card */}
          <div className="bg-black/20 rounded-xl p-4 w-full md:w-auto flex flex-col gap-2 min-w-[250px]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">+ Gross Sales</span>
              <span className="font-bold text-white">{stats.totals.grossSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">- Refunds</span>
              <span className="font-bold text-orange-400">{stats.totals.refunds.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">- Cash Out</span>
              <span className="font-bold text-red-400">{stats.totals.expenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-semibold text-gray-500">Gross Sales</p>
            <h3 className="text-2xl font-black text-blue-600 mt-1">{stats.totals.grossSales.toLocaleString()} <span className="text-sm font-medium text-gray-400">ETB</span></h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-semibold text-gray-500">Est. Profit (Commission)</p>
            <h3 className="text-2xl font-black text-green-600 mt-1">{stats.totals.commission.toLocaleString()} <span className="text-sm font-medium text-gray-400">ETB</span></h3>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-inner">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-semibold text-gray-500">Processed Refunds</p>
            <h3 className="text-2xl font-black text-orange-500 mt-1">{stats.totals.refunds.toLocaleString()} <span className="text-sm font-medium text-gray-400">ETB</span></h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shadow-inner">
            <RefreshCw className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-semibold text-gray-500">Total Cash Out</p>
            <h3 className="text-2xl font-black text-red-600 mt-1">{stats.totals.expenses.toLocaleString()} <span className="text-sm font-medium text-gray-400">ETB</span></h3>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shadow-inner">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-800 mb-6">Last 7 Days Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dx={-10} tickFormatter={(value) => `${value.toLocaleString()}`} />
                <Tooltip 
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                  formatter={(value: any) => [`${Number(value || 0).toLocaleString()} ETB`, 'Sales']}
                />
                <Line type="monotone" dataKey="sales" stroke="#1e293b" strokeWidth={4} dot={{ r: 5, fill: '#1e293b', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 7 }} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Airline Donut Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-800 mb-2">Airlines by Revenue (Filtered)</h3>
          <div className="flex-1 min-h-[250px]">
            {stats.airlineData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.airlineData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    animationDuration={1500}
                  >
                    {stats.airlineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => `${Number(value || 0).toLocaleString()} ETB`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p className="font-semibold text-sm">No sales data</p>
                <p className="text-xs mt-1">for selected date range</p>
              </div>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {stats.airlineData.map((a, i) => (
              <div key={a.name} className="flex items-center gap-2 text-xs font-bold bg-gray-50 p-2 rounded-lg border">
                <div className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="text-gray-700">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Activity Log (Filtered)</h3>
        </div>
        <div className="divide-y">
          {stats.activityFeed.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-gray-400">
              <RefreshCw className="w-12 h-12 mb-3 opacity-20" />
              <p className="font-semibold">No activity in this date range</p>
            </div>
          ) : (
            stats.activityFeed.map((item, idx) => (
              <div key={`${item.type}-${item.id}-${idx}`} className="p-5 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`w-12 h-12 rounded-xl shadow-inner flex items-center justify-center shrink-0 ${
                    item.type === 'SALE' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                    item.type === 'REFUND' ? 'bg-orange-50 text-orange-500 border border-orange-100' :
                    'bg-red-50 text-red-600 border border-red-100'
                  }`}>
                    {item.type === 'SALE' ? <ArrowUpRight className="w-6 h-6" /> :
                     item.type === 'REFUND' ? <RefreshCw className="w-6 h-6" /> :
                     <ArrowDownRight className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 flex flex-wrap items-center gap-2 text-base sm:text-lg">
                      {item.type} <span className="text-xs px-2 py-0.5 bg-gray-100 rounded border font-bold text-gray-600">By {item.user || 'System'}</span>
                    </p>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto pl-16 sm:pl-0">
                  <p className={`font-black text-xl group-hover:scale-105 transition-transform ${
                    item.type === 'SALE' ? 'text-blue-600' :
                    item.type === 'REFUND' ? 'text-orange-500' :
                    'text-red-600'
                  }`}>
                    {item.type === 'SALE' ? '+' : '-'}{item.amount.toLocaleString()} <span className="text-sm">ETB</span>
                  </p>
                  <p className="text-xs text-gray-400 font-semibold mt-1">
                    {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}