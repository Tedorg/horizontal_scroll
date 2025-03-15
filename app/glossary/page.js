"use client"; 

import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { gsap } from "gsap";
import styles from "@/styles/glossary.module.css";

// Contentful Client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function InfoGrid({ contentType }) {
  const [content, setContent] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track expanded items

  // Fetch Contentful Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const entries = await client.getEntries({ content_type: 'glossary'});
        if (entries.items.length > 0) {
          const rawText = entries.items[0].fields.entries;
          const sections = parseText(rawText);
          setContent(sections);
        }
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };
    fetchData();
  }, [contentType]);

  // Function to Parse Text into Sections (Headings + Text)
  const parseText = (text) => {
    const lines = text.split("\n");
    let sections = [];
    let currentSection = null;

    lines.forEach((line) => {
     
      if (line.startsWith("###")) {
        if (currentSection) sections.push(currentSection);
        currentSection = { index: "", title: line.replace(/^\#+|"+$/g, '').trim(), content: "" };
      } else if (currentSection) {
        currentSection.content += line + " ";
      }
     
    });

    if (currentSection) sections.push(currentSection);
    return sections;
  };

  // Handle Expand/Collapse Animation
  // const toggleExpand = (index) => {
  //   setExpanded((prev) => {
  //     const newState = { ...prev, [index]: !prev[index] };

  //     // Animate expansion with GSAP
  //     gsap.to(`#content-${index}`, {
  //       height: newState[index] ? 0 : "auto",
  //       opacity: newState[index] ? 0 : 1,
  //       duration: 0.1,
  //       ease: "power2.out",
  //     });

  //     return newState;
  //   });
  // };

  return (
    <div className={styles.grid}>
      {content.map((section, index) => (
        <div key={index} className={styles.item}>
         

          <div id={`content-${index}`} className={`${styles.textBlock} `}>
          <h2 className={styles.heading}>
            {section.title}
          </h2>
            <p>  {section.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}