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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
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
              className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors cursor-pointer"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={24} />
              <span className="font-bold">Back to Portfolio</span>
            </motion.div>
          </Link>
        </header>

        <div className="max-w-6xl mx-auto pt-32 pb-32 px-4 md:px-8 lg:px-16">
          <motion.h1
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            GET IN TOUCH
          </motion.h1>

          <motion.p
            className="text-xl text-center text-purple-200 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a project in mind? Let&apos;s discuss how we can bring your vision to life.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-12">
                <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/profile.png" alt="John Doe" className="w-28 h-28 object-cover rounded-full" />
                </div>
                <h2 className="text-3xl font-black mb-2">Abdullahi M siba</h2>
                <p className="text-purple-300 text-lg">Creative Developer & Designer</p>
              </div>

              <div className="space-y-6">
                <motion.a
                  href="mailto:sibaabdullahi001@gmail.com"
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-black/50 transition-colors block"
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="text-purple-400 shrink-0" size={24} />
                  <div className="overflow-hidden">
                    <p className="font-semibold">Email</p>
                    <p className="text-purple-200 text-sm sm:text-base truncate">sibaabdullahi001@gmail.com</p>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="text-purple-400 shrink-0" size={24} />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-purple-200">+2347037732220</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className="text-purple-400 shrink-0" size={24} />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-purple-200">Abuja</p>
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
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {isSubmitted ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-purple-200">Thank you for reaching out. I&apos;ll get back to you soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
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
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
