'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCaseStudy } from '@/lib/products'
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu,
  Layers,
  Flame,
  ShieldCheck,
  Calendar,
  Plane,
  Smartphone,
  Gamepad2,
  FileText,
  Activity,
  Code2,
  X,
  Eye,
  Maximize2
} from 'lucide-react'

// Simulated visual UI previews tailored for each of the 10 products
function ProductMockupScreen({ product }: { product: ProductCaseStudy }) {
  switch (product.slug) {
    case 'trioline-data':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Wallet Balance</span>
              <span className="text-base font-black text-white font-mono">₦148,250.00</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Paystack Live
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
            <div className="p-1.5 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-300">
              <Zap className="w-3.5 h-3.5 mx-auto mb-0.5 text-blue-400" />
              Airtime
            </div>
            <div className="p-1.5 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-300">
              <Activity className="w-3.5 h-3.5 mx-auto mb-0.5 text-cyan-400" />
              5G Data
            </div>
            <div className="p-1.5 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-300">
              <Cpu className="w-3.5 h-3.5 mx-auto mb-0.5 text-emerald-400" />
              Power
            </div>
            <div className="p-1.5 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-300">
              <FileText className="w-3.5 h-3.5 mx-auto mb-0.5 text-amber-400" />
              WAEC Pin
            </div>
          </div>

          <div className="p-2 rounded-lg bg-black/60 border border-white/5 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-gray-300 truncate">MTN 10GB SME Data Top-Up</span>
            </div>
            <span className="text-blue-300 font-mono shrink-0 ml-2">⚡ 0.4s</span>
          </div>
        </div>
      )

    case 'ai-collaborative-learning':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Gemini 2.5 Flash Engine
            </span>
            <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1 font-bold">
              <Flame className="w-3 h-3 text-amber-400" />
              450 XP · 5-Day Streak
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/30">
            <span className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold block mb-1">
              Active Recall Flashcard
            </span>
            <p className="text-[11px] text-white font-medium leading-snug">
              &quot;Explain the tradeoff between consistency and availability under network partitions.&quot;
            </p>
            <div className="mt-2 flex items-center justify-between pt-1 border-t border-blue-500/20 text-[10px]">
              <span className="text-gray-400">Knowledge Arena #4</span>
              <span className="text-emerald-400 font-semibold">[Click to Flip]</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Automated Quiz & Summary synthesized from PDF</span>
          </div>
        </div>
      )

    case 'legalconsult-ai':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[10px] font-mono text-purple-300 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Role: Attorney Workspace
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Confidential
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="p-2 rounded bg-black/60 border border-white/5">
              <span className="text-[10px] text-gray-400 block">Client Matter:</span>
              <span className="text-white font-semibold text-[11px]">Apex Ventures · IP Licensing Dispute</span>
            </div>
            <div className="p-2 rounded bg-blue-950/30 border border-blue-500/20 text-[11px]">
              <span className="text-blue-300 font-semibold block text-[10px] mb-0.5">AI Document Insight:</span>
              <p className="text-gray-300 line-clamp-2 leading-tight">
                Identified 3 jurisdiction clauses with ambiguity regarding arbitration venues in Section 14.
              </p>
            </div>
          </div>
        </div>
      )

    case 'court2you':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white">Court Locator & Filing Guide</span>
            <span className="text-[10px] font-mono text-blue-400">FCT Abuja</span>
          </div>

          <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-gray-300">
              <span>1. Affidavit of Means</span>
              <span className="text-emerald-400 font-mono">✓ Verified</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>2. Filing Fee Assessment</span>
              <span className="text-emerald-400 font-mono">✓ Ready</span>
            </div>
            <div className="flex items-center justify-between text-white font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                3. Registry Hearing Date
              </span>
              <span className="text-blue-300 font-mono">In Review</span>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 flex items-center justify-between">
            <span>Jurisdiction: High Court Division</span>
            <span className="text-cyan-400 font-mono">Courtroom 4</span>
          </div>
        </div>
      )

    case 'career-skill-mapper':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Target Career Role</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              88% Fit
            </span>
          </div>
          <div className="text-[12px] font-black text-white">Agentic AI & Full-Stack Architect</div>

          <div className="space-y-1.5 text-[10px] pt-1">
            <div>
              <div className="flex justify-between text-gray-300 mb-0.5">
                <span>React / Next.js Architecture</span>
                <span className="text-blue-300 font-mono">96%</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-gray-300 mb-0.5">
                <span>Multi-Model Agent Workflows</span>
                <span className="text-cyan-300 font-mono">84%</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
          </div>
        </div>
      )

    case 'legal-consultation-scheduler':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[10px] font-mono text-blue-300 font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Attorney Calendar Matrix
            </span>
            <span className="text-[10px] text-emerald-400">Conflict Checked</span>
          </div>

          <span className="text-[10px] text-gray-400 block">Available Consultations Today:</span>
          <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center">
            <span className="p-1 rounded bg-black/60 border border-gray-800 text-gray-500 line-through">09:00 AM</span>
            <span className="p-1 rounded bg-blue-600/30 border border-blue-500/50 text-white font-bold">11:30 AM</span>
            <span className="p-1 rounded bg-black/60 border border-white/10 text-gray-300">02:15 PM</span>
          </div>

          <div className="text-[10px] text-gray-400 flex items-center gap-1 pt-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Automated ICS calendar invites & SMS alerts</span>
          </div>
        </div>
      )

    case 'trioline-travel':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Plane className="w-3 h-3 text-cyan-400" />
              Trioline Travel Services
            </span>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
              Planned Package
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 space-y-1">
            <div className="text-white font-bold text-[12px]">Umrah & International Group Travel</div>
            <div className="text-[10px] text-gray-300">Route: Abuja / Lagos ➔ Jeddah ➔ Madinah</div>
            <div className="text-[10px] text-blue-300 font-mono pt-1">Verified Operator Integration · Visa Coordination</div>
          </div>
        </div>
      )

    case 'mobile-applications':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[10px] font-mono text-blue-300 flex items-center gap-1 font-bold">
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              Flutter & React Native Runtime
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">60 FPS</span>
          </div>

          <div className="p-2 rounded bg-black/70 border border-white/5 space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Biometric FaceID Auth</span>
              <span className="text-emerald-400 font-mono text-[10px]">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Offline SQLite Sync</span>
              <span className="text-cyan-400 font-mono text-[10px]">Synced</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Native Push Notifications</span>
              <span className="text-blue-300 font-mono text-[10px]">APNS/FCM</span>
            </div>
          </div>
        </div>
      )

    case 'game-development':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1 font-bold">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
              Knowledge Arena Engine
            </span>
            <span className="text-[10px] text-cyan-300 font-mono font-bold">COMBO x8! 🔥</span>
          </div>

          <div className="p-2.5 rounded bg-gradient-to-r from-blue-950/60 to-purple-950/40 border border-blue-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 block">Total Score</span>
              <span className="text-base font-black text-white font-mono">14,800 PTS</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-amber-300 font-bold block">Speed Multiplier</span>
              <span className="text-[11px] font-mono text-emerald-400">+2.5x Bonus</span>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 flex justify-between">
            <span>Deterministic Game Loop</span>
            <span className="text-blue-300">TypeScript / GSAP</span>
          </div>
        </div>
      )

    case 'experiments':
      return (
        <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/20 text-xs font-sans space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 font-bold">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              GSAP Flight Velocity Radar
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">60.0 FPS</span>
          </div>

          <div className="p-2 rounded bg-black/70 border border-white/5 space-y-1 font-mono text-[10px]">
            <div className="flex justify-between text-gray-300">
              <span>Scroll Scrub Timeline:</span>
              <span className="text-blue-400">68.4%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full" style={{ width: '68%' }} />
            </div>
            <div className="flex justify-between text-gray-400 pt-1">
              <span>Transform3D GPU Matrix</span>
              <span className="text-emerald-400">Zero Reflow</span>
            </div>
          </div>
        </div>
      )

    default:
      return (
        <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/20 text-xs text-gray-300">
          <p className="line-clamp-3">{product.oneLineDescription}</p>
        </div>
      )
  }
}

