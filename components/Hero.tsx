import Link from 'next/link'

export default function Hero() {
  return (
    <section style={{
      padding: '5rem 1.5rem 4rem',
      textAlign: 'center',
      maxWidth: '860px',
      margin: '0 auto',
    }}>
      {/* Badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
        <span className="badge">
          <span className="pulse-dot" />
          AI-Powered · YouTube Descriptions · More Affiliate Revenue
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'var(--font-outfit), sans-serif',
        fontWeight: 800,
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        lineHeight: 1.15,
        color: '#111827',
        letterSpacing: '-0.03em',
        marginBottom: '1.5rem',
      }}>
        Your YouTube Descriptions Are{' '}
        <span className="gradient-text">Leaving Money on the Table</span>
      </h1>

      {/* Subhead */}
      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        color: '#4B5563',
        lineHeight: 1.7,
        marginBottom: '2.5rem',
        maxWidth: '640px',
        margin: '0 auto 2.5rem',
      }}>
        Paste your video URL. Get an AI-optimized description with better affiliate hooks,
        SEO keywords, and CTAs — in under 10 seconds.
      </p>

      {/* CTA row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <Link href="/login?tab=signup" className="btn-primary" style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}>
          Start Free — 7 Days No Card Required →
        </Link>
        <Link href="#how-it-works" className="btn-outline" style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}>
          See How It Works
        </Link>
      </div>

      {/* Social proof numbers */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2.5rem',
        marginTop: '3rem',
        padding: '2rem',
        background: '#F9FAFB',
        borderRadius: '1rem',
        border: '1px solid #E5E7EB',
      }}>
        {[
          { stat: '3×', label: 'More affiliate clicks on average' },
          { stat: '<10s', label: 'To optimize any video' },
          { stat: '$29/mo', label: 'All-in, cancel anytime' },
        ].map(({ stat, label }) => (
          <div key={stat} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontWeight: 800,
              fontSize: '2rem',
              color: '#22C55E',
              letterSpacing: '-0.02em',
            }}>{stat}</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
