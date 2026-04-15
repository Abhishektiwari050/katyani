"use client";

import React from "react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "CIVIL ENGINEERING",
    description: "Building the backbone of Lucknow with military-grade precision and high-performance materials.",
    icon: "01"
  },
  {
    title: "INTERIOR ARCHITECTURE",
    description: "Crafting bespoke living spaces that blend 2026 aesthetics with human-centric ergonomics.",
    icon: "02"
  },
  {
    title: "PROJECT CONSULTATION",
    description: "End-to-end strategic planning and market analysis for high-stake real estate investments.",
    icon: "03"
  },
  {
    title: "TURNKEY SOLUTIONS",
    description: "From virgin land to key handover—a seamless, zero-friction construction experience.",
    icon: "04"
  }
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border-t border-white/10">
      {SERVICES.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.8, delay: index * 0.15 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] text-white p-8 md:p-20 flex flex-col justify-between group hover:bg-white hover:text-black transition-all duration-700 border-r border-b border-white/5 active:bg-white active:text-black relative overflow-hidden"
        >
          {/* subtle background glow */}
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl group-hover:bg-black/5 transition-colors duration-700" />
          
          <span className="text-xs font-bold tracking-[0.5em] mb-12 text-white/30 group-hover:text-black/40 group-active:text-black/40 transition-colors duration-700 relative z-10">{service.icon}</span>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold tracking-tighter mb-6 group-hover:translate-x-4 group-active:translate-x-2 transition-transform duration-700 uppercase">{service.title}</h3>
            <p className="text-sm leading-loose text-white/50 group-hover:text-black/60 group-active:text-black/60 max-w-sm transition-colors duration-700">{service.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
