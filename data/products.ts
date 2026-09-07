export type Material = 'Tri-Ply' | 'Non-Stick Granite' | 'Aluminium' | 'Stainless Steel';
export type CategorySlug = 'tri-ply' | 'marvel' | 'cookers-stoves' | 'thermoware' | 'tools';
export type HomeCollection = 'cookware' | 'appliances' | 'thermoware' | 'tools';
export type Compatibility = 'Induction' | 'Gas' | 'Ceramic' | 'Dishwasher';
export type Badge = '1-Year Warranty' | '2-Year Warranty' | '5-Year Warranty' | 'Seasonal';

export type Product = {
  id: string;
  name: string;
  series: string;
  sku: string;
  catalogTag: CategorySlug;
  category: CategorySlug;
  homeCollection: HomeCollection;
  material: Material;
  mrp: number;
  salePrice?: number;
  warrantyYears: 0 | 1 | 2 | 5;
  compatibility: Compatibility[];
  size?: string;
  capacity?: string;
  features: string[];
  construction?: string[];
  description: string;
  badge?: Badge;
  accent: string;
  icon: string;
};

export const categories: { slug: CategorySlug; title: string; subtitle: string }[] = [
  { slug: 'tri-ply', title: 'Tri-Ply Stainless', subtitle: 'Aura 3-layer cookware' },
  { slug: 'marvel', title: 'Marvel Series', subtitle: 'Non-stick granite' },
  { slug: 'cookers-stoves', title: 'Cookers & Stoves', subtitle: 'Pressure cookers & hobs' },
  { slug: 'thermoware', title: 'Insulated & Flasks', subtitle: 'Keep meals hot' },
  { slug: 'tools', title: 'Tools & Cutlery', subtitle: 'Everyday kitchen helpers' },
];

export const homeCollections: { slug: HomeCollection; title: string; icon: string }[] = [
  { slug: 'cookware', title: 'Cookware', icon: 'restaurant-outline' },
  { slug: 'appliances', title: 'Appliances', icon: 'flame-outline' },
  { slug: 'thermoware', title: 'Thermoware', icon: 'cube-outline' },
  { slug: 'tools', title: 'Tools', icon: 'cut-outline' },
];

export const catalogTags: { id: string; label: string; match: (p: Product) => boolean }[] = [
  { id: 'aura', label: 'Aura', match: (p) => p.series === 'Aura' },
  { id: 'marvel', label: 'Marvel', match: (p) => p.series === 'Marvel' },
  { id: 'cookers', label: 'Cookers', match: (p) => p.series === 'Pressure Cooker' },
  { id: 'stoves', label: 'Stoves', match: (p) => p.series === 'Stello' || p.series === 'Sparkle' },
  { id: 'belly', label: 'Belly', match: (p) => p.series === 'Belly' },
  { id: 'pearl', label: 'Pearl', match: (p) => p.series === 'Pearl' },
  { id: 'choppers', label: 'Choppers', match: (p) => p.series === 'Chop Magic' || p.series === 'Elite' },
  { id: 'tools', label: 'Tools', match: (p) => p.category === 'tools' && p.series !== 'Chop Magic' && p.series !== 'Elite' },
];

