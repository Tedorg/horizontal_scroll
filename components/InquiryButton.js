"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import styles from "@/styles/InquiryButton.module.css";
import { ShoppingCart, X} from "lucide-react"; // You can replace this with any icon

export default function InquiryButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const closeRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (buttonRef.current && textRef.current) {
      if (isExpanded) {
        gsap.to(buttonRef.current, { width: "auto", paddingRight: "15px", duration: 0.3, ease: "power2.out" });
        gsap.to(textRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(closeRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
      } else {
        gsap.to(buttonRef.current, { width: "40px", paddingRight: "0px", duration: 0.3, ease: "power2.in" });
        gsap.to(textRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
        gsap.to(closeRef.current, { opacity: 0, duration: 0.1, ease: "power2.in" });
      }
    }
  }, [isExpanded]);

  return (
    <div ref={buttonRef} className={`${styles.inquiryButton} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.icon} onClick={toggleExpand}>
        <ShoppingCart size={20} />
      </div>
      <span ref={textRef} className={styles.text}>
        For inquiries, please <Link href="/info">contact me</Link>
      </span>
      {isExpanded && (
        <div ref={closeRef} className={styles.closeButton} onClick={toggleExpand}>
          <X size={15} />
        </div>
      )}
    </div>
  );
}