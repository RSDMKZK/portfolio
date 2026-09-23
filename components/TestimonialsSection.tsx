'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Plus, X, CheckCircle, MessageSquareQuote, Loader2, Sparkles } from 'lucide-react'
import { Testimonial } from '@/lib/supabase'
import { DEFAULT_TESTIMONIALS } from '@/lib/defaultTestimonials'

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form State
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load testimonials from Supabase via API route
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/testimonials')
      if (res.ok) {
        const json = await res.json()
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setTestimonials(json.data)
        }
        if (json.isConfigured !== undefined) {
          setIsConfigured(json.isConfigured)
        }
      }
    } catch (err) {
      console.error('Failed to fetch testimonials:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) {
      setErrorMessage('Please provide both your name and review.')
      return
    }

    try {
      setSubmitting(true)
      setErrorMessage(null)

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim() || 'Client',
          rating,
          text: text.trim(),
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit review')
      }

      setSuccess(true)

      // Optimistically add to state
      if (json.data) {
        setTestimonials((prev) => [json.data, ...prev])
      }

      // Reset form after delay
      setTimeout(() => {
        setIsModalOpen(false)
        setSuccess(false)
        setName('')
        setRole('')
        setText('')
        setRating(5)
      }, 1800)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setErrorMessage(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="testimonials" className="py-16 sm:py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 zebra-bg pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4 text-center break-words"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            TESTIMONIALS
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Real feedback from clients, collaborators, and partners I&apos;ve had the privilege to work with.
          </motion.p>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm sm:text-base font-semibold hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} />
            <span>Leave a Review</span>
          </motion.button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id || `${testimonial.name}-${index}`}
              className="bg-black/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-purple-500/80 transition-all duration-300 hover-lift flex flex-col justify-between shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5) }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <MessageSquareQuote size={20} className="text-purple-400/40" />
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-gray-800/80 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base tracking-wide uppercase">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-xs font-mono tracking-wider mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
                {testimonial.created_at && (
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                    {new Date(testimonial.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setIsModalOpen(false)}
            />

            <motion.div
              className="relative w-full max-w-lg bg-zinc-950 border border-purple-500/40 rounded-2xl p-5 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={submitting}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={22} />
              </button>

              {success ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-400 max-w-xs">
                    Your testimonial has been submitted and added to the reviews.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Share Your Feedback</h3>
                      <p className="text-gray-400 text-xs">
                        Your review will be posted to the testimonials section.
                      </p>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Role or Company
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Founder, InnovateX / Client"
                        className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Rating *
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((starValue) => {
                          const isFilled = (hoverRating !== null ? hoverRating : rating) >= starValue
                          return (
                            <button
                              type="button"
                              key={starValue}
                              onClick={() => setRating(starValue)}
                              onMouseEnter={() => setHoverRating(starValue)}
                              onMouseLeave={() => setHoverRating(null)}
                              className="p-1 text-gray-600 hover:scale-110 transition-transform focus:outline-none"
                              aria-label={`${starValue} Star`}
                            >
                              <Star
                                size={24}
                                className={isFilled ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                              />
                            </button>
                          )
                        })}
                        <span className="text-xs text-gray-400 ml-2 font-mono">
                          {rating} / 5 Stars
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Your Testimonial *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="How was your experience working together? What were the standout results?"
                        className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        disabled={submitting}
                        className="px-5 py-2.5 rounded-xl border border-gray-800 text-gray-300 text-xs font-semibold hover:bg-gray-900 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-blue-500 shadow-md shadow-purple-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <span>Post Testimonial</span>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
