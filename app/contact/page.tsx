"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, ArrowLeft, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

const BACKGROUND_DOTS = [
  { left: "12%", top: "18%", duration: 4.2, delay: 0.5 },
  { left: "85%", top: "22%", duration: 3.8, delay: 1.2 },
  { left: "34%", top: "67%", duration: 4.6, delay: 0.2 },
  { left: "72%", top: "81%", duration: 3.5, delay: 1.8 },
  { left: "19%", top: "45%", duration: 4.1, delay: 0.9 },
  { left: "91%", top: "54%", duration: 3.9, delay: 1.5 },
  { left: "48%", top: "12%", duration: 4.8, delay: 0.3 },
  { left: "63%", top: "37%", duration: 3.6, delay: 1.1 },
  { left: "27%", top: "89%", duration: 4.4, delay: 0.7 },
  { left: "80%", top: "70%", duration: 3.7, delay: 1.9 },
  { left: "5%", top: "33%", duration: 4.0, delay: 0.4 },
  { left: "55%", top: "95%", duration: 4.5, delay: 1.3 },
  { left: "42%", top: "48%", duration: 3.4, delay: 0.8 },
  { left: "76%", top: "15%", duration: 4.7, delay: 1.6 },
  { left: "23%", top: "74%", duration: 3.8, delay: 0.1 },
  { left: "95%", top: "38%", duration: 4.3, delay: 1.4 },
  { left: "15%", top: "92%", duration: 3.9, delay: 0.6 },
  { left: "68%", top: "59%", duration: 4.9, delay: 1.7 },
  { left: "38%", top: "28%", duration: 3.5, delay: 0.9 },
  { left: "88%", top: "88%", duration: 4.1, delay: 1.0 },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit message")
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Keep success message visible for 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setErrorMessage(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {BACKGROUND_DOTS.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: dot.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-8">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors cursor-pointer inline-flex"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={24} />
              <span className="font-bold">Back to Portfolio</span>
            </motion.div>
          </Link>
        </header>

        <div className="max-w-6xl mx-auto pt-8 sm:pt-16 md:pt-20 pb-16 sm:pb-28 px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4 sm:mb-6 text-center break-words"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            GET IN TOUCH
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-xl text-center text-purple-200 mb-10 sm:mb-16 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a project in mind? Let&apos;s discuss how we can bring your vision to life.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-8 sm:mb-12 text-center lg:text-left">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto lg:mx-0 mb-4 sm:mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/profile.png" alt="Abdullahi Siba" className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-full" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2">Abdullahi M siba</h2>
                <p className="text-purple-300 text-sm sm:text-lg">Creative Developer & Designer</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <motion.a
                  href="mailto:sibaabdullahi001@gmail.com"
                  className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-black/40 rounded-xl backdrop-blur-sm hover:bg-black/60 transition-colors border border-gray-800/60 block"
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="text-purple-400 shrink-0" size={20} />
                  <div className="overflow-hidden min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-gray-300">Email</p>
                    <p className="text-purple-200 text-xs sm:text-base truncate font-mono">sibaabdullahi001@gmail.com</p>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-black/40 rounded-xl backdrop-blur-sm border border-gray-800/60"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="text-purple-400 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-gray-300">Phone</p>
                    <p className="text-purple-200 text-xs sm:text-base font-mono">+2347037732220</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-black/40 rounded-xl backdrop-blur-sm border border-gray-800/60"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className="text-purple-400 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-gray-300">Location</p>
                    <p className="text-purple-200 text-xs sm:text-base">Abuja, Nigeria</p>
                  </div>
                </motion.div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/RSDMKZK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-purple-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="GitHub Profile"
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/abdullahi-siba-8a3293392"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a
                    href="mailto:sibaabdullahi001@gmail.com"
                    className="p-3 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-emerald-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Send Email"
                  >
                    <Mail size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-purple-500/20 shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12 sm:py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                    <Send className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-purple-200 text-sm sm:text-base max-w-sm mx-auto">Thank you for reaching out. I&apos;ll get back to you soon!</p>
                </motion.div>
              ) : (
                <>
                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-300">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 sm:py-3 bg-black/60 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500 text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-300">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 sm:py-3 bg-black/60 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-300">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 bg-black/60 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500 text-sm"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 sm:py-3 bg-black/60 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500 text-sm resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base sm:text-lg rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
