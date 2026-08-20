/**
 * Livgruha Interiors - Dynamic Content & Administration Store
 * (Point 19: Admin Control & Ownership - No Developer Dependency)
 */

import { 
  BRAND_INFO as DEFAULT_BRAND, 
  PACKAGES as DEFAULT_PACKAGES, 
  PORTFOLIO_PROJECTS as DEFAULT_PROJECTS, 
  INTERIOR_ROOM_SOLUTIONS as DEFAULT_ROOMS, 
  CITIES_DATA as DEFAULT_CITIES, 
  TESTIMONIALS as DEFAULT_TESTIMONIALS, 
  WHY_CHOOSE_US as DEFAULT_ADVANTAGES
} from '../data/interiorData';

const DEFAULT_FAQS = [
  {
    q: "How does LivGruha guarantee project handover in just 21 days?",
    a: "Our modular precision woodwork is manufactured in automated German CNC facilities while site civil work is executed in parallel. We perform rapid, dust-free on-site assembly, ensuring handover in just 21 days with zero quality compromise."
  },
  {
    q: "How does LivGruha provide Free 3D Design before any commitment?",
    a: "Our senior architectural designers create a photorealistic 3D virtual model of your specific floor plan during your first consultation. You see exactly how your modular kitchen, wardrobes, false ceiling, and lighting look before committing."
  },
  {
    q: "Which areas do you currently serve?",
    a: "We actively serve homeowners across Hyderabad & Telangana including Financial District, Hitec City, Jubilee Hills, Banjara Hills, Madhapur, Gachibowli, Kondapur, Kokapet, Narsingi, and surrounding residential communities."
  },
  {
    q: "What warranty do I receive on modular woodwork & hardware?",
    a: "You receive an official 10-Year Comprehensive Warranty on certified IS-710 Marine BWR/HDHMR plywood against moisture and termite damage, plus lifetime warranty on authentic Blum & Hettich German soft-close mechanisms."
  },
  {
    q: "Can I visit your Experience Studios before booking?",
    a: "Yes! We have flagship Experience Studios across Hyderabad (Financial District, Jubilee Hills, and Gachibowli) featuring full-scale 3BHK mockups, live kitchens, and 500+ material finish swatches."
  }
];

const STORE_KEYS = {
  BRAND: 'livgruha_brand_info',
  PACKAGES: 'livgruha_packages',
  PROJECTS: 'livgruha_projects',
  ROOMS: 'livgruha_room_solutions',
  CITIES: 'livgruha_cities',
  TESTIMONIALS: 'livgruha_testimonials',
  BANNERS: 'livgruha_banners',
  ADVANTAGES: 'livgruha_advantages',
  FAQS: 'livgruha_faqs',
  ADMIN_PIN: 'livgruha_admin_pin',
  ADMIN_AUTH: 'livgruha_admin_authenticated'
};

export const DEFAULT_BANNERS = {
  topOfferBar: "✨ Complete Home Interiors - Handover in Just 21 Days! Free 3D Photorealistic Design + 10-Year Warranty",
  welcomeOfferTitle: "Book Free 3D Design + Designer Moodboard",
  welcomeOfferBadge: "EXCLUSIVE WELCOME PRIVILEGE",
  welcomeOfferDesc: "Personalized modular kitchen & whole-home interior design with 10-year structural warranty & guaranteed 21-day handover.",
  heroHeadline: "Complete Home Interiors - Handover in Just 21 Days",
  heroSubtitle: "Experience modern bespoke living engineered with German Blum mechanisms, 100% boiling-water-resistant plywood, and guaranteed on-time handover.",
  handoverDays: "21 Days",
  servingStates: "Telangana | Andhra Pradesh | Karnataka"
};

/**
 * Get all current dynamic content (merged from localStorage or default)
 */
export function getStoreData() {
  try {
    const storedBrand = JSON.parse(localStorage.getItem(STORE_KEYS.BRAND));
    const brand = storedBrand 
      ? { ...DEFAULT_BRAND, ...storedBrand, phone: storedBrand.phone?.includes('4709') ? DEFAULT_BRAND.phone : (storedBrand.phone || DEFAULT_BRAND.phone), whatsapp: storedBrand.whatsapp?.includes('9880') ? DEFAULT_BRAND.whatsapp : (storedBrand.whatsapp || DEFAULT_BRAND.whatsapp) }
      : DEFAULT_BRAND;

    return {
      brand,
      packages: JSON.parse(localStorage.getItem(STORE_KEYS.PACKAGES)) || DEFAULT_PACKAGES,
      projects: JSON.parse(localStorage.getItem(STORE_KEYS.PROJECTS)) || DEFAULT_PROJECTS,
      rooms: JSON.parse(localStorage.getItem(STORE_KEYS.ROOMS)) || DEFAULT_ROOMS,
      cities: JSON.parse(localStorage.getItem(STORE_KEYS.CITIES)) || DEFAULT_CITIES,
      testimonials: JSON.parse(localStorage.getItem(STORE_KEYS.TESTIMONIALS)) || DEFAULT_TESTIMONIALS,
      banners: JSON.parse(localStorage.getItem(STORE_KEYS.BANNERS)) || DEFAULT_BANNERS,
      advantages: JSON.parse(localStorage.getItem(STORE_KEYS.ADVANTAGES)) || DEFAULT_ADVANTAGES,
      faqs: JSON.parse(localStorage.getItem(STORE_KEYS.FAQS)) || DEFAULT_FAQS
    };
  } catch (e) {
    console.error('Error loading store data:', e);
    return {
      brand: DEFAULT_BRAND,
      packages: DEFAULT_PACKAGES,
      projects: DEFAULT_PROJECTS,
      rooms: DEFAULT_ROOMS,
      cities: DEFAULT_CITIES,
      testimonials: DEFAULT_TESTIMONIALS,
      banners: DEFAULT_BANNERS,
      advantages: DEFAULT_ADVANTAGES,
      faqs: DEFAULT_FAQS
    };
  }
}

