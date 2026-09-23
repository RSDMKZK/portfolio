"use client"

import { useEffect, useRef, useState, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Globe,
  Star,
  Award,
  Users,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Film,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import IntroVideo from "../components/IntroVideo"
import BackgroundVideo from "../components/BackgroundVideo"
import TestimonialsSection from "../components/TestimonialsSection"
// import SplashCursor from "../components/SplashCursor";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [showHeader, setShowHeader] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [skillTab, setSkillTab] = useState(0);
  // --- Custom blue glowing cursor for hero section ---
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showHeroCursor, setShowHeroCursor] = useState(false);
  const heroCursorRef = useRef<HTMLDivElement>(null);
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [showHeroBlob, setShowHeroBlob] = useState(false);
  const animationRef = useRef<number | null>(null);
  // Splash cursor state for hero section
  const [splashPos, setSplashPos] = useState<{ x: number; y: number } | null>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Dream big and dare to fail.",
    "The only way to do great work is to love what you do.",
    "Don't watch the clock; do what it does. Keep going.",
    "Great things never come from comfort zones.",
    "Believe you can and you're halfway there.",
    "Push yourself, because no one else is going to do it for you.",
    "Opportunities don't happen, you create them.",
    "Don't stop when you're tired. Stop when you're done.",
    "The harder you work for something, the greater you'll feel when you achieve it."
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Animated left-side scrolling texts
  const leftMessages = [
    "Hi, welcome to my profile.",
    "I'm a ctrl C + ctrl V engineer",
    "Enjoy your stay!",
    "Let's build something cool.",
    "I debug by yelling at my screen.",
    "Professional coffee drinker.",
    "I turn caffeine into code.",
    "My code works... on my machine.",
    "I write bugs, then fix them for a living.",
    "Stack Overflow is my best friend.",
    "I can explain it to you, but I can't understand it for you.",
    "I use dark mode even in daylight.",
    "I break things just to fix them.",
    "I'm not lazy, I'm on energy-saving mode.",
    "I'm silently correcting your grammar.",
    "I put the 'pro' in procrastinate.",
    
  ];
  const [leftMsgIndex, setLeftMsgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftMsgIndex((prev) => (prev + 1) % leftMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [leftMessages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * motivationalQuotes.length);
      } while (nextIndex === quoteIndex);
      setQuoteIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [quoteIndex, motivationalQuotes.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })

      gsap.fromTo(
        ".hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power3.out" },
      )

      // Parallax background
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-bg",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // About section animations
      gsap.fromTo(
        ".about-text",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Skills sticky animation
      gsap.to(".skills-progress", {
        width: "100%",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      })

      // Projects scroll animation
      gsap.fromTo(
        ".project-card",
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".projects-section",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Floating elements
      gsap.to(".floating-element", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5,
      })

      // White dots animation
      gsap.to(".white-dot", {
        y: -30,
        x: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show header on mouse enter at the top
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) setShowHeader(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth trailing animation for the abstract blob
  useEffect(() => {
    if (!showHeroBlob) return;
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const animate = () => {
      setTrailPos(prev => {
        const x = lerp(prev.x, cursorPos.x, 0.13);
        const y = lerp(prev.y, cursorPos.y, 0.13);
        return { x, y };
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [cursorPos, showHeroBlob]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setSplashPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const hero = heroRef.current;
    if (hero) hero.addEventListener('mousemove', handleMouseMove);
    if (hero) hero.addEventListener('mouseleave', () => setSplashPos(null));
    return () => {
      if (hero) hero.removeEventListener('mousemove', handleMouseMove);
      if (hero) hero.removeEventListener('mouseleave', () => setSplashPos(null));
    };
  }, []);

  const [expTab, setExpTab] = useState(0);
  const expTabs = [
    {
      title: "EXPERIENCE",
      stats: [
        { icon: Calendar, number: "5+", label: "YEARS EXPERIENCE" },
        { icon: Code, number: "30+", label: "PROJECTS COMPLETED" },
        { icon: Users, number: "30+", label: "HAPPY CLIENTS" },
        { icon: Award, number: "4+", label: "AWARDS WON" },
      ],
    },
    {
      title: "EDUCATION",
      stats: [
        { icon: Calendar, number: "2025", label: "GRADUATED" },
        { icon: Code, number: "BSc", label: "COMPUTER SCIENCE" },
        { icon: Users, number: "4.35", label: "GPA" },
        { icon: Award, number: "3", label: "HONORS" },
      ],
    },
    {
      title: "CERTIFICATION",
      stats: [
        { icon: Award, number: "7+", label: "CERTIFICATES" },
        { icon: Code, number: "8", label: "ONLINE COURSES" },
        { icon: Users, number: "4", label: "BOOTCAMPS" },
        { icon: Calendar, number: "2025", label: "LAST UPDATED" },
      ],
    },
  ];

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Intro Video Overlay */}
      <AnimatePresence>
        {showIntro && (
          <IntroVideo onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Glassmorphism Header */}
      <header
        ref={headerRef}
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-5xl rounded-3xl bg-white/10 backdrop-blur-md shadow-lg flex flex-col md:flex-row items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4 transition-transform duration-500 ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'}`}
        onMouseEnter={() => setShowHeader(true)}
      >
        <div className="w-full md:w-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/profile.png" alt="Logo" className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl object-cover" />
            <span className="font-black text-xl sm:text-2xl tracking-tight text-white/90">My Profile</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setShowIntro(true)}
              className="flex items-center gap-1 text-purple-300 hover:text-white font-semibold text-xs px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10"
              title="Replay Video Intro"
            >
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>Intro</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-purple-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <button
            onClick={() => setShowIntro(true)}
            className="flex items-center gap-1.5 text-purple-300 hover:text-white font-semibold text-sm transition-all px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 active:scale-95"
            title="Replay Video Intro"
          >
            <Film className="w-4 h-4 text-purple-400" />
            <span>Intro</span>
          </button>
          <a href="#about" className="text-white/80 font-semibold hover:text-white transition-colors px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">About</a>
          <a href="#skills" className="text-white/80 font-semibold hover:text-white transition-colors px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">Skills</a>
          <a href="#projects" className="text-white/80 font-semibold hover:text-white transition-colors px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">Projects</a>
          <a href="#testimonials" className="text-white/80 font-semibold hover:text-white transition-colors px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">Testimonials</a>
          <a href="#contact" className="text-white/80 font-semibold hover:text-white transition-colors px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">Contact</a>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full md:hidden flex flex-col items-center gap-3 pt-4 pb-2 border-t border-white/10 mt-3"
            >
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 font-semibold text-base py-1 hover:text-purple-300 transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 font-semibold text-base py-1 hover:text-purple-300 transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 font-semibold text-base py-1 hover:text-purple-300 transition-colors"
              >
                Projects
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 font-semibold text-base py-1 hover:text-purple-300 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 font-semibold text-base py-1 hover:text-purple-300 transition-colors"
              >
                Contact
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      {/* Hero Section with Video Background and Parallax */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-24 sm:py-32 px-4 sm:px-6 md:px-8 lg:px-16"
      >
        {/* Hero Background Video Loop */}
        <BackgroundVideo />
        {/* SplashCursor effect in hero section background */}
        {/* <div className="absolute inset-0 z-0 pointer-events-none">
          <SplashCursor />
        </div> */}
        {/* Animated colorful blobs and floating dots in hero background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Blurred colorful blobs (reduced for performance) */}
          <div className="absolute top-1/4 left-1/5 w-60 h-60 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-400 opacity-20 rounded-full blur-xl animate-blob1" style={{ willChange: 'transform' }} />
          <div className="absolute top-2/3 right-1/4 w-44 h-44 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 opacity-15 rounded-full blur-xl animate-blob2" style={{ willChange: 'transform' }} />
          {/* Fewer floating dots */}
          {[
            { width: '14px', height: '14px', top: '25%', left: '20%', animationDelay: '0.4s' },
            { width: '12px', height: '12px', top: '70%', left: '75%', animationDelay: '1.2s' },
            { width: '16px', height: '16px', top: '45%', left: '60%', animationDelay: '2.1s' },
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-30 animate-float-dot"
              style={{
                width: dot.width,
                height: dot.height,
                top: dot.top,
                left: dot.left,
                animationDelay: dot.animationDelay,
                willChange: 'transform',
              }}
            />
          ))}
        </div>
        {/* Animated Left-Side Scrolling Texts (Visible on large screens to prevent overlap on mobile) */}
        <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-64 flex-col items-start pointer-events-none select-none">
          <motion.div
            key={leftMsgIndex}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl font-bold text-white/80 bg-black/30 px-5 py-3 rounded-r-2xl shadow-lg"
            style={{ minWidth: '200px' }}
          >
            {leftMessages[leftMsgIndex]}
          </motion.div>
        </div>
        <motion.div className="parallax-bg absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.15),transparent_50%)]"></div>
        </motion.div>

        <motion.div className="relative z-10 text-center px-4 max-w-5xl mx-auto" style={{ y: textY }}>
          <motion.h1
            className="hero-title text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <span className="shiny-text">ABDULLAHI</span>
            <br />
            <span className="shiny-text">SIBA</span>
          </motion.h1>
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-gray-300 mb-8 max-w-2xl mx-auto">
            Agentic AI & Full Stack Developer & Prompt Engineer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <motion.a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-base sm:text-lg tracking-wide hover:bg-gray-200 transition-colors rounded-xl sm:rounded-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW WORK
            </motion.a>
            <Link href="/contact" className="w-full sm:w-auto">
              <motion.div
                className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-bold text-base sm:text-lg tracking-wide hover:bg-white hover:text-black transition-colors cursor-pointer rounded-xl sm:rounded-none text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONTACT
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="floating-element absolute top-20 left-20 w-4 h-4 bg-purple-500 rounded-full"></div>
        <div className="floating-element absolute top-40 right-32 w-6 h-6 bg-blue-500 rounded-full"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-3 h-3 bg-pink-500 rounded-full"></div>

        {/* Floating Motivational Quote (Desktop view to keep mobile clean) */}
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -20, y: 20 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex absolute bottom-8 left-8 z-20 max-w-sm rounded-2xl px-5 py-3 shadow-lg items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10"
        >
          <span className="text-2xl text-purple-400 font-bold italic">&ldquo;</span>
          <span className="text-sm text-white/90 font-medium text-left">{motivationalQuotes[quoteIndex]}</span>
          <span className="text-2xl text-purple-400 font-bold italic">&rdquo;</span>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="about-section py-16 sm:py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="white-dot absolute top-10 left-10 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-32 right-24 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="white-dot absolute bottom-24 left-1/3 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="white-dot absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="white-dot absolute bottom-10 right-1/4 w-3 h-3 bg-white rounded-full opacity-30"></div>
          <div className="white-dot absolute top-1/4 right-1/3 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="white-dot absolute bottom-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-3/4 right-10 w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-10 sm:mb-16 text-center break-words"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ABOUT ME
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="about-text">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-300 mb-6 sm:mb-8">
                I&apos;m a passionate creative developer who loves crafting digital experiences that push boundaries and
                inspire users.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-400 mb-6 sm:mb-8">
                With expertise in modern web technologies, I specialize in creating immersive, interactive webapps that
                tell stories and engage audiences through motion and design.
              </p>
              <div className="flex gap-5 sm:gap-6 mb-6 sm:mb-8">
                <motion.a
                  href="https://github.com/RSDMKZK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  title="GitHub Profile (RSDMKZK)"
                >
                  <Github size={28} className="sm:w-8 sm:h-8" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/abdullahi-siba-8a3293392"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  title="LinkedIn Profile"
                >
                  <Linkedin size={28} className="sm:w-8 sm:h-8" />
                </motion.a>
                <motion.a
                  href="mailto:sibaabdullahi001@gmail.com"
                  className="text-white hover:text-green-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  title="Send Email"
                >
                  <Mail size={28} className="sm:w-8 sm:h-8" />
                </motion.a>
              </div>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-md hover:from-purple-600 hover:to-blue-600 transition-colors text-base sm:text-lg mt-2 cursor-pointer"
                download
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
                </svg>
                My CV
              </a>
            </div>

            <motion.div
              className="relative w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[400px] h-[360px] sm:h-[480px] md:h-[520px] mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] flex items-center justify-center p-2">
                <div className="w-full h-full bg-black rounded-[2.2rem] flex items-center justify-center overflow-hidden">
                  <img src="/profile.png" alt="Abdullahi Siba" className="w-full h-full object-cover rounded-[2.2rem]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 zebra-bg pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-10 sm:mb-16 text-center text-white break-words"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {expTabs[expTab].title}
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {expTabs[expTab].stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-3 sm:p-4 rounded-xl bg-black/40 sm:bg-transparent border border-white/5 sm:border-none"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-2 sm:mb-4">
                  <stat.icon className="mx-auto text-purple-400 sm:text-white w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2">{stat.number}</h3>
                <p className="text-white/80 font-bold tracking-wide text-xs sm:text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          {/* Swipe Button BELOW content */}
          <div className="flex justify-center mt-8 sm:mt-10">
            <button
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors cursor-pointer"
              style={{ border: 'none' }}
              onClick={() => setExpTab((expTab + 1) % expTabs.length)}
              aria-label="Swipe"
            >
              <ArrowRight className="text-black w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section with Sticky Elements */}
      <section id="skills" className="skills-section py-16 sm:py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="white-dot absolute top-12 left-16 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-36 right-28 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="white-dot absolute bottom-28 left-1/2 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="white-dot absolute top-2/3 left-1/3 w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="white-dot absolute bottom-12 right-1/5 w-3 h-3 bg-white rounded-full opacity-30"></div>
          <div className="white-dot absolute top-1/3 right-1/2 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="white-dot absolute bottom-1/4 left-1/5 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-3/5 right-16 w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-8 sm:mb-10 text-center break-words"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            SKILLS
          </motion.h2>
          {/* Centered Skills Grid/TabSwitcher */}
          <div className="flex flex-col items-center justify-center w-full mt-8 sm:mt-16">
            <div className="w-full max-w-4xl px-4">
              <TabSwitcher />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden" style={{ background: '#141414' }}>
        {/* Giraffe-like black patches */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[
            { top: '12%', left: '8%', width: 110, height: 60, borderRadius: '45%', rotate: '25deg' },
            { top: '22%', left: '78%', width: 85, height: 75, borderRadius: '60%', rotate: '110deg' },
            { top: '38%', left: '32%', width: 130, height: 50, borderRadius: '35%', rotate: '45deg' },
            { top: '52%', left: '15%', width: 95, height: 65, borderRadius: '50%', rotate: '190deg' },
            { top: '68%', left: '82%', width: 120, height: 55, borderRadius: '40%', rotate: '275deg' },
            { top: '78%', left: '42%', width: 75, height: 70, borderRadius: '55%', rotate: '15deg' },
            { top: '8%', left: '48%', width: 105, height: 45, borderRadius: '65%', rotate: '320deg' },
            { top: '32%', left: '62%', width: 90, height: 60, borderRadius: '45%', rotate: '85deg' },
            { top: '62%', left: '58%', width: 140, height: 65, borderRadius: '38%', rotate: '140deg' },
            { top: '82%', left: '12%', width: 80, height: 75, borderRadius: '58%', rotate: '210deg' },
            { top: '18%', left: '28%', width: 115, height: 50, borderRadius: '42%', rotate: '165deg' },
            { top: '48%', left: '88%', width: 100, height: 55, borderRadius: '48%', rotate: '295deg' },
          ].map((patch, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: patch.top,
                left: patch.left,
                width: patch.width,
                height: patch.height,
                background: '#000',
                opacity: 0.18,
                borderRadius: patch.borderRadius,
                transform: `translate(-50%, -50%) rotate(${patch.rotate})`,
              }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-10 sm:mb-16 text-center break-words"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            SERVICES
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {[
              {
                title: "WEB DEVELOPMENT",
                description: "Custom websites and web applications built with modern technologies",
              },
              {
                title: "MOBILE APP DEV",
                description: "Cross-platform and native iOS & Android applications crafted for high performance and smooth experiences",
              },
              {
                title: "SCHOOL PROJECTS",
                description: "Final year projects for university students including reports writing and presentations with code implementation and AI turnitin report bypass",
              },
              {
                title: "UI/UX DESIGN",
                description: "Beautiful and intuitive user interfaces that convert visitors to customers",
              },
              {
                title: "CUSTOM CHAT BOT",
                description: "Conversational AI bots tailored for your business needs.",
              },
              {
                title: "E-COMMERCE",
                description: "Complete online stores with payment integration and inventory management",
              },
              {
                title: "BRANDING",
                description: "Logo design, brand identity, and marketing materials that stand out",
              },
              {
                title: "CONSULTING",
                description: "Technical consulting and code reviews to optimize your existing projects",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-black p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-purple-500 transition-colors cursor-pointer hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl sm:text-2xl font-black tracking-wide mb-3 sm:mb-4 text-purple-400">{service.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-2 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="projects-section py-16 sm:py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-black">
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0">
          <div className="white-dot absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-40 right-32 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="white-dot absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="white-dot absolute top-60 left-1/2 w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="white-dot absolute bottom-40 right-1/4 w-3 h-3 bg-white rounded-full opacity-30"></div>
          <div className="white-dot absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="white-dot absolute bottom-60 left-1/3 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-80 right-20 w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-10 sm:mb-16 text-center break-words"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            PROJECTS
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "E-COMMERCE PLATFORM",
                tech: "Next.js, Stripe, PostgreSQL",
                image: "/project.png",
              },
              {
                title: "PORTFOLIO WEBSITE",
                tech: "React, GSAP, Framer Motion",
                image: "/project.png",
              },
              { title: "MOBILE APP", tech: "Flutter, React Native, Firebase, supabase", image: "/project.png" },
              {
                title: "WEB3 DASHBOARD",
                tech: "React, Web3.js, Ethereum",
                image: "/project.png",
              },
              { title: "AI CHATBOT", tech: "Python, OpenAI, FastAPI, Flask, Gemini", image: "/project.png" },
              {
                title: "GAME PLATFORM",
                tech: "Three.js, WebGL, Socket.io",
                image: "/project.png",
              },
            ].map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section with Purple Background and White Dots */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 md:px-8 lg:px-16 bg-black relative overflow-hidden">
        {/* Animated White Dots */}
        <div className="absolute inset-0">
          <div className="white-dot absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-40 right-32 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="white-dot absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="white-dot absolute top-60 left-1/2 w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="white-dot absolute bottom-40 right-1/4 w-3 h-3 bg-white rounded-full opacity-30"></div>
          <div className="white-dot absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="white-dot absolute bottom-60 left-1/3 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-80 right-20 w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-2 sm:mb-4 text-center break-words"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            LET&apos;S WORK
          </motion.h2>
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-8 sm:mb-12 text-center break-words"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            TOGETHER
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-2xl text-purple-100 mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to bring your ideas to life? Let&apos;s create something amazing together.
          </motion.p>

          <Link href="/contact">
            <motion.div
              className="inline-block jelly-green-btn cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET IN TOUCH
            </motion.div>
          </Link>

          {/* Footer note */}
          <div className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 text-center sm:text-left">
            <p
              onClick={(e) => {
                // Secret shortcut: triple-click copyright to open admin
                if (e.detail === 3) {
                  window.location.href = '/admin'
                }
              }}
              className="select-none"
            >
              © {new Date().getFullYear()} Abdullahi M Siba. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/contact" className="hover:text-purple-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// TabSwitcher component for beautiful tabs and animated indicator
function TabSwitcher() {
  const [skillTab, setSkillTab] = useState(0);
  const tabNames = ["Technical Skills", "Soft Skills", "Tools"];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const node = tabRefs.current[skillTab];
    if (node) {
      setIndicatorStyle({ left: node.offsetLeft, width: node.offsetWidth });
    }
  }, [skillTab]);

  return (
    <div className="relative flex flex-col items-center mb-10 sm:mb-14 w-full">
      <div role="tablist" aria-label="Skills navigation" className="flex flex-wrap sm:flex-nowrap justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-full shadow-lg p-1.5 sm:p-2 gap-1.5 sm:gap-2 relative max-w-full">
        {/* Animated indicator */}
        <div
          ref={indicatorRef}
          className="absolute top-1 left-0 h-[calc(100%-0.5rem)] rounded-full bg-gradient-to-r from-purple-500/80 to-blue-500/80 shadow-lg transition-all duration-500 ease-[cubic-bezier(.4,2,.6,1)] z-0 hidden sm:block"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width, pointerEvents: 'none' }}
        />
        {tabNames.map((tab, idx) => (
          <button
            key={tab}
            ref={(el) => { tabRefs.current[idx] = el }}
            onClick={() => setSkillTab(idx)}
            className={`relative z-10 px-3.5 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-bold font-mono rounded-xl sm:rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer
              ${skillTab === idx ? 'text-white scale-102 sm:scale-105 bg-gradient-to-r from-purple-600/80 to-blue-600/80 shadow' : 'text-gray-300 hover:text-white'}`}
            role="tab"
            aria-selected={skillTab === idx}
            tabIndex={0}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab Content with smooth fade/slide */}
      <div className="w-full mt-8 sm:mt-12">
        <AnimatePresence mode="wait">
          <TabContent key={skillTab} skillTab={skillTab} />
        </AnimatePresence>
      </div>
    </div>
  );
}

// TabContent component for animated tab panels
function TabContent({ skillTab }: { skillTab: number }) {
  return (
    <motion.div
      key={skillTab}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 2, 0.6, 1] }}
    >
      {skillTab === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full">
          {[
            { icon: Code, title: "FRONTEND", skills: ["React", "Next.js", "flutter", "Tailwind"] },
            { icon: Palette, title: "DESIGN", skills: ["Figma", "prompting", "UI/UX", "ReactBits"] },
            { icon: Zap, title: "ANIMATION", skills: ["GSAP", "Framer Motion", "CSS", "WebGL"] },
            { icon: Globe, title: "BACKEND", skills: ["Node.js", "Python", "PostgreSQL", "FastApi"] },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              className="text-center bg-black/80 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 w-full border border-gray-900"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 sm:mb-6">
                <category.icon className="mx-auto text-purple-400 w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-wide mb-3 sm:mb-4 text-white">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill} className="relative">
                    <div className="text-sm sm:text-base text-gray-200 mb-1 font-semibold tracking-wide">{skill}</div>
                    <div className="w-full bg-gray-700 h-1.5 rounded-full">
                      <div
                        className="skills-progress h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {skillTab === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {[
            'Communication',
            'Problem Solving',
            'Teamwork',
            'Adaptability',
            'Creativity',
            'Critical Thinking',
            'Time Management',
            'Leadership',
          ].map((skill, index) => (
            <motion.div
              key={skill}
              className="bg-black/80 border border-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-7 text-center text-white font-bold text-sm sm:text-base md:text-lg shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      )}
      {skillTab === 2 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4 md:gap-6 mb-8">
          {[
            'v0.dev',
            'Git',
            'GitHub',
            'VS Code',
            'Figma',
            'emergent',
            'rork.app',
            'vercel',
            'Netlify',
            'Supabase',
            'Firebase',
            'Trello',
            'readdy.ai',
            'trae,ai',
            'Discord',
            'Photoshop',
            'Illustrator',
            'Canva',
            'Ai chatbot',
            'TensorFlow',
            'lovable',
            'Ai automation',
            'Ai writing',
            'Ai research',
          ].map((tool, index) => (
            <motion.div
              key={tool}
              className="bg-black/80 border border-purple-600/70 rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center text-white font-semibold text-xs sm:text-sm md:text-base shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.04] hover:-translate-y-1 hover:border-purple-400 hover:shadow-xl truncate"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.02 }}
              viewport={{ once: true }}
            >
              {tool}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: { title: string; tech: string; image: string }, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Max tilt angle
    const maxTilt = 15;
    const tiltX = ((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;
    setTilt({ x: tiltX, y: tiltY });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex flex-col items-center bg-gradient-to-br from-white/5 to-black/60 border border-gray-800 rounded-2xl shadow-xl px-8 pt-8 pb-6 transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(162,89,247,0.18)] hover:-translate-y-2 hover:scale-[1.04] cursor-pointer min-h-[420px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full flex justify-center">
        <div className="w-28 h-28 rounded-xl overflow-hidden border-4 border-white/10 bg-gradient-to-br from-purple-700/80 to-blue-700/80 shadow-lg group-hover:scale-105 transition-transform duration-500">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            style={{ aspectRatio: '1/1' }}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center text-center w-full mt-8">
        <h3 className="text-xl font-extrabold tracking-tight mb-2 text-white drop-shadow-lg leading-tight min-h-[56px] flex items-center justify-center">{project.title}</h3>
        <p className="text-gray-300 text-base mb-6 font-mono">{project.tech}</p>
        <button className="w-full mt-auto px-0 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-base shadow-md hover:from-purple-600 hover:to-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95">View Project</button>
      </div>
    </motion.div>
  );
}
