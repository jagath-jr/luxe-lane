"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-container', {
        scrollTrigger: {
          trigger: '.footer-container',
          start: 'top 90%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-white px-4 md:px-8 pb-8 pt-10">
      <div className="footer-container max-w-7xl mx-auto bg-[#f6f6f6] rounded-[2rem] p-8 md:p-12 lg:p-16 flex flex-col gap-8 md:gap-14">
        
        {/* ================================================== */}
        {/* DESKTOP & MOBILE SHARED TOP SECTION (Grid on Desktop) */}
        {/* ================================================== */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-10 lg:gap-16">
          
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl font-bold text-black">Logo</h3>
            <p className="text-[#4a4a4a] leading-relaxed text-sm md:text-base pr-0 md:pr-4">
              The proper Footer on proper time can preserve you protection. We assist you make sureeverybody forward.
            </p>
          </div>

          {/* --- MOBILE ONLY: Navigation Links (Stacks under Description) --- */}
          <ul className="flex md:hidden flex-col items-center gap-4 text-[#2d3748] font-medium text-lg my-2">
            <li><Link href="/womens" className="hover:text-black">Women</Link></li>
            <li><Link href="/mens" className="hover:text-black">Men</Link></li>
            <li><Link href="/kids" className="hover:text-black">Kids</Link></li>
            <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
          </ul>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="text-[17px] font-bold text-black">Contact</h4>
            <ul className="flex flex-col gap-4 text-black text-sm md:text-base font-medium">
              <li className="flex items-start gap-3">
                <LocationIcon className="w-5 h-5 shrink-0 text-black mt-0.5" />
                <span className="font-normal">44 Danwers, NY City, USA, 70-102</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 shrink-0 text-black" />
                <a href="mailto:Lamaro@Lamaroyc.Us" className="font-normal hover:text-gray-600 transition-colors">
                  Lamaro@Lamaroyc.Us
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 shrink-0 text-black" />
                <a href="tel:+91585656658" className="font-normal hover:text-gray-600 transition-colors">
                  91+585-656-658
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="text-[17px] font-bold text-black">Newsletter</h4>
            <form className="relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#414141] text-white placeholder-gray-300 text-sm px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-black transition-all"
                required
              />
              <button 
                type="submit" 
                aria-label="Subscribe"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white hover:text-gray-300 transition-colors"
              >
                <NewsletterIcon className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        {/* ================================================== */}
        {/* MOBILE ONLY: Bottom Elements (Centered) */}
        {/* ================================================== */}
        
        {/* Mobile Socials */}
        <div className="flex md:hidden justify-center items-center gap-4 mt-6">
          <SocialLinks />
        </div>

        {/* Mobile Divider */}
        <hr className="border-gray-300 w-10/12 mx-auto md:hidden my-4" />

        {/* Mobile Copyright & Legal */}
        <div className="flex md:hidden flex-col items-center gap-3 text-sm text-[#333] font-medium">
          <p className="mb-2">© 2023 All rights reserved</p>
          <Link href="/terms" className="hover:text-black">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
        </div>


        {/* ================================================== */}
        {/* DESKTOP ONLY: Middle & Bottom Elements (Split Rows) */}
        {/* ================================================== */}

        {/* Desktop Navigation & Socials */}
        <div className="hidden md:flex flex-row justify-between items-center gap-8 mt-4">
          <ul className="flex items-center gap-8 text-[#1a1f2c] font-medium text-base">
            <li><Link href="/womens" className="hover:text-black transition-colors">Women</Link></li>
            <li><Link href="/mens" className="hover:text-black transition-colors">Men</Link></li>
            <li><Link href="/kids" className="hover:text-black transition-colors">Kids</Link></li>
            <li><Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
          </ul>
          <div className="flex items-center gap-4">
            <SocialLinks />
          </div>
        </div>

        {/* Desktop Full Divider */}
        <hr className="hidden md:block border-gray-300 w-full" />

        {/* Desktop Copyright & Legal */}
        <div className="hidden md:flex flex-row justify-between items-center gap-4 text-sm text-[#4a4a4a] font-medium">
          <p>© 2023 All rights reserved</p>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

// --- Shared Components for dry code ---

function SocialLinks() {
  return (
    <>
      <a href="#" aria-label="Facebook" className="w-[38px] h-[38px] bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
        <FacebookIcon />
      </a>
      <a href="#" aria-label="Twitter" className="w-[38px] h-[38px] bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
        <TwitterIcon />
      </a>
      <a href="#" aria-label="Instagram" className="w-[38px] h-[38px] bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
        <InstaIcon />
      </a>
      
    </>
  );
}

// --- SVG Icon Components ---

function LocationIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function NewsletterIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}

function InstaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.16 1 12 1 12s0 3.84.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.84 23 12 23 12s0-3.84-.46-5.58z"/>
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  );
}