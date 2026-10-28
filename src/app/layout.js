import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "Junaid UL Hassan | Web Developer & Digital Solutions Specialist",
  description: "Web development, WordPress, GoHighLevel funnels, Shopify, and SEO services for businesses in Pakistan and internationally.",
  openGraph: {
    title: "Junaid UL Hassan | Web Developer",
    description: "Custom websites, WordPress, funnels, SEO, and Shopify services.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable} min-h-screen`}>{children}</body>
    </html>
  );
}
