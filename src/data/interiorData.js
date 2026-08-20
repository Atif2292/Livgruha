/**
 * LivGruha Interiors - Master Data Repository
 * Full alignment with LivGruha Development Brief (Points 1 to 21)
 * Domain: livgruhainteriors.com
 * Serving: Telangana | Andhra Pradesh | Karnataka
 */

export const BRAND_INFO = {
  name: "LivGruha Interiors",
  domain: "livgruhainteriors.com",
  tagline: "Complete Home Interiors - Handover in Just 21 Days",
  phone: "+91 79956 72323",
  whatsapp: "+917995672323",
  email: "info@livgruhainteriors.com",
  salesEmail: "sales@livgruhainteriors.com",
  supportEmail: "support@livgruhainteriors.com",
  projectsEmail: "projects@livgruhainteriors.com",
  careersEmail: "careers@livgruhainteriors.com",
  address: "Plot No. 42, Silicon Valley Layout, Near WaveRock, Hitec City / Madhapur, Hyderabad, Telangana - 500081",
  experienceCenters: 3,
  happyHomes: "3,200+",
  expertDesigners: "85+",
  avgRating: "4.94",
  warrantyYears: "10 Years",
  servingStates: "Hyderabad & Telangana",
  handoverCommitment: "Handover in Just 21 Days",
  deliveryGuarantees: {
    express: "21 Working Days",
    signature: "35 Working Days",
    luxe: "45 Working Days"
  }
};

export const PACKAGES = [
  {
    id: "express",
    name: "Express 21-Day Modular",
    badge: "Fastest 21-Day Delivery",
    timeline: "21 Working Days",
    desc: "Speed-focused premium modular kitchen, master wardrobe, and essential lighting engineered for rapid move-ins without quality compromise.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    features: [
      "100% IS-710 BWR Marine Plywood Core",
      "European Soft-Close Hinges & Tandem Drawers (Hettich / Blum)",
      "Modular Kitchen + 2 Full-Height Bedroom Wardrobes",
      "Factory Edge-banding with PUR Waterproof Hot-Melt Glue",
      "Dedicated Site Project Lead & 10-Year Structural Warranty"
    ],
    popularFor: "1 & 2 BHK Residences / Fast Handover"
  },
  {
    id: "signature",
    name: "Signature Elegance",
    badge: "Most Popular Choice",
    isFeatured: true,
    timeline: "35 Working Days",
    desc: "Our gold standard full-home interior solution combining anti-scratch acrylics, ambient profile lighting, and custom accent panelling.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    features: [
      "High-Density Moisture Resistant (HDHMR) + IS-710 BWP Plywood Core",
      "Seamless High-Gloss & Anti-Fingerprint Super Matte Acrylics",
      "Blum Aventos Lift-up Cabinets & Full-Extension Tandem Drawers",
      "Designer Living Room TV Media Unit with Charcoal Fluted Louvers",
      "Full False Ceiling with 3000K Warm Architectural Profile LEDs",
      "Floor-to-Ceiling Sliding Wardrobes with Lacquered Glass & Sensor Lighting",
      "10-Year Comprehensive Warranty + Free Scheduled Maintenance"
    ],
    popularFor: "3 BHK & 4 BHK Family Residences"
  },
  {
    id: "luxe",
    name: "Luxe Bespoke Villa",
    badge: "Ultra Luxury Couture",
    timeline: "45 Working Days",
    desc: "End-to-end couture interior architecture with Italian PU coats, natural teak veneers, home automation, and curated marble styling.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Imported Natural Wood Veneers with Polyurethane (PU) Matte Polish",
      "Custom Walk-in Closets with Tinted Bronze Fluted Glass & Leather Inlays",
      "Quartz Island Countertops with Cascading Waterfall Edge Profile",
      "Smart Home Automation for Mood Lighting, Motorized Curtains & ACs",
      "Bespoke Sacred Pooja Mandir with Backlit Onyx Stone & CNC Brass",
      "Acoustic Wooden Slats & Imported Italian Marble Feature Walls",
      "Lifetime Structural Warranty with Dedicated Principal Architect"
    ],
    popularFor: "Luxury Penthouses, Duplexes & Premium Villas"
  }
];

