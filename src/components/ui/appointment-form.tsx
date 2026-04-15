"use client";

import React from "react";
import { motion } from "framer-motion";

export function AppointmentForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-12">
        <h3 className="text-4xl font-bold tracking-tighter mb-4 italic">INQUIRY / BOOKING</h3>
        <p className="text-sm opacity-60">Schedule a private viewing or project consultation with our Studio team.</p>
      </div>
      
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-2 group">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">Full Name</label>
            <input 
              type="text" 
              placeholder="NAME SURNAME"
              className="bg-transparent border-b border-black/10 py-4 outline-none focus:border-black transition-colors placeholder:text-black/10 text-xl font-medium tracking-tight"
            />
          </div>
          <div className="flex flex-col space-y-2 group">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">Email Address</label>
            <input 
              type="email" 
              placeholder="EMAIL@DOMAIN.COM"
              className="bg-transparent border-b border-black/10 py-4 outline-none focus:border-black transition-colors placeholder:text-black/10 text-xl font-medium tracking-tight"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 group">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">Interested In</label>
          <select 
            title="Interested In"
            aria-label="Interested In"
            className="bg-transparent border-b border-black/10 py-4 outline-none focus:border-black transition-colors text-xl font-medium tracking-tight appearance-none cursor-none"
          >
            <option>RESIDENTIAL PROJECT</option>
            <option>COMMERCIAL SPACE</option>
            <option>LAND ACQUISTION</option>
            <option>INTERIOR DESIGN</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2 group">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">Message</label>
          <textarea 
            placeholder="DETAILS OF YOUR VISION"
            rows={1}
            className="bg-transparent border-b border-black/10 py-4 outline-none focus:border-black transition-colors placeholder:text-black/10 text-xl font-medium tracking-tight resize-none h-auto overflow-hidden"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-black text-white py-8 uppercase font-bold tracking-[0.5em] text-xs mt-12 hover:bg-neutral-900 transition-colors"
        >
          Request Access
        </motion.button>
      </form>
    </div>
  );
}
