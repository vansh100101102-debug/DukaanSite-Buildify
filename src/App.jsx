import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TemplateShowcase from './components/TemplateShowcase'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import CTASection from './components/CTASection'
import OrderForm from './components/OrderForm'
import AuthPages from './pages/AuthPages'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'
import ThreeBackground from './components/ThreeBackground'
import SplineBackground from './components/SplineBackground'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

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

  const showToast = (msg) => console.log('Toast:', msg)

  return (
    <div className="min-h-screen bg-navy text-white selection:bg-purple selection:text-white lg:cursor-none">
      <CustomCursor />
      <SplineBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar isLoggedIn={!!user} handleLogout={handleLogout} isAdmin={isAdmin} />
        <main className="flex-1 pt-32">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <PageWrapper>
                  <HeroSection />
                  <TemplateShowcase />
                  <FeaturesSection />
                  <PricingSection />
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
  )
}

export default App
