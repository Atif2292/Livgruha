import React from 'react';
import { 
  MapPin, Phone, Clock, Sparkles, Building, CheckCircle2, 
  ArrowRight, ShieldCheck, Star, Users, Navigation 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function CitiesPage({ open3DModal, openEstimatorModal }) {
  const { brand } = useData();

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* 1. HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA] shadow-xs mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Serving Across Andhra Pradesh, Telangana &amp; Karnataka</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229]">
          Main Branch &amp; Regional Operations
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
          Visit our flagship Hyderabad Experience Studio, or schedule a doorstep 3D design consultation and turnkey installation anywhere across Andhra Pradesh, Telangana, and Karnataka.
        </p>
      </div>

      {/* 2. HYDERABAD MAIN BRANCH & EXPERIENCE STUDIO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Flagship Hero Card */}
        <div className="bg-white rounded-3xl border border-[#E6DFD5] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 mb-12 items-center">
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold border border-[#E8CFCA]">
              <span>📍 Hyderabad, Telangana</span>
              <span>•</span>
              <span>Headquarters &amp; Main Experience Studio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              Hyderabad Main Office &amp; Experience Studio
            </h2>

            <div className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                <span>2nd Floor, Manjeera Majestic Commercial Mall, JNTU Road, KPHB, Kukatpally, Hyderabad – 500072.</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600">
                <Clock className="w-4 h-4 text-[#9B3F23] shrink-0" />
                <span>Timings: 10:00 AM – 8:30 PM (Open All 7 Days)</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#9B3F23] font-bold">
                <Phone className="w-4 h-4 text-[#9B3F23] shrink-0" />
                <a href="tel:+917995672323" className="hover:underline">Helpline: +91 79956 72323</a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
              Step into our full-scale display units to test genuine German Blum soft-close mechanisms, touch 500+ finishes, and interact with senior architects in person.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8CFCA] text-center">
                <span className="text-xl font-serif font-bold text-[#9B3F23] block">
                  3,200+
                </span>
                <span className="text-[11px] text-gray-500 font-semibold">Homes Handed Over</span>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8CFCA] text-center">
                <span className="text-xl font-serif font-bold text-gray-900 block">
                  21 Days
                </span>
                <span className="text-[11px] text-gray-500 font-semibold">Guaranteed Delivery</span>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8CFCA] text-center">
                <span className="text-xl font-serif font-bold text-[#9B3F23] block">
                  4.94★
                </span>
                <span className="text-[11px] text-gray-500 font-semibold">Client Rating</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={open3DModal}
                className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Book Free 3D Design Session</span>
              </button>

              <a
                href="tel:+917995672323"
                className="px-5 py-3.5 rounded-full font-bold text-xs text-[#9B3F23] bg-[#FAF2ED] hover:bg-[#F3E2D8] border border-[#E8CFCA] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#9B3F23]" />
                <span>Call: +91 79956 72323</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-md image-zoom-container">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
                alt="Hyderabad Flagship Center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                <p className="text-white text-xs font-semibold">
                  Hyderabad Flagship Experience Studio • 2nd Floor, Manjeera Majestic Commercial Mall, KPHB.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tri-State Regional Coverage Matrix */}
        <div className="mb-14">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
            Serving Across Andhra Pradesh, Telangana &amp; Karnataka
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Telangana */}
            <div className="bg-white p-6 rounded-3xl border border-[#E6DFD5] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-gray-900">Telangana</h4>
              <p className="text-xs text-[#9B3F23] font-semibold">
                Main Branch (Kukatpally) &amp; Statewide Service
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hyderabad (KPHB, Hitec City, Gachibowli, Jubilee Hills, Secunderabad), Warangal, and Karimnagar.
              </p>
              <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>On-Site 3D Consultations &amp; 21-Day Execution</span>
              </div>
            </div>

            {/* Andhra Pradesh */}
            <div className="bg-white p-6 rounded-3xl border border-[#E6DFD5] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-gray-900">Andhra Pradesh</h4>
              <p className="text-xs text-[#9B3F23] font-semibold">
                Statewide Doorstep Service Coverage
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Visakhapatnam, Vijayawada, Guntur, Tirupati, Rajahmundry, Kakinada, and Nellore.
              </p>
              <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Doorstep Measurements &amp; Modular Handover</span>
              </div>
            </div>

            {/* Karnataka */}
            <div className="bg-white p-6 rounded-3xl border border-[#E6DFD5] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-gray-900">Karnataka</h4>
              <p className="text-xs text-[#9B3F23] font-semibold">
                Statewide Doorstep Service Coverage
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bangalore (Whitefield, Sarjapur, HSR Layout, Electronic City, Hebbal) and Mysore.
              </p>
              <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Direct Turnkey Delivery with German Blum Hardware</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
