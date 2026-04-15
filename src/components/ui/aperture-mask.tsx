"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ApertureMask() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ scale, rotate }}
        className="w-[85%] h-[85%] relative"
      >
        {/* The Frame */}
        <div className="absolute inset-0 border border-white/10" />
        
        {/* Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center pointer-events-none opacity-40">
           <div className="w-full h-[0.5px] bg-white absolute" />
           <div className="w-[0.5px] h-full bg-white absolute" />
           <div className="w-8 h-8 rounded-full border-[0.5px] border-white" />
        </div>

        {/* Video reveals behind this frame */}
        <div className="absolute inset-0 z-[-1] overflow-hidden grayscale contrast-125 brightness-75">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-detail-against-the-sky-34538-preview.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>
    </div>
  );
}
