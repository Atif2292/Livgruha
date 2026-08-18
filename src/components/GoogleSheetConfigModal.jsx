import React, { useState, useEffect } from 'react';
import { 
  X, Database, Copy, Check, ExternalLink, Download, Trash2, 
  Settings, ShieldCheck, RefreshCw, CheckCircle2 
} from 'lucide-react';
import { 
  getWebhookUrl, setWebhookUrl, getAllLocalSubmissions, GOOGLE_APPS_SCRIPT_CODE 
} from '../services/googleSheets';

export default function GoogleSheetConfigModal({ isOpen, onClose }) {
  const [webhookInput, setWebhookInput] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('config'); // 'config' | 'submissions' | 'script'

  useEffect(() => {
    if (isOpen) {
      setWebhookInput(getWebhookUrl());
      setSubmissions(getAllLocalSubmissions());

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveUrl = (e) => {
    e.preventDefault();
    setWebhookUrl(webhookInput);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleExportCSV = () => {
    if (!submissions.length) {
      alert('No submissions yet to export.');
      return;
    }

    const headers = ['ID', 'Timestamp', 'Form Type', 'Full Name', 'Phone', 'Email', 'City', 'Property Type', 'Budget', 'Details'];
    const rows = submissions.map(s => [
      `"${s.id || ''}"`,
      `"${s.timestamp || ''}"`,
      `"${s.formType || ''}"`,
      `"${s.fullName || s.name || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.email || ''}"`,
      `"${s.city || ''}"`,
      `"${s.propertyType || s.bhk || ''}"`,
      `"${s.budget || s.estimatedCost || ''}"`,
      `"${(s.scope ? s.scope.join('; ') : '') || s.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `livgruha_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLocal = () => {
    if (window.confirm('Are you sure you want to clear local lead records?')) {
      localStorage.removeItem('livgruha_all_submissions');
      setSubmissions([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm modal-backdrop overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E6DFD5] overflow-hidden modal-content my-6">
        
        {/* Top Header */}
        <div className="bg-[#1E2229] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <Database className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                Google Sheets Integration & Lead Data Center
              </h3>
              <p className="text-xs text-gray-400">
                Direct live synchronization for welcome modal, 3D design bookings, & estimate inquiries.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6 pt-3 gap-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'config'
                ? 'border-[#9B3F23] text-[#9B3F23]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Webhook Setup
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'submissions'
                ? 'border-[#9B3F23] text-[#9B3F23]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>Live Leads Database</span>
            <span className="px-2 py-0.5 rounded-full bg-[#9B3F23]/10 text-[#9B3F23] text-[10px]">
              {submissions.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'script'
                ? 'border-[#9B3F23] text-[#9B3F23]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Google Apps Script Code (Copy-Paste)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: WEBHOOK CONFIG */}
          {activeTab === 'config' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Automatic Redundant Fail-Safe Active</p>
                  <p className="text-emerald-800 mt-0.5">
                    All form submissions (Welcome Pop-up, Free 3D Design, and Estimates) are automatically stored locally and immediately dispatched to your Google Sheets webhook endpoint.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveUrl} className="space-y-3">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Google Apps Script Web App Deployment URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    value={webhookInput}
                    onChange={(e) => setWebhookInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-xs font-mono outline-none"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md transition-colors"
                  >
                    Save URL
                  </button>
                </div>
                {savedStatus && (
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Webhook configuration updated!
                  </p>
                )}
              </form>

              {/* 3 Step Quick Setup Guide */}
              <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  3-Minute Quick Google Sheet Setup:
                </h4>
                <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside">
                  <li>
                    Open a new Google Sheet on your Google Drive (name it <em>"Livgruha Interiors Leads"</em>).
                  </li>
                  <li>
                    Go to <strong>Extensions &gt; Apps Script</strong>, paste the code from the <strong>Script</strong> tab, and click <strong>Deploy &gt; New deployment &gt; Web app</strong>.
                  </li>
                  <li>
                    Set <strong>"Who has access"</strong> to <strong>"Anyone"</strong>, click Deploy, and paste the generated URL above!
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE LEADS SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600 font-medium">
                  Showing <strong>{submissions.length}</strong> recorded inquiries:
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                  {submissions.length > 0 && (
                    <button
                      onClick={handleClearLocal}
                      className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-gray-100 text-red-600 hover:bg-red-50 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl">
                  <Database className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-600">No submissions recorded yet</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Try submitting the Welcome Modal or Free 3D Design form to see live data populate here.
                  </p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 border-b border-gray-200 font-bold">
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Client Name</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">City & BHK</th>
                        <th className="p-3">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                      {submissions.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/80">
                          <td className="p-3 font-mono font-bold text-[#9B3F23]">{sub.id}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF2ED] text-[#9B3F23] border border-[#E8CFCA]">
                              {sub.formType}
                            </span>
                          </td>
                          <td className="p-3 font-semibold">{sub.fullName || sub.name}</td>
                          <td className="p-3 font-mono">{sub.phone}</td>
                          <td className="p-3">{sub.city} • {sub.propertyType || sub.bhk}</td>
                          <td className="p-3 text-[11px] text-gray-500">{sub.formattedDate || sub.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: APPS SCRIPT CODE */}
          {activeTab === 'script' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  Copy and paste this script directly into Google Apps Script:
                </p>
                <button
                  onClick={handleCopyCode}
                  className="py-1.5 px-3 rounded-lg text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] flex items-center gap-1.5 shadow-sm"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Code Copied!' : 'Copy Apps Script'}</span>
                </button>
              </div>

              <div className="relative bg-[#18181B] text-amber-200 p-4 rounded-2xl text-xs font-mono overflow-x-auto max-h-80 border border-gray-800">
                <pre>{GOOGLE_APPS_SCRIPT_CODE}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
