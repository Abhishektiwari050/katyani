"use client";

import type { ReactNode } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


export interface FrostedGlassWipeProps {
  from?: ReactNode;
  to?: ReactNode;
  transitionStart?: number;
  transitionDuration?: number;
  glassBlur?: number;
  speed?: number;
  className?: string;
}


function DefaultPanel({ label, color, textColor = "white" }: { label: string; color: string; textColor?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center font-bold font-sans text-center px-8 tracking-tighter text-[min(8vw,80px)]",
        color === "#FFFFFF" ? "bg-white" : "bg-black",
        textColor === "#000000" ? "text-black" : "text-white"
      )}
    >
      {label}
    </div>
  );
}

export function FrostedGlassWipe({
  from,
  to,
  transitionStart,
  transitionDuration = 30,
  glassBlur = 24,
  speed = 1,
  className,
}: FrostedGlassWipeProps) {
  const frame = useCurrentFrame() * speed;
  const { durationInFrames } = useVideoConfig();

  const start =
    typeof transitionStart === "number"
      ? transitionStart
      : Math.floor(durationInFrames * 0.4);

  const progress = interpolate(
    frame,
    [start, start + transitionDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.6, 0, 0.2, 1),
    },
  );

  const glassX = interpolate(progress, [0, 1], [-110, 110]);
  const showB = progress >= 0.5 ? 1 : 0;

  const fromContent = from ?? <DefaultPanel label="AESTHETIC" color="#FFFFFF" textColor="#000000" />;
  const toContent = to ?? <DefaultPanel label="CONSTRUCTION" color="#000000" textColor="#FFFFFF" />;

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
      <div className="absolute inset-0 opacity-100">
        {fromContent}
      </div>
      <div
        className={cn(
            "absolute inset-0 transition-opacity duration-0",
            showB ? "opacity-100" : "opacity-0"
        )}
      >
        {toContent}
      </div>
      <motion.div
        className="absolute inset-y-0 left-0 w-full bg-white/5 border-x border-white/20 [backdrop-filter:blur(var(--blur))] [webkit-backdrop-filter:blur(var(--blur))] will-change-transform"
        style={{
          transform: `translateX(${glassX}%)`,
          "--blur": `${glassBlur}px`,
        } as unknown as React.CSSProperties}
      />
    </div>
  );
}
