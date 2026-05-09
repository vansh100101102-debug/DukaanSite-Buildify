import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TemplateSlideshow from './components/TemplateSlideshow'
import TemplateShowcase from './components/TemplateShowcase'
import EngineeredSection from './components/EngineeredSection'
import CTASection from './components/CTASection'
import OrderForm from './components/OrderForm'
import AuthPages from './pages/AuthPages'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'
import ThreeBackground from './components/ThreeBackground'
import SplineBackground from './components/SplineBackground'
import Footer from './components/Footer'
import AIChatBot from './components/AIChatBot'
import { GoogleOAuthProvider } from '@react-oauth/google'

import './index.css'

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

function App() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Enforce dark mode globally
    document.body.classList.remove('light-mode')
    localStorage.removeItem('theme')

    const savedUser = localStorage.getItem('userId')
    const savedEmail = localStorage.getItem('userEmail')
    if (savedUser) {
      setUser({ id: savedUser, email: savedEmail })
      if (savedEmail === 'vansh100101102@gmail.com') {
        setIsAdmin(true)
      }
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('userId', userData.id)
    localStorage.setItem('userEmail', userData.email)
    if (userData.email === 'vansh100101102@gmail.com') {
      setIsAdmin(true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsAdmin(false)
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
  }

  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 4000)
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || '731804368940-0m9p3e59l0p0f0l1l1l1l1l1l1l1l1l1.apps.googleusercontent.com'}>
      <div className="min-h-screen selection:bg-purple selection:text-white">
        <SplineBackground />
        <AIChatBot />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            isLoggedIn={!!user}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <main className="flex-1 pt-32">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <PageWrapper>
                    <HeroSection />
                    <TemplateSlideshow />
                    <TemplateShowcase />
                    <EngineeredSection />
                    <CTASection />
                  </PageWrapper>
                } />
                <Route path="/templates" element={<PageWrapper><TemplateShowcase /></PageWrapper>} />
                <Route path="/order" element={<PageWrapper><OrderForm isLoggedIn={!!user} userEmail={user?.email} userId={user?.id} showToast={showToast} /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><AuthPages onLogin={handleLogin} mode="login" /></PageWrapper>} />
                <Route path="/signup" element={<PageWrapper><AuthPages onLogin={handleLogin} mode="signup" /></PageWrapper>} />
                <Route path="/dashboard" element={<PageWrapper><DashboardPage isLoggedIn={!!user} userEmail={user?.email} userId={user?.id} /></PageWrapper>} />
                <Route path="/admin" element={<PageWrapper><AdminPage isLoggedIn={!!user} isAdmin={isAdmin} /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000]"
          >
            <div className={`px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border backdrop-blur-xl ${
              notification.type === 'error' 
                ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                : 'bg-cyan/10 border-cyan/20 text-cyan'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                notification.type === 'error' ? 'bg-red-400' : 'bg-cyan'
              }`} />
              <span className="font-bold text-sm tracking-wide uppercase">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GoogleOAuthProvider>
  )
}

export default App
