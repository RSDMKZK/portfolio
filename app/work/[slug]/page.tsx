'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { productsData, ProductCaseStudy } from '@/lib/products'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Cpu,
  GraduationCap,
  Hammer,
  FlaskConical,
  Code2,
  Server,
  Database,
  Workflow,
  Sparkles,
  Share2,
} from 'lucide-react'

export default function ProjectCaseStudyPage() {
  const params = useParams()
  const slug = params?.slug as string

  const product = productsData.find((p) => p.slug === slug)

  if (!product) {
    return notFound()
  }

  // Find next and previous projects
  const currentIndex = productsData.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? productsData[currentIndex - 1] : productsData[productsData.length - 1]
  const nextProject = currentIndex < productsData.length - 1 ? productsData[currentIndex + 1] : productsData[0]

  const getStatusBadge = (status: ProductCaseStudy['status']) => {
    switch (status) {
      case 'LIVE':
        return (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live / Production Product
          </span>
        )
      case 'ACADEMIC PROJECT':
        return (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-300 border border-blue-500/30">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            Academic Research & Prototype
          </span>
        )
      case 'PROTOTYPE':
        return (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-300 border border-blue-500/30">
            <Cpu className="w-4 h-4 text-blue-400" />
            Functional Working Prototype
          </span>
        )
      case 'IN DEVELOPMENT':
        return (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Hammer className="w-4 h-4 text-amber-400" />
            In Development / Planned Product
          </span>
        )
      case 'EXPERIMENT':
        return (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <FlaskConical className="w-4 h-4 text-cyan-400" />
            Technical Experiment
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-500/10 text-gray-300 border border-gray-500/30">
            Product Concept
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white pb-32">
      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/work"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>All Products & Case Studies</span>
          </Link>

          <div className="flex items-center gap-3">
            {product.externalUrl && (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-gray-200 transition-colors"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <Link
              href="/contact"
              className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-500/40 text-blue-300 hover:bg-blue-500/10 transition-colors"
            >
              Contact Developer
            </Link>
          </div>
        </div>
      </header>

      {/* Case Study Container */}
      <article className="max-w-5xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20">
        {/* Section 14: Top Header Hierarchy */}
        <div className="mb-12 border-b border-white/10 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 font-mono text-sm tracking-widest text-blue-400 font-bold uppercase">
              <span>{product.projectNumber}</span>
              <span className="text-gray-600">/</span>
              <span>{product.category}</span>
            </div>
            {getStatusBadge(product.status)}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase mb-6 leading-tight">
            {product.title}
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-normal leading-relaxed max-w-4xl">
            {product.subtitle}
          </p>

          {/* Project Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10 text-xs sm:text-sm">
            <div>
              <span className="text-gray-500 uppercase font-mono tracking-wider block mb-1">Timeline</span>
              <span className="font-semibold text-white">{product.year}</span>
            </div>
            <div>
              <span className="text-gray-500 uppercase font-mono tracking-wider block mb-1">My Role</span>
              <span className="font-semibold text-white">{product.role}</span>
            </div>
            <div>
              <span className="text-gray-500 uppercase font-mono tracking-wider block mb-1">Category</span>
              <span className="font-semibold text-white">{product.categoryLabel.split('·')[0]}</span>
            </div>
            <div>
              <span className="text-gray-500 uppercase font-mono tracking-wider block mb-1">Status</span>
              <span className="font-semibold text-blue-300">{product.status}</span>
            </div>
          </div>
        </div>

        {/* Section 17: Product Storytelling - The 4 Core Questions */}
        <section className="mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-6">
            01 / Product Storytelling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                What Is It?
              </span>
              <p className="text-base text-gray-200 leading-relaxed pt-1">{product.whatIsIt}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                Who Is It For?
              </span>
              <p className="text-base text-gray-200 leading-relaxed pt-1">{product.whoIsItFor}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                What Problem Does It Solve?
              </span>
              <p className="text-base text-gray-200 leading-relaxed pt-1">{product.whatProblemDoesItSolve}</p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/10 md:pl-6">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-300 font-bold">
                What Did Abdullahi Build?
              </span>
              <p className="text-base text-blue-100 font-medium leading-relaxed pt-1">
                {product.whatDidAbdullahiBuild}
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-4">
            02 / Overview
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light">
            {product.overview}
          </p>
        </section>

        {/* The Problem & The Solution (Using page typography, not small cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 mb-24 py-12 border-y border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-4 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>The Problem</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Why this product exists</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {product.theProblem}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>The Solution</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">The architectural response</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {product.theSolution}
            </p>
          </div>
        </div>

        {/* Section 18: Product Architecture & System Flow */}
        <section className="mb-24">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <Workflow className="w-4 h-4" />
            <span>03 / System Architecture & Data Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">How the system coordinates</h2>

          <div className="space-y-4">
            {product.architectureFlow.map((flow, index) => (
              <div
                key={flow.step}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-zinc-950 border border-white/10 rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <span className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 font-mono text-xs font-bold flex items-center justify-center border border-blue-500/30">
                    {index + 1}
                  </span>
                  <span className="font-bold text-white text-base sm:text-lg">{flow.step}</span>
                </div>
                <div className="hidden sm:block text-gray-600 font-mono">→</div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{flow.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Features / Product Areas */}
        <section className="mb-24">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-3">
            04 / Implemented Capabilities & Product Areas
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-white mb-8">Primary functional areas</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.primaryAreas.map((area) => (
              <div
                key={area}
                className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/5"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed">{area}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 18: Technical Credibility - Connecting Technologies to Actual Responsibilities */}
        <section className="mb-24">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <Code2 className="w-4 h-4" />
            <span>05 / Technical Credibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Technology Stack & Engineering Duties</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-8">
            Technologies are tied directly to actual architecture responsibilities, not presented as static logos.
          </p>

          <div className="border border-white/10 rounded-3xl overflow-hidden bg-zinc-950 divide-y divide-white/10">
            {product.techStack.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-6 gap-2 sm:gap-6 hover:bg-white/5 transition-colors"
              >
                <div className="font-bold text-white font-mono text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {item.name}
                </div>
                <div className="sm:col-span-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                  {item.responsibility}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 14: My Role & Responsibilities */}
        <section className="mb-24">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-3">
            06 / My Contribution
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-white mb-8">Specific engineering responsibilities</h3>

          <ul className="space-y-4">
            {product.myRole.map((roleItem, i) => (
              <li key={i} className="flex items-start gap-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                <span className="w-6 h-6 rounded-lg bg-blue-900/40 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-1">
                  {i + 1}
                </span>
                <span>{roleItem}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Technical Challenges & Result / Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-24 pt-12 border-t border-white/10">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-8">
            <span className="text-xs font-mono uppercase font-bold tracking-widest text-amber-400 block mb-3">
              Engineering Challenges
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-4">Hard problems solved</h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{product.challenges}</p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-8">
            <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-400 block mb-3">
              Result & Current Status
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-4">Operational state</h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{product.resultStatus}</p>
          </div>
        </div>

        {/* Navigation between case studies */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/work/${prevProject.slug}`}
            className="w-full sm:w-auto flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[11px] font-mono text-gray-500 uppercase block">Previous Case Study</span>
              <span className="text-sm font-bold text-white">{prevProject.title}</span>
            </div>
          </Link>

          <Link
            href="/work"
            className="text-xs font-mono text-gray-400 hover:text-white uppercase tracking-wider py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
          >
            View All 10 Products
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-right transition-colors group"
          >
            <div>
              <span className="text-[11px] font-mono text-gray-500 uppercase block">Next Case Study</span>
              <span className="text-sm font-bold text-white">{nextProject.title}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>
    </div>
  )
}
