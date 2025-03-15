"use client";

import { useState, useEffect, useRef } from "react";

import "./globals.css";
import InquiryButton from "@/components/InquiryButton";

import { ContentProvider } from "@/context/ContentContext"; // Import the context provider

import Header from "@/components/Header";
import Loading from "@/components/Loading"; // Keep the loading screen


export default function Layout({ children }) {
  const scrollContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = (event) => {
      if (!scrollContainer.current) return;
      if (window.innerWidth <= 768) return; // Allow normal scrolling on mobile

      event.preventDefault();
      const scrollAmount = event.deltaY || event.deltaX;

      gsap.to(scrollContainer.current, {
        scrollLeft: scrollContainer.current.scrollLeft + scrollAmount * 5.5,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer); // Clean up timeout

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <html lang="en">
    <head>
<title>Andrea Rueeger Urushi</title>
 <meta name="description" content="Urushicraft, crafted in Switzerland, handmade by Andrea Rüeger. Furniture handmade by Andrea Rüeger." />
 <meta name="keywords" content="Urushiwork, Handcrafted Urushiware made in Switzerland. Urushi, Urushilacquer, Japaneselacquer, Lacquerware, Handcraft, Artisan, Handmadefurniture, Kanna, Kiridashi, Wood, Woodturning, Maki, Fushimi, Fushimi Urushi Kobo, Tomohiro Sato, Urushi Spoons, Japan, Andrea Rueeger, Andrea Rüeger, Rüeger" />
 <meta name="revisit-after" content="7 days" />
 <link rel="icon" href="/favicon.ico" />
 <meta name="author" content="Andrea Rüeger" />
</head>

      
      <body>
      {isLoading && <Loading />} {/* Show loading screen */}
      {!isLoading && (
         <ContentProvider> {/* Wrap the whole app with the provider */}
          <Header />
          <main ref={scrollContainer}>{children}</main>
          <InquiryButton /> {/* Floating Inquiry Button */}
          </ContentProvider>
      )}
      </body>
      </html>
  );
}