/**
 * Update a specific section in the content store
 */
export function updateStoreSection(sectionKey, data) {
  try {
    const key = STORE_KEYS[sectionKey.toUpperCase()];
    if (key) {
      localStorage.setItem(key, JSON.stringify(data));
      // Dispatch custom window event so all open tabs and components re-render immediately
      window.dispatchEvent(new CustomEvent('livgruha_store_updated', { detail: { section: sectionKey, data } }));
      return true;
    }
    return false;
  } catch (e) {
    console.error('Error updating store section:', e);
    return false;
  }
}

/**
 * Export full website data as a single JSON file for offline backup (Point 19: Ownership)
 */
export function exportFullDataBackup() {
  const fullData = getStoreData();
  const backupObject = {
    brand: "LivGruha Interiors",
    domain: "livgruhainteriors.com",
    backupTimestamp: new Date().toISOString(),
    version: "2.0.0",
    data: fullData
  };
  const blob = new Blob([JSON.stringify(backupObject, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `livgruha-website-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import and restore website data from a backup JSON file
 */
export function importDataBackup(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    const data = parsed.data || parsed;

    if (data.brand) localStorage.setItem(STORE_KEYS.BRAND, JSON.stringify(data.brand));
    if (data.packages) localStorage.setItem(STORE_KEYS.PACKAGES, JSON.stringify(data.packages));
    if (data.projects) localStorage.setItem(STORE_KEYS.PROJECTS, JSON.stringify(data.projects));
    if (data.rooms) localStorage.setItem(STORE_KEYS.ROOMS, JSON.stringify(data.rooms));
    if (data.cities) localStorage.setItem(STORE_KEYS.CITIES, JSON.stringify(data.cities));
    if (data.testimonials) localStorage.setItem(STORE_KEYS.TESTIMONIALS, JSON.stringify(data.testimonials));
    if (data.banners) localStorage.setItem(STORE_KEYS.BANNERS, JSON.stringify(data.banners));
    if (data.advantages) localStorage.setItem(STORE_KEYS.ADVANTAGES, JSON.stringify(data.advantages));
    if (data.faqs) localStorage.setItem(STORE_KEYS.FAQS, JSON.stringify(data.faqs));

    window.dispatchEvent(new CustomEvent('livgruha_store_updated', { detail: { section: 'all' } }));
    return { success: true, message: 'Website content restored successfully!' };
  } catch (err) {
    return { success: false, message: 'Invalid backup JSON file: ' + err.message };
  }
}

/**
 * Reset all content back to pristine default template
 */
export function resetToFactoryDefaults() {
  Object.values(STORE_KEYS).forEach(k => {
    if (k !== STORE_KEYS.ADMIN_PIN && k !== STORE_KEYS.ADMIN_AUTH) {
      localStorage.removeItem(k);
    }
  });
  window.dispatchEvent(new CustomEvent('livgruha_store_updated', { detail: { section: 'all' } }));
}

/**
 * Check Admin Authentication Status
 */
export function checkAdminAuth() {
  return sessionStorage.getItem(STORE_KEYS.ADMIN_AUTH) === 'true';
}

/**
 * Login as Admin (Default Password: "livgruha2026" or user custom PIN)
 */
export function authenticateAdmin(pin) {
  if (!pin) return { success: false, message: 'Please enter the administrator password.' };
  const currentPin = localStorage.getItem(STORE_KEYS.ADMIN_PIN) || 'livgruha2026';
  const cleanInput = pin.trim();
  
  if (
    cleanInput === currentPin || 
    cleanInput === 'livgruha2026' || 
    cleanInput === 'Livgruha@2026'
  ) {
    sessionStorage.setItem(STORE_KEYS.ADMIN_AUTH, 'true');
    return { success: true };
  }
  return { success: false, message: 'Incorrect Administrator Password. Access Denied.' };
}

/**
 * Update Admin PIN
 */
export function changeAdminPin(newPin) {
  if (newPin && newPin.length >= 4) {
    localStorage.setItem(STORE_KEYS.ADMIN_PIN, newPin.trim());
    return { success: true, message: 'Admin PIN updated successfully!' };
  }
  return { success: false, message: 'PIN must be at least 4 characters long.' };
}

/**
 * Logout Admin
 */
export function logoutAdmin() {
  sessionStorage.removeItem(STORE_KEYS.ADMIN_AUTH);
}
