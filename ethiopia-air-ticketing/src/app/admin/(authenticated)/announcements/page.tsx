"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, Plus, Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type Announcement = {
  id: string;
  title: string;
  content: string;
  active: boolean;
  createdAt: string;
};

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, active }),
      });

      if (!res.ok) throw new Error("Failed to create announcement");

      toast.success("Announcement published successfully!");
      setTitle("");
      setContent("");
      setActive(true);
      fetchAnnouncements();
    } catch (error) {
      toast.error("Error creating announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Announcement deleted");
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      toast.error("Could not delete announcement");
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-brand-900">Announcements Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Publish live updates and important alerts to the top banner of your website.
        </p>
      </div>

      {/* Create Announcement Form */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
        <h2 className="text-base font-extrabold text-brand-900 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-gold" />
          Create New Announcement
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g. Schedule Update"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-900"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
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
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Content / Message</label>
            <textarea
              rows={2}
              placeholder="Enter announcement details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-900 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-brand-900 text-brand-gold font-bold text-sm rounded-xl hover:bg-brand-900/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Publish Announcement
          </button>
        </form>
      </div>

      {/* Existing Announcements List */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 font-extrabold text-brand-900 text-base flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-gold" />
          Active & Past Announcements
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No announcements found. Create one above!</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {announcements.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-brand-900">{item.title}</h3>
                    {item.active ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                        <XCircle className="w-3 h-3" /> Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{item.content}</p>
                  <span className="text-[10px] text-gray-400 block pt-0.5">
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}