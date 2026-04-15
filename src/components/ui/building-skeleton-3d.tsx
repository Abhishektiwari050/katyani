"use client";

import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function BuildingSkeleton3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 15, 
        y: (e.clientY / window.innerHeight - 0.5) * -15 
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const rotateX = useSpring(mousePos.y, { stiffness: 80, damping: 25 });
  const rotateY = useSpring(mousePos.x, { stiffness: 80, damping: 25 });

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[2000px] z-10">
      <motion.div 
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-[500px] h-[600px]"
      >
        {/* Scaffolding Frame (Outer Cage) */}
        <div className="absolute inset-x-[-10%] inset-y-[-5%] border-[0.5px] border-white/5 [transform:translateZ(-300px)] pointer-events-none" />
        <div className="absolute inset-x-[-10%] inset-y-[-5%] border-[0.5px] border-white/5 [transform:translateZ(300px)] pointer-events-none" />
        
        {/* Vertical Scaffolding Poles */}
        {[-1, 1].map(x => [-1, 1].map(z => (
          <div 
            key={`${x}-${z}`}
            className="absolute top-[-10%] bottom-[-10%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"
            style={{ 
              left: x > 0 ? "110%" : "-10%",
              transform: `translateZ(${z * 300}px)`
            }}
          />
        )))}

        {/* 3D Floors */}
        {[0, 1, 2, 3, 4, 5].map((floor) => (
          <motion.div
            key={floor}
            initial={{ y: 500, opacity: 0, rotateZ: 5 }}
            animate={{ y: 0, opacity: 1, rotateZ: 0 }}
            transition={{ 
              delay: floor * 0.15, 
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ 
              transform: `translateZ(${floor * 100 - 250}px)`,
              transformStyle: "preserve-3d"
            }}
            className="absolute inset-0"
          >
            {/* Floor Slab */}
            <div className="absolute inset-0 border-[0.5px] border-white/20 bg-white/[0.015] backdrop-blur-[1px]" />
            
            {/* Structural Beams */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10" />
            <div className="absolute top-0 left-0 w-[2px] h-full bg-white/10" />
            <div className="absolute top-0 right-0 w-[2px] h-full bg-white/10" />

            {/* Corner Nodes */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-white/40 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 right-0 w-1 h-1 bg-white/40 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-white/40 -translate-x-1/2 translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/40 translate-x-1/2 translate-y-1/2" />

            {/* Active Construction Markers (Pulsing) */}
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: floor * 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white/50"
            />
            
            {/* Column Segments */}
            <div className="absolute top-0 left-0 w-[2px] h-24 bg-white/20 [transform:rotateX(-90deg)translateY(-12px)]" />
            <div className="absolute top-0 right-0 w-[2px] h-24 bg-white/20 [transform:rotateX(-90deg)translateY(-12px)]" />
          </motion.div>
        ))}

        {/* Diagonal Bracing lines (Simplified for CSS) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(45deg,white_0.5px,transparent_0.5px)]" style={{ backgroundSize: "100px 100px" }} />
      </motion.div>
    </div>
  );
}
