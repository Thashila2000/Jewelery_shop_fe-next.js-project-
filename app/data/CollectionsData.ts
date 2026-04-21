export type Product = {
  id: number;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  material: string;
  stone?: string;
  image: string;
  badge?: "New" | "Bestseller" | "Limited";
  isNew?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  products: Product[];
};

export const collectionsData: Record<string, Category> = {
  rings: {
    slug: "rings",
    name: "Rings",
    tagline: "The Signature Series",
    description: "Eternal symbols of devotion, from architectural solitaires to intricate pavé bands. Each ring is a promise cast in gold.",
    heroImage: "/RingsCtag.jpg",
    products: [
      { id: 1,  name: "Eternal Solitaire",      tagline: "Classic round brilliant",          price: 4800,  material: "18k White Gold",  stone: "Diamond 1.2ct",   image: "/RingsCtag.jpg",      badge: "Bestseller" },
      { id: 2,  name: "Pavé Band",               tagline: "Diamond-encrusted band",           price: 2950,  material: "18k Yellow Gold", stone: "Diamond 0.6ct",   image: "/RingsCtag.jpg",      badge: "New" },
      { id: 3,  name: "Oval Halo",               tagline: "Surrounded by light",              price: 6200,  material: "Platinum",        stone: "Sapphire 1.8ct",  image: "/RingsCtag.jpg" },
      { id: 4,  name: "Vintage Filigree",         tagline: "Art deco craftsmanship",           price: 3400,  originalPrice: 3900, material: "18k Rose Gold",   stone: "Emerald 0.9ct",   image: "/RingsCtag.jpg",      badge: "Limited" },
      { id: 5,  name: "Minimalist Band",          tagline: "Pure, clean geometry",             price: 1200,  material: "18k Yellow Gold", stone: undefined,         image: "/RingsCtag.jpg" },
      { id: 6,  name: "Three Stone",              tagline: "Past, present, future",            price: 5500,  material: "Platinum",        stone: "Diamond 2.1ct",   image: "/RingsCtag.jpg",      badge: "Bestseller" },
      { id: 7,  name: "Twisted Vine",             tagline: "Nature-inspired elegance",         price: 2200,  material: "18k Rose Gold",   stone: "Diamond 0.4ct",   image: "/RingsCtag.jpg" },
      { id: 8,  name: "Princess Cut",             tagline: "Sharp geometric brilliance",       price: 5100,  material: "18k White Gold",  stone: "Diamond 1.5ct",   image: "/RingsCtag.jpg",      badge: "New" },
    ],
  },
  necklaces: {
    slug: "necklaces",
    name: "Necklaces",
    tagline: "Liquid Light",
    description: "Chains and pendants crafted to catch the light at every movement. From delicate drops to bold statement pieces.",
    heroImage: "/NecklaceCtag.jpg",
    products: [
      { id: 1,  name: "Diamond Pendant",         tagline: "Suspended brilliance",             price: 3200,  material: "18k White Gold",  stone: "Diamond 0.8ct",   image: "/NecklaceCtag.jpg",   badge: "Bestseller" },
      { id: 2,  name: "Gold Lariat",              tagline: "Effortless drape",                 price: 1800,  material: "18k Yellow Gold", stone: undefined,         image: "/NecklaceCtag.jpg" },
      { id: 3,  name: "Pearl Strand",             tagline: "Timeless sophistication",          price: 2600,  material: "18k Gold Clasp",  stone: "South Sea Pearl",  image: "/NecklaceCtag.jpg",   badge: "Limited" },
      { id: 4,  name: "Sapphire Drop",            tagline: "Deep ocean hues",                  price: 4100,  material: "Platinum",        stone: "Sapphire 1.2ct",  image: "/NecklaceCtag.jpg",   badge: "New" },
      { id: 5,  name: "Layering Set",             tagline: "Three-chain harmony",              price: 2200,  originalPrice: 2800, material: "18k Yellow Gold", stone: undefined,         image: "/NecklaceCtag.jpg" },
      { id: 6,  name: "Star Constellation",       tagline: "Celestial wonder",                 price: 3700,  material: "18k White Gold",  stone: "Diamond 0.5ct",   image: "/NecklaceCtag.jpg",   badge: "New" },
    ],
  },
  earrings: {
    slug: "earrings",
    name: "Earrings",
    tagline: "Sculpted Radiance",
    description: "From minimalist studs to high-drama drops. Every pair is a conversation starter crafted in precious metal.",
    heroImage: "/EarringsCtag.webp",
    products: [
      { id: 1,  name: "Diamond Studs",            tagline: "Everyday brilliance",              price: 2400,  material: "18k White Gold",  stone: "Diamond 0.6ct",   image: "/EarringsCtag.webp",  badge: "Bestseller" },
      { id: 2,  name: "Pearl Drops",              tagline: "Classic and refined",              price: 1600,  material: "18k Yellow Gold", stone: "Akoya Pearl",      image: "/EarringsCtag.webp" },
      { id: 3,  name: "Sapphire Hoops",           tagline: "Bold arc of colour",               price: 3100,  material: "Platinum",        stone: "Sapphire 0.8ct",  image: "/EarringsCtag.webp",  badge: "New" },
      { id: 4,  name: "Gold Chandelier",          tagline: "Dramatic cascade",                 price: 2900,  material: "18k Yellow Gold", stone: "Diamond 0.3ct",   image: "/EarringsCtag.webp",  badge: "Limited" },
      { id: 5,  name: "Emerald Studs",            tagline: "Rich verdant lustre",              price: 3600,  material: "18k White Gold",  stone: "Emerald 0.7ct",   image: "/EarringsCtag.webp" },
      { id: 6,  name: "Geometric Drops",          tagline: "Architectural beauty",             price: 1900,  material: "18k Rose Gold",   stone: undefined,         image: "/EarringsCtag.webp",  badge: "New" },
    ],
  },
  bracelets: {
    slug: "bracelets",
    name: "Bracelets",
    tagline: "Wrist Couture",
    description: "Bangles and cuffs designed for effortless stacking. Wear one or layer many — each piece tells its own story.",
    heroImage: "/BraceletsCtag.webp",
    products: [
      { id: 1,  name: "Tennis Bracelet",          tagline: "Unbroken line of light",           price: 5800,  material: "18k White Gold",  stone: "Diamond 2.0ct",   image: "/BraceletsCtag.webp", badge: "Bestseller" },
      { id: 2,  name: "Gold Cuff",                tagline: "Bold architectural form",          price: 2100,  material: "18k Yellow Gold", stone: undefined,         image: "/BraceletsCtag.webp" },
      { id: 3,  name: "Pearl Strand",             tagline: "Layered elegance",                 price: 1900,  material: "18k Gold Clasp",  stone: "Freshwater Pearl", image: "/BraceletsCtag.webp", badge: "New" },
      { id: 4,  name: "Sapphire Bangle",          tagline: "Vivid colour on gold",             price: 3400,  material: "18k Yellow Gold", stone: "Sapphire 0.6ct",  image: "/BraceletsCtag.webp", badge: "Limited" },
      { id: 5,  name: "Diamond Pavé",             tagline: "Encrusted from end to end",        price: 4600,  originalPrice: 5200, material: "18k Rose Gold",   stone: "Diamond 1.4ct",   image: "/BraceletsCtag.webp" },
      { id: 6,  name: "Charm Bracelet",           tagline: "Stories in gold",                  price: 1500,  material: "18k Yellow Gold", stone: undefined,         image: "/BraceletsCtag.webp",  badge: "New" },
    ],
  },
};