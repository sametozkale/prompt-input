import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "https://prompt-input.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Prompt Input | Production-Ready React Component",
  description:
    "A production-ready prompt input with agent selector, sources toggle, file attach, and deep research mode.",
  openGraph: {
    title: "Prompt Input | Production-Ready React Component",
    description:
      "A production-ready prompt input with agent selector, sources toggle, file attach, and deep research mode.",
    url: "https://prompt-input.vercel.app/",
    siteName: "Prompt Input",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Input | Production-Ready React Component",
    description:
      "A production-ready prompt input with agent selector, sources toggle, file attach, and deep research mode.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Prompt Input",
    description:
      "Prompt Input: Production-ready React component with agent selector, sources, file attach, and research mode.",
    url: "https://prompt-input.vercel.app/",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Samet Ozkale", url: "https://samet.works" },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
