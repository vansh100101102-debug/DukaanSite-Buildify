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

const STEPS = ['Your Shop', 'Category', 'Design', 'Details', 'Extra Features', 'Check Price', 'Pay']

const FEATURES = [
  { id: 'ai', name: 'AI Chatbot (Auto Reply)', price: 1499, icon: Sparkles },
  { id: 'seo', name: 'Google Search Setup', price: 999, icon: Globe },
  { id: 'payment', name: 'Online Payments', price: 1999, icon: ShoppingBag },
  { id: 'support', name: '24/7 Help Support', price: 499, icon: Phone },
]

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
    selectedFeatures: [],
  })

  const calculateTotal = () => {
    let total = 2999 // Base price
    const ecomTypes = ['grocery', 'electronics', 'clothing', 'wholesale']
    if (ecomTypes.includes(form.shopType)) total += 5000
    
    form.selectedFeatures.forEach(fid => {
      const feat = FEATURES.find(f => f.id === fid)
      if (feat) total += feat.price
    })
    return total
  }

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
  
  const validateStep = () => {
    if (step === 0) {
      if (!form.businessName) return '⚠️ Shop Name is required'
      if (!form.ownerName) return '⚠️ Owner Name is required'
      if (!form.phone) return '⚠️ Phone Number is required'
      if (form.phone.length < 10) return '⚠️ Enter a full 10-digit Phone Number'
      if (!form.location) return '⚠️ City/Location is required'
    }
    if (step === 1 && !form.shopType) return '⚠️ Please select your Industry/Category'
    if (step === 2 && !form.template) return '⚠️ Please pick a Design Template'
    return null
  }

  const toggleFeature = (fid) => {
    setForm(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(fid)
        ? prev.selectedFeatures.filter(f => f !== fid)
        : [...prev.selectedFeatures, fid]
    }))
  }

  const next = () => { 
    const error = validateStep()
    if (error) {
      showToast(error, 'error')
      return
    }
    if (step < STEPS.length - 1) setStep(s => s + 1) 
  }
  const back = () => { if (step > 0) setStep(s => s - 1) }

  const handleSubmit = async () => {
    const error = validateStep()
    if (error) {
      showToast(error, 'error')
      return
    }
    try {
      const orderData = {
        ...form,
        userId: userId?.trim(),
        userEmail: userEmail?.trim(),
        templateId: form.template,
        totalPrice: calculateTotal(),
        status: 'pending_payment'
      }
      await axios.post(`${API}/orders`, orderData)
      showToast('Order Placed! Complete payment to start the build.', 'success')
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
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center text-[10px] md:text-xs font-black relative"
                >
                  {i < step ? <Check size={18} strokeWidth={3} /> : i + 1}
                  {i === step && <div className="absolute inset-0 rounded-full animate-ping bg-purple/20" />}
                </motion.div>
                <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${i <= step ? 'text-white' : 'text-white/20'}`}>{label}</span>
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
                    <h2 className="text-4xl font-black mb-3">About <span className="text-purple">Your Shop</span></h2>
                    <p className="text-white/50 text-lg">Enter your basic shop details so we can start building.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Shop Name" value={form.businessName} onChange={v => update('businessName', v)} placeholder="e.g. Kumar Store" icon={ShoppingBag} />
                    <InputField label="Your Name" value={form.ownerName} onChange={v => update('ownerName', v)} placeholder="Full Name" icon={Layout} />
                    <InputField label="Phone Number" value={form.phone} onChange={v => update('phone', v)} placeholder="Mobile Number" icon={Phone} />
                    <InputField label="City" value={form.location} onChange={v => update('location', v)} placeholder="City Name" icon={MapPin} />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Shop <span className="text-cyan">Category</span></h2>
                    <p className="text-white/50 text-lg">What kind of items do you sell?</p>
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
                    <h2 className="text-4xl font-black mb-3">Pick a <span className="text-purple">Design</span></h2>
                    <p className="text-white/50 text-lg">Choose the look you like best for your website.</p>
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
                    <h2 className="text-4xl font-black mb-3">More <span className="text-cyan">Details</span></h2>
                    <p className="text-white/50 text-lg">Tell us a bit more about what you sell.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Items you sell</label>
                       <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-cyan transition-all min-h-[120px]"
                        value={form.products}
                        onChange={e => update('products', e.target.value)}
                        placeholder="Write down some of your main products..."
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">About the Shop</label>
                       <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-cyan transition-all min-h-[100px]"
                        value={form.description}
                        onChange={e => update('description', e.target.value)}
                        placeholder="Why is your shop special?"
                       />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Extra <span className="text-purple">Features</span></h2>
                    <p className="text-white/50 text-lg">Add these to make your website even better.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FEATURES.map(f => (
                      <FeatureCard 
                        key={f.id}
                        feature={f}
                        isSelected={form.selectedFeatures.includes(f.id)}
                        onClick={() => toggleFeature(f.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Check <span className="text-cyan">Price</span></h2>
                    <p className="text-white/50 text-lg">Review your details and see the total cost.</p>
                  </div>
                  <div className="glass p-8 space-y-4 mb-10 bg-white/5">
                     <ReviewRow label="Shop Name" value={form.businessName} />
                     <ReviewRow label="Category" value={form.shopType} />
                     <ReviewRow label="Design" value={form.template} />
                     <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
                        <span className="text-lg font-black uppercase tracking-widest text-white/40">Total Price</span>
                        <span className="text-4xl font-black text-cyan">₹{calculateTotal().toLocaleString()}</span>
                     </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-purple/10 border border-purple/20 text-purple flex items-center gap-4">
                     <Sparkles size={24} />
                     <p className="text-sm font-bold">Price includes website hosting and support for 1 year.</p>
                  </div>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black mb-3">Make <span className="text-purple">Payment</span></h2>
                    <p className="text-white/50 text-lg">Pay now to start building your website.</p>
                  </div>
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="glass p-8 bg-gradient-to-br from-purple/20 to-cyan/20 border-purple/30">
                       <div className="flex justify-between mb-8">
                          <span className="text-white/60 font-bold">Total to Pay</span>
                          <span className="text-2xl font-black text-white">₹{calculateTotal().toLocaleString()}</span>
                       </div>
                       <div className="space-y-4">
                          <button className="w-full py-4 rounded-xl bg-white text-navy font-black hover:bg-white/90 transition-all flex items-center justify-center gap-3">
                             Pay with Card / UPI
                          </button>
                          <button className="w-full py-4 rounded-xl border border-white/20 text-white font-black hover:bg-white/5 transition-all">
                             Other Options
                          </button>
                       </div>
                    </div>
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

function FeatureCard({ feature, isSelected, onClick }) {
  const Icon = feature.icon
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass p-6 flex items-center justify-between cursor-pointer transition-all border-2
        ${isSelected ? 'border-cyan bg-cyan/10' : 'border-white/5 hover:border-white/20'}
      `}
    >
      <div className="flex items-center gap-4">
         <div className={`p-3 rounded-xl ${isSelected ? 'bg-cyan text-navy' : 'bg-white/5 text-white/40'}`}>
            <Icon size={24} />
         </div>
         <div>
            <div className="text-sm font-black uppercase tracking-widest">{feature.name}</div>
            <div className="text-xs text-white/40">+ ₹{feature.price.toLocaleString()}</div>
         </div>
      </div>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-cyan border-cyan text-navy' : 'border-white/10'}`}>
         {isSelected && <Check size={14} strokeWidth={4} />}
      </div>
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
