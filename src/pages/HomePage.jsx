import React, { useState } from 'react';
import { 
  Sparkles, Calculator, ArrowRight, ShieldCheck, Clock, Award, 
  CheckCircle2, Star, ChevronDown, ChevronUp, Layers, Check, Phone, 
  Play, Building2, Eye, MapPin, Gift, MessageSquare 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { trackEvent } from '../services/analytics';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PartnerLogosTicker from '../components/PartnerLogosTicker';
import HowItWorksJourney from '../components/HowItWorksJourney';

export default function HomePage({ open3DModal, openEstimatorModal, setActivePage }) {
  const { brand, banners, packages, testimonials, advantages, faqs: dynamicFaqs } = useData();
  const [openFaq, setOpenFaq] = useState(0);
  const [activeTab, setActiveTab] = useState('signature');

  const defaultFaqs = [
    {
      q: "How does LivGruha guarantee project handover in just 21 days?",
      a: "Our modular precision woodwork is manufactured in automated German CNC facilities while site civil work is executed in parallel. We perform rapid, dust-free on-site assembly, ensuring handover in just 21 days with zero quality compromise."
    },
    {
      q: "How does LivGruha provide Free 3D Design before any commitment?",
      a: "Our senior architectural designers create a photorealistic 3D virtual model of your specific floor plan during your first consultation. You see exactly how your modular kitchen, wardrobes, false ceiling, and lighting look before committing."
    },
    {
      q: "Which states and regions do you currently serve?",
      a: "We actively serve homeowners across Telangana (Hyderabad, Warangal), Andhra Pradesh (Visakhapatnam, Vijayawada, Guntur), and Karnataka (Bangalore, Mysore)."
    },
    {
      q: "What warranty do I receive on modular woodwork & hardware?",
      a: "You receive an official 10-Year Comprehensive Warranty on certified IS-710 Marine BWR/HDHMR plywood against moisture and termite damage, plus lifetime warranty on authentic Blum & Hettich German soft-close mechanisms."
    },
    {
      q: "Can I visit your Experience Studios before booking?",
      a: "Yes! We have flagship Experience Studios across Telangana, Andhra Pradesh, and Karnataka featuring full-scale 2BHK/3BHK mockups, live kitchens, and 500+ material finish swatches."
    }
  ];

  const faqs = dynamicFaqs && dynamicFaqs.length > 0 ? dynamicFaqs : defaultFaqs;

  const handleCallClick = () => {
    trackEvent('call_click', { placement: 'hero', phone: brand.phone });
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { placement: 'hero' });
  };

  return (
    <div className="pt-20 sm:pt-24 font-sans bg-[#FAF8F5]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#FAF8F5] overflow-hidden py-12 lg:py-20">
        {/* Ambient Warm Gradient Background Elements */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#9B3F23]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C68B59]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2ED] border border-[#E8CFCA] text-xs font-bold text-[#9B3F23]">
                <span className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                </span>
                <span className="text-[#1E2229]">{brand.avgRating || '4.92'} / 5</span>
                <span>•</span>
                <span>{brand.happyHomes || '3,200+'} Beautiful Homes Delivered</span>
              </div>

              {/* Operating Region Badge */}
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#9B3F23]" />
                <span>Serving: {banners.servingStates || "Telangana | Andhra Pradesh | Karnataka"}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E2229] leading-[1.15] tracking-tight">
                LIVGRUHA INTERIORS <br />
                <span className="text-[#9B3F23] italic font-normal">
                  Handover in Just {banners.handoverDays || "21 Days"}.
                </span>
              </h1>

              {/* Subheadline with bespoke editorial copy */}
              <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
                Complete luxury home interiors crafted with genuine German Blum mechanisms, 100% BWR Marine Grade Plywood, and certified {banners.handoverDays || "21-Day"} handover guarantee.
              </p>

              {/* CTA Action Buttons Grid */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={open3DModal}
                  className="px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B3F23] via-[#B84A2A] to-[#C68B59] hover:opacity-95 shadow-xl shadow-[#9B3F23]/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Get Free Consultation</span>
                </button>

                <button
                  onClick={openEstimatorModal}
                  className="px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#9B3F23] bg-white border-2 border-[#E8CFCA] hover:bg-[#FAF2ED] hover:border-[#9B3F23] shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#9B3F23]" />
                  <span>Design Scope Planner</span>
                </button>

                {/* Direct WhatsApp CTA */}
                <a
                  href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi LivGruha Interiors, I am looking for interior design services. I would like to know more.")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleWhatsAppClick}
                  className="px-5 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>

                {/* Call Now CTA */}
                <a
                  href={`tel:${(brand.phone || '').replace(/[^0-9]/g, '')}`}
                  onClick={handleCallClick}
                  className="px-4 py-3.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-1.5 transition-colors"
                  title="Call Studio"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9B3F23]" />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Micro Trust Matrix */}
              <div className="pt-6 border-t border-[#E6DFD5] grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#1E2229]">{banners.handoverDays || "21 Days"}</p>
                  <p className="text-xs text-[#64748B]">Guaranteed Handover</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#9B3F23]">{brand.warrantyYears || "10 Years"}</p>
                  <p className="text-xs text-[#64748B]">Structural Warranty</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#1E2229]">100%</p>
                  <p className="text-xs text-[#64748B]">IS-710 Marine BWR</p>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Visual Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white image-zoom-container">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                  alt="Livgruha Luxury Living Room Design"
                  className="w-full h-[440px] sm:h-[500px] object-cover"
                />

                {/* Glass Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B3F23]">Featured Residence</span>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900">Japandi Warm Living Suite</h4>
                    <p className="text-[11px] text-gray-500">My Home Bhooja, Hyderabad • 3 BHK Luxury</p>
                  </div>
                  <button 
                    onClick={() => setActivePage('portfolio')}
                    className="p-2.5 rounded-xl bg-[#9B3F23] text-white hover:bg-[#83341C] transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Testimonial Pill */}
              <div className="absolute -top-4 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-10 h-10 rounded-full bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center font-serif font-bold text-sm">
                  LG
                </div>
                <div>
                  <div className="flex text-amber-500">
                    {'★★★★★'.split('').map((s, i) => <span key={i} className="text-xs">{s}</span>)}
                  </div>
                  <p className="text-[11px] font-semibold text-gray-800">"Handed over on Day 20 with 100% finish!"</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS & KEY COMMITMENTS STRIP */}
      <section className="bg-white py-12 border-y border-[#E6DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#9B3F23]">{brand.happyHomes || "3,200+"}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Homes Handed Over</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229]">{banners.handoverDays || "21 Days"}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Guaranteed Handover</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#9B3F23]">{brand.experienceCenters || 14}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Experience Studios in TS, AP, KA</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229]">{brand.warrantyYears || "10 Years"}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Comprehensive Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* POINT 10: COMPANY TIE-UPS / MOVING BRAND LOGOS */}
      <PartnerLogosTicker />

      {/* 3. TAILORED SERVICE PACKAGES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            Engineered Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
            Bespoke Interior Packages
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Tailored specifications from quick modular handovers to couture architectural villas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between border ${
                pkg.isFeatured
                  ? 'bg-white border-[#9B3F23] shadow-2xl ring-2 ring-[#9B3F23]/20 relative'
                  : 'bg-white border-[#E6DFD5] shadow-lg hover:shadow-xl'
              }`}
            >
              {pkg.isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9B3F23] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="h-48 rounded-2xl overflow-hidden mb-6 relative image-zoom-container">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                    {pkg.badge}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-serif font-bold text-[#1E2229]">{pkg.name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAF2ED] text-[#9B3F23] rounded-lg">
                    {pkg.timeline}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-6 leading-relaxed">{pkg.desc}</p>

                <div className="space-y-2.5 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Included Specifications:</p>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <Check className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={open3DModal}
                  className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    pkg.isFeatured
                      ? 'bg-[#9B3F23] hover:bg-[#83341C] text-white shadow-lg'
                      : 'bg-[#FAF2ED] hover:bg-[#9B3F23] text-[#9B3F23] hover:text-white border border-[#E8CFCA]'
                  }`}
                >
                  Book Free 3D Design Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POINT 6: HOW LIVGRUHA WORKS - 7-STEP CUSTOMER JOURNEY */}
      <HowItWorksJourney open3DModal={open3DModal} />

      {/* 4. INTERACTIVE BEFORE & AFTER TRANSFORMATION */}
      <section className="py-16 bg-[#F5F0EA] border-y border-[#E6DFD5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
              Real Site Handover
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-2.5">
              Before & After Transformation
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5">
              Witness how bare concrete spaces transform into warm, high-utility luxury homes.
            </p>
          </div>

          <BeforeAfterSlider />

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setActivePage('portfolio')}
              className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All 50+ Real Home Transformations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE LIVGRUHA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            The Livgruha Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
            Why Discerning Homeowners Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(advantages && advantages.length > 0 ? advantages : [
            {
              title: "Handover in Just 21 Days",
              desc: "Engineered factory pre-fabrication enables rapid 21-day dust-free installation.",
              icon: "Clock"
            },
            {
              title: "Free 3D Photorealistic Design",
              desc: "Experience your complete home in 3D rendering before any financial commitment.",
              icon: "Sparkles"
            },
            {
              title: "IS-710 Marine BWR Plywood",
              desc: "100% genuine boiling water resistant plywood core for lifelong structural durability.",
              icon: "ShieldCheck"
            },
            {
              title: "10-Year Comprehensive Warranty",
              desc: "Guaranteed structural and mechanism protection with free scheduled checkups.",
              icon: "Award"
            }
          ]).map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-3xl border border-[#E6DFD5] shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1E2229] mb-2">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="py-20 bg-white border-t border-[#E6DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
              Client Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
              Words From Our Happy Homeowners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div key={test.id} className="p-8 bg-[#FAF8F5] rounded-3xl border border-[#E6DFD5] flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-500 mb-4">
                    {Array.from({ length: test.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic leading-relaxed mb-6">
                    "{test.review}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E6DFD5]/60">
                  <img src={test.avatar} alt={test.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{test.name}</h4>
                    <p className="text-[11px] text-gray-500">{test.location} • {test.property}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="font-serif font-bold text-sm sm:text-base text-[#1E2229]">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#9B3F23] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-[#FAF8F5]/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section className="bg-gradient-to-r from-[#9B3F23] via-[#83341C] to-[#692713] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="px-4 py-1 rounded-full bg-white/20 text-amber-200 text-xs font-bold tracking-wider uppercase">
            Guaranteed {banners.handoverDays || "21-Day"} Handover
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white max-w-2xl mx-auto">
            Ready to Transform Your Home in {banners.handoverDays || "21 Days"}?
          </h2>
          <p className="text-sm sm:text-base text-amber-100 max-w-xl mx-auto">
            Book your free 3D design consultation today. Visit our Experience Studios across Telangana, Andhra Pradesh, and Karnataka.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={open3DModal}
              className="px-8 py-4 rounded-full font-bold text-xs sm:text-sm text-[#9B3F23] bg-white hover:bg-[#FAF8F5] shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#9B3F23]" />
              <span>Book Free 3D Design Session</span>
            </button>

            <a
              href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi LivGruha Interiors, I am looking for interior design services. I would like to know more.")}`}
              target="_blank"
              rel="noreferrer"
              onClick={handleWhatsAppClick}
              className="px-7 py-4 rounded-full font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
