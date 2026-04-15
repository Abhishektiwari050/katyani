"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ParallaxImage({ src, alt, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: 1.2 }} className="absolute inset-0 w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
        />
      </motion.div>
    </div>
  );
}
