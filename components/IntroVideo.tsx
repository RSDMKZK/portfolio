"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Play, Pause, SkipForward, Sparkles, Film } from "lucide-react"

interface IntroVideoProps {
  onComplete: () => void
  videoSrc?: string
}

// Royalty-free futuristic/tech video fallback URLs (can be overridden by public/intro.mp4)
const DEFAULT_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-technology-loop-41553-large.mp4"
const ALT_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-data-31682-large.mp4"

export default function IntroVideo({ onComplete, videoSrc }: IntroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const primarySrc = videoSrc || "/intro.mp4"

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay deferred, user interaction required:", err)
          setIsPlaying(false)
        })
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        const pct = (video.currentTime / video.duration) * 100
        setProgress(pct)
      }
    }

    const handleEnded = () => {
      onComplete()
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [onComplete, primarySrc])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black text-white overflow-hidden select-none"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted}
        className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-90"
      >
        <source src={primarySrc} type="video/mp4" />
        <source src={DEFAULT_VIDEO} type="video/mp4" />
        <source src={ALT_VIDEO} type="video/mp4" />
      </video>

      {/* Futuristic Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Header Bar inside Intro */}
      <div className="relative z-10 flex justify-between items-center px-6 py-6 md:px-12">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          <span className="text-xs md:text-sm font-semibold tracking-widest text-purple-200 uppercase">
            Experience Intro
          </span>
        </div>

        {/* Skip Button */}
        <button
          onClick={onComplete}
          className="group relative flex items-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold px-6 py-3 rounded-full border border-white/30 backdrop-blur-lg transition-all shadow-2xl overflow-hidden"
        >
          <span className="relative z-10 tracking-wider text-sm font-semibold">SKIP INTRO</span>
          <SkipForward className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Center Hero Branding */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 my-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-purple-500/20 border border-purple-400/40 backdrop-blur-md text-purple-300 text-xs md:text-sm font-medium tracking-widest uppercase"
        >
          <Film className="w-4 h-4 text-purple-300" />
          Interactive Portfolio Showcase
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400 mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
        >
          ABDULLAHI SIBA
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-2xl font-light tracking-wide text-gray-300 max-w-xl mb-8"
        >
          Agentic AI & Full Stack Developer
        </motion.p>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-10 flex flex-col gap-4 px-6 pb-8 md:px-12 max-w-5xl mx-auto w-full">
        {/* Animated Video Progress Bar */}
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden backdrop-blur-md relative cursor-pointer">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs md:text-sm text-gray-300">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/20"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/20 font-medium"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span>Unmute Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onComplete}
            className="text-purple-300 hover:text-white font-medium underline underline-offset-4 transition-colors"
          >
            Enter Main Site &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  )
}
