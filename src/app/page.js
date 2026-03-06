"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger for scroll-based animations
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const stealsRef = useRef(null);
  const promoRef = useRef(null); 
  const discountRef = useRef(null); 
  const categoriesRef = useRef(null); 
  const instaRef = useRef(null); // New ref for the Instagram section

  // --- 1. Original Hero Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-img', {
        scale: 1.05,
        opacity: 0,
        duration: 1.8,
        ease: 'power3.out',
      });

      gsap.from('.hero-element', {
        y: 30, 
        opacity: 0, 
        duration: 1,
        stagger: 0.15, 
        ease: 'power3.out',
        delay: 0.3 
      });
    }, heroRef);
    return () => ctx.revert(); 
  }, []);

  // --- 2. Hot Steals Section Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.steals-heading', {
        scrollTrigger: {
          trigger: '.steals-heading',
          start: 'top 85%', 
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.steals-card', {
        scrollTrigger: {
          trigger: '.steals-grid',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, 
        ease: 'power3.out'
      });
    }, stealsRef);
    return () => ctx.revert();
  }, []);

  // --- 3. Promo Banner Section Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.promo-banner', {
        scrollTrigger: {
          trigger: '.promo-banner',
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.promo-element', {
        scrollTrigger: {
          trigger: '.promo-banner',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2 
      });

      gsap.from('.promo-image', {
        scrollTrigger: {
          trigger: '.promo-banner',
          start: 'top 85%',
        },
        x: 50, 
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4
      });
    }, promoRef);
    return () => ctx.revert();
  }, []);

  // --- 4. Category Discounts Section Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.discount-card', {
        scrollTrigger: {
          trigger: '.discount-grid',
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, discountRef);
    return () => ctx.revert();
  }, []);

  // --- 5. Categories Section Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cat-header-item', {
        scrollTrigger: {
          trigger: '.cat-header',
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.cat-main-img', {
        scrollTrigger: {
          trigger: '.cat-grid',
          start: 'top 80%',
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Target the cards AND the new mobile button for the stagger animation
      gsap.from('.cat-product-card, .cat-mobile-btn', {
        scrollTrigger: {
          trigger: '.cat-grid',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, categoriesRef);
    return () => ctx.revert();
  }, []);

  // --- 6. New Instagram Feed Section Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animate the heading and button
      gsap.from('.insta-anim', {
        scrollTrigger: {
          trigger: '.insta-section',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Stagger the 4 Instagram images
      gsap.from('.insta-card', {
        scrollTrigger: {
          trigger: '.insta-grid',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

    }, instaRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-0">
      
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section ref={heroRef} className="relative w-full h-[55vw] md:h-[85vh] md:min-h-[550px] flex items-center justify-center bg-[#fdfdfd] overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-center items-center">
          <img src="/hero-image.png" alt="Luxe Lane Fashion Model" className="hero-img h-full w-full object-contain md:object-center" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-row h-full">
          <div className="flex flex-col items-start w-1/2 justify-center h-full z-20">
            <h1 className="hero-element text-[13vw] md:text-[9rem] lg:text-[12rem] font-serif italic text-black leading-none tracking-tight">Luxe</h1>
            <p className="hero-element mt-[5vw] md:mt-6 text-[2.5vw] md:text-base lg:text-lg text-black max-w-[80%] md:max-w-[24rem] lg:max-w-sm leading-snug md:leading-normal">
              Lorem Ipsum is simply dummy text of the printing industry.
            </p>
            <Link href="/womens" className="hero-element mt-[3vw] md:mt-8 flex items-center gap-1 md:gap-3 bg-black text-white px-[3vw] py-[1.5vw] md:px-8 md:py-3.5 rounded-full text-[2.5vw] md:text-sm lg:text-base font-medium hover:bg-gray-800 transition-colors duration-300">
              Explore More <ArrowRightIcon className="w-[3vw] h-[3vw] md:w-5 md:h-5" />
            </Link>
          </div>
          <div className="relative w-1/2 flex justify-end items-end h-full pb-[4vw] md:pb-24 pointer-events-none z-10">
            <h1 className="hero-element text-[13vw] md:text-[9rem] lg:text-[12rem] font-serif italic text-black leading-none tracking-tight text-right">Lane</h1>
          </div>
        </div>
      </section>

      {/* =========================================
          HOT STYLE STEALS SECTION
      ========================================= */}
      <section ref={stealsRef} className="w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <h2 className="steals-heading text-4xl md:text-5xl lg:text-[3.5rem] leading-tight text-black mb-10 md:mb-16">
            <span className="font-light">Hot Style Steals Up to </span>
            <span className="font-bold">70% Off Now</span>
          </h2>

          <div className="steals-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            <Link href="/womens" className="steals-card group flex flex-col items-center cursor-pointer">
              <div className="w-full aspect-[4/5] bg-[#f4f4f4] rounded-3xl overflow-hidden mb-5">
                <img src="/summer-wear-70.png" alt="Summer Wear Women" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif italic text-black tracking-wide">Summer Wear</h3>
            </Link>

            <Link href="/mens" className="steals-card group flex flex-col items-center cursor-pointer">
              <div className="w-full aspect-[4/5] bg-[#f4f4f4] rounded-3xl overflow-hidden mb-5">
                <img src="/summer-wear-men70.png" alt="Summer Wear Men" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif italic text-black tracking-wide">Summer Wear</h3>
            </Link>

            <Link href="/kids" className="steals-card group flex flex-col items-center cursor-pointer">
              <div className="w-full aspect-[4/5] bg-[#f4f4f4] rounded-3xl overflow-hidden mb-5">
                <img src="/summer-wear-kids70.jpg" alt="Winter Wear Kids" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif italic text-black tracking-wide">Winter Wear</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          PROMO BANNER SECTION
      ========================================= */}
      <section ref={promoRef} className="w-full bg-white pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="promo-banner relative w-full bg-[#f6f6f6] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row-reverse items-center justify-between min-h-[350px] md:min-h-[400px]">
            <div className="w-full md:w-1/2 h-full flex justify-center items-end p-8 md:p-0 md:justify-end md:relative">
              <img src="/home-page-hot-style.png" alt="Models wearing promo items" className="promo-image max-h-[250px] md:h-full w-auto object-contain object-bottom md:object-right-bottom" />
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-12 lg:p-20 flex flex-col items-center md:items-start text-center md:text-left z-10">
              <h2 className="promo-element text-4xl md:text-5xl lg:text-[3.5rem] leading-tight text-black mb-8">
                <span className="font-light">Hot Style Steals Up to </span>
                <span className="font-bold">70% Off Now</span>
              </h2>
              <Link href="/womens" className="promo-element flex items-center gap-3 bg-black text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors duration-300 mx-auto md:mx-0">
                Explore More <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CATEGORY DISCOUNTS GRID SECTION
      ========================================= */}
      <section ref={discountRef} className="w-full bg-white pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="discount-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Link href="/kids" className="discount-card group relative bg-[#f6f6f6] rounded-[2rem] p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[400px] md:min-h-[500px]">
              <div className="absolute left-0 bottom-0 w-3/5 h-[90%] pointer-events-none">
                <img src="/kids-wear-40.png" alt="Kids Wear" className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 ease-out origin-bottom" />
              </div>
              <div className="relative z-10 flex items-center justify-end gap-3 w-full">
                <h3 className="text-xl md:text-2xl font-medium text-black">Kids Wear</h3>
                <div className="bg-[#1d2331] text-white p-2 rounded-full">
                  <ArrowUpRightIcon />
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-end text-black mt-auto">
                <span className="text-2xl md:text-3xl font-light mb-[-5px]">Upto</span>
                <span className="text-6xl md:text-[5.5rem] font-bold leading-none tracking-tight">40%</span>
              </div>
            </Link>

            <div className="flex flex-col gap-6 md:gap-8">
              <Link href="/womens" className="discount-card group relative bg-[#f6f6f6] rounded-[2rem] p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[220px] flex-1">
                <div className="absolute left-4 bottom-0 w-2/5 h-[100%] pointer-events-none">
                  <img src="/women-wear-10.png" alt="Women Wear" className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 ease-out origin-bottom" />
                </div>
                <div className="relative z-10 flex items-center justify-end gap-3 w-full">
                  <h3 className="text-xl md:text-2xl font-medium text-black">Women Wear</h3>
                  <div className="bg-[#1d2331] text-white p-2 rounded-full">
                    <ArrowUpRightIcon />
                  </div>
                </div>
                <div className="relative z-10 flex items-baseline justify-end gap-3 text-black mt-auto">
                  <span className="text-2xl md:text-3xl font-light">Upto</span>
                  <span className="text-5xl md:text-[4.5rem] font-bold leading-none tracking-tight">10%</span>
                </div>
              </Link>

              <Link href="/mens" className="discount-card group relative bg-[#f6f6f6] rounded-[2rem] p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[220px] flex-1">
                <div className="absolute left-4 bottom-0 w-2/5 h-[100%] pointer-events-none">
                  <img src="/men-wear-20.png" alt="Men Wear" className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 ease-out origin-bottom" />
                </div>
                <div className="relative z-10 flex items-center justify-end gap-3 w-full">
                  <h3 className="text-xl md:text-2xl font-medium text-black">Men Wear</h3>
                  <div className="bg-[#1d2331] text-white p-2 rounded-full">
                    <ArrowUpRightIcon />
                  </div>
                </div>
                <div className="relative z-10 flex items-baseline justify-end gap-3 text-black mt-auto">
                  <span className="text-2xl md:text-3xl font-light">Upto</span>
                  <span className="text-5xl md:text-[4.5rem] font-bold leading-none tracking-tight">20%</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CATEGORIES SECTION
      ========================================= */}
      <section ref={categoriesRef} className="w-full bg-white pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="cat-header flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-8 md:mb-12">
            
            {/* Title & Icons (Centered on Mobile, Left on Desktop) */}
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 w-full md:w-auto">
              <h2 className="cat-header-item text-[2.75rem] md:text-[4rem] text-black tracking-tight">
                Categories
              </h2>
              
              <div className="cat-header-item flex items-center justify-center md:justify-start gap-4 w-full">
                <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <ShirtIcon />
                </button>
                <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <CapIcon />
                </button>
                <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <WatchIcon />
                </button>
                <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <DressIcon />
                </button>
              </div>
            </div>

            {/* Desktop View More Button */}
            <Link href="/categories" className="cat-header-item hidden md:flex bg-black text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-colors duration-300">
              View More
            </Link>

          </div>

          {/* Grid Layout */}
          <div className="cat-grid grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            
            {/* Main Feature Image */}
            <div className="cat-main-img w-full h-[400px] lg:h-full min-h-[450px] rounded-[2rem] overflow-hidden bg-[#e8eef2] relative">
              <img 
                src="/categories-main-image.png" 
                alt="Men's Hoodie Model" 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Product Cards (Forced 2 columns on mobile) */}
            <div className="bg-[#f6f6f6] rounded-[2rem] p-3 sm:p-6 grid grid-cols-2 gap-3 sm:gap-4">
              
              {/* Card 1 */}
              <div className="cat-product-card bg-white rounded-2xl sm:rounded-[1.5rem] p-2.5 sm:p-4 flex flex-col justify-between group">
                <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-[#6c8e96]">
                  <img src="/Brown-hoodies-0.png" alt="Red Hoodie" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-black font-medium text-[11px] sm:text-sm mb-0.5">Brown Hoodies</h4>
                  <p className="text-gray-500 text-[9px] sm:text-[11px] mb-2 sm:mb-3">Heavyweight Cotton</p>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-bold text-xs sm:text-lg">Rs 45</span>
                    <Link href="/product/1" className="bg-black text-white text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-800 transition-colors">
                      View More <ArrowRightIcon className="w-2 h-2 sm:w-3 sm:h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="cat-product-card bg-white rounded-2xl sm:rounded-[1.5rem] p-2.5 sm:p-4 flex flex-col justify-between group">
                <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-[#768285]">
                  <img src="/Brown-hoodies-1.png" alt="Black Hoodie" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-black font-medium text-[11px] sm:text-sm mb-0.5">Brown Hoodies</h4>
                  <p className="text-gray-500 text-[9px] sm:text-[11px] mb-2 sm:mb-3">Heavyweight Cotton</p>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-bold text-xs sm:text-lg">Rs 45</span>
                    <Link href="/product/2" className="bg-black text-white text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-800 transition-colors">
                      View More <ArrowRightIcon className="w-2 h-2 sm:w-3 sm:h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="cat-product-card bg-white rounded-2xl sm:rounded-[1.5rem] p-2.5 sm:p-4 flex flex-col justify-between group">
                <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-[#768285]">
                  <img src="/Brown-hoodies-2.png" alt="Yellow Hoodie" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-black font-medium text-[11px] sm:text-sm mb-0.5">Brown Hoodies</h4>
                  <p className="text-gray-500 text-[9px] sm:text-[11px] mb-2 sm:mb-3">Heavyweight Cotton</p>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-bold text-xs sm:text-lg">Rs 45</span>
                    <Link href="/product/3" className="bg-black text-white text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-800 transition-colors">
                      View More <ArrowRightIcon className="w-2 h-2 sm:w-3 sm:h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="cat-product-card bg-white rounded-2xl sm:rounded-[1.5rem] p-2.5 sm:p-4 flex flex-col justify-between group">
                <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-[#768285]">
                  <img src="/Brown-hoodies-3.png" alt="Beige Hoodie" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-black font-medium text-[11px] sm:text-sm mb-0.5">Brown Hoodies</h4>
                  <p className="text-gray-500 text-[9px] sm:text-[11px] mb-2 sm:mb-3">Heavyweight Cotton</p>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-bold text-xs sm:text-lg">Rs 45</span>
                    <Link href="/product/4" className="bg-black text-white text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-800 transition-colors">
                      View More <ArrowRightIcon className="w-2 h-2 sm:w-3 sm:h-3" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Mobile View More Button (Hidden on Desktop) */}
          <div className="cat-mobile-btn flex md:hidden justify-center mt-8">
            <Link href="/categories" className="bg-black text-white px-10 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
              View More
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================
          INSTAGRAM FEED SECTION (New)
      ========================================= */}
      <section ref={instaRef} className="insta-section w-full bg-white pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col items-center">
          
          <h2 className="insta-anim text-4xl md:text-5xl text-black tracking-tight font-medium mb-8 md:mb-12">
            Follow Us On Instagram
          </h2>

          {/* 4-Column Grid (4 on desktop, 2 on mobile) */}
          <div className="insta-grid w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8 md:mb-10">
            
            {/* Insta Card 1 */}
            <a href="#" className="insta-card group relative w-full aspect-[3/4] overflow-hidden bg-gray-100 block">
              <img 
                src="/instagram-post1.png" 
                alt="Instagram post 1" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Hover Overlay with Icon */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-lg" />
              </div>
            </a>

            {/* Insta Card 2 */}
            <a href="#" className="insta-card group relative w-full aspect-[3/4] overflow-hidden bg-gray-100 block">
              <img 
                src="/instagram-post2.png" 
                alt="Instagram post 2" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-lg" />
              </div>
            </a>

            {/* Insta Card 3 */}
            <a href="#" className="insta-card group relative w-full aspect-[3/4] overflow-hidden bg-gray-100 block">
              <img 
                src="/instagram-post3.png" 
                alt="Instagram post 3" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-lg" />
              </div>
            </a>

            {/* Insta Card 4 */}
            <a href="#" className="insta-card group relative w-full aspect-[3/4] overflow-hidden bg-gray-100 block">
              <img 
                src="/instagram-post4.png" 
                alt="Instagram post 4" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-lg" />
              </div>
            </a>

          </div>

          <a href="#" className="insta-anim bg-black text-white px-12 py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors duration-300">
            Follow us
          </a>

        </div>
      </section>

    </main>
  );
}

// --- SVG Icons ---

function ArrowRightIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}

function ShirtIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46 16 2a24 24 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  );
}

function CapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a8 8 0 0 0-8-8Z"/>
      <path d="M4 11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16"/>
    </svg>
  );
}

function WatchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="6"/>
      <polyline points="12 10 12 12 13 13"/>
      <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"/>
      <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"/>
    </svg>
  );
}

function DressIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2a2 2 0 0 1 4 0v2l3 3-1 2H8l-1-2 3-3V2Z"/>
      <path d="M8 9h8l4 13H4Z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}