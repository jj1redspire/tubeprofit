'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #E5E7EB',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#22C55E',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 14L7 6L11 10L13 7L16 14H3Z" fill="white" />
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 800,
            fontSize: '1.2rem',
            color: '#111827',
            letterSpacing: '-0.02em',
          }}>
            Tube<span style={{ color: '#22C55E' }}>Profit</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
          <Link href="#how-it-works" style={{ color: '#4B5563', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none' }}>
            How It Works
          </Link>
          <Link href="#pricing" style={{ color: '#4B5563', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none' }}>
            Pricing
          </Link>
          <Link href="/login" style={{ color: '#4B5563', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none' }}>
            Log in
          </Link>
          <Link href="/login?tab=signup" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            Start Free Trial
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
          className="md:hidden"
        >
          <div style={{ width: '22px', height: '2px', background: '#111827', marginBottom: '5px' }} />
          <div style={{ width: '22px', height: '2px', background: '#111827', marginBottom: '5px' }} />
          <div style={{ width: '22px', height: '2px', background: '#111827' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: '#ffffff',
          borderTop: '1px solid #E5E7EB',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <Link href="#how-it-works" style={{ color: '#4B5563', fontWeight: 500, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="#pricing" style={{ color: '#4B5563', fontWeight: 500, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/login" style={{ color: '#4B5563', fontWeight: 500, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Log in</Link>
          <Link href="/login?tab=signup" className="btn-primary" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Start Free Trial</Link>
        </div>
      )}
    </nav>
  )
}
