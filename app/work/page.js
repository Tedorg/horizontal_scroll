import Layout from "@/app/layout";
import { createClient } from "contentful";


import HorizontalScroll from "@/components/HorizontalScroll";
// import WelcomeText from "@/components/WelcomeText";
// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});
export default async function WorkPage() {


  const fetchData = async () => {
    try {
      const entries = await client.getEntries({ content_type: "work", order: "fields.order" });

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

  const content = await fetchData(); // Fetch the data


  return (
  
       <HorizontalScroll content={content} hasIndex={true} />
  )
}