export const PORTFOLIO_PROJECTS = [
  {
    id: "the-serene-sanctuary",
    title: "The Serene Scandinavian Haven",
    typology: "3 BHK Premium",
    bhkCategory: "3bhk",
    style: "Scandinavian Minimalist",
    location: "Sobha Dream Acres, Panathur, Bangalore",
    city: "bangalore",
    state: "Karnataka",
    area: "1,680 Sq. Ft.",
    scope: "Complete 3BHK Modular Joinery & Lighting",
    timeline: "21 Days",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A calming oasis bathed in natural light featuring light oak wood textures, sage green accents, concealed storage partitions, and a modular kitchen with Blum servo-drive mechanisms.",
    keyHighlights: [
      "Light Scandinavian oak veneer dining partition",
      "Matte Sage Green & White acrylic modular kitchen",
      "Master bedroom with fluted headboard and warm cove lighting",
      "Floor-to-ceiling wardrobe with integrated vanity station"
    ]
  },
  {
    id: "japandi-warm-minimalism",
    title: "Japandi Warmth & Linear Harmony",
    typology: "2 BHK Luxury",
    bhkCategory: "2bhk",
    style: "Japandi",
    location: "Prestige Finsbury Park, Bagalur, Bangalore",
    city: "bangalore",
    state: "Karnataka",
    area: "1,220 Sq. Ft.",
    scope: "Living, Modular Kitchen & Master Suite",
    timeline: "21 Days",
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The timeless intersection of Japanese serenity and Scandinavian functionality. Features low-profile platform beds, textured limewash walls, and integrated storage benches.",
    keyHighlights: [
      "Custom bamboo louvers & Shoji screen pooja enclosure",
      "Anti-fingerprint cashmere grey cabinetry",
      "Concealed bar counter with brass mirror backsplash",
      "Magnetic architectural track lighting"
    ]
  },
  {
    id: "emerald-contemporary-duplex",
    title: "The Contemporary Emerald Penthouse",
    typology: "4 BHK Duplex",
    bhkCategory: "4bhk",
    style: "Contemporary Luxe",
    location: "My Home Bhooja, Hitec City, Hyderabad",
    city: "hyderabad",
    state: "Telangana",
    area: "3,450 Sq. Ft.",
    scope: "Full Couture Interior Architecture",
    timeline: "35 Days",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Sophisticated modern opulence designed for entertaining. Features high-gloss Italian PU finishes, double-height bookmatched marble feature walls, and a walk-in wardrobe with automated glass doors.",
    keyHighlights: [
      "Double-height TV wall with Statuario marble & brass channel trims",
      "Automated modular kitchen with quartz island & wine cooler",
      "Master suite with bespoke leatherette tufted paneling",
      "Terrace lounge with weatherproof composite wooden pergola"
    ]
  },
  {
    id: "earthy-modern-villa",
    title: "Terracotta Earth & Modern Courtyard Villa",
    typology: "4 BHK Villa",
    bhkCategory: "villa",
    style: "Modern Indian",
    location: "Godrej Eternity, Kanakapura Road, Bangalore",
    city: "bangalore",
    state: "Karnataka",
    area: "2,850 Sq. Ft.",
    scope: "End-to-End Villa Joinery & Decor",
    timeline: "35 Days",
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A tribute to rooted heritage and contemporary comfort. Blends handmade terracotta tiles, warm teakwood rafters, and brass bell details with ergonomic German modular hardware.",
    keyHighlights: [
      "Bespoke teakwood mandir with backlit amber onyx",
      "Open-concept island kitchen with Moroccan patterned tiles",
      "Study room with floor-to-ceiling library wall & ladder",
      "Master bedroom with private balcony green wall"
    ]
  },
  {
    id: "urban-chic-skyline",
    title: "The Urban Chic Skyline Residence",
    typology: "3 BHK Apartment",
    bhkCategory: "3bhk",
    style: "Modern Chic",
    location: "Aparna Serene Park, Kondapur, Hyderabad",
    city: "hyderabad",
    state: "Telangana",
    area: "1,550 Sq. Ft.",
    scope: "Complete Urban Modular Suite",
    timeline: "21 Days",
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Smart, space-optimizing urban luxury designed with multifunctional storage, sleek acrylic textures, and customized bar and entertainment units.",
    keyHighlights: [
      "Fluted glass sliding partition between living and study",
      "L-shaped modular kitchen with built-in pantry pullouts",
      "Kids bedroom with bunk bed and chalk wall study zone",
      "Custom entryway shoe console with disinfectant UV cabinet"
    ]
  },
  {
    id: "vizag-beachfront-residence",
    title: "The Coastal Azure Bay Residence",
    typology: "3 BHK Sea-facing",
    bhkCategory: "3bhk",
    style: "Coastal Contemporary",
    location: "MVP Colony, Visakhapatnam, Andhra Pradesh",
    city: "visakhapatnam",
    state: "Andhra Pradesh",
    area: "1,920 Sq. Ft.",
    scope: "Anti-Corrosive Marine Plywood Joinery & Balcony Lounge",
    timeline: "21 Days",
    coverImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Engineered specifically for coastal humidity using 100% IS-710 Marine grade boiling-water-resistant plywood, anti-corrosive SS-304 hardware, and airy breezy linen aesthetics.",
    keyHighlights: [
      "SS-304 Grade anti-rust Blum hinges & tandem runners",
      "Coastal blue acrylic kitchen with quartz countertop",
      "Balcony timber deck with vertical herb garden wall",
      "Concealed master wardrobe with dehumidifying ventilation louvers"
    ]
  }
];

