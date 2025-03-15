import Layout from "@/app/layout";
import HorizontalScroll from "@/components/HorizontalScroll";
import { createClient } from "contentful";

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default async function JournalPage() {
  const fetchData = async () => {
    try {
      const entries = await client.getEntries({ content_type: "journal", order: "fields.order" });

      return entries.items.map((entry) => {
        const images = entry.fields.media || entry.fields.images || [];
        return {
          ...entry,
          images: Array.isArray(images) ? images : [images], // Ensure it's always an array
        };
      });
    } catch (error) {
      console.error("Error fetching Contentful data:", error);
      return [];
    }
  };

  // Fetch the data with ISR (Incremental Static Regeneration)
  const content = await fetchData();

  return <HorizontalScroll content={content} hasIndex={false} />;
}

// ✅ Add ISR by enabling revalidation
export const revalidate = 60; // Regenerates the page every 60 seconds









// import Layout from "@/app/layout";
// import HorizontalScroll from "@/components/HorizontalScroll";
// // import ImageGrid from "@/components/ImageGrid";
// import { createClient } from "contentful";

// // Initialize Contentful client
// const client = createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// });

// export default async function JournalPage() {

//   const fetchData = async () => {
//     try {
//       const entries = await client.getEntries({ content_type: "journal", order: "fields.order" });

//       return entries.items.map((entry) => {
//         const images = entry.fields.media || entry.fields.images || [];
//         return {
//           ...entry,
//           images: Array.isArray(images) ? images : [images], // Ensure it's always an array
//         };
//       });
//     } catch (error) {
//       console.error("Error fetching Contentful data:", error);
//       return [];
//     }
//   };

//   const content = await fetchData(); // Fetch the data

//   return (
     
//         // <ImageGrid content={content} />
//       <HorizontalScroll content={content} hasIndex={false} />
//   )
// }