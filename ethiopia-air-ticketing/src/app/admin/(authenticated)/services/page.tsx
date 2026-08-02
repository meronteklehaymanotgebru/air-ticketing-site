"use client";
import { useEffect, useState } from"react";
import { useRouter } from"next/navigation";
import { Pencil, Trash2, Plus, X } from"lucide-react";
import toast from"react-hot-toast";

type Service = {
  id: string;
  category: string;
  title: string;
  iconName: string;
  badge: string;
  desc: string;
  image: string;
  isLightVip: boolean;
  items: string[];
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const paginatedServices = services.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  
  // Form State
  const [formData, setFormData] = useState({
    category:"air",
    title:"",
    iconName:"Plane",
    badge:"",
    desc:"",
    image:"",
    isLightVip: false,
    items:"", // We will split by comma for array
  });

  const router = useRouter();

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    if (res.ok) setServices(await res.json());
  };

  useEffect(() => {
    fetchServices();
  }, [router]);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        category: service.category,
        title: service.title,
        iconName: service.iconName,
        badge: service.badge,
        desc: service.desc,
        image: service.image,
        isLightVip: service.isLightVip,
        items: service.items.join("\n"), // display as newline separated string in textarea
      });
    } else {
      setEditingId(null);
      setFormData({
        category:"air", title:"", iconName:"Plane", badge:"", desc:"", image:"", isLightVip: false, items:""
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-gray-800">Are you sure you want to delete this service?</p>
        <div className="flex gap-2 justify-end">
          <button 
            className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200" 
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button 
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600" 
            onClick={async () => {
              toast.dismiss(t.id);
              const res = await fetch(`/api/services/${id}`, { method:"DELETE" });
              if (res.ok) {
                toast.success("Service deleted successfully!");
                fetchServices();
              } else {
                toast.error("Failed to delete service.");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      items: formData.items.split("\n").map(i => i.trim()).filter(i => i !==""),
    };

    const url = editingId ? `/api/services/${editingId}` :"/api/services";
    const method = editingId ?"PUT" :"POST";

    const res = await fetch(url, {
      method,
      headers: {"Content-Type":"application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(editingId ?"Service updated successfully!" :"Service created successfully!");
      setIsModalOpen(false);
      fetchServices();
    } else {
      toast.error("Error saving service");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-900">Manage Services</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-brand-gold transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-brand-900 text-white font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Service Title</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Badge</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedServices.map((service) => (
              <tr key={service.id} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="px-6 py-4 font-medium text-brand-900">{service.title}</td>
                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{service.category}</span></td>
                <td className="px-6 py-4">{service.badge}</td>
                <td className="px-6 py-4 flex gap-6">
                  <button onClick={() => handleOpenModal(service)} className="text-gray-500 hover:text-brand-900">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">No services found. Create one to get started!</td>
              </tr>
            )}
          </tbody>
        </table>

        {services.length > 0 && (
          <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between bg-gray-50/50 gap-4">
            <span className="text-sm text-gray-500 font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, services.length)} of {services.length} entries
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{editingId ?"Edit Service" :"Add New Service"}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border rounded-lg p-2">
                    <option value="air">Air Travel & Support</option>
                    <option value="visa">Visa & Protection</option>
                    <option value="stay-tours">Hotels, Tours & Transport</option>
                    <option value="corp-vip">Corporate & VIP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Icon Name (lucide-react)</label>
                  <input required type="text" value={formData.iconName} onChange={e => setFormData({...formData, iconName: e.target.value})} placeholder="e.g. Plane, Crown, Hotel" className="w-full border rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Badge (e.g. Core Service)</label>
                  <input required type="text" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full border rounded-lg p-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea required rows={2} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full border rounded-lg p-2"></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Image URL</label>
                <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." className="w-full border rounded-lg p-2" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Features (One per line)</label>
                <textarea required rows={4} value={formData.items} onChange={e => setFormData({...formData, items: e.target.value})} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" className="w-full border rounded-lg p-2"></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="vip" checked={formData.isLightVip} onChange={e => setFormData({...formData, isLightVip: e.target.checked})} className="w-4 h-4" />
                <label htmlFor="vip" className="text-sm font-semibold">Display as VIP / Premium style card?</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-900 text-white rounded-xl hover:bg-brand-gold">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
