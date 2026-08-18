import React, { useState } from 'react';
import { 
  Sparkles, Filter, MapPin, Clock, ArrowRight, X, 
  CheckCircle2, ChevronRight, Calculator, Eye, Layers 
} from 'lucide-react';
import { useData } from '../context/DataContext';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Projects' },
  { id: '2bhk', label: '2 BHK Apartments' },
  { id: '3bhk', label: '3 BHK Apartments' },
  { id: '4bhk', label: '4 BHK Duplexes' },
  { id: 'villa', label: 'Luxury Villas' },
];

export default function PortfolioPage({ open3DModal, openEstimatorModal }) {
  const { projects } = useData();
  const [bhkFilter, setBhkFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const filteredProjects = (projects || []).filter((proj) => {
    if (bhkFilter === 'all') return true;
    return proj.bhkCategory === bhkFilter;
  });

  const handleOpenProject = (proj) => {
    setSelectedProject(proj);
    setActiveImageIdx(0);
  };

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
          Curated Design Showcase
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229] mt-3">
          Curated Residential Transformations
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
          Explore Pinterest-inspired bespoke residences delivered across Bangalore, Hyderabad, Pune, and Mumbai with complete design specifications and architectural details.
        </p>
      </div>

      {/* 2. FILTER CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {FILTER_OPTIONS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setBhkFilter(tab.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                bhkFilter === tab.id
                  ? 'bg-[#9B3F23] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-[#FAF2ED] hover:text-[#9B3F23] border border-[#E6DFD5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PROJECT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E6DFD5] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative h-64 overflow-hidden image-zoom-container">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  {project.typology}
                </div>
                <div className="absolute top-3.5 right-3.5 bg-white text-[#9B3F23] text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {project.area}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-bold flex items-center gap-1">
                    <Eye className="w-4 h-4 text-amber-300" /> Click to Inspect 3D Details & Gallery
                  </span>
                </div>
              </div>

              {/* Project Card Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#9B3F23] font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-[#9B3F23] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#9B3F23]" />
                    <span>{project.timeline}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{project.area}</span>
                  <span className="text-[#9B3F23] font-bold flex items-center gap-0.5">
                    View Project <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box at Bottom */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 text-center">
        <div className="bg-[#FAF2ED] border border-[#E8CFCA] rounded-3xl p-8 sm:p-10 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Love One of These Designs?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Our senior architects can adapt any portfolio layout to match your exact apartment floor plan and budget.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={open3DModal}
              className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Get 3D Design For My Home</span>
            </button>
            <button
              onClick={openEstimatorModal}
              className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#9B3F23] bg-white border border-[#E8CFCA] hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Estimate Similar Look</span>
            </button>
          </div>
        </div>
      </div>

      {/* PROJECT INSPECTION MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm modal-backdrop overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E6DFD5] overflow-hidden modal-content my-6 max-h-[90vh] flex flex-col">
            
            {/* Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body Scrollable */}
            <div className="overflow-y-auto flex-1">
              {/* Active Large Image Display */}
              <div className="relative h-72 sm:h-96 w-full bg-black">
                <img
                  src={selectedProject.gallery ? selectedProject.gallery[activeImageIdx] : selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-2xl">
                  {selectedProject.typology} • {selectedProject.location}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-100 overflow-x-auto">
                  {selectedProject.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIdx === idx ? 'border-[#9B3F23] scale-105 shadow-md' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Details & Specs */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
                    {selectedProject.style}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8CFCA]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Scope</span>
                    <span className="text-sm font-bold text-[#9B3F23]">{selectedProject.scope || 'Full Modular Suite'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Carpet Area</span>
                    <span className="text-sm font-bold text-gray-900">{selectedProject.area}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Delivery Time</span>
                    <span className="text-sm font-bold text-gray-900">{selectedProject.timeline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Design Style</span>
                    <span className="text-sm font-bold text-gray-900">{selectedProject.style}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div>
                  <h4 className="font-serif font-bold text-base text-gray-900 mb-3">
                    Key Architectural Highlights & Materials:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                    {selectedProject.keyHighlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      open3DModal();
                    }}
                    className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#9B3F23] to-[#C68B59] hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Get This Exact 3D Design Customized For My Flat</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      openEstimatorModal();
                    }}
                    className="py-3.5 px-6 rounded-2xl font-bold text-xs text-gray-700 bg-gray-100 hover:bg-gray-200"
                  >
                    Calculate Cost
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
