"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useContent } from "@/context/ContentContext";
import styles from "@/styles/Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname(); // ✅ Get current route

  const predefinedOrder = ["work","journal"]; // Define your custom order

  

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);

    const tl = gsap.timeline();
    
    if (!menuOpen) {
      // Open Animation
      tl.to(`.${styles.menuText}`, { y: "-100%", opacity: 0, duration: 0.3, ease: "back.in" })
        .to(`.${styles.closeText}`, { y: "0%", opacity: 1, duration: 0.3, ease: "back.in" }, "-=0.2")
        .to(`.${styles.overlayMenu}`, { y: "0%", duration: 0.1, ease: "power2.out" }, "-=0.1")
        .to(`.${styles.active}`, { scale: 1.1, duration: 0.2, ease: "power1.out" }, "-=0.1");
        
    } else {
      // Close Animation
      tl.to(`.${styles.closeText}`, { y: "+100%", opacity: 0, duration: 0.3, ease: "back.in" })
        .to(`.${styles.menuText}`, { y: "0%", opacity: 1, duration: 0.3, ease: "back.in" }, "-=0.2")
        .to(`.${styles.overlayMenu}`, { y: "-100%", duration: 0.1, ease: "back.in" }, "-=0.1");
    }
  };

  const { content, infoContent } = useContent(); // Get menu content from context
  const sortedContent = content
    ?.slice() // Clone the array to avoid mutating original data
    .sort((a, b) => {
      const indexA = predefinedOrder.indexOf(a.sys.id.toLowerCase());
      const indexB = predefinedOrder.indexOf(b.sys.id.toLowerCase());
  
      return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    });

  return (
    <>
    
   
      <header className={styles.header} onClick={handleMenuToggle}>
        <div className={styles.headerIcon}>
          <svg version="1.1" width="34" height="34" viewBox="0 0 34.8 34.8">
            <path d="M17.4.4C8,.4.4,8,.4,17.4s7.6,17,17,17,17-7.6,17-17S26.8.4,17.4.4ZM17.4,33.7c-9,0-16.3-7.3-16.3-16.3S8.4,1.1,17.4,1.1s16.3,7.3,16.3,16.3-7.3,16.3-16.3,16.3Z"/>
            <path d="M18,16.8l4-9.8h-.8l-1.3,3.2h-4.8l-1.3-3.2h-.8l3.9,9.8h1ZM19.6,10.9l-2.1,5.2-2.1-5.2h4.2Z" />
            <path d="M17.9,24.3l4.3-2.6v-.8l-4.3,2.6c-.1-1.1-.8-2.6-2.7-2.6s-2.7,1.7-2.7,3.1v2.9h9.7v-.7h-4.3v-1.9ZM17.2,26.2h-4v-2.1c0-.6.1-2.4,2-2.4s2,1.9,2,2.3v2.3Z" />
          </svg>
        </div>

        {!isMobile && (
          <nav className={styles.desktopNav}>
            <ul>
              {sortedContent?.map((item, index) => {
               
                const isActive = pathname === `/${item.sys.id.toLowerCase()}`;
                return (
                  <li key={index}>
                    <Link href={`/${item.sys.id.toLowerCase()}`} className={isActive ? styles.active : ""}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <div className={styles.menuIcon} >
            <p className={`${styles.menuText} ${menuOpen ? styles.hidden : ""}`}>Menu</p>
            <p className={`${styles.closeText} ${!menuOpen ? styles.hidden : ""}`}>Close</p>
          </div>
        )}
      </header>

      {/* Mobile Slide-Down Menu */}
      {isMobile && (
        <div className={`${styles.overlayMenu} ${menuOpen ? styles.open : ""}`}>
          <div className={styles.overlayTextFrame}>
            <div className={styles.overlayText_menuItems}>
              {content?.map((item, index) => (
                <p key={index}>
                  <Link href={`/${item.sys.id.toLowerCase()}`} onClick={handleMenuToggle}>
                    {item.name}
                  </Link>
                </p>
              ))}
            </div>
            <div className={styles.overlayText_info}>
              <p>{infoContent ? infoContent.welcomeText : ""}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;