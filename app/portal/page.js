'use client';

import React, { useState } from 'react';
import { Calendar, FileText, User, Settings, LogOut, MapPin, Phone, Mail, CreditCard, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';

export default function CustomerPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock customer data (will come from Jobber API later)
  const customerData = {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(403) 555-0123',
    address: '123 Maple Street, Lethbridge, AB T1J 4K9',
    accountBalance: 0,
    upcomingServices: [
      {
        id: 1,
        type: 'Snow Removal',
        date: '2025-01-06',
        time: '08:00 AM',
        status: 'scheduled',
        crew: 'Team A'
      },
      {
        id: 2,
        type: 'Lawn Maintenance',
        date: '2025-01-08',
        time: '10:00 AM',
        status: 'scheduled',
        crew: 'Team B'
      }
    ],
    serviceHistory: [
      {
        id: 1,
        type: 'Snow Removal',
        date: '2024-12-28',
        status: 'completed',
        cost: 150.00,
        notes: 'Driveway and walkway cleared'
      },
      {
        id: 2,
        type: 'Lawn Maintenance',
        date: '2024-12-20',
        status: 'completed',
        cost: 120.00,
        notes: 'Regular maintenance service'
      },
      {
        id: 3,
        type: 'Snow Removal',
        date: '2024-12-15',
        status: 'completed',
        cost: 150.00,
        notes: 'Heavy snowfall - extra clearing'
      }
    ],
    invoices: [
      {
        id: 'INV-001',
        date: '2024-12-28',
        amount: 150.00,
        status: 'paid',
        dueDate: '2025-01-12',
        services: ['Snow Removal - Dec 28']
      },
      {
        id: 'INV-002',
        date: '2024-12-20',
        amount: 120.00,
        status: 'paid',
        dueDate: '2025-01-04',
        services: ['Lawn Maintenance - Dec 20']
      },
      {
        id: 'INV-003',
        date: '2024-12-15',
        amount: 150.00,
        status: 'unpaid',
        dueDate: '2024-12-30',
        services: ['Snow Removal - Dec 15']
      }
    ]
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo: any email/password works
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center font-black text-3xl mx-auto mb-4">
              VG
            </div>
            <h1 className="text-3xl font-black mb-2 text-white">CUSTOMER PORTAL</h1>
            <p className="text-slate-400">Vertex Grounds Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="Enter password"
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
              Demo: Use any email/password to login
            </p>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-400 mb-2">Don't have an account?</p>
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
              Contact us to get started
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
              VG
            </div>
            <div>
              <h1 className="text-lg font-bold">CUSTOMER PORTAL</h1>
              <p className="text-xs text-slate-400">{customerData.name}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <LogOut size={18} />
            <span className="text-sm hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Calendar },
            { id: 'services', label: 'Services', icon: CheckCircle },
            { id: 'invoices', label: 'Invoices', icon: FileText },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8">
              <h2 className="text-2xl font-black mb-2">Welcome back, {customerData.name.split(' ')[0]}!</h2>
              <p className="text-blue-100">Here's what's happening with your services</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <p className="text-slate-400 text-sm mb-2">Upcoming Services</p>
                <p className="text-3xl font-black text-blue-400">{customerData.upcomingServices.length}</p>
              </div>
              <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                <p className="text-slate-400 text-sm mb-2">Services Completed</p>
                <p className="text-3xl font-black text-green-400">{customerData.serviceHistory.length}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <p className="text-slate-400 text-sm mb-2">Account Balance</p>
                <p className="text-3xl font-black">${customerData.accountBalance.toFixed(2)}</p>
              </div>
              <div className="bg-slate-900 border border-yellow-500/30 rounded-xl p-6">
                <p className="text-slate-400 text-sm mb-2">Unpaid Invoices</p>
                <p className="text-3xl font-black text-yellow-400">
                  {customerData.invoices.filter(i => i.status === 'unpaid').length}
                </p>
              </div>
            </div>

            {/* Upcoming Services */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-black">Upcoming Services</h3>
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2">
                  <Plus size={16} />
                  Request Service
                </button>
              </div>

              {customerData.upcomingServices.length === 0 ? (
                <div className="p-12 text-center">
                  <Calendar className="mx-auto mb-4 text-slate-600" size={48} />
                  <p className="text-slate-400">No upcoming services scheduled</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {customerData.upcomingServices.map(service => (
                    <div key={service.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Calendar className="text-blue-400" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold">{service.type}</h4>
                          <p className="text-sm text-slate-400">
                            {new Date(service.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              month: 'short', 
                              day: 'numeric' 
                            })} at {service.time}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">Crew: {service.crew}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                        Scheduled
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h3 className="text-xl font-black">Recent Activity</h3>
              </div>
              <div className="p-6 space-y-3">
                {customerData.serviceHistory.slice(0, 3).map(service => (
                  <div key={service.id} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="text-green-400" size={16} />
                    <span className="text-slate-300">
                      {service.type} completed on {new Date(service.date).toLocaleDateString()}
                    </span>
                    <span className="ml-auto text-slate-400">${service.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Service History</h2>
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                <Plus size={18} />
                Request New Service
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-bold">Date</th>
                    <th className="text-left px-6 py-4 text-sm font-bold">Service Type</th>
                    <th className="text-left px-6 py-4 text-sm font-bold">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-bold">Cost</th>
                    <th className="text-left px-6 py-4 text-sm font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.serviceHistory.map(service => (
                    <tr key={service.id} className="border-b border-slate-800 hover:bg-slate-950/50 transition">
                      <td className="px-6 py-4 text-sm">
                        {new Date(service.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 font-semibold">{service.type}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold capitalize">
                          {service.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold">${service.cost.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{service.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Invoices</h2>
              <div className="flex gap-2">
                <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-sm transition">
                  All
                </button>
                <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-sm transition">
                  Paid
                </button>
                <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-sm transition">
                  Unpaid
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {customerData.invoices.map(invoice => (
                <div key={invoice.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black">{invoice.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invoice.status === 'paid'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {invoice.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Issued: {new Date(invoice.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-slate-400">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black">${invoice.amount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-4">
                    <p className="text-sm font-semibold mb-2">Services:</p>
                    <ul className="space-y-1">
                      {invoice.services.map((service, idx) => (
                        <li key={idx} className="text-sm text-slate-400">• {service}</li>
                      ))}
                    </ul>
                  </div>

                  {invoice.status === 'unpaid' && (
                    <div className="mt-4 pt-4 border-t border-slate-800 flex gap-3">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                        <CreditCard size={16} />
                        Pay Now
                      </button>
                      <button className="bg-slate-950 border border-slate-800 hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold transition">
                        Download PDF
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black">Account Profile</h2>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="text-slate-400" size={20} />
                  <div>
                    <p className="text-sm text-slate-400">Name</p>
                    <p className="font-semibold">{customerData.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-slate-400" size={20} />
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="font-semibold">{customerData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-slate-400" size={20} />
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <p className="font-semibold">{customerData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-slate-400" size={20} />
                  <div>
                    <p className="text-sm text-slate-400">Service Address</p>
                    <p className="font-semibold">{customerData.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800">
                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold transition">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-slate-950 hover:bg-slate-800 rounded-lg transition">
                  <p className="font-semibold">Change Password</p>
                  <p className="text-sm text-slate-400">Update your account password</p>
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-950 hover:bg-slate-800 rounded-lg transition">
                  <p className="font-semibold">Notification Preferences</p>
                  <p className="text-sm text-slate-400">Manage email and SMS alerts</p>
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-950 hover:bg-slate-800 rounded-lg transition">
                  <p className="font-semibold">Payment Methods</p>
                  <p className="text-sm text-slate-400">Manage saved payment options</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}