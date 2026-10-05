'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  ExternalLink,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  Copy,
  Layers,
  Sparkles,
} from 'lucide-react'
import { trackCvDownload } from '@/lib/trackCvDownload'

interface CVViewerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CVViewerModal({ isOpen, onClose }: CVViewerModalProps) {
  const [currentPage, setCurrentPage] = useState<1 | 2 | 'all'>(1)
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [previewMode, setPreviewMode] = useState<'visual' | 'native'>('visual')
  const [copied, setCopied] = useState<string | null>(null)

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-5xl h-[92vh] bg-zinc-950 border border-blue-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25 }}
          >
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-800 bg-zinc-900/90 text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white leading-tight flex items-center gap-2">
                    <span>Abdullahi Mohammed Siba</span>
                    <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      CV / Resume
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">Full-Stack + AI Engineer • 2 Pages</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-2">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center bg-black/60 border border-gray-800 rounded-lg p-0.5 text-xs">
                  <button
                    onClick={() => setPreviewMode('visual')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      previewMode === 'visual'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title="Interactive high-res document view"
                  >
                    <Eye size={13} />
                    <span>Visual View</span>
                  </button>
                  <button
                    onClick={() => setPreviewMode('native')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      previewMode === 'native'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title="Browser Native PDF reader"
                  >
                    <Layers size={13} />
                    <span>PDF Object</span>
                  </button>
                </div>

                {/* Print */}
                <button
                  onClick={handlePrint}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-gray-200 text-xs font-semibold transition-colors cursor-pointer"
                  title="Print CV"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>

                {/* Open in new tab */}
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-gray-200 text-xs font-semibold transition-colors cursor-pointer"
                  title="Open PDF in new tab"
                >
                  <ExternalLink size={14} />
                  <span>New Tab</span>
                </a>

                {/* Download PDF button */}
                <a
                  href="/cv.pdf"
                  download="Abdullahi_Mohammed_Siba_CV.pdf"
                  onClick={() => trackCvDownload('cv_modal_top')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer active:scale-95"
                  title="Download full PDF"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Sub-bar: Page Navigation & Zoom (in visual mode) */}
            {previewMode === 'visual' && (
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-gray-800/80 text-xs text-gray-400 shrink-0">
                {/* Page Selectors */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 hidden xs:inline">Page:</span>
                  <div className="flex items-center bg-zinc-900 border border-gray-800 rounded-lg p-0.5">
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        currentPage === 1 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Page 1
                    </button>
                    <button
                      onClick={() => setCurrentPage(2)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        currentPage === 2 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Page 2
                    </button>
                    <button
                      onClick={() => setCurrentPage('all')}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        currentPage === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      All Pages
                    </button>
                  </div>

                  {currentPage !== 'all' && (
                    <div className="flex items-center gap-1 ml-1">
                      <button
                        onClick={() => setCurrentPage(currentPage === 1 ? 2 : 1)}
                        className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-gray-300 cursor-pointer"
                        title="Previous/Next Page"
                      >
                        {currentPage === 1 ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(60, z - 15))}
                    className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-gray-300 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="font-mono text-[11px] w-12 text-center text-gray-300">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(160, z + 15))}
                    className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-gray-300 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(100)}
                    className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-white cursor-pointer ml-1"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* Viewer Content Area */}
            <div className="flex-1 overflow-auto bg-neutral-900/90 p-4 sm:p-6 md:p-8 flex justify-center">
              {previewMode === 'native' ? (
                <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-2xl">
                  <object
                    data="/cv.pdf"
                    type="application/pdf"
                    className="w-full h-full border-0"
                  >
                    <div className="p-8 text-center text-gray-800 bg-white h-full flex flex-col items-center justify-center">
                      <FileText size={48} className="text-blue-600 mb-3" />
                      <h4 className="text-lg font-bold">PDF Preview</h4>
                      <p className="text-sm text-gray-600 max-w-sm mb-4">
                        Your browser doesn&apos;t support direct PDF embedding. Switch to Visual View or download the file.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setPreviewMode('visual')}
                          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold"
                        >
                          Switch to Visual View
                        </button>
                        <a
                          href="/cv.pdf"
                          download="Abdullahi_Mohammed_Siba_CV.pdf"
                          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold"
                        >
                          Download PDF
                        </a>
                      </div>
                    </div>
                  </object>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center gap-8 transition-transform duration-200 origin-top"
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Page 1 */}
                  {(currentPage === 1 || currentPage === 'all') && (
                    <div className="relative bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden max-w-[780px] w-full transition-all">
                      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px] backdrop-blur-sm">
                        Page 1 of 2
                      </div>
                      <img
                        src="/cv-page-1.png"
                        alt="Abdullahi Mohammed Siba CV Page 1"
                        className="w-full h-auto block select-none"
                      />
                    </div>
                  )}

                  {/* Page 2 */}
                  {(currentPage === 2 || currentPage === 'all') && (
                    <div className="relative bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden max-w-[780px] w-full transition-all">
                      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px] backdrop-blur-sm">
                        Page 2 of 2
                      </div>
                      <img
                        src="/cv-page-2.png"
                        alt="Abdullahi Mohammed Siba CV Page 2"
                        className="w-full h-auto block select-none"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Quick-Action Bar */}
            <div className="px-4 py-2.5 bg-zinc-950 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-3 text-gray-400 text-[11px] sm:text-xs">
                <span className="hidden sm:inline text-gray-500">Quick Contact:</span>
                <button
                  onClick={() => copyToClipboard('sibaabdullahi001@gmail.com', 'email')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copied === 'email' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span className="font-mono">sibaabdullahi001@gmail.com</span>
                </button>
                <span className="text-gray-700 hidden sm:inline">•</span>
                <button
                  onClick={() => copyToClipboard('+234 703 773 2220', 'phone')}
                  className="hidden md:flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer"
                  title="Copy phone"
                >
                  {copied === 'phone' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span className="font-mono">+234 703 773 2220</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/cv.pdf"
                  download="Abdullahi_Mohammed_Siba_CV.pdf"
                  onClick={() => trackCvDownload('cv_modal_bottom')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  <Download size={13} />
                  <span>Download (PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
