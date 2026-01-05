'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Filter, LogOut, Mail, Calendar, CheckCircle, Clock, XCircle, X, Search, Download, CheckSquare, Square } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    showStats: true,
    showFilters: true,
    compactView: false,
    showDate: true,
    showService: true,
    showMessage: true,
    showEmail: true
  });

  const [showSettings, setShowSettings] = useState(false);
  const [filterService, setFilterService] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions();
    }
  }, [isAuthenticated]);
  
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Load submissions from Supabase
  const loadSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
      alert('Error loading submissions');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleSetting = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(newSettings);
    localStorage.setItem('adminSettings', JSON.stringify(newSettings));
  };

  useEffect(() => {
    applyFilters();
  }, [filterService, filterStatus, sortOrder, submissions, searchQuery]);

  const applyFilters = () => {
    let filtered = [...submissions];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(query) ||
        sub.email.toLowerCase().includes(query) ||
        sub.message.toLowerCase().includes(query) ||
        sub.service.toLowerCase().includes(query)
      );
    }

    if (filterService !== 'all') {
      filtered = filtered.filter(sub => sub.service === filterService);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(sub => sub.status === filterStatus);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.submitted_at);
      const dateB = new Date(b.submitted_at);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredSubmissions(filtered);
  };

  // Update status in Supabase
  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const updated = submissions.map(sub => 
        sub.id === id ? { ...sub, status: newStatus } : sub
      );
      setSubmissions(updated);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  // Delete from Supabase
  const deleteSubmission = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const updated = submissions.filter(sub => sub.id !== id);
      setSubmissions(updated);
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Error deleting submission');
    }
  };

  // Bulk delete
  const bulkDelete = async () => {
    if (selectedIds.length === 0) {
      alert('Please select submissions to delete');
      return;
    }
    if (!confirm(`Delete ${selectedIds.length} submission(s)?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .in('id', selectedIds);

      if (error) throw error;

      const updated = submissions.filter(sub => !selectedIds.includes(sub.id));
      setSubmissions(updated);
      setSelectedIds([]);
    } catch (error) {
      console.error('Error bulk deleting:', error);
      alert('Error deleting submissions');
    }
  };

  // Bulk update status
  const bulkUpdateStatus = async (newStatus) => {
    if (selectedIds.length === 0) {
      alert('Please select submissions to update');
      return;
    }

    try {
      const { error } = await supabase
        .from('submissions')
        .update({ status: newStatus })
        .in('id', selectedIds);

      if (error) throw error;

      const updated = submissions.map(sub => 
        selectedIds.includes(sub.id) ? { ...sub, status: newStatus } : sub
      );
      setSubmissions(updated);
      setSelectedIds([]);
    } catch (error) {
      console.error('Error bulk updating:', error);
      alert('Error updating submissions');
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSubmissions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubmissions.map(sub => sub.id));
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions to export');
      return;
    }

    const headers = ['Date', 'Name', 'Email', 'Service', 'Message', 'Status'];
    const rows = submissions.map(sub => [
      new Date(sub.submitted_at).toLocaleString(),
      sub.name,
      sub.email,
      sub.service,
      sub.message.replace(/"/g, '""'),
      sub.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vertex-submissions-${Date.now()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'contacted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  const getChartData = () => {
    const serviceData = {
      residential: submissions.filter(s => s.service === 'residential').length,
      commercial: submissions.filter(s => s.service === 'commercial').length,
      government: submissions.filter(s => s.service === 'government').length,
    };

    const statusData = {
      pending: submissions.filter(s => s.status === 'pending').length,
      contacted: submissions.filter(s => s.status === 'contacted').length,
      completed: submissions.filter(s => s.status === 'completed').length,
    };

    return { serviceData, statusData };
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center font-black text-3xl mx-auto mb-4">
              VG
            </div>
            <h1 className="text-3xl font-black mb-2 text-white">ADMIN LOGIN</h1>
            <p className="text-slate-400">Vertex Grounds Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="Enter admin password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-bold transition text-white"
            >
              Login
            </button>

            <p className="text-xs text-slate-500 text-center mt-4">
              Demo password: <code className="bg-slate-800 px-2 py-1 rounded">admin123</code>
            </p>
          </form>
        </div>
      </div>
    );
  }

  const { serviceData, statusData } = getChartData();
  const maxService = Math.max(...Object.values(serviceData), 1);
  const maxStatus = Math.max(...Object.values(statusData), 1);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
              VG
            </div>
            <div>
              <h1 className="text-lg font-bold">ADMIN DASHBOARD</h1>
              <p className="text-xs text-slate-400">Connected to Supabase ✓</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              ⚙️ <span className="hidden sm:inline">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <LogOut size={18} />
              <span className="text-sm hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel - SAME AS BEFORE */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          ></div>

          <div className="relative bg-slate-900 border-l border-slate-800 h-full w-full max-w-md overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-black">⚙️ Dashboard Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white transition p-2 hover:bg-slate-800 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-blue-400 mb-4">DISPLAY OPTIONS</h3>
                <div className="space-y-3">
                  <ToggleSwitch label="Show Statistics Cards" checked={settings.showStats} onChange={() => toggleSetting('showStats')} />
                  <ToggleSwitch label="Show Filters Section" checked={settings.showFilters} onChange={() => toggleSetting('showFilters')} />
                  <ToggleSwitch label="Compact Table View" checked={settings.compactView} onChange={() => toggleSetting('compactView')} />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-sm font-bold text-blue-400 mb-4">TABLE COLUMNS</h3>
                <div className="space-y-3">
                  <ToggleSwitch label="Show Date Column" checked={settings.showDate} onChange={() => toggleSetting('showDate')} />
                  <ToggleSwitch label="Show Service Type" checked={settings.showService} onChange={() => toggleSetting('showService')} />
                  <ToggleSwitch label="Show Message Preview" checked={settings.showMessage} onChange={() => toggleSetting('showMessage')} />
                  <ToggleSwitch label="Show Email Column" checked={settings.showEmail} onChange={() => toggleSetting('showEmail')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 mt-4">Loading submissions...</p>
          </div>
        ) : (
          <>
            {/* ALL THE REST OF THE DASHBOARD CODE STAYS THE SAME */}
            {/* Stats, Charts, Search, Filters, Table... */}
            {/* (Copying from previous admin dashboard file) */}
            
            {settings.showStats && (
              <>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Total Submissions</p>
                    <p className="text-3xl font-black">{submissions.length}</p>
                  </div>
                  <div className="bg-slate-900 border border-yellow-500/30 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Pending</p>
                    <p className="text-3xl font-black text-yellow-400">
                      {submissions.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-blue-500/30 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Contacted</p>
                    <p className="text-3xl font-black text-blue-400">
                      {submissions.filter(s => s.status === 'contacted').length}
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Completed</p>
                    <p className="text-3xl font-black text-green-400">
                      {submissions.filter(s => s.status === 'completed').length}
                    </p>
                  </div>
                </div>

                {submissions.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                      <h3 className="text-lg font-bold mb-6">Submissions by Service</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300">Residential</span>
                            <span className="text-blue-400 font-bold">{serviceData.residential}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${(serviceData.residential / maxService) * 100}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300">Commercial</span>
                            <span className="text-purple-400 font-bold">{serviceData.commercial}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden">
                            <div className="bg-purple-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${(serviceData.commercial / maxService) * 100}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300">Government</span>
                            <span className="text-cyan-400 font-bold">{serviceData.government}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden">
                            <div className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${(serviceData.government / maxService) * 100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                      <h3 className="text-lg font-bold mb-6">Submissions by Status</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300">Pending</span>
                            <span className="text-yellow-400 font-bold">{statusData.pending}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden">
                            <div className="bg-yellow-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${(statusData.pending / maxStatus) * 100}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300">Contacted</span>
                            <span className="text-blue-400 font-bold">{statusData.contacted}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${(statusData.contacted / maxStatus) * 100}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300">Completed</span>
                            <span className="text-green-400 font-bold">{statusData.completed}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${(statusData.completed / maxStatus) * 100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, service, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white">
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {settings.showFilters && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter size={20} className="text-blue-400" />
                  <h2 className="text-lg font-bold">Filters</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Service Type</label>
                    <select value={filterService} onChange={(e) => setFilterService(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition">
                      <option value="all">All Services</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="government">Government</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Status</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition">
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Sort By Date</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition">
                      <option value="desc">Newest First</option>
                      <option value="asc">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {selectedIds.length > 0 && (
              <div className="bg-blue-500/20 border border-blue-500 rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="font-bold text-white">{selectedIds.length} selected</p>
                  <div className="flex gap-2">
                    <button onClick={() => bulkUpdateStatus('contacted')}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition">
                      Mark Contacted
                    </button>
                    <button onClick={() => bulkUpdateStatus('completed')}
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition">
                      Mark Completed
                    </button>
                    <button onClick={bulkDelete}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition">
                      Delete Selected
                    </button>
                  </div>
                </div>
                <button onClick={() => setSelectedIds([])} className="text-slate-300 hover:text-white transition">
                  Clear Selection
                </button>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h2 className="text-xl font-black">Submissions ({filteredSubmissions.length})</h2>
              </div>

              {filteredSubmissions.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400 text-lg mb-2">
                    {searchQuery ? 'No submissions match your search' : 'No submissions yet'}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {searchQuery ? 'Try a different search term' : 'Submissions will appear here when customers fill out the contact form'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-950 border-b border-slate-800">
                      <tr>
                        <th className="text-left px-6 py-4">
                          <button onClick={toggleSelectAll} className="text-slate-400 hover:text-white transition">
                            {selectedIds.length === filteredSubmissions.length ? <CheckSquare size={18} /> : <Square size={18} />}
                          </button>
                        </th>
                        {settings.showDate && <th className="text-left px-6 py-4 text-sm font-bold">Date</th>}
                        <th className="text-left px-6 py-4 text-sm font-bold">Name</th>
                        {settings.showEmail && <th className="text-left px-6 py-4 text-sm font-bold">Contact</th>}
                        {settings.showService && <th className="text-left px-6 py-4 text-sm font-bold">Service</th>}
                        {settings.showMessage && <th className="text-left px-6 py-4 text-sm font-bold">Message</th>}
                        <th className="text-left px-6 py-4 text-sm font-bold">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="border-b border-slate-800 hover:bg-slate-950/50 transition">
                          <td className="px-6 py-4">
                            <button onClick={() => toggleSelect(submission.id)} className="text-slate-400 hover:text-white transition">
                              {selectedIds.includes(submission.id) ? <CheckSquare size={18} className="text-blue-400" /> : <Square size={18} />}
                            </button>
                          </td>

                          {settings.showDate && (
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Calendar size={14} />
                                <span>{formatDate(submission.submitted_at)}</span>
                              </div>
                            </td>
                          )}

                          <td className="px-6 py-4">
                            <p className="font-semibold">{submission.name}</p>
                          </td>

                          {settings.showEmail && (
                            <td className="px-6 py-4">
                              <a href={`mailto:${submission.email}`}
                                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition">
                                <Mail size={14} />
                                {submission.email}
                              </a>
                            </td>
                          )}

                          {settings.showService && (
                            <td className="px-6 py-4">
                              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold capitalize">
                                {submission.service}
                              </span>
                            </td>
                          )}

                          {settings.showMessage && (
                            <td className="px-6 py-4 max-w-xs">
                              <p className="text-sm text-slate-300 line-clamp-2">{submission.message}</p>
                            </td>
                          )}

                          <td className="px-6 py-4">
                            <select value={submission.status} onChange={(e) => updateStatus(submission.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize cursor-pointer transition ${getStatusColor(submission.status)}`}>
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>

                          <td className="px-6 py-4">
                            <button onClick={() => deleteSubmission(submission.id)}
                              className="text-red-400 hover:text-red-300 transition p-2 hover:bg-red-500/10 rounded-lg" title="Delete submission">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="font-bold mb-2 text-blue-400">✨ Now powered by Supabase!</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• 🗄️ <strong>Real Database:</strong> Data persists across devices</li>
                <li>• 🔍 <strong>Search:</strong> Instantly filter submissions</li>
                <li>• ☑️ <strong>Bulk Actions:</strong> Update or delete multiple at once</li>
                <li>• 📊 <strong>Charts:</strong> Visual breakdown by service and status</li>
                <li>• 📥 <strong>Export CSV:</strong> Download to Excel/Sheets</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ToggleSwitch({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-300">{label}</span>
      <button onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition ${checked ? 'bg-blue-500' : 'bg-slate-700'}`}>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}></div>
      </button>
    </div>
  );
}