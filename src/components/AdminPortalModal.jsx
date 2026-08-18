import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Lock, LogOut, LayoutDashboard, Users, Image as ImageIcon, 
  Settings, MessageSquare, Phone, Download, Upload, Plus, Trash2, Edit3, 
  Save, RefreshCw, CheckCircle2, TrendingUp, Globe, FileText, Database, 
  Key, AlertCircle, Sparkles, MapPin, Star, Clock, Copy, Check, Eye, EyeOff
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { 
  getAllLocalSubmissions, updateLeadRecord, deleteLeadRecord, 
  getWebhookUrl, setWebhookUrl, GOOGLE_APPS_SCRIPT_CODE 
} from '../services/googleSheets';
import { getAnalyticsSummary, resetAnalyticsData } from '../services/analytics';
import { authenticateAdmin, checkAdminAuth, logoutAdmin, changeAdminPin } from '../services/contentStore';

export default function AdminPortalModal({ isOpen, onClose }) {
  const { 
    brand, banners, projects, testimonials, cities, 
    updateSection, resetDefaults, exportBackup, importBackup 
  } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(checkAdminAuth);
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('analytics'); // analytics, leads, banners, brand, projects, testimonials, cities, sheets, backup
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState({ metrics: {}, recentEvents: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('all');

  // Form states for content editing
  const [editBanners, setEditBanners] = useState(banners);
  const [editBrand, setEditBrand] = useState(brand);
  const [editProjects, setEditProjects] = useState(projects);
  const [editTestimonials, setEditTestimonials] = useState(testimonials);
  const [editCities, setEditCities] = useState(cities);
  const [webhookInput, setWebhookInput] = useState(getWebhookUrl());

  const [newPin, setNewPin] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // New item modals / form toggles
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    id: '',
    title: '',
    typology: '3 BHK Luxury',
    bhkCategory: '3bhk',
    style: 'Modern Contemporary',
    location: '',
    city: 'hyderabad',
    area: '1,550 Sq. Ft.',
    scope: 'Full Home Interior & Modular Joinery',
    timeline: '21 Days',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '',
    keyHighlights: ['German Soft-Close Hardware', '100% BWR Marine Plywood']
  });

  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    id: Date.now(),
    name: '',
    location: 'Hyderabad, Telangana',
    property: '3 BHK Apartment',
    rating: 5,
    review: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true
  });

  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(checkAdminAuth());
      refreshData();
    }
  }, [isOpen]);

  useEffect(() => {
    setEditBanners(banners);
    setEditBrand(brand);
    setEditProjects(projects);
    setEditTestimonials(testimonials);
    setEditCities(cities);
    setWebhookInput(getWebhookUrl());
  }, [banners, brand, projects, testimonials, cities]);

  const refreshData = () => {
    setLeads(getAllLocalSubmissions());
    setAnalytics(getAnalyticsSummary());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const res = authenticateAdmin(pinInput);
    if (res.success) {
      setIsAuthenticated(true);
      setPinInput('');
      setAuthError('');
      refreshData();
    } else {
      setAuthError(res.message);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    onClose();
  };

  const showSaveSuccess = (msg = 'Changes saved successfully and live on website!') => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleSaveBanners = (e) => {
    e.preventDefault();
    updateSection('banners', editBanners);
    showSaveSuccess('Banners & Announcements updated successfully!');
  };

  const handleSaveBrand = (e) => {
    e.preventDefault();
    updateSection('brand', editBrand);
    showSaveSuccess('Brand & Contact details updated successfully!');
  };

  const handleSaveWebhook = (e) => {
    e.preventDefault();
    setWebhookUrl(webhookInput);
    showSaveSuccess('Google Sheets Webhook URL updated successfully!');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const id = newProject.id || newProject.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const updated = [{ ...newProject, id }, ...editProjects];
    setEditProjects(updated);
    updateSection('projects', updated);
    setIsAddingProject(false);
    setNewProject({
      id: '',
      title: '',
      typology: '3 BHK Luxury',
      bhkCategory: '3bhk',
      style: 'Modern Contemporary',
      location: '',
      city: 'hyderabad',
      area: '1,550 Sq. Ft.',
      scope: 'Full Home Interior & Modular Joinery',
      timeline: '21 Days',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      description: '',
      keyHighlights: ['German Soft-Close Hardware', '100% BWR Marine Plywood']
    });
    showSaveSuccess('New Project added to Portfolio successfully!');
  };

  const handleDeleteProject = (projId) => {
    if (confirm('Are you sure you want to remove this project from the portfolio?')) {
      const updated = editProjects.filter(p => p.id !== projId);
      setEditProjects(updated);
      updateSection('projects', updated);
      showSaveSuccess('Project deleted successfully.');
    }
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    const updated = [{ ...newTestimonial, id: Date.now() }, ...editTestimonials];
    setEditTestimonials(updated);
    updateSection('testimonials', updated);
    setIsAddingTestimonial(false);
    setNewTestimonial({
      id: Date.now(),
      name: '',
      location: 'Hyderabad, Telangana',
      property: '3 BHK Apartment',
      rating: 5,
      review: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true
    });
    showSaveSuccess('Client review added successfully!');
  };

  const handleDeleteTestimonial = (testId) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const updated = editTestimonials.filter(t => t.id !== testId);
      setEditTestimonials(updated);
      updateSection('testimonials', updated);
      showSaveSuccess('Testimonial removed successfully.');
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }
    const headers = ['ID', 'Date', 'Form Type', 'Source', 'Campaign', 'Device', 'Name', 'Phone', 'Email', 'City', 'Property Type', 'Status', 'Notes'];
    const rows = leads.map(l => [
      l.id,
      l.formattedDate || l.timestamp,
      l.formType,
      l.source || 'Direct Website',
      l.campaign || 'None',
      l.device || 'Desktop',
      `"${(l.fullName || l.name || '').replace(/"/g, '""')}"`,
      l.phone || '',
      l.email || '',
      l.city || '',
      l.propertyType || l.bhk || '',
      l.status || 'New Lead',
      `"${(l.notes || l.additionalNotes || l.campaignOffer || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `livgruha_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content) {
        const res = importBackup(content);
        if (res.success) {
          showSaveSuccess('Full website content restored from backup!');
        } else {
          alert(res.message);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleLeadStatusChange = (leadId, newStatus) => {
    updateLeadRecord(leadId, { status: newStatus });
    setLeads(getAllLocalSubmissions());
  };

  const handleDeleteLead = (leadId) => {
    if (confirm('Delete this lead record permanently?')) {
      deleteLeadRecord(leadId);
      setLeads(getAllLocalSubmissions());
    }
  };

  const filteredLeads = leads.filter(lead => {
    const nameMatch = (lead.fullName || lead.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = (lead.phone || '').includes(searchTerm);
    const cityMatch = (lead.city || '').toLowerCase().includes(searchTerm.toLowerCase());
    const sourceMatch = selectedSourceFilter === 'all' || (lead.source || 'Direct Website') === selectedSourceFilter;
    return (nameMatch || phoneMatch || cityMatch) && sourceMatch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md">
      <div 
        className="relative w-full max-w-6xl h-[92vh] rounded-3xl shadow-2xl border border-[#E6DFD5] overflow-hidden flex flex-col bg-white text-[#1E2229]"
        style={{ backgroundColor: '#FFFFFF', color: '#1E2229' }}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-[#1E2229] text-white flex items-center justify-between border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#9B3F23] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  LivGruha Administration & Control Portal
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#9B3F23]/40 border border-[#9B3F23] text-[10px] font-bold text-amber-200">
                  Enterprise Control
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                100% Brand Ownership • Real-Time Lead Attribution • Dynamic CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate (If not logged in) */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#FAF8F5]">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#E6DFD5] shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF2ED] text-[#9B3F23] flex items-center justify-center mx-auto shadow-inner border border-[#E8CFCA]">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-[10px] font-bold uppercase tracking-wider border border-[#E8CFCA]">
                  Restricted Management Gate
                </span>
                <h4 className="text-2xl font-serif font-bold text-gray-900 mt-2">
                  Admin & Leads Hub
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Enter your confidential Administrator Password to access lead CRM, Google Sheets webhook, and CMS controls.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {authError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center gap-2 justify-center animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    placeholder="Enter Admin Password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 text-center text-sm font-mono tracking-wider rounded-2xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 outline-none bg-white shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-lg shadow-[#9B3F23]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  <span>Authenticate & Open Portal</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#FAF8F5] border-r border-[#E6DFD5] p-4 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto shrink-0 space-y-1">
              <div className="space-y-1 w-full flex md:flex-col gap-1 md:gap-0">
                {[
                  { id: 'analytics', label: 'Lead Analytics & Sources', icon: LayoutDashboard },
                  { id: 'leads', label: 'Inquiries CRM Table', icon: Users, badge: leads.length },
                  { id: 'banners', label: 'Banners & 21-Day USP', icon: Sparkles },
                  { id: 'brand', label: 'Brand & Contact Info', icon: Phone },
                  { id: 'projects', label: 'Portfolio Projects', icon: ImageIcon, badge: editProjects.length },
                  { id: 'testimonials', label: 'Client Reviews', icon: Star, badge: editTestimonials.length },
                  { id: 'cities', label: 'Locations & Studios', icon: MapPin },
                  { id: 'sheets', label: 'Google Sheets Webhook', icon: Database },
                  { id: 'backup', label: 'Backup & Ownership', icon: ShieldCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                        activeTab === item.id
                          ? 'bg-[#9B3F23] text-white shadow-md'
                          : 'text-gray-700 hover:bg-[#FAF2ED] hover:text-[#9B3F23]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          activeTab === item.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Admin Status Info */}
              <div className="hidden md:block pt-4 border-t border-gray-200 text-[11px] text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Domain:</span>
                  <span className="font-semibold text-gray-800">livgruhainteriors.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating:</span>
                  <span className="font-semibold text-emerald-700">TS • AP • KA</span>
                </div>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white space-y-6">
              
              {/* Live Save Success Alert */}
              {saveSuccessMsg && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-xs animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 1: LEAD & CONVERSION ANALYTICS (POINT 18)        */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9B3F23]">
                      Lead & Conversion Tracking
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                      Lead Acquisition & Conversion Overview
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Real-time measurement of where inquiries originate (Google, Instagram, Facebook, Direct) and visitor actions.
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-gradient-to-br from-[#9B3F23] to-[#782E17] text-white rounded-2xl shadow-md">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-amber-200">Total Form Leads</span>
                        <Users className="w-4 h-4 text-amber-200" />
                      </div>
                      <div className="text-2xl font-bold font-serif mt-2">{leads.length}</div>
                      <span className="text-[10px] text-white/80 mt-1 block">Inquiries Synced</span>
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-emerald-800">WhatsApp Clicks</span>
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-2xl font-bold font-serif text-emerald-900 mt-2">
                        {analytics.metrics.totalWhatsAppClicks || 0}
                      </div>
                      <span className="text-[10px] text-emerald-700 mt-1 block">Direct Chat Inquiries</span>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-blue-800">Phone Call Clicks</span>
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold font-serif text-blue-900 mt-2">
                        {analytics.metrics.totalCalls || 0}
                      </div>
                      <span className="text-[10px] text-blue-700 mt-1 block">Direct Hotline Dials</span>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-amber-900">Total Page Views</span>
                        <TrendingUp className="w-4 h-4 text-amber-700" />
                      </div>
                      <div className="text-2xl font-bold font-serif text-amber-900 mt-2">
                        {analytics.metrics.totalPageViews || 1}
                      </div>
                      <span className="text-[10px] text-amber-700 mt-1 block">Session Engagement</span>
                    </div>
                  </div>

                  {/* Acquisition Sources Breakdown */}
                  <div className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#E6DFD5] space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-gray-900">
                        Lead Acquisition Channel Breakdown
                      </h4>
                      <button
                        onClick={refreshData}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Refresh</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 'Google Search / Organic', count: leads.filter(l => (l.source || '').toLowerCase().includes('google')).length, color: 'bg-blue-600' },
                        { label: 'Instagram Ads / Bio Link', count: leads.filter(l => (l.source || '').toLowerCase().includes('instagram')).length, color: 'bg-pink-600' },
                        { label: 'Facebook Campaigns', count: leads.filter(l => (l.source || '').toLowerCase().includes('facebook')).length, color: 'bg-indigo-600' },
                        { label: 'Direct Website Visitors', count: leads.filter(l => (l.source || '').includes('Direct') || (l.source || '').includes('Website')).length, color: 'bg-[#9B3F23]' },
                        { label: 'Pinterest & Other Referrals', count: leads.filter(l => (l.source || '').toLowerCase().includes('pinterest') || (l.source || '').toLowerCase().includes('referral')).length, color: 'bg-amber-600' },
                      ].map((src, i) => {
                        const pct = leads.length > 0 ? Math.round((src.count / leads.length) * 100) : 0;
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>{src.label}</span>
                              <span className="text-gray-500">{src.count} Leads ({pct}%)</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-full ${src.color} transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Analytics Events Feed */}
                  <div className="p-6 bg-white rounded-3xl border border-[#E6DFD5] space-y-3">
                    <h4 className="font-serif font-bold text-base text-gray-900">
                      Recent Live Conversion Events
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
                      {analytics.recentEvents.length === 0 ? (
                        <p className="text-gray-400 italic">No events captured in current session yet.</p>
                      ) : (
                        analytics.recentEvents.slice(0, 15).map(evt => (
                          <div key={evt.id} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                              <span className="font-bold text-gray-800 uppercase text-[10px] tracking-wider font-mono">
                                {evt.eventName.replace(/_/g, ' ')}
                              </span>
                              <span className="text-gray-500 text-[11px]">({evt.source || 'Direct'})</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">{evt.formattedTime}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 2: INQUIRIES CRM TABLE                           */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-gray-900">
                        Inquiries & Leads CRM ({leads.length})
                      </h2>
                      <p className="text-xs text-gray-500">
                        Complete record of customer consultations with full acquisition source tracking.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export CSV / Excel</span>
                      </button>
                    </div>
                  </div>

                  {/* Filters & Search */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Search by name, phone or city..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#9B3F23]"
                    />

                    <select
                      value={selectedSourceFilter}
                      onChange={(e) => setSelectedSourceFilter(e.target.value)}
                      className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:border-[#9B3F23]"
                    >
                      <option value="all">All Acquisition Sources</option>
                      <option value="Direct Website">Direct Website</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Google Organic / Search">Google Search</option>
                      <option value="Facebook">Facebook</option>
                    </select>

                    <button
                      onClick={refreshData}
                      className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-gray-50 hover:bg-gray-100 flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reload Leads</span>
                    </button>
                  </div>

                  {/* Leads Table */}
                  <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-gray-700">
                        <thead className="bg-[#FAF8F5] border-b border-gray-200 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                          <tr>
                            <th className="p-3.5">Client & Phone</th>
                            <th className="p-3.5">City & BHK</th>
                            <th className="p-3.5">Acquisition Source</th>
                            <th className="p-3.5">Form / Requirement</th>
                            <th className="p-3.5">Lead Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredLeads.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-gray-400 italic">
                                No matching inquiries found. Test submitting a form on the site to see it populate here instantly!
                              </td>
                            </tr>
                          ) : (
                            filteredLeads.map((lead) => (
                              <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="p-3.5">
                                  <div className="font-bold text-gray-900">{lead.fullName || lead.name || 'Anonymous'}</div>
                                  <div className="text-gray-500 font-mono text-[11px] flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-emerald-600" />
                                    <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                                  </div>
                                </td>
                                <td className="p-3.5">
                                  <div className="font-semibold text-gray-800">{lead.city || 'Bangalore'}</div>
                                  <div className="text-gray-500 text-[11px]">{lead.propertyType || lead.bhk || '3 BHK'}</div>
                                </td>
                                <td className="p-3.5">
                                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                                    {lead.source || 'Direct Website'}
                                  </span>
                                  {lead.campaign && lead.campaign !== 'None' && (
                                    <span className="block text-[10px] text-gray-400 mt-0.5 truncate max-w-[100px]">
                                      {lead.campaign}
                                    </span>
                                  )}
                                </td>
                                <td className="p-3.5 max-w-xs">
                                  <div className="font-semibold text-gray-800 text-[11px]">{lead.formType}</div>
                                  <div className="text-gray-500 text-[11px] truncate">
                                    {lead.notes || lead.additionalNotes || lead.qualityTier || lead.campaignOffer || 'Standard Consultation'}
                                  </div>
                                </td>
                                <td className="p-3.5">
                                  <select
                                    value={lead.status || 'New Lead'}
                                    onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                                    className="px-2 py-1 rounded-lg border border-gray-300 text-[11px] font-semibold bg-white focus:outline-none"
                                  >
                                    <option value="New Lead">🟢 New Lead</option>
                                    <option value="Contacted">🟡 Contacted</option>
                                    <option value="In 3D Design">🔵 In 3D Design</option>
                                    <option value="Site Visited">🟣 Site Visited</option>
                                    <option value="Closed / Won">⭐ Closed / Won</option>
                                  </select>
                                </td>
                                <td className="p-3.5 text-right space-x-2">
                                  <a
                                    href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.fullName || '')},%20this%20is%20LivGruha%20Interiors%20regarding%20your%20design%20consultation.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 inline-block"
                                    title="Open WhatsApp Chat with Client"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                                    title="Delete Record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 3: BANNERS & 21-DAY USP (POINT 19)               */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'banners' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                      Banners, Headlines & Handover USP
                    </h2>
                    <p className="text-xs text-gray-500">
                      Update announcement tickers, 21-day handover commitments, and promo messaging without developer assistance.
                    </p>
                  </div>

                  <form onSubmit={handleSaveBanners} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Top Announcement Bar Ticker
                      </label>
                      <input
                        type="text"
                        value={editBanners.topOfferBar}
                        onChange={(e) => setEditBanners({ ...editBanners, topOfferBar: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Primary Hero Headline
                        </label>
                        <input
                          type="text"
                          value={editBanners.heroHeadline}
                          onChange={(e) => setEditBanners({ ...editBanners, heroHeadline: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Handover Commitment Guarantee
                        </label>
                        <input
                          type="text"
                          value={editBanners.handoverDays}
                          onChange={(e) => setEditBanners({ ...editBanners, handoverDays: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none font-bold text-[#9B3F23]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Operating States Tagline
                      </label>
                      <input
                        type="text"
                        value={editBanners.servingStates}
                        onChange={(e) => setEditBanners({ ...editBanners, servingStates: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Welcome Modal Title
                        </label>
                        <input
                          type="text"
                          value={editBanners.welcomeOfferTitle}
                          onChange={(e) => setEditBanners({ ...editBanners, welcomeOfferTitle: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Welcome Modal Badge
                        </label>
                        <input
                          type="text"
                          value={editBanners.welcomeOfferBadge}
                          onChange={(e) => setEditBanners({ ...editBanners, welcomeOfferBadge: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Banners & Headlines</span>
                    </button>
                  </form>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 4: BRAND & CONTACT INFO (POINT 19)               */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'brand' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                      Brand Profile & Contact Settings
                    </h2>
                    <p className="text-xs text-gray-500">
                      Update official phone numbers, WhatsApp numbers, domain emails, and working hours.
                    </p>
                  </div>

                  <form onSubmit={handleSaveBrand} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Official WhatsApp Number (With Country Code)
                        </label>
                        <input
                          type="text"
                          value={editBrand.whatsapp}
                          onChange={(e) => setEditBrand({ ...editBrand, whatsapp: e.target.value })}
                          placeholder="+917995672323"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none font-mono"
                        />
                        <span className="text-[10px] text-gray-400">All WhatsApp clicks will direct clients to this number.</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Official Phone Hotline
                        </label>
                        <input
                          type="text"
                          value={editBrand.phone}
                          onChange={(e) => setEditBrand({ ...editBrand, phone: e.target.value })}
                          placeholder="+91 79956 72323"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          General Inquiries Email
                        </label>
                        <input
                          type="email"
                          value={editBrand.email}
                          onChange={(e) => setEditBrand({ ...editBrand, email: e.target.value })}
                          placeholder="info@livgruhainteriors.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Brand Tagline
                        </label>
                        <input
                          type="text"
                          value={editBrand.tagline}
                          onChange={(e) => setEditBrand({ ...editBrand, tagline: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-200">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Happy Homes Count
                        </label>
                        <input
                          type="text"
                          value={editBrand.happyHomes}
                          onChange={(e) => setEditBrand({ ...editBrand, happyHomes: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Experience Studios
                        </label>
                        <input
                          type="number"
                          value={editBrand.experienceCenters}
                          onChange={(e) => setEditBrand({ ...editBrand, experienceCenters: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Warranty Period
                        </label>
                        <input
                          type="text"
                          value={editBrand.warrantyYears}
                          onChange={(e) => setEditBrand({ ...editBrand, warrantyYears: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#9B3F23] outline-none font-bold text-emerald-700"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Brand & Contact Details</span>
                    </button>
                  </form>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 5: PORTFOLIO PROJECTS MANAGER (POINT 19)         */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-gray-900">
                        Portfolio Projects ({editProjects.length})
                      </h2>
                      <p className="text-xs text-gray-500">
                        Manage genuine LivGruha project showcase cards, images, and scopes.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingProject(!isAddingProject)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {/* Add Project Form Drawer */}
                  {isAddingProject && (
                    <form onSubmit={handleAddProject} className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#E8CFCA] space-y-4 animate-fadeIn">
                      <h4 className="font-serif font-bold text-base text-gray-900">Create New Project</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Project Title (e.g. The Emerald Penthouse)"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs bg-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Location (e.g. Hitec City, Hyderabad)"
                          value={newProject.location}
                          onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <select
                          value={newProject.bhkCategory}
                          onChange={(e) => setNewProject({ ...newProject, bhkCategory: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                        >
                          <option value="2bhk">2 BHK</option>
                          <option value="3bhk">3 BHK</option>
                          <option value="4bhk">4 BHK</option>
                          <option value="villa">Villa</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Carpet Area (e.g. 1,650 Sq. Ft.)"
                          value={newProject.area}
                          onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                          className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                        />

                        <input
                          type="text"
                          placeholder="Handover Timeline (e.g. 21 Days)"
                          value={newProject.timeline}
                          onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value })}
                          className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                          Cover Image URL (High-Res Unsplash / Cloudinary)
                        </label>
                        <input
                          type="url"
                          required
                          value={newProject.coverImage}
                          onChange={(e) => setNewProject({ ...newProject, coverImage: e.target.value, gallery: [e.target.value] })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white font-mono"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          required
                          placeholder="Short description of the home transformation..."
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingProject(false)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-200 hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C]"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Project Cards List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editProjects.map(proj => (
                      <div key={proj.id} className="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-200 flex gap-3 items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={proj.coverImage} alt={proj.title} className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-xs text-gray-900">{proj.title}</h4>
                            <p className="text-[11px] text-gray-500">{proj.location} • {proj.area}</p>
                            <span className="text-[10px] font-semibold text-[#9B3F23] uppercase">{proj.scope}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 6: CLIENT TESTIMONIALS (POINT 19)                */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-gray-900">
                        Client Testimonials ({editTestimonials.length})
                      </h2>
                      <p className="text-xs text-gray-500">
                        Manage homeowner reviews, ratings, and video testimonial links.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Testimonial</span>
                    </button>
                  </div>

                  {isAddingTestimonial && (
                    <form onSubmit={handleAddTestimonial} className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#E8CFCA] space-y-4 animate-fadeIn">
                      <h4 className="font-serif font-bold text-base text-gray-900">Add New Client Review</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Client Name"
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs bg-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Location (e.g. Gachibowli, Hyderabad)"
                          value={newTestimonial.location}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs bg-white"
                        />
                      </div>
                      <textarea
                        rows={2}
                        required
                        placeholder="Client's review text..."
                        value={newTestimonial.review}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, review: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingTestimonial(false)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-200 hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C]"
                        >
                          Save Review
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {editTestimonials.map(t => (
                      <div key={t.id} className="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-200 flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-xs text-gray-900">{t.name}</h4>
                              <span className="text-[10px] text-amber-600 font-bold">★ {t.rating || 5}.0</span>
                            </div>
                            <p className="text-[11px] text-gray-500">{t.location} • {t.property}</p>
                            <p className="text-xs text-gray-700 mt-1 italic leading-relaxed">"{t.review}"</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer shrink-0"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 7: CITIES & STUDIOS                              */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'cities' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                      Operating Cities & Experience Studios
                    </h2>
                    <p className="text-xs text-gray-500">
                      Current hubs across Telangana, Andhra Pradesh, and Karnataka.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editCities.map(city => (
                      <div key={city.id} className="p-5 bg-[#FAF8F5] rounded-2xl border border-gray-200 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-serif font-bold text-base text-gray-900">{city.name}</h4>
                            <span className="text-xs font-semibold text-[#9B3F23]">{city.state}</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-white text-xs font-bold border border-gray-200">
                            {city.experienceCentersCount} Studios
                          </span>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600">
                          {city.centers?.map((ctr, idx) => (
                            <div key={idx} className="p-2.5 bg-white rounded-xl border border-gray-100">
                              <span className="font-bold text-gray-800 block">{ctr.name}</span>
                              <span className="text-[11px] text-gray-500 block mt-0.5">{ctr.address}</span>
                              <span className="text-[10px] text-emerald-700 font-mono block mt-1">📞 {ctr.phone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 8: GOOGLE SHEETS WEBHOOK (POINT 18 & 19)         */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'sheets' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                      Google Sheets Live CRM Webhook
                    </h2>
                    <p className="text-xs text-gray-500">
                      Sync website leads automatically into your Google Spreadsheet.
                    </p>
                  </div>

                  <form onSubmit={handleSaveWebhook} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Google Apps Script Web App URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                          value={webhookInput}
                          onChange={(e) => setWebhookInput(e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:border-[#9B3F23] outline-none"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#9B3F23] hover:bg-[#83341C] cursor-pointer"
                        >
                          Save URL
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Code Box for Copy-Paste */}
                  <div className="p-5 bg-[#FAF8F5] rounded-3xl border border-[#E6DFD5] space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-1.5">
                        <Database className="w-4 h-4 text-[#9B3F23]" />
                        <span>Google Apps Script Code (Includes Lead Attribution)</span>
                      </h4>
                      <button
                        onClick={handleCopyCode}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>

                    <pre className="p-4 bg-gray-900 text-amber-100 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-48">
                      {GOOGLE_APPS_SCRIPT_CODE}
                    </pre>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 9: BACKUP & OWNERSHIP (POINTS 19 & 20)           */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                      Website Ownership & Full Data Backup
                    </h2>
                    <p className="text-xs text-gray-500">
                      LivGruha owns 100% of all data, media, projects, and leads without developer lock-in.
                    </p>
                  </div>

                  {/* 1-Click Backups & Restore */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8CFCA] space-y-3">
                      <h4 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#9B3F23]" />
                        <span>Export Full Data Backup (JSON)</span>
                      </h4>
                      <p className="text-xs text-gray-600">
                        Download a complete snapshot of all portfolio projects, testimonials, leads, banners, and settings.
                      </p>
                      <button
                        onClick={exportBackup}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] cursor-pointer"
                      >
                        Download Backup JSON File
                      </button>
                    </div>

                    <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8CFCA] space-y-3">
                      <h4 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-2">
                        <Upload className="w-4 h-4 text-emerald-700" />
                        <span>Restore Data from Backup File</span>
                      </h4>
                      <p className="text-xs text-gray-600">
                        Upload a previously exported JSON backup file to instantly restore all website content.
                      </p>
                      <label className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 cursor-pointer block text-center border border-emerald-300">
                        <span>Select JSON Backup File</span>
                        <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Security PIN update */}
                  <div className="p-5 bg-white rounded-2xl border border-gray-200 space-y-3">
                    <h4 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-2">
                      <Key className="w-4 h-4 text-[#9B3F23]" />
                      <span>Change Master Administrator PIN</span>
                    </h4>
                    <div className="flex gap-2 max-w-sm">
                      <input
                        type="password"
                        placeholder="Enter new 4+ character PIN"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                      />
                      <button
                        onClick={() => {
                          const res = changeAdminPin(newPin);
                          if (res.success) {
                            showSaveSuccess(res.message);
                            setNewPin('');
                          } else {
                            alert(res.message);
                          }
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gray-900 hover:bg-black cursor-pointer"
                      >
                        Update PIN
                      </button>
                    </div>
                  </div>

                  {/* Reset to Factory Defaults */}
                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-gray-900">Reset Content to Factory Template</h5>
                      <p className="text-[11px] text-gray-500">Reverts all dynamic text, projects, and testimonials back to original.</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all website content to defaults?')) {
                          resetDefaults();
                          showSaveSuccess('Content reset to factory defaults.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer"
                    >
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
