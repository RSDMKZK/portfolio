"use client"

import React, { useState, useRef } from "react"
import { Volume2, VolumeX, Play, Pause, Video, Eye, EyeOff } from "lucide-react"

interface BackgroundVideoProps {
  videoSrc?: string
  overlayOpacity?: number
}

// Royalty-free dark aesthetic tech video loop fallbacks
const DEFAULT_BG_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-data-31682-large.mp4"
const ALT_BG_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-technology-loop-41553-large.mp4"

export default function BackgroundVideo({
  videoSrc = "/hero-bg.mp4",
  overlayOpacity = 0.65,
}: BackgroundVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showVideo, setShowVideo] = useState(true)
  const [opacity, setOpacity] = useState(overlayOpacity)
  const videoRef = useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay deferred:", err)
          setIsPlaying(false)
        })
    }
  }, [videoSrc, isMuted])

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background Video */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 filter brightness-90 saturate-125"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={DEFAULT_BG_VIDEO} type="video/mp4" />
          <source src={ALT_BG_VIDEO} type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay with Configurable Opacity for Text Readability */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: opacity }}
      />

      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />

      {/* Floating Interactive Video Control Pill (bottom-right of Hero) */}
      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-30 pointer-events-auto flex items-center gap-1 sm:gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 p-1 sm:p-2 rounded-full shadow-2xl transition-all scale-90 sm:scale-100 origin-bottom-right">
        <button
          onClick={togglePlay}
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors text-white"
          title={isPlaying ? "Pause Background Video" : "Play Background Video"}
          aria-label={isPlaying ? "Pause Background Video" : "Play Background Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors text-white"
          title={isMuted ? "Unmute Background Sound" : "Mute Background Sound"}
          aria-label={isMuted ? "Unmute Background Sound" : "Mute Background Sound"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
        </button>

        <button
          onClick={() => setOpacity(prev => (prev >= 0.85 ? 0.35 : prev + 0.25))}
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors text-white"
          title="Adjust Background Contrast"
          aria-label="Adjust Background Contrast"
        >
          <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
        </button>

        <button
          onClick={() => setShowVideo(!showVideo)}
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors text-white"
          title={showVideo ? "Hide Video Background" : "Show Video Background"}
          aria-label={showVideo ? "Hide Video Background" : "Show Video Background"}
        >
          {showVideo ? <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />}
        </button>
      </div>
    </div>
  )
}
