"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/ExpandableText.module.css";


export default function ExpandableTextBlock({ text,title }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textBlockRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textBlockRef.current) {
        const isOverflow = textBlockRef.current.scrollHeight-10 > (textBlockRef.current.clientHeight+1);
        if(isOverflow){
          setIsOverflowing(true)
        }
        else{
          setIsOverflowing(false)
          setIsExpanded(false);

        }
       
      }
    };

    checkOverflow(); // Initial check
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [title,text]);

  const toggleExpand = () => {
    if(isOverflowing)setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={textBlockRef}
      className={`${styles.textBlock} ${isExpanded ? styles.expanded : ""}`} onClick={toggleExpand}
    >
      <p>{title} {text}</p>
      {isOverflowing && !isExpanded && (
        <button className={styles.expandButton} >
          ▼
        </button>
      )}
      {isExpanded && (
        <button className={styles.expandButton} >
          ▲
        </button>
      )}
    </div>
  );
}