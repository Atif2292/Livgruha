import React, { useState } from 'react';
import { 
  MapPin, Phone, Clock, Sparkles, Building, CheckCircle2, 
  ArrowRight, ShieldCheck, Star, Users, Navigation 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function CitiesPage({ open3DModal, openEstimatorModal }) {
  const { cities, brand } = useData();
  const [selectedCityId, setSelectedCityId] = useState(cities[0]?.id || 'hyderabad');

  const selectedCity = (cities || []).find(c => c.id === selectedCityId) || cities[0] || {};

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* 1. HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA] shadow-xs">
          <Building className="w-3.5 h-3.5" />
          <span>Branches & Design Studios</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229] mt-3">
          Visit Our Hyderabad Flagship Studios
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
          Walk through full-scale modular kitchens, test German Blum mechanisms in person, and explore 500+ finishes with your dedicated Senior Architect.
        </p>
      </div>

      {/* 2. SELECTED CITY SHOWROOM DIRECTORY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* City Overview Hero Card */}
        <div className="bg-white rounded-3xl border border-[#E6DFD5] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 mb-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold border border-[#E8CFCA]">
              <span>📍 {selectedCity.name}, {selectedCity.state}</span>
              <span>•</span>
              <span>{selectedCity.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              Livgruha in {selectedCity.name}
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              With over <strong>{selectedCity.homesCompleted}</strong> residences delivered across {selectedCity.name}, our local design studios house full 3D modeling VR labs, certified master carpenters, and dedicated site supervisors for every pincode.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8CFCA] text-center">
                <span className="text-xl font-serif font-bold text-[#9B3F23] block">
                  {selectedCity.experienceCentersCount}
                </span>
                <span className="text-[11px] text-gray-500 font-semibold">Active Studios</span>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8CFCA] text-center">
                <span className="text-xl font-serif font-bold text-gray-900 block">
                  {selectedCity.homesCompleted}
                </span>
                <span className="text-[11px] text-gray-500 font-semibold">Delivered Flats</span>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8CFCA] text-center col-span-2 sm:col-span-1">
                <span className="text-xl font-serif font-bold text-[#9B3F23] block">
                  4.9★
                </span>
                <span className="text-[11px] text-gray-500 font-semibold">City Rating</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={open3DModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Book Free 3D Session in {selectedCity.name}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 shadow-md image-zoom-container">
              <img
                src={selectedCity.image}
                alt={`${selectedCity.name} Cityscape`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <p className="text-white text-xs font-semibold">
                  Designing dream residences across every neighborhood of {selectedCity.name}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Studios Listing */}
        <div className="mb-14">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>Experience Studios in {selectedCity.name}</span>
            <span className="text-xs font-sans font-semibold text-[#9B3F23] bg-[#FAF2ED] px-3 py-1 rounded-full border border-[#E8CFCA]">
              Open 7 Days a Week
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCity.centers.map((center, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#E6DFD5] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h4 className="text-base font-serif font-bold text-gray-900">{center.name}</h4>
                  <p className="text-xs text-gray-600 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                    <span>{center.address}</span>
                  </p>

                  <div className="text-xs text-gray-500 space-y-1 pt-1 border-t border-gray-100">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{center.timings}</span>
                    </p>
                    <p className="flex items-center gap-1.5 font-semibold text-gray-800">
                      <Phone className="w-3.5 h-3.5 text-[#9B3F23]" />
                      <span>{center.phone}</span>
                    </p>
                  </div>

                  {/* Studio Amenities */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Studio Features:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {center.amenities.map((am, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF8F5] text-gray-700 border border-gray-200">
                          ✓ {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={open3DModal}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#9B3F23] bg-[#FAF2ED] hover:bg-[#9B3F23] hover:text-white transition-all flex items-center justify-center gap-1.5 border border-[#E8CFCA]"
                  >
                    <span>Reserve Studio Visit Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Societies Served in This City */}
        <div className="bg-[#FAF2ED] border border-[#E8CFCA] rounded-3xl p-8 text-center space-y-4">
          <h4 className="text-xl font-serif font-bold text-gray-900">
            Top Apartment Communities Designed in {selectedCity.name}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Our teams have ready-to-use 3D floor plans and builder layout blueprints for these landmark communities:
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto pt-2">
            {selectedCity.topSocieties.map((soc, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-full bg-white text-gray-800 text-xs font-semibold border border-[#E8CFCA] shadow-sm flex items-center gap-1.5"
              >
                <Building className="w-3.5 h-3.5 text-[#9B3F23]" />
                <span>{soc}</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
