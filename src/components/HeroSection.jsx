import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, MousePointer2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6">
      <div className="container max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles size={16} className="text-cyan" />
          <span className="text-sm font-medium tracking-wide uppercase">Easy Website Builder</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight text-current"
        >
          Grow your shop <br />
          <span className="bg-gradient-to-r from-purple via-cyan to-purple bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
            online today.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl opacity-80 max-w-2xl mb-12 leading-relaxed mx-auto"
        >
          Get a beautiful website for your business in minutes. No technical skills needed. Just tell us about your shop and we do the rest.
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/order" className="btn-premium group">
            <span className="flex items-center gap-2">
              Start Building <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link to="/templates" className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors font-bold">
            Explore Gallery
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>

        {/* Floating Icons Parallax (Abstract) */}
        <div className="absolute top-1/4 left-10 pointer-events-none opacity-20">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <MousePointer2 size={60} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
