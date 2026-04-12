'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Suspense } from 'react'

interface UserData {
  subscription_status: string
  trial_end: string | null
  current_period_end: string | null
}

function SettingsContent() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser]         = useState<{ id: string; email: string } | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading]   = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (searchParams.get('checkout') === 'success') {
      setSuccessMsg('Subscription activated! Welcome to TubeProfit.')
    }
  }, [searchParams])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setUser({ id: session.user.id, email: session.user.email! })

      const { data } = await supabase
        .from('users')
        .select('subscription_status, trial_end, current_period_end')
        .eq('id', session.user.id)
        .single()

      setUserData(data)
      setLoading(false)
    })
  }, [router])

  async function handleManageBilling() {
    if (!user) return
    setPortalLoading(true)
    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
    setPortalLoading(false)
  }

  async function handleUpgrade() {
    if (!user) return
    setCheckoutLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
    setCheckoutLoading(false)
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

  const statusColors: Record<string, string> = {
    active:   '#16A34A',
    trialing: '#16A34A',
    past_due: '#D97706',
    canceled: '#DC2626',
    inactive: '#6B7280',
  }

  const statusLabels: Record<string, string> = {
    active:   'Active',
    trialing: 'Free Trial',
    past_due: 'Past Due',
    canceled: 'Canceled',
    inactive: 'Inactive',
  }

  const status = userData?.subscription_status || 'inactive'
  const isActive = ['active', 'trialing'].includes(status)

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
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
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <Link href="/dashboard" style={{ fontSize: '0.875rem', color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>
            Dashboard
          </Link>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#6B7280', fontWeight: 500 }}>
            Sign Out
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 800, fontSize: '1.75rem', color: '#111827',
          letterSpacing: '-0.02em', marginBottom: '2rem',
        }}>
          Settings
        </h1>

        {successMsg && (
          <div style={{
            background: '#F0FDF4', border: '1px solid #BBF7D0',
            borderRadius: '0.75rem', padding: '1rem 1.5rem',
            color: '#16A34A', marginBottom: '1.5rem', fontWeight: 500,
          }}>
            {successMsg}
          </div>
        )}

        {/* Account */}
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700, fontSize: '1rem', color: '#111827', marginBottom: '1rem' }}>
            Account
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>Email</p>
              <p style={{ fontWeight: 500, color: '#111827' }}>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700, fontSize: '1rem', color: '#111827', marginBottom: '1rem' }}>
            Subscription
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>Status</p>
              <span style={{
                background: isActive ? '#F0FDF4' : '#F3F4F6',
                color: statusColors[status] || '#6B7280',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}>
                {statusLabels[status] || status}
              </span>
            </div>

            {userData?.current_period_end && isActive && (
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  {status === 'trialing' ? 'Trial ends' : 'Renews'}
                </p>
                <p style={{ fontWeight: 500, color: '#111827' }}>
                  {new Date(userData.current_period_end).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {isActive && status !== 'trialing' ? (
            <button
              onClick={handleManageBilling}
              disabled={portalLoading}
              className="btn-outline"
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem', opacity: portalLoading ? 0.7 : 1 }}
            >
              {portalLoading ? 'Opening…' : 'Manage Billing'}
            </button>
          ) : !isActive ? (
            <button
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="btn-primary"
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem', opacity: checkoutLoading ? 0.7 : 1 }}
            >
              {checkoutLoading ? 'Loading…' : 'Subscribe — $29/mo →'}
            </button>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="btn-primary"
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem', opacity: checkoutLoading ? 0.7 : 1 }}
            >
              {checkoutLoading ? 'Loading…' : 'Upgrade Now →'}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsContent />
    </Suspense>
  )
}
