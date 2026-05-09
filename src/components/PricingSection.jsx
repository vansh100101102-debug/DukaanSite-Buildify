import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Crown, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    price: '₹999',
    desc: 'Perfect for local small shops looking to go digital.',
    icon: Zap,
    features: ['Single Page Website', 'Standard Templates', 'Basic SEO', 'Mobile Responsive', 'Email Support'],
    color: 'from-cyan/20 to-cyan/5',
    btn: 'Get Started'
  },
  {
    name: 'Professional',
    price: '₹2499',
    desc: 'Best for growing businesses and retailers.',
    icon: Rocket,
    features: ['Multi-page Website', 'Premium Templates', 'Advanced SEO', 'Analytics Dashboard', 'Priority Support', 'Custom Domain'],
    popular: true,
    color: 'from-purple/20 to-purple/5',
    btn: 'Scale Now'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Full-scale digital transformation for wholesalers.',
    icon: Crown,
    features: ['Unlimited Pages', 'Custom Design System', 'E-commerce Integration', 'Inventory Sync', '24/7 Dedicated Manager', 'Multi-language AI'],
    color: 'from-cyan/20 to-cyan/5',
    btn: 'Contact Sales'
  }
]

export default function PricingSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" id="pricing">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <p className="text-white/60 text-lg">Invest in your business future with no hidden costs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`glass p-10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 ${plan.popular ? 'border-purple/40 ring-1 ring-purple/20 scale-105 z-10 bg-white/[0.07]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-purple to-cyan px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
                  Most Popular
                </div>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <plan.icon className="text-cyan mb-6" size={40} />
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-white/40 text-sm">/one-time</span>}
                </div>
                <p className="text-white/50 mb-8 text-sm leading-relaxed">{plan.desc}</p>
                
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-cyan/10 flex items-center justify-center text-cyan">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/order" 
                  className={`w-full block text-center py-4 rounded-xl font-black transition-all ${plan.popular ? 'bg-gradient-to-r from-purple to-cyan text-white shadow-lg shadow-purple/20 hover:scale-105 active:scale-95' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                >
                  {plan.btn}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
