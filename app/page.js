'use client';

import React, { useState } from 'react';
import { Camera, Award, Building2, Home, Landmark, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VertexGroundsHomepage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'residential',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (In production, this would send an email)');
    console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center font-bold text-sm">
                VG
              </div>
              <span className="text-xl font-bold tracking-wider">
                VERTEX GROUNDS
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="hover:text-blue-400 transition">Services</a>
              <a href="#about" className="hover:text-blue-400 transition">About</a>
              <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition">
              Get Quote
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 relative bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            PRECISION<br/>
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              GROUNDS MANAGEMENT
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Engineering excellence in landscape services for residential, commercial, and government contracts
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:opacity-90 transition">
              <span>Explore Services</span>
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-400 hover:bg-blue-400/10 transition">
              View Portfolio
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            <div>
              <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">500+</div>
              <div className="text-slate-400 mt-2">Projects Completed</div>
            </div>
            <div>
              <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">15+</div>
              <div className="text-slate-400 mt-2">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">98%</div>
              <div className="text-slate-400 mt-2">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-slate-400 mt-2">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6"></div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              OUR <span className="text-blue-400">SERVICES</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Tailored solutions for every sector
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Residential */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Home size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">RESIDENTIAL</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Premium lawn care and landscaping services for homeowners who demand excellence.
              </p>
              <ul className="space-y-3 mb-8">
                {['Weekly Lawn Maintenance', 'Seasonal Cleanup', 'Garden Design', 'Snow Removal'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition">
                <span>View Pricing</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Commercial */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-blue-500/50 rounded-2xl p-8 hover:border-blue-500 transition-all hover:-translate-y-2 relative">
              <div className="absolute top-4 right-4 bg-blue-500 px-3 py-1 rounded-full text-xs font-bold">
                POPULAR
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Building2 size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">COMMERCIAL</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Comprehensive property management for businesses that need consistent, reliable service.
              </p>
              <ul className="space-y-3 mb-8">
                {['Property Maintenance', 'Landscape Management', 'Parking Lot Care', '24/7 Emergency Service'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition">
                <span>Request Consultation</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Government */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-slate-600 to-slate-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Landmark size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">GOVERNMENT</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Contract-ready solutions for municipal, provincial, and federal grounds management needs.
              </p>
              <ul className="space-y-3 mb-8">
                {['Contract Compliance', 'Large-Scale Projects', 'Certified Operations', 'Detailed Reporting'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition">
                <span>Government Inquiry</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6"></div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              GET IN <span className="text-blue-400">TOUCH</span>
            </h2>
            <p className="text-xl text-slate-400">
              Ready to elevate your property? Contact us for a consultation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-300">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-300">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-slate-300">Service Type</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="government">Government Contract</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-slate-300">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition h-32 resize-none"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:opacity-90 transition">
              <span>Send Message</span>
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Phone, title: 'Phone', info: '(403) 555-0123' },
              { icon: Mail, title: 'Email', info: 'info@vertexgrounds.ca' },
              { icon: MapPin, title: 'Location', info: 'Lethbridge, AB' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon size={20} className="text-blue-400" />
                </div>
                <h4 className="text-sm font-bold mb-2 text-slate-400">{item.title}</h4>
                <p className="text-white">{item.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center font-bold text-sm">
                VG
              </div>
              <span className="text-xl font-bold tracking-wider">
                VERTEX GROUNDS
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 Vertex Grounds Management. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}