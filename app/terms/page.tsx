import Link from 'next/link'

export default function Terms() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 1.5rem', fontFamily: 'var(--font-jakarta), sans-serif' }}>
      <Link href="/" style={{ color: '#22C55E', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
        ← Back to home
      </Link>
      <h1 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 800, fontSize: '2rem', color: '#111827', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        Terms of Service
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '2rem', fontSize: '0.875rem' }}>Last updated: April 10, 2026</p>

      {[
        {
          title: 'Acceptance of Terms',
          body: 'By using TubeProfit you agree to these terms. If you do not agree, do not use the service.',
        },
        {
          title: 'Subscription and Billing',
          body: 'TubeProfit is $29/month after a 7-day free trial. Your subscription renews automatically each month. You may cancel at any time from your Settings page. No refunds are provided for partial billing periods.',
        },
        {
          title: 'Acceptable Use',
          body: 'You may use TubeProfit only for lawful purposes. You may not use the service to violate YouTube\'s Terms of Service, generate spam, or misrepresent AI-generated content as your own original work in ways that violate platform rules.',
        },
        {
          title: 'Disclaimer',
          body: 'TubeProfit provides AI-generated content as a starting point. We make no guarantees about specific revenue increases. Affiliate earnings depend on many factors outside our control.',
        },
        {
          title: 'Limitation of Liability',
          body: 'TubeProfit is not liable for any indirect, incidental, or consequential damages arising from your use of the service.',
        },
        {
          title: 'Contact',
          body: 'Questions? Email support@tubeprofit.co.',
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
