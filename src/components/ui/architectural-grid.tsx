"use client";

import { motion } from "framer-motion";

export function ArchitecturalGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
      {/* 12-column grid lines */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
        {Array.from({ length: 169 }).map((_, i) => (
          <div 
            key={i} 
            className="border-[0.5px] border-white/10 relative"
          >
            {/* Cross markers at intersections */}
            <div className="absolute top-[-4px] left-[-4px] w-[8px] h-[8px] flex items-center justify-center">
              <div className="w-full h-[1px] bg-white/40 absolute" />
              <div className="w-[1px] h-full bg-white/40 absolute" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative scanning line */}
      <motion.div 
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[1px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      />
    </div>
  );
}
