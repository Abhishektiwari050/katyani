"use client";

import React from "react";
import { AppointmentForm } from "@/components/ui/appointment-form";
import { TechnicalMetadata } from "@/components/ui/technical-metadata";
import { AssemblyTypography } from "@/components/ui/assembly-typography";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-48">
      {/* Header */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <TechnicalMetadata 
            label="PROTOCOL / COMMUNICATION" 
            value="DIRECT CHANNEL V2.1" 
            timestamp="RESPONSE TIME: < 24H"
          />
          <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
                <AssemblyTypography 
                text="INITIATE"
                className="text-7xl md:text-[12rem] font-black leading-[0.8] tracking-tighter italic"
                />
                <AssemblyTypography 
                text="DIALOGUE"
                className="text-7xl md:text-[12rem] font-black leading-[0.8] tracking-tighter italic text-black/5"
                />
            </div>
            <p className="text-sm opacity-60 max-w-xs font-mono uppercase tracking-[0.2em] mb-4">
                Available for high-fidelity collaborations and landmark acquisitions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="px-6 mb-48">
        <AppointmentForm />
      </section>

      {/* Regional Headquarters */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40 mb-8 block">// HEADQUARTERS</span>
                <h2 className="text-5xl font-black tracking-tighter italic uppercase mb-12">LUCKNOW <br/> <span className="text-black/10">CENTRAL</span></h2>
                
                <div className="space-y-12">
                    <ContactDetail 
                        label="PRINCIPAL STUDIO" 
                        value="Gomti Nagar Extension, Lucknow, UP" 
                    />
                    <ContactDetail 
                        label="TELEMETRY" 
                        value="+91 522 400 0000" 
                    />
                    <ContactDetail 
                        label="ELECTRONIC MAIL" 
                        value="studio@katyani.com" 
                    />
                </div>
            </div>

            <div className="aspect-square bg-neutral-100 rounded-[4rem] overflow-hidden relative group">
                <img 
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" 
                    alt="Katyani Studio" 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                <div className="absolute inset-8 border border-white/20 rounded-[2.5rem] pointer-events-none"></div>
            </div>
        </div>
      </section>
    </div>
  );
}

function ContactDetail({ label, value }: any) {
    return (
        <div className="space-y-4">
            <p className="text-[10px] font-mono opacity-30 tracking-widest">{label}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
    );
}
