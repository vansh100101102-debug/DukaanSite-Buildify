import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorks from '../components/HowItWorks'
import TemplateShowcase from '../components/TemplateShowcase'
import TestimonialsSection from '../components/TestimonialsSection'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TemplateShowcase limit={6} />
      <TestimonialsSection />

      <section className="cta-section section">
        <div className="container">
          <div className="cta-box">
            <h2>
              {t('cta.title')}{' '}
              <span className="gradient-text">{t('cta.titleHighlight')}</span>
            </h2>
            <p>{t('cta.subtitle')}</p>
            <Link to="/order" className="btn-primary">
              {t('cta.button')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
