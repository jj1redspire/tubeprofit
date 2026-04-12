import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section style={{
      padding: '5rem 1.5rem',
      background: '#111827',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#ffffff',
          letterSpacing: '-0.03em',
          marginBottom: '1.25rem',
          lineHeight: 1.2,
        }}>
          Stop Leaving Affiliate Revenue in Your Descriptions
        </h2>

        <p style={{
          color: '#9CA3AF',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          7 days free. No credit card. Optimize your first video in the next 10 minutes.
        </p>

        <Link
          href="/login?tab=signup"
          className="btn-primary"
          style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
        >
          Start Free Trial →
        </Link>

        <p style={{ marginTop: '1rem', color: '#6B7280', fontSize: '0.875rem' }}>
          Then $29/mo. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
