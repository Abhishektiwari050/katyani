"use client";

import { motion } from "framer-motion";

const DESIGNS = [
  { title: "CORE_ASSEMBLY", subtitle: "Structural Core v2.4", label: "REBAR_SPEC: FE550D" },
  { title: "COLUMN_NODAL", subtitle: "Intersection Detail", label: "LOAD_LIMIT: 450t" },
  { title: "FACADE_MOD", subtitle: "System Panel Design", label: "THERMAL_INDX: 0.12" }
];

export function IsometricDesignShowcase() {
  return (
    <div className="flex flex-col gap-8 w-64 pointer-events-auto">
      <div className="flex items-center gap-3">
         <div className="h-[1px] w-8 bg-white/40" />
         <span className="text-[10px] font-mono text-white tracking-[0.3em] uppercase">3D_Construction_Designs</span>
      </div>

      <div className="flex flex-col gap-12">
        {DESIGNS.map((design, i) => (
          <motion.div 
            key={design.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 + i * 0.2 }}
            className="group relative"
          >
            {/* 3D Mini Component (Abstract Representation) */}
            <div className="relative mb-3 h-20 w-32 border border-white/10 overflow-hidden bg-white/[0.02] hover:border-white/40 transition-colors cursor-help">
               <motion.div 
                 animate={{ rotateY: [45, 135, 45] }}
                 transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                 className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
               >
                  {/* Isometric Box Frame */}
                  <div className="w-8 h-8 border border-white/40 [transform:rotateX(45deg)_rotateY(45deg)]" />
                  <div className="absolute w-8 h-8 border border-white/20 [transform:rotateX(45deg)_rotateY(45deg)_translateZ(20px)]" />
               </motion.div>
               
               {/* Scan Line */}
               <motion.div 
                 animate={{ top: ["0%", "100%", "0%"] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="absolute left-0 w-full h-[0.5px] bg-white/20"
               />
            </div>

            <div className="flex flex-col gap-0.5">
               <h4 className="text-[11px] font-bold text-white tracking-widest">{design.title}</h4>
               <p className="text-[9px] text-white/40 font-mono tracking-tighter">{design.subtitle}</p>
               <span className="mt-2 text-[7px] bg-white/10 px-1 py-0.5 self-start text-white/60 font-mono italic">
                  {design.label}
               </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
