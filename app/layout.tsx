// app/layout.tsx
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: {
    default: "Kandy Jewellery | Timeless Elegance",
    template: "%s | Kandy Jewellery",
  },
  description:
    "Discover handcrafted jewellery collections inspired by Sri Lanka’s royal legacy.",
  keywords: [
    "Sri Lanka jewellery",
    "handcrafted jewellery",
    "Kandy jewellery",
    "luxury jewellery",
  ],
  openGraph: {
    title: "Kandy Jewellery",
    description:
      "Timeless handcrafted collections inspired by Sri Lanka’s royal legacy.",
    url: "https://yourdomain.com",
    siteName: "Kandy Jewellery",
    images: [
      {
        url: "https://www.genny.com/media/catalog/category/gioielli.jpg",
        width: 1200,
        height: 630,
        alt: "Kandy Jewellery Hero",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
