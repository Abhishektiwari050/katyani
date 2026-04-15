"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue, type MotionStyle } from "framer-motion"
import { cn } from "@/lib/utils"

type CursorType = "arrow-pointer" | "big-circle" | "ring-dot" | "circle-and-dot" | "glitch-effect" | "motion-blur"

interface CustomCursorProps {
  cursorType?: CursorType
  color?: string
  size?: number
  glitchColorB?: string
  glitchColorR?: string
}

export function CustomCursor({
  cursorType = "arrow-pointer",
  color = "#292927",
  size = 20,
}: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [fading, setFading] = useState(false)

  // Motion Values for high-performance tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring options for the "premium" 2026 feel
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const rotation = useMotionValue(0)
  const rotationSpring = useSpring(rotation, { damping: 20, stiffness: 150 })

  const lastCoords = useRef({ x: 0, y: 0 })

  useEffect(() => {
    document.body.classList.add("cursor-none")

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)

      // Calculate rotation based on velocity/direction
      const dx = event.clientX - lastCoords.current.x
      const dy = event.clientY - lastCoords.current.y
      
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        rotation.set(angle)
        
        if (!fading) {
          setFading(true)
          setTimeout(() => setFading(false), 50)
        }
      }

      lastCoords.current = { x: event.clientX, y: event.clientY }

      const target = event.target as HTMLElement
      const isInteractive = !!target.closest("a, button, [role='button'], .cursor-pointer")
      setIsHovering(isInteractive)

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.body.classList.remove("cursor-none")
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY, rotation, fading, isVisible])

  const baseClassName = "fixed top-0 left-0 pointer-events-none select-none z-[100] transition-opacity duration-300"

  const renderArrowPointer = () => (
    <motion.div
      className={cn(baseClassName, "w-[var(--size)] h-[var(--size)]")}
      style={{
        x: cursorX,
        y: cursorY,
        rotate: rotationSpring,
        opacity: isVisible ? 1 : 0,
        "--size": `${size}px`,
      } as MotionStyle}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-full h-full">
        <path
          d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
          fill="#F2F5F8"
        />
        <path
          d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z"
          fill={color}
        />
      </svg>
    </motion.div>
  )

  const renderBigCircle = () => (
    <motion.div
      className={cn(baseClassName, "rounded-full mix-blend-difference bg-white w-[var(--size)] h-[var(--size)]")}
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
        translateX: "-50%",
        translateY: "-50%",
        scale: isHovering ? 2.5 : 1,
        "--size": `${size * 2.5}px`,
      } as MotionStyle}
    />
  )

  const renderRingDot = () => {
    const currentSize = isHovering ? 40 : size
    return (
      <motion.div
        className={cn(baseClassName, "flex justify-center items-center rounded-full bg-transparent w-[var(--size)] h-[var(--size)] border-[1.25px] border-[var(--color)] shadow-[0_0_0_1px_#edf370]")}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          translateX: "-50%",
          translateY: "-50%",
          "--size": `${currentSize}px`,
          "--color": color,
        } as MotionStyle}
      >
        <div className="rounded-full w-1 h-1 bg-[var(--color)] shadow-[0_0_0_1px_#edf370]" />
      </motion.div>
    )
  }

  const renderGlitchEffect = () => (
    <motion.div
      className={cn(baseClassName, "bg-[#222] rounded-full invert w-[var(--size)] h-[var(--size)]")}
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
        translateX: "-50%",
        translateY: "-50%",
        "--size": `${isHovering ? 30 : 15}px`,
      } as MotionStyle}
    />
  )

  const renderCursor = () => {
    if (!isVisible) return null
    switch (cursorType) {
      case "big-circle": return renderBigCircle()
      case "ring-dot": return renderRingDot()
      case "glitch-effect": return renderGlitchEffect()
      default: return renderArrowPointer()
    }
  }

  return renderCursor()
}
