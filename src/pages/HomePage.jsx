import React, { useState } from 'react';
import { 
  Sparkles, Calculator, ArrowRight, ShieldCheck, Clock, Award, 
  CheckCircle2, Star, ChevronDown, ChevronUp, Layers, Check, Phone, 
  Play, Building2, Eye, MapPin, Gift, MessageSquare, Compass, Palette, Home, Sparkle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { trackEvent } from '../services/analytics';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PartnerLogosTicker from '../components/PartnerLogosTicker';
import HowItWorksJourney from '../components/HowItWorksJourney';

export default function HomePage({ open3DModal, openEstimatorModal, setActivePage }) {
  const { brand, banners, packages, testimonials, advantages, faqs: dynamicFaqs } = useData();
  const [openFaq, setOpenFaq] = useState(0);

  const defaultFaqs = [
    {
      q: "How does LivGruha guarantee project handover in just 21 days?",
      a: "Our modular precision woodwork is manufactured in automated German CNC facilities while site civil work is executed in parallel. We perform rapid, dust-free on-site assembly, ensuring complete handover in just 21 days with zero quality compromise."
    },
    {
      q: "How does LivGruha provide Free 3D Design before any commitment?",
      a: "Our senior architectural designers create a photorealistic 3D virtual model of your specific floor plan during your first consultation. You see exactly how your modular kitchen, wardrobes, false ceiling, and lighting look before committing."
    },
    {
      q: "Which areas do you currently serve?",
      a: "We actively serve homeowners across Hyderabad & Telangana including Financial District, Hitec City, Jubilee Hills, Banjara Hills, Madhapur, Gachibowli, Kondapur, Kokapet, Narsingi, and surrounding residential communities."
    },
    {
      q: "What warranty do I receive on modular woodwork & hardware?",
      a: "You receive an official 10-Year Comprehensive Warranty on certified IS-710 Marine BWR/HDHMR plywood against moisture and termite damage, plus lifetime warranty on authentic Blum & Hettich German soft-close mechanisms."
    },
    {
      q: "Can I visit your Experience Studios before booking?",
      a: "Yes! We have flagship Experience Studios across Hyderabad (Financial District, Jubilee Hills, and Gachibowli) featuring full-scale 3BHK mockups, live kitchens, and 500+ material finish swatches."
    }
  ];

  const faqs = dynamicFaqs && dynamicFaqs.length > 0 ? dynamicFaqs : defaultFaqs;

  const handleCallClick = () => {
    trackEvent('call_click', { placement: 'hero', phone: brand.phone });
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { placement: 'hero' });
  };

  const coreServices = [
    {
      id: 'kitchen',
      title: 'Modular Kitchens',
      tagline: 'Blum Tandembox & Quartz Islands',
      desc: 'Ergonomic acrylic and PU kitchens engineered with German Blum lifters, anti-scratch finishes, and waterproof marine ply.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      specs: ['Blum Servo-Drive / Tandembox', 'Anti-Fingerprint Acrylic', 'Quartz Waterfall Countertop']
    },
    {
      id: 'wardrobe',
      title: 'Floor-to-Ceiling Wardrobes',
      tagline: 'Tinted Glass & Sensor Lighting',
      desc: 'Seamless sliding and walk-in closets with lacquered glass, leather drawer inlays, and integrated vanity counters.',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      specs: ['Häfele Soft-Close Sliding', 'Sensor LED Lighting', 'Bespoke Organizers & Safe']
    },
    {
      id: 'living',
      title: 'Living & Media Lounges',
      tagline: 'Japandi Fluting & Profile Cove',
      desc: 'Bespoke TV consoles with acoustic fluted louvers, concealed wiring, and ambient 3000K warm profile ceiling lighting.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      specs: ['Charcoal Wall Fluting', 'Concealed Cable Routing', 'Ambient Cove Ceiling']
    },
    {
      id: 'turnkey',
      title: 'Complete Home Turnkey',
      tagline: 'End-to-End Handover in 21 Days',
      desc: 'Civil modifications, painting with Asian Paints Royale, electrical rewiring, pooja mandir crafting, and deep cleaning.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      specs: ['100% IS-710 Marine BWR', 'Asian Paints Royale Luxury', '10-Year Warranty Certificate']
    }
  ];

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
                <span className="text-[#1E2229]">{brand.avgRating || '4.94'} / 5</span>
                <span>•</span>
                <span>{brand.happyHomes || '3,200+'} Beautiful Homes Delivered</span>
              </div>

              {/* Operating Region Badge */}
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#9B3F23]" />
                <span>Hyderabad & Telangana Flagship Studios</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E2229] leading-[1.15] tracking-tight">
                LIVGRUHA INTERIORS <br />
                <span className="text-[#9B3F23] italic font-normal">
                  Handover in Just {banners.handoverDays || "21 Days"}.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
                Complete luxury home interiors crafted with genuine German Blum mechanisms, 100% IS-710 BWR Marine Grade Plywood, and certified {banners.handoverDays || "21-Day"} handover guarantee.
              </p>

              {/* CTA Action Buttons Grid */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={open3DModal}
                  className="px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B3F23] via-[#B84A2A] to-[#C68B59] hover:opacity-95 shadow-xl shadow-[#9B3F23]/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Get Free 3D Design</span>
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
                  href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi LivGruha Interiors, I am looking for interior design services for my home. Please share design ideas and quotation details.")}`}
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
                  href={`tel:${(brand.phone || '+917995672323').replace(/[^0-9]/g, '')}`}
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
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B3F23]">Featured Residence</span>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900">Japandi Warm Living Suite</h4>
                    <p className="text-[11px] text-gray-500">My Home Bhooja, Hyderabad • 3 BHK Luxury</p>
                  </div>
                  <button 
                    onClick={() => setActivePage('portfolio')}
                    className="p-2.5 rounded-xl bg-[#9B3F23] text-white hover:bg-[#83341C] transition-colors cursor-pointer"
                    title="View Portfolio"
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

      {/* 2. BRANDS WE WORK WITH (ELEVATED PROMINENT LOGO TICKER) */}
      <PartnerLogosTicker />

      {/* 3. CORE SERVICES SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            End-to-End Interior Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
            Custom Home Interior Solutions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Every room precision-crafted in automated German CNC facilities and assembled dust-free on site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl border border-[#E6DFD5] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={srv.image} 
                    alt={srv.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200 block">
                      {srv.tagline}
                    </span>
                    <h3 className="text-lg font-serif font-bold leading-tight">
                      {srv.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    {srv.specs.map((sp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#9B3F23] shrink-0" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={open3DModal}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-[#9B3F23] bg-[#FAF2ED] hover:bg-[#9B3F23] hover:text-white transition-all flex items-center justify-center gap-1.5 border border-[#E8CFCA] cursor-pointer"
                >
                  <span>Free 3D Design Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE BEFORE & AFTER REAL TRANSFORMATIONS */}
      <section className="py-20 bg-[#F5F0EA] border-y border-[#E6DFD5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
              Real Site Handover Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-2.5">
              Before & After Transformations
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5">
              Slide to witness how bare concrete spaces transform into warm, high-utility luxury homes.
            </p>
          </div>

          <BeforeAfterSlider />

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setActivePage('portfolio')}
              className="px-7 py-3.5 rounded-full text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <span>Explore All Completed Residences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. 21-DAY HANDOVER CUSTOMER JOURNEY */}
      <HowItWorksJourney open3DModal={open3DModal} />

      {/* 6. WHY CHOOSE LIVGRUHA & MATERIAL QUALITY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            The Livgruha Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
            Why Discerning Homeowners Choose Us
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            No delays, no hidden price hikes, and no cheap filler boards. Only precision luxury craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(advantages && advantages.length > 0 ? advantages : [
            {
              title: "Handover in Just 21 Days",
              desc: "Automated German CNC pre-fabrication enables rapid 21-day dust-free installation.",
              icon: "Clock"
            },
            {
              title: "10-Year Comprehensive Warranty",
              desc: "Certified IS-710 Marine BWR Plywood core resistant to moisture, borer, and termite.",
              icon: "ShieldCheck"
            },
            {
              title: "Zero Hidden Costs",
              desc: "Detailed Bill of Quantities locked at design approval with 100% price certainty.",
              icon: "CheckCircle2"
            },
            {
              title: "100% Genuine Blum & Häfele",
              desc: "Authentic Austrian and German soft-close mechanisms with manufacturer hologram.",
              icon: "Award"
            }
          ]).map((adv, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-[#E6DFD5] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center font-bold transition-transform group-hover:scale-110">
                <ShieldCheck className="w-6 h-6 text-[#9B3F23]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1E2229] mb-2">{adv.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{adv.desc}</p>
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center text-[11px] font-semibold text-[#9B3F23]">
                <span>LivGruha Standard Guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BESPOKE INTERIOR PACKAGES & TIERS */}
      <section className="py-20 bg-white border-y border-[#E6DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
              Engineered Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
              Bespoke Interior Packages
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Tailored specifications from express modular handovers to couture architectural villas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between border ${
                  pkg.isFeatured
                    ? 'bg-white border-[#9B3F23] shadow-2xl ring-2 ring-[#9B3F23]/20 relative'
                    : 'bg-[#FAF8F5] border-[#E6DFD5] shadow-lg hover:shadow-xl'
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
                        : 'bg-white hover:bg-[#9B3F23] text-[#9B3F23] hover:text-white border border-[#E8CFCA]'
                    }`}
                  >
                    Book Free 3D Design Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS & GOOGLE REVIEWS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            Verified Homeowner Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
            Real Stories From Real Homes
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Over 3,200+ homeowners have experienced the peace of mind of our 21-day handover guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(testimonials && testimonials.length > 0 ? testimonials.slice(0, 3) : [
            {
              name: "Raghavendra & Priya Reddy",
              project: "My Home Bhooja, Hyderabad",
              bhk: "3 BHK Luxury",
              handover: "Handed over in 20 Days",
              rating: 5,
              text: "LivGruha delivered our full 3BHK interior in exactly 20 days. The German Blum soft-close kitchen and fluted TV wall are stunning. No hidden charges at all!",
              image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
            },
            {
              name: "Suresh & Anitha Rao",
              project: "Aparna Serene Park, Hyderabad",
              bhk: "3 BHK Premium",
              handover: "Handed over in 21 Days",
              rating: 5,
              text: "The free 3D design session helped us visualize every millimeter before paying a single rupee. The finishing of the floor-to-ceiling wardrobes is hotel-grade.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
            },
            {
              name: "Dr. Vikram & Sneha Joshi",
              project: "Prestige High Fields, Hyderabad",
              bhk: "4 BHK Villa",
              handover: "Handed over in 21 Days",
              rating: 5,
              text: "Zero dust during on-site assembly because everything arrived pre-drilled from their CNC factory. Truly the most professional interior team in Hyderabad.",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
            }
          ]).map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-[#E6DFD5] shadow-md flex flex-col justify-between space-y-6 text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {'★★★★★'.split('').map((s, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#9B3F23] bg-[#FAF2ED] px-2.5 py-0.5 rounded-full border border-[#E8CFCA]">
                    {t.handover || "Day 21 Handover"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center font-serif font-bold text-sm shrink-0">
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
                  <p className="text-[11px] text-gray-500">{t.project} • {t.bhk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. HYDERABAD FLAGSHIP EXPERIENCE CENTER & BRANCHES */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#E6DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E6DFD5] shadow-xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold border border-[#E8CFCA]">
                <Building2 className="w-3.5 h-3.5" />
                <span>Hyderabad Flagship Design Studios</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Experience LivGruha in Person
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Step into our full-scale 3BHK walkthrough residence, test genuine Blum and Häfele kitchen drawers, and touch over 500+ premium acrylic, PU, and veneer finishes.
              </p>

              <div className="space-y-3 text-xs text-gray-700 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Financial District Flagship Pavilion:</span>
                    <span>Plot No. 42, Silicon Valley Layout, Near WaveRock, Hitec City / Madhapur, Hyderabad - 500081</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#9B3F23] shrink-0" />
                  <span>Timings: 10:00 AM – 8:30 PM (Open All 7 Days)</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#9B3F23] shrink-0" />
                  <span>Direct Hotline: {brand.phone || "+91 79956 72323"}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={open3DModal}
                  className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Free Studio Walkthrough</span>
                </button>
                <button
                  onClick={() => setActivePage('cities')}
                  className="px-6 py-3 rounded-full text-xs font-bold text-[#9B3F23] bg-[#FAF2ED] hover:bg-[#F3E2D8] border border-[#E8CFCA] flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore All Hyderabad Branches</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-lg image-zoom-container">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                  alt="LivGruha Hyderabad Experience Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200 block">
                      Live Mockup Studio
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-bold">
                      Full 3BHK Walkthrough & Blum Experience Bay
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. FAQS & INSTANT FREE 3D DESIGN CONSULTATION BANNER */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
            Clear Answers to Common Doubts
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1E2229] hover:text-[#9B3F23] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#9B3F23] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 text-left">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final High-Conversion Action Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#9B3F23] via-[#B84A2A] to-[#C68B59] text-white text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <span className="px-3.5 py-1 rounded-full bg-white/20 text-amber-100 text-xs font-bold uppercase tracking-wider">
            Ready to Begin?
          </span>
          
          <h3 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
            Transform Your Home with Guaranteed 21-Day Handover
          </h3>
          
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl mx-auto">
            Book your Free 3D Photorealistic Design session today. 100% itemized pricing with zero surprise escalations.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={open3DModal}
              className="px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#9B3F23] bg-white hover:bg-amber-50 shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              Get Free 3D Consultation
            </button>
            <a
              href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi LivGruha Interiors, I would like to book a Free 3D Design Consultation.")}`}
              target="_blank"
              rel="noreferrer"
              onClick={handleWhatsAppClick}
              className="px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
