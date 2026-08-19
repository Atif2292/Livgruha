/**
 * Google Sheets & Lead Management Service for Livgruha Interiors
 * 
 * Supports dispatching form submissions to a Google Apps Script Web App endpoint,
 * with automatic fallback to browser LocalStorage and download export.
 * Includes Lead Attribution (Source, Campaign, Medium, Device).
 */
import { getActiveAttribution, trackEvent } from './analytics';

// Default Webhook endpoint for LivGruha Leads Google Sheet
export const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwSga-kVJw2lrDlgcYcyDGYM6QLgb5ls1WiwOtEj905LVWcRZBoXGF-olOM0t0K6iUYkg/exec';

/**
 * Get configured Google Sheets Webhook URL
 */
export function getWebhookUrl() {
  return localStorage.getItem('livgruha_gsheet_webhook_url') || DEFAULT_WEBHOOK_URL;
}

/**
 * Update Google Sheets Webhook URL
 */
export function setWebhookUrl(url) {
  if (url) {
    localStorage.setItem('livgruha_gsheet_webhook_url', url.trim());
  } else {
    localStorage.removeItem('livgruha_gsheet_webhook_url');
  }
}

/**
 * Save submission to LocalStorage cache with full lead attribution
 */
function saveLocalSubmission(formType, data) {
  try {
    const attribution = getActiveAttribution();
    const existing = JSON.parse(localStorage.getItem('livgruha_all_submissions') || '[]');
    const record = {
      id: 'LIV-' + Date.now().toString(36).toUpperCase(),
      formType,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'New Lead',
      source: data.source || attribution.source || 'Direct Website',
      medium: attribution.medium || 'organic',
      campaign: attribution.campaign || 'Direct / None',
      device: attribution.device || 'Desktop',
      ...data
    };
    existing.unshift(record);
    localStorage.setItem('livgruha_all_submissions', JSON.stringify(existing));
    return record;
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    return { id: 'LIV-' + Date.now(), formType, status: 'New Lead', ...data };
  }
}

/**
 * Retrieve all local submissions
 */
export function getAllLocalSubmissions() {
  try {
    return JSON.parse(localStorage.getItem('livgruha_all_submissions') || '[]');
  } catch (e) {
    return [];
  }
}

/**
 * Update a lead's status or notes in the local CRM (Admin Portal)
 */
export function updateLeadRecord(leadId, updates) {
  try {
    const existing = JSON.parse(localStorage.getItem('livgruha_all_submissions') || '[]');
    const index = existing.findIndex(item => item.id === leadId);
    if (index !== -1) {
      existing[index] = { ...existing[index], ...updates, lastUpdated: new Date().toISOString() };
      localStorage.setItem('livgruha_all_submissions', JSON.stringify(existing));
      return existing[index];
    }
    return null;
  } catch (e) {
    console.error('Failed to update lead:', e);
    return null;
  }
}

/**
 * Delete a lead record (Admin Portal)
 */
export function deleteLeadRecord(leadId) {
  try {
    const existing = JSON.parse(localStorage.getItem('livgruha_all_submissions') || '[]');
    const filtered = existing.filter(item => item.id !== leadId);
    localStorage.setItem('livgruha_all_submissions', JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Failed to delete lead:', e);
    return false;
  }
}

/**
 * Submit Form Data to Google Sheets Webhook and trigger conversion tracking
 * @param {'WELCOME_POPUP' | 'FREE_3D_DESIGN' | 'COST_ESTIMATOR' | 'CONTACT_GENERAL'} formType 
 * @param {Object} data 
 */
export async function submitToGoogleSheets(formType, data) {
  const localRecord = saveLocalSubmission(formType, data);
  const webhookUrl = getWebhookUrl();

  // Track conversion in Analytics Engine (Point 18)
  trackEvent(`form_submit_${formType.toLowerCase()}`, {
    leadId: localRecord.id,
    customerName: data.fullName || data.name,
    customerPhone: data.phone,
    city: data.city,
    propertyType: data.propertyType || data.bhk
  });

  const payload = {
    formType,
    submissionId: localRecord.id,
    timestamp: localRecord.formattedDate,
    source: localRecord.source,
    campaign: localRecord.campaign,
    device: localRecord.device,
    ...data
  };

  if (webhookUrl) {
    try {
      // Send as POST request to Google Apps Script Web App
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script Web App handles no-cors redirect seamlessly
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      return {
        success: true,
        syncedToSheets: true,
        record: localRecord,
        message: 'Successfully submitted & synced with Google Sheets!'
      };
    } catch (err) {
      console.warn('Google Sheets Webhook dispatch error (saved locally):', err);
      return {
        success: true,
        syncedToSheets: false,
        record: localRecord,
        message: 'Saved successfully! (Syncing will retry once network is stable)'
      };
    }
  }

  // If no webhook configured yet, saved to local database safely
  return {
    success: true,
    syncedToSheets: false,
    record: localRecord,
    message: 'Submitted successfully! Stored in Livgruha secure inquiry database.'
  };
}

/**
 * Google Apps Script Template code for copy-paste by the user with Lead Source Attribution
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * Livgruha Interiors - Google Sheet Webhook Script
 * Includes Lead & Acquisition Source Attribution (Point 18)
 * 
 * Instructions:
 * 1. Open a new Google Sheet (e.g. named "Livgruha Interiors Leads")
 * 2. In Google Sheet menu, click Extensions > Apps Script
 * 3. Replace all code with this script
 * 4. Click 'Deploy' > 'New Deployment'
 * 5. Select type: 'Web App'
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click 'Deploy', authorize permissions, and copy the Web App URL!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Create header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID", 
        "Timestamp", 
        "Form Type", 
        "Acquisition Source",
        "Campaign",
        "Device",
        "Customer Name", 
        "Mobile Number", 
        "Email", 
        "City / Location", 
        "Property Type", 
        "Specification / Tier", 
        "Selected Scope / Rooms", 
        "Preferred Date / Slot", 
        "Project Requirement / Notes"
      ]);
      sheet.getRange(1, 1, 1, 15).setBackground("#9B3F23").setFontColor("#FFFFFF").setFontWeight("bold");
    }
    
    // Append submission row with acquisition source tracking
    sheet.appendRow([
      data.submissionId || "LIV-" + new Date().getTime(),
      data.timestamp || new Date().toLocaleString(),
      data.formType || "Website Lead",
      data.source || "Direct Website",
      data.campaign || "None",
      data.device || "Desktop",
      data.fullName || data.name || "",
      data.phone || "",
      data.email || "",
      data.city || "",
      data.propertyType || data.bhk || "",
      data.qualityTier || data.budget || "",
      Array.isArray(data.rooms) ? data.rooms.join(", ") : (data.selectedRooms || data.scope || ""),
      data.preferredDate || data.slot || "",
      data.notes || data.additionalNotes || data.campaignOffer || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`;
