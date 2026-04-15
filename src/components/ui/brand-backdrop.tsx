"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function BrandBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black flex items-center justify-center group"
    >
      {/* 1. Colorful Parallax Background */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
      >
        <Image
          src="/brand-backdrop.png"
          alt="Futuristic Architecture Backdrop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80" />
      </motion.div>

      {/* 2. Brand Mask Text */}
      <div className="relative z-10 text-center select-none pointer-events-none">
        <motion.h2 
          style={{ opacity }}
          className="text-[20vw] font-black tracking-[-0.05em] leading-none mb-0 text-white/10"
        >
          KATYANI
        </motion.h2>
        
        {/* Secondary Layer - Sharp Border */}
        <h2 className="absolute top-0 left-0 right-0 text-[20vw] font-black tracking-[-0.05em] leading-none mb-0 text-transparent border-text-stroke">
          KATYANI
        </h2>
      </div>

      <style jsx>{`
        .border-text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* 3. Ambient Particles / Light Trails */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 blur-[150px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>
    </div>
  );
}
