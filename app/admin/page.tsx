'use client'

import { useState, useEffect, useMemo } from 'react'
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
} from 'lucide-react'
import Link from 'next/link'
import { ContactMessage, Testimonial } from '@/lib/supabase'

export default function AdminDashboardPage() {
  const [passkey, setPasskey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  // Data state
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(true)
  const [diagnostics, setDiagnostics] = useState<{ detectedUrlKey?: string | null; detectedAnonKey?: string | null } | null>(null)
  const [activeTab, setActiveTab] = useState<'messages' | 'testimonials'>('messages')

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all')

  // Selected message for details modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)

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
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/30 via-black to-blue-950/20" />

        <motion.div
          className="relative z-10 w-full max-w-md bg-zinc-950 border border-purple-500/40 rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/10">
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
                placeholder="Enter passkey (default: siba2025)"
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                autoFocus
              />
              <p className="text-[11px] text-gray-500 mt-2">
                Default key is <code className="text-purple-400 bg-purple-950/40 px-1 py-0.5 rounded">siba2025</code> (or configure via <code className="text-gray-400">ADMIN_SECRET_KEY</code>)
              </p>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-purple-600/25"
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
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">Abdullahi Siba</h1>
                <span className="text-[10px] font-mono uppercase bg-purple-950 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded-full">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-gray-400">Client Inquiries & Testimonials Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-gray-800 text-xs text-gray-300">
              <Database size={13} className={isSupabaseConnected ? 'text-emerald-400' : 'text-amber-400'} />
              <span>{isSupabaseConnected ? 'Supabase Connected' : 'Local Buffer Mode'}</span>
            </div>

            <button
              onClick={refreshData}
              disabled={isVerifying}
              className="p-2 rounded-lg bg-zinc-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh inbox"
            >
              <RefreshCw size={16} className={isVerifying ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 hover:bg-red-900/60 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-gray-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Inquiries</span>
              <Mail size={18} className="text-purple-400" />
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
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Mail size={16} />
            <span>Messages Inbox</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-600 text-white font-mono">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 pb-3 px-4 font-bold text-sm border-b-2 transition-colors cursor-pointer ${
              activeTab === 'testimonials'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Star size={16} />
            <span>Testimonials ({testimonials.length})</span>
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
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-gray-800 w-full sm:w-auto">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All ({messages.length})
                </button>
                <button
                  onClick={() => setStatusFilter('unread')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'unread' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  onClick={() => setStatusFilter('read')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === 'read' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
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
                        : 'bg-zinc-950 border-purple-500/40 shadow-lg shadow-purple-950/20 hover:border-purple-400'
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
                            msg.read ? 'bg-transparent border border-gray-600' : 'bg-purple-400 shadow-sm shadow-purple-400'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-base">{msg.name}</span>
                            <span className="text-xs text-gray-400 font-mono">({msg.email})</span>
                            {!msg.read && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                                New
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-purple-300 mt-0.5">{msg.subject}</h4>
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
                            <CheckCircle size={15} className={msg.read ? 'text-purple-400' : 'text-gray-500'} />
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
            <div className="p-4 rounded-xl bg-zinc-950 border border-gray-800 text-xs text-gray-400 flex items-center justify-between">
              <span>All testimonials currently saved in Supabase:</span>
              <Link href="/#testimonials" className="text-purple-400 hover:underline flex items-center gap-1">
                <span>View on portfolio</span>
                <ExternalLink size={12} />
              </Link>
            </div>

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
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40 font-semibold">
                        Published
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  </div>

                  <div className="border-t border-gray-900 pt-3">
                    <h5 className="font-bold text-white text-sm uppercase">{t.name}</h5>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              ))}
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
              className="relative w-full max-w-2xl bg-zinc-950 border border-purple-500/40 rounded-2xl p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
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
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest bg-purple-950/50 px-2.5 py-1 rounded-full border border-purple-800/40">
                  Client Message
                </span>
                <h2 className="text-2xl font-black text-white mt-3">{selectedMessage.subject}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
                  <span>From: <strong className="text-white">{selectedMessage.name}</strong></span>
                  <span>Email: <a href={`mailto:${selectedMessage.email}`} className="text-purple-400 hover:underline">{selectedMessage.email}</a></span>
                  {selectedMessage.created_at && (
                    <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-black border border-gray-800 text-gray-200 text-sm leading-relaxed whitespace-pre-wrap mb-6">
                {selectedMessage.message}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-900">
                <button
                  type="button"
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="px-4 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 size={15} />
                  <span>Delete Message</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleReadStatus(selectedMessage)}
                    className="px-4 py-2 rounded-xl border border-gray-800 hover:border-gray-700 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Mark as {selectedMessage.read ? 'Unread' : 'Read'}
                  </button>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-blue-500 flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all"
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
