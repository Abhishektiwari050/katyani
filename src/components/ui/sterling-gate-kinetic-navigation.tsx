"use client"

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Magnetic } from "@/components/ui/magnetic";
import { motion, useScroll, useSpring } from "framer-motion";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface SterlingGateNavigationProps {
  logo?: string;
  links?: NavLink[];
}

export function SterlingGateNavigation({ 
  logo = "KC", 
  links = [
    { id: "01", label: "Projects", href: "/projects" },
    { id: "02", label: "Philosophy", href: "/about" },
    { id: "03", label: "Studio", href: "/about#team" },
    { id: "04", label: "Contact", href: "/contact" },
  ]
}: SterlingGateNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Initial Setup & Hover Effects
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
        if (!gsap.parseEase("main")) {
            CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
            gsap.defaults({ ease: "main", duration: 0.7 });
        }
    } catch (e) {
        gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // Shape Hover logic remains similar but enhanced
      const menuItems = container.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = container.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");
        const onEnter = () => {
             shape.classList.add("active");
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        const onLeave = () => {
            gsap.to(shapeEls, { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => shape.classList.remove("active"), overwrite: "auto" });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as any)._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, container);

    return () => {
        ctx.revert();
        container.querySelectorAll(".menu-list-item[data-shape]").forEach((item: any) => item._cleanup?.());
    };
  }, []);

  // Menu Animation
  useEffect(() => {
      if (!containerRef.current) return;
      const ctx = gsap.context(() => {
        const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current!.querySelector(".menu-content");
        const overlay = containerRef.current!.querySelector(".overlay");
        const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
        const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
        const menuButton = containerRef.current!.querySelector(".nav-close-btn");
        const menuButtonTexts = containerRef.current!.querySelectorAll(".nav-close-btn p");
        const menuButtonIcon = containerRef.current!.querySelector(".menu-button-icon");

        const tl = gsap.timeline();
        if (isMenuOpen) {
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            tl.set(navWrap, { display: "block", pointerEvents: "auto", autoAlpha: 1 })
              .to(menu, { x: "0%", duration: 0.8, ease: "main" }, "<")
              .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.1 }, "<")
              .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
              .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
              .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.6 }, "<")
              .fromTo(menuLinks, { yPercent: 140, rotate: 5 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.3");
        } else {
            if (navWrap) navWrap.setAttribute("data-nav", "closed");
            tl.to(menu, { x: "100%", duration: 0.6, ease: "power2.inOut" })
              .to(overlay, { autoAlpha: 0 }, "<")
              .to(menuButtonTexts, { yPercent: 0 }, "<")
              .to(menuButtonIcon, { rotate: 0 }, "<")
              .set(navWrap, { display: "none", pointerEvents: "none" });
        }
      }, containerRef);
      return () => ctx.revert();
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  // Handle cross-page navigation properly
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <div ref={containerRef} className="relative z-50">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-[60]"
          style={{ scaleX }}
        />

        <div className="site-header-wrapper fixed top-0 left-0 w-full p-6 md:p-10 mix-blend-difference pointer-events-none group">
          <header className="header flex justify-between items-center w-full">
            <div className="nav-logo-row pointer-events-auto">
                <Magnetic distance={0.3}>
                  <Link href="/" className="text-2xl font-black tracking-tighter text-white uppercase italic">{logo}</Link>
                </Magnetic>
            </div>
            
            <div className="nav-row__right flex items-center gap-4 md:gap-8 pointer-events-auto">
              <div className="nav-toggle-label hidden md:block cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-500" onClick={toggleMenu}>
                <span className="toggle-text text-white uppercase text-[10px] tracking-[0.3em] font-mono">Archive Access</span>
              </div>

              <Magnetic distance={0.2}>
                <Link 
                  href="/contact" 
                  className="px-8 py-3 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-white backdrop-blur-xl bg-white/5 hover:bg-white hover:text-black transition-all duration-500"
                >
                  Inquire Now
                </Link>
              </Magnetic>

              <button role="button" className="nav-close-btn flex items-center gap-4 text-white p-2" onClick={toggleMenu}>
                <div className="menu-button-text h-[1.2em] overflow-hidden">
                  <p className="uppercase text-[10px] tracking-[0.3em] font-mono font-bold">Index</p>
                  <p className="uppercase text-[10px] tracking-[0.3em] font-mono font-bold">Return</p>
                </div>
                <div className="icon-wrap w-5 h-5 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="menu-button-icon">
                    <rect x="9" y="0" width="2" height="20" fill="currentColor" />
                    <rect x="0" y="9" width="20" height="2" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </div>
          </header>
        </div>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper fixed inset-0 z-[100] pointer-events-none" style={{ display: "none", opacity: 0 }}>
          <div className="overlay absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMenu}></div>
          <nav className="menu-content absolute top-0 right-0 w-full md:w-[45vw] h-full bg-white text-black overflow-hidden shadow-2xl" style={{ transform: "translateX(100%)" }}>
            
            {/* Crystalized Refraction Layers */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="backdrop-layer first absolute inset-0 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)]"></div>
                <div className="backdrop-layer second absolute inset-0 bg-neutral-50 translate-x-full border-l border-black/5"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black/5 to-transparent"></div>
            </div>

            <div className="menu-content-wrapper relative z-10 p-12 md:p-24 h-full flex flex-col justify-between">
              <div className="menu-header flex justify-between items-start">
                  <span className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40">Katyani Constructions / Navigation</span>
                  <span className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40">Est. 2012</span>
              </div>

              <ul className="menu-list">
                {links.map((link, i) => (
                  <li key={link.id} className="menu-list-item overflow-hidden" data-shape={(i % 2) + 1}>
                    <Link href={link.href} className="nav-link block group py-4">
                      <div className="flex items-baseline gap-6">
                        <span className="text-xs font-mono opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                        <span className="nav-link-text text-5xl md:text-8xl font-black tracking-tighter inline-block uppercase transition-all duration-700 group-hover:italic group-hover:translate-x-4">
                            {link.label}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="menu-footer grid grid-cols-2 gap-8 border-t border-black/5 pt-12">
                  <div>
                      <p className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40 mb-4">Location</p>
                      <p className="text-sm font-bold">Lucknow, India</p>
                      <p className="text-xs opacity-60">Gomti Nagar Extension</p>
                  </div>
                  <div>
                      <p className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40 mb-4">Inquiries</p>
                      <p className="text-sm font-bold">studio@katyani.com</p>
                      <p className="text-xs opacity-60">+91 522 400 0000</p>
                  </div>
              </div>
            </div>

            {/* Ambient Shapes Enhanced */}
            <div className="ambient-background-shapes absolute inset-0 opacity-10 pointer-events-none">
                <svg className="bg-shape bg-shape-1 absolute w-full h-full" viewBox="0 0 400 400" fill="none">
                    <circle className="shape-element" cx="80" cy="120" r="40" fill="currentColor" />
                    <rect className="shape-element" x="250" y="50" width="100" height="100" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

