"use client";

import { useState, useEffect } from"react";
import { Plus, Pencil, Trash2, KeyRound, Search, ShieldCheck, User as UserIcon } from"lucide-react";
import toast from"react-hot-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  branch: string | null;
  createdAt: string;
};

type BranchOffice = {
  id: string;
  name: string;
};

const ITEMS_PER_PAGE = 10;

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [branches, setBranches] = useState<BranchOffice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Form State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name:"", email:"", password:"", role:"AGENT", branch:"" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await fetch("/api/admin/settings/branch-offices");
      if (res.ok) {
        const data = await res.json();
        // Sort branches alphabetically
        if (Array.isArray(data)) {
          data.sort((a, b) => a.name.localeCompare(b.name));
          setBranches(data);
        }
      }
    } catch (error) {
      console.error("Failed to load branches");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBranches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = selectedUser ? `/api/admin/users/${selectedUser.id}` :"/api/admin/users";
      const method = selectedUser ?"PUT" :"POST";
      
      const payload: any = { ...formData };
      
      // If editing, map 'password' to 'newPassword' explicitly for the API
      if (selectedUser) {
        if (formData.password) {
          payload.newPassword = formData.password;
        }
        delete payload.password; // Don't send empty string if they didn't change it
      }

      const res = await fetch(url, {
        method,
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ||"Failed to save user");

      toast.success(selectedUser ?"User updated successfully" :"User created successfully");
      closeModals();
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to completely remove the user account for ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method:"DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      toast.success("User deleted");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setFormData({ name:"", email:"", password:"", role:"AGENT", branch:"" });
    setShowAddModal(true);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({ 
      name: user.name, 
      email: user.email, 
      password:"", // Always empty when editing
      role: user.role, 
      branch: user.branch ||"" 
    });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-900">User Management</h1>
          <p className="text-gray-500 mt-1">Manage system access, roles, and branch assignments.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-brand-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-gold hover:text-brand-900 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold bg-white"
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Total Users: {users.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900 text-white font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Branch</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <UserIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-900 flex items-center justify-center font-bold">
                          {(user.name ||"U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{user.name ||"Unknown User"}</p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                        user.role === 'ADMIN' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {user.role === 'ADMIN' ? <ShieldCheck className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700 font-medium bg-gray-100 px-2 py-1 rounded">
                        {user.branch ||"Unassigned"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex gap-6 justify-end">
                      <button onClick={() => openEditModal(user)} className="p-2 text-gray-500 hover:text-brand-900 hover:bg-gray-100 rounded-lg transition-colors" title="Edit User">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(user.id, user.name)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {true && (
          <div className="px-6 py-4 flex items-center justify-between bg-gray-50/50">
            <span className="text-sm text-gray-500 font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} entries
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

      {/* User Form Modal (Add / Edit) */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">
                {selectedUser ?"Edit User Account" :"Create New User"}
              </h3>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                  placeholder="e.g. Abebe Kebede"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  disabled={!!selectedUser} // Cannot change email once created
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className={`w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-gold ${selectedUser ? 'bg-gray-100 text-gray-500' : ''}`}
                  placeholder="name@agency.com"
                />
                {selectedUser && <p className="text-xs text-gray-400 mt-1">Email address cannot be changed.</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {selectedUser ?"Reset Password (Leave blank to keep current)" :"Password"}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required={!selectedUser}
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full border rounded-xl pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder={selectedUser ?"Enter new password..." :"Create strong password"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">System Role</label>
                  <select
                    required
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-gold bg-white"
                  >
                    <option value="AGENT">Ticketing Agent</option>
                    <option value="ADMIN">Administrator</option>
                    <option value="MANAGER">Branch Manager</option>
                    <option value="FINANCE">Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Branch Assignment</label>
                  <select
                    value={formData.branch}
                    onChange={e => setFormData({...formData, branch: e.target.value})}
                    className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-gold bg-white"
                  >
                    <option value="">No Branch (HQ)</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModals}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-brand-900 text-white py-2.5 rounded-xl font-bold hover:bg-brand-gold hover:text-brand-900 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ?"Saving..." : selectedUser ?"Update User" :"Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
