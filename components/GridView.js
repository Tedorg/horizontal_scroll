"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/GridView.module.css"; // CSS for styling

export default function GridView({ content }) {
  const [expandedImage, setExpandedImage] = useState(null); // Track the expanded image

  const handleExpand = (image) => {
    setExpandedImage(image);
  };

  const handleClose = () => {
    setExpandedImage(null);
  };

  return (
    <div className={styles.gridContainer}>
      {content.map((item, index) => (
        <div key={index} className={styles.gridItem} onClick={() => handleExpand(item)}>
          <Image
            src={`https:${item.fields.file.url}`}
            alt={item.fields.title}
            width={item.fields.file.details.image.width}
            height={item.fields.file.details.image.height}
            className={styles.gridImage}
          />
          <p className={styles.imageText}>{item.fields.title}</p>
        </div>
      ))}

      {/* Expanded Image Overlay */}
      {expandedImage && (
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={`https:${expandedImage.fields.file.url}`}
              alt={expandedImage.fields.title}
              width={expandedImage.fields.file.details.image.width}
              height={expandedImage.fields.file.details.image.height}
              className={styles.expandedImage}
            />
            <p className={styles.expandedTitle}>{expandedImage.fields.title}</p>
            <p className={styles.expandedText}>{expandedImage.fields.text}</p>
            <button onClick={handleClose} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}