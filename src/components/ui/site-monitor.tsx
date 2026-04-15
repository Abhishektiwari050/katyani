"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOG_MESSAGES = [
  "LEVEL_04: REBARLOCKING_FE550D_COMPLETE",
  "SITE_01: M40_CONCRETE_POUR_INITIATED",
  "SENSOR_7: LOAD_STABILITY: 104.2%",
  "WIND_VAR: 12knots_STABLE",
  "SYSTEM: CORE_ASSEMBLY_v2.5_ACTIVE",
  "MATERIAL: TMT_BATCH_B21_VERIFIED",
  "COORD: 28.6139_N_77.2090_E",
  "STATUS: STRUCTURAL_SOLVE_OPTIMIZED"
];

export function SiteMonitor() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        return [nextLog, ...prev.slice(0, 5)];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 font-mono text-[9px] text-white/40 tracking-wider">
      
      {/* 1. Live Site Feed */}
      <div className="flex flex-col gap-2 bg-white/[0.02] border border-white/10 p-4 w-64">
        <div className="flex items-center justify-between mb-2">
           <span className="text-white">LIVE_SITE_FEED</span>
           <div className="w-1 h-1 bg-red-500 animate-pulse rounded-full" />
        </div>
        <div className="h-24 overflow-hidden flex flex-col gap-1">
          {logs.map((log, i) => (
            <motion.div 
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - i * 0.2, x: 0 }}
              className="whitespace-nowrap flex gap-2"
            >
              <span className="text-white/20">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit' })}]</span>
              {log}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Material Analytics */}
      <div className="flex flex-col gap-4 bg-white/[0.02] border border-white/10 p-4">
        <span className="text-white">MATERIAL_ANALYTICS</span>
        <div className="flex flex-col gap-3">
          <ProgressBar label="CONCRETE (M40)" progress={75} />
          <ProgressBar label="TMT STEEL (Fe550D)" progress={92} />
          <ProgressBar label="GLAZING (STRUCTURAL)" progress={14} />
        </div>
      </div>

      {/* 3. Site Environmental Data */}
      <div className="grid grid-cols-2 gap-2">
         <div className="border border-white/10 p-2 text-center">
            <div className="text-white">24°C</div>
            <div className="text-[7px]">TEMP_CURING</div>
         </div>
         <div className="border border-white/10 p-2 text-center">
            <div className="text-white">12kn</div>
            <div className="text-[7px]">WIND_LOAD</div>
         </div>
      </div>

    </div>
  );
}

function ProgressBar({ label, progress }: { label: string, progress: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[7px] text-white/60">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full h-[2px] bg-white/10 relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-white/40"
        />
      </div>
    </div>
  );
}
