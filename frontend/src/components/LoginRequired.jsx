import React from 'react'
import { motion } from 'framer-motion'
import { Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LoginRequired({ title = "Identity Required", message = "Please sign in to access this secure part of the platform." }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-xl w-full p-12 text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-cyan/5 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <Lock className="text-cyan" size={40} />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <ShieldCheck size={14} className="text-purple" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Secure Access</span>
          </div>

          <h2 className="text-4xl font-black mb-4">{title}</h2>
          <p className="text-white/50 text-lg mb-12 leading-relaxed">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn-premium px-10 py-4 flex items-center justify-center gap-2 group">
              Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/signup" className="px-10 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors font-bold">
              Join Now
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
             <div className="flex items-center gap-2"><Sparkles size={12} /> 256-bit AES</div>
             <div className="w-1 h-1 rounded-full bg-white/10" />
             <div className="flex items-center gap-2"><Sparkles size={12} /> End-to-End</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
