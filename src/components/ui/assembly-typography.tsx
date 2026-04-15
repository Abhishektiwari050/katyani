"use client";

import { motion } from "framer-motion";

export interface AssemblyTypographyProps {
  text?: string;
  className?: string;
}

export function AssemblyTypography({ text = "KATYANI", className }: AssemblyTypographyProps) {
  return (
    <div className={`relative z-20 pointer-events-none ${className}`}>
      <div className="flex flex-col items-center gap-0">
        
        {/* The 'Katyani' Construction Assembly */}
        <h1 className="text-[14vw] md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase flex items-center justify-center">
          {text.split("").map((char, index) => (
            <div key={index} className="relative group overflow-visible">
              <motion.span
                initial={{ opacity: 0, y: 100, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
              
              {/* Supporting "Scaffolding" Lines for each letter */}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: ["0%", "120%", "0%"] }}
                transition={{ delay: index * 0.1, duration: 2, ease: "easeInOut" }}
                className="absolute left-1/2 -top-[10%] w-[1px] bg-white opacity-40 -translate-x-1/2"
              />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1.5, ease: "linear" }}
                className="absolute left-0 top-1/2 h-[1px] bg-white opacity-30 -translate-y-1/2"
              />
            </div>
          ))}
        </h1>

        {/* Sub-header with 'Material' reveal */}
        <div className="relative mt-4">
           <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-white origin-left"
           />
           <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="text-[10px] md:text-xs font-mono text-white/60 tracking-[1.5em] md:tracking-[2.5em] uppercase pl-[2.5em]"
           >
              Foundations of Excellence
           </motion.h2>
        </div>

      </div>
    </div>
  );
}
