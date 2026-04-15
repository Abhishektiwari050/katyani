"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ScanningHUD() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[30] overflow-hidden">
      {/* 1. Mouse Tracking Radar */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute -top-16 -left-16 w-32 h-32 flex items-center justify-center opacity-40 mix-blend-screen"
      >
        <div className="absolute inset-0 border border-white/20 rounded-full" />
        <div className="absolute inset-2 border border-white/10 rounded-full border-dashed animate-spin-slow" />
        <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white/40" />
        <div className="absolute left-1/2 top-0 h-full w-[0.5px] bg-white/40" />
        
        {/* Readout label */}
        <div className="absolute -right-24 -top-8 flex flex-col gap-1 font-mono text-[8px] text-white">
          <span className="bg-white/10 px-1">SCAN_POINT_ACTIVE</span>
          <span className="text-white/40">S_LOAD: 98%</span>
          <span className="text-white/40">Z_LVL: 114m</span>
        </div>
      </motion.div>

      {/* 2. Floating Site Particles */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: Math.random()
            }}
            animate={{ 
              y: ["-5%", "105%"],
              x: ["0%", `${(Math.random() - 0.5) * 20}%`]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
