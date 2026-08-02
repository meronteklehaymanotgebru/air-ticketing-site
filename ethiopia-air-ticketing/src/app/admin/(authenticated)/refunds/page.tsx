"use client";

import { useEffect, useState } from"react";
import toast from"react-hot-toast";
import { Plus, X, Search, FileText, Download, Pencil, Trash2 } from"lucide-react";

type LookupItem = { id: string; name?: string; code?: string; status: boolean };

const AIRLINES = ["ET","EK","EY","FZ","G9","KQ","MS","QR","SV","TK","XY", // Original"AA","DL","UA","AC","WS","AM", // North America"BA","AF","LH","KL","IB","AZ","LX","OS","SK","AY","TP","EI","LO","SU", // Europe"SQ","CX","JL","NH","QF","NZ","CA","CZ","MU","BR","CI","KE","OZ", // Asia Pacific"AI","TG","MH","PR","VN","GA", // South & SE Asia"GF","WY","KU","RJ","ME","LY","SA","AT","WB","DT" // ME & Africa
].sort();

const ITEMS_PER_PAGE = 10;

export default function RefundRegister() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [refunds, setRefunds] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lookups
  const [nonIata, setNonIata] = useState<LookupItem[]>([]);
  const [agentCodes, setAgentCodes] = useState<LookupItem[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAirline, setFilterAirline] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  // Export State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportDateRange, setExportDateRange] = useState("today");
  const [exportDateFrom, setExportDateFrom] = useState("");
  const [exportDateTo, setExportDateTo] = useState("");
  const [exportFormat, setExportFormat] = useState("excel");

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    agentCodeId:"",
    airlineCode:"ET",
    refundAmount:"",
    nonIataId:"",
    phoneNumber:"",
    pnr:"",
    ticketNumber:"",
    passengerName:"",
    sector:"",
  });

  useEffect(() => {
    fetchLookups();
    fetchRefunds();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch("/api/admin/me");
    if (res.ok) setCurrentUser(await res.json());
  };

  const filteredRefunds = refunds.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || (
      r.pnr.toLowerCase().includes(q) ||
      r.ticketNumber.toLowerCase().includes(q) ||
      r.sector.toLowerCase().includes(q) ||
      r.passengerName.toLowerCase().includes(q) ||
      (r.phoneNumber ||"").toLowerCase().includes(q) ||
      (r.agentCode?.code ||"").toLowerCase().includes(q) ||
      (r.nonIata?.name ||"").toLowerCase().includes(q)
    );

    const matchesAirline = !filterAirline || r.airlineCode === filterAirline;

    let matchesDate = true;
    if (filterDateFrom && filterDateTo) {
      const d = new Date(r.date);
      matchesDate = d >= new Date(filterDateFrom) && d <= new Date(filterDateTo + 'T23:59:59');
    }

    return matchesSearch && matchesAirline && matchesDate;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterAirline, filterDateFrom, filterDateTo]);

  const totalPages = Math.ceil(filteredRefunds.length / ITEMS_PER_PAGE);
  const paginatedRefunds = filteredRefunds.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const fetchLookups = async () => {
    try {
      const [niRes, acRes] = await Promise.all([
        fetch("/api/admin/settings/non-iata"),
        fetch("/api/admin/settings/agent-codes"),
      ]);
      if (niRes.ok) setNonIata(await niRes.json());
      if (acRes.ok) setAgentCodes(await acRes.json());
    } catch (e) {
      console.error("Failed to fetch lookups", e);
    }
  };

  const fetchRefunds = async () => {
    const res = await fetch("/api/admin/refunds");
    if (res.ok) setRefunds(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/admin/refunds/${editingId}` :"/api/admin/refunds";
    const method = editingId ?"PUT" :"POST";
    const res = await fetch(url, {
      method,
      headers: {"Content-Type":"application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success(`Refund ${editingId ?"updated" :"recorded"} successfully!`);
      setIsModalOpen(false);
      setEditingId(null);
      fetchRefunds();
      // Reset form but keep date
      setFormData({
        ...formData,
        refundAmount:"",
        phoneNumber:"",
        pnr:"",
        ticketNumber:"",
        passengerName:"",
        sector:"",
      });
    } else {
      toast.error(`Failed to ${editingId ?"update" :"record"} refund.`);
    }
  };

  const handleEdit = (r: any) => {
    setEditingId(r.id);
    setFormData({
      date: new Date(r.date).toISOString().split("T")[0],
      agentCodeId: r.agentCodeId ||"",
      airlineCode: r.airlineCode ||"ET",
      refundAmount: r.refundAmount?.toString() ||"",
      nonIataId: r.nonIataId ||"",
      phoneNumber: r.phoneNumber ||"",
      pnr: r.pnr ||"",
      ticketNumber: r.ticketNumber ||"",
      passengerName: r.passengerName ||"",
      sector: r.sector ||"",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4 min-w-[250px]">
          <div className="flex flex-col gap-1">
            <p className="font-extrabold text-gray-900 text-base">Delete Refund Record?</p>
            <p className="text-sm text-gray-500 font-medium">This action cannot be undone.</p>
          </div>
          <div className="flex gap-2 justify-end mt-1">
            <button
              className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-bold shadow-sm shadow-red-500/20 hover:bg-red-600 transition-colors"
              onClick={async () => {
                toast.dismiss(t.id);
                const res = await fetch(`/api/admin/refunds/${id}`, { method:"DELETE" });
                if (res.ok) {
                  toast.success("Refund deleted successfully!");
                  fetchRefunds();
                } else {
                  toast.error("Failed to delete refund.");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, style: { padding: '20px' } }
    );
  };

  const canEditOrDelete = (r: any) => {
    if (!currentUser) return false;
    if (currentUser.role ==="ADMIN") return true;
    return r.createdById === currentUser.id;
  };

  const handleExport = async () => {
    let targetRefunds = [...refunds];
    const now = new Date();
    
    if (exportDateRange ==="today") {
      const todayStr = now.toISOString().split("T")[0];
      targetRefunds = targetRefunds.filter(r => r.date.startsWith(todayStr));
    } else if (exportDateRange ==="yesterday") {
      const yest = new Date(now);
      yest.setDate(yest.getDate() - 1);
      const yestStr = yest.toISOString().split("T")[0];
      targetRefunds = targetRefunds.filter(r => r.date.startsWith(yestStr));
    } else if (exportDateRange ==="month") {
      const monthAgo = new Date(now);
      monthAgo.setDate(monthAgo.getDate() - 30);
      targetRefunds = targetRefunds.filter(r => new Date(r.date) >= monthAgo);
    } else if (exportDateRange ==="custom" && exportDateFrom && exportDateTo) {
      targetRefunds = targetRefunds.filter(r => {
        const d = new Date(r.date);
        return d >= new Date(exportDateFrom) && d <= new Date(exportDateTo + 'T23:59:59');
      });
    }

    if (targetRefunds.length === 0) {
      toast.error("No refunds found for this date range.");
      return;
    }

    const exportData = targetRefunds.map(r => ({
      Date: new Date(r.date).toLocaleDateString(),
      Agent: r.agentCode?.code ||"-",
      Airline: r.airlineCode,"Refund Amount": r.refundAmount,"NON IATA": r.nonIata?.name ||"-",
      Phone: r.phoneNumber,
      PNR: r.pnr,"Ticket Number": r.ticketNumber,
      Passenger: r.passengerName,
      Sector: r.sector
    }));

    try {
      if (exportFormat ==="excel") {
        const XLSX = await import("xlsx");
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet,"Refunds");
        XLSX.writeFile(workbook, `Refund_Export_${new Date().getTime()}.xlsx`);
      } else if (exportFormat ==="csv") {
        const XLSX = await import("xlsx");
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `Refund_Export_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const { jsPDF } = await import("jspdf");
        const autoTable = (await import("jspdf-autotable")).default;
        const doc = new jsPDF({ orientation:"landscape" });
        doc.text("Refund Register Export", 14, 15);
        autoTable(doc, {
          head: [Object.keys(exportData[0])],
          body: exportData.map(Object.values),
          startY: 20,
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [15, 23, 42] }
        });
        doc.save(`Refund_Export_${new Date().getTime()}.pdf`);
      }
      toast.success(`${exportFormat.toUpperCase()} generated successfully!`);
      setIsExportModalOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate export file.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-brand-900">Refund Register</h1>
          <p className="text-xs text-gray-500 mt-0.5">Record and track daily ticket refunds</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="bg-white text-gray-700 border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-bold shadow-sm"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                date: new Date().toISOString().split("T")[0],
                agentCodeId:"", airlineCode:"ET", refundAmount:"",
                nonIataId:"", phoneNumber:"", pnr:"", ticketNumber:"",
                passengerName:"", sector:""
              });
              setIsModalOpen(true);
            }}
            className="bg-brand-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-gold transition-colors text-sm font-bold shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Refund
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by PNR, Ticket No, Sector, Passenger, Doc or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white shadow-sm border-none rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-shadow"
          />
        </div>
        <select
          value={filterAirline}
          onChange={(e) => setFilterAirline(e.target.value)}
          className="bg-white shadow-sm border-none rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-gold outline-none text-sm cursor-pointer transition-shadow"
        >
          <option value="">All Airlines</option>
          {AIRLINES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <div className="flex items-center gap-2 bg-white shadow-sm rounded-xl px-3 border-none focus-within:ring-2 focus-within:ring-brand-gold transition-shadow">
          <input 
            type="date" 
            value={filterDateFrom} 
            onChange={(e) => setFilterDateFrom(e.target.value)}
            className="bg-transparent py-2.5 outline-none text-sm cursor-pointer text-gray-700" 
            title="From Date"
          />
          <span className="text-gray-400 text-sm">to</span>
          <input 
            type="date" 
            value={filterDateTo} 
            onChange={(e) => setFilterDateTo(e.target.value)}
            className="bg-transparent py-2.5 outline-none text-sm cursor-pointer text-gray-700" 
            title="To Date"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap text-sm">
            <thead className="bg-brand-900 text-white font-semibold uppercase text-xs">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Passenger</th>
                <th className="px-4 py-3 font-semibold">Sector</th>
                <th className="px-4 py-3 font-semibold">PNR</th>
                <th className="px-4 py-3 font-semibold">Ticket No</th>
                <th className="px-4 py-3 font-semibold">Airline</th>
                <th className="px-4 py-3 font-semibold  text-right">Amount</th>
                <th className="px-4 py-3 font-semibold">Agent</th>
                <th className="px-4 py-3 font-semibold">NON IATA</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold  text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRefunds.map((r) => (
                <tr key={r.id} className="even:bg-gray-50 hover:bg-gray-100">
                  <td className="px-4 py-3">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{r.passengerName}</td>
                  <td className="px-4 py-3">{r.sector}</td>
                  <td className="px-4 py-3 font-bold text-brand-900">{r.pnr}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.ticketNumber}</td>
                  <td className="px-4 py-3">{r.airlineCode}</td>
                  <td className="px-4 py-3 font-medium text-right text-red-600">{r.refundAmount.toLocaleString()}</td>
                  <td className="px-4 py-3">{r.agentCode?.code ||"-"}</td>
                  <td className="px-4 py-3">{r.nonIata?.name ||"-"}</td>
                  <td className="px-4 py-3">{r.phoneNumber}</td>
                  <td className="px-4 py-3 text-center">
                    {canEditOrDelete(r) ? (
                      <div className="flex items-center justify-center gap-6">
                        <button onClick={() => handleEdit(r)} className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(r.id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-300 text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRefunds.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    No refunds recorded yet. Click"New Refund" to begin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {true && (
          <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between bg-gray-50/50 gap-4">
            <span className="text-sm text-gray-500 font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredRefunds.length)} of {filteredRefunds.length} entries
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-200 text-sm font-bold transition-colors text-gray-700 bg-white shadow-sm"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-200 text-sm font-bold transition-colors text-gray-700 bg-white shadow-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-brand-900">{editingId ?"Edit Ticket Refund" :"Record Ticket Refund"}</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-red-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">Ticket Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">PNR</label>
                  <input required type="text" value={formData.pnr} onChange={e => setFormData({...formData, pnr: e.target.value.toUpperCase()})} className="w-full border rounded-lg p-2.5 uppercase outline-none focus:ring-2 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Ticket Number</label>
                  <input required type="text" value={formData.ticketNumber} onChange={e => setFormData({...formData, ticketNumber: e.target.value})} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">Passenger Name</label>
                  <input required type="text" value={formData.passengerName} onChange={e => setFormData({...formData, passengerName: e.target.value})} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Sector (e.g. ADD-DXB)</label>
                  <input required type="text" value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value.toUpperCase()})} className="w-full border rounded-lg p-2.5 uppercase outline-none focus:ring-2 focus:ring-brand-gold" />
                </div>
              </div>

              <h3 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">Classification & Amounts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">Airline</label>
                  <select required value={formData.airlineCode} onChange={e => setFormData({...formData, airlineCode: e.target.value})} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold">
                    {AIRLINES.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-red-600">Refund Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-red-600 font-bold">ETB</span>
                    <input required type="number" step="0.01" value={formData.refundAmount} onChange={e => setFormData({...formData, refundAmount: e.target.value})} className="w-full border-2 border-red-200 bg-red-50 text-red-700 rounded-lg p-2.5 pl-12 font-bold outline-none focus:ring-red-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-600">Agent Code</label>
                  <select required value={formData.agentCodeId} onChange={e => setFormData({...formData, agentCodeId: e.target.value})} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold">
                    <option value="">Select Agent</option>
                    {agentCodes.filter(a => a.status).sort((a, b) => (a.code ||"").localeCompare(b.code ||"")).map(a => <option key={a.id} value={a.id}>{a.code} {a.name ? `(${a.name})` : ''}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-600">NON IATA & ASK Customers</label>
                  <select required value={formData.nonIataId} onChange={e => setFormData({...formData, nonIataId: e.target.value})} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold">
                    <option value="">Select Customer</option>
                    {nonIata.filter(n => n.status).sort((a, b) => (a.name ||"").localeCompare(b.name ||"")).map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone Number</label>
                  <input required type="tel" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} placeholder="+251..." className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold" />
                </div>
              </div>

              <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border rounded-xl hover:bg-gray-50 font-bold text-gray-600">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-brand-900 text-white rounded-xl hover:bg-brand-gold font-bold">
                  {editingId ?"Update Refund Record" :"Save Refund Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-brand-900">Export Refunds Data</h2>
              <button onClick={() => setIsExportModalOpen(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-red-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Date Range</label>
                <select value={exportDateRange} onChange={e => setExportDateRange(e.target.value)} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold">
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="month">Last 30 Days</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>
              
              {exportDateRange ==="custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">From</label>
                    <input type="date" value={exportDateFrom} onChange={e => setExportDateFrom(e.target.value)} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">To</label>
                    <input type="date" value={exportDateTo} onChange={e => setExportDateTo(e.target.value)} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-gold" />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Format</label>
                <div className="flex flex-col gap-2">
                  <label className="border rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="format" value="excel" checked={exportFormat ==="excel"} onChange={e => setExportFormat(e.target.value)} className="w-4 h-4 text-brand-900 focus:ring-brand-900 accent-brand-900" />
                    <span className="font-semibold text-gray-700">Excel (.xlsx)</span>
                  </label>
                  <label className="border rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="format" value="csv" checked={exportFormat ==="csv"} onChange={e => setExportFormat(e.target.value)} className="w-4 h-4 text-brand-900 focus:ring-brand-900 accent-brand-900" />
                    <span className="font-semibold text-gray-700">CSV (.csv)</span>
                  </label>
                  <label className="border rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="format" value="pdf" checked={exportFormat ==="pdf"} onChange={e => setExportFormat(e.target.value)} className="w-4 h-4 text-brand-900 focus:ring-brand-900 accent-brand-900" />
                    <span className="font-semibold text-gray-700">PDF (.pdf)</span>
                  </label>
                </div>
              </div>

              <button onClick={handleExport} className="w-full bg-brand-900 text-white rounded-xl py-3 font-bold hover:bg-brand-gold transition-colors flex justify-center items-center gap-2">
                <Download className="w-5 h-5" /> Download File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
