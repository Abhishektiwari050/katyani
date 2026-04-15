"use client";

import { motion } from "framer-motion";

export function StructuralWireframe() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15]">
      {/* Skeleton A - Left Side */}
      <motion.div 
        animate={{ 
          y: [0, -40, 0],
          rotateY: [0, 10, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[30%] w-[300px] h-[400px]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.2]">
          {/* Vertical Columns */}
          <line x1="20" y1="0" x2="20" y2="100" />
          <line x1="40" y1="0" x2="40" y2="100" />
          <line x1="60" y1="0" x2="60" y2="100" />
          <line x1="80" y1="0" x2="80" y2="100" />
          {/* Horizontal Slabs */}
          <line x1="0" y1="20" x2="100" y2="20" />
          <line x1="0" y1="40" x2="100" y2="40" />
          <line x1="0" y1="60" x2="100" y2="60" />
          <line x1="0" y1="80" x2="100" y2="80" />
          {/* Diagonal Bracing */}
          <line x1="20" y1="20" x2="40" y2="40" />
          <line x1="40" y1="20" x2="20" y2="40" />
          <line x1="60" y1="40" x2="80" y2="60" />
          <line x1="80" y1="40" x2="60" y2="60" />
        </svg>
      </motion.div>

      {/* Skeleton B - Right Side Deep */}
      <motion.div 
        animate={{ 
          y: [0, 50, 0],
          rotateX: [0, 15, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] bottom-[10%] w-[500px] h-[300px]"
      >
        <svg viewBox="0 0 200 100" className="w-full h-full stroke-white fill-none stroke-[0.1]">
          {/* Girders */}
          <rect x="0" y="0" width="200" height="100" />
          <line x1="0" y1="50" x2="200" y2="50" />
          <line x1="100" y1="0" x2="100" y2="100" />
          {/* Detailed Truss */}
          <path d="M0,0 L100,50 L0,100 M200,0 L100,50 L200,100" />
          <path d="M50,0 L50,100 M150,0 L150,100" />
        </svg>
      </motion.div>
    </div>
  );
}
