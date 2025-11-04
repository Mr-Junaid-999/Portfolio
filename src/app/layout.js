import "./globals.css";

export const metadata = {
  title: "Junaid UL Hassan - Portfolio",
  description:
    "Full Stack Developer creating beautiful, functional, and user-centered digital experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
