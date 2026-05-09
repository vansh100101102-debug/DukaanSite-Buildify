import { useTranslation } from 'react-i18next'

const steps = [
  { num: 1, key: 'step1', emoji: '📝' },
  { num: 2, key: 'step2', emoji: '🎨' },
  { num: 3, key: 'step3', emoji: '🤖' },
  { num: 4, key: 'step4', emoji: '🚀' },
]

export default function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>
            {t('howItWorks.title')}{' '}
            <span className="gradient-text">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p>{t('howItWorks.subtitle')}</p>
        </div>
        <div className="steps-grid">
          {steps.map(({ num, key, emoji }, i) => (
            <div key={key} className={`step-card animate-fade-in-up delay-${i + 1}`}>
              <div className="step-number">{num}</div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{emoji}</div>
              <h3>{t(`howItWorks.${key}.title`)}</h3>
              <p>{t(`howItWorks.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
