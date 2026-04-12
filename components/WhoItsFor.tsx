export default function WhoItsFor() {
  const audiences = [
    {
      emoji: '🎮',
      title: 'Tech & Gear Reviewers',
      body: 'Your Amazon affiliate links live and die in the description. Better placement = more clicks on every video in your back catalog.',
    },
    {
      emoji: '💰',
      title: 'Finance & Investing Creators',
      body: 'Brokerage referrals, credit card links, and course promos all belong in the description. SEO keywords compound over time.',
    },
    {
      emoji: '🧠',
      title: 'Tutorial & How-To Channels',
      body: 'Viewers searching for solutions are buying intent. Optimize for the exact phrases they search and put your tool recommendations front and center.',
    },
    {
      emoji: '🏋️',
      title: 'Fitness & Lifestyle',
      body: 'Supplement links, equipment roundups, program promos. High-converting niches with expensive products where 3× CTR is real money.',
    },
    {
      emoji: '📚',
      title: 'Education & Courses',
      body: 'Drive enrollment from your own videos. Contextual CTAs in descriptions outperform end screens and cards for course conversions.',
    },
    {
      emoji: '🎯',
      title: 'Any Channel with Affiliate Links',
      body: 'If you have affiliate links and publish on YouTube, you are leaving money in your descriptions. TubeProfit gets it back.',
    },
  ]

  return (
    <section style={{ padding: '5rem 1.5rem' }}>
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
            Built for Creators Who Monetize
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.1rem' }}>
            If you have affiliate links, this tool makes them work harder.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {audiences.map(({ emoji, title, body }) => (
            <div key={title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{emoji}</span>
              <h3 style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#111827',
              }}>{title}</h3>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
