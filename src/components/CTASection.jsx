import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-purple/20 to-cyan/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-5xl mx-auto glass p-12 md:p-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-cyan/5 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles size={16} className="text-cyan" />
            <span className="text-xs font-black uppercase tracking-widest text-white/60">Limited Offer</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Ready to give your shop <br />
            <span className="text-cyan">the spotlight it deserves?</span>
          </h2>
          
          <p className="text-white/50 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Join 500+ local businesses who have transformed their digital presence with ShopForge. 
            No coding required. No stress. Just growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/order" className="btn-premium px-12 py-5 text-lg group">
              <span className="flex items-center gap-2">
                Build My Site Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/login" className="px-12 py-5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors font-bold text-lg">
              Book a Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
