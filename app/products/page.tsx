"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowIcon, DotsMark, PageHero } from "../ui";
import spiceRange from "@/public/products/spice-range.jpeg";
import ceylonPack from "@/public/products/ceylon-mixture-front.jpeg";



// ponytail: Unsplash stock as preview filler — every image visually verified; swap for NBI product photography
const allProducts: {
  name: string;
  category: string;
  sizes: string;
  img: StaticImageData | string;
  imgAlt: string;
}[] = [
  {
    name: "Ceylon Mixture",
    category: "Snacks",
    sizes: "100 g · 200 g",
    img: ceylonPack,
    imgAlt: "NBI Ceylon Mixture retail pack",
  },
  {
    name: "Curry Powder",
    category: "Spice Powders",
    sizes: "50 g – 1 kg · bulk",
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70",
    imgAlt: "Curry cooked with fresh coriander",
  },
  {
    name: "Chili Powder",
    category: "Spice Powders",
    sizes: "50 g – 1 kg · bulk",
    img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&q=70",
    imgAlt: "Fresh red chillies",
  },
  {
    name: "Turmeric Powder",
    category: "Spice Powders",
    sizes: "50 g – 1 kg · bulk",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=70",
    imgAlt: "Turmeric and spices flat lay",
  },
  {
    name: "Black Pepper Powder",
    category: "Spice Powders",
    sizes: "50 g – 1 kg · bulk",
    img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=70",
    imgAlt: "Ground pepper and spices in spoons",
  },
  {
    name: "Garam Masala",
    category: "Masala Blends",
    sizes: "50 g – 1 kg · bulk",
    img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70",
    imgAlt: "Spice bowls at a market",
  },
  {
    name: "Pure Ceylon Cinnamon",
    category: "Whole Spices",
    sizes: "Sticks & powder",
    img: "https://images.unsplash.com/photo-1587131782738-de30ea91a542?w=800&q=70",
    imgAlt: "Ceylon cinnamon sticks",
  },
  {
    name: "Pure Ceylon Tea",
    category: "Tea Products",
    sizes: "Loose leaf · gift packs",
    img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=70",
    imgAlt: "Brewed tea with a teapot",
  },
  {
    name: "Spicy Cashews",
    category: "Snacks",
    sizes: "100 g · 200 g",
    img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70",
    imgAlt: "Roasted cashew nuts in a bowl",
  },
  {
    name: "Desiccated Coconut",
    category: "Coconut Products",
    sizes: "Retail & bulk",
    img: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=800&q=70",
    imgAlt: "Split fresh coconut",
  },
  {
    name: "Rice Flour",
    category: "Rice & Grain",
    sizes: "Retail & bulk",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=70",
    imgAlt: "White rice grains",
  },
  {
    name: "Custom Spice Blends",
    category: "Value-Added",
    sizes: "Your recipe · OEM",
    img: spiceRange,
    imgAlt: "NBI spice pack range",
  },
  // Fill out full 50+ product list
  { name: "Roasted Curry Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70", imgAlt: "Curry" },
  { name: "Coriander Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=70", imgAlt: "Coriander" },
  { name: "Cumin Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=70", imgAlt: "Cumin" },
  { name: "White Pepper Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70", imgAlt: "White pepper" },
  { name: "Fennel Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70", imgAlt: "Fennel" },
  { name: "Mustard Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=70", imgAlt: "Mustard" },
  { name: "Fenugreek Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=70", imgAlt: "Fenugreek" },
  { name: "Ginger Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70", imgAlt: "Ginger" },
  { name: "Garlic Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70", imgAlt: "Garlic" },
  { name: "Cinnamon Powder", category: "Spice Powders", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1587131782738-de30ea91a542?w=800&q=70", imgAlt: "Cinnamon powder" },
  { name: "Chicken Masala", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70", imgAlt: "Chicken masala" },
  { name: "Meat Masala", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=70", imgAlt: "Meat masala" },
  { name: "Fish Curry Mix", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70", imgAlt: "Fish curry" },
  { name: "Biryani Masala", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=70", imgAlt: "Biryani" },
  { name: "BBQ Masala", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70", imgAlt: "BBQ" },
  { name: "Tandoori Masala", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=70", imgAlt: "Tandoori" },
  { name: "Fried Rice Seasoning", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70", imgAlt: "Fried rice" },
  { name: "All-Purpose Seasoning", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=70", imgAlt: "All-purpose" },
  { name: "Black Pepper", category: "Whole Spices", sizes: "Whole · ground", img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=70", imgAlt: "Black pepper" },
  { name: "Cloves", category: "Whole Spices", sizes: "Whole", img: "https://images.unsplash.com/photo-1587131782738-de30ea91a542?w=800&q=70", imgAlt: "Cloves" },
  { name: "Cardamom", category: "Whole Spices", sizes: "Whole", img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70", imgAlt: "Cardamom" },
  { name: "Cumin Seeds", category: "Whole Spices", sizes: "Whole", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70", imgAlt: "Cumin seeds" },
  { name: "Coriander Seeds", category: "Whole Spices", sizes: "Whole", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=70", imgAlt: "Coriander seeds" },
  { name: "Fennel Seeds", category: "Whole Spices", sizes: "Whole", img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=70", imgAlt: "Fennel seeds" },
  { name: "Mustard Seeds", category: "Whole Spices", sizes: "Whole", img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70", imgAlt: "Mustard seeds" },
  { name: "Fenugreek Seeds", category: "Whole Spices", sizes: "Whole", img: "https://images.unsplash.com/photo-1587131782738-de30ea91a542?w=800&q=70", imgAlt: "Fenugreek seeds" },
  { name: "Dried Red Chili", category: "Whole Spices", sizes: "Whole", img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&q=70", imgAlt: "Red chili" },
  { name: "Black Tea", category: "Tea Products", sizes: "Loose · powder", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=70", imgAlt: "Black tea" },
  { name: "Green Tea", category: "Tea Products", sizes: "Loose · powder", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=70", imgAlt: "Green tea" },
  { name: "Tea Powder", category: "Tea Products", sizes: "100 g – 1 kg", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=70", imgAlt: "Tea powder" },
  { name: "Flavoured Tea", category: "Tea Products", sizes: "Retail", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=70", imgAlt: "Flavoured tea" },
  { name: "Premium Tea Gift Packs", category: "Tea Products", sizes: "Gift set", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=70", imgAlt: "Gift packs" },
  { name: "Spicy Mixture", category: "Snacks", sizes: "100 g · 200 g", img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70", imgAlt: "Spicy mixture" },
  { name: "Roasted Peanuts", category: "Snacks", sizes: "100 g · 200 g", img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70", imgAlt: "Peanuts" },
  { name: "Masala Peanuts", category: "Snacks", sizes: "100 g · 200 g", img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70", imgAlt: "Masala peanuts" },
  { name: "Cashew Nuts", category: "Snacks", sizes: "100 g · 200 g", img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70", imgAlt: "Cashews" },
  { name: "Chickpeas", category: "Snacks", sizes: "100 g · 200 g", img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70", imgAlt: "Chickpeas" },
  { name: "Murukku", category: "Snacks", sizes: "100 g · 200 g", img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70", imgAlt: "Murukku" },
  { name: "Tapioca Chips", category: "Snacks", sizes: "100 g · 200 g", img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70", imgAlt: "Tapioca chips" },
  { name: "Banana Chips", category: "Snacks", sizes: "100 g · 200 g", img: "https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=800&q=70", imgAlt: "Banana chips" },
  { name: "Coconut Milk Powder", category: "Coconut Products", sizes: "200 g – 1 kg", img: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=800&q=70", imgAlt: "Coconut milk" },
  { name: "Coconut Flour", category: "Coconut Products", sizes: "200 g – 1 kg", img: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=800&q=70", imgAlt: "Coconut flour" },
  { name: "Virgin Coconut Oil", category: "Coconut Products", sizes: "500 ml · 1 L", img: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=800&q=70", imgAlt: "Coconut oil" },
  { name: "Roasted Rice Flour", category: "Rice & Grain", sizes: "500 g · 1 kg", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=70", imgAlt: "Rice flour" },
  { name: "String Hopper Flour", category: "Rice & Grain", sizes: "500 g · 1 kg", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=70", imgAlt: "String hopper" },
  { name: "Pittu Flour", category: "Rice & Grain", sizes: "500 g · 1 kg", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=70", imgAlt: "Pittu flour" },
  { name: "Instant Curry Mix", category: "Value-Added", sizes: "100 g – 500 g", img: spiceRange, imgAlt: "Curry mix" },
  { name: "Ready-to-Cook Mix", category: "Value-Added", sizes: "100 g – 500 g", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70", imgAlt: "Ready-to-cook" },
  { name: "Recipe Mix", category: "Value-Added", sizes: "100 g – 500 g", img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70", imgAlt: "Recipe mix" },
  { name: "Soup Seasoning", category: "Value-Added", sizes: "100 g – 500 g", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=70", imgAlt: "Soup seasoning" },
  { name: "Marinade Mix", category: "Value-Added", sizes: "100 g – 500 g", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=70", imgAlt: "Marinade" },
  { name: "Mixed Masala", category: "Masala Blends", sizes: "50 g – 1 kg", img: "https://images.unsplash.com/photo-1587131782738-de30ea91a542?w=800&q=70", imgAlt: "Mixed masala" },
];


const ITEMS_PER_PAGE = 12;

function SearchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [query, setQuery] = useState("");
  
  // Interactive UI States
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
  const [inquiryBag, setInquiryBag] = useState<{
    name: string;
    quantity: number;
    unit: string;
    packaging: string;
  }[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [pulseBag, setPulseBag] = useState(false);
  const [packFormat, setPackFormat] = useState<"retail" | "bulk" | "oem">("retail");

  // Quick View form state
  const [formQty, setFormQty] = useState(250);
  const [formUnit, setFormUnit] = useState("kg");
  const [formPack, setFormPack] = useState("1kg Aluminium Foil Pouch");

  const categoryList = useMemo(() => ["All", ...new Set(allProducts.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    let items = allProducts;
    if (selectedCategory !== "All") {
      items = items.filter((p) => p.category === selectedCategory);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    items = [...items];
    if (sortBy === "name") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      items.sort((a, b) => a.category.localeCompare(b.category));
    }
    return items;
  }, [selectedCategory, sortBy, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const hasActiveFilters = selectedCategory !== "All" || query.trim() !== "";

  const resetFilters = () => {
    setSelectedCategory("All");
    setQuery("");
    setPage(1);
  };

  // Add Item to B2B Inquiry Cart
  const handleAddToBag = (name: string, qty: number, unit: string, pack: string) => {
    const newItem = { name, quantity: qty, unit, packaging: pack };
    
    // Check if duplicate and merge quantities
    setInquiryBag((prev) => {
      const idx = prev.findIndex((item) => item.name === name && item.packaging === pack && item.unit === unit);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += qty;
        return updated;
      }
      return [...prev, newItem];
    });

    // Trigger visual cart button pulse animation
    setPulseBag(true);
    setTimeout(() => setPulseBag(false), 800);
  };

  const handleRemoveFromBag = (index: number) => {
    setInquiryBag((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitInquiry = () => {
    if (inquiryBag.length === 0) return;
    
    // Build text inquiry representation
    const itemsText = inquiryBag
      .map((item) => `- ${item.name}: ${item.quantity} ${item.unit} (${item.packaging})`)
      .join("\n");
      
    // Redirect to contact form preloaded with text
    const encodedItems = encodeURIComponent(itemsText);
    window.location.href = `/contact?items=${encodedItems}`;
  };

  // Dynamic Product Spec Lookup Generator
  const getProductSpecs = (name: string, category: string) => {
    const n = name.toLowerCase();
    if (n.includes("cinnamon")) {
      return {
        botanical: "Cinnamomum verum (Ceylon Cinnamon)",
        oil: "1.5% - 2.8% cinnamaldehyde",
        potency: "Ultra Low Coumarin Content",
        moisture: "< 12% Moisture Max",
        origin: "Galle / Matale Sourcing",
        profile: "Naturally sweet, warm, woody aroma."
      };
    }
    if (n.includes("pepper")) {
      return {
        botanical: "Piper nigrum (Ceylon Black Pepper)",
        oil: "2.5% - 3.8% piperine compound",
        potency: "Premium Volatile Piperine Level",
        moisture: "< 11.5% Moisture Max",
        origin: "Kandy District Sourcing",
        profile: "Pungent, sharp, intense spice heat."
      };
    }
    if (n.includes("chilli") || n.includes("chili")) {
      return {
        botanical: "Capsicum annuum L. (Ceylon Chilli)",
        oil: "Capsaicin content 0.6% - 0.95%",
        potency: "45,000 - 85,000 SHU Scoville heat",
        moisture: "< 9.5% Moisture Max",
        origin: "Anuradhapura Sourcing",
        profile: "Fierce, dry, bold heat with deep red glow."
      };
    }
    if (n.includes("turmeric")) {
      return {
        botanical: "Curcuma longa (Ceylon Turmeric)",
        oil: "4.0% - 6.2% active curcuminoids",
        potency: "Rich curcumin active base",
        moisture: "< 10% Moisture Max",
        origin: "Matale District Sourcing",
        profile: "Earthy, warm, woody fragrance, gold hue."
      };
    }
    if (n.includes("tea")) {
      return {
        botanical: "Camellia sinensis var. assamica",
        oil: "High polyphenols & catechins",
        potency: "Premium Orthodox Leaf Process",
        moisture: "< 6.5% Moisture Max",
        origin: "Nuwara Eliya / Kandy Highlands",
        profile: "Astringent, bold, bright coppery liquor."
      };
    }
    if (category.includes("Snacks")) {
      return {
        botanical: "Traditional Spice Blend Recipe",
        oil: "Low fat, high crispy crunch retention",
        potency: "Prepared in hygiene certified units",
        moisture: "< 3.0% Moisture Max",
        origin: "Anuradhapura Factory Production",
        profile: "Crisp, savory, seasoned with native herbs."
      };
    }
    return {
      botanical: "Ceylon Food Grade Premium",
      oil: "Volatile oil values retained",
      potency: "Grade-A Export Specification",
      moisture: "Certified standard compliant",
      origin: "Anuradhapura Main Factory",
      profile: "Pure, natural, trace-audited food product."
    };
  };

  // Set default values in Quick View drawer when product opens
  const openQuickView = (prod: typeof allProducts[0]) => {
    setSelectedProduct(prod);
    setFormQty(prod.category === "Snacks" || prod.category === "Tea Products" ? 100 : 250);
    setFormUnit("kg");
    setFormPack(
      prod.category === "Spice Powders" || prod.category === "Masala Blends"
        ? "1kg Aluminium Foil Pouch"
        : prod.category === "Whole Spices"
        ? "25kg Multi-Layer Kraft Sack"
        : "Retail Pack (Bags / Master Cartons)"
    );
  };

  return (
    <>
      <PageHero
        kicker="A comprehensive premium range"
        title="Products"
        sub="NBI manufactures and exports a comprehensive range of premium Sri Lankan food products under the highest quality standards."
      />

      {/* ============ ALL PRODUCTS GRID ============ */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Browse Catalog</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">Export Range ({filtered.length})</h2>
          </div>
          <p className="text-sm font-semibold text-nbicocoa/70">Add items to Inquiry Bag for custom pricing</p>
        </div>

        {/* Sticky filter bar */}
        <div className="sticky top-[76px] z-20 -mx-5 px-5 py-4 bg-[#FBFAF7]/95 backdrop-blur-md border-b border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative w-full lg:max-w-xs shrink-0">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nbicocoa/40 pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search catalog spices..."
                aria-label="Search products"
                className="w-full rounded-full border border-gray-300 bg-white pl-10 pr-9 py-2.5 text-sm font-medium text-nbidark placeholder:text-nbicocoa/40 focus:outline-none focus:ring-2 focus:ring-nbigreen focus:border-nbigreen"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                  className="press absolute right-3 top-1/2 -translate-y-1/2 text-nbicocoa/50 hover:text-nbidark cursor-pointer"
                >
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Category pills — horizontal scroll on mobile */}
            <div className="flex-1 min-w-0 overflow-x-auto scrollbar-none">
              <div className="flex gap-2 w-max py-0.5">
                {categoryList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setPage(1);
                    }}
                    aria-pressed={selectedCategory === cat}
                    className={`press shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-nbired text-white shadow-sm"
                        : "bg-white border border-gray-200 text-nbidark hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              aria-label="Sort products"
              className="shrink-0 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-nbidark focus:outline-none focus:ring-2 focus:ring-nbigreen cursor-pointer"
            >
              <option value="name">Name (A–Z)</option>
              <option value="category">Category Group</option>
            </select>
          </div>

          {hasActiveFilters && (
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-nbicocoa/60">Filtering by:</span>
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-nbigreen/10 text-nbigreen font-semibold px-3 py-1">
                  {selectedCategory}
                </span>
              )}
              {query && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-nbigreen/10 text-nbigreen font-semibold px-3 py-1">
                  &ldquo;{query}&rdquo;
                </span>
              )}
              <button onClick={resetFilters} className="press font-semibold text-nbired hover:underline cursor-pointer">
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        {paged.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {paged.map((p) => (
              <div
                key={p.name}
                onClick={() => openQuickView(p)}
                className="group rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg hover:border-nbigreen/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                  <Image
                    src={p.img}
                    alt={p.imgAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    {...(typeof p.img === "string" ? {} : { placeholder: "blur" as const })}
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-nbidark/80 backdrop-blur px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white">
                    {p.category}
                  </span>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm md:text-base leading-snug text-nbidark group-hover:text-nbigreen transition-colors duration-200">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[10px] font-bold text-nbisand uppercase tracking-wider">
                      Pack sizes: {p.sizes}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-black text-nbigreen uppercase tracking-wider block">
                      Quick View
                    </span>
                    <span className="text-nbired transition-transform duration-200 group-hover:translate-x-1.5">
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <DotsMark className="w-10 h-10 mx-auto text-nbicocoa/25" />
            <p className="mt-4 font-extrabold text-lg">No products match your search</p>
            <p className="mt-1 text-sm text-nbicocoa/60">Try a different keyword or clear your filters.</p>
            <button
              onClick={resetFilters}
              className="press mt-5 inline-flex items-center gap-2 rounded-full bg-nbired px-6 py-2.5 text-sm font-bold text-white hover:bg-[#b82217] cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="press rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-nbidark hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                aria-current={page === p ? "page" : undefined}
                className={`press rounded-lg px-3 py-2 text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  page === p ? "bg-nbired text-white shadow-sm" : "border border-gray-300 bg-white text-nbidark hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="press rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-nbidark hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* ============ INTERACTIVE PACKAGING CONFIGURATOR ============ */}
      <section className="bg-nbicream/40 border-t border-nbigreen/10 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Standardized Sizing</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-nbidark">Wholesale Packing Specifications</h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
              We package under high hygienic regulations using food-grade materials to preserve Ceylon spice volatiles. Select layout models below.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">
            {/* Visual display card */}
            <div className="w-full md:w-1/2 bg-nbidark rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden min-h-[300px] h-[340px]">
              <div className="absolute inset-0 texture-dots opacity-15 pointer-events-none" />
              <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-nbigreen/25 blur-2xl" />
              
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-widest text-nbicream">
                  {packFormat === "retail" ? "Format A: Retail Shelf" : packFormat === "bulk" ? "Format B: Industrial Sacks" : "Format C: OEM Contract"}
                </span>
                
                {packFormat === "retail" && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-bold">Aromashield Foil Pouches</h4>
                    <p className="text-xs text-nbicream/80 leading-relaxed font-serif">
                      Features a multi-layer composite foil (PET/ALU/PE) providing excellent barrier defense against atmospheric humidity, photo-oxidation, and volatile gas leaks. Fitted with easy-tear notches and resealable zippers.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-nbicream">
                      <div>Thickness: 90–120 microns</div>
                      <div>Oxygen Barrier: Excellent</div>
                      <div>Moisture MVTR: &lt; 0.1 g/m²/day</div>
                      <div>Sizes: 50g, 100g, 200g, 500g</div>
                    </div>
                  </div>
                )}

                {packFormat === "bulk" && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-bold">Kraft Multi-Layer Sacks</h4>
                    <p className="text-xs text-nbicream/80 leading-relaxed font-serif">
                      Engineered for high-volume ocean freight logistics. Constructed with 3 to 4 layers of extensible virgin kraft paper, combined with a 50-micron internal food-grade PE liner to seal moisture out.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-nbicream">
                      <div>Weight Rating: Up to 25 kg</div>
                      <div>Inner Layer: food-grade LLDPE</div>
                      <div>Palletization: ISPM-15 treated</div>
                      <div>Load Ratio: 10 metric tons/20FCL</div>
                    </div>
                  </div>
                )}

                {packFormat === "oem" && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-bold">OEM Private Label Solutions</h4>
                    <p className="text-xs text-nbicream/80 leading-relaxed font-serif">
                      NBI provides full-scale private label contract packaging services. Choose raw spices from Anuradhapura, submit your graphics, and we pack directly to retail cartons or custom jars with barcode validation.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-nbicream">
                      <div>Labeling: Multi-lingual options</div>
                      <div>Containers: PET jars, pouches</div>
                      <div>Barcoding: GS1 compliant</div>
                      <div>MOQ: 5,000 units/blend</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mini SVG Graphics Illustration of Packaging Format */}
              <div className="w-full h-16 relative flex items-center justify-center pt-2 border-t border-white/10 mt-auto">
                {packFormat === "retail" && (
                  <svg className="w-20 h-10 text-nbicream" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M35,45 L65,45 L75,10 L25,10 Z" />
                    <line x1="25" y1="18" x2="75" y2="18" strokeDasharray="2, 2" />
                    <circle cx="50" cy="30" r="4" fill="currentColor" opacity="0.3" />
                  </svg>
                )}
                {packFormat === "bulk" && (
                  <svg className="w-20 h-10 text-nbicream" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="35" y="10" width="30" height="35" rx="2" />
                    <line x1="35" y1="20" x2="65" y2="20" />
                    <line x1="35" y1="35" x2="65" y2="35" strokeDasharray="3, 2" />
                  </svg>
                )}
                {packFormat === "oem" && (
                  <svg className="w-20 h-10 text-nbicream" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="25" y="15" width="20" height="25" rx="3" />
                    <circle cx="35" cy="25" r="3" />
                    <rect x="55" y="10" width="20" height="32" rx="1" />
                    <line x1="55" y1="18" x2="75" y2="18" />
                  </svg>
                )}
              </div>
            </div>

            {/* Selector options details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-nbired bg-nbired/10 px-2.5 py-1 rounded-full inline-block">
                  Package Format Simulator
                </span>
                <h3 className="text-2xl font-extrabold text-nbidark">Choose Packaging Format</h3>
                <p className="text-sm font-serif text-nbicocoa leading-relaxed">
                  Toggle the selector tabs below to review barrier properties, moisture benchmarks, and palletization guidelines for international export compliance.
                </p>

                {/* Vertical interactive pill selection buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => setPackFormat("retail")}
                    className={`press w-full text-left p-3.5 rounded-xl border transition-all text-xs font-bold ${
                      packFormat === "retail"
                        ? "bg-nbigreen/5 border-nbigreen text-nbigreen"
                        : "bg-white border-gray-200 text-nbidark hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    Format A: Foil Pouches & Shelf Containers
                  </button>
                  <button
                    onClick={() => setPackFormat("bulk")}
                    className={`press w-full text-left p-3.5 rounded-xl border transition-all text-xs font-bold ${
                      packFormat === "bulk"
                        ? "bg-nbigreen/5 border-nbigreen text-nbigreen"
                        : "bg-white border-gray-200 text-nbidark hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    Format B: Multi-Layer Industrial Kraft Sacks (25kg)
                  </button>
                  <button
                    onClick={() => setPackFormat("oem")}
                    className={`press w-full text-left p-3.5 rounded-xl border transition-all text-xs font-bold ${
                      packFormat === "oem"
                        ? "bg-nbigreen/5 border-nbigreen text-nbigreen"
                        : "bg-white border-gray-200 text-nbidark hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    Format C: Private Label Contract Packaging (OEM)
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="press w-full inline-flex items-center justify-center gap-2 rounded-xl bg-nbired px-6 py-3 font-bold text-white hover:bg-[#b82217] text-sm cursor-pointer"
                >
                  Inquire OEM Catalog Options
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PERSISTENT FLOATING INQUIRY BAG TRIGGER ============ */}
      {inquiryBag.length > 0 && (
        <button
          onClick={() => setBagOpen(true)}
          className={`fixed bottom-6 right-6 z-40 bg-nbired text-white rounded-full p-4 md:p-5 shadow-2xl flex items-center gap-2.5 cursor-pointer transition-all hover:scale-105 ${
            pulseBag ? "animate-bounce" : ""
          }`}
          aria-label="Open Quote Inquiry Bag"
        >
          <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="font-extrabold text-sm tracking-wider">
            Inquiry Bag ({inquiryBag.length})
          </span>
        </button>
      )}

      {/* ============ B2B INQUIRY BAG OVERLAY DRAWER ============ */}
      {bagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setBagOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          {/* Drawer Wrapper */}
          <div className="relative w-full max-w-md bg-[#FBFAF7] h-full shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto animate-slide-in-right">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-black text-nbidark">Wholesale Inquiry Bag</h3>
                  <p className="text-xs font-semibold text-nbisand">Review selected packaging quantities</p>
                </div>
                <button
                  onClick={() => setBagOpen(false)}
                  className="press p-2 rounded-full hover:bg-gray-100 text-nbidark cursor-pointer"
                  aria-label="Close Drawer"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Inquiry Items List */}
              {inquiryBag.length > 0 ? (
                <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
                  {inquiryBag.map((item, idx) => (
                    <div
                      key={`${item.name}-${idx}`}
                      className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start"
                    >
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-nbidark">{item.name}</h4>
                        <p className="text-[10px] text-nbisand font-mono uppercase">
                          Pack: {item.packaging}
                        </p>
                        <p className="text-xs font-semibold text-nbigreen">
                          Volume: {item.quantity} {item.unit}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromBag(idx)}
                        className="press text-xs font-bold text-nbired hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <svg className="w-12 h-12 text-nbicocoa/40 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                  </svg>
                  <p className="text-sm font-semibold text-nbicocoa/60">Your inquiry bag is empty.</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 space-y-3">
              <button
                onClick={handleSubmitInquiry}
                disabled={inquiryBag.length === 0}
                className={`press w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest text-center cursor-pointer transition-colors ${
                  inquiryBag.length === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-nbired text-white hover:bg-[#b82217]"
                }`}
              >
                Proceed to Submit Inquiry
              </button>
              <button
                onClick={() => setBagOpen(false)}
                className="w-full text-center text-xs font-bold text-nbisand hover:underline py-2 cursor-pointer"
              >
                Continue Browsing Spices
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ PRODUCT DETAIL QUICK VIEW BACKDROP & CENTERED MODAL ============ */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedProduct(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          {/* Centered Modal Container */}
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row border border-gray-100 overflow-hidden max-h-[90vh] animate-scale-in">
            {/* Left Column: Media & Specifications */}
            <div className="w-full md:w-1/2 bg-gray-50/50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto max-h-[45vh] md:max-h-full">
              <div className="space-y-4">
                {/* Product preview image */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-inner">
                  <Image
                    src={selectedProduct.img}
                    alt={selectedProduct.imgAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Specs list */}
                <div className="space-y-3.5 pt-2">
                  <div className="border-b border-gray-100 pb-2">
                    <span className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Botanical Identification</span>
                    <p className="text-xs font-bold font-serif text-nbidark italic mt-0.5">
                      {getProductSpecs(selectedProduct.name, selectedProduct.category).botanical}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-b border-gray-100 pb-2">
                    <div>
                      <span className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Volatile Oil Spec</span>
                      <p className="text-xs font-extrabold text-nbidark mt-0.5">
                        {getProductSpecs(selectedProduct.name, selectedProduct.category).oil}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Audited Moisture Cap</span>
                      <p className="text-xs font-extrabold text-nbidark mt-0.5">
                        {getProductSpecs(selectedProduct.name, selectedProduct.category).moisture}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-b border-gray-100 pb-2">
                    <div>
                      <span className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Potency Class</span>
                      <p className="text-xs font-extrabold text-nbidark mt-0.5">
                        {getProductSpecs(selectedProduct.name, selectedProduct.category).potency}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Sourcing Origin</span>
                      <p className="text-xs font-extrabold text-nbidark mt-0.5">
                        {getProductSpecs(selectedProduct.name, selectedProduct.category).origin}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Flavor & Sensory Profile</span>
                    <p className="text-xs font-serif leading-relaxed text-nbicocoa mt-0.5">
                      {getProductSpecs(selectedProduct.name, selectedProduct.category).profile}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Custom Configuration Form & Actions */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-full">
              <div>
                {/* Header title */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block rounded-full bg-nbigreen/10 border border-nbigreen/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-nbigreen">
                      {selectedProduct.category}
                    </span>
                    <h3 className="text-xl font-black text-nbidark mt-1">{selectedProduct.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="press p-2 rounded-full hover:bg-gray-100 text-nbidark cursor-pointer shrink-0 ml-2"
                    aria-label="Close modal"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Form configurations */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4.5 space-y-4">
                  <span className="text-[10px] font-black text-nbigreen uppercase tracking-widest block">Configure Inquiry Specs</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-qty" className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Quantity</label>
                      <input
                        id="modal-qty"
                        type="number"
                        min="1"
                        value={formQty}
                        onChange={(e) => setFormQty(Math.max(1, parseInt(e.target.value) || 0))}
                        className="mt-1 w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-nbidark focus:outline-none focus:ring-2 focus:ring-nbigreen"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-unit" className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Unit</label>
                      <select
                        id="modal-unit"
                        value={formUnit}
                        onChange={(e) => setFormUnit(e.target.value)}
                        className="mt-1 w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs font-bold text-nbidark focus:outline-none focus:ring-2 focus:ring-nbigreen"
                      >
                        <option value="kg">kg (Kilograms)</option>
                        <option value="MT">MT (Metric Tons)</option>
                        <option value="master cartons">Master Cartons</option>
                        <option value="retail units">Retail Units</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-pack" className="text-[9px] font-bold text-nbisand uppercase tracking-wider block">Packaging Option</label>
                    <select
                      id="modal-pack"
                      value={formPack}
                      onChange={(e) => setFormPack(e.target.value)}
                      className="mt-1 w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs font-bold text-nbidark focus:outline-none focus:ring-2 focus:ring-nbigreen"
                    >
                      <option value="1kg Foil Pouches (Retail)">1kg Foil Pouches (Retail-ready)</option>
                      <option value="250g Shaker Jars (Retail)">250g Shaker Jars (Retail-ready)</option>
                      <option value="25kg Multi-Layer Kraft Sack">25kg Multi-Layer Kraft Sack (Industrial)</option>
                      <option value="50kg Jute Hessian Bags">50kg Jute Hessian Bags (Industrial)</option>
                      <option value="Custom OEM Brand Box">Custom OEM Private Label Brand Packaging</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    handleAddToBag(selectedProduct.name, formQty, formUnit, formPack);
                    setSelectedProduct(null);
                  }}
                  className="press flex-1 bg-nbigreen text-white py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-widest text-center cursor-pointer transition-colors hover:bg-[#00602f]"
                >
                  Add to Inquiry Bag
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    window.location.href = `/contact?items=- ${selectedProduct.name} (${formQty} ${formUnit} via ${formPack})`;
                  }}
                  className="press bg-gray-100 text-nbidark px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center cursor-pointer hover:bg-gray-200"
                >
                  Direct Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
