"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const defaultAccordions = [
  {
    title: "Description",
    content:
      "Elevate your wardrobe with premium craftsmanship and modern tailoring built for daily wear.",
  },
  {
    title: "Material & Dimensions",
    content:
      "Breathable outer layer, soft inner lining, and a true-to-size fit designed for comfort.",
  },
  {
    title: "Wash Care",
    content:
      "Dry clean preferred. If hand-washing, use cold water and dry in shade.",
  },
  {
    title: "Additional Information",
    content:
      "Quality checked before shipping. Reach out to support for size help or bulk inquiries.",
  },
];

export default function ProductPage() {
  const pageRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartNotice, setCartNotice] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".detail-anim", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || "Failed to load products.");
        }

        if (!payload?.data?.length) {
          throw new Error("No products found.");
        }

        setProduct(payload.data[0]);
      } catch (fetchError) {
        setError(fetchError.message || "Something went wrong while loading product data.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleAddToCart = () => {
    if (!product) return;

    const key = "luxe_lane_cart";
    const currentCart = JSON.parse(localStorage.getItem(key) || "[]");
    currentCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      quantity: 1,
    });

    localStorage.setItem(key, JSON.stringify(currentCart));
    setCartNotice(`${product.name} added to cart.`);

    window.setTimeout(() => setCartNotice(""), 2000);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading product...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  const images = product?.images?.length
    ? product.images
    : ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop"];

  const price = Number(product?.price || 0);
  const originalPrice = Number(product?.original_price || price);
  const discount = originalPrice > 0 ? (((originalPrice - price) / originalPrice) * 100).toFixed(1) : 0;

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-white pb-24 pt-4 md:pt-12 text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="gallery-anim w-full lg:w-1/2 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-[#f0f0f0] rounded-[2rem] overflow-hidden relative">
              <img
                src={images[activeImage]}
                alt={product?.name || "Product image"}
                className="w-full h-full object-cover object-top transition-opacity duration-500"
              />
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {images.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(index)}
                  className={`w-full aspect-square bg-[#f0f0f0] rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === index ? "border-black" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="detail-anim text-3xl md:text-5xl font-medium uppercase tracking-tight leading-tight mb-3">
              {product?.name}
            </h1>

            <div className="detail-anim flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex text-black">
                  <StarSolidIcon className="w-4 h-4 md:w-5 md:h-5" />
                  <StarSolidIcon className="w-4 h-4 md:w-5 md:h-5" />
                  <StarSolidIcon className="w-4 h-4 md:w-5 md:h-5" />
                  <StarSolidIcon className="w-4 h-4 md:w-5 md:h-5" />
                  <StarHalfIcon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className="text-xs md:text-sm text-gray-600 font-medium tracking-wide">
                  ({product?.rating || 0} / 5) ({product?.review_count || 0} reviews)
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-500 font-medium tracking-wide uppercase">
                SKU: {product?.sku}
              </p>
            </div>

            <div className="detail-anim flex items-center gap-4 mb-8">
              <span className="text-3xl md:text-4xl font-medium text-[#1c5560]">₹{price.toFixed(2)}</span>
              <span className="text-lg text-gray-400 line-through">₹{originalPrice.toFixed(2)}</span>
              <span className="bg-[#e5e5e5] text-gray-500 text-xs font-bold px-3 py-1.5 rounded-md tracking-wide">
                {discount}% OFF
              </span>
            </div>

            <div className="detail-anim flex flex-col gap-3 mb-8">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1c5560] text-white flex items-center justify-center gap-2 py-3.5 rounded-sm font-semibold hover:bg-[#17464f] transition-colors"
                >
                  <CartIcon className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-14 bg-black text-white flex items-center justify-center rounded-sm hover:bg-gray-800 transition-colors">
                  <HeartIcon className="w-5 h-5" />
                </button>
                <button className="w-14 bg-[#25D366] text-white flex items-center justify-center rounded-sm hover:bg-[#1ebe57] transition-colors">
                  <WhatsAppIcon className="w-6 h-6" />
                </button>
              </div>

              {cartNotice ? <p className="text-sm text-green-700">{cartNotice}</p> : null}

              <button className="w-full bg-black text-white font-medium py-3.5 rounded-sm hover:bg-gray-800 transition-colors text-lg">
                Buy It Now
              </button>
            </div>

            <div className="detail-anim grid grid-cols-3 gap-2 border-y border-gray-200 py-6 mb-8">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <TruckIcon className="w-6 h-6 text-black" />
                <span className="text-[11px] md:text-xs font-medium text-black">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <ShieldCheckIcon className="w-6 h-6 text-black" />
                <span className="text-[11px] md:text-xs font-medium text-black">Quality Approved</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <ShirtIcon className="w-6 h-6 text-black" />
                <span className="text-[11px] md:text-xs font-medium text-black">Premium Materials</span>
              </div>
            </div>

            <div className="detail-anim flex flex-col w-full">
              {defaultAccordions.map((item, index) => (
                <div key={item.title} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full py-5 flex justify-between items-center text-left focus:outline-none hover:text-gray-600 transition-colors"
                  >
                    <span className="text-sm font-semibold text-black tracking-wide">{item.title}</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                        openAccordion === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openAccordion === index ? "max-h-40 opacity-100 mb-5" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.title === "Description" ? product?.description : item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// --- SVG Icons ---

function StarSolidIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
  );
}

function StarHalfIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M12 3.21l2.082 5.006 5.404.434-4.117 3.527 1.257 5.273L12 18.354V3.21Z" opacity="0.3" />
      <path fillRule="evenodd" d="M12 3.21L9.918 8.216l-5.404.434 4.117 3.527-1.257 5.273L12 18.354V3.21Z" />
    </svg>
  );
}

function CartIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2C6.502 2 2 6.502 2 12.031c0 1.942.545 3.821 1.543 5.454L2.235 21.68l3.824-1.168A9.972 9.972 0 0 0 12.031 22c5.529 0 10.031-4.5 10.031-10.031S17.56 2 12.031 2zm5.352 14.542c-.22.617-1.282 1.192-1.782 1.258-.456.06-1.02.164-3.232-.756-2.73-1.134-4.48-4.004-4.618-4.186-.134-.182-1.106-1.468-1.106-2.798s.69-1.99.932-2.3c.243-.31.528-.388.704-.388.176 0 .352.006.506.012.164.006.386-.06.602.464.226.544.646 1.58.704 1.696.058.116.096.252.006.442-.09.19-.134.31-.268.464-.134.154-.282.336-.402.464-.134.14-.278.29-.118.544.16.252.71 1.156 1.488 1.966.996 1.036 1.922 1.354 2.186 1.468.264.116.422.096.58-.09.158-.182.684-.796.866-1.07.182-.274.364-.228.6-.14.238.088 1.498.704 1.756.832.258.128.43.19.492.296.062.106.062.618-.158 1.236z"/>
    </svg>
  );
}

function TruckIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}

function ShirtIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
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
