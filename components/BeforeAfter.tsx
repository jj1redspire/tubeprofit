export default function BeforeAfter() {
  const before = `Best budget laptop review 2024! In this video I go over
my top picks for budget laptops under $500. I've tested
all of these personally.

Links:
HP Laptop - https://amzn.to/xxxxx
Acer - https://amzn.to/xxxxx
Lenovo - https://amzn.to/xxxxx

Subscribe for more tech videos!
Like and comment below.`

  const after = `I tested 12 laptops under $500 so you don't have to. Here
are the only 3 worth buying in 2024 — plus the ones to
AVOID no matter what.

🔗 My top pick (best performance/dollar):
→ HP Pavilion 15 [AFFILIATE]: https://amzn.to/xxxxx

🔗 Best for students (lightest + longest battery):
→ Acer Aspire 5 Slim [AFFILIATE]: https://amzn.to/xxxxx

🔗 Best value overall:
→ Lenovo IdeaPad 3 [AFFILIATE]: https://amzn.to/xxxxx

⏱ TIMESTAMPS:
00:00 - Intro + what I tested
02:15 - Benchmarks breakdown
08:40 - Display & build quality comparison
14:20 - Final rankings + who should buy what

📌 Best budget laptop under 500 | laptop buying guide 2024
| best affordable laptops | HP vs Acer vs Lenovo

👇 Which laptop are you considering? Drop it below and
I'll tell you if it's worth it.`

  return (
    <section style={{ padding: '5rem 1.5rem', background: '#F9FAFB' }}>
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
            The Difference Is Obvious
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.1rem' }}>
            Same video. Same affiliate links. Completely different results.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {/* Before */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}>
              <div style={{
                background: '#FEF2F2',
                color: '#DC2626',
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>Before</div>
              <span style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>0.8% affiliate CTR</span>
            </div>
            <div className="code-block">
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.82rem' }}>
                <span className="dim">{before}</span>
              </pre>
            </div>
          </div>

          {/* After */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}>
              <div style={{
                background: '#F0FDF4',
                color: '#16A34A',
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>After</div>
              <span style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>2.7% affiliate CTR</span>
            </div>
            <div className="code-block" style={{ border: '1px solid rgba(34,197,94,0.3)' }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.82rem' }}>
                <span className="highlight">{after}</span>
              </pre>
            </div>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#9CA3AF',
          fontSize: '0.85rem',
        }}>
          * Example output. Results vary by niche, audience size, and affiliate program.
        </p>
      </div>
    </section>
  )
}
