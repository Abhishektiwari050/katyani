"use client";

import React from "react";
import { motion } from "framer-motion";
import { TechnicalMetadata } from "@/components/ui/technical-metadata";
import { AssemblyTypography } from "@/components/ui/assembly-typography";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <TechnicalMetadata 
            label="PROTOCOL / ABOUT" 
            value="STUDIO PHILOSOPHY V1.0" 
            timestamp="EST. 2012"
          />
          <div className="mt-12">
            <AssemblyTypography 
              text="ARCHITECTING"
              className="text-7xl md:text-[12rem] font-black leading-[0.8] tracking-tighter italic"
            />
            <AssemblyTypography 
              text="TOMORROW"
              className="text-7xl md:text-[12rem] font-black leading-[0.8] tracking-tighter italic text-black/5"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="px-6 mb-48">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tighter italic">THE KATYANI <br/> VISION</h2>
            <p className="text-xl opacity-60 leading-relaxed font-medium">
              We don't just build structures; we architect experiences. Founded in 2012, Katyani Constructions has evolved from a local developer into a high-fidelity architectural studio focused on luxury landmarks in Lucknow.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12">
            <PhilosophyItem 
                id="01" 
                title="Structural Integrity" 
                description="Every landmark is stress-tested against the future. We use aerospace-grade engineering protocols for residential stability." 
            />
            <PhilosophyItem 
                id="02" 
                title="Aesthetic Precision" 
                description="Form follows feeling. Our designs prioritize the human emotional response to spatial volume and light." 
            />
            <PhilosophyItem 
                id="03" 
                title="Technological Core" 
                description="We integrate smart-grid technology and sustainable energy modules into the very skeleton of our buildings." 
            />
          </div>
        </div>
      </section>

      {/* Team / Studio Section */}
      <section id="team" className="px-6 bg-black text-white py-32 rounded-[3rem] mx-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40 mb-4 block">// THE STUDIO TEAM</span>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Collective <br/> intelligence</h3>
            </div>
            <p className="text-sm opacity-40 max-w-sm font-mono uppercase tracking-widest">
                A multidisciplinary team of architects, structural designers, and digital artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember name="A. Tiwari" role="CFO & VISIONARY" />
            <TeamMember name="V. Sharma" role="CHIEF ARCHITECT" />
            <TeamMember name="S. Gupta" role="STRUCTURAL LEAD" />
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-px h-full bg-white"></div>
            <div className="absolute top-0 left-2/4 w-px h-full bg-white"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-white"></div>
        </div>
      </section>
    </div>
  );
}

function PhilosophyItem({ id, title, description }: any) {
    return (
        <div className="group border-t border-black/5 pt-8">
            <div className="flex gap-8">
                <span className="text-xs font-mono opacity-20 group-hover:opacity-100 transition-opacity">[{id}]</span>
                <div className="space-y-4">
                    <h4 className="text-2xl font-bold tracking-tight uppercase group-hover:italic transition-all">{title}</h4>
                    <p className="text-sm opacity-60 leading-relaxed max-w-md">{description}</p>
                </div>
            </div>
        </div>
    );
}

function TeamMember({ name, role }: any) {
    return (
        <div className="p-12 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all duration-500 group">
            <div className="aspect-square bg-white/5 rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
                <span className="text-6xl font-black opacity-10 group-hover:opacity-100 transition-opacity">{name[0]}</span>
            </div>
            <p className="text-xs font-mono opacity-40 mb-2">{role}</p>
            <h4 className="text-2xl font-bold tracking-tighter uppercase">{name}</h4>
        </div>
    );
}
