"use client";

import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Carousel from "./components/Carousel"; 

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="mt-20">
      
      <Carousel />
    </main>
  );
}
