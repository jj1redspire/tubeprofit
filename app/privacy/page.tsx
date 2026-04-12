import Link from 'next/link'

export default function Privacy() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 1.5rem', fontFamily: 'var(--font-jakarta), sans-serif' }}>
      <Link href="/" style={{ color: '#22C55E', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
        ← Back to home
      </Link>
      <h1 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 800, fontSize: '2rem', color: '#111827', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        Privacy Policy
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '2rem', fontSize: '0.875rem' }}>Last updated: April 10, 2026</p>

      {[
        {
          title: 'Information We Collect',
          body: 'We collect your email address when you sign up. When you use the optimizer, we store the YouTube URL, video title, original description, and optimized output in our database.',
        },
        {
          title: 'How We Use Your Information',
          body: 'Your data is used to provide the TubeProfit service, display your optimization history, and manage your subscription. We do not sell your data.',
        },
        {
          title: 'Third-Party Services',
          body: 'We use Supabase for data storage and authentication, Stripe for payment processing, the YouTube Data API v3 to fetch video information, and Anthropic\'s Claude API to generate optimized descriptions.',
        },
        {
          title: 'Data Retention',
          body: 'Your optimization history is retained until you cancel your account. You can request deletion at any time by emailing support@tubeprofit.co.',
        },
        {
          title: 'Contact',
          body: 'Questions about this policy? Email support@tubeprofit.co.',
        },
      ].map(({ title, body }) => (
        <div key={title} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#111827', marginBottom: '0.5rem' }}>{title}</h2>
          <p style={{ color: '#4B5563', lineHeight: 1.7 }}>{body}</p>
        </div>
      ))}
    </div>
  )
}
