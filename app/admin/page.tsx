'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  Unlock,
  Mail,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  RefreshCw,
  LogOut,
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  Star,
  Eye,
  X,
  Send,
  AlertCircle,
  Database,
  Download,
  TrendingUp,
  BarChart3,
  Monitor,
  Smartphone,
  Globe2,
  Copy,
  Check,
  FileText,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { ContactMessage, Testimonial } from '@/lib/supabase'
import { AnalyticsSummary, CVDownloadEvent } from '@/lib/analyticsStore'

function parseDevice(ua?: string): { device: string; browser: string; isMobile: boolean } {
  if (!ua || ua === 'Unknown') return { device: 'Desktop', browser: 'Browser', isMobile: false }
  const isMobile = /mobile|iphone|ipod|android|ipad/i.test(ua)
  let browser = 'Browser'
  if (/edg/i.test(ua)) browser = 'Edge'
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua)) browser = 'Safari'
  const device = isMobile ? 'Mobile' : 'Desktop'
  return { device, browser, isMobile }
}

function formatSourceName(source: string): string {
  switch (source) {
    case 'cv_page_header':
      return 'CV Page (Header)'
    case 'cv_page_footer':
      return 'CV Page (Footer)'
    case 'cv_page':
      return 'CV Page'
    case 'cv_modal_top':
      return 'CV Modal (Top)'
    case 'cv_modal_bottom':
      return 'CV Modal (Bottom)'
    case 'cv_modal':
      return 'CV Modal'
    case 'about_section':
      return 'About Section'
    case 'admin_test_sim':
    case 'admin_test_click':
      return 'Admin Test Simulation'
    default:
      return source.replace(/_/g, ' ')
  }
}

function formatRelativeTime(dateStr: string): string {
  try {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
    return new Date(dateStr).toLocaleDateString()
  } catch {
    return dateStr
  }
}

