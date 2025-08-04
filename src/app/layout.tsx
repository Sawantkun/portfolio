import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sawant Kumar | Full Stack Developer",
  description: "Results-driven Full Stack Web Developer crafting immersive and user-centric web experiences with React.js, Next.js, and modern technologies.",
  keywords: "Sawant Kumar, Full Stack Developer, React.js, Next.js, Web Developer, Frontend, Backend",
  authors: [{ name: "Sawant Kumar" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Sawant Kumar | Full Stack Developer",
    description: "Results-driven Full Stack Web Developer",
    url: "https://sawant-portfolio.netlify.app",
    siteName: "Sawant Kumar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sawant Kumar | Full Stack Developer",
    description: "Results-driven Full Stack Web Developer",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins">
        {children}
      </body>
    </html>
  );
}
