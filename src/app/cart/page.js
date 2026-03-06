"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function CartPage() {
  const pageRef = useRef(null);

  // --- State: Cart Items ---
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "MODERN CLASSIC JACKET",
      description: "Modern Jacket premium color with classic material",
      price: 2499,
      originalPrice: 3500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "MODERN CLASSIC JACKET",
      description: "Modern Jacket premium color with classic material",
      price: 2499,
      originalPrice: 3500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop&sig=1"
    }
  ]);

  const [couponCode, setCouponCode] = useState("");

  // --- Entrance Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header-anim', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' });
      
      gsap.from('.cart-item-anim', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.summary-anim', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // --- Cart Functionality ---
  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }; // Prevent going below 1
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // --- Derived Calculations ---
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const mrpTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const sellingTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = mrpTotal - sellingTotal;
  const deliveryFee = 0; // Free shipping as per mockup
  const finalTotal = sellingTotal + deliveryFee;

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-white pb-24 pt-8 md:pt-12 text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <h1 className="header-anim text-3xl md:text-4xl lg:text-[2.5rem] font-medium tracking-tight mb-8 md:mb-12">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#f9f9f9] rounded-2xl summary-anim">
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <Link href="/womens" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            
            {/* ==========================================
                LEFT: CART ITEMS LIST
            ========================================== */}
            <div className="flex-1 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-anim flex flex-col sm:flex-row gap-4 md:gap-6 p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow bg-white">
                  
                  {/* Product Image */}
                  <div className="w-full sm:w-32 md:w-40 aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details Area */}
                  <div className="flex flex-1 justify-between flex-col sm:flex-row py-1">
                    
                    {/* Left/Top Content: Info & Qty */}
                    <div className="flex flex-col justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="text-sm md:text-base font-bold tracking-wide uppercase text-black mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[11px] md:text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center bg-[#e5e5e5] rounded-md w-max mt-auto">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-300 rounded-l-md transition"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-300 rounded-r-md transition"
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right/Bottom Content: Price & Remove */}
                    <div className="flex flex-row sm:flex-col justify-between sm:justify-between items-center sm:items-end mt-4 sm:mt-0">
                      <span className="text-lg md:text-xl font-bold text-black">
                        ₹ {item.price}
                      </span>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1.5 text-xs text-black font-medium hover:text-red-600 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                        Remove
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* ==========================================
                RIGHT: ORDER SUMMARY
            ========================================== */}
            <div className="summary-anim w-full lg:w-[400px] shrink-0">
              <div className="bg-[#f8f9fb] rounded-2xl p-6 md:p-8">
                
                <h2 className="text-2xl md:text-[28px] font-bold tracking-tight mb-8">
                  Order Summary
                </h2>

                {/* Line Items */}
                <div className="flex flex-col gap-4 text-sm md:text-base text-gray-800 border-b border-gray-200 pb-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span>Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''} ):</span>
                    <span className="font-bold text-black">₹{mrpTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery Fee:</span>
                    <span className="font-bold text-black">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Product Discounts:</span>
                    <span className="font-bold text-black">-₹{totalDiscount.toFixed(0)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg md:text-xl font-bold text-black">Order Total</span>
                  <span className="text-xl md:text-[22px] font-bold text-black">₹{finalTotal.toFixed(2)}</span>
                </div>

                {/* Coupon Code Section */}
                <div className="mb-6">
                  <span className="text-sm text-black mb-2 block">Have a coupon?</span>
                  <div className="flex items-center h-11 border border-gray-200 bg-white rounded-md overflow-hidden">
                    <input 
                      type="text" 
                      placeholder="Enter or select a coupon" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 h-full px-3 text-sm outline-none placeholder-gray-400 uppercase"
                    />
                    <button className="h-full px-3 text-gray-400 hover:text-black border-l border-gray-100 bg-gray-50 flex items-center justify-center">
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>
                    <button 
                      className={`h-full px-6 text-sm font-medium transition-colors ${
                        couponCode.length > 0 ? 'bg-black text-white' : 'bg-[#d5dbe0] text-white'
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Shipping Notice */}
                <div className="text-[10px] text-gray-400 mb-8 leading-relaxed">
                  Free Shipping Inside Kerala.<br/>
                  Delivery Charge will be applicable outside kerala starts at Rs.200
                </div>

                {/* Buy Button */}
                <button className="w-full bg-black text-white font-bold text-lg py-4 rounded-[0.5rem] hover:bg-gray-800 transition-colors mb-4">
                  Buy Now
                </button>

                {/* Policy Notice */}
                <p className="text-[9px] text-gray-400 text-center mx-auto max-w-[250px]">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// --- SVG Icons ---

function MinusIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function TrashIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}