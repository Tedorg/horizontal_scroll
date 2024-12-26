"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { createClient } from "contentful";
import { gsap } from "gsap";
import styles from "../../styles/styles.module.css"; // Import styles

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function HorizontalScrolling() {
  const [content, setContent] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainer = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch Contentful Data
  useEffect(() => {
    const fetchData = async () => {
      const entries = await client
        .getEntries({ content_type: "journal" })
        .then((entries) => {
          setContent(entries.items);
          console.log(entries);
        });
    };
    fetchData();
  }, []);

  // Detect Screen Size for Mobile/Desktop Behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
    };
    handleResize(); // Initial detection
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Horizontal Scrolling for Desktop
  useEffect(() => {
    if (!isMobile && scrollContainer.current) {
      const container = scrollContainer.current;
  
      const handleScroll = (event) => {
        event.preventDefault();
        const scrollAmount = event.deltaY || event.deltaX; // Combine vertical & horizontal inputs
  
        // Use GSAP ScrollToPlugin to scroll horizontally
        gsap.to(container, {
          scrollLeft: container.scrollLeft + scrollAmount*6.5, // Correct property for horizontal scrolling
          duration: .8,
          ease: "power2.out",
        });
      };
  
      container.addEventListener("wheel", handleScroll, { passive: false });
      return () => container.removeEventListener("wheel", handleScroll);
    }
  }, [isMobile]);

  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        <nav>
          <ul>
            <li>Home</li>
            <li>Gallery</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <div ref={scrollContainer} className={`${styles.scrollWrapper} ${isMobile ? styles.verticalScroll : ""}`}>
  {content.map((item, index) => (
    <div key={index} className={styles.imageBlock}>
      <Image
                 src={`https:${item.fields.images.fields.file.url}`} // Add https: to ensure absolute URL
                 alt={item.fields.images.fields.title}
                 layout="responsive"
                 width={item.fields.images.fields.file.details.image.width}
                 height={item.fields.images.fields.file.details.image.height} // Replace with your preferred height
                 className={`${styles.image} ${isLoaded ? styles.loaded : ""}`}
            onLoadingComplete={() => setIsLoaded(true)}
            placeholder="blur"
            blurDataURL={rgbDataURL(237, 181, 6)}
              />
      <div className={styles.imageText}>{item.fields.title}</div>
    </div>
  ))}
</div>
    </div>
  );
}












// "use client"; // Required for client-side rendering in the App Router


// import React, { useEffect, useState } from "react";
// import { createClient } from "contentful";
// import styles from "../../styles/styles.css";

// const client = createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// });

// export default function HomePage() {
//   const [content, setContent] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     // Detect screen size
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const entries = await client.getEntries({ content_type: "journal" })
//         .then((entries) => {
//           setContent(entries.items);
//           console.log(entries);
//         })
//       } catch (error) {
//         console.error("Error fetching contentful data:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <header className={styles.navbar}>
//         <nav>
//           <ul>
//             <li>Home</li>
//             <li>Gallery</li>
//             <li>About</li>
//           </ul>
//         </nav>
//       </header>
//       <div className={styles.scrollWrapper}>
//         {content.map((item, index) => (
          
//           <div key={index} className={styles.imageBlock}>
//             <picture>
//               {/* Use AVIF for mobile if supported */}
//               {isMobile && (
//                 <source
//                   srcSet={`${item.fields.images.fields.file.url}?fm=avif`}
//                   type="image/avif"
//                 />
//               )}
//               {/* Use WebP for desktop */}
//               {!isMobile && (
//                 <source
//                   srcSet={`${item.fields.images.fields.file.url}?fm=webp`}
//                   type="image/webp"
//                 />
//               )}
//               {/* Fallback to original image */}
//               <img
//                 src={item.fields.images.fields.file.url}
//                 alt={item.fields.images.fields.title}
//                 className={styles.image}
//               />
//             </picture>
//             <div className={styles.imageText}>{item.fields.title}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }














// import { createClient } from "contentful";
// import React, { useEffect, useState } from "react";
// import styles from "../../styles/styles.css";

// const client = createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// });

// export default function HomePage() {
//   const [content, setContent] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const entries = await client.getEntries({ content_type: "journal" }).then(e => setContent(e.items))
        
//       } catch (error) {
//         console.error("Error fetching contentful data:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <header className={styles.navbar}>
//         <nav>
//           <ul>
//             <li>Home</li>
//             <li>Gallery</li>
//             <li>About</li>
//           </ul>
//         </nav>
//       </header>
//       <div className={styles.scrollWrapper}>
//         {content.map((item, index) => (
//           <div key={index} className={styles.imageBlock}>
//             <img
//               src={item.fields.images.fields.file.url}
              
              
//             />
//             <div className={styles.imageText}>{item.fields.title}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





// "use client"; // Needed for client-side interaction in Next.js App Router

// import React, { useEffect, useRef } from "react";
// import styles from "../../styles/Home.module.css";
// const images = [
//   { src: "/images/image1.jpg", text: "Image 1 Description" },
//   { src: "/images/image2.jpg", text: "Image 2 Description" },
//   { src: "/images/image3.jpg", text: "Image 3 Description" },
//   { src: "/images/image4.jpg", text: "Image 4 Description" },
// ];

// export default function HomePage() {
//   const scrollContainer = useRef(null);

//   useEffect(() => {
//     const handleScroll = (event) => {
//       if (scrollContainer.current) {
//         event.preventDefault(); // Prevent default scrolling
//         const scrollSpeedMultiplier = 2; // Adjust this value for desired speed
//         if (Math.abs(event.deltaX) > 0) {
//           // Horizontal scroll
//           scrollContainer.current.scrollLeft += event.deltaX * scrollSpeedMultiplier;
//         } else if (Math.abs(event.deltaY) > 0) {
//           // Vertical scroll (translate to horizontal)
//           scrollContainer.current.scrollLeft += event.deltaY;
//         }
//       }
//     };

//     const container = scrollContainer.current;
//     if (container) {
//       container.addEventListener("wheel", handleScroll, { passive: false });
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener("wheel", handleScroll);
//       }
//     };
//   }, []);

//   return (
//     <div className={styles.container}>
//       <header className={styles.navbar}>
//         <nav>
//           <ul>
//             <li>Home</li>
//             <li>Gallery</li>
//             <li>About</li>
//           </ul>
//         </nav>
//       </header>
//       <div ref={scrollContainer} className={styles.scrollWrapper}>
//         {images.map((image, index) => (
//           <div key={index} className={styles.imageBlock}>
//             <img src={image.src} alt={`Slide ${index + 1}`} className={styles.image} />
//             <div className={styles.imageText}>{image.text}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

