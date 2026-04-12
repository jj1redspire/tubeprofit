import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: '#111827',
      borderTop: '1px solid #1F2937',
      padding: '2rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: '#22C55E',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
              <path d="M3 14L7 6L11 10L13 7L16 14H3Z" fill="white" />
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 700,
            fontSize: '1rem',
            color: '#F9FAFB',
          }}>Tube<span style={{ color: '#22C55E' }}>Profit</span></span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ color: '#6B7280', fontSize: '0.85rem', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#6B7280', fontSize: '0.85rem', textDecoration: 'none' }}>Terms</Link>
          <Link href="/login" style={{ color: '#6B7280', fontSize: '0.85rem', textDecoration: 'none' }}>Log in</Link>
        </div>

        <p style={{ color: '#4B5563', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} TubeProfit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