export default function AdminDashboardPage() {
  const [passkey, setPasskey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  // Data state
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [cvAnalytics, setCvAnalytics] = useState<AnalyticsSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(true)
  const [diagnostics, setDiagnostics] = useState<{ detectedUrlKey?: string | null; detectedAnonKey?: string | null } | null>(null)
  const [activeTab, setActiveTab] = useState<'messages' | 'testimonials' | 'downloads'>('messages')

  // CV Analytics actions
  const [isRefreshingCv, setIsRefreshingCv] = useState(false)
  const [isTestingClick, setIsTestingClick] = useState(false)
  const [isClearingCv, setIsClearingCv] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)
  const [cvSearchQuery, setCvSearchQuery] = useState('')

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all')

  // Selected message for details modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [deletingTestimonialId, setDeletingTestimonialId] = useState<string | null>(null)
  const [isClearingAllTestimonials, setIsClearingAllTestimonials] = useState(false)

  // On mount, check existing session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('portfolio_admin_token')
    if (savedToken) {
      setPasskey(savedToken)
      verifyAndLoad(savedToken)
    }
  }, [])

  const verifyAndLoad = async (key: string) => {
    setIsVerifying(true)
    setAuthError(null)

    try {
      const res = await fetch('/api/messages', {
        headers: { 'x-admin-key': key },
      })

      if (res.status === 401) {
        setAuthError('Incorrect passkey. Please try again.')
        sessionStorage.removeItem('portfolio_admin_token')
        setIsAuthenticated(false)
        setIsVerifying(false)
        return
      }

      if (!res.ok) {
        throw new Error('Unable to connect to admin API')
      }

      const json = await res.json()
      setMessages(json.data || [])
      if (json.isConfigured !== undefined) {
        setIsSupabaseConnected(json.isConfigured)
      }
      if (json.diagnostics) {
        setDiagnostics(json.diagnostics)
      }

      // Also load testimonials
      try {
        const testRes = await fetch('/api/testimonials')
        if (testRes.ok) {
          const testJson = await testRes.json()
          setTestimonials(testJson.data || [])
        }
      } catch (e) {
        console.error('Failed to load testimonials:', e)
      }

      // Also load CV download analytics
      try {
        const cvRes = await fetch('/api/analytics/cv-download', {
          headers: { 'x-admin-key': key },
        })
        if (cvRes.ok) {
          const cvJson = await cvRes.json()
          setCvAnalytics(cvJson.data || null)
        }
      } catch (e) {
        console.error('Failed to load CV analytics:', e)
      }

      sessionStorage.setItem('portfolio_admin_token', key)
      setIsAuthenticated(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error'
      setAuthError(msg)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passkey.trim()) {
      setAuthError('Please enter your passkey')
      return
    }
    verifyAndLoad(passkey.trim())
  }

  const handleLogout = () => {
    sessionStorage.removeItem('portfolio_admin_token')
    setIsAuthenticated(false)
    setPasskey('')
    setMessages([])
    setTestimonials([])
    setCvAnalytics(null)
  }

  const refreshCvAnalytics = async () => {
    setIsRefreshingCv(true)
    const token = sessionStorage.getItem('portfolio_admin_token') || passkey
    try {
      const cvRes = await fetch('/api/analytics/cv-download', {
        headers: { 'x-admin-key': token },
      })
      if (cvRes.ok) {
        const cvJson = await cvRes.json()
        setCvAnalytics(cvJson.data || null)
      }
    } catch (e) {
      console.error('Failed to refresh CV analytics:', e)
    } finally {
      setIsRefreshingCv(false)
    }
  }

  const handleTestTrackClick = async () => {
    setIsTestingClick(true)
    try {
      await fetch('/api/analytics/cv-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'cv_page_header',
          referrer: 'admin_test_sim',
        }),
      })
      await refreshCvAnalytics()
    } catch (e) {
      console.error('Failed to simulate CV download click:', e)
    } finally {
      setIsTestingClick(false)
    }
  }

  const handleClearCvAnalytics = async () => {
    if (!confirm('Are you sure you want to reset all CV download analytics? This will clear the click event history.')) {
      return
    }
    setIsClearingCv(true)
    const token = sessionStorage.getItem('portfolio_admin_token') || passkey
    try {
      const res = await fetch('/api/analytics/cv-download', {
        method: 'DELETE',
        headers: { 'x-admin-key': token },
      })
      if (res.ok) {
        await refreshCvAnalytics()
      }
    } catch (e) {
      console.error('Failed to clear CV analytics:', e)
    } finally {
      setIsClearingCv(false)
    }
  }

  const refreshData = () => {
    const token = sessionStorage.getItem('portfolio_admin_token') || passkey
    if (token) {
      verifyAndLoad(token)
    }
  }

  const toggleReadStatus = async (msg: ContactMessage) => {
    if (!msg.id) return
    setActionLoadingId(msg.id)
    const token = sessionStorage.getItem('portfolio_admin_token') || passkey
    const newStatus = !msg.read

    try {
      const res = await fetch('/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': token,
        },
        body: JSON.stringify({ id: msg.id, read: newStatus }),
      })

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: newStatus } : m))
        )
        if (selectedMessage?.id === msg.id) {
          setSelectedMessage((prev) => (prev ? { ...prev, read: newStatus } : null))
        }
      }
    } catch (err) {
      console.error('Failed to toggle read state:', err)
    } finally {
      setActionLoadingId(null)
    }
  }

  const deleteMessage = async (id?: string) => {
    if (!id) return
    if (!confirm('Are you sure you want to delete this message?')) return

    setActionLoadingId(id)
    const token = sessionStorage.getItem('portfolio_admin_token') || passkey

    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': token },
      })

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id))
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
      }
    } catch (err) {
      console.error('Failed to delete message:', err)
    } finally {
      setActionLoadingId(null)
    }
  }

  const deleteTestimonial = async (id?: string, name?: string) => {
    if (!id) return
    if (!confirm(`Are you sure you want to permanently delete the review from "${name || 'this client'}"? It will be removed from both the database and website.`)) {
      return
    }

    setDeletingTestimonialId(id)
    try {
      const res = await fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id))
      } else {
        const json = await res.json()
        alert(json.error || 'Failed to delete review')
      }
    } catch (err) {
      console.error('Failed to delete review:', err)
      alert('Error occurred while deleting review.')
    } finally {
      setDeletingTestimonialId(null)
    }
  }

  const clearAllTestimonials = async () => {
    if (testimonials.length === 0) return
    if (!confirm('Are you sure you want to permanently delete ALL reviews from the database? This cannot be undone.')) {
      return
    }

    setIsClearingAllTestimonials(true)
    try {
      const res = await fetch('/api/testimonials?all=true', {
        method: 'DELETE',
      })
      if (res.ok) {
        setTestimonials([])
      } else {
        const json = await res.json()
        alert(json.error || 'Failed to clear all reviews')
      }
    } catch (err) {
      console.error('Failed to clear reviews:', err)
      alert('Error occurred while clearing all reviews.')
    } finally {
      setIsClearingAllTestimonials(false)
    }
  }

  // Filtered messages
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      if (statusFilter === 'unread') return !m.read
      if (statusFilter === 'read') return m.read
      return true
    })
  }, [messages, searchQuery, statusFilter])

  const unreadCount = useMemo(() => {
    return messages.filter((m) => !m.read).length
  }, [messages])

  // If not authenticated, render passkey login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-black to-blue-950/20" />

        <motion.div
          className="relative z-10 w-full max-w-md bg-zinc-950 border border-blue-500/40 rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/10">
              <Lock size={30} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-1">Enter your admin passkey to view received inquiries</p>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Secret Passkey
              </label>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter admin passkey"
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-blue-600/25"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Unlock size={18} />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-900 text-center">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors p-1" title="Back to Portfolio">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">Abdullahi Siba</h1>
                <span className="text-[10px] font-mono uppercase bg-blue-950 border border-blue-500/40 text-blue-300 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-400">Client Inquiries & Testimonials Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-gray-800 text-xs text-gray-300">
              <Database size={13} className={isSupabaseConnected ? 'text-emerald-400' : 'text-amber-400'} />
              <span>{isSupabaseConnected ? 'Supabase Connected' : 'Local Buffer Mode'}</span>
            </div>

            <button
              onClick={refreshData}
              disabled={isVerifying}
              className="p-1.5 sm:p-2 rounded-lg bg-zinc-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh inbox"
            >
              <RefreshCw size={15} className={isVerifying ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 hover:bg-red-900/60 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-gray-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Inquiries</span>
              <Mail size={18} className="text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">{messages.length}</div>
            <p className="text-xs text-gray-500 mt-1">Direct from contact form</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950 border border-gray-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Unread Messages</span>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div className="text-3xl font-black text-amber-400">{unreadCount}</div>
            <p className="text-xs text-gray-500 mt-1">Pending review & response</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950 border border-gray-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Testimonials</span>
              <Star size={18} className="text-yellow-400" />
            </div>
            <div className="text-3xl font-black text-white">{testimonials.length}</div>
            <p className="text-xs text-gray-500 mt-1">Published reviews</p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('downloads')}
            className={`p-6 rounded-2xl bg-zinc-950 border text-left shadow-lg transition-all duration-200 cursor-pointer group ${
              activeTab === 'downloads'
                ? 'border-cyan-500/70 shadow-cyan-950/30'
                : 'border-cyan-500/30 hover:border-cyan-500/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">CV Downloads</span>
              <Download size={18} className="text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            </div>
            <div className="text-3xl font-black text-white flex items-baseline gap-2">
              <span>{cvAnalytics?.totalDownloads ?? 0}</span>
              {cvAnalytics && cvAnalytics.downloadsToday > 0 && (
                <span className="text-xs text-emerald-400 font-mono font-medium">+{cvAnalytics.downloadsToday} today</span>
              )}
            </div>
            <p className="text-xs text-cyan-300/80 mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              <span>Tracked click events</span>
            </p>
          </button>
        </div>

        {/* Supabase Status Banner */}
        {!isSupabaseConnected ? (
          <div className="mb-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1.5">
                <p className="font-bold text-sm text-amber-300">Supabase Credentials Needed</p>
                <p>
                  No Supabase database credentials detected on this server yet. Supported variable names:
                </p>
                <p className="text-amber-300/90 font-mono">
                  <code className="bg-black/50 px-1.5 py-0.5 rounded border border-amber-500/20">SUPABASE_URL</code> or <code className="bg-black/50 px-1.5 py-0.5 rounded border border-amber-500/20">NEXT_PUBLIC_SUPABASE_URL</code> &amp; <code className="bg-black/50 px-1.5 py-0.5 rounded border border-amber-500/20">SUPABASE_ANON_KEY</code> or <code className="bg-black/50 px-1.5 py-0.5 rounded border border-amber-500/20">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                </p>
                <p className="text-amber-200/80 mt-1">
                  💡 <strong>Vercel Tip:</strong> After adding or updating variables in Vercel Settings &rarr; Environment Variables, go to <strong>Deployments &rarr; [Latest] &rarr; ... &rarr; Redeploy</strong> for them to take effect.
                </p>
              </div>
            </div>
          </div>
        ) : (
          diagnostics?.detectedUrlKey && (
            <div className="mb-8 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                <span>Supabase connected using environment variable: <strong className="font-mono text-white">{diagnostics.detectedUrlKey}</strong></span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40">Active</span>
            </div>
          )
        )}

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 pb-3 px-4 font-bold text-sm border-b-2 transition-colors cursor-pointer ${
              activeTab === 'messages'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Mail size={16} />
            <span>Messages Inbox</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-600 text-white font-mono">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 pb-3 px-4 font-bold text-sm border-b-2 transition-colors cursor-pointer ${
              activeTab === 'testimonials'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Star size={16} />
            <span>Testimonials ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center gap-2 pb-3 px-4 font-bold text-sm border-b-2 transition-colors cursor-pointer ${
              activeTab === 'downloads'
                ? 'border-cyan-500 text-cyan-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Download size={16} className={activeTab === 'downloads' ? 'text-cyan-400' : ''} />
            <span>CV Downloads</span>
            {cvAnalytics && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-950 border border-cyan-700/50 text-cyan-300 font-mono">
                {cvAnalytics.totalDownloads}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: Messages Inbox */}
        {activeTab === 'messages' && (
          <div>
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-gray-800 w-full sm:w-auto">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All ({messages.length})
                </button>
                <button
                  onClick={() => setStatusFilter('unread')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'unread' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  onClick={() => setStatusFilter('read')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'read' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Read ({messages.length - unreadCount})
                </button>
              </div>
            </div>

            {/* Messages List */}
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-gray-800">
                <Mail size={36} className="mx-auto text-gray-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-300">No messages found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {searchQuery ? 'Try adjusting your search filters.' : 'When clients reach out, their messages will appear here.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    layout
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      msg.read
                        ? 'bg-zinc-950/60 border-gray-800/80 hover:border-gray-700'
                        : 'bg-zinc-950 border-blue-500/40 shadow-lg shadow-blue-950/20 hover:border-blue-400'
                    }`}
                    onClick={() => {
                      setSelectedMessage(msg)
                      if (!msg.read) toggleReadStatus(msg)
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                            msg.read ? 'bg-transparent border border-gray-600' : 'bg-blue-400 shadow-sm shadow-blue-400'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-base">{msg.name}</span>
                            <span className="text-xs text-gray-400 font-mono">({msg.email})</span>
                            {!msg.read && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                                New
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-blue-300 mt-0.5">{msg.subject}</h4>
                          <p className="text-xs text-gray-400 line-clamp-2 mt-1 max-w-3xl leading-relaxed">
                            {msg.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-900">
                        {msg.created_at && (
                          <span className="text-[11px] text-gray-500 font-mono">
                            {new Date(msg.created_at).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                            className="p-2 rounded-lg bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                            title="Reply via email"
                          >
                            <Send size={15} />
                          </a>

                          <button
                            onClick={() => toggleReadStatus(msg)}
                            disabled={actionLoadingId === msg.id}
                            className="p-2 rounded-lg bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                            title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                          >
                            <CheckCircle size={15} className={msg.read ? 'text-blue-400' : 'text-gray-500'} />
                          </button>

                          <button
                            onClick={() => deleteMessage(msg.id)}
                            disabled={actionLoadingId === msg.id}
                            className="p-2 rounded-lg bg-zinc-900 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Testimonials List */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-gray-800 text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span>Reviews currently saved in Supabase ({testimonials.length}):</span>
              </div>
              <div className="flex items-center gap-3">
                {testimonials.length > 0 && (
                  <button
                    onClick={clearAllTestimonials}
                    disabled={isClearingAllTestimonials}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/50 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                    <span>{isClearingAllTestimonials ? 'Clearing...' : 'Delete All Reviews'}</span>
                  </button>
                )}
                <Link href="/#testimonials" className="text-blue-400 hover:underline flex items-center gap-1">
                  <span>View on portfolio</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>

            {testimonials.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-gray-800 rounded-2xl bg-zinc-950/50">
                <Star size={36} className="mx-auto text-gray-600 mb-2" />
                <h4 className="text-base font-bold text-white mb-1">No Reviews in Database</h4>
                <p className="text-gray-400 text-xs">All existing reviews have been removed. New client reviews submitted on the portfolio will appear here.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((t, idx) => (
                  <div key={t.id || idx} className="p-6 rounded-2xl bg-zinc-950 border border-gray-800 shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-700'}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40 font-semibold">
                            Published
                          </span>
                          <button
                            onClick={() => deleteTestimonial(t.id, t.name)}
                            disabled={deletingTestimonialId === t.id}
                            className="p-1.5 rounded-lg bg-red-950/30 border border-red-800/40 text-red-400 hover:text-red-300 hover:bg-red-900/50 transition-colors cursor-pointer disabled:opacity-50"
                            title="Delete this review permanently"
                          >
                            {deletingTestimonialId === t.id ? (
                              <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={13} />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                    </div>

                    <div className="border-t border-gray-900 pt-3">
                      <h5 className="font-bold text-white text-sm uppercase">{t.name}</h5>
                      <div className="flex items-center justify-between text-gray-400 text-xs mt-1">
                        <span>{t.role}</span>
                        {t.email && (
                          <a
                            href={`mailto:${t.email}`}
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono text-[11px] hover:underline"
                            title={`Email ${t.name}: ${t.email}`}
                          >
                            <Mail size={12} />
                            <span>{t.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CV Download Analytics */}
        {activeTab === 'downloads' && (
          <div className="space-y-6">
            {/* Action & Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>CV Download Analytics</span>
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-cyan-950 border border-cyan-700/40 text-cyan-300 font-mono">
                      Live Tracker
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Real-time click events recorded every time a guest clicks &quot;Download PDF&quot;
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestTrackClick}
                  disabled={isTestingClick}
                  className="px-3 py-2 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-700/50 text-cyan-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  title="Simulate a download click event to test live tracking"
                >
                  <Sparkles size={14} className={isTestingClick ? 'animate-spin' : 'text-cyan-400'} />
                  <span>{isTestingClick ? 'Recording...' : 'Test Click Event'}</span>
                </button>

                <button
                  type="button"
                  onClick={refreshCvAnalytics}
                  disabled={isRefreshingCv}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-800 text-gray-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reload analytics data"
                >
                  <RefreshCw size={14} className={isRefreshingCv ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>

                <a
                  href="/cv.pdf"
                  download="Abdullahi_Mohammed_Siba_CV.pdf"
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  title="Download the current CV PDF directly"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={handleClearCvAnalytics}
                  disabled={isClearingCv}
                  className="px-3 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Clear all recorded download events"
                >
                  <Trash2 size={13} />
                  <span>{isClearingCv ? 'Clearing...' : 'Reset'}</span>
                </button>
              </div>
            </div>

            {/* Quick Analytics Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-cyan-500/20 shadow-md">
                <div className="flex items-center justify-between mb-1.5 text-xs text-gray-400 font-semibold uppercase">
                  <span>Total Downloads</span>
                  <Download size={16} className="text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-white">{cvAnalytics?.totalDownloads ?? 0}</div>
                <p className="text-[11px] text-gray-500 mt-1">Lifetime click events logged</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/20 shadow-md">
                <div className="flex items-center justify-between mb-1.5 text-xs text-gray-400 font-semibold uppercase">
                  <span>Past 24 Hours</span>
                  <Clock size={16} className="text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">{cvAnalytics?.downloadsToday ?? 0}</div>
                <p className="text-[11px] text-gray-500 mt-1">Downloads today</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 shadow-md">
                <div className="flex items-center justify-between mb-1.5 text-xs text-gray-400 font-semibold uppercase">
                  <span>Past 7 Days</span>
                  <TrendingUp size={16} className="text-blue-400" />
                </div>
                <div className="text-3xl font-black text-blue-400">{cvAnalytics?.downloadsThisWeek ?? 0}</div>
                <p className="text-[11px] text-gray-500 mt-1">Weekly momentum</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-purple-500/20 shadow-md">
                <div className="flex items-center justify-between mb-1.5 text-xs text-gray-400 font-semibold uppercase">
                  <span>Top Trigger Source</span>
                  <Globe2 size={16} className="text-purple-400" />
                </div>
                <div className="text-lg font-bold text-purple-300 truncate">
                  {cvAnalytics?.topSources?.[0]?.source
                    ? formatSourceName(cvAnalytics.topSources[0].source)
                    : 'N/A'}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  {cvAnalytics?.topSources?.[0]?.count ? `${cvAnalytics.topSources[0].count} downloads (${cvAnalytics.topSources[0].percentage}%)` : 'No events yet'}
                </p>
              </div>
            </div>

            {/* Sources Breakdown */}
            {cvAnalytics && cvAnalytics.topSources.length > 0 && (
              <div className="p-6 rounded-2xl bg-zinc-950 border border-gray-800">
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-cyan-400" />
                  <span>Download Origin Breakdown</span>
                </h4>
                <div className="space-y-3">
                  {cvAnalytics.topSources.map((item) => (
                    <div key={item.source} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-300">
                          {formatSourceName(item.source)}
                        </span>
                        <span className="font-mono text-cyan-300">
                          {item.count} downloads ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(5, item.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Logs Table */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-gray-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock size={16} className="text-blue-400" />
                    <span>Recent Download Click Events</span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Individual user interactions with the &quot;Download PDF&quot; button
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Filter by source or device..."
                    value={cvSearchQuery}
                    onChange={(e) => setCvSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-black border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {(!cvAnalytics || cvAnalytics.recentEvents.length === 0) ? (
                <div className="p-8 text-center rounded-xl bg-black/50 border border-gray-900 text-gray-400 text-xs">
                  <Download size={32} className="mx-auto text-gray-600 mb-2" />
                  <p className="font-semibold text-gray-300">No download clicks recorded yet</p>
                  <p className="text-gray-500 mt-1">
                    Click &quot;Test Click Event&quot; above or visit the CV page and click &quot;Download PDF&quot; to test logging.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 font-semibold uppercase text-[10px]">
                        <th className="pb-3 px-3">#</th>
                        <th className="pb-3 px-3">Date & Time</th>
                        <th className="pb-3 px-3">Trigger Source</th>
                        <th className="pb-3 px-3">Device / Browser</th>
                        <th className="pb-3 px-3">Referrer</th>
                        <th className="pb-3 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-900">
                      {cvAnalytics.recentEvents
                        .filter((ev) => {
                          if (!cvSearchQuery) return true
                          const q = cvSearchQuery.toLowerCase()
                          return (
                            ev.source.toLowerCase().includes(q) ||
                            (ev.user_agent && ev.user_agent.toLowerCase().includes(q)) ||
                            (ev.referrer && ev.referrer.toLowerCase().includes(q))
                          )
                        })
                        .map((ev, idx) => {
                          const dev = parseDevice(ev.user_agent)
                          return (
                            <tr key={ev.id || idx} className="hover:bg-zinc-900/40 transition-colors">
                              <td className="py-3 px-3 font-mono text-gray-500">{idx + 1}</td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <div className="font-medium text-white">
                                  {new Date(ev.created_at).toLocaleDateString()} {new Date(ev.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div className="text-[10px] text-gray-500">
                                  {formatRelativeTime(ev.created_at)}
                                </div>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cyan-950/70 border border-cyan-700/50 text-cyan-300">
                                  <Download size={11} />
                                  <span>{formatSourceName(ev.source)}</span>
                                </span>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap text-gray-300">
                                <div className="flex items-center gap-1.5">
                                  {dev.isMobile ? (
                                    <Smartphone size={13} className="text-purple-400" />
                                  ) : (
                                    <Monitor size={13} className="text-blue-400" />
                                  )}
                                  <span>{dev.device}</span>
                                  <span className="text-gray-600">•</span>
                                  <span className="text-gray-400">{dev.browser}</span>
                                </div>
                              </td>
                              <td className="py-3 px-3 text-gray-400 max-w-[180px] truncate" title={ev.referrer || 'direct'}>
                                {ev.referrer || 'direct'}
                              </td>
                              <td className="py-3 px-3 text-right">
                                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                                  <CheckCircle size={12} />
                                  <span>Logged</span>
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Supabase Schema Migration Helper */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-gray-800">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database size={16} className="text-emerald-400" />
                    <span>Supabase SQL Table Integration (Optional)</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    The analytics tracker automatically persists to local storage. To additionally sync download events into your Supabase database in production, run this in your <strong>Supabase SQL Editor</strong>:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const sql = `CREATE TABLE IF NOT EXISTS cv_downloads (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  event TEXT NOT NULL DEFAULT 'cv_download',\n  source TEXT,\n  user_agent TEXT,\n  referrer TEXT,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL\n);`
                    navigator.clipboard.writeText(sql)
                    setCopiedSql(true)
                    setTimeout(() => setCopiedSql(false), 2000)
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-gray-800 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedSql ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black border border-gray-800 font-mono text-[11px] text-emerald-300/90 overflow-x-auto leading-relaxed">
                <span className="text-blue-400">CREATE TABLE IF NOT EXISTS</span> <span className="text-white">cv_downloads</span> (<br />
                &nbsp;&nbsp;id <span className="text-purple-400">UUID</span> <span className="text-blue-400">DEFAULT</span> gen_random_uuid() <span className="text-blue-400">PRIMARY KEY</span>,<br />
                &nbsp;&nbsp;event <span className="text-purple-400">TEXT</span> <span className="text-blue-400">NOT NULL DEFAULT</span> <span className="text-amber-300">&apos;cv_download&apos;</span>,<br />
                &nbsp;&nbsp;source <span className="text-purple-400">TEXT</span>,<br />
                &nbsp;&nbsp;user_agent <span className="text-purple-400">TEXT</span>,<br />
                &nbsp;&nbsp;referrer <span className="text-purple-400">TEXT</span>,<br />
                &nbsp;&nbsp;created_at <span className="text-purple-400">TIMESTAMP WITH TIME ZONE</span> <span className="text-blue-400">DEFAULT</span> timezone(<span className="text-amber-300">&apos;utc&apos;</span>::text, now()) <span className="text-blue-400">NOT NULL</span><br />
                );
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
            />

            <motion.div
              className="relative w-full max-w-2xl bg-zinc-950 border border-blue-500/40 rounded-2xl p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-800/40">
                  Client Message
                </span>
                <h2 className="text-2xl font-black text-white mt-3">{selectedMessage.subject}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
                  <span>From: <strong className="text-white">{selectedMessage.name}</strong></span>
                  <span>Email: <a href={`mailto:${selectedMessage.email}`} className="text-blue-400 hover:underline">{selectedMessage.email}</a></span>
                  {selectedMessage.created_at && (
                    <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-black border border-gray-800 text-gray-200 text-sm leading-relaxed whitespace-pre-wrap mb-6">
                {selectedMessage.message}
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-gray-900">
                <button
                  type="button"
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 size={15} />
                  <span>Delete Message</span>
                </button>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => toggleReadStatus(selectedMessage)}
                    className="px-4 py-2.5 rounded-xl border border-gray-800 hover:border-gray-700 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer text-center"
                  >
                    Mark as {selectedMessage.read ? 'Unread' : 'Read'}
                  </button>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold hover:from-blue-500 hover:to-cyan-500 flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 transition-all text-center"
                  >
                    <Send size={14} />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
