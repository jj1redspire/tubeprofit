'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Optimization {
  id: string
  youtube_url: string
  video_title: string | null
  changes_summary: string | null
  created_at: string
}

interface UserData {
  subscription_status: string
  trial_end: string | null
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser]   = useState<{ id: string; email: string } | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [history, setHistory]   = useState<Optimization[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      setUser({ id: session.user.id, email: session.user.email! })

      const [{ data: ud }, { data: opts }] = await Promise.all([
        supabase.from('users').select('subscription_status, trial_end').eq('id', session.user.id).single(),
        supabase.from('optimizations').select('id, youtube_url, video_title, changes_summary, created_at')
          .eq('user_id', session.user.id).order('created_at', { ascending: false }).limit(10),
      ])

      setUserData(ud)
      setHistory(opts || [])
      setLoading(false)
    }
    load()
  }, [router])

  async function handleUpgrade() {
    if (!user) return
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#6B7280' }}>Loading…</div>
      </div>
    )
  }

  const isActive = userData?.subscription_status === 'active' || userData?.subscription_status === 'trialing'

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Header */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #E5E7EB',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 800, fontSize: '1.1rem', color: '#111827',
        }}>
          Tube<span style={{ color: '#22C55E' }}>Profit</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>{user?.email}</span>
          <Link href="/settings" style={{ fontSize: '0.875rem', color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>Settings</Link>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#6B7280', fontWeight: 500 }}>
            Sign Out
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Subscription banner */}
        {!isActive && (
          <div style={{
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '0.75rem',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div>
              <p style={{ fontWeight: 600, color: '#92400E', fontSize: '0.95rem' }}>Your trial has ended</p>
              <p style={{ color: '#B45309', fontSize: '0.875rem' }}>Subscribe to keep optimizing descriptions.</p>
            </div>
            <button onClick={handleUpgrade} className="btn-primary" style={{ padding: '0.625rem 1.5rem', fontSize: '0.9rem' }}>
              Subscribe — $29/mo →
            </button>
          </div>
        )}

        {/* Trial notice */}
        {userData?.subscription_status === 'trialing' && userData.trial_end && (
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '0.75rem',
            padding: '0.875rem 1.5rem',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            color: '#16A34A',
          }}>
            Trial active — ends {new Date(userData.trial_end).toLocaleDateString()}
          </div>
        )}

        {/* Welcome + CTA */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 800, fontSize: '1.75rem', color: '#111827',
            letterSpacing: '-0.02em', marginBottom: '0.5rem',
          }}>
            Dashboard
          </h1>
          <p style={{ color: '#6B7280', marginBottom: '1.25rem' }}>
            Optimize a YouTube description to start earning more from your affiliate links.
          </p>
          {isActive && (
            <Link href="/optimize" className="btn-primary" style={{ display: 'inline-flex' }}>
              Optimize a Description →
            </Link>
          )}
        </div>

        {/* Recent optimizations */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 700, fontSize: '1.1rem', color: '#111827', marginBottom: '1rem',
          }}>
            Recent Optimizations
          </h2>

          {history.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: '#9CA3AF' }}>
              No optimizations yet. {isActive ? (
                <Link href="/optimize" style={{ color: '#22C55E', textDecoration: 'none', fontWeight: 600 }}>
                  Optimize your first video →
                </Link>
              ) : 'Subscribe to get started.'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {history.map((opt) => (
                <div key={opt.id} className="card" style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontWeight: 600, color: '#111827', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                        {opt.video_title || 'Untitled video'}
                      </p>
                      <a href={opt.youtube_url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '0.8rem', color: '#22C55E', textDecoration: 'none' }}>
                        {opt.youtube_url.slice(0, 60)}{opt.youtube_url.length > 60 ? '…' : ''}
                      </a>
                      {opt.changes_summary && (
                        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.5 }}>
                          {opt.changes_summary}
                        </p>
                      )}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                      {new Date(opt.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