/**
 * 11 Comprehensive Services (Point 5 from Brief)
 */
export const INTERIOR_ROOM_SOLUTIONS = [
  {
    id: "complete-home-interiors",
    title: "Complete Home Interiors",
    shortDesc: "Turnkey, end-to-end full home transformations from bare concrete to ready-to-move luxury home in 21 days.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    specification: "End-to-End Handover in 21 Days",
    features: [
      "Complete modular joinery, false ceiling, lighting & painting",
      "Dedicated project manager with daily app milestone tracking",
      "Zero hidden variations with 100% price lock guarantee",
      "Deep cleaning & 10-year comprehensive warranty handover"
    ]
  },
  {
    id: "modular-kitchens",
    title: "Modular Kitchens",
    shortDesc: "Ergonomic culinary spaces engineered with German Blum mechanisms and 100% boiling-water-resistant marine plywood.",
    heroImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    specification: "100% IS-710 Marine BWR Plywood",
    features: [
      "BWR 710 certified marine plywood base with PUR hot-melt edge-banding",
      "Blum Aventos lift-ups & soft-close tandem drawer runners",
      "Hafele magic corners, pull-out pantry, & appliance garages",
      "Seamless quartz countertop & integrated LED task illumination"
    ]
  },
  {
    id: "wardrobes",
    title: "Wardrobes & Walk-in Closets",
    shortDesc: "Floor-to-ceiling customized wardrobe systems tailored to your apparel ergonomics, accessories, and style.",
    heroImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    specification: "Floor-to-Ceiling Ergonomic Joinery",
    features: [
      "Double-dampened German soft-close sliding and hinged mechanisms",
      "Integrated automated sensor LED lighting on shutter opening",
      "Built-in electronic digital safety locker compartment",
      "Configurable sari trays, trouser pull-outs, and jewelry drawers"
    ]
  },
  {
    id: "living-room-interiors",
    title: "Living Room Interiors",
    shortDesc: "Showcase living spaces crafted for refined family bonding and grand hosting with statement architectural walls.",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    specification: "Statement Feature Walls & Louvers",
    features: [
      "Statuario bookmatched marble & charcoal acoustic fluted louvers",
      "Foyer shoe consoles with UV disinfectant storage cabinets",
      "Integrated ambient cove and architectural magnetic track lighting",
      "Custom display niches with tinted bronze glass shelving"
    ]
  },
  {
    id: "bedroom-interiors",
    title: "Bedroom Interiors",
    shortDesc: "Restful, acoustic-buffered private sanctuaries featuring bespoke platform beds, vanities, and ambient lighting.",
    heroImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    specification: "Acoustic Suede & Upholstered Suites",
    features: [
      "Custom king-size hydraulic platform bed with cushioned backrest",
      "Concealed vanity dresser with touch-activated backlit mirror",
      "Smart floating nightstands with concealed wire channels",
      "Sound-dampening acoustic wall paneling"
    ]
  },
  {
    id: "tv-units",
    title: "TV Units & Media Consoles",
    shortDesc: "Contemporary floating entertainment consoles with hidden raceways and dramatic LED backlighting.",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    specification: "Zero-Wire Floating Consoles",
    features: [
      "Heavy-duty concealed TV wall mounts with hidden wire raceways",
      "Push-to-open soft-close flap doors and media storage",
      "Acoustic fluted wooden backdrops with 3000K warm glow",
      "Integrated soundbar and gaming console compartments"
    ]
  },
  {
    id: "pooja-units",
    title: "Pooja Units & Sacred Mandirs",
    shortDesc: "Sacred spaces blending traditional devotional iconography with contemporary architectural finesse.",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    specification: "Teak Wood & Backlit Onyx",
    features: [
      "Intricate CNC laser-cut Om / Gayatri Mantra backdrops",
      "Backlit amber onyx stone with warm illumination",
      "Pull-out diya preparation trays and heavy-duty incense drawers",
      "Heat-resistant composite stone ceiling for diya protection"
    ]
  },
  {
    id: "false-ceiling",
    title: "False Ceiling & Lighting",
    shortDesc: "Layered illumination design elevating ceiling heights and creating customized mood atmospheres.",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    specification: "Saint-Gobain Gyproc Drywall",
    features: [
      "Saint-Gobain Gyproc moisture-resistant drywall framing",
      "Anti-glare recessed COB spotlights with 90+ CRI color fidelity",
      "Curved ambient perimeter cove lighting",
      "Concealed AC ducting and motorized curtain pelmets"
    ]
  },
  {
    id: "customized-furniture",
    title: "Customized Furniture",
    shortDesc: "Bespoke dining tables, study desks, bar units, and upholstered accent seating made to exact floor dimensions.",
    heroImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    specification: "Solid Teak & Ergonomic Engineering",
    features: [
      "Custom 6-seater dining table with marble or solid wood top",
      "Ergonomic work-from-home study desk with bookshelf",
      "Illuminated cocktail bar unit with wine rack and glass holders",
      "Custom accent armchairs and entryway benches"
    ]
  },
  {
    id: "commercial-interiors",
    title: "Commercial & Office Interiors",
    shortDesc: "Modern corporate offices, retail boutiques, and executive clinics designed for productivity and brand impression.",
    heroImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    specification: "Corporate Grade & Acoustic Optimization",
    features: [
      "Modular workstation clusters with integrated power & data raceways",
      "Executive boardrooms with acoustic panelling and video conference tech",
      "Reception statement lounges with backlit brand signage",
      "Fire-retardant materials complying with commercial building codes"
    ]
  },
  {
    id: "renovation-works",
    title: "Home Renovation & Civil Works",
    shortDesc: "Complete makeover services for pre-owned apartments and villas including structural redesign, tiling, and rewiring.",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    specification: "Turnkey Structural & Aesthetic Upgrade",
    features: [
      "Civil dismantling, bathroom retiling, and plumbing modernization",
      "Electrical rewiring and smart home conduit preparation",
      "Premium Asian Paints Royale luxury emulsion finishing",
      "On-time delivery with zero disruption to society neighbors"
    ]
  }
];

