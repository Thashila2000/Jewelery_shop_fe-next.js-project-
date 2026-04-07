"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Anjali Perera",
    role: "Collector",
    content: "The weight and luster of the gold are exceptional. It feels like wearing a piece of Sri Lankan history.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "David Miller",
    role: "Gifting",
    content: "Customer service was as brilliant as the sapphires. A seamless experience from Kandy to London.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Sophia Thorne",
    role: "Designer",
    content: "Modern elegance rooted in tradition. The craftsmanship on the filigree work is simply breathtaking.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    id: 4,
    name: "Nalini Fernando",
    role: "Bride",
    content: "Wore their bridal collection on my wedding day. Every compliment about my jewellery that evening was deserved.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
  {
    id: 5,
    name: "James Hartley",
    role: "Connoisseur",
    content: "Rare gemstones set with extraordinary precision. A truly world-class atelier hidden in the heart of the island.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
];

const allReviews = [...reviews, ...reviews];

// --- STYLISH COUNTER COMPONENT ---
function Counter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseFloat(value.replace(/,/g, "").replace(/[^\d.]/g, ""));
  const count = useMotionValue(0);
  
  const rounded = useTransform(count, (latest) => {
    if (value.includes(".")) return latest.toFixed(1);
    const formatted = Math.floor(latest).toLocaleString();
    if (value.includes("+")) return `${formatted}+`;
    if (value.includes("Yrs")) return `${formatted} Yrs`;
    return formatted;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [numericValue, count, isInView]);

  return (
    <motion.span ref={ref} style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
      {rounded}
    </motion.span>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: "350px",
        flexShrink: 0,
        padding: "4px",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(135deg, #d4af37, #b18d2b, #d4af37)"
          : "rgba(0, 0, 0, 0.1)",
        borderRadius: 20,
        transition: "background 0.5s ease",
        padding: 1,
      }} />

      <div style={{
        position: "relative",
        background: hovered ? "#0f1017" : "#1a1b23",
        borderRadius: 19,
        padding: "32px 28px",
        transition: "background 0.4s ease, transform 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}>
        <div style={{
          position: "absolute", top: 16, right: 20,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 120, fontWeight: 200, lineHeight: 1,
          color: "rgba(177,141,43,0.06)",
          pointerEvents: "none", userSelect: "none",
        }}>"</div>

        <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={12} fill="#d4af37" strokeWidth={0} />
          ))}
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 17, fontWeight: 300,
          fontStyle: "italic",
          color: "#e5e1d8",
          lineHeight: 1.75,
          marginBottom: 28,
          letterSpacing: "0.01em",
        }}>
          "{review.content}"
        </p>

        <div style={{
          height: 1, marginBottom: 20,
          background: hovered
            ? "linear-gradient(to right, #b18d2b, rgba(177,141,43,0.1))"
            : "linear-gradient(to right, rgba(177,141,43,0.2), transparent)",
          transition: "background 0.4s ease",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative" }}>
            <img
              src={review.image}
              alt={review.name}
              style={{
                width: 48, height: 48,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1.5px solid rgba(177,141,43,0.4)",
              }}
            />
            <div style={{
              position: "absolute", inset: -3,
              borderRadius: "50%",
              border: hovered ? "1.5px solid rgba(212,175,55,0.8)" : "1.5px solid transparent",
              transition: "border-color 0.4s ease",
            }} />
          </div>

          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, fontWeight: 400,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#f0ebe0", marginBottom: 3,
            }}>
              {review.name}
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9, fontWeight: 300,
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "#b18d2b",
            }}>
              {review.role}
            </p>
          </div>

          <div style={{ marginLeft: "auto", opacity: hovered ? 0.7 : 0.25, transition: "opacity 0.4s" }}>
            <Quote size={22} color="#d4af37" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserReviews() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200;1,300&family=DM+Sans:wght@200;300;400&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

        .reviews-track { cursor: default; }
        .reviews-track:hover .reviews-inner { animation-play-state: paused !important; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <section style={{
        width: "100%",
        background: "#DCDCDC",
        padding: "96px 0 80px",
        overflow: "hidden",
        position: "relative",
      }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 72, padding: "0 24px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 200, lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#000000", margin: "0 0 20px",
            }}
          >
            What Our Clients{" "}
            <em style={{ fontStyle: "italic", color: "#b18d2b" }}>Cherish</em>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.28 }}
            style={{
              height: 1, width: 72, margin: "0 auto",
              background: "linear-gradient(to right, transparent, #b18d2b, transparent)",
              transformOrigin: "center",
            }}
          />
        </div>

        {/* ── MARQUEE TRACK ── */}
        <div className="reviews-track" style={{ position: "relative", overflow: "hidden" }}>
          <div
            className="reviews-inner"
            style={{
              display: "flex",
              gap: 24,
              paddingLeft: 24,
              animation: "marquee 40s linear infinite",
              width: "max-content",
            }}
          >
            {allReviews.map((review, idx) => (
              <ReviewCard key={`${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* ── STAT ROW WITH ANIMATED STYLISH NUMBERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            display: "flex", justifyContent: "center",
            gap: "clamp(32px, 8vw, 120px)",
            marginTop: 72, padding: "0 24px",
            borderTop: "1px solid rgba(177,141,43,0.1)",
            paddingTop: 48,
            flexWrap: "wrap"
          }}
        >
          {[
            { value: "2,400+", label: "Happy Clients" },
            { value: "5.0", label: "Average Rating" },
            { value: "15 Yrs", label: "Of Excellence" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 400, lineHeight: 1,
                color: "#b18d2b", marginBottom: 12,
              }}>
                <Counter value={stat.value} />
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, fontWeight: 400,
                letterSpacing: "0.5em", textTransform: "uppercase",
                color: "rgba(0,0,0,0.4)",
              }}>
                {stat.label} 
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}