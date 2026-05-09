import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Check, Rocket, Layout, ShoppingBag, Globe, Phone, MapPin, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import LoginRequired from './LoginRequired'

const API = import.meta.env.VITE_API_BASE_URL || '/api'

const shopTypes = [
  { id: 'grocery', emoji: '🥬', name: 'Grocery / Kirana' },
  { id: 'electronics', emoji: '📱', name: 'Electronics' },
  { id: 'clothing', emoji: '👗', name: 'Clothing / Fashion' },
  { id: 'restaurant', emoji: '🍛', name: 'Restaurant / Food' },
  { id: 'wholesale', emoji: '📦', name: 'Wholesale / B2B' },
  { id: 'pharmacy', emoji: '💊', name: 'Pharmacy / Medical' },
  { id: 'hardware', emoji: '🔧', name: 'Hardware / Tools' },
  { id: 'other', emoji: '🏪', name: 'Other' },
]

const templateOptions = [
  { id: 'freshmart', emoji: '🥬', name: 'FreshMart', color: '#10b981' },
  { id: 'techzone', emoji: '📱', name: 'TechZone', color: '#22d3ee' },
  { id: 'stylehub', emoji: '👗', name: 'StyleHub', color: '#f43f5e' },
  { id: 'tastekitchen', emoji: '🍛', name: 'TasteKitchen', color: '#f59e0b' },
  { id: 'bulktrade', emoji: '📦', name: 'BulkTrade', color: '#8b5cf6' },
  { id: 'kiranaplus', emoji: '🏪', name: 'KiranaPlus', color: '#00D9FF' },
]

const STEPS = ['Business', 'Type', 'Template', 'Specs', 'Review']

