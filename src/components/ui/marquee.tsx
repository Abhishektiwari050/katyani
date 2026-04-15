"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface MarqueeProps {
  items: string[]
  className?: string
  direction?: "left" | "right"
  scrollSpeed?: number // Now accepts a number for duration in seconds
}

export function Marquee({ items, className, direction = "left", scrollSpeed = 30 }: MarqueeProps) {
  const content = [...items, ...items, ...items, ...items] // Triple-stack for safety in long containers
  
  const from = direction === "left" ? "0%" : "-50%"
  const to = direction === "left" ? "-50%" : "0%"

  return (
    <div className={cn(
      "relative flex w-full overflow-hidden border-b border-t border-black/10 bg-white text-black font-sans uppercase",
      className
    )}>
      <motion.div 
        className="flex whitespace-nowrap py-12 shrink-0 select-none"
        animate={{ x: [from, to] }}
        transition={{
          duration: scrollSpeed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {content.map((item, id) => (
          <span key={id} className="mx-12 text-6xl md:text-8xl font-bold tracking-tighter shrink-0">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
