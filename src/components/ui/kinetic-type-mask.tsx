"use client";

import { type ReactNode, useId } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig, Video } from "remotion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


export interface KineticTypeMaskProps {
  from?: ReactNode;
  to?: ReactNode;
  text?: string;
  transitionStart?: number;
  holdFrames?: number;
  transitionDuration?: number;
  maxScale?: number;
  speed?: number;
  className?: string;
}


function DefaultPanel({ label, color, textColor = "white" }: { label: string; color: string; textColor?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center font-bold font-sans tracking-tighter leading-none text-[min(12vw,120px)]",
        color === "#FFFFFF" ? "bg-white" : "bg-black",
        textColor === "#000000" ? "text-black" : "text-white"
      )}
    >
      {label}
    </div>
  );
}

export function KineticTypeMask({
  from,
  to,
  text = "KATYANI",
  transitionStart,
  holdFrames = 12,
  transitionDuration = 24,
  maxScale = 120,
  speed = 1,
  className,
}: KineticTypeMaskProps) {
  const frame = useCurrentFrame() * speed;
  const { width, height, durationInFrames } = useVideoConfig();

  const start = transitionStart ?? Math.floor(durationInFrames * 0.3);
  const scaleStart = start + holdFrames;

  const scale = interpolate(
    frame,
    [scaleStart, scaleStart + transitionDuration],
    [1, maxScale],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.7, 0, 0.84, 0),
    },
  );

  const id = useId().replace(/[:#]/g, "");

  const fromContent = from ?? <DefaultPanel label="ARCHITECTING" color="#FFFFFF" textColor="#000000" />;
  const toContent = to ?? (
    <div className="absolute inset-0 bg-black">
      <Video 
        className="w-full h-full object-cover opacity-60"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerCities.mp4"
        volume={0}
      />
      <div className="absolute inset-0 flex items-center justify-center font-bold tracking-tighter text-white/90 leading-none" style={{ fontSize: `${Math.min(width / ("TOMORROW".length * 0.6), height * 0.7)}px` }}>
        TOMORROW
      </div>
    </div>
  );

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
      <div className="absolute inset-0">{fromContent}</div>

      {scale < maxScale * 0.95 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-black font-black font-sans pointer-events-none will-change-transform origin-center"
          style={{
            fontSize: `${Math.min(width / (text.length * 0.6), height * 0.7)}px`,
            transform: `scale(${scale})`,
          } as unknown as React.CSSProperties}
        >
          {text}
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: `url(#${id})`,
          WebkitClipPath: `url(#${id})`,
        } as React.CSSProperties}
      >
        <div className="absolute inset-0">{toContent}</div>
      </motion.div>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 pointer-events-none"
      >
        <defs>
          <clipPath id={id} clipPathUnits="userSpaceOnUse">
             <motion.text
              x={width / 2}
              y={height / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Inter, sans-serif"
              fontWeight={900}
              fontSize={Math.min(width / (text.length * 0.6), height * 0.7)}
              className="[transform:scale(var(--scale))] [transform-origin:var(--tx)_var(--ty)]"
              style={{
                "--scale": scale,
                "--tx": `${width / 2}px`,
                "--ty": `${height / 2}px`,
              } as unknown as React.CSSProperties}
            >
              {text}
            </motion.text>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
