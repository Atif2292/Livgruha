import React from 'react';
import { 
  ShieldCheck, Award, Clock, Sparkles, Target, Compass, 
  CheckCircle2, Users, Building2, MapPin, ArrowRight 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import PartnerLogosTicker from '../components/PartnerLogosTicker';

export default function AboutPage({ open3DModal, openEstimatorModal, setActivePage }) {
  const { brand, banners } = useData();

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
          About LivGruha Interiors
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E2229] mt-3 max-w-4xl mx-auto">
          Crafting Tailored Sanctuaries with 21-Day Precision
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Founded with a mission to eliminate delays and hidden costs from interior design, LivGruha combines German automated joinery manufacturing with editorial bespoke architecture.
        </p>
      </section>

      {/* 2. VISION & MISSION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E6DFD5] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9B3F23]">Our Vision</span>
              <h3 className="text-2xl font-serif font-bold text-[#1E2229] mt-1 mb-4">
                Redefining Residential Luxury with Certainty
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                To be India's most trusted luxury interior design house, recognized for uncompromising material transparency, guaranteed 21-day handovers, and timeless Pinterest-inspired living environments.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-[#9B3F23]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero-Escalation Price Lock</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 bg-gradient-to-br from-[#9B3F23] to-[#782E17] text-white rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-amber-200 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">Our Mission</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-4">
                Delivering Flawless Homes Without the Stress
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                We empower discerning homeowners with free photorealistic 3D designs before commitment, precision-engineered German hardware, and automated factory fabrication to make interior execution joyful and seamless.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/20 flex items-center gap-2 text-xs font-bold text-amber-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>10-Year Comprehensive Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUALITY STANDARDS & COMMITMENTS */}
      <section className="py-16 bg-[#F5F0EA] border-y border-[#E6DFD5] mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
              Quality Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
              Uncompromising Quality Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "100% IS-710 BWR Marine Plywood",
                desc: "Certified boiling-water-resistant calibrated plywood for maximum durability against termites, humidity, and delamination."
              },
              {
                title: "Original German Mechanisms",
                desc: "Every hinge, flap lift, and tandem box is authentic Blum & Hettich with lifetime structural durability."
              },
              {
                title: "Automated PUR Edge-Banding",
                desc: "High-temperature polyurethane glue application ensures seamless, waterproof edges that never peel."
              },
              {
                title: "140-Point Quality Audit",
                desc: "Every cabinet, drawer, switchboard, and lighting channel is independently inspected before client handover."
              },
              {
                title: "10-Year Comprehensive Warranty",
                desc: "Official warranty certificate with free scheduled annual checkups by our senior service engineers."
              },
              {
                title: "Guaranteed 21-Day Handover",
                desc: "Strict adherence to construction milestones backed by our on-time delivery commitment."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white rounded-3xl border border-[#E6DFD5] shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-gray-900 mb-2">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BRAND PARTNERS MARQUEE */}
      <PartnerLogosTicker />

      {/* 5. BOTTOM CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#9B3F23] via-[#83341C] to-[#692713] rounded-3xl text-white shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Experience the LivGruha Difference
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl mx-auto">
            Book your free 3D design consultation or visit our Experience Studios across Telangana, Andhra Pradesh, and Karnataka.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={open3DModal}
              className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-[#9B3F23] hover:bg-amber-50 shadow-md cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free 3D Design Session</span>
            </button>
            <button
              onClick={() => setActivePage('portfolio')}
              className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white border border-white/40 hover:bg-white/10 cursor-pointer"
            >
              Explore Completed Projects
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
