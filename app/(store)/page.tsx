"use client";

<<<<<<< Updated upstream:app/(store)/page.tsx
// app/(store)/page.tsx
import Carousel from "../components/Carousel";
import AngledSlider from "../components/AngledSlider";
import SapphireBanner from "../components/SapphireBanner";
import UserReviews from "../components/UserReviews";
import Collections from "../components/Collections";
const jewelryCollection = [
  { id: 1, url: "/RingsCtag.JPG", title: "The Solitaire" },
  { id: 2, url: "/NecklaceCtag.JPG", title: "Liquid Gold" },
  { id: 3, url: "/EarringsCtag.WEBP", title: "Sculpted Studs" },
  { id: 4, url: "/BraceletsCtag.WEBP", title: "Modern Cuff" },
  { id: 5, url: "/RingsCtag.JPG", title: "Eternal Band" },
];
=======
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import AboutUsSection from "./components/AboutUsSection";
import AngledSlider from "./components/AngledSlider";
import SapphireBanner from "./components/SapphireBanner";
import UserReviews from "./components/UserReviews";

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
}
>>>>>>> Stashed changes:app/page.tsx

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/featured`)
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.products || []))
      .catch(err => console.error("Failed to fetch featured products:", err));
  }, []);

  return (
    <main className="w-full bg-white flex flex-col p-0 m-0 mt-20 md:mt-24">
      
      <section className="w-full h-fit relative z-30">
        <Carousel />
      </section>

      <Collections/>
      
      
        <AngledSlider products={featuredProducts}/>
    

      {/* GUARANTEED SPACER:       */}
        
       <div className="h-20 md:h-40 w-full bg-white" aria-hidden="true" />
     
      <section className="relative z-10">
        <SapphireBanner />
      </section>
     
      <UserReviews/>

    </main>
  );
}
