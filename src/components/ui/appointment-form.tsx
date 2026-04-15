"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AppointmentForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const metadata = [
    { label: "COORDINATES", value: "26.8467° N, 80.9462° E" },
    { label: "STUDIO REF", value: "KC-LKO-2024-X" },
    { label: "PRIORITY", value: "HIGH-FIDELITY" },
    { label: "PROTOCOL", value: "SECURE-LINK" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Metadata Side Panel */}
        <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32 space-y-12">
                <div>
                    <h4 className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40 mb-6">Inquiry Metadata</h4>
                    <div className="space-y-4">
                        {metadata.map((item) => (
                            <div key={item.label} className="flex justify-between border-b border-black/5 pb-2">
                                <span className="text-[9px] font-mono opacity-30">{item.label}</span>
                                <span className="text-[9px] font-mono font-bold tracking-wider">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-black text-white p-8 rounded-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-xs font-mono opacity-60 mb-2">// DIRECT ACCESS</p>
                        <p className="text-xl font-bold tracking-tighter leading-none italic">Book a Private Landmark Viewing</p>
                    </div>
                    {/* Decorative assembly lines */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-px h-full bg-white"></div>
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right: The High-End Form */}
        <div className="lg:col-span-8">
          <div className="mb-16">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
            >
                <div className="w-12 h-px bg-black/20"></div>
                <span className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40">Architectural Consultation</span>
            </motion.div>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.8] uppercase italic mb-6">
                Request <br/> <span className="text-black/10">Access</span>
            </h3>
            <p className="text-sm opacity-60 max-w-md">Our studio only takes on a limited number of high-fidelity projects per cycle. Share your vision to initiate protocol.</p>
          </div>
          
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FormField 
                label="Full Name" 
                placeholder="GENERATE IDENTIFIER" 
                isFocused={focusedField === "name"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
              <FormField 
                label="Digital Address" 
                placeholder="COMMUNICATION@DOMAIN.COM" 
                type="email"
                isFocused={focusedField === "email"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold opacity-40">Consultation Objective</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {["RESIDENTIAL", "COMMERCIAL", "LAND", "INTERIOR"].map((opt) => (
                        <button 
                            key={opt}
                            type="button"
                            className="py-4 border border-black/5 rounded-xl text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col space-y-4 group">
              <label className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">Vision Specifications</label>
              <textarea 
                placeholder="DESCRIBE THE CORE STRUCTURAL REQUIREMENTS..."
                rows={2}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className="bg-transparent border-b border-black/10 py-6 outline-none focus:border-black transition-all placeholder:text-black/10 text-xl font-bold tracking-tight resize-none h-auto overflow-hidden"
              />
            </div>

            <div className="flex items-center justify-between gap-8 pt-8">
                <div className="hidden md:block">
                    <p className="text-[10px] font-mono opacity-30">// SYSTEM READY</p>
                    <p className="text-[10px] font-mono opacity-30">// ALL DATA SECURED</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-16 py-8 bg-black text-white uppercase font-black tracking-[0.5em] text-xs hover:bg-neutral-800 transition-all shadow-2xl relative group"
                >
                  <span className="relative z-10">Initialize Protocols</span>
                  <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, placeholder, type = "text", isFocused, onFocus, onBlur }: any) {
    return (
        <div className="flex flex-col space-y-4 group">
            <div className="flex justify-between items-end">
                <label className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">{label}</label>
                <AnimatePresence>
                    {isFocused && (
                        <motion.span 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-2 h-2 bg-black rounded-full"
                        />
                    )}
                </AnimatePresence>
            </div>
            <input 
              type={type} 
              placeholder={placeholder}
              onFocus={onFocus}
              onBlur={onBlur}
              className="bg-transparent border-b border-black/10 py-6 outline-none focus:border-black transition-all placeholder:text-black/10 text-2xl font-black tracking-tighter"
            />
        </div>
    );
}
