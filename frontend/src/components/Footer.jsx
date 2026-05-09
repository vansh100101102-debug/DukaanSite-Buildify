import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Twitter, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 pt-24 pb-12 px-6 bg-navy border-t border-white/5">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center text-white shadow-lg shadow-purple/20">
                <Layout size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tight">DukaanSite</span>
            </Link>
            <p className="text-white/50 text-lg max-w-sm mb-8 leading-relaxed">
              Empowering local businesses with world-class digital storefronts. Build your future, one pixel at a time.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Github} />
              <SocialIcon icon={Linkedin} />
              <SocialIcon icon={Mail} />
            </div>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-white/40">Platform</h4>
            <ul className="flex flex-col gap-4">
              <FooterLink to="/templates">Templates</FooterLink>
              <FooterLink to="/order">Pricing</FooterLink>
              <FooterLink to="/">Features</FooterLink>
              <FooterLink to="/">Showcase</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-white/40">Support</h4>
            <ul className="flex flex-col gap-4">
              <FooterLink to="/">Help Center</FooterLink>
              <FooterLink to="/">Terms of Service</FooterLink>
              <FooterLink to="/">Privacy Policy</FooterLink>
              <FooterLink to="/">Contact Us</FooterLink>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm font-medium">
            © {new Date().getFullYear()} DukaanSite Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">System Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon: Icon }) {
  return (
    <a href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all">
      <Icon size={20} />
    </a>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-white/50 hover:text-cyan transition-colors font-medium">
        {children}
      </Link>
    </li>
  )
}