/**
 * 7-Step Visual Customer Journey (Point 6 from Brief)
 */
export const CUSTOMER_JOURNEY_STEPS = [
  {
    step: "01",
    title: "Design Consultation",
    desc: "Share your floor plan, lifestyle preferences, and design vision with our Senior Architect.",
    badge: "Day 1"
  },
  {
    step: "02",
    title: "Site Visit & 3D Laser Measurement",
    desc: "Our technical engineer conducts millimetre-precision laser measurements on your site.",
    badge: "Day 2"
  },
  {
    step: "03",
    title: "3D Photorealistic Design & Materials",
    desc: "Experience your complete home in high-definition 3D rendering with exact finish swatches.",
    badge: "Days 3–5"
  },
  {
    step: "04",
    title: "Final Approval & 100% Price Lock",
    desc: "Approve detailed production drawings and lock the quote with zero creeping escalation.",
    badge: "Day 6"
  },
  {
    step: "05",
    title: "Automated German CNC Production",
    desc: "Woodwork is precision-manufactured with PUR waterproof glue while site civil works proceed.",
    badge: "Days 7–15"
  },
  {
    step: "06",
    title: "Clean On-Site Installation",
    desc: "Certified technicians assemble factory-finished modules with dust-free European tools.",
    badge: "Days 16–20"
  },
  {
    step: "07",
    title: "21-Day Handover & 10-Yr Warranty",
    desc: "Final 140-point quality audit, deep site cleaning, and official 10-year warranty certificate.",
    badge: "Day 21 🎉"
  }
];

