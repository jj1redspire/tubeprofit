export default function Problem() {
  const problems = [
    {
      icon: '📉',
      title: 'Weak above-the-fold hooks',
      body: 'YouTube shows only 2-3 lines before "Show more." If those lines don\'t convert, your affiliate links don\'t get clicked — full stop.',
    },
    {
      icon: '🔍',
      title: 'Zero SEO optimization',
      body: 'Most creators write descriptions for humans, not search. Your video is invisible to the 65% of YouTube traffic that comes from search and suggested.',
    },
    {
      icon: '💸',
      title: 'Buried affiliate links',
      body: 'Pasting a link at the bottom with "(affiliate)" doesn\'t convert. Contextual placement with persuasive copy around each link 3× click-through rates.',
    },
  ]

  return (
    <section style={{
      padding: '5rem 1.5rem',
      background: '#F9FAFB',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            color: '#111827',
            letterSpacing: '-0.025em',
            marginBottom: '0.75rem',
          }}>
            Why 90% of Creator Descriptions Underperform
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto' }}>
            It&apos;s not your content. It&apos;s the wrapper.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {problems.map(({ icon, title, body }) => (
            <div key={title} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#111827',
                marginBottom: '0.5rem',
              }}>{title}</h3>
              <p style={{ color: '#6B7280', lineHeight: 1.7, fontSize: '0.95rem' }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
