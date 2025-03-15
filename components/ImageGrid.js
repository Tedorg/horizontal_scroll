"use client"

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "@/styles/ImageGrid.module.css"

const ImageGrid = ({ content }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedImage) {
      gsap.to(overlayRef.current, { opacity: 1, visibility: "visible", duration: 0.5 });
      gsap.fromTo(contentRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, visibility: "hidden", duration: 0.5 });
    }
  }, [selectedImage]);

  return (
    <div className="image-grid">
      {content.map((item, entryIndex) => (
        
        (item.images || [item.image]).map((img, imgIndex) => (
          <div key={`${entryIndex}-${imgIndex}`} className="grid-item" onClick={() => setSelectedImage(item)}>
            <img src={img.url} alt={item.title} className="grid-image" />
            <div className="image-title">{item.title}</div>
          </div>
        ))
      ))}

      {selectedImage && (
        <div className="overlay" ref={overlayRef} onClick={() => setSelectedImage(null)}>
          <div className="overlay-content" ref={contentRef}>
            <img src={selectedImage.image?.url || selectedImage.images[0]?.url} alt={selectedImage.title} className="full-image" />
            <div className="image-text">{selectedImage.text}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
