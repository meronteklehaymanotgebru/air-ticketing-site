"use client";
import { useEffect, useState } from"react";
import toast from"react-hot-toast";
import { Plus, Pencil, Trash2, X } from"lucide-react";

type Item = {
  id: string;
  name?: string;
  code?: string;
  status: boolean;
};

export default function SettingsCrud({
  title,
  entity,
  hasCodeField = false,
}: {
  title: string;
  entity: string;
  hasCodeField?: boolean;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Form State
  const [formData, setFormData] = useState({ name:"", code:"", status: true });

  const fetchItems = async () => {
    const res = await fetch(`/api/admin/settings/${entity}`);
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, [entity]);

  const handleOpenModal = (item?: Item) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        name: item.name ||"",
        code: item.code ||"",
        status: item.status,
      });
    } else {
      setEditingId(null);
      setFormData({ name:"", code:"", status: true });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-gray-800">Delete this item?</p>
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
                const res = await fetch(`/api/admin/settings/${entity}/${id}`, { method:"DELETE" });
                if (res.ok) {
                  toast.success("Deleted successfully!");
                  fetchItems();
                } else {
                  toast.error("Failed to delete.");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { status: formData.status };
    if (hasCodeField) {
      payload.code = formData.code;
      payload.name = formData.name; // optional for agent code
    } else {
      payload.name = formData.name;
    }

    const url = editingId ? `/api/admin/settings/${entity}/${editingId}` : `/api/admin/settings/${entity}`;
    const method = editingId ?"PUT" :"POST";

    const res = await fetch(url, {
      method,
      headers: {"Content-Type":"application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("Saved successfully!");
      setIsModalOpen(false);
      fetchItems();
    } else {
      toast.error("Error saving.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-900">{title}</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-brand-gold transition-colors text-sm font-bold"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-900 text-white font-semibold uppercase text-xs">
            <tr>
              {hasCodeField && <th className="px-6 py-4 font-semibold">Code</th>}
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id} className="even:bg-gray-50 hover:bg-gray-100">
                {hasCodeField && <td className="px-6 py-4 font-medium text-brand-900">{item.code}</td>}
                <td className="px-6 py-4 font-medium text-brand-900">{item.name ||"-"}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status ?"bg-green-100 text-green-800" :"bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status ?"Active" :"Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-6">
                  <button onClick={() => handleOpenModal(item)} className="p-2 text-gray-500 hover:text-brand-900 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={hasCodeField ? 4 : 3} className="text-center py-8 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {items.length > 0 && (
          <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between bg-gray-50/50 gap-4">
            <span className="text-sm text-gray-500 font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, items.length)} of {items.length} entries
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
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{editingId ?"Edit" :"Add New"}</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {hasCodeField && (
                <div>
                  <label className="block text-sm font-semibold mb-1">Code</label>
                  <input
                    required
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  required={!hasCodeField}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="status"
                  checked={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="status" className="text-sm font-semibold">
                  Active
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-900 text-white rounded-xl hover:bg-brand-gold text-sm font-bold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
