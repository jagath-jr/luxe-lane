"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Refs for GSAP animations
  const navRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = () => setIsMenuOpen(false);

  // 1. Scroll Hide/Show Behavior (Standard React)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu if open
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // 2. GSAP Initial Load Animation (Stagger elements in)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1 // Slight delay for a smoother entrance
      });
    }, navRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  // 3. GSAP Mobile Menu Animation (Smooth slide down)
  useEffect(() => {
    if (isMenuOpen) {
      // Slide container down
      gsap.to(menuRef.current, { 
        height: 'auto', 
        duration: 0.4, 
        ease: 'power3.out' 
      });
      // Stagger links fading in
      gsap.fromTo('.mobile-link', 
        { y: -10, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      // Slide container up
      gsap.to(menuRef.current, { 
        height: 0, 
        duration: 0.3, 
        ease: 'power3.inOut' 
      });
    }
  }, [isMenuOpen]);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      
      {/* Left Section: Menu Icon (Mobile), Logo & Nav Links */}
      <div className="flex items-center gap-5 md:gap-10 px-5 md:px-8 py-5">
        
        {/* Hamburger / Close Icon (Mobile Only) */}
        <button 
          aria-label="Toggle Menu" 
          className="md:hidden hover:text-gray-600 transition-colors text-black nav-item"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Placeholder Logo */}
        <Link href="/" onClick={closeMenu} className="block nav-item">
          <div className="w-24 h-10 bg-gray-200"></div>
        </Link>

        {/* Navigation Links (Desktop Only) */}
        <ul className="hidden md:flex items-center gap-8 text-lg text-black">
          <li className="nav-item">
            <Link href="/womens" className="flex items-center gap-1 hover:text-gray-600 transition-colors">
              Women
              <ChevronDown />
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/mens" className="flex items-center gap-1 hover:text-gray-600 transition-colors">
              Men
              <ChevronDown />
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/kids" className="flex items-center gap-1 hover:text-gray-600 transition-colors">
              Kids
              <ChevronDown />
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section: Icons */}
      {/* Grouped as one .nav-item so they fade in together */}
      <div className="absolute right-5 md:right-8 top-5 flex items-center gap-4 md:gap-6 text-black nav-item">
        <button aria-label="Search" className="hover:text-gray-600 transition-colors">
          <SearchIcon />
        </button>
        <Link href="/cart" aria-label="Cart" className="hover:text-gray-600 transition-colors">
          <CartIcon />
        </Link>
        <button aria-label="User Profile" className="hover:text-gray-600 transition-colors">
          <UserIcon />
        </button>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {/* Changed to overflow-hidden and h-0 so GSAP can animate the height */}
      <div 
        ref={menuRef} 
        className="absolute top-full left-0 w-full bg-white shadow-lg border-gray-100 overflow-hidden md:hidden h-0 border-t"
      >
        <div className="py-6 px-5 flex flex-col gap-6">
          <Link href="/womens" onClick={closeMenu} className="mobile-link flex items-center justify-between text-lg text-black hover:text-gray-600">
            Women
            <ChevronDown />
          </Link>
          <div className="mobile-link w-full h-px bg-gray-100"></div> {/* Divider */}
          
          <Link href="/mens" onClick={closeMenu} className="mobile-link flex items-center justify-between text-lg text-black hover:text-gray-600">
            Men
            <ChevronDown />
          </Link>
          <div className="mobile-link w-full h-px bg-gray-100"></div> {/* Divider */}
          
          <Link href="/kids" onClick={closeMenu} className="mobile-link flex items-center justify-between text-lg text-black hover:text-gray-600">
            Kids
            <ChevronDown />
          </Link>
        </div>
      </div>

    </nav>
  );
}

// --- SVG Icon Components ---

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" x2="21" y1="6" y2="6"/>
      <line x1="3" x2="21" y1="12" y2="12"/>
      <line x1="3" x2="21" y1="18" y2="18"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="6" y1="6" y2="18"/>
      <line x1="6" x2="18" y1="6" y2="18"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      <path d="M12 9v6"/>
      <path d="M9 12h6"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}