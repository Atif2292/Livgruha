import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Mail, Sparkles, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

const OPEN_POSITIONS = [
  {
    id: 'sr-architect',
    title: 'Senior Interior Architect',
    location: 'Hyderabad / Bangalore',
    type: 'Full-Time',
    experience: '3–6 Years',
    department: 'Design & Architecture',
    desc: 'Lead luxury residential 3D design consultations, space planning, client presentations, and material selections.'
  },
  {
    id: 'site-project-mgr',
    title: 'Site Execution Project Manager',
    location: 'Telangana & Andhra Pradesh',
    type: 'Full-Time',
    experience: '4–7 Years',
    department: 'Operations & Execution',
    desc: 'Oversee 21-day on-site modular installation, civil works, 140-point quality audits, and smooth client handover.'
  },
  {
    id: '3d-visualizer',
    title: '3D Photorealistic Visualizer (3ds Max / SketchUp)',
    location: 'Bangalore Studio / Hybrid',
    type: 'Full-Time',
    experience: '2–5 Years',
    department: '3D Visualization',
    desc: 'Transform client 2D floor plans into breathtaking photorealistic 3D virtual walkthroughs with accurate lighting physics.'
  }
];

export default function CareersPage({ open3DModal }) {
  const { brand } = useData();
  const [selectedRole, setSelectedRole] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
          Join LivGruha Interiors
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229] mt-3">
          Build the Future of Interior Architecture
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
          Join a passionate collective of architects, 3D artists, and execution engineers delivering India's fastest luxury residential handovers.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {OPEN_POSITIONS.map(pos => (
            <div
              key={pos.id}
              className="p-6 bg-white rounded-3xl border border-[#E6DFD5] shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">
                  {pos.department}
                </span>
                <h3 className="font-serif font-bold text-lg text-gray-900">{pos.title}</h3>
                <p className="text-xs text-gray-600 max-w-xl">{pos.desc}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#9B3F23]" /> {pos.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-400" /> {pos.type}</span>
                  <span>• {pos.experience}</span>
                </div>
              </div>

              <a
                href={`mailto:${brand.careersEmail || 'careers@livgruhainteriors.com'}?subject=Application for ${encodeURIComponent(pos.title)}`}
                className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-md"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* General Application Callout */}
        <div className="p-8 bg-[#FAF2ED] rounded-3xl border border-[#E8CFCA] text-center space-y-4">
          <h4 className="font-serif font-bold text-lg text-gray-900">Don't see your specific role?</h4>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            We are always eager to meet talented interior designers, lighting engineers, and project leads. Send your resume and portfolio directly to our talent team.
          </p>
          <a
            href={`mailto:${brand.careersEmail || 'careers@livgruhainteriors.com'}?subject=Open Speculative Application`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#9B3F23] bg-white border border-[#E8CFCA] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#9B3F23]" />
            <span>Email: {brand.careersEmail || 'careers@livgruhainteriors.com'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
