"use client";
import { useState } from "react";
import HorizontalScroll from "@/components/HorizontalScroll";
import GridView from "@/components/GridView";


export default async function JournalPageClient({ content }) {
    const [isGridView, setIsGridView] = useState(false); // Toggle view mode


    return (
        <div>
          {/* Toggle Button */}
          <button onClick={() => setIsGridView(!isGridView)} className="toggleViewButton">
            {isGridView ? "📜 Scroll View" : "🔲 Grid View"}
          </button>
    
          {/* Conditional Rendering */}
          {isGridView ? <GridView content={content} /> : <HorizontalScroll content={content} hasIndex={false} />}
        </div>
      );
    }