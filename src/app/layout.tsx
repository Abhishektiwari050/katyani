import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SterlingGateNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Katyani Constructions",
  description: "Luxury Real Estate & Architectural Excellence. Architecting tomorrow with premium real estate solutions in Lucknow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-white text-black selection:bg-black selection:text-white overflow-x-hidden" suppressHydrationWarning>
        <SmoothScroll>
          <CustomCursor cursorType="big-circle" color="#000000" />
          <SterlingGateNavigation 
            logo="KATYANI"
            links={[
              { id: "01", label: "Projects", href: "/projects" },
              { id: "02", label: "Philosophy", href: "/about" },
              { id: "03", label: "Studio", href: "/about#team" },
              { id: "04", label: "Contact", href: "/contact" },
            ]}
          />
          <main className="relative z-0">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}