export default function OrderForm({ isLoggedIn, userEmail, userId, showToast }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    location: '',
    shopType: '',
    template: '',
    products: '',
    languages: ['en'],
    description: '',
  })

  useEffect(() => {
    if (location.state?.template) {
      setForm(prev => ({ 
        ...prev, 
        template: location.state.template.toLowerCase().replace(' ', ''),
        shopType: location.state.cat || prev.shopType
      }))
    }
  }, [location.state])

  if (!isLoggedIn) {
    return <LoginRequired title="Build Your Store" message="Please sign in to configure and deploy your world-class storefront." />
  }

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const next = () => { if (step < STEPS.length - 1) setStep(s => s + 1) }
  const back = () => { if (step > 0) setStep(s => s - 1) }

  const handleSubmit = async () => {
    try {
      const orderData = {
        ...form,
        userId: userId?.trim(),
        userEmail: userEmail?.trim(),
        templateId: form.template,
      }
      await axios.post(`${API}/orders`, orderData)
      showToast(t('order.success'), 'success')
      navigate('/dashboard')
    } catch (err) {
      console.error('Order submission error:', err)
      showToast(t('order.error'), 'error')
    }
  }

  return (
    <div className="py-24 px-6 min-h-screen relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl">
        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-12 relative px-4">
           <div className="absolute top-5 left-10 right-10 h-0.5 bg-white/5 -z-10" />
           {STEPS.map((label, i) => (
             <div key={i} className="flex flex-col items-center gap-3">
                <motion.div 
                  animate={{ 
                    scale: i === step ? 1.2 : 1,
                    backgroundColor: i <= step ? '#7F77DD' : 'rgba(255,255,255,0.05)',
                    borderColor: i <= step ? '#A19BEE' : 'rgba(255,255,255,0.1)'
                  }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-black relative"
                >
                  {i < step ? <Check size={18} strokeWidth={3} /> : i + 1}
                  {i === step && <div className="absolute inset-0 rounded-full animate-ping bg-purple/20" />}
                </motion.div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${i <= step ? 'text-white' : 'text-white/20'}`}>{label}</span>
             </div>
           ))}
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-cyan/5 pointer-events-none" />
          
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Tell us about <span className="text-purple">Your Vision</span></h2>
                    <p className="text-white/50 text-lg">We'll use these details to generate your custom brand foundation.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Business Name" value={form.businessName} onChange={v => update('businessName', v)} placeholder="e.g. Kumar General Store" icon={ShoppingBag} />
                    <InputField label="Owner Name" value={form.ownerName} onChange={v => update('ownerName', v)} placeholder="Your full name" icon={Layout} />
                    <InputField label="Phone Number" value={form.phone} onChange={v => update('phone', v)} placeholder="+91 98765 43210" icon={Phone} />
                    <InputField label="Location" value={form.location} onChange={v => update('location', v)} placeholder="City, State" icon={MapPin} />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Identify your <span className="text-cyan">Industry</span></h2>
                    <p className="text-white/50 text-lg">This helps our AI select the most effective UI patterns for your niche.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {shopTypes.map(st => (
                      <SelectCard 
                        key={st.id} 
                        item={st} 
                        isSelected={form.shopType === st.id} 
                        onClick={() => update('shopType', st.id)} 
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Select a <span className="text-purple">Visual Soul</span></h2>
                    <p className="text-white/50 text-lg">Choose a starting template that matches your brand's energy.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {templateOptions.map(tpl => (
                      <SelectCard 
                        key={tpl.id} 
                        item={tpl} 
                        isSelected={form.template === tpl.id} 
                        onClick={() => update('template', tpl.id)} 
                        color={tpl.color}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Final <span className="text-cyan">Specifications</span></h2>
                    <p className="text-white/50 text-lg">Add some context to help our developers build exactly what you need.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Products & Services</label>
                       <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-cyan transition-all min-h-[120px]"
                        value={form.products}
                        onChange={e => update('products', e.target.value)}
                        placeholder="List your main categories or key products..."
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Business Description</label>
                       <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-cyan transition-all min-h-[100px]"
                        value={form.description}
                        onChange={e => update('description', e.target.value)}
                        placeholder="Briefly describe your story or mission..."
                       />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Review & <span className="text-purple">Deploy</span></h2>
                    <p className="text-white/50 text-lg">Confirm your configuration before we start the build.</p>
                  </div>
                  <div className="glass p-8 space-y-4 mb-10 bg-white/5">
                     <ReviewRow label="Business" value={form.businessName} />
                     <ReviewRow label="Owner" value={form.ownerName} />
                     <ReviewRow label="Industry" value={form.shopType} />
                     <ReviewRow label="Template" value={form.template} />
                     <ReviewRow label="Location" value={form.location} />
                  </div>
                  <div className="p-6 rounded-2xl bg-cyan/10 border border-cyan/20 text-cyan flex items-center gap-4">
                     <Sparkles size={24} />
                     <p className="text-sm font-bold">You're one step away from a world-class digital storefront.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-12 pt-12 border-t border-white/5">
              <button 
                onClick={back}
                disabled={step === 0}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${step === 0 ? 'opacity-0' : 'hover:bg-white/5'}`}
              >
                <ArrowLeft size={18} /> Back
              </button>
              
              {step < STEPS.length - 1 ? (
                <button 
                  onClick={next}
                  className="btn-premium px-12 py-4 flex items-center gap-2"
                >
                  Continue <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  className="btn-premium px-12 py-4 bg-gradient-to-r from-purple to-cyan flex items-center gap-2 shadow-2xl shadow-purple/40"
                >
                  Confirm Build <Rocket size={18} className="animate-bounce" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, placeholder, icon: Icon }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={20} />
        <input 
          type="text"
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan focus:bg-white/10 transition-all font-medium"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

function SelectCard({ item, isSelected, onClick, color = '#7F77DD' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass p-6 flex flex-col items-center gap-4 cursor-pointer transition-all border-2
        ${isSelected ? 'border-purple bg-purple/10' : 'border-white/5 hover:border-white/20'}
      `}
      style={isSelected ? { borderColor: color, backgroundColor: `${color}11` } : {}}
    >
      <div className="text-3xl">{item.emoji}</div>
      <div className="text-xs font-black uppercase tracking-widest text-center">{item.name}</div>
      {isSelected && <Check size={16} className="text-cyan absolute top-2 right-2" />}
    </motion.div>
  )
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-xs font-black uppercase tracking-widest text-white/30">{label}</span>
      <span className="font-bold text-white/80">{value || 'Not set'}</span>
    </div>
  )
}
