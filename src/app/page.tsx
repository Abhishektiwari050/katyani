"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ImpactStats } from "@/components/ui/impact-stats";
import { ServicesGrid } from "@/components/ui/services-grid";
import { AppointmentForm } from "@/components/ui/appointment-form";
import { HeroSection } from "@/components/ui/hero-section";
import { ParallaxImage } from "@/components/ui/parallax-image";

const PROJECTS = [
  {
    id: 1,
    title: "The Sterling Gate",
    location: "Gomti Nagar, Lucknow",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1400",
    rera: "UPRERAPRJ123456",
    status: "Ready to Move"
  },
  {
    id: 2,
    title: "Katyani Heights",
    location: "Vibhuti Khand, Lucknow",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1400",
    rera: "UPRERAPRJ789012",
    status: "Construction Mode"
  },
  {
    id: 3,
    title: "Zenith Residency",
    location: "Amar Shaheed Path, Lucknow",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1400",
    rera: "UPRERAPRJ345678",
    status: "Possession 2027"
  },
  {
    id: 4,
    title: "The Onyx",
    location: "Hazratganj, Lucknow",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1400",
    rera: "UPRERAPRJ901234",
    status: "Investment Grade"
  },
];

/* ——— Scroll-Reveal Philosophy Text ——— */
const PHILOSOPHY_WORDS = "WE DON'T JUST BUILD STRUCTURES. WE CRAFT LEGACIES THAT STAND THE TEST OF TIME AND TRENDS.".split(" ");

function ScrollRevealPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section 
      ref={containerRef}
      id="philosophy" 
      className="px-6 md:px-24 py-32 md:py-64 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-white/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-blue-500/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-sm uppercase tracking-[1em] text-white/40 mb-16"
        >
          {`[ OUR_FOUNDATION ]`}
        </motion.p>

        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]">
          {PHILOSOPHY_WORDS.map((word, i) => {
            const start = i / PHILOSOPHY_WORDS.length;
            const end = (i + 1) / PHILOSOPHY_WORDS.length;
            
            return (
              <motion.span
                key={i}
                style={{
                  opacity: useTransform(scrollYProgress, [start * 0.4, end * 0.6], [0.05, 1]),
                  y: useTransform(scrollYProgress, [start * 0.4, end * 0.6], [20, 0]),
                  filter: useTransform(scrollYProgress, [start * 0.4, end * 0.6], ["blur(10px)", "blur(0px)"]),
                }}
                className={word === "LEGACIES" ? "text-blue-400" : ""}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">
          {[
            { title: "SUSTAINABILITY", text: "Pioneering eco-conscious materials and engineering in Lucknow\u2019s landscape." },
            { title: "PRECISION", text: "Military-grade execution from foundation to the final stroke of luxury finish." },
            { title: "INNOVATION", text: "Integrating smart-home ecosystems into high-concept residential architecture." },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <h4 className="font-bold mb-6 tracking-[0.2em] text-xs text-white/40 group-hover:text-white transition-colors uppercase">0{i+1} // {pillar.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed font-light">{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden selection:bg-white selection:text-black">
      {/* Hero Section — Authoritative Construction Hub */}
      <HeroSection />

      {/* Marquee Section */}
      <section className="py-32 bg-white relative z-50">
        <Marquee
          items={["KATYANI CONSTRUCTIONS", "ENGINEERING EXCELLENCE", "3D_DESIGN_SOLVER", "STRUCTURAL_INTEGRITY", "LUXURY_LIVING"]}
          scrollSpeed={25}
        />
      </section>

      {/* Portfolio — Live Site Showcase */}
      <section id="projects" className="bg-white relative z-20">
        <div className="px-6 md:px-24 pt-24 pb-12">
            <span className="text-[10px] font-mono text-black/40 tracking-[0.5em] mb-4 block uppercase">Active_Development</span>
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-black">PROJECTS</h2>
        </div>

        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center mb-12">
              <span className="text-xs font-mono text-black/40 uppercase tracking-[0.4em] mb-4">Masterwork_01</span>
              <h1 className="text-3xl md:text-7xl font-bold tracking-tighter text-black">
                THE STERLING GATE
              </h1>
            </div>
          }
        >
          <div className="h-full w-full relative group bg-[#f5f5f5]">
            <ParallaxImage
              src={PROJECTS[0].image}
              alt={PROJECTS[0].title}
              className="w-full h-full"
            />
            {/* Overlay Specs */}
            <div className="absolute top-8 left-8 p-4 bg-black/80 text-white font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
               <span>LOCATION: GOMTI_NAGAR</span><br/>
               <span>STATUS: READY_TO_MOVE</span>
            </div>
          </div>
        </ContainerScroll>

        {/* Extended Grid */}
        <div className="px-6 md:px-24 py-24 bg-white grid grid-cols-1 md:grid-cols-2 gap-32">
          {PROJECTS.slice(1).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-12 border border-black/5 bg-[#fcfcfc]">
                <ParallaxImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-1000" />
              </div>
              <div className="flex justify-between items-start border-b border-black/10 pb-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-2 py-0.5 border border-black/20 text-[9px] font-mono opacity-50 uppercase">{project.location}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{project.status}</p>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter group-hover:translate-x-6 transition-transform duration-700">
                    {project.title}
                  </h3>
                </div>
                <span className="text-4xl font-light text-black/10 tabular-nums">0{project.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
              <div className="flex justify-between items-start border-b border-black/10 pb-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-2 py-0.5 border border-black/20 text-[9px] font-mono opacity-50 uppercase">{project.location}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{project.status}</p>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter group-hover:translate-x-6 transition-transform duration-700">
                    {project.title}
                  </h3>
                </div>
                <span className="text-4xl font-light text-black/10 tabular-nums">0{project.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Layer */}
      <section className="bg-white">
        <ImpactStats />
      </section>

      {/* Studio Capabilities Section */}
      <section id="studio" className="bg-[#050505] relative z-20">
        <div className="px-6 md:px-24 py-24 md:py-32 border-b border-white/5">
          <p className="text-[10px] md:text-sm uppercase tracking-[0.8em] text-white/30 mb-8 font-mono">{`[ CAPABILITIES_REPORT ]`}</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic text-white uppercase leading-none">STUDIO<br/>CAPABILITIES</h2>
        </div>
        <ServicesGrid />
      </section>

      {/* Philosophy Section */}
      <ScrollRevealPhilosophy />

      {/* Appointment Section */}
      <section id="contact" className="px-6 md:px-24 py-32 md:py-64 bg-white relative z-30">
        <AppointmentForm />
      </section>

      {/* Authoritative Footer */}
      <footer className="px-6 md:px-24 py-24 bg-white border-t border-black/5 relative z-30">
        <div className="flex flex-col items-center mb-32">
           <h2 className="text-[18vw] font-black tracking-tighter leading-none select-none opacity-[0.03] absolute top-0 pointer-events-none">KATYANI</h2>
           <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10">
              <div className="flex flex-col gap-8">
                 <span className="text-[10px] font-mono text-black/40 tracking-widest">HEAD_QUARTERS: LUCKNOW, IN</span>
                 <p className="text-lg font-light leading-relaxed text-black/60">
                    Katyani Constructions is committed to reshaping the architectural horizon through 
                    engineering precision and innovative design paradigms.
                 </p>
              </div>
              <div className="flex flex-col gap-12 items-end">
                 <div className="flex gap-12 font-mono text-[10px] tracking-widest font-bold">
                    {["INSTAGRAM", "LINKEDIN", "X"].map(link => (
                      <a key={link} href="#" className="hover:line-through">{link}</a>
                    ))}
                 </div>
                 <span className="text-2xl font-black tracking-tighter">INQUIRIES@KATYANI.COM</span>
              </div>
           </div>
        </div>
        <div className="w-full flex justify-between items-center pt-12 border-t border-black/5 opacity-40">
           <span className="text-[9px] font-mono tracking-widest uppercase">&copy; 2026 KATYANI_CONSTRUCTIONS_GROUP</span>
           <span className="text-[9px] font-mono tracking-widest uppercase">DESIGNED_BY_NEBULA_v4.2</span>
        </div>
      </footer>
    </div>
  );
}