/**
 * Brand Partners & Tie-ups (Point 10 from Brief)
 */
export const PARTNER_BRANDS = [
  { name: "Blum", tag: "Austrian Hardware", logo: "BLUM" },
  { name: "Hettich", tag: "German Precision", logo: "HETTICH" },
  { name: "Saint-Gobain", tag: "Gyproc Drywalls", logo: "SAINT-GOBAIN" },
  { name: "Hafele", tag: "Architectural Hardware", logo: "HAFELE" },
  { name: "CenturyPly", tag: "IS-710 Marine BWR", logo: "CENTURY PLY" },
  { name: "Greenply", tag: "Club Prime BWP", logo: "GREENPLY" },
  { name: "Asian Paints", tag: "Royale Luxury Emulsion", logo: "ASIAN PAINTS" },
  { name: "Merino", tag: "High-Gloss Laminates", logo: "MERINO" },
  { name: "Philips", tag: "Architectural 3000K LEDs", logo: "PHILIPS" }
];

/**
 * Active Branches & Experience Studios (Hyderabad Flagship)
 */
export const CITIES_DATA = [
  {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    tag: "Headquarters & Flagship Experience Center",
    experienceCentersCount: 3,
    homesCompleted: "3,200+",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    centers: [
      {
        name: "Financial District Flagship Experience Center",
        address: "Plot No. 42, Silicon Valley Layout, Near WaveRock, Hitec City / Madhapur, Hyderabad - 500081",
        phone: "+91 79956 72323",
        timings: "10:00 AM - 8:30 PM (All 7 Days)",
        amenities: ["Full-Scale 3BHK Walkthrough", "Blum & Häfele Experience Bay", "Live Modular Kitchen Studio", "500+ Material Swatch Lounge"]
      },
      {
        name: "Jubilee Hills Design Gallery",
        address: "Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad - 500033",
        phone: "+91 79956 72323",
        timings: "10:30 AM - 8:30 PM (All 7 Days)",
        amenities: ["Bespoke Veneer & Italian Marble Studio", "Acoustic Fluting & Smart Lighting Lounge", "VR 3D Walkthrough"]
      },
      {
        name: "Gachibowli Tech & Design Studio",
        address: "Main Road, Gachibowli Circle, Near Bio-Diversity Park, Hyderabad - 500032",
        phone: "+91 79956 72323",
        timings: "10:30 AM - 8:00 PM (All 7 Days)",
        amenities: ["Modular Joinery Lab", "Floor-to-Ceiling Wardrobe Display", "Hardware Stress Test Bay"]
      }
    ],
    topSocieties: [
      "My Home Bhooja", 
      "Aparna Serene Park", 
      "Aparna Sarovar Zenith", 
      "Prestige High Fields", 
      "Jayabheri The Peak", 
      "Rajapushpa Atria", 
      "Lanco Hills", 
      "Honer Vivantis"
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Raghavendra & Priya Reddy",
    location: "My Home Bhooja, Hyderabad",
    property: "4 BHK Duplex Penthouse",
    rating: 5,
    date: "January 2026",
    review: "LivGruha delivered our 4 BHK duplex in exactly 21 days as promised! The 3D render matched the final site execution with 100% precision. The Italian PU finish on the kitchen and the teak pooja mandir are the crown jewels of our home.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Vikram & Ananya Sharma",
    location: "Sobha Dream Acres, Bangalore",
    property: "3 BHK Apartment",
    rating: 5,
    date: "February 2026",
    review: "Zero surprises and total transparency. We received daily milestone photos while our marine plywood modules were precision laser-cut. The German Blum soft-close mechanics and cove false ceiling feel ultra-luxurious.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Suresh & Lavanya Rao",
    location: "MVP Colony, Visakhapatnam",
    property: "3 BHK Sea-View Residence",
    rating: 5,
    date: "January 2026",
    review: "Living near the coastline in Vizag, humidity was our biggest fear. LivGruha used certified IS-710 Marine BWR plywood and anti-corrosive SS-304 hardware. Delivered right on schedule in 21 days!",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "Handover in Just 21 Days",
    desc: "Automated German CNC factory pre-fabrication enables rapid 21-day dust-free on-site assembly.",
    icon: "Clock"
  },
  {
    id: 2,
    title: "Free 3D Photorealistic Design",
    desc: "Visualize your exact space in realistic 3D renders with chosen color palettes before any commitment.",
    icon: "Sparkles"
  },
  {
    id: 3,
    title: "100% IS-710 Marine BWR Plywood",
    desc: "Boiling-water-resistant certified structural core with PUR waterproof glue edge-banding.",
    icon: "ShieldCheck"
  },
  {
    id: 4,
    title: "10-Year Comprehensive Warranty",
    desc: "Complete structural and hardware assurance with free scheduled annual checkups.",
    icon: "Award"
  },
  {
    id: 5,
    title: "100% Price Lock Guarantee",
    desc: "Itemized quote breakdown ensures zero creeping variation charges during site execution.",
    icon: "CheckCircle2"
  },
  {
    id: 6,
    title: "14 Experience Studios in TS, AP, KA",
    desc: "Touch full-scale mockups, test Blum soft-close mechanics, and select from 500+ finishes in person.",
    icon: "MapPin"
  }
];

export const FAQS = [
  {
    q: "How does LivGruha guarantee project handover in just 21 days?",
    a: "Our modular woodwork is precision-manufactured in automated German CNC factory facilities while site civil work (false ceiling, electricals, painting) is executed in parallel. We perform clean, dust-free on-site assembly, ensuring handover in just 21 days with zero quality compromise."
  },
  {
    q: "How does LivGruha provide Free 3D Design before any payment?",
    a: "Our senior architectural designers create a photorealistic 3D virtual model of your specific floor plan during your first consultation. You see exactly how your modular kitchen, wardrobes, false ceiling, and lighting look before committing."
  },
  {
    q: "Which states and regions do you currently serve?",
    a: "We actively serve homeowners across Telangana (Hyderabad, Warangal), Andhra Pradesh (Visakhapatnam, Vijayawada, Guntur), and Karnataka (Bangalore, Mysore)."
  },
  {
    q: "What warranty do I receive on modular woodwork & hardware?",
    a: "You receive an official 10-Year Comprehensive Warranty on certified IS-710 Marine BWR/HDHMR plywood against moisture and termite damage, plus lifetime warranty on authentic Blum & Hettich German soft-close mechanisms."
  },
  {
    q: "Can I visit your Experience Studios before booking?",
    a: "Yes! We have flagship Experience Studios across Telangana, Andhra Pradesh, and Karnataka featuring full-scale 2BHK/3BHK mockups, live kitchens, and 500+ material finish swatches."
  }
];