interface ProductHoverPreviewProps {
  product: ProductCaseStudy | null
  position: { x: number; y: number }
  isVisible: boolean
  onClose?: () => void
}

export default function ProductHoverPreview({
  product,
  position,
  isVisible,
}: ProductHoverPreviewProps) {
  const [activeTab, setActiveTab] = useState<'screen' | 'architecture'>('screen')

  if (!product || !isVisible) return null

  // Calculate safe window position so it stays in viewport
  // Typical preview width is ~360px, height ~380px
  const PREVIEW_WIDTH = 360
  const PREVIEW_HEIGHT = 400
  const OFFSET_X = 24
  const OFFSET_Y = 16

  let left = position.x + OFFSET_X
  let top = position.y - 120

  // Window bounds checking
  if (typeof window !== 'undefined') {
    if (left + PREVIEW_WIDTH > window.innerWidth - 20) {
      left = position.x - PREVIEW_WIDTH - OFFSET_X
    }
    if (left < 16) {
      left = 16
    }
    if (top + PREVIEW_HEIGHT > window.innerHeight - 20) {
      top = window.innerHeight - PREVIEW_HEIGHT - 20
    }
    if (top < 70) {
      top = 70
    }
  }

  return (
    <AnimatePresence>
      {isVisible && product && (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            left: `${left}px`,
            top: `${top}px`,
            zIndex: 60,
            pointerEvents: 'auto',
          }}
          className="w-[350px] sm:w-[370px] bg-zinc-950/95 backdrop-blur-2xl border border-blue-500/40 rounded-2xl p-4 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.35)] text-white"
        >
          {/* Mac-style Window Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[11px] font-mono text-gray-400 ml-2 truncate max-w-[170px]">
                {product.externalUrl ? product.externalUrl.replace('https://', '') : `preview://${product.slug}`}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {product.projectNumber}
              </span>
            </div>
          </div>

          {/* Product Header & Category */}
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-black text-white tracking-tight truncate">
                {product.title}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 shrink-0">
                {product.category}
              </span>
            </div>
            <p className="text-xs text-gray-300 line-clamp-2 mt-0.5 leading-snug">
              {product.oneLineDescription}
            </p>
          </div>

          {/* Quick Tab Switcher inside thumbnail: Simulated Screen vs Architecture Overview */}
          <div className="flex gap-1.5 p-1 bg-black/60 rounded-lg border border-white/5 mb-3 text-[10px] font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('screen')}
              className={`flex-1 py-1 rounded transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'screen'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>UI Snapshot</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`flex-1 py-1 rounded transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'architecture'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Architecture</span>
            </button>
          </div>

          {/* Preview Tab Content */}
          <div className="mb-3.5">
            {activeTab === 'screen' ? (
              <ProductMockupScreen product={product} />
            ) : (
              <div className="bg-slate-950 p-3 rounded-xl border border-blue-500/20 text-[11px] space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    What Abdullahi Built:
                  </span>
                  <p className="text-gray-200 line-clamp-2 leading-relaxed mt-0.5">
                    {product.whatDidAbdullahiBuild}
                  </p>
                </div>
                <div className="pt-1 border-t border-white/10 flex flex-wrap gap-1">
                  {product.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Direct Link Action buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            {product.externalUrl && (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 border border-white/10"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            )}

            <Link
              href={`/work/${product.slug}`}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
            >
              <span>Full Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Full pinned interactive modal for mobile tap or explicit desktop peek
export function ProductPreviewModal({
  product,
  isOpen,
  onClose,
}: {
  product: ProductCaseStudy | null
  isOpen: boolean
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<'screen' | 'architecture'>('screen')

  if (!isOpen || !product) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-lg bg-zinc-950 border border-blue-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_25px_70px_rgba(59,130,246,0.3)] text-white max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-gray-400 ml-2">
                {product.externalUrl ? product.externalUrl : `preview://${product.slug}`}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                {product.projectNumber} · {product.category}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">{product.title}</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/10 text-blue-300 border border-blue-500/30">
              {product.status}
            </span>
          </div>

          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Tab selector */}
          <div className="flex gap-2 p-1 bg-black/60 rounded-xl border border-white/5 mb-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('screen')}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'screen'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Simulated UI Snapshot</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'architecture'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Architecture & Stack</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === 'screen' ? (
              <ProductMockupScreen product={product} />
            ) : (
              <div className="bg-slate-950 p-4 rounded-2xl border border-blue-500/20 text-xs space-y-3">
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
                    Problem Solved:
                  </span>
                  <p className="text-gray-200 leading-relaxed">
                    {product.whatProblemDoesItSolve}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-blue-300 block mb-1">
                    What Abdullahi Built:
                  </span>
                  <p className="text-gray-200 leading-relaxed">
                    {product.whatDidAbdullahiBuild}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1.5">
                    Core Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 pt-3 border-t border-white/10">
            {product.externalUrl && (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 border border-white/10"
              >
                <span>Live Site</span>
                <ExternalLink className="w-4 h-4 text-blue-400" />
              </a>
            )}

            <Link
              href={`/work/${product.slug}`}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <span>Read Full Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
