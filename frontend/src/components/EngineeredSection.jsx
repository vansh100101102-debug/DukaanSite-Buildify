import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Globe, Cpu, Smartphone, BarChart3, Binary, Layers, Activity } from 'lucide-react'

const features = [
  {
    title: 'Super Fast Speed',
    desc: 'Your website loads in a blink, so your customers never have to wait.',
    icon: Zap,
    grid: 'md:col-span-2 md:row-span-1',
    accent: 'purple',
    stat: 'FAST LOAD'
  },
  {
    title: 'Google Friendly',
    desc: 'Built so that Google can easily find and show your shop to new people.',
    icon: Binary,
    grid: 'md:col-span-1 md:row-span-1',
    accent: 'cyan',
    stat: 'SEO READY'
  },
  {
    title: 'Phone & Tablet Ready',
    desc: 'Your site looks perfect on every screen—mobile, tablet, or computer.',
    icon: Smartphone,
    grid: 'md:col-span-1 md:row-span-2',
    accent: 'cyan',
    stat: 'MOBILE OK'
  },
  {
    title: 'Secure & Safe',
    desc: 'We keep your data and your customers safe with top-level security.',
    icon: Shield,
    grid: 'md:col-span-2 md:row-span-1',
    accent: 'purple',
    stat: '100% SAFE'
  },
  {
    title: 'Always Online',
    desc: 'Your website stays up and running 24/7, even with many visitors.',
    icon: Activity,
    grid: 'md:col-span-1 md:row-span-1',
    accent: 'purple',
    stat: 'NO LAG'
  },
  {
    title: 'Works Everywhere',
    desc: 'No matter where your customers are, your site works perfectly.',
    icon: Globe,
    grid: 'md:col-span-1 md:row-span-1',
    accent: 'cyan',
    stat: 'GLOBAL'
  }
]

export default function EngineeredSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-navy/30">
      {/* Background technical grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-cyan font-black tracking-[0.3em] uppercase text-xs mb-6"
            >
              <div className="w-12 h-px bg-cyan" />
              Built for Success
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9]">
              Engineered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-cyan">to Perfection</span>
            </h2>
            <p className="text-white/40 text-xl font-medium max-w-lg leading-relaxed">
              We build powerful websites that are easy for you to use and easy for your customers to love.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="glass p-10 rotate-3 flex items-center gap-6 border-cyan/20">
               <div className="text-right">
                  <div className="text-4xl font-black text-white">99.9%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan">Uptime SLA</div>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <Activity className="text-cyan animate-pulse" size={40} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`group relative glass p-10 overflow-hidden ${f.grid}`}
            >
              {/* Animated corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${f.accent}/5 rounded-bl-[100px] group-hover:w-32 group-hover:h-32 transition-all duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                   <div className={`p-4 rounded-2xl bg-${f.accent}/10 text-${f.accent} group-hover:scale-110 transition-transform duration-500`}>
                      <f.icon size={32} strokeWidth={2.5} />
                   </div>
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-cyan/60 transition-colors">
                      {f.stat}
                   </div>
                </div>

                <h3 className="text-2xl font-black mb-4 group-hover:translate-x-2 transition-transform duration-500">{f.title}</h3>
                <p className="text-white/40 font-medium leading-relaxed group-hover:text-white/60 transition-colors">
                  {f.desc}
                </p>

                {/* Technical data bar */}
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className={`h-full bg-${f.accent}`} 
                      />
                   </div>
                   <span className="text-[10px] font-black text-white/20">READY</span>
                </div>
              </div>

              {/* Background scanning line */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                 <motion.div 
                   animate={{ y: ['0%', '200%'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className={`h-1/2 w-full bg-gradient-to-b from-${f.accent}/10 to-transparent`}
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
