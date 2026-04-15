"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechnicalMetadata } from "@/components/ui/technical-metadata";
import { ParallaxImage } from "@/components/ui/parallax-image";

const categories = ["ALL", "RESIDENTIAL", "COMMERCIAL", "LUXURY"];

const projects = [
    {
        id: "01",
        title: "The Crystal Wing",
        category: "LUXURY",
        location: "Lucknow West",
        image: "https://images.unsplash.com/photo-1600607687940-c52af04657b3?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "02",
        title: "Katyani Heights",
        category: "RESIDENTIAL",
        location: "Gomti Nagar",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "03",
        title: "Vector Plaza",
        category: "COMMERCIAL",
        location: "Hazratganj",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "04",
        title: "Ethereal Estates",
        category: "LUXURY",
        location: "Lucknow East",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2069&auto=format&fit=crop",
    },
    {
        id: "05",
        title: "Nexus One",
        category: "COMMERCIAL",
        location: "IT City",
        image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "06",
        title: "Azure Residences",
        category: "RESIDENTIAL",
        location: "Vrindavan Yojna",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
    }
];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredProjects = activeCategory === "ALL" 
        ? projects 
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen pt-32 pb-48">
            <section className="px-6 mb-24">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="flex-1">
                        <TechnicalMetadata label="INDEX / PORTFOLIO" value={`DISPLAYING ${filteredProjects.length} ARCHIVES`} timestamp="LAST MODIFIED: 15.04.26" />
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic mt-12 mb-8">
                            Selected <br/> <span className="text-black/10">Archives</span>
                        </h1>
                    </div>
                    
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 pb-4">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.3em] transition-all duration-500 border ${activeCategory === cat ? "bg-black text-white border-black" : "border-black/10 hover:border-black"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Grid */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden mb-6 relative">
                                    <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                                    <div className="w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700">
                                        <ParallaxImage src={project.image} alt={project.title} />
                                    </div>
                                    <div className="absolute bottom-8 left-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <p className="text-[10px] font-mono text-white tracking-[0.3em] mb-2">// COORDS: {idx+1}0.{idx+5}° N</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start px-2">
                                    <div>
                                        <p className="text-[10px] font-mono opacity-40 mb-1">{project.category} / {project.location}</p>
                                        <h3 className="text-2xl font-bold tracking-tighter uppercase group-hover:italic transition-all">{project.title}</h3>
                                    </div>
                                    <span className="text-xs font-mono opacity-20">[{project.id}]</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
