"use client"; // Ensures it runs on the client-side

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "contentful";

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Create Context
const ContentContext = createContext();

// Provider Component
export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [infoContent, setInfoContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const menuData = await client.getContentTypes(); // Fetch content types for the menu
        const infoData = await client.getEntries({ content_type: "info" }); // Fetch Info page data

        setContent(menuData.items);
        setInfoContent(infoData.items[0]?.fields); // Assuming you need the first item
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, infoContent }}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom Hook for Accessing Context
export const useContent = () => useContext(ContentContext);