/**
 * Livgruha Interiors - Lead & Conversion Tracking Analytics Engine
 * (Point 18: Acquisition Source Identification & Conversion Tracking)
 */

const STORAGE_KEYS = {
  ATTRIBUTION: 'livgruha_lead_attribution',
  EVENTS_LOG: 'livgruha_analytics_events',
  CONVERSION_METRICS: 'livgruha_conversion_metrics'
};

/**
 * Detect acquisition source based on URL UTM parameters and document referrer
 */
export function detectAcquisitionSource() {
  try {
    if (typeof window === 'undefined') return { source: 'Direct Website', medium: 'none', campaign: 'none' };

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmContent = urlParams.get('utm_content');
    const refParam = urlParams.get('ref') || urlParams.get('source');

    const referrer = document.referrer || '';

    let detectedSource = 'Direct Website';
    let detectedMedium = 'organic';

    if (utmSource) {
      detectedSource = utmSource.charAt(0).toUpperCase() + utmSource.slice(1);
      detectedMedium = utmMedium || 'cpc';
    } else if (refParam) {
      detectedSource = refParam.charAt(0).toUpperCase() + refParam.slice(1);
      detectedMedium = 'referral';
    } else if (referrer) {
      const refLower = referrer.toLowerCase();
      if (refLower.includes('instagram.com') || refLower.includes('l.instagram.com')) {
        detectedSource = 'Instagram';
        detectedMedium = 'social';
      } else if (refLower.includes('facebook.com') || refLower.includes('fb.com') || refLower.includes('m.facebook.com')) {
        detectedSource = 'Facebook';
        detectedMedium = 'social';
      } else if (refLower.includes('google.com') || refLower.includes('google.co.in')) {
        detectedSource = 'Google Organic / Search';
        detectedMedium = 'organic';
      } else if (refLower.includes('youtube.com')) {
        detectedSource = 'YouTube';
        detectedMedium = 'social';
      } else if (refLower.includes('pinterest.com') || refLower.includes('pin.it')) {
        detectedSource = 'Pinterest';
        detectedMedium = 'social';
      } else if (refLower.includes('linkedin.com')) {
        detectedSource = 'LinkedIn';
        detectedMedium = 'social';
      } else {
        try {
          const urlObj = new URL(referrer);
          detectedSource = urlObj.hostname.replace('www.', '');
          detectedMedium = 'referral';
        } catch {
          detectedSource = 'External Referrer';
        }
      }
    }

    const attribution = {
      source: detectedSource,
      medium: utmMedium || detectedMedium,
      campaign: utmCampaign || 'Direct / None',
      content: utmContent || '',
      referrer: referrer || 'Direct Navigation',
      landingPage: window.location.pathname + window.location.search,
      device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      capturedAt: new Date().toISOString()
    };

    // Store in session storage if not already stored
    if (!sessionStorage.getItem(STORAGE_KEYS.ATTRIBUTION)) {
      sessionStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(attribution));
    }

    return attribution;
  } catch (e) {
    console.error('Error detecting acquisition source:', e);
    return { source: 'Direct Website', medium: 'none', campaign: 'none', device: 'Desktop' };
  }
}

/**
 * Get the active session lead attribution info
 */
export function getActiveAttribution() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEYS.ATTRIBUTION);
    if (saved) return JSON.parse(saved);
    return detectAcquisitionSource();
  } catch {
    return { source: 'Direct Website', medium: 'none', campaign: 'none', device: 'Desktop' };
  }
}

/**
 * Track a conversion event (Call, WhatsApp Click, Form Submission, Page View)
 * @param {'call_click' | 'whatsapp_click' | 'welcome_popup_submit' | '3d_wizard_submit' | 'scope_planner_submit' | 'contact_form_submit' | 'page_view'} eventName
 * @param {Object} eventData
 */
export function trackEvent(eventName, eventData = {}) {
  try {
    const attribution = getActiveAttribution();
    const eventRecord = {
      id: 'EVT-' + Date.now().toString(36).toUpperCase(),
      eventName,
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      source: attribution.source,
      medium: attribution.medium,
      campaign: attribution.campaign,
      device: attribution.device,
      ...eventData
    };

    // 1. Save to local analytics log (capped at 500 events)
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS_LOG) || '[]');
    logs.unshift(eventRecord);
    if (logs.length > 500) logs.pop();
    localStorage.setItem(STORAGE_KEYS.EVENTS_LOG, JSON.stringify(logs));

    // 2. Increment conversion summary counters
    const metrics = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONVERSION_METRICS) || JSON.stringify({
      totalCalls: 0,
      totalWhatsAppClicks: 0,
      totalFormSubmissions: 0,
      totalPageViews: 0,
      sourcesBreakdown: {}
    }));

    if (eventName === 'call_click') metrics.totalCalls = (metrics.totalCalls || 0) + 1;
    if (eventName === 'whatsapp_click') metrics.totalWhatsAppClicks = (metrics.totalWhatsAppClicks || 0) + 1;
    if (eventName.includes('submit')) metrics.totalFormSubmissions = (metrics.totalFormSubmissions || 0) + 1;
    if (eventName === 'page_view') metrics.totalPageViews = (metrics.totalPageViews || 0) + 1;

    // Attribute source count
    const src = attribution.source || 'Direct Website';
    metrics.sourcesBreakdown = metrics.sourcesBreakdown || {};
    metrics.sourcesBreakdown[src] = (metrics.sourcesBreakdown[src] || 0) + 1;

    localStorage.setItem(STORAGE_KEYS.CONVERSION_METRICS, JSON.stringify(metrics));

    // 3. Dispatch to standard analytics providers if present (Google Analytics / Meta Pixel)
    if (typeof window !== 'undefined') {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, { ...eventRecord });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, { ...eventRecord });
      }
    }

    return eventRecord;
  } catch (err) {
    console.error('Track event error:', err);
    return null;
  }
}

/**
 * Get all analytics logs and summary metrics for the Admin Dashboard
 */
export function getAnalyticsSummary() {
  try {
    const metrics = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONVERSION_METRICS) || '{}');
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS_LOG) || '[]');
    return {
      metrics: {
        totalCalls: metrics.totalCalls || 0,
        totalWhatsAppClicks: metrics.totalWhatsAppClicks || 0,
        totalFormSubmissions: metrics.totalFormSubmissions || 0,
        totalPageViews: metrics.totalPageViews || 0,
        sourcesBreakdown: metrics.sourcesBreakdown || {}
      },
      recentEvents: logs.slice(0, 100)
    };
  } catch {
    return {
      metrics: { totalCalls: 0, totalWhatsAppClicks: 0, totalFormSubmissions: 0, totalPageViews: 0, sourcesBreakdown: {} },
      recentEvents: []
    };
  }
}

/**
 * Clear analytics log (admin only)
 */
export function resetAnalyticsData() {
  localStorage.removeItem(STORAGE_KEYS.EVENTS_LOG);
  localStorage.removeItem(STORAGE_KEYS.CONVERSION_METRICS);
}
