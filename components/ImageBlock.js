"use client"; // Ensures this runs on the client side

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/ImageBlock.module.css";

// **Helper Function: Convert Image URL to Base64**
const toBase64 = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return `data:image/webp;base64,${Buffer.from(buffer).toString("base64")}`;
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    return "data:image/gif;base64,R0lGODlhAQABAPAAAP8AAP///yH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="; // 1x1px transparent fallback
  }
};

export default function ImageBlock({ item, index }) {
  const [isMobile, setIsMobile] = useState(false);
  const [base64Placeholder, setBase64Placeholder] = useState(
    "data:image/gif;base64,R0lGODlhAQABAPAAAP8AAP///yH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" // Default tiny transparent image
  );
  const [isLoaded, setIsLoaded] = useState(false); // Tracks when full image loads

  const imageUrl = `https:${item.fields.file.url}`; // Contentful Image URL
  const altText = item.fields.title; // Image title
  const width = item.fields.file.details.image.width; // Image width
  const height = item.fields.file.details.image.height; // Image height

  // Optimized WebP image
  const optimizedSrc = `${imageUrl}?w=2000&fm=webp&q=95`;

  // Low-resolution image for Base64 encoding
  const placeholderUrl = `${imageUrl}?w=20&h=20&fm=webp&q=5`;

  useEffect(() => {
    // Determine mobile view
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Fetch Base64 placeholder asynchronously
    const fetchPlaceholder = async () => {
      const base64 = await toBase64(placeholderUrl);
      setBase64Placeholder(base64);
    };

    fetchPlaceholder();

    return () => window.removeEventListener("resize", handleResize);
  }, [placeholderUrl]);

  // Hide overlay when image is fully loaded
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={styles.imageContainer}  >
      {/* Overlay that fades out when the full image is loaded */}
      <div className={`${styles.imageOverlay} ${isLoaded ? styles.hidden : ""}`} />

      <Image
        src={optimizedSrc}
        alt={altText}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 80vw"
        quality={100}
        className={styles.image}
        placeholder="blur"
        blurDataURL={base64Placeholder} // Always have a valid base64
        onLoad={handleImageLoad} // Hide overlay when full image loads
      />
    </div>
  );
}