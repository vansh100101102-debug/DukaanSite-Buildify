import { useTranslation } from 'react-i18next'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    shop: 'Kumar General Store, Lucknow',
    initials: 'RK',
    stars: 5,
    key: 't1',
  },
  {
    name: 'Priya Sharma',
    shop: 'Sharma Electronics, Jaipur',
    initials: 'PS',
    stars: 5,
    key: 't2',
  },
  {
    name: 'Mohammed Irfan',
    shop: 'Irfan Wholesale, Hyderabad',
    initials: 'MI',
    stars: 5,
    key: 't3',
  },
]

export default function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>
            {t('testimonials.title')}{' '}
            <span className="gradient-text">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p>{t('testimonials.subtitle')}</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <div key={item.key} className={`testimonial-card animate-fade-in-up delay-${i + 1}`}>
              <div className="testimonial-stars">
                {'★'.repeat(item.stars)}
              </div>
              <blockquote>"{t(`testimonials.${item.key}`)}"</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">{item.initials}</div>
                <div className="author-info">
                  <div className="author-name">{item.name}</div>
                  <div className="author-shop">{item.shop}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
