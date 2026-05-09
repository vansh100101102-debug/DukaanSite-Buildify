import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Globe, Cpu, Smartphone, BarChart3 } from 'lucide-react'

const features = [
  {
    title: 'Lightning Fast',
    desc: 'Optimized for speed, scoring 90+ on Lighthouse out of the box.',
    icon: Zap,
    size: 'col-span-1 md:col-span-2 row-span-1',
    color: 'from-purple/20 to-purple/5'
  },
  {
    title: 'AI Assisted',
    desc: 'Smart recommendations for your business niche.',
    icon: Cpu,
    size: 'col-span-1 row-span-1',
    color: 'from-cyan/20 to-cyan/5'
  },
  {
    title: 'Global Ready',
    desc: 'Multi-language support for diverse customer bases.',
    icon: Globe,
    size: 'col-span-1 row-span-2',
    color: 'from-purple/20 to-purple/5'
  },
  {
    title: 'Responsive Design',
    desc: 'Perfect view on every screen, from mobile to desktop.',
    icon: Smartphone,
    size: 'col-span-1 row-span-1',
    color: 'from-cyan/20 to-cyan/5'
  },
  {
    title: 'SEO Optimized',
    desc: 'Built-in SEO best practices to help you rank higher.',
    icon: BarChart3,
    size: 'col-span-1 md:col-span-2 row-span-1',
    color: 'from-purple/20 to-purple/5'
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-navy/50 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Engineered for Excellence</h2>
          <p className="text-white/60 text-lg">Every detail matters when it comes to your online presence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${f.size} glass p-8 relative overflow-hidden group hover:border-white/20 transition-colors`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <f.icon className="text-cyan mb-6 relative z-10" size={32} />
              <h3 className="text-xl font-bold mb-2 relative z-10">{f.title}</h3>
              <p className="text-white/50 relative z-10 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
