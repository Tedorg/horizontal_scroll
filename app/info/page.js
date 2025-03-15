"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/styles/info.module.css";

// Contentful Client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function InfoGrid({ contentType }) {
  const [content, setContent] = useState([]);

  // Fetch Contentful Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const entries = await client.getEntries({ content_type: "info" });
        if (entries.items.length > 0) {
          const rawText = entries.items[0].fields.text;
          const sections = parseText(rawText);
          setContent(sections);
        }
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };
    fetchData();
  }, [contentType]);

  // Function to Parse Text into Sections (Headings + Corresponding Text)
  const parseText = (text) => {
    const lines = text.split("\n");
    let sections = [];
    let currentSection = null;

    lines.forEach((line) => {
      if (line.startsWith("#")) {
        if (currentSection) sections.push(currentSection);
        currentSection = { 
          title: line.replace(/^#+|"+$/g, "").trim(), 
          content: "" 
        };
      } else if (currentSection) {
        currentSection.content += line + "\n";
      }
    });

    if (currentSection) sections.push(currentSection);

   
  

    return sections;
  };

  return (
    <div className={styles.grid}>
      {content.map((section, index) => (
        <div key={index} className={styles.item}>
          {/* Section Title */}
          <h2 className={styles.heading}>{section.title}</h2>

          {/* Markdown Formatted Text */}
          <div className={styles.textBlock}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {section.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}