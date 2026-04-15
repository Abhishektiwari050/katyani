"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function StructuralInspector() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 25 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute -top-[30px] -left-[30px] w-[60px] h-[60px]"
      >
        {/* Simple Clean Circle */}
        <div className="w-full h-full rounded-full border border-white/30 backdrop-blur-[2px] transition-colors hover:border-white/60" />
        
        {/* Minimal Center Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full" />

        {/* Technical Label (Very Subtle) */}
        <div className="absolute top-0 right-[-40px] flex flex-col font-mono text-[7px] text-white/40 leading-none">
          <span>{`{P_LENS}`}</span>
          <span className="mt-1 opacity-20 tracking-tighter uppercase">STRUCTURAL_INSP</span>
        </div>
      </motion.div>
    </div>
  );
}
