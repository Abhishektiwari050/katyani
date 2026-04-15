"use client";

import { motion } from "framer-motion";

export function DimensionHUD() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-difference opacity-30">
      {/* Horizontal Dimension for Top Title Area */}
      <div className="absolute top-[20%] left-[10%] right-[15%]">
        <div className="relative flex items-center justify-center">
          <div className="absolute left-0 h-4 border-l border-white/40" />
          <div className="absolute right-0 h-4 border-r border-white/40" />
          <div className="w-full h-[0.5px] bg-white/40 flex items-center justify-center">
             <div className="bg-black px-4 py-1">
                <span className="text-[10px] font-mono tracking-tighter">DIM_WIDTH // 12.24m</span>
             </div>
          </div>
          <div className="absolute left-0 -translate-x-1/2 text-[8px] font-mono">0.00</div>
          <motion.div 
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute h-2 w-[1px] bg-white shadow-[0_0_10px_white]" 
          />
        </div>
      </div>

      {/* Vertical Dimension for Left Side */}
      <div className="absolute left-[15%] top-[25%] bottom-[25%]">
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="absolute top-0 w-4 border-t border-white/40" />
          <div className="absolute bottom-0 w-4 border-b border-white/40" />
          <div className="h-full w-[0.5px] bg-white/40 flex items-center justify-center">
             <div className="bg-black py-4 px-1 rotate-90 whitespace-nowrap">
                <span className="text-[10px] font-mono tracking-tighter">DIM_HEIGHT // 46.80m</span>
             </div>
          </div>
        </div>
      </div>

      {/* Crosshair with Distance readout */}
      <div className="absolute top-[45%] left-[65%] w-32 h-32 flex flex-col items-center justify-center">
         <div className="w-full h-[0.5px] bg-white/20 absolute" />
         <div className="w-[0.5px] h-full bg-white/20 absolute" />
         <div className="w-4 h-4 rounded-full border border-white/40 relative">
            <motion.div 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-white/10"
            />
         </div>
         <span className="text-[8px] font-mono mt-8 text-white/40">Z_OFFSET: +112.55</span>
      </div>
    </div>
  );
}
