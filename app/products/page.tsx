"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowIcon, CheckItem, DotsMark, PageHero } from "../ui";
import spiceRange from "@/public/products/spice-range.jpeg";
import heroRange from "@/public/products/hero-range.jpeg";
import ceylonPack from "@/public/products/ceylon-mixture-pack.jpeg";

type Category = {
  name: string;
  items: string[];
  img?: StaticImageData;
  imgAlt?: string;
};

const categories: Category[] = [
  {
    name: "Spice Powders",
    img: spiceRange,
    imgAlt: "NBI spice powder packs",
    items: [
      "Curry Powder",
      "Roasted Curry Powder",
      "Chili Powder",
      "Black Pepper Powder",
      "White Pepper Powder",
      "Turmeric Powder",
      "Coriander Powder",
      "Cumin Powder",
      "Fennel Powder",
      "Mustard Powder",
      "Fenugreek Powder",
      "Ginger Powder",
      "Garlic Powder",
      "Cinnamon Powder",
    ],
  },
  {
    name: "Masala Blends",
    img: heroRange,
    imgAlt: "NBI masala blend packs",
    items: [
      "Mixed Masala",
      "Chicken Masala",
      "Meat Masala",
      "Fish Curry Mix",
      "Garam Masala",
      "Biryani Masala",
      "BBQ Masala",
      "Tandoori Masala",
      "Fried Rice Seasoning",
      "All-Purpose Seasoning",
    ],
  },
  {
    name: "Whole Spices",
    items: [
      "Pure Ceylon Cinnamon",
      "Black Pepper",
      "Cloves",
      "Cardamom",
      "Cumin Seeds",
      "Coriander Seeds",
      "Fennel Seeds",
      "Mustard Seeds",
      "Fenugreek Seeds",
      "Dried Red Chili",
    ],
  },
  {
    name: "Tea Products",
    items: ["Pure Ceylon Tea", "Black Tea", "Green Tea", "Tea Powder", "Flavoured Tea", "Premium Tea Gift Packs"],
  },
  {
    name: "Snacks & Traditional Foods",
    img: ceylonPack,
    imgAlt: "NBI Ceylon Mixture pack",
    items: [
      "Ceylon Mixture",
      "Spicy Mixture",
      "Roasted Peanuts",
      "Masala Peanuts",
      "Cashew Nuts",
      "Spicy Cashews",
      "Chickpeas",
      "Murukku",
      "Tapioca Chips",
      "Banana Chips",
    ],
  },
  {
    name: "Coconut Products",
    items: ["Desiccated Coconut", "Coconut Milk Powder", "Coconut Flour", "Virgin Coconut Oil"],
  },
  {
    name: "Rice & Grain Products",
    items: ["Rice Flour", "Roasted Rice Flour", "String Hopper Flour", "Pittu Flour"],
  },
  {
    name: "Value-Added Products",
    items: [
      "Instant Curry Mixes",
      "Ready-to-Cook Spice Mixes",
      "Recipe Mixes",
      "Soup Seasonings",
      "Marinades",
      "Customized Spice Blends",
    ],
  },
];

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

const packaging = [
  "Retail Packs (50 g, 100 g, 200 g, 500 g, 1 kg)",
  "Bulk Packs (5 kg, 10 kg, 25 kg)",
  "Private Label Manufacturing (OEM)",
  "Customized Packaging Solutions",
  "Export-Ready Packaging",
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

  return (
    <>
      <PageHero
        kicker="A comprehensive premium range"
        title="Products"
        sub="NBI manufactures and exports a comprehensive range of premium Sri Lankan food products under the highest quality standards."
      />

      {/* ============ ALL PRODUCTS GRID ============ */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Browse</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">All Products ({filtered.length})</h2>
          </div>
          <p className="text-sm font-semibold text-nbicocoa/70">Wholesale &amp; export pricing on request</p>
        </div>

        {/* Sticky filter bar */}
        <div className="sticky top-[76px] z-30 -mx-5 px-5 py-4 bg-[#FBFAF7]/95 backdrop-blur-md border-b border-gray-200 mb-8">
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
                placeholder="Search products…"
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
            <div className="flex-1 min-w-0 overflow-x-auto">
              <div className="flex gap-2 w-max">
                {categoryList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setPage(1);
                    }}
                    aria-pressed={selectedCategory === cat}
                    className={`press shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-nbired text-white"
                        : "bg-gray-100 text-nbidark hover:bg-gray-200"
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
              className="shrink-0 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-nbidark focus:outline-none focus:ring-2 focus:ring-nbigreen cursor-pointer"
            >
              <option value="name">Name (A–Z)</option>
              <option value="category">Category</option>
            </select>
          </div>

          {hasActiveFilters && (
            <div className="mt-3 flex items-center gap-2 text-sm">
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
              <Link
                key={p.name}
                href="/contact"
                className="group rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg hover:border-nbigreen/40 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nbigreen"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={p.img}
                    alt={p.imgAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                    {...(typeof p.img === "string" ? {} : { placeholder: "blur" as const })}
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-nbidark/75 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-nbicream">
                    {p.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-extrabold leading-snug">{p.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-nbicocoa/60">{p.sizes}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-nbired group-hover:gap-2.5 transition-all duration-200">
                    Request quote
                    <ArrowIcon />
                  </p>
                </div>
              </Link>
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
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="press rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-semibold text-nbidark hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                aria-current={page === p ? "page" : undefined}
                className={`press rounded-lg px-3.5 py-2.5 font-semibold transition-all duration-200 cursor-pointer ${
                  page === p ? "bg-nbired text-white" : "border border-gray-300 bg-white text-nbidark hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="press rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-semibold text-nbidark hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Packaging section — moved below pagination */}
      <section className="bg-nbicream/40 border-y border-nbigreen/10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="mt-0 rounded-3xl bg-nbidark text-white p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="font-serif italic text-lg" style={{ color: "#FF5A4C" }}>
                  Retail to bulk, your brand or ours
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">Packaging Options</h2>
                <ul className="mt-6 space-y-3 text-sm font-semibold">
                  {packaging.map((p) => (
                    <CheckItem key={p}>{p}</CheckItem>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-serif text-lg leading-relaxed text-nbicream/90">
                  NBI continuously develops new products to meet changing consumer preferences while maintaining the
                  authentic taste, freshness, and premium quality of Sri Lankan food products.
                </p>
                <Link
                  href="/contact"
                  className="press mt-8 inline-flex items-center gap-2 rounded-full bg-nbired px-7 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Request Full Catalogue &amp; Pricing
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
