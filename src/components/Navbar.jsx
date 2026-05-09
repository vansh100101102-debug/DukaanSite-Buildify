import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe, Layout, User, LogOut, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ isLoggedIn, handleLogout, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, i18n } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLang = (e) => i18n.changeLanguage(e.target.value)
  const close = () => setIsOpen(false)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`container max-w-7xl mx-auto px-6`}>
        <div className={`glass px-8 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'rounded-2xl shadow-2xl' : 'rounded-3xl'}`}>
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group" onClick={close}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-purple/20">
              <Layout size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tight text-current transition-all">
              DukaanSite
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/" label={t('nav.home')} />
            <NavLink to="/templates" label={t('nav.templates')} />
            <NavLink to="/order" label={t('nav.order')} />
            {isLoggedIn && <NavLink to="/dashboard" label={t('nav.dashboard')} />}
            {isAdmin && <NavLink to="/admin" label={t('nav.admin')} />}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none focus:border-cyan transition-colors"
              value={i18n.language} 
              onChange={changeLang}
            >
              <option value="en">EN</option>
              <option value="hi">हिं</option>
            </select>

            <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />

            {!isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-6 py-2 rounded-xl hover:bg-white/5 transition-colors font-bold text-sm">
                  {t('nav.login')}
                </Link>
                <Link to="/order" className="px-6 py-2 rounded-xl bg-purple text-white font-black text-sm hover:bg-cyan transition-all shadow-xl shadow-purple/10">
                  Get Started
                </Link>
              </div>
            ) : (
              <button 
                onClick={handleLogout}
                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all group"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            )}

            <button 
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 p-6 mt-2"
          >
            <div className="glass p-8 flex flex-col gap-4">
              <MobileNavLink to="/" label={t('nav.home')} onClick={close} />
              <MobileNavLink to="/templates" label={t('nav.templates')} onClick={close} />
              <MobileNavLink to="/order" label={t('nav.order')} onClick={close} />
              {isLoggedIn && <MobileNavLink to="/dashboard" label={t('nav.dashboard')} onClick={close} />}
              {!isLoggedIn && (
                <Link to="/login" className="btn-premium text-center" onClick={close}>
                  {t('nav.login')}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function NavLink({ to, label }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link 
      to={to} 
      className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${active ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
    >
      {label}
    </Link>
  )
}

function MobileNavLink({ to, label, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="text-2xl font-black py-2 border-b border-white/5 hover:text-cyan transition-colors"
    >
      {label}
    </Link>
  )
}
