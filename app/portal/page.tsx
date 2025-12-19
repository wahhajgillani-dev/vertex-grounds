'use client';

import React, { useState } from 'react';
import { User, Calendar, DollarSign, AlertCircle, CheckCircle2, Clock, LogOut, Home, Send } from 'lucide-react';

// TypeScript interfaces
interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  accountType: string;
  address: string;
  phone: string;
  memberSince: string;
}

interface ServiceLog {
  id: string;
  date: string;
  serviceType: string;
  technician: string;
  duration: string;
  status: string;
  notes: string;
  cost: number;
}

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: string;
  services: string[];
}

interface GrievanceFormData {
  subject: string;
  category: string;
  priority: string;
  description: string;
}

export default function CustomerPortal() {
  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [grievanceForm, setGrievanceForm] = useState<GrievanceFormData>({
    subject: '',
    category: 'service',
    priority: 'medium',
    description: ''
  });

  // Mock data
  const mockUsers: { [key: string]: UserData } = {
    'john@example.com': {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      password: 'password123',
      accountType: 'residential',
      address: '123 Maple Street, Lethbridge, AB',
      phone: '(403) 555-0123',
      memberSince: '2022-03-15'
    }
  };

  const mockServiceLogs: ServiceLog[] = [
    {
      id: '1',
      date: '2024-12-10',
      serviceType: 'Lawn Maintenance',
      technician: 'Mike Johnson',
      duration: '2 hours',
      status: 'completed',
      notes: 'Mowed lawn, trimmed edges, applied fertilizer.',
      cost: 85.00
    },
    {
      id: '2',
      date: '2024-12-03',
      serviceType: 'Garden Cleanup',
      technician: 'Sarah Williams',
      duration: '3 hours',
      status: 'completed',
      notes: 'Removed dead plants, raked leaves, pruned shrubs.',
      cost: 120.00
    },
    {
      id: '3',
      date: '2024-12-20',
      serviceType: 'Lawn Maintenance',
      technician: 'Mike Johnson',
      duration: '2 hours',
      status: 'scheduled',
      notes: 'Scheduled for next week.',
      cost: 85.00
    }
  ];

  const mockInvoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      date: '2024-12-10',
      dueDate: '2024-12-24',
      amount: 85.00,
      status: 'paid',
      services: ['Lawn Maintenance']
    },
    {
      id: 'INV-2024-002',
      date: '2024-12-03',
      dueDate: '2024-12-17',
      amount: 120.00,
      status: 'paid',
      services: ['Garden Cleanup']
    },
    {
      id: 'INV-2024-003',
      date: '2024-11-28',
      dueDate: '2024-12-12',
      amount: 65.00,
      status: 'overdue',
      services: ['Snow Removal']
    }
  ];

  // Event handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers[authForm.email];
    if (user && user.password === authForm.password) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Try: john@example.com / password123');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Signup would create account in production!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Grievance submitted successfully!');
    setGrievanceForm({ subject: '', category: 'service', priority: 'medium', description: '' });
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
              VG
            </div>
            <h1 className="text-3xl font-bold mb-2">VERTEX GROUNDS</h1>
            <p className="text-slate-400">Customer Portal</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6 bg-slate-800/50 rounded-lg p-1">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-md font-semibold transition ${
                  authMode === 'login' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 rounded-md font-semibold transition ${
                  authMode === 'signup' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={authMode === 'login' ? handleLogin : handleSignup}>
              {authMode === 'signup' && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                    placeholder="John Smith"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-slate-300">Email</label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-slate-300">Password</label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                {authMode === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>

            {authMode === 'login' && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-300 mb-2 font-semibold">Demo Credentials:</p>
                <p className="text-xs text-slate-400">Email: john@example.com</p>
                <p className="text-xs text-slate-400">Password: password123</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Portal (After Login)
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 border-r border-slate-800 fixed h-screen overflow-y-auto">
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center font-bold text-sm">
                VG
              </div>
              <div>
                <p className="text-sm font-bold">VERTEX GROUNDS</p>
                <p className="text-xs text-slate-400">Customer Portal</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-2 px-4">Navigation</p>
            <nav className="space-y-1">
              {[
                { id: 'dashboard', icon: Home, label: 'Dashboard' },
                { id: 'services', icon: Calendar, label: 'Service History' },
                { id: 'billing', icon: DollarSign, label: 'Billing' },
                { id: 'grievance', icon: AlertCircle, label: 'Grievance' },
                { id: 'profile', icon: User, label: 'Profile' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    currentPage === item.id
                      ? 'bg-blue-500/20 border-l-4 border-blue-500'
                      : 'border-l-4 border-transparent hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="border-t border-slate-800 mt-4 pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut size={20} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Top Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold capitalize">{currentPage}</h1>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold">{currentUser?.name}</p>
                <p className="text-xs text-slate-400 capitalize">{currentUser?.accountType}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center font-bold">
                {currentUser?.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            
            {/* DASHBOARD */}
            {currentPage === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name.split(' ')[0]}!</h2>
                <p className="text-slate-400 mb-8">Here's what's happening with your property</p>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 rounded-xl p-6">
                    <Calendar className="text-blue-400 mb-2" size={24} />
                    <p className="text-3xl font-bold mb-1">3</p>
                    <p className="text-slate-400 text-sm">Services Completed</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 rounded-xl p-6">
                    <DollarSign className="text-green-400 mb-2" size={24} />
                    <p className="text-3xl font-bold mb-1">$270</p>
                    <p className="text-slate-400 text-sm">Total Billed (2024)</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 rounded-xl p-6">
                    <Clock className="text-yellow-400 mb-2" size={24} />
                    <p className="text-3xl font-bold mb-1">1</p>
                    <p className="text-slate-400 text-sm">Upcoming Services</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 rounded-xl p-6">
                    <CheckCircle2 className="text-green-400 mb-2" size={24} />
                    <p className="text-3xl font-bold mb-1">98%</p>
                    <p className="text-slate-400 text-sm">Satisfaction Score</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Recent Services</h3>
                <div className="space-y-4">
                  {mockServiceLogs.slice(0, 3).map(log => (
                    <div key={log.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{log.serviceType}</p>
                          <p className="text-sm text-slate-400">{new Date(log.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{log.notes}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">{log.technician}</span>
                        <span className="font-semibold">${log.cost.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICE HISTORY */}
            {currentPage === 'services' && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Service History</h2>
                <p className="text-slate-400 mb-8">Complete record of all services performed</p>

                <div className="space-y-4">
                  {mockServiceLogs.map(log => (
                    <div key={log.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{log.serviceType}</h3>
                          <p className="text-slate-400">{new Date(log.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {log.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-slate-400 mb-1">Technician</p>
                          <p className="font-semibold">{log.technician}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400 mb-1">Duration</p>
                          <p className="font-semibold">{log.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400 mb-1">Cost</p>
                          <p className="font-semibold text-green-400">${log.cost.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-sm text-slate-400 mb-2">Service Notes:</p>
                        <p className="text-slate-200">{log.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BILLING */}
            {currentPage === 'billing' && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Billing & Invoices</h2>
                <p className="text-slate-400 mb-8">View and manage your payments</p>

                <div className="space-y-4">
                  {mockInvoices.map(invoice => (
                    <div key={invoice.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{invoice.id}</h3>
                          <p className="text-slate-400">Issued: {new Date(invoice.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invoice.status === 'paid' ? 'bg-green-500/20 text-green-400' : 
                          invoice.status === 'overdue' ? 'bg-red-500/20 text-red-400' : 
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-slate-400 mb-1">Amount</p>
                          <p className="text-2xl font-bold">${invoice.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400 mb-1">Due Date</p>
                          <p className="font-semibold">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400 mb-1">Status</p>
                          <p className="font-semibold capitalize">{invoice.status}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold transition">
                          Download PDF
                        </button>
                        {invoice.status !== 'paid' && (
                          <button className="flex-1 bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition">
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GRIEVANCE */}
            {currentPage === 'grievance' && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Submit a Grievance</h2>
                <p className="text-slate-400 mb-8">We take your concerns seriously and will respond within 24 hours</p>

                <div className="max-w-3xl">
                  <form onSubmit={handleGrievanceSubmit} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                    <div className="mb-6">
                      <label className="block text-sm font-semibold mb-2">Subject</label>
                      <input
                        type="text"
                        value={grievanceForm.subject}
                        onChange={(e) => setGrievanceForm({...grievanceForm, subject: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                        placeholder="Brief description of the issue"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Category</label>
                        <select
                          value={grievanceForm.category}
                          onChange={(e) => setGrievanceForm({...grievanceForm, category: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                        >
                          <option value="service">Service Quality</option>
                          <option value="billing">Billing Issue</option>
                          <option value="scheduling">Scheduling Problem</option>
                          <option value="damage">Property Damage</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Priority</label>
                        <select
                          value={grievanceForm.priority}
                          onChange={(e) => setGrievanceForm({...grievanceForm, priority: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold mb-2">Description</label>
                      <textarea
                        value={grievanceForm.description}
                        onChange={(e) => setGrievanceForm({...grievanceForm, description: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition h-32 resize-none"
                        placeholder="Please provide detailed information..."
                        required
                      />
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
                      <Send size={20} />
                      <span>Submit Grievance</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* PROFILE */}
            {currentPage === 'profile' && currentUser && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
                <p className="text-slate-400 mb-8">Manage your account information</p>

                <div className="max-w-3xl">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold mb-6">Personal Information</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Full Name</label>
                        <p className="text-lg">{currentUser.name}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Email Address</label>
                        <p className="text-lg">{currentUser.email}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Phone Number</label>
                        <p className="text-lg">{currentUser.phone}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Service Address</label>
                        <p className="text-lg">{currentUser.address}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Account Type</label>
                        <p className="text-lg capitalize">{currentUser.accountType}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-400 mb-2">Member Since</label>
                        <p className="text-lg">{new Date(currentUser.memberSince).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-700">
                      <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}