'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Phone, Mail, MapPin, CheckCircle2, Star, Calendar, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

export default function VertexGroundsHomepage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'residential',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const contactRef = useRef(null);

  const scrollToContact = (preSelectedService = null) => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          status: 'pending'
        }]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', service: 'residential', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-text {
          animation: slideUp 1s ease-out;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-900/30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="bg-white px-4 py-2 rounded-lg">
              <div className="text-center">
                <h1 className="text-2xl font-black italic tracking-tight" style={{ color: '#1a4d2e' }}>VERTEX</h1>
                <p className="text-[10px] font-bold text-gray-500 tracking-wide">GROUNDS MANAGEMENT</p>
                <p className="text-[7px] text-gray-400">SNOW REMOVAL • IRRIGATION • LANDSCAPING</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#services" className="hover:text-green-400 transition duration-300">Services</a>
            <a href="#testimonials" className="hover:text-green-400 transition duration-300">Reviews</a>
            <a href="#contact" className="hover:text-green-400 transition duration-300">Contact</a>
          </div>
          <button 
            onClick={() => scrollToContact()}
            className="bg-green-600 hover:bg-green-700 px-6 py-2.5 rounded-lg font-semibold transition duration-300 text-sm transform hover:scale-105"
          >
            Reserve Service
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-950 to-slate-900">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl hero-text">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            GROUNDS MANAGEMENT
            <br />
            <span className="text-green-400">SIMPLIFIED</span>
          </h1>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-lg md:text-xl text-slate-200 italic mb-8">
            "Fast, reliable, and professional service. I highly recommend Vertex Grounds."
          </p>
          
          <button 
            onClick={() => scrollToContact()}
            className="bg-green-600 hover:bg-green-700 px-10 py-4 rounded-lg font-bold text-lg transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Company Banner */}
      <section className="py-4 bg-green-600 border-y border-green-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white font-bold tracking-wide">VERTEX GROUNDS MANAGEMENT</p>
          <p className="text-white text-sm">Snow Removal • Irrigation • Landscaping - Lethbridge, Alberta</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 tracking-tight animate-on-scroll">
            WHY CHOOSE US?
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: 'FAST',
                desc: 'Our industry-leading process ensures your property is serviced in record time. With optimized routes and top-tier equipment, we get the job done efficiently so you can start your day without delay.'
              },
              {
                icon: Shield,
                title: 'RELIABLE',
                desc: 'We operate on a strict schedule, provide real-time service updates, and prioritize customer support. When the work needs to be done, you can count on us to be there—every time.'
              },
              {
                icon: CheckCircle2,
                title: 'EFFICIENT',
                desc: 'We use the most advanced, high-performance equipment built specifically for residential and commercial properties. Our investment in top-tier equipment guarantees precision, power, and the best results.'
              }
            ].map((item, i) => (
              <div key={i} className="animate-on-scroll text-center transform hover:scale-105 transition duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="mb-6">
                  <item.icon size={64} className="mx-auto text-green-400" />
                </div>
                <h3 className="text-3xl font-black mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Banner */}
      <section className="py-16 px-6 bg-green-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">WHAT WE OFFER</h2>
          <p className="text-xl font-bold text-white">A SERVICE PLAN GUARANTEES:</p>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: 'FULL SEASON\nCOVERAGE', icon: Calendar },
              { label: 'SCHEDULED\nMAINTENANCE', icon: Calendar },
              { label: 'PROPERTY\nMARKERS', icon: MapPin },
              { label: 'FLEXIBLE\nPAYMENT', icon: CheckCircle2 },
              { label: 'SERVICE\nALERTS', icon: Phone },
              { label: 'EMAIL\nUPDATES', icon: Mail }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-950 border-2 border-slate-800 rounded-xl p-6 text-center hover:border-green-500 transition duration-300 transform hover:scale-105 animate-on-scroll"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <item.icon size={32} className="mx-auto mb-3 text-green-400" />
                <p className="text-xs font-bold whitespace-pre-line">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-4xl font-black mb-6">Grounds Management Simplified.</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Our goal at Vertex Grounds is to make grounds management as simple as possible. We provide professional service with real-time updates, ensuring your property is consistently maintained to the highest standards.
          </p>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            We leverage technology to provide our customers with service alerts sent directly to their phone and email, keeping you informed every step of the way.
          </p>
          
          <button 
            onClick={() => scrollToContact()}
            className="bg-green-600 hover:bg-green-700 px-10 py-4 rounded-lg font-bold text-lg transition duration-300 transform hover:scale-105"
          >
            RESERVE SERVICE
          </button>
        </div>
      </section>

      {/* Service Tiers */}
      <section id="services" className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 tracking-tight animate-on-scroll">
            CHOOSE YOUR SERVICE
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800 hover:border-green-500 transition duration-300 animate-on-scroll">
              <h3 className="text-3xl font-black mb-6 text-center">STANDARD SERVICE</h3>
              <div className="space-y-3 mb-6">
                {[
                  'FULL SEASON COVERAGE',
                  'SCHEDULED MAINTENANCE',
                  'PROPERTY MARKERS',
                  'FLEXIBLE PAYMENT OPTIONS',
                  'TEXT OR PHONE CALL SERVICE ALERTS',
                  'EMAIL UPDATES'
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-4 mb-6">
                <p className="text-xs font-bold mb-3 text-green-400">BONUSES</p>
                {['CUSTOMER PORTAL ACCESS', 'SERVICE TRACKING'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-green-400" size={18} />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => scrollToContact('residential')}
                className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105"
              >
                Request Quote
              </button>
            </div>

            <div className="bg-slate-950 rounded-2xl p-8 border-2 border-green-500 relative animate-on-scroll transform hover:scale-105 transition duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>
              </div>
              <h3 className="text-3xl font-black mb-6 text-center mt-2">PREMIUM SERVICE</h3>
              <div className="space-y-3 mb-6">
                {[
                  'FULL SEASON COVERAGE',
                  'SCHEDULED MAINTENANCE',
                  'PROPERTY MARKERS',
                  'FLEXIBLE PAYMENT OPTIONS',
                  'TEXT OR PHONE CALL SERVICE ALERTS',
                  'EMAIL UPDATES'
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-4 mb-6">
                <p className="text-xs font-bold mb-3 text-green-400">BONUSES</p>
                {['CUSTOMER PORTAL ACCESS', 'SERVICE TRACKING', 'PRIORITY SERVICE & SUPPORT', 'EXTRA SERVICE VISITS'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-green-400" size={18} />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => scrollToContact('commercial')}
                className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105"
              >
                Get Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 px-6 bg-slate-950 border-y border-slate-800 animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-black mb-6">The Vertex Guarantee</h3>
          <p className="text-xl text-slate-300 leading-relaxed">
            If our service doesn't exceed your expectations after the first visit, we'll give you a full refund, no questions asked.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 tracking-tight animate-on-scroll">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <div className="text-center mb-16 animate-on-scroll">
            <a href="#" className="text-green-400 hover:text-green-300 underline text-lg font-semibold">
              Read All Reviews Here.
            </a>
          </div>

          <div className="space-y-8">
            {[
              { text: "Vertex Grounds has been fantastic. The team is professional and the results speak for themselves. Highly recommend their services.", name: "Michael R." },
              { text: "Great communication and reliable service. They've transformed our commercial property and made maintenance stress-free.", name: "Lisa T." },
              { text: "Professional, efficient, and detail-oriented. Vertex Grounds exceeded our expectations for our government facility.", name: "David K." }
            ].map((review, i) => (
              <div key={i} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-lg text-slate-300 mb-3 italic">{review.text}</p>
                <p className="font-bold">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-3xl mx-auto text-center animate-on-scroll">
          <h2 className="text-4xl font-black mb-4">STAY INFORMED</h2>
          <p className="text-slate-400 mb-8">
            Join our newsletter and stay up to date with our latest promotions, service updates, and more!
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-6 py-3 focus:outline-none focus:border-green-500 transition" 
              required
            />
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold transition duration-300 transform hover:scale-105"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" ref={contactRef} className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 tracking-tight animate-on-scroll">
            CONTACT US
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <form onSubmit={handleSubmit} className="space-y-6 animate-on-scroll">
              {submitSuccess && (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-6">
                  <p className="text-green-400 font-semibold">
                    ✓ Message sent successfully! We'll be in touch soon.
                  </p>
                </div>
              )}

              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition"
                  placeholder="Email"
                  required
                />
              </div>

              <div>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-green-500 transition"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="government">Government</option>
                </select>
              </div>

              <div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition h-40 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 py-5 rounded-lg font-bold text-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>

            <div className="space-y-8 animate-on-scroll">
              <div>
                <h3 className="text-2xl font-black mb-6">CONTACT</h3>
                <p className="text-slate-400 mb-6">1092 GREAT NORTHERN RD. UNIT 2</p>
                
                <a 
                  href="tel:+14035550199" 
                  className="text-2xl font-bold text-green-400 hover:text-green-300 transition block mb-4"
                >
                  (403) 555-0199
                </a>
                
                <a 
                  href="mailto:contact@vertexgrounds.com"
                  className="text-lg text-green-400 hover:text-green-300 transition block"
                >
                  contact@vertexgrounds.com
                </a>
              </div>

              <div className="pt-8 border-t border-slate-800">
                <p className="text-slate-500 text-sm">
                  Serving Lethbridge and all of Southern Alberta with professional grounds management services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-green-600 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="animate-on-scroll">
              <h3 className="font-bold mb-4 text-green-400">LINKS</h3>
              <div className="space-y-2 text-sm">
                <p><a href="#" className="hover:text-green-400 transition">HOME</a></p>
                <p><a href="#services" className="hover:text-green-400 transition">SERVICES</a></p>
                <p><a href="#contact" className="hover:text-green-400 transition">CONTACT US</a></p>
                <p><a href="/admin" className="hover:text-green-400 transition text-slate-500">Admin</a></p>
              </div>
            </div>
            <div className="animate-on-scroll">
              <h3 className="font-bold mb-4 text-green-400">CONTACT</h3>
              <p className="text-sm mb-2">1092 GREAT NORTHERN RD. UNIT 2</p>
              <p className="text-sm text-green-400">(403) 555-0199</p>
              <p className="text-sm text-green-400">contact@vertexgrounds.com</p>
            </div>
            <div className="animate-on-scroll text-center md:text-right">
              <div className="inline-block bg-white px-4 py-3 rounded-lg">
                <div className="text-center">
                  <h1 className="text-3xl font-black italic tracking-tight" style={{ color: '#1a4d2e' }}>VERTEX</h1>
                  <p className="text-[10px] font-bold text-gray-500 tracking-wide">GROUNDS MANAGEMENT</p>
                  <p className="text-[8px] text-gray-400">SNOW REMOVAL • IRRIGATION • LANDSCAPING</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center border-t border-slate-800 pt-6">
            <p className="text-sm text-slate-500">© 2025 VERTEX GROUNDS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}