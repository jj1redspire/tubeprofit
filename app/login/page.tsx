'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab]         = useState<'login' | 'signup'>('login')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (searchParams.get('tab') === 'signup') setTab('signup')
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (tab === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Check your email to confirm your account, then log in.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: '#F9FAFB',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '36px', height: '36px', background: '#22C55E',
              borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M3 14L7 6L11 10L13 7L16 14H3Z" fill="white" />
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontWeight: 800, fontSize: '1.35rem', color: '#111827', letterSpacing: '-0.02em',
            }}>
              Tube<span style={{ color: '#22C55E' }}>Profit</span>
            </span>
          </Link>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          {/* Tab switcher */}
          <div style={{
            display: 'flex', background: '#F3F4F6', borderRadius: '0.5rem',
            padding: '4px', marginBottom: '1.75rem',
          }}>
            {(['login', 'signup'] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setSuccess('') }}
                style={{
                  flex: 1, padding: '0.625rem',
                  background: tab === t ? '#ffffff' : 'transparent',
                  border: 'none', borderRadius: '0.375rem',
                  fontFamily: 'var(--font-outfit), sans-serif',
                  fontWeight: 600, fontSize: '0.9rem',
                  color: tab === t ? '#111827' : '#6B7280',
                  cursor: 'pointer',
                  boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {t === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="input-field"
              />
            </div>

            {error && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA',
                borderRadius: '0.5rem', padding: '0.75rem 1rem',
                color: '#DC2626', fontSize: '0.875rem',
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                background: '#F0FDF4', border: '1px solid #BBF7D0',
                borderRadius: '0.5rem', padding: '0.75rem 1rem',
                color: '#16A34A', fontSize: '0.875rem',
              }}>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Please wait…' : tab === 'login' ? 'Log In' : 'Create Account — Free Trial'}
            </button>
          </form>

          {tab === 'signup' && (
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#9CA3AF' }}>
              7-day free trial. No credit card required.
            </p>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
          <Link href="/" style={{ color: '#22C55E', textDecoration: 'none', fontWeight: 500 }}>
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
