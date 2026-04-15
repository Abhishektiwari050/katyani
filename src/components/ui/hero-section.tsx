"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArchitecturalGrid } from "./architectural-grid";
import { BuildingSkeleton3D } from "./building-skeleton-3d";
import { AssemblyTypography } from "./assembly-typography";
import { StructuralInspector } from "./structural-inspector";
import { CraneParallax } from "./crane-parallax";
import { IsometricDesignShowcase } from "./isometric-design-showcase";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[160vh] w-full bg-[#030303] overflow-hidden"
      id="home"
    >
      {/* 1. Atmospheric Ethereal Background */}
      <StructuralInspector />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/[0.02] to-transparent pointer-events-none" />
      
      {/* 2. Simplified Crane & Grid Layer */}
      <div className="opacity-10">
         <CraneParallax />
      </div>

      <div className="absolute inset-0 z-0 perspective-[2500px]">
         <motion.div 
            style={{ rotateX: 55, y: -300 }}
            className="absolute bottom-0 w-[200vw] h-[200vw] left-[-50vw] [transform-style:preserve-3d]"
         >
            <ArchitecturalGrid />
            <motion.div 
              animate={{ bottom: ["0%", "100%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
         </motion.div>
      </div>

      {/* 3. The Ethereal Build (Assembly Animation) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
         <motion.div style={{ scale, opacity, y: yTranslate }} className="w-full h-full relative">
            <div className="absolute inset-0 bg-black/40 z-20" /> {/* Subtle dimming for text readability */}
            <BuildingSkeleton3D />
         </motion.div>
      </div>

      {/* 4. Elegant Minimalist Content (High Z-Index) */}
      <div className="relative z-50 flex flex-col items-center justify-center min-h-screen">
         <motion.div style={{ opacity }}>
            <AssemblyTypography />
         </motion.div>

         {/* Elegant Branding Subtitle */}
         <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: 60 }}
               transition={{ delay: 1, duration: 1.5 }}
               className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
            <span className="text-[10px] md:text-sm font-light tracking-[1em] text-white/50 uppercase pl-[1em]">
               Architecting Perfection
            </span>
         </div>

         {/* Elegant Floating Data Modules (Replacing HUD) */}
         <div className="absolute bottom-32 left-12 grid grid-cols-1 gap-4 pointer-events-none">
            {[
               { label: "Nc: LOAD_DIST", val: "-5.00 kN" },
               { label: "Vc: SHEAR_COEFF", val: "0.125 kN" },
               { label: "Mc: BENDING_RES", val: "-0.375 kNm" }
            ].map((stat, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + (i * 0.2), duration: 1 }}
                  className="flex items-center gap-8 px-4 py-2 border-l border-white/10 bg-white/[0.01] backdrop-blur-sm"
               >
                  <span className="text-[8px] font-mono text-white/40 tracking-widest">{stat.label}</span>
                  <span className="text-[11px] font-mono text-white/90 tracking-tighter">{stat.val}</span>
               </motion.div>
            ))}
         </div>
      </div>

      {/* 5. Minimalist Showcase Section */}
      <div className="absolute top-48 right-12 z-50 hidden xl:block opacity-40 hover:opacity-100 transition-opacity duration-700">
         <IsometricDesignShowcase />
      </div>

      {/* 6. Interaction Prompt */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-6">
         <motion.div 
            animate={{ height: [40, 80, 40] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-[1px] bg-gradient-to-t from-white/40 to-transparent" 
         />
         <span className="text-[8px] font-mono tracking-[0.6em] text-white/40 uppercase pl-[0.6em]">Initiate Assembly</span>
      </div>
    </section>
  );
}
