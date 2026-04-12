import Link from 'next/link'

export default function Pricing() {
  const features = [
    'Unlimited description optimizations',
    'YouTube video data auto-fetch',
    'AI affiliate link placement',
    'SEO keyword injection',
    'Before/after diff view',
    'Full optimization history',
    'Changes summary breakdown',
    'Cancel anytime — no contracts',
  ]

  return (
    <section id="pricing" style={{ padding: '5rem 1.5rem', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            color: '#111827',
            letterSpacing: '-0.025em',
            marginBottom: '0.75rem',
          }}>
            Simple Pricing
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.1rem' }}>
            One plan. Everything included. Cancel anytime.
          </p>
        </div>

        <div className="card card-green" style={{ textAlign: 'left' }}>
          {/* Price header */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontWeight: 800,
              fontSize: '3rem',
              color: '#111827',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              $29
              <span style={{ fontSize: '1.1rem', fontWeight: 500, color: '#6B7280' }}>/mo</span>
            </div>
            <div style={{
              marginTop: '0.5rem',
              fontFamily: 'var(--font-outfit), sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#16A34A',
            }}>
              7-day free trial — no credit card required
            </div>
          </div>

          {/* Features */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {features.map((feat) => (
              <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: '#22C55E',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: '0.95rem', color: '#374151' }}>{feat}</span>
              </li>
            ))}
          </ul>

          <Link href="/login?tab=signup" className="btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
            Start Free Trial →
          </Link>

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#9CA3AF' }}>
            No credit card needed for the 7-day trial. After that, $29/mo billed monthly.
          </p>
        </div>
      </div>
    </section>
  )
}
