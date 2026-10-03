'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { productsData, ProductCaseStudy } from '@/lib/products'
import ProductHoverPreview, { ProductPreviewModal } from '@/components/ProductHoverPreview'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FlaskConical,
  GraduationCap,
  Hammer,
  Search,
  Eye,
} from 'lucide-react'

type FilterCategory = 'ALL' | 'AI' | 'WEB' | 'MOBILE' | 'LEGALTECH' | 'EDTECH' | 'FINTECH' | 'EXPERIMENTS'

const filterTabs: { label: string; value: FilterCategory }[] = [
  { label: 'ALL PRODUCTS (10)', value: 'ALL' },
  { label: 'FINTECH', value: 'FINTECH' },
  { label: 'EDTECH', value: 'EDTECH' },
  { label: 'AI', value: 'AI' },
  { label: 'LEGALTECH', value: 'LEGALTECH' },
  { label: 'MOBILE', value: 'MOBILE' },
  { label: 'EXPERIMENTS', value: 'EXPERIMENTS' },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredProduct, setHoveredProduct] = useState<ProductCaseStudy | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [pinnedModalProduct, setPinnedModalProduct] = useState<ProductCaseStudy | null>(null)

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Category filter
      let matchesCategory = true
      if (activeFilter === 'ALL') {
        matchesCategory = true
      } else if (activeFilter === 'AI') {
        matchesCategory = product.category === 'AI' || product.tags.includes('AI') || product.tags.includes('Google Gemini API')
      } else if (activeFilter === 'WEB') {
        matchesCategory = product.tags.includes('React') || product.tags.includes('Vite') || product.tags.includes('Web Application')
      } else if (activeFilter === 'MOBILE') {
        matchesCategory = product.category === 'MOBILE' || product.tags.includes('Flutter') || product.tags.includes('React Native')
      } else if (activeFilter === 'LEGALTECH') {
        matchesCategory = product.category === 'LEGALTECH'
      } else if (activeFilter === 'EDTECH') {
        matchesCategory = product.category === 'EDTECH'
      } else if (activeFilter === 'FINTECH') {
        matchesCategory = product.category === 'FINTECH'
      } else if (activeFilter === 'EXPERIMENTS') {
        matchesCategory = product.category === 'EXPERIMENTAL' || product.category === 'GAMING'
      }

      // Search query
      const matchesSearch =
        searchQuery === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.oneLineDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchQuery])

  const getStatusBadge = (status: ProductCaseStudy['status']) => {
    switch (status) {
      case 'LIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live / Production
          </span>
        )
      case 'ACADEMIC PROJECT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-300 border border-blue-500/30">
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            Academic Project
          </span>
        )
      case 'PROTOTYPE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-300 border border-blue-500/30">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            Working Prototype
          </span>
        )
      case 'IN DEVELOPMENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Hammer className="w-3.5 h-3.5 text-amber-400" />
            In Development
          </span>
        )
      case 'EXPERIMENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            Experiment
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-500/10 text-gray-300 border border-gray-500/30">
            Concept
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-blue-500/40 text-blue-300 hover:bg-blue-500/10 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Product & Platform Case Studies</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 text-white uppercase">
            Selected Work
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-normal mb-6">
            &ldquo;I don&apos;t just know how to code. I build products.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-3xl">
            A comprehensive breakdown of genuine production platforms, AI systems, legal technology workflows, and interactive applications built by Abdullahi Siba. Each project details real architecture, exact problems solved, and technical contributions.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.value
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search box & Hover hint */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Hover preview tooltip banner */}
        <div className="mt-4 flex items-center gap-2 text-xs text-blue-300/80 font-mono">
          <Eye className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>Hover over any card for a floating live product thumbnail preview</span>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-800 rounded-3xl">
            <p className="text-gray-400 text-lg">No products found matching your filter.</p>
            <button
              onClick={() => {
                setActiveFilter('ALL')
                setSearchQuery('')
              }}
              className="mt-4 px-6 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {filteredProducts.map((product, idx) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={(e) => {
                  setHoveredProduct(product)
                  setMousePosition({ x: e.clientX, y: e.clientY })
                  setIsPreviewVisible(true)
                }}
                onMouseMove={(e) => {
                  setMousePosition({ x: e.clientX, y: e.clientY })
                }}
                onMouseLeave={() => {
                  setIsPreviewVisible(false)
                }}
                className="group relative flex flex-col justify-between bg-zinc-950/80 border border-white/10 hover:border-blue-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_12px_48px_0_rgba(59,130,246,0.18)] hover:-translate-y-1"
              >
                <div>
                  {/* Top metadata bar */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-blue-400/80 font-mono">
                        {product.projectNumber}
                      </span>
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPinnedModalProduct(product)
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 hover:bg-blue-600/20 text-gray-300 hover:text-blue-300 border border-white/10 hover:border-blue-500/40 transition-colors cursor-pointer"
                        title="Interactive Preview"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        <span className="hidden sm:inline">Preview</span>
                      </button>
                      {getStatusBadge(product.status)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-blue-300 transition-colors tracking-tight mb-2">
                    {product.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed mb-6">
                    {product.subtitle}
                  </p>

                  {/* The 4 Core Questions Quick Summary */}
                  <div className="bg-black/60 border border-white/5 rounded-2xl p-4 sm:p-5 mb-6 space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-400 font-semibold uppercase tracking-wider text-[11px] block">
                        What It Is:
                      </span>
                      <p className="text-gray-200 leading-snug mt-0.5">{product.whatIsIt}</p>
                    </div>

                    <div>
                      <span className="text-gray-400 font-semibold uppercase tracking-wider text-[11px] block">
                        Problem Solved:
                      </span>
                      <p className="text-gray-200 leading-snug mt-0.5">{product.whatProblemDoesItSolve}</p>
                    </div>

                    <div>
                      <span className="text-blue-300 font-semibold uppercase tracking-wider text-[11px] block">
                        What Abdullahi Built:
                      </span>
                      <p className="text-gray-200 leading-snug mt-0.5">{product.whatDidAbdullahiBuild}</p>
                    </div>
                  </div>

                  {/* Tech stack badges with actual roles */}
                  <div className="mb-6">
                    <span className="text-xs uppercase font-bold tracking-wider text-gray-400 block mb-2">
                      Core Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.slice(0, 7).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {product.tags.length > 7 && (
                        <span className="px-2 py-1 rounded-md text-xs font-mono text-gray-400">
                          +{product.tags.length - 7} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4 mt-auto">
                  <div className="text-xs text-gray-400 font-medium">
                    <span>{product.year}</span> · <span>{product.role}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPinnedModalProduct(product)
                      }}
                      className="sm:hidden inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>Preview</span>
                    </button>

                    <Link
                      href={`/work/${product.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all group-hover:scale-105 active:scale-95"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      {/* Floating Interactive Hover Preview Component */}
      <ProductHoverPreview
        product={hoveredProduct}
        position={mousePosition}
        isVisible={isPreviewVisible}
      />

      {/* Pinned Modal Preview for Mobile or Explicit Click */}
      <ProductPreviewModal
        product={pinnedModalProduct}
        isOpen={!!pinnedModalProduct}
        onClose={() => setPinnedModalProduct(null)}
      />

      {/* Footer Banner */}
      <footer className="mt-24 pt-12 border-t border-white/10 max-w-7xl mx-auto px-4 sm:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Interested in building together?</h3>
          <p className="text-gray-400 text-sm">Open for production engineering and technical collaborations.</p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors"
          >
            Get In Touch
          </Link>
          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-white transition-colors"
          >
            Download CV
          </a>
        </div>
      </footer>
    </div>
  )
}
