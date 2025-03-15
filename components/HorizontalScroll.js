"use client";
import { gsap } from "gsap";
import React, { useEffect, useState, useRef } from "react";
import ImageBlock from "@/components/ImageBlock";

import ExpandableText from "@/components/ExpandableText";
import styles from "@/styles/HorizontalScroll.module.css";

export default function HorizontalScroll({ content, hasIndex }) {
  const [isGridView, setIsGridView] = useState(false); // Toggle view mode
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainer = useRef(null);
  let isScrolling = false; // Flag to manage scroll events and avoid jittering
  // Detect Screen Size for Mobile/Desktop Behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Horizontal Scrolling for Desktop
  useEffect(() => {
    if (!isMobile && scrollContainer.current) {
      const container = scrollContainer.current;

      const handleScroll = (event) => {
        event.preventDefault();

        const scrollAmountX = event.deltaX;
        const scrollAmountY = event.deltaY;
        const scrollAmount = scrollAmountY + scrollAmountX; // Prioritize horizontal scroll

        gsap.to(container, {
          scrollLeft: container.scrollLeft + scrollAmount * 5.5, // Adjust scroll multiplier as needed
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            isScrolling = false; // Reset scroll flag
          },
        });
      };

      container.addEventListener("wheel", handleScroll, { passive: false });
      return () => container.removeEventListener("wheel", handleScroll);
    }
  }, [isMobile]);

  return (
    <div>
      <div ref={scrollContainer} className={styles.scrollWrapper}>
        {content.map((item, entryIndex) => {
  
          // Determine margin_right based on hasIndex
          let margin_right = 0;
          if (hasIndex) {
            margin_right = item.fields.margin || 40;
          }
          console.log(margin_right)
  
          if (Array.isArray(item.images)) {
            return item.images.map((image, imgIndex) => (
              <div 
                key={`${entryIndex}-${imgIndex}`} 
                className={styles.contentBlock} 
                style={{ margin: `0 ${margin_right}px 0 0` }}
              >
                <ImageBlock item={image} index={`${entryIndex + 1}-${imgIndex + 1}`} />
                {imgIndex === 0 && hasIndex && (
                  // <ExpandableText text={item.fields.text} title={`${item.fields.title} #${imgIndex + 1}`} />
                  <ExpandableText text={item.fields.text} title={`${item.fields.title} `} />

                )}
                {imgIndex > 0 && hasIndex && (
                  // <ExpandableText text={`#${imgIndex + 1}`} title={item.fields.title} />
                  <ExpandableText text="" title={item.fields.title} />

                )}
                {!hasIndex && <ExpandableText text={item.fields.text} title={item.fields.title} />}
              </div>
            ));
          } else {
            // If item.images is not an array, directly pass item to ImageBlock
            return (
              <div 
                key={entryIndex} 
                className={styles.contentBlock} 
                style={{ margin: `0 ${margin_right}px 0 0` }}
              >
                <ImageBlock item={item} index={entryIndex + 1} />
                {!hasIndex && <ExpandableText text={item.fields.text} title={item.fields.title} />}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}