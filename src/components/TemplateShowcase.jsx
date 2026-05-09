import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, ShoppingCart, Layout, X, ArrowRight, Eye } from 'lucide-react'

const templates = [
  { id: 1, name: 'Online Stores', type: 'E-Commerce', color: '#10b981', desc: 'Boost sales with a premium shopping experience.', image: '/templates/modern_ecom_template_1778305295597.png' },
  { id: 2, name: 'Fashion Elite', type: 'Apparel', color: '#f43f5e', desc: 'Modern minimalist design for clothing brands.', image: '/templates/fashion_ecom_1778308327281.png' },
  { id: 3, name: 'Luxury Dining', type: 'Food & Dining', color: '#f59e0b', desc: 'Savor the digital flavor with elegant menus.', image: '/templates/premium_restaurant_template_1778310646602.png' },
  { id: 4, name: 'Education Portals', type: 'Education', color: '#22d3ee', desc: 'Empower students with a modern learning portal.', image: '/templates/premium_school_template_1778310724271.png' },
  { id: 5, name: 'Creative Hub', type: 'Portfolio', color: '#7c3aed', desc: 'Showcase your work with a stunning creative portfolio.', image: '/templates/portfolio_creative_template_1778310687082.png' },
  { id: 6, name: 'Business Solutions', type: 'Corporate', color: '#00D9FF', desc: 'Modern dashboard for enterprise services.', image: '/templates/modern_business_template_1778310687082.png' }
]

export default function TemplateShowcase() {
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  return (
    <section className="py-24 px-6 relative z-10" id="templates">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">Choose Your Canvas</h2>
            <p className="text-white/60 text-xl max-w-xl">Every business is unique. Select a foundation that matches your brand's soul.</p>
          </div>
          <button className="btn-premium flex items-center gap-2">
            View All Templates <Layout size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass overflow-hidden group cursor-pointer"
            >
              <div className="h-64 relative overflow-hidden bg-navy-light flex items-center justify-center">
                <div 
                  className="w-full h-full relative transition-transform duration-500 group-hover:scale-110"
                >
                  <img 
                    src={t.image} 
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-all" />
                </div>
                
                <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); setSelectedTemplate(t); }}
                    className="p-4 rounded-full bg-white text-navy"
                  >
                    <Eye size={24} />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); navigate('/order', { state: { template: t.name } }); }}
                    className="p-4 rounded-full bg-cyan text-navy"
                  >
                    <ShoppingCart size={24} />
                  </motion.div>
                </div>
              </div>

              <div className="p-8" onClick={() => setSelectedTemplate(t)}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: t.color }}>{t.type}</span>
                </div>
                <h3 className="text-2xl font-black mb-2">{t.name}</h3>
                <p className="text-white/50 leading-relaxed mb-6">{t.desc}</p>
                <div className="flex items-center gap-2 text-cyan font-bold group-hover:gap-4 transition-all">
                  Preview Template <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-xl"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 bg-navy-light relative min-h-[300px] flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at center, ${selectedTemplate.color}, transparent)` }} />
                 <img 
                   src={selectedTemplate.image} 
                   alt={selectedTemplate.name}
                   className="w-[90%] h-[90%] object-cover rounded-2xl shadow-2xl border border-white/10 relative z-10"
                 />
              </div>

              <div className="w-full md:w-[400px] p-12 flex flex-col justify-between border-l border-white/10 bg-navy/50">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5" style={{ color: selectedTemplate.color }}>
                      {selectedTemplate.type}
                    </span>
                    <button 
                      onClick={() => setSelectedTemplate(null)}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <h2 className="text-4xl font-black mb-4">{selectedTemplate.name}</h2>
                  <p className="text-white/50 text-lg leading-relaxed mb-8">
                    {selectedTemplate.desc} This template includes high-conversion layouts, 
                    integrated SEO tools, and a buttery-smooth mobile experience tailored for {selectedTemplate.type.toLowerCase()} businesses.
                  </p>
                  
                  <div className="space-y-4 mb-12">
                    <div className="flex items-center gap-3 text-white/80 font-medium">
                      <Layout size={20} className="text-cyan" /> 5+ Custom Layouts
                    </div>
                    <div className="flex items-center gap-3 text-white/80 font-medium">
                      <ShoppingCart size={20} className="text-cyan" /> Full E-commerce Ready
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/order', { state: { template: selectedTemplate.name } })}
                  className="btn-premium w-full flex items-center justify-center gap-3 text-lg"
                >
                  Apply to My Site <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
