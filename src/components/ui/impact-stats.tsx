"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { label: "Years of Excellence", value: 15, suffix: "+", description: "Redetermining the Lucknow skyline since 2012." },
  { label: "Projects Delivered", value: 50, suffix: "+", description: "State-of-the-art residential and commercial benchmarks." },
  { label: "Happy Families", value: 1250, suffix: "+", description: "Creating communities that thrive and grow." },
  { label: "Area Developed", value: 15, suffix: "M+", description: "Square feet of architectural precision." },
];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export function ImpactStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      {STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col group"
        >
          <span className="text-7xl font-black tracking-tighter mb-4 flex items-baseline">
            <Counter value={stat.value} />
            <span className="text-4xl text-black/20 group-hover:text-black/40 transition-colors duration-500">{stat.suffix}</span>
          </span>
          <div className="border-t border-black/10 pt-4">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">{stat.label}</h4>
            <p className="text-sm text-black/50 leading-relaxed font-light">{stat.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

