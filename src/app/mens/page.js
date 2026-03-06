"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function MensPage() {
  const pageRef = useRef(null);
  
  // --- State for Mobile Modals ---
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  // --- Entrance Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-img', {
        scale: 1.05,
        opacity: 0,
        duration: 1.8,
        ease: 'power3.out',
      });

      gsap.from('.stagger-animate', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.4 
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // --- Prevent background scrolling when a modal is open ---
  useEffect(() => {
    if (isMobileFilterOpen || isMobileSortOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileFilterOpen, isMobileSortOpen]);

  // Updated dummy product data for the Men's page
  const products = Array(8).fill({
    title: "PREMIUM COTTON SOLID SHIRT",
    price: "₹2500",
    originalPrice: "₹3200",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop"
  });

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-white pb-24 pt-4 md:pt-8 text-black">
      
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <section className="relative w-full h-[40vw] md:h-[65vh] md:min-h-[450px] lg:h-[500px] bg-[#f3f5f6] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
          {/* Note: Update this src to your actual men's hero banner image */}
          <img 
            src="/men-hero.png" 
            alt="Men's Collection Banner" 
            className="hero-img w-full h-full object-cover object-center"
          />
        </section>
      </div>

      {/* =========================================
          MAIN CONTENT AREA
      ========================================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-20 flex flex-col md:flex-row gap-10 lg:gap-16">
        
        {/* =======================
            DESKTOP LEFT SIDEBAR (Hidden on Mobile)
        ======================= */}
        <aside className="stagger-animate hidden md:flex w-64 shrink-0 flex-col gap-10">
          <div>
            <h3 className="text-3xl tracking-tight text-black mb-6">Categories</h3>
            <ul className="flex flex-col gap-4 text-[15px] text-gray-700 uppercase tracking-wide">
              <li><a href="#" className="font-bold text-black">NEW IN</a></li>
              <li><a href="#" className="hover:text-black transition-colors">BEST SELLER</a></li>
              <li><a href="#" className="hover:text-black transition-colors">SALE</a></li>
              <li><a href="#" className="hover:text-black transition-colors">COATS</a></li>
              <li><a href="#" className="hover:text-black transition-colors">JACKETS</a></li>
              <li><a href="#" className="hover:text-black transition-colors">SHIRT</a></li>
              <li><a href="#" className="hover:text-black transition-colors">T-SHIRT</a></li>
              <li><a href="#" className="hover:text-black transition-colors">SWEAT SHIRT</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl tracking-tight text-black mb-6">Filters</h3>
            {/* Material */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <h4 className="text-sm text-gray-500 mb-4">Material</h4>
              <ul className="flex flex-col gap-3 text-[13px]">
                {['Cotton', 'Linen', 'Wool', 'Silk', 'Cashmere'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                    <label className="cursor-pointer">{item}</label>
                  </li>
                ))}
              </ul>
            </div>
            {/* Color */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <h4 className="text-sm text-gray-500 mb-4">Color</h4>
              <ul className="flex flex-col gap-3 text-[13px]">
                <li className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-black"></div>
                  <span>Black</span>
                </li>
                <li className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Orange</span>
                </li>
                <li className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span>Green</span>
                </li>
                <li className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span>Yellow</span>
                </li>
                <li className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-blue-900"></div>
                  <span>Dark Blue</span>
                </li>
              </ul>
            </div>
             {/* Size */}
             <div className="mb-6 border-b border-gray-200 pb-6">
              <h4 className="text-sm text-gray-500 mb-4">Size</h4>
              <ul className="flex flex-col gap-3 text-[13px]">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((item) => (
                  <li key={item} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                    <label className="cursor-pointer">{item}</label>
                  </li>
                ))}
              </ul>
            </div>
             {/* Price Range */}
             <div className="mb-8">
              <h4 className="text-sm text-gray-500 mb-4">Price Range</h4>
              <div className="relative w-full h-1 bg-gray-300 rounded-full mb-3 mt-2">
                <div className="absolute left-[20%] right-[40%] h-full bg-black rounded-full"></div>
                <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-gray-400 rounded-full shadow-sm cursor-pointer"></div>
                <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-gray-400 rounded-full shadow-sm cursor-pointer"></div>
              </div>
              <p className="text-[11px] text-gray-500">From ₹1000-₹5000</p>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 text-[11px] font-semibold border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                Clear All Filters
              </button>
              <button className="flex-1 py-2.5 text-[11px] font-semibold bg-black text-white rounded-sm hover:bg-gray-800 transition-colors">
                Applied Filters
              </button>
            </div>
          </div>
        </aside>

        {/* =======================
            PRODUCT GRID AREA
        ======================= */}
        <div className="w-full flex-1 flex flex-col">
          
          {/* --- MOBILE ONLY: Sort & Filter Bar --- */}
          <div className="flex md:hidden w-full border-y border-gray-200 py-3 mb-6">
            <button 
              onClick={() => setIsMobileSortOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 border-r border-gray-200 text-sm font-medium hover:text-gray-600 transition-colors"
            >
              <SortIcon className="w-4 h-4" />
              Sort
            </button>
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors"
            >
              <FilterIcon className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* --- DESKTOP ONLY: Controls (Hidden on Mobile) --- */}
          <div className="hidden md:flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <span className="text-sm text-gray-500">Showing 1-12 of 36 products</span>
            <select className="bg-transparent border-none text-black text-sm font-medium cursor-pointer outline-none hover:text-gray-600 transition-colors">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          {/* --- The Product Grid --- */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
             {products.map((product, index) => (
               <div key={index} className="stagger-animate flex flex-col group">
                 
                 {/* Image Container */}
                 <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-[#f0f0f0] overflow-hidden mb-3 md:mb-4 cursor-pointer rounded-sm md:rounded-none">
                    <img 
                      src={`${product.image}&sig=${index}`} 
                      alt={product.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Favorite Heart Button */}
                    <button className="absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-black transition-colors hover:scale-110 z-10">
                      <HeartIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                 </div>

                 {/* Text Content */}
                 <div className="flex flex-col gap-0.5 md:gap-1 mb-2 md:mb-3 cursor-pointer px-1 md:px-0">
                   <h4 className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-wide line-clamp-1">
                     {product.title}
                   </h4>
                   <div className="flex items-center gap-2">
                     <span className="text-xs md:text-[13px] font-bold text-black">{product.price}</span>
                     <span className="text-[10px] md:text-[11px] text-gray-400 line-through">{product.originalPrice}</span>
                   </div>
                 </div>

                 {/* Add to Cart Button */}
                 <button className="w-full bg-black text-white text-[10px] md:text-[11px] font-bold uppercase py-2.5 md:py-3 rounded-sm hover:bg-gray-800 transition-colors mt-auto">
                   Add to Cart
                 </button>

               </div>
             ))}
          </div>
          
          {/* --- PAGINATION --- */}
          <div className="stagger-animate flex items-center justify-center gap-1 md:gap-2 mt-12 md:mt-16 pb-8">
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-[13px] text-gray-500 border border-gray-200 rounded-sm hover:border-black hover:text-black transition-colors">
              Previous
            </button>
            <button className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-[13px] bg-black text-white rounded-sm">1</button>
            <button className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-[13px] text-black border border-gray-200 rounded-sm hover:border-black transition-colors">2</button>
            <button className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-[13px] text-black border border-gray-200 rounded-sm hover:border-black transition-colors">3</button>
            <button className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-[13px] text-black border border-gray-200 rounded-sm hover:border-black transition-colors">4</button>
            <button className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-black border border-gray-200 rounded-sm hover:border-black transition-colors">
              <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* =========================================
          MOBILE MODALS / OVERLAYS
      ========================================= */}
      
      {/* 1. Mobile Sort Bottom Sheet */}
      {isMobileSortOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          {/* Dark Overlay Background */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSortOpen(false)}
          ></div>
          
          {/* Bottom Sheet Panel */}
          <div className="relative bg-white w-full rounded-t-3xl p-6 flex flex-col transition-transform transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-black">Sort By</h3>
              <button onClick={() => setIsMobileSortOpen(false)} className="p-2 text-gray-500 hover:text-black">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col">
              <button className="text-left py-4 border-b border-gray-100 text-black font-bold flex justify-between items-center">
                Featured
                <span className="w-2 h-2 rounded-full bg-black"></span>
              </button>
              <button className="text-left py-4 border-b border-gray-100 text-gray-600 hover:text-black">Price: Low to High</button>
              <button className="text-left py-4 border-b border-gray-100 text-gray-600 hover:text-black">Price: High to Low</button>
              <button className="text-left py-4 text-gray-600 hover:text-black">Newest Arrivals</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Mobile Filter Slide-out Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Dark Overlay Background */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="relative bg-white w-[85%] max-w-sm h-full overflow-y-auto p-6 flex flex-col gap-8 transition-transform transform duration-300 ml-auto shadow-2xl">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="text-2xl tracking-tight text-black font-semibold">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500 hover:text-black">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Filter Content (Mirrored from Desktop) */}
            <div className="flex flex-col gap-6">
              {/* Material */}
              <div className="mb-2">
                <h4 className="text-base text-black font-medium mb-4">Material</h4>
                <ul className="flex flex-col gap-4 text-sm text-gray-600">
                  {['Cotton', 'Linen', 'Wool', 'Silk', 'Cashmere'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                      <label className="cursor-pointer">{item}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color */}
              <div className="mb-2">
                <h4 className="text-base text-black font-medium mb-4">Color</h4>
                <ul className="flex flex-col gap-4 text-sm text-gray-600">
                  <li className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                    <div className="w-4 h-4 rounded-full bg-black"></div>
                    <span>Black</span>
                  </li>
                  <li className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span>Orange</span>
                  </li>
                  <li className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                    <div className="w-4 h-4 rounded-full bg-green-600"></div>
                    <span>Green</span>
                  </li>
                  <li className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                    <span>Yellow</span>
                  </li>
                </ul>
              </div>

              {/* Size */}
              <div className="mb-2">
                <h4 className="text-base text-black font-medium mb-4">Size</h4>
                <ul className="flex flex-col gap-4 text-sm text-gray-600">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((item) => (
                    <li key={item} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 rounded-sm border-gray-300 accent-black text-black cursor-pointer" />
                      <label className="cursor-pointer">{item}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h4 className="text-base text-black font-medium mb-4">Price Range</h4>
                <div className="relative w-full h-1 bg-gray-300 rounded-full mb-4 mt-2">
                  <div className="absolute left-[20%] right-[40%] h-full bg-black rounded-full"></div>
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-400 rounded-full shadow-sm"></div>
                  <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-400 rounded-full shadow-sm"></div>
                </div>
                <p className="text-xs text-gray-500">From ₹1000-₹5000</p>
              </div>
            </div>

            {/* Action Buttons Container (Sticky at bottom of drawer) */}
            <div className="mt-auto flex gap-3 pt-6 border-t border-gray-100 bg-white sticky bottom-0">
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3.5 text-xs font-semibold border border-gray-300 rounded-sm hover:bg-gray-50 text-black transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3.5 text-xs font-semibold bg-black text-white rounded-sm hover:bg-gray-800 transition-colors"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// --- SVG Icons ---

function SortIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/>
      <path d="M7 12h10"/>
      <path d="M10 18h4"/>
    </svg>
  );
}

function FilterIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="4" y1="21" y2="14"/>
      <line x1="4" x2="4" y1="10" y2="3"/>
      <line x1="12" x2="12" y1="21" y2="12"/>
      <line x1="12" x2="12" y1="8" y2="3"/>
      <line x1="20" x2="20" y1="21" y2="16"/>
      <line x1="20" x2="20" y1="12" y2="3"/>
      <line x1="2" x2="6" y1="14" y2="14"/>
      <line x1="10" x2="14" y1="8" y2="8"/>
      <line x1="18" x2="22" y1="16" y2="16"/>
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}