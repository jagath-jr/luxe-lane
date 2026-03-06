"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContactPage() {
  const pageRef = useRef(null);

  // --- Entrance Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade down the main title
      gsap.from('.contact-header', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Stagger fade up the two cards
      gsap.from('.contact-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-[#fafafa] pb-24 pt-12 md:pt-20 text-black">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Page Title */}
        <h1 className="contact-header text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-center mb-12 md:mb-16 tracking-tight">
          Contact Us
        </h1>

        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          
          {/* =======================
              LEFT CARD: FORM
          ======================= */}
          <div className="contact-card flex-1 bg-white p-8 md:p-10 lg:p-12 rounded-[1rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <h2 className="text-2xl font-semibold mb-8 tracking-tight">Send us a message</h2>
            
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3.5 rounded-md border border-gray-200 outline-none focus:border-black placeholder-gray-400 text-sm transition-colors"
                required
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-3.5 rounded-md border border-gray-200 outline-none focus:border-black placeholder-gray-400 text-sm transition-colors"
                required
              />
              <input 
                type="tel" 
                placeholder="Your Phone" 
                className="w-full px-4 py-3.5 rounded-md border border-gray-200 outline-none focus:border-black placeholder-gray-400 text-sm transition-colors"
              />
              <textarea 
                placeholder="Your Query" 
                rows="5"
                className="w-full px-4 py-3.5 rounded-md border border-gray-200 outline-none focus:border-black placeholder-gray-400 text-sm transition-colors resize-none"
                required
              ></textarea>
              
              <button 
                type="submit" 
                className="w-full mt-2 bg-black text-white font-medium py-3.5 rounded-sm hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* =======================
              RIGHT CARD: INFO
          ======================= */}
          <div className="contact-card flex-1 bg-white p-8 md:p-10 lg:p-12 rounded-[1rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <h2 className="text-2xl font-semibold mb-10 tracking-tight">Contact Information</h2>
            
            <div className="flex flex-col gap-8">
              
              {/* Phone Info */}
              <div className="flex items-start gap-5">
                <PhoneIcon className="w-6 h-6 mt-1 shrink-0 text-black" />
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-[17px]">Phone</h4>
                  <a href="tel:+919035287469" className="text-[15px] text-gray-700 hover:text-black transition-colors">+91 9035287469</a>
                  <a href="tel:+918589965565" className="text-[15px] text-gray-700 hover:text-black transition-colors">+91 8589965565</a>
                </div>
              </div>

              {/* Email Info */}
              <div className="flex items-start gap-5">
                <EmailIcon className="w-6 h-6 mt-1 shrink-0 text-black" />
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-[17px]">Email</h4>
                  <a href="mailto:enquiries@companyname.com" className="text-[15px] text-gray-700 hover:text-black transition-colors">
                    enquiries@companyname.com
                  </a>
                </div>
              </div>

              {/* Location Info */}
              <div className="flex items-start gap-5">
                <LocationIcon className="w-6 h-6 mt-1 shrink-0 text-black" />
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-[17px]">Location</h4>
                  <p className="text-[15px] text-gray-700 leading-relaxed">
                    Edappally, KOCHI, KERALA, 670631
                  </p>
                </div>
              </div>

              {/* Business Hours Info */}
              <div className="flex items-start gap-5">
                <ClockIcon className="w-6 h-6 mt-1 shrink-0 text-black" />
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-[17px]">Business Hours</h4>
                  <p className="text-[15px] text-gray-700">Monday - Saturday: 10AM - 5PM</p>
                  <p className="text-[15px] text-gray-700">Sunday: Closed</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- SVG Icons ---

function PhoneIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
    </svg>
  );
}

function EmailIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}

function LocationIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  );
}