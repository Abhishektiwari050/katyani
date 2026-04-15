"use client";

import { motion } from "framer-motion";

const METADATA_ITEMS = [
  { label: "SITE_ID", value: "LKO-SEC-24 // ZONE_G" },
  { label: "POUR_DATE", value: "APRIL.12.2025" },
  { label: "CONCRETE", value: "C30/37 GRADE" },
  { label: "REBAR_SPEC", value: "Fe500D TMT STEEL" },
  { label: "SAFETY_LVL", value: "OSHA_AUTHORITATIVE" },
];

export interface TechnicalMetadataProps {
  label?: string;
  value?: string;
  timestamp?: string;
  isBackground?: boolean;
}

export function TechnicalMetadata({ 
  label, 
  value, 
  timestamp,
  isBackground = false 
}: TechnicalMetadataProps) {
  if (!isBackground && (label || value || timestamp)) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-black opacity-20"></div>
                <span className="text-[10px] font-mono tracking-[0.4em] opacity-40 uppercase">{label}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-black/10 pb-4">
                <h4 className="text-xl font-bold tracking-tighter uppercase">{value}</h4>
                <span className="text-[10px] font-mono opacity-20">{timestamp}</span>
            </div>
        </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none p-6 md:p-12 mix-blend-difference">
      {/* Corner Brackets */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/40" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/40" />
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/40" />
      <div className="absolute bottom-24 right-12 w-8 h-8 border-b border-r border-white/40" />

      {/* Floating Labels */}
      <div className="flex flex-col gap-8 mt-24">
        {METADATA_ITEMS.map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            className="flex flex-col gap-1"
          >
            <span className="text-[10px] font-mono text-white/40 tracking-[0.2em]">{item.label}</span>
            <span className="text-[11px] font-mono text-white/70 uppercase">{item.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Vertical Scale Bar */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 h-64 justify-center">
        <div className="w-[1px] h-full bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-12 bg-white/40"
          />
        </div>
        <div className="text-[9px] font-mono text-white/30 rotate-90 whitespace-nowrap tracking-widest">
          SYSTEM_SCAN_ACTIVE
        </div>
      </div>
    </div>
  );
}
