"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function CraneParallax() {
  const { scrollYProgress } = useScroll();
  
  const crane1Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const crane2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between px-24 overflow-hidden">
      {/* Left Crane */}
      <motion.div 
        style={{ y: crane1Y }}
        className="relative h-[150%] w-48 flex flex-col items-center"
      >
        <div className="w-1 h-full bg-white transition-all duration-1000" />
        <div className="absolute top-1/4 w-[600px] h-2 bg-white -left-1/2 origin-right -rotate-[15deg]">
           <div className="absolute right-0 w-8 h-24 border-x border-white -top-6" />
        </div>
      </motion.div>

      {/* Right Crane */}
      <motion.div 
        style={{ y: crane2Y }}
        className="relative h-[180%] w-32 flex flex-col items-center"
      >
        <div className="w-[1.5px] h-full bg-white" />
        <div className="absolute top-1/3 w-[800px] h-3 bg-white -right-[200px] origin-left rotate-[5deg]">
           <div className="absolute left-1/4 w-12 h-32 border-x border-white -top-8" />
        </div>
      </motion.div>
    </div>
  );
}
