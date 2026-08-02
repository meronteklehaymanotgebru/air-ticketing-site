"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, Plus, Trash2, CheckCircle, XCircle, Loader2, Search, Pencil } from "lucide-react";
import toast from "react-hot-toast";

type Announcement = {
  id: string;
  title: string;
  content: string;
  active: boolean;
  createdAt: string;
};

const ITEMS_PER_PAGE = 10;

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [active, setActive] = useState(true);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await fetch("/api/announcements");
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      if (Array.isArray(data)) {
        setAnnouncements(data);
      }
    } catch (error) {
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const url = selectedAnnouncement ? `/api/announcements/${selectedAnnouncement.id}` : "/api/announcements";
      const method = selectedAnnouncement ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, active }),
      });

      if (!res.ok) throw new Error("Failed to save announcement");

      toast.success(selectedAnnouncement ? "Announcement updated!" : "Announcement published successfully!");
      closeModal();
      fetchAnnouncements();
    } catch (error) {
      toast.error("Error saving announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Announcement successfully removed.", {
        icon: "🗑️",
        style: {
          border: '1px solid #fee2e2',
          background: '#fef2f2',
          color: '#991b1b',
        },
      });
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      toast.error("Could not delete announcement");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const openEditModal = (item: Announcement) => {
    setSelectedAnnouncement(item);
    setTitle(item.title);
    setContent(item.content);
    setActive(item.active);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setSelectedAnnouncement(null);
    setTitle("");
    setContent("");
    setActive(true);
  };

  // Pagination & Filtering
  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE);
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-900 flex items-center gap-2">
            <Bell className="w-8 h-8 text-brand-gold" /> Announcements
          </h1>
          <p className="text-gray-500 mt-1">Publish live updates and important alerts to the top banner.</p>
        </div>
        <button
          onClick={() => {
            setSelectedAnnouncement(null);
            setTitle("");
            setContent("");
            setActive(true);
            setShowAddModal(true);
          }}
          className="bg-brand-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-gold hover:text-brand-900 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add New Announcement
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold bg-white text-sm"
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Total Announcements: {announcements.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900 text-white font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Title & Content</th>
                <th className="px-6 py-4 w-32">Status</th>
                <th className="px-6 py-4 w-40">Created Date</th>
                <th className="px-6 py-4 text-right w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-gold" />
                  </td>
                </tr>
              ) : filteredAnnouncements.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    No announcements found.
                  </td>
                </tr>
              ) : (
                paginatedAnnouncements.map((item) => (
                  <tr key={item.id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <h3 className="font-bold text-brand-900">{item.title}</h3>
                        <p className="text-gray-600 text-xs font-medium max-w-xl truncate">
                          {item.content}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                          <CheckCircle className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                          <XCircle className="w-3.5 h-3.5" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 text-gray-500 hover:text-brand-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Announcement"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Announcement"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 0 && (
          <div className="px-6 py-4 flex items-center justify-between bg-gray-50/50 border-t border-gray-100">
            <span className="text-sm text-gray-500 font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredAnnouncements.length)} of{" "}
              {filteredAnnouncements.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-200 text-sm font-bold transition-colors text-gray-700 bg-white shadow-sm border border-gray-200"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-200 text-sm font-bold transition-colors text-gray-700 bg-white shadow-sm border border-gray-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-brand-900 flex items-center gap-2">
                {selectedAnnouncement ? <Pencil className="w-5 h-5 text-brand-gold" /> : <Bell className="w-5 h-5 text-brand-gold" />}
                {selectedAnnouncement ? "Edit Announcement" : "Create New Announcement"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Schedule Update"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Content / Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter announcement details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-900"></div>
                </label>
                <span className="text-sm font-semibold text-gray-700">
                  {active ? "Active (Visible on site)" : "Inactive (Hidden)"}
                </span>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-brand-900 text-brand-gold font-bold rounded-xl hover:bg-brand-900/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {selectedAnnouncement ? "Save Changes" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-black text-xl text-brand-900 mb-2">Delete Announcement?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to permanently delete this announcement? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}