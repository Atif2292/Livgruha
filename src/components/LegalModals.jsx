import React from 'react';
import { X, ShieldCheck, FileText, Award } from 'lucide-react';

export default function LegalModals({ activeLegalModal, onClose }) {
  if (!activeLegalModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#1E2229] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-200" />
            <h3 className="font-serif font-bold text-base sm:text-lg">
              {activeLegalModal === 'privacy' && 'Privacy Policy'}
              {activeLegalModal === 'terms' && 'Terms & Conditions of Service'}
              {activeLegalModal === 'warranty' && '10-Year Comprehensive Warranty Policy'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs text-gray-700 leading-relaxed">
          {activeLegalModal === 'privacy' && (
            <>
              <p><strong>Effective Date:</strong> January 1, 2026 | <strong>Domain:</strong> livgruhainteriors.com</p>
              <h4 className="font-bold text-sm text-gray-900 pt-2">1. Data Collection & Lead Inquiries</h4>
              <p>
                LivGruha Interiors collects personal information (Name, Mobile Number, City, Property Dimensions) solely to prepare accurate 3D designs, coordinate site measurements, and provide design proposals. We never sell, rent, or trade customer contact details with third-party advertisers.
              </p>
              <h4 className="font-bold text-sm text-gray-900 pt-2">2. WhatsApp & Email Communications</h4>
              <p>
                By requesting a 3D design or quote, you authorize LivGruha to share design moodboards, progress photos, and quotation briefs via WhatsApp and email. You can opt out at any time by replying "STOP".
              </p>
              <h4 className="font-bold text-sm text-gray-900 pt-2">3. Data Security & Storage</h4>
              <p>
                All inquiries are encrypted and stored in secure cloud systems. Administrative access is restricted to verified LivGruha design coordinators.
              </p>
            </>
          )}

          {activeLegalModal === 'terms' && (
            <>
              <p><strong>Last Updated:</strong> February 2026</p>
              <h4 className="font-bold text-sm text-gray-900 pt-2">1. 21-Day Handover Guarantee</h4>
              <p>
                Our 21-day handover timeline commences upon customer approval of final architectural 2D/3D production drawings and 100% site readiness (unhindered electrical/water connection and elevator access).
              </p>
              <h4 className="font-bold text-sm text-gray-900 pt-2">2. 100% Price Lock Guarantee</h4>
              <p>
                Once production drawings and material specifications are approved, the contract price is fixed with zero price escalations for the agreed scope.
              </p>
              <h4 className="font-bold text-sm text-gray-900 pt-2">3. Genuine Material Authentication</h4>
              <p>
                LivGruha guarantees 100% certified IS-710 Boiling Water Resistant (BWR) Marine Plywood and original Blum/Hettich German mechanisms with official manufacturer QR codes.
              </p>
            </>
          )}

          {activeLegalModal === 'warranty' && (
            <>
              <h4 className="font-bold text-sm text-gray-900">10-Year Comprehensive Warranty Certificate</h4>
              <p>
                LivGruha provides an ironclad 10-Year Comprehensive Structural Warranty on all modular carcasses manufactured with certified IS-710 Marine BWR Plywood against delamination, warping, and termite infestation.
              </p>
              <h4 className="font-bold text-sm text-gray-900 pt-2">Scope of Coverage:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>10-Year structural warranty on modular kitchen and wardrobe plywood carcasses.</li>
                <li>Lifetime manufacturer warranty on genuine Blum & Hettich soft-close hinges and tandem box runners.</li>
                <li>2 complimentary annual health checkup visits by senior service engineers.</li>
              </ul>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
}