export const products: Product[] = [
  {
    "id": "aura-kadai-22-glass",
    "name": "Aura Kadai 22 (Glass Lid)",
    "series": "Aura",
    "sku": "AURA KA 22 GL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3490,
    "features": [
      "3-layer SS construction",
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply kadai with glass lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "22 cm",
    "capacity": "Glass lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-kadai-22-steel",
    "name": "Aura Kadai 22 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA KA 22 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3550,
    "features": [
      "3-layer SS construction",
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply kadai with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "22 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-kadai-24-glass",
    "name": "Aura Kadai 24 (Glass Lid)",
    "series": "Aura",
    "sku": "AURA KA 24 GL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4190,
    "features": [
      "3-layer SS construction",
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply kadai with glass lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "24 cm",
    "capacity": "Glass lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-kadai-24-steel",
    "name": "Aura Kadai 24 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA KA 24 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4250,
    "features": [
      "3-layer SS construction",
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply kadai with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "24 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-kadai-26-glass",
    "name": "Aura Kadai 26 (Glass Lid)",
    "series": "Aura",
    "sku": "AURA KA 26 GL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4450,
    "features": [
      "3-layer SS construction",
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply kadai with glass lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "26 cm",
    "capacity": "Glass lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-kadai-26-steel",
    "name": "Aura Kadai 26 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA KA 26 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4590,
    "features": [
      "3-layer SS construction",
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply kadai with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "26 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-22",
    "name": "Aura Fry Pan 22 (Without Lid)",
    "series": "Aura",
    "sku": "AURA FP 22",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 2850,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "22 cm",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-22-steel",
    "name": "Aura Fry Pan 22 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA FP 22 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3590,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "22 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-22-glass",
    "name": "Aura Fry Pan 22 (Glass Lid)",
    "series": "Aura",
    "sku": "AURA FP 22 GL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3550,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan with glass lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "22 cm",
    "capacity": "Glass lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-24",
    "name": "Aura Fry Pan 24 (Without Lid)",
    "series": "Aura",
    "sku": "AURA FP 24",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3350,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "24 cm",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-24-steel",
    "name": "Aura Fry Pan 24 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA FP 24 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4150,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "24 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-24-glass",
    "name": "Aura Fry Pan 24 (Glass Lid)",
    "series": "Aura",
    "sku": "AURA FP 24 GL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4090,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan with glass lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "24 cm",
    "capacity": "Glass lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-26",
    "name": "Aura Fry Pan 26 (Without Lid)",
    "series": "Aura",
    "sku": "AURA FP 26",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3750,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "26 cm",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-26-steel",
    "name": "Aura Fry Pan 26 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA FP 26 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4750,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "26 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-frypan-26-glass",
    "name": "Aura Fry Pan 26 (Glass Lid)",
    "series": "Aura",
    "sku": "AURA FP 26 GL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4590,
    "features": [
      "Even heat distribution",
      "Dishwasher safe",
      "5-year warranty"
    ],
    "description": "Tri-ply fry pan with glass lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "26 cm",
    "capacity": "Glass lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-saucepan-14",
    "name": "Aura Sauce Pan 14 (Without Lid)",
    "series": "Aura",
    "sku": "AURA SP 14",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 2550,
    "features": [
      "Fast heating aluminium core",
      "5-year warranty"
    ],
    "description": "Tri-ply sauce pan",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "14 cm",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-saucepan-14-steel",
    "name": "Aura Sauce Pan 14 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA SP 14 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 2990,
    "features": [
      "Fast heating aluminium core",
      "5-year warranty"
    ],
    "description": "Tri-ply sauce pan with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "14 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-saucepan-16",
    "name": "Aura Sauce Pan 16 (Without Lid)",
    "series": "Aura",
    "sku": "AURA SP 16",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 2999,
    "features": [
      "Fast heating aluminium core",
      "5-year warranty"
    ],
    "description": "Tri-ply sauce pan",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "16 cm",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-saucepan-16-steel",
    "name": "Aura Sauce Pan 16 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA SP 16 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3450,
    "features": [
      "Fast heating aluminium core",
      "5-year warranty"
    ],
    "description": "Tri-ply sauce pan with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "16 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-saucepan-18",
    "name": "Aura Sauce Pan 18 (Without Lid)",
    "series": "Aura",
    "sku": "AURA SP 18",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3450,
    "features": [
      "Fast heating aluminium core",
      "5-year warranty"
    ],
    "description": "Tri-ply sauce pan",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "18 cm",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-saucepan-18-steel",
    "name": "Aura Sauce Pan 18 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA SP 18 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3950,
    "features": [
      "Fast heating aluminium core",
      "5-year warranty"
    ],
    "description": "Tri-ply sauce pan with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "18 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-saucepan-20",
    "name": "Aura Sauce Pan 20 (Without Lid)",
    "series": "Aura",
    "sku": "AURA SP 20",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3750,
    "features": [
      "Fast heating aluminium core",
      "5-year warranty"
    ],
    "description": "Tri-ply sauce pan",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "20 cm",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-saucepan-20-steel",
    "name": "Aura Sauce Pan 20 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA SP 20 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4450,
    "features": [
      "Fast heating aluminium core",
      "5-year warranty"
    ],
    "description": "Tri-ply sauce pan with steel lid",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "20 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-casserole-18",
    "name": "Aura Casserole 18 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA CS 18 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 3690,
    "features": [
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply casserole stewpot",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "18 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-casserole-20",
    "name": "Aura Casserole 20 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA CS 20 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4150,
    "features": [
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply casserole stewpot",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "20 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-casserole-22",
    "name": "Aura Casserole 22 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA CS 22 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 4950,
    "features": [
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply casserole stewpot",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "22 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "aura-casserole-24",
    "name": "Aura Casserole 24 (Steel Lid)",
    "series": "Aura",
    "sku": "AURA CS 24 SL",
    "catalogTag": "tri-ply",
    "category": "tri-ply",
    "material": "Tri-Ply",
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "homeCollection": "cookware",
    "mrp": 5650,
    "features": [
      "Induction safe",
      "5-year warranty"
    ],
    "description": "Tri-ply casserole stewpot",
    "accent": "#6B3E2A",
    "icon": "ellipse-outline",
    "size": "24 cm",
    "capacity": "Steel lid",
    "badge": "5-Year Warranty"
  },
  {
    "id": "marvel-granite-tawa-280",
    "name": "Premium Granite Tawa 280 IB",
    "series": "Marvel",
    "sku": "LMTP 280IB",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 1550,
    "features": [
      "Induction base",
      "Uniform heat / faster cooking",
      "Use metal spoon without hesitation",
      "Requires very little oil",
      "1-year warranty"
    ],
    "description": "Granite non-stick tawa",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "28 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-granite-tawa-250",
    "name": "Premium Granite Tawa 250 IB",
    "series": "Marvel",
    "sku": "LMTP 250IB",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 1250,
    "features": [
      "Induction base",
      "Uniform heat / faster cooking",
      "Use metal spoon without hesitation",
      "Requires very little oil",
      "1-year warranty"
    ],
    "description": "Granite non-stick tawa",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "25 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-granite-kadai-260",
    "name": "Premium Granite Kadai 260 IB",
    "series": "Marvel",
    "sku": "LMFP 260IB KADAI",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 2350,
    "features": [
      "Induction base",
      "Uniform heat / faster cooking",
      "Strong handles",
      "Use metal spoon without hesitation",
      "1-year warranty"
    ],
    "description": "Granite non-stick kadai",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "26 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-granite-kadai-240",
    "name": "Premium Granite Kadai 240 IB",
    "series": "Marvel",
    "sku": "LMFP 240IB KADAI",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 2150,
    "features": [
      "Induction base",
      "Uniform heat / faster cooking",
      "Strong handles",
      "Use metal spoon without hesitation",
      "1-year warranty"
    ],
    "description": "Granite non-stick kadai",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "24 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-granite-frypan-260",
    "name": "Premium Granite Fry Pan 260 IB",
    "series": "Marvel",
    "sku": "LMFP 260IB FP",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 1850,
    "features": [
      "Induction base",
      "Uniform heat / faster cooking",
      "Use metal spoon without hesitation",
      "1-year warranty"
    ],
    "description": "Granite non-stick fry pan",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "26 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-granite-frypan-240",
    "name": "Premium Granite Fry Pan 240 IB",
    "series": "Marvel",
    "sku": "LMFP 240IB FP",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 1550,
    "features": [
      "Induction base",
      "Uniform heat / faster cooking",
      "Use metal spoon without hesitation",
      "1-year warranty"
    ],
    "description": "Granite non-stick fry pan",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "24 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-appachatty-250",
    "name": "Non-Stick Appachatty 250",
    "series": "Marvel",
    "sku": "LMAP 250",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 850,
    "features": [
      "Non-stick coating",
      "1-year warranty"
    ],
    "description": "South Indian appam maker",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "25 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-appachatty-prime-350",
    "name": "Appachatty Prime 350",
    "series": "Marvel",
    "sku": "LMAP 350 PRIME",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 950,
    "features": [
      "Non-stick coating",
      "1-year warranty"
    ],
    "description": "Premium appam maker",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "35 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-pathiri-round",
    "name": "Non-Stick Pathiri Tawa Round",
    "series": "Marvel",
    "sku": "LMPTRD",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 2750,
    "features": [
      "Non-stick surface",
      "1-year warranty"
    ],
    "description": "Round pathiri tawa",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-pathiri-fold",
    "name": "Non-Stick Pathiri Tawa Fold",
    "series": "Marvel",
    "sku": "LMPTSQ1",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 2950,
    "features": [
      "Non-stick surface",
      "1-year warranty"
    ],
    "description": "Foldable pathiri tawa",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-cookware-set-ktf",
    "name": "Non-Stick Four Pcs Cookware Set KTF",
    "series": "Marvel",
    "sku": "LMKTF IB",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 3490,
    "features": [
      "Complete starter set",
      "1-year warranty"
    ],
    "description": "4-piece KTF cookware set",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "size": "KTF set",
    "badge": "Seasonal"
  },
  {
    "id": "marvel-biriyani-3-5",
    "name": "Non-Stick Biriyani Pot 3.5Ltr",
    "series": "Marvel",
    "sku": "LMBP 3.5LTR",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 2150,
    "features": [
      "Non-stick interior",
      "1-year warranty"
    ],
    "description": "Biriyani pot 3.5 litre",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "capacity": "3.5 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-biriyani-5",
    "name": "Non-Stick Biriyani Pot 5Ltr",
    "series": "Marvel",
    "sku": "LMBP 5LTR",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 2650,
    "features": [
      "Non-stick interior",
      "1-year warranty"
    ],
    "description": "Biriyani pot 5 litre",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "capacity": "5 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-biriyani-8",
    "name": "Non-Stick Biriyani Pot 8Ltr",
    "series": "Marvel",
    "sku": "LMBP 8LTR",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 2750,
    "features": [
      "Non-stick interior",
      "1-year warranty"
    ],
    "description": "Biriyani pot 8 litre",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "capacity": "8 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-biriyani-10",
    "name": "Non-Stick Biriyani Pot 10Ltr",
    "series": "Marvel",
    "sku": "LMBP 10LTR",
    "catalogTag": "marvel",
    "category": "marvel",
    "material": "Non-Stick Granite",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic"
    ],
    "homeCollection": "cookware",
    "mrp": 2950,
    "features": [
      "Non-stick interior",
      "1-year warranty"
    ],
    "description": "Biriyani pot 10 litre",
    "accent": "#3D3A38",
    "icon": "ellipse-outline",
    "capacity": "10 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "ss-pc-3l-ib",
    "name": "SS Pressure Cooker 3Ltr IB",
    "series": "Pressure Cooker",
    "sku": "LMSSPC3IB",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Dishwasher"
    ],
    "homeCollection": "appliances",
    "mrp": 3490,
    "features": [
      "1-year warranty",
      "Induction base"
    ],
    "description": "Stainless steel pressure cooker 3L",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "3 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "ss-pc-5l-ib",
    "name": "SS Pressure Cooker 5Ltr IB",
    "series": "Pressure Cooker",
    "sku": "LMSSPC5IB",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Induction",
      "Gas",
      "Dishwasher"
    ],
    "homeCollection": "appliances",
    "mrp": 3990,
    "features": [
      "1-year warranty",
      "Induction base"
    ],
    "description": "Stainless steel pressure cooker 5L",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "5 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "alu-pc-3l",
    "name": "ALU Pressure Cooker 3Ltr",
    "series": "Pressure Cooker",
    "sku": "LMALPC3",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Aluminium",
    "warrantyYears": 1,
    "compatibility": [
      "Gas"
    ],
    "homeCollection": "appliances",
    "mrp": 1490,
    "features": [],
    "description": "Aluminium pressure cooker 3L",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "3 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "alu-pc-3l-ib",
    "name": "ALU Pressure Cooker 3Ltr IB",
    "series": "Pressure Cooker",
    "sku": "LMALPC3IB",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Aluminium",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Induction"
    ],
    "homeCollection": "appliances",
    "mrp": 1590,
    "features": [
      "Induction base"
    ],
    "description": "Aluminium pressure cooker 3L induction base",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "3 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "alu-pc-5l",
    "name": "ALU Pressure Cooker 5Ltr",
    "series": "Pressure Cooker",
    "sku": "LMALPC5",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Aluminium",
    "warrantyYears": 1,
    "compatibility": [
      "Gas"
    ],
    "homeCollection": "appliances",
    "mrp": 1950,
    "features": [],
    "description": "Aluminium pressure cooker 5L",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "5 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "alu-pc-5l-ib",
    "name": "ALU Pressure Cooker 5Ltr IB",
    "series": "Pressure Cooker",
    "sku": "LMALPC5IB",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Aluminium",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Induction"
    ],
    "homeCollection": "appliances",
    "mrp": 2150,
    "features": [
      "Induction base"
    ],
    "description": "Aluminium pressure cooker 5L induction base",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "5 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "alu-pc-3l-dripless",
    "name": "ALU Pressure Cooker 3Ltr IB Driples",
    "series": "Pressure Cooker",
    "sku": "LMALPCDL3IB",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Aluminium",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Induction"
    ],
    "homeCollection": "appliances",
    "mrp": 2150,
    "features": [
      "Dripless lid",
      "Induction base"
    ],
    "description": "Dripless aluminium cooker 3L",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "3 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "alu-pc-5l-dripless",
    "name": "ALU Pressure Cooker 5Ltr IB Driples",
    "series": "Pressure Cooker",
    "sku": "LMALPCDL5IB",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Aluminium",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Induction"
    ],
    "homeCollection": "appliances",
    "mrp": 2490,
    "features": [
      "Dripless lid",
      "Induction base"
    ],
    "description": "Dripless aluminium cooker 5L",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "5 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "alu-pc-combo-5x3",
    "name": "ALU Pressure Cooker 5x3 Combo Set",
    "series": "Pressure Cooker",
    "sku": "LMALPC53SL",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Aluminium",
    "warrantyYears": 1,
    "compatibility": [
      "Gas",
      "Induction"
    ],
    "homeCollection": "appliances",
    "mrp": 3350,
    "features": [
      "Combo set"
    ],
    "description": "5L and 3L combo pressure cooker set",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "5 L + 3 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "stello-1b",
    "name": "Stello 1B Single Burner Steel Gas Stove",
    "series": "Stello",
    "sku": "STELLO 1B",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Stainless Steel",
    "warrantyYears": 2,
    "compatibility": [
      "Gas"
    ],
    "homeCollection": "appliances",
    "mrp": 1990,
    "features": [
      "2-year warranty",
      "Make in India",
      "Brass burner"
    ],
    "description": "Single burner stainless steel stove",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "1 burner",
    "badge": "2-Year Warranty"
  },
  {
    "id": "stello-2b",
    "name": "Stello 2B 2-Burner Steel Gas Stove",
    "series": "Stello",
    "sku": "STELLO 2B",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Stainless Steel",
    "warrantyYears": 2,
    "compatibility": [
      "Gas"
    ],
    "homeCollection": "appliances",
    "mrp": 4190,
    "features": [
      "2-year warranty",
      "Make in India",
      "Brass burners"
    ],
    "description": "Two burner stainless steel stove",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "2 burner",
    "badge": "2-Year Warranty"
  },
  {
    "id": "stello-2b-fb",
    "name": "Stello 2B FB Full Steel Gas Stove",
    "series": "Stello",
    "sku": "STELLO 2B FB",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Stainless Steel",
    "warrantyYears": 2,
    "compatibility": [
      "Gas"
    ],
    "homeCollection": "appliances",
    "mrp": 4590,
    "features": [
      "2-year warranty",
      "Make in India",
      "Full steel body"
    ],
    "description": "Full body two burner steel stove",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "2 burner",
    "badge": "2-Year Warranty"
  },
  {
    "id": "sparkle-2b",
    "name": "Sparkle 2B Glass Top Gas Stove",
    "series": "Sparkle",
    "sku": "SPARKLE 2B",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Stainless Steel",
    "warrantyYears": 2,
    "compatibility": [
      "Gas"
    ],
    "homeCollection": "appliances",
    "mrp": 6990,
    "features": [
      "2-year warranty",
      "Make in India",
      "Glass top"
    ],
    "description": "Two burner toughened glass-top stove",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "2 burner",
    "badge": "2-Year Warranty"
  },
  {
    "id": "sparkle-3b",
    "name": "Sparkle 3B Glass Top Gas Stove",
    "series": "Sparkle",
    "sku": "SPARKLE 3B",
    "catalogTag": "cookers-stoves",
    "category": "cookers-stoves",
    "material": "Stainless Steel",
    "warrantyYears": 2,
    "compatibility": [
      "Gas"
    ],
    "homeCollection": "appliances",
    "mrp": 7990,
    "features": [
      "2-year warranty",
      "Make in India",
      "Glass top"
    ],
    "description": "Three burner toughened glass-top stove",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "3 burner",
    "badge": "2-Year Warranty"
  },
  {
    "id": "belly-casserole-1500",
    "name": "Belly SS Insulated Casserole 1500ml",
    "series": "Belly",
    "sku": "BELLY 1500 ML",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1590,
    "features": [
      "Simple functional lid",
      "Neutralizes strong odours",
      "Corrosion resistant",
      "Not for flame or microwave"
    ],
    "description": "Inner-outer stainless steel hot pot",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "1500 ML",
    "badge": "1-Year Warranty"
  },
  {
    "id": "belly-casserole-2500",
    "name": "Belly SS Insulated Casserole 2500ml",
    "series": "Belly",
    "sku": "BELLY 2500 ML",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1990,
    "features": [
      "Simple functional lid",
      "Neutralizes strong odours",
      "Corrosion resistant",
      "Not for flame or microwave"
    ],
    "description": "Inner-outer stainless steel hot pot",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "2500 ML",
    "badge": "1-Year Warranty"
  },
  {
    "id": "belly-casserole-3500",
    "name": "Belly SS Insulated Casserole 3500ml",
    "series": "Belly",
    "sku": "BELLY 3500 ML",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 2650,
    "features": [
      "Simple functional lid",
      "Neutralizes strong odours",
      "Corrosion resistant",
      "Not for flame or microwave"
    ],
    "description": "Inner-outer stainless steel hot pot",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "3500 ML",
    "badge": "1-Year Warranty"
  },
  {
    "id": "belly-casserole-5000",
    "name": "Belly SS Insulated Casserole 5000ml",
    "series": "Belly",
    "sku": "BELLY 5000 ML",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 3750,
    "features": [
      "Simple functional lid",
      "Neutralizes strong odours",
      "Corrosion resistant",
      "Not for flame or microwave"
    ],
    "description": "Inner-outer stainless steel hot pot",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "5000 ML",
    "badge": "1-Year Warranty"
  },
  {
    "id": "pearl-casserole-1500",
    "name": "Pearl SS Insulated Casserole 1500ml",
    "series": "Pearl",
    "sku": "PEARL 1500 ML",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1490,
    "features": [
      "Hot & cool insulation",
      "Not for flame or microwave",
      "Corrosion resistant"
    ],
    "description": "Inner-outer stainless steel hot pot",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "1500 ML",
    "badge": "1-Year Warranty"
  },
  {
    "id": "pearl-casserole-2500",
    "name": "Pearl SS Insulated Casserole 2500ml",
    "series": "Pearl",
    "sku": "PEARL 2500 ML",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1750,
    "features": [
      "Hot & cool insulation",
      "Not for flame or microwave",
      "Corrosion resistant"
    ],
    "description": "Inner-outer stainless steel hot pot",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "2500 ML",
    "badge": "1-Year Warranty"
  },
  {
    "id": "pearl-casserole-3500",
    "name": "Pearl SS Insulated Casserole 3500ml",
    "series": "Pearl",
    "sku": "PEARL 3500 ML",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 2390,
    "features": [
      "Hot & cool insulation",
      "Not for flame or microwave",
      "Corrosion resistant"
    ],
    "description": "Inner-outer stainless steel hot pot",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "3500 ML",
    "badge": "1-Year Warranty"
  },
  {
    "id": "pearl-casserole-5000",
    "name": "Pearl SS Insulated Casserole 5000ml",
    "series": "Pearl",
    "sku": "PEARL 5000 ML",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 3350,
    "features": [
      "Hot & cool insulation",
      "Not for flame or microwave",
      "Corrosion resistant"
    ],
    "description": "Inner-outer stainless steel hot pot",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "5000 ML",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-thermoware-3500",
    "name": "Marvel Thermoware Hot Pot 3500",
    "series": "Marvel",
    "sku": "MARVEL 3500",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1090,
    "features": [
      "BPA free",
      "Food grade",
      "Keep warm / keep cold"
    ],
    "description": "Insulated hot pot — keep warm, keep cold",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "3500",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-thermoware-5500",
    "name": "Marvel Thermoware Hot Pot 5500",
    "series": "Marvel",
    "sku": "MARVEL 5500",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1250,
    "features": [
      "BPA free",
      "Food grade",
      "Keep warm / keep cold"
    ],
    "description": "Insulated hot pot — keep warm, keep cold",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "5500",
    "badge": "1-Year Warranty"
  },
  {
    "id": "marvel-thermoware-6500",
    "name": "Marvel Thermoware Hot Pot 6500",
    "series": "Marvel",
    "sku": "MARVEL 6500",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1590,
    "features": [
      "BPA free",
      "Food grade",
      "Keep warm / keep cold"
    ],
    "description": "Insulated hot pot — keep warm, keep cold",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "6500",
    "badge": "1-Year Warranty"
  },
  {
    "id": "puttu-maker-ss",
    "name": "Stainless Steel Puttu Maker",
    "series": "Kitchen Tools",
    "sku": "LMPM",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 950,
    "features": [
      "Easy handling",
      "No-twist easy fitting",
      "Stay-cool handle",
      "Induction, ceramic, gas & dishwasher"
    ],
    "description": "Traditional puttu maker (LMPM)",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "puttu-maker-chiratta",
    "name": "Chiratta Puttu Maker",
    "series": "Kitchen Tools",
    "sku": "LMCP",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 490,
    "features": [
      "Easy handling",
      "No-twist easy fitting",
      "Stay-cool handle"
    ],
    "description": "Coconut-shell style puttu maker (LMCP)",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "chop-magic-650",
    "name": "Chop Magic Push Chopper 650ml",
    "series": "Chop Magic",
    "sku": "CHOP MAGIC 650",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 690,
    "features": [
      "Easy to push",
      "Stylish locking system",
      "Extra-sharp SS blades",
      "Heavy plastic body"
    ],
    "description": "2-in-1 push chopper with blending blade",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "650 ml",
    "badge": "1-Year Warranty"
  },
  {
    "id": "chop-magic-1100",
    "name": "Chop Magic Push Chopper 1100ml",
    "series": "Chop Magic",
    "sku": "CHOP MAGIC 1100",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 790,
    "features": [
      "Easy to push",
      "Stylish locking system",
      "Extra-sharp SS blades",
      "Heavy plastic body"
    ],
    "description": "2-in-1 push chopper with blending blade",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "1100 ml",
    "badge": "1-Year Warranty"
  },
  {
    "id": "elite-chopper-450",
    "name": "Elite Handy Chopper 450ml",
    "series": "Elite",
    "sku": "ELITE 450",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 490,
    "features": [
      "Instant knife cuts",
      "Blending attachment",
      "2-in-1 chopper"
    ],
    "description": "Pull-cord 2-in-1 handy chopper",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "450 ml",
    "badge": "1-Year Warranty"
  },
  {
    "id": "elite-chopper-750",
    "name": "Elite Handy Chopper 750ml",
    "series": "Elite",
    "sku": "ELITE 750",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 590,
    "features": [
      "Instant knife cuts",
      "Blending attachment",
      "2-in-1 chopper"
    ],
    "description": "Pull-cord 2-in-1 handy chopper",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "750 ml",
    "badge": "1-Year Warranty"
  },
  {
    "id": "ss-saucepan-14",
    "name": "Stainless Steel Sauce Pan 14cm",
    "series": "Kitchen Tools",
    "sku": "LMSP14",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 690,
    "features": [
      "High-quality stainless steel",
      "Strong handle",
      "Induction & gas",
      "1-year warranty"
    ],
    "description": "Mirror-finish sauce pan with lid (LMSP14)",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "14 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "ss-saucepan-16",
    "name": "Stainless Steel Sauce Pan 16cm",
    "series": "Kitchen Tools",
    "sku": "LMSP16",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 790,
    "features": [
      "High-quality stainless steel",
      "Strong handle",
      "Induction & gas",
      "1-year warranty"
    ],
    "description": "Mirror-finish sauce pan with lid (LMSP16)",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "16 cm",
    "badge": "1-Year Warranty"
  },
  {
    "id": "ss-whisk-8",
    "name": "SS Pipe Handle Egg Whisk 8\"",
    "series": "Kitchen Tools",
    "sku": "WHISK 8",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 129,
    "features": [
      "Dishwasher safe"
    ],
    "description": "Stainless steel whisk 8 inch",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "8 in"
  },
  {
    "id": "ss-whisk-10",
    "name": "SS Pipe Handle Egg Whisk 10\"",
    "series": "Kitchen Tools",
    "sku": "WHISK 10",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 149,
    "features": [
      "Dishwasher safe"
    ],
    "description": "Stainless steel whisk 10 inch",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "10 in"
  },
  {
    "id": "ss-whisk-12",
    "name": "SS Pipe Handle Egg Whisk 12\"",
    "series": "Kitchen Tools",
    "sku": "WHISK 12",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 169,
    "features": [
      "Dishwasher safe"
    ],
    "description": "Stainless steel whisk 12 inch",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "12 in"
  },
  {
    "id": "ss-whisk-14",
    "name": "SS Pipe Handle Egg Whisk 14\"",
    "series": "Kitchen Tools",
    "sku": "WHISK 14",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 186,
    "features": [
      "Dishwasher safe"
    ],
    "description": "Stainless steel whisk 14 inch",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "size": "14 in"
  },
  {
    "id": "ss-strainer-1",
    "name": "Stainless Steel Strainer Size 1",
    "series": "Kitchen Tools",
    "sku": "STRAINER 1",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 65,
    "features": [
      "Dishwasher safe"
    ],
    "description": "Fine mesh strainer size 1",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline"
  },
  {
    "id": "ss-strainer-2",
    "name": "Stainless Steel Strainer Size 2",
    "series": "Kitchen Tools",
    "sku": "STRAINER 2",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 75,
    "features": [
      "Dishwasher safe"
    ],
    "description": "Fine mesh strainer size 2",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline"
  },
  {
    "id": "ss-strainer-3",
    "name": "Stainless Steel Strainer Size 3",
    "series": "Kitchen Tools",
    "sku": "STRAINER 3",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 85,
    "features": [
      "Dishwasher safe"
    ],
    "description": "Fine mesh strainer size 3",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline"
  },
  {
    "id": "ss-strainer-4",
    "name": "Stainless Steel Strainer Size 4",
    "series": "Kitchen Tools",
    "sku": "STRAINER 4",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 97,
    "features": [
      "Dishwasher safe"
    ],
    "description": "Fine mesh strainer size 4",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline"
  },
  {
    "id": "lemon-squeezer-light",
    "name": "Lemon Squeezer Light",
    "series": "Kitchen Tools",
    "sku": "SQUEEZER LIGHT",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Aluminium",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 290,
    "features": [],
    "description": "Lightweight lemon squeezer",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline"
  },
  {
    "id": "lemon-squeezer-heavy",
    "name": "Lemon Squeezer Heavy",
    "series": "Kitchen Tools",
    "sku": "SQUEEZER HEAVY",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Aluminium",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 390,
    "features": [],
    "description": "Heavy duty lemon squeezer",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline"
  },
  {
    "id": "lemon-squeezer-premium",
    "name": "Lemon Squeezer Premium with Bottle Opener",
    "series": "Kitchen Tools",
    "sku": "SQUEEZER PREMIUM",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Aluminium",
    "warrantyYears": 0,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 490,
    "features": [],
    "description": "Premium squeezer with bottle opener",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline"
  },
  {
    "id": "lunchbox-charmy",
    "name": "SS Lunch Box Charmy",
    "series": "Pearl",
    "sku": "CHARMY",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 699,
    "features": [],
    "description": "Stainless steel lunch box Charmy",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "lunchbox-aira",
    "name": "SS Lunch Box Aira",
    "series": "Folio",
    "sku": "AIRA",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 799,
    "features": [],
    "description": "Stainless steel lunch box Aira",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "scissors-cairo-201",
    "name": "Multipurpose Scissors Cairo 201",
    "series": "Cairo",
    "sku": "CAIRO 201",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 390,
    "features": [],
    "description": "Multipurpose kitchen scissors",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "scissors-cairo-502",
    "name": "Multipurpose Scissors Cairo 502 with Cover",
    "series": "Cairo",
    "sku": "CAIRO 502",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 490,
    "features": [],
    "description": "Scissors with protective cover",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "scissors-cairo-231",
    "name": "Multipurpose Scissors Cairo 231 with Cover & Magnet",
    "series": "Cairo",
    "sku": "CAIRO 231",
    "catalogTag": "tools",
    "category": "tools",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "tools",
    "mrp": 650,
    "features": [],
    "description": "Scissors with cover and magnet",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "badge": "1-Year Warranty"
  },
  {
    "id": "lmek-1-5",
    "name": "Electric Kettle 1.5L LMEK1.5",
    "series": "Le Mam Appliances",
    "sku": "LMEK 1.5",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [],
    "homeCollection": "appliances",
    "mrp": 1890,
    "features": [
      "Auto cut-off"
    ],
    "description": "Electric kettle 1.5 litre",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "1.5 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "lmek-1-8",
    "name": "Electric Kettle 1.8L LMEK1.8",
    "series": "Le Mam Appliances",
    "sku": "LMEK 1.8",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [],
    "homeCollection": "appliances",
    "mrp": 1990,
    "features": [
      "Auto cut-off"
    ],
    "description": "Electric kettle 1.8 litre",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "1.8 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "lmvf-350",
    "name": "Vacuum Flask LMVFK 350ml",
    "series": "Pearl",
    "sku": "LMVFK 350",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 910,
    "features": [
      "Keeps hot 12 hours"
    ],
    "description": "Vacuum flask 350ml",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "350 ml",
    "badge": "1-Year Warranty"
  },
  {
    "id": "lmvf-500",
    "name": "Vacuum Flask LMVFK 500ml",
    "series": "Pearl",
    "sku": "LMVFK 500",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 990,
    "features": [
      "Keeps hot 12 hours"
    ],
    "description": "Vacuum flask 500ml",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "500 ml",
    "badge": "1-Year Warranty"
  },
  {
    "id": "lmvf-750",
    "name": "Vacuum Flask LMVFK 750ml",
    "series": "Pearl",
    "sku": "LMVFK 750",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1450,
    "features": [
      "Keeps hot 12 hours"
    ],
    "description": "Vacuum flask 750ml",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "750 ml",
    "badge": "1-Year Warranty"
  },
  {
    "id": "lmvf-1000",
    "name": "Vacuum Flask LMVFK 1000ml",
    "series": "Pearl",
    "sku": "LMVFK 1000",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1590,
    "features": [
      "Keeps hot 12 hours"
    ],
    "description": "Vacuum flask 1 litre",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "1 L",
    "badge": "1-Year Warranty"
  },
  {
    "id": "lmvb-750",
    "name": "Vacuum Bottle LMVB 750ml",
    "series": "Pearl",
    "sku": "LMVB 750",
    "catalogTag": "thermoware",
    "category": "thermoware",
    "material": "Stainless Steel",
    "warrantyYears": 1,
    "compatibility": [
      "Dishwasher"
    ],
    "homeCollection": "thermoware",
    "mrp": 1650,
    "features": [],
    "description": "Vacuum bottle 750ml",
    "accent": "#7A6A5C",
    "icon": "ellipse-outline",
    "capacity": "750 ml",
    "badge": "1-Year Warranty"
  },
  {
    "id": "aura-kadai-frypan",
    "name": "Aura Starter Set (Kadai + Fry Pan)",
    "series": "Aura",
    "category": "tri-ply",
    "homeCollection": "cookware",
    "material": "Tri-Ply",
    "mrp": 7680,
    "salePrice": 6490,
    "warrantyYears": 5,
    "compatibility": [
      "Induction",
      "Gas",
      "Ceramic",
      "Dishwasher"
    ],
    "sku": "AURA STARTER",
    "catalogTag": "tri-ply",
    "construction": [
      "304 Stainless Steel interior",
      "Mid-core Aluminium",
      "430 Stainless Steel exterior"
    ],
    "features": [
      "Seasonal savings bundle",
      "5-year Aura warranty",
      "Matched handles"
    ],
    "description": "Seasonal Aura Starter Set pairing a tri-ply kadai and fry pan — food-first 304 interiors with steel-mark authentication.",
    "badge": "Seasonal",
    "accent": "#A35A2A",
    "icon": "layers-outline"
  }
];

export function formatInr(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function priceOf(product: Product) {
  return product.salePrice ?? product.mrp;
}
