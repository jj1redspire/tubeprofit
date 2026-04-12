export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Paste your YouTube URL',
      body: 'Drop in any YouTube video link. TubeProfit fetches the title, current description, and tags automatically via the YouTube API.',
    },
    {
      number: '02',
      title: 'AI analyzes and rewrites',
      body: 'Claude analyzes your content niche, identifies affiliate opportunities, and rewrites your description with an optimized hook, contextual links, and SEO keywords.',
    },
    {
      number: '03',
      title: 'Copy, paste, publish',
      body: 'Review the before/after diff, see a breakdown of every change, and copy the new description straight into YouTube Studio. Done.',
    },
  ]

  return (
    <section id="how-it-works" style={{ padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            color: '#111827',
            letterSpacing: '-0.025em',
            marginBottom: '0.75rem',
          }}>
            Three Steps. Ten Seconds.
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.1rem' }}>
            No prompts to write. No copy-pasting into ChatGPT. Just results.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {steps.map(({ number, title, body }) => (
            <div key={number} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 800,
                fontSize: '2.5rem',
                color: '#22C55E',
                opacity: 0.3,
                lineHeight: 1,
              }}>{number}</div>
              <h3 style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 700,
                fontSize: '1.15rem',
                color: '#111827',
              }}>{title}</h3>
              <p style={{ color: '#6B7280', lineHeight: 1.7, fontSize: '0.95rem' }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
