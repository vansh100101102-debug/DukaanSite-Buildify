import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight, Github, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'

export default function AuthPages({ onLogin, mode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (mode === 'signup' && !name.trim()) return 'Please enter your full name'
    if (!email.trim()) return 'Email is required'
    if (!emailRegex.test(email)) return 'Please enter a valid email address'
    if (!password) return 'Password is required'
    if (password.length < 6) return 'Password must be at least 6 characters'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup'
    const body = mode === 'login' 
      ? { email: email.trim(), password } 
      : { name: name.trim(), email: email.trim(), password }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (res.ok) {
        onLogin(data)
        navigate('/dashboard')
      } else {
        setError(data.message || 'Authentication failed')
      }
    } catch (err) {
      setError('Connection error')
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token })
        })
        const data = await res.json()
        if (res.ok) {
          onLogin(data)
          navigate('/dashboard')
        } else {
          setError(data.message || 'Google login failed')
        }
      } catch (err) {
        setError('Google login error')
      }
    },
    onError: () => setError('Google login failed')
  })

  return (
    <div className="flex min-h-[90vh] bg-navy overflow-hidden">
      {/* Brand Side (Visible on MD+) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-cyan/20 blur-[120px] -z-10" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center font-black text-white italic">D</div>
            <span className="text-2xl font-black tracking-tighter">DukaanSite</span>
          </div>
          
          <h1 className="text-6xl font-black leading-tight mb-8">
            The future of <br />
            <span className="text-cyan">digital commerce</span> <br />
            is in your hands.
          </h1>
          <p className="text-white/50 text-xl max-w-md leading-relaxed">
            Join the elite circle of shopkeepers who have transformed their local presence into a global digital empire.
          </p>
        </motion.div>

        <div className="space-y-6">
           <div className="flex items-center gap-4 text-sm font-bold text-white/60">
              <Zap size={20} className="text-cyan" /> 60fps Performance Architecture
           </div>
           <div className="flex items-center gap-4 text-sm font-bold text-white/60">
              <ShieldCheck size={20} className="text-purple" /> Military Grade Security (AES-256)
           </div>
           <div className="flex items-center gap-4 text-sm font-bold text-white/60">
              <Sparkles size={20} className="text-cyan" /> AI-Powered Conversion Engines
           </div>
        </div>

        {/* Decorative Floating Card */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[-50px] glass p-8 w-64 rotate-12 opacity-50"
        >
           <div className="h-4 w-2/3 bg-white/20 rounded mb-4" />
           <div className="h-20 w-full bg-white/10 rounded-xl mb-4" />
           <div className="h-8 w-full bg-cyan/20 rounded-lg" />
        </motion.div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-purple/5 to-cyan/5 lg:hidden pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass max-w-md w-full p-10 md:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-cyan/5 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="mb-10">
              <h2 className="text-4xl font-black mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Empire'}
              </h2>
              <p className="text-white/50 font-medium">
                {mode === 'login' 
                  ? 'Enter your credentials to manage your sites.' 
                  : 'Start your journey with a premium foundation.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={20} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan focus:bg-white/10 transition-all font-medium"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={20} />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan focus:bg-white/10 transition-all font-medium"
                    placeholder="jane@dukaansite.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple transition-colors" size={20} />
                  <input 
                    type="password" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple focus:bg-white/10 transition-all font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button className="btn-premium w-full py-5 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-purple/20">
                {mode === 'login' ? 'Access Dashboard' : 'Launch My Empire'}
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-white/5 space-y-6">
              <div className="text-center">
                <p className="text-white/40 text-sm font-medium">
                  {mode === 'login' ? "Don't have an empire yet?" : "Already a member of the elite?"}{' '}
                  <Link 
                    to={mode === 'login' ? '/signup' : '/login'}
                    className="text-cyan hover:underline font-black"
                  >
                    {mode === 'login' ? 'Create Account' : 'Sign In'}
                  </Link>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button className="flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest">
                    <Github size={16} /> Github
                 </button>
                 <button 
                  type="button"
                  onClick={() => googleLogin()}
                  className="flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest"
                 >
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Google
                 </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
