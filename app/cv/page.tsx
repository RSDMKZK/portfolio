'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Download,
  ExternalLink,
  ArrowLeft,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Eye,
  Layers,
  Check,
  Copy,
  Mail,
  Phone,
  Globe,
  Briefcase,
  GraduationCap,
  Sparkles,
} from 'lucide-react'
import { trackCvDownload } from '@/lib/trackCvDownload'

export default function CVPage() {
  const [currentPage, setCurrentPage] = useState<1 | 2 | 'all'>('all')
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [previewMode, setPreviewMode] = useState<'visual' | 'native'>('visual')
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const handlePrint = () => {
    const printWindow = window.open('/cv.pdf', '_blank')
    if (printWindow) {
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-800 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </Link>

            <div className="hidden sm:block h-5 w-[1px] bg-gray-800" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <FileText size={16} />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
                  Abdullahi Mohammed Siba
                </h1>
                <p className="text-[11px] text-gray-400">Curriculum Vitae • Full-Stack + AI Engineer</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center bg-zinc-900 border border-gray-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setPreviewMode('visual')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  previewMode === 'visual'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Eye size={13} />
                <span>Visual Preview</span>
              </button>
              <button
                onClick={() => setPreviewMode('native')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  previewMode === 'native'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>Embedded PDF</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-800 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-800 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <ExternalLink size={14} />
              <span>Open in Tab</span>
            </a>

            <a
              href="/cv.pdf"
              download="Abdullahi_Mohammed_Siba_CV.pdf"
              onClick={() => trackCvDownload('cv_page_header')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Sub-bar for page controls */}
        {previewMode === 'visual' && (
          <div className="bg-zinc-900/80 border-t border-gray-800/80 px-4 py-2">
            <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">View Mode:</span>
                <div className="flex items-center bg-black/60 border border-gray-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setCurrentPage('all')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    All Pages (Continuous)
                  </button>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === 1 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Page 1
                  </button>
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === 2 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Page 2
                  </button>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(60, z - 15))}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-zinc-800 border border-gray-800 text-gray-300 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="font-mono text-xs w-12 text-center text-gray-300">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(160, z + 15))}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-zinc-800 border border-gray-800 text-gray-300 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => setZoomLevel(100)}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-zinc-800 border border-gray-800 text-gray-400 hover:text-white cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Preview Container */}
      <main className="flex-1 py-8 px-4 sm:px-6 md:px-8 flex flex-col items-center">
        {previewMode === 'native' ? (
          <div className="w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-white">
            <object
              data="/cv.pdf"
              type="application/pdf"
              className="w-full h-full border-0"
            >
              <div className="p-12 text-center text-gray-800 flex flex-col items-center justify-center h-full">
                <FileText size={56} className="text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Native PDF Viewer</h3>
                <p className="text-sm text-gray-600 max-w-md mb-6">
                  Click below to switch to the visual preview or download the PDF directly.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setPreviewMode('visual')}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm"
                  >
                    Switch to Visual View
                  </button>
                  <a
                    href="/cv.pdf"
                    download="Abdullahi_Mohammed_Siba_CV.pdf"
                    className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-sm"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </object>
          </div>
        ) : (
          <div
            className="flex flex-col items-center gap-10 transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Page 1 */}
            {(currentPage === 1 || currentPage === 'all') && (
              <motion.div
                className="relative bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden max-w-[820px] w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-black/75 text-white font-mono text-[11px] backdrop-blur-sm">
                  Page 1 of 2
                </div>
                <img
                  src="/cv-page-1.png"
                  alt="Abdullahi Mohammed Siba CV Page 1"
                  className="w-full h-auto block select-none"
                />
              </motion.div>
            )}

            {/* Page 2 */}
            {(currentPage === 2 || currentPage === 'all') && (
              <motion.div
                className="relative bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden max-w-[820px] w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-black/75 text-white font-mono text-[11px] backdrop-blur-sm">
                  Page 2 of 2
                </div>
                <img
                  src="/cv-page-2.png"
                  alt="Abdullahi Mohammed Siba CV Page 2"
                  className="w-full h-auto block select-none"
                />
              </motion.div>
            )}
          </div>
        )}

        {/* Floating Quick Action Footer Card */}
        <div className="mt-12 w-full max-w-3xl p-6 rounded-2xl bg-zinc-950 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white text-base flex items-center justify-center sm:justify-start gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              <span>Need a custom copy or want to discuss a role?</span>
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Feel free to reach out directly via email or check out full project case studies.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-800 text-xs font-bold text-white transition-colors"
            >
              Contact Me
            </Link>
            <a
              href="/cv.pdf"
              download="Abdullahi_Mohammed_Siba_CV.pdf"
              onClick={() => trackCvDownload('cv_page_footer')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
