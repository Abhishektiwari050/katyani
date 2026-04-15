"use client"

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Magnetic } from "@/components/ui/magnetic";

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
    { id: "01", label: "About us", href: "#" },
    { id: "02", label: "Our work", href: "#" },
    { id: "03", label: "Services", href: "#" },
    { id: "04", label: "Blog", href: "#" },
    { id: "05", label: "Contact us", href: "#" },
  ]
}: SterlingGateNavigationProps) {
  // We need a ref for the parent container to scope GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initial Setup & Hover Effects
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create custom easing
    try {
        if (!gsap.parseEase("main")) {
            CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
            gsap.defaults({ ease: "main", duration: 0.7 });
        }
    } catch (e) {
        console.warn("CustomEase failed to load, falling back to default.", e);
        gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // 1. Arrow Animation (Removed from indicator, but keeping logic if arrow existed/restored elsewhere)
      const arrowLine = document.querySelector(".arrow-line");
      if (arrowLine) {
        const pathLength = (arrowLine as SVGPathElement).getTotalLength();
        gsap.set(arrowLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        const arrowTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        arrowTl
          .to(arrowLine, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
          .to({}, { duration: 1.2 })
          .to(arrowLine, { strokeDashoffset: -pathLength, duration: 0.6, ease: "power2.in" })
          .set(arrowLine, { strokeDashoffset: pathLength });
      }

      // 2. Shape Hover
      const menuItems = container.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = container.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
             if (shapesContainer) {
                 shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
             }
             shape.classList.add("active");
             
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        
        const onLeave = () => {
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => shape.classList.remove("active"),
                overwrite: "auto"
            });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        (item as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });
      
    }, container);

    return () => {
        ctx.revert();
        const items = container.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item) => (item as HTMLElement & { _cleanup?: () => void })._cleanup?.());
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
      if (!containerRef.current) return;
      
      const ctx = gsap.context(() => {
        const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current!.querySelector(".menu-content");
        const overlay = containerRef.current!.querySelector(".overlay");
        const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
        const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
        const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
        
        const menuButton = containerRef.current!.querySelector(".nav-close-btn");
        const menuButtonTexts = menuButton?.querySelectorAll("p");
        const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

        const tl = gsap.timeline();
        
        if (isMenuOpen) {
            // OPEN
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            
            tl.set(navWrap, { display: "block", pointerEvents: "auto", autoAlpha: 1 })
              .to(menu, { x: "0%", duration: 0.6, ease: "main" }, "<");
            
            if (menuButtonTexts) {
              tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2, overwrite: "auto" }, "<");
            }
            if (menuButtonIcon) {
              tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315, overwrite: "auto" }, "<");
            }
              
            tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")

              .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
              .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
              
            if (fadeTargets.length) {
                tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
            }

        } else {
            // CLOSE
            if (navWrap) navWrap.setAttribute("data-nav", "closed");

            tl.to(overlay, { autoAlpha: 0 })
              .to(menu, { x: "100%", duration: 0.5, ease: "power2.inOut" }, "<");

            if (menuButtonTexts) {
                tl.to(menuButtonTexts, { yPercent: 0 }, "<");
            }
            if (menuButtonIcon) {
                tl.to(menuButtonIcon, { rotate: 0 }, "<");
            }

            tl.set(navWrap, { display: "none", pointerEvents: "none" });

        }

      }, containerRef);
      
      return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <div ref={containerRef} className="relative z-50">
        <div className="site-header-wrapper fixed top-0 left-0 w-full p-6 md:p-12 mix-blend-difference pointer-events-none">
          <header className="header flex justify-between items-center w-full">
            <div className="nav-logo-row pointer-events-auto">
                <Magnetic distance={0.3}>
                  <Link href="/" className="text-2xl font-bold tracking-tighter text-white uppercase">{logo}</Link>
                </Magnetic>
            </div>
            <div className="nav-row__right flex items-center gap-4 md:gap-8 pointer-events-auto">
              <div className="nav-toggle-label hidden md:block cursor-pointer" onClick={toggleMenu}>
                <span className="toggle-text text-white uppercase text-sm tracking-widest font-mono">click me</span>
              </div>

              <Magnetic distance={0.2}>
                <Link 
                  href="#contact" 
                  className="px-6 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white backdrop-blur-md bg-white/5 hover:bg-white hover:text-black transition-all duration-500"
                >
                  Inquire Now
                </Link>
              </Magnetic>

              <button role="button" className="nav-close-btn flex items-center gap-3 text-white" onClick={toggleMenu}>
                <div className="menu-button-text h-[1.5em] overflow-hidden leading-tight">
                  <p className="p-large uppercase text-sm tracking-widest font-mono">Menu</p>
                  <p className="p-large uppercase text-sm tracking-widest font-mono">Close</p>
                </div>
                <div className="icon-wrap w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="menu-button-icon"
                  >
                    <path d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16L7.33333 16Z" fill="currentColor"></path>
                    <path d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333L16 8.66667Z" fill="currentColor"></path>
                  </svg>
                </div>
              </button>
            </div>
          </header>
        </div>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper fixed inset-0 z-[100] pointer-events-none" style={{ display: "none", opacity: 0 }}>
          <div className="overlay absolute inset-0 bg-black/40" onClick={closeMenu}></div>
          <nav className="menu-content absolute top-0 right-0 w-full md:w-[40vw] h-full bg-white text-black overflow-hidden" style={{ transform: "translateX(100%)" }}>
            <div className="menu-bg absolute inset-0 pointer-events-none">
              <div className="backdrop-layer first absolute inset-0 bg-white"></div>
              <div className="backdrop-layer second absolute inset-0 bg-neutral-100 translate-x-full"></div>
              <div className="backdrop-layer absolute inset-0 bg-white translate-x-full"></div>

              <div className="ambient-background-shapes absolute inset-0 opacity-20">
                <svg className="bg-shape bg-shape-1 absolute w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="currentColor" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="currentColor" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="currentColor" />
                </svg>
                <svg className="bg-shape bg-shape-2 absolute w-full h-full" viewBox="0 0 400 400" fill="none">
                   <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="currentColor" strokeWidth="40" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper relative z-10 p-12 h-full flex flex-col justify-center">
              <ul className="menu-list space-y-4">
                {links.map((link, i) => (
                  <li key={link.id} className="menu-list-item overflow-hidden" data-shape={(i % 2) + 1}>
                    <Link href={link.href} className="nav-link block group py-2" onClick={closeMenu}>
                      <span className="nav-link-text text-5xl md:text-7xl font-bold tracking-tighter inline-block italic group-hover:not-italic transition-all duration-500">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

