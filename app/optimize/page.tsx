'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface OptimizeResult {
  videoTitle:          string
  originalDescription: string
  optimized_description: string
  changes_summary:     string
  affiliate_links_found: string[]
  seo_keywords_added:  string[]
  estimated_improvement: string
}

export default function OptimizePage() {
  const router  = useRouter()
  const [userId, setUserId]   = useState<string | null>(null)
  const [url, setUrl]         = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [result, setResult]   = useState<OptimizeResult | null>(null)
  const [copied, setCopied]   = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setUserId(session.user.id)
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return
    setLoading(true)
    setError('')
    setResult(null)

    const res = await fetch('/api/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ youtubeUrl: url, userId }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Optimization failed')
    } else {
      setResult(data)
    }

    setLoading(false)
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result.optimized_description)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        <Link href="/dashboard" style={{ fontSize: '0.875rem', color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>
          ← Dashboard
        </Link>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 800, fontSize: '1.75rem', color: '#111827',
          letterSpacing: '-0.02em', marginBottom: '0.5rem',
        }}>
          Optimize Description
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
          Paste a YouTube video URL and get an AI-optimized description in seconds.
        </p>

        {/* Input form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            required
            className="input-field"
            style={{ flex: 1, minWidth: '260px' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ opacity: loading ? 0.7 : 1, whiteSpace: 'nowrap' }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                  display: 'inline-block',
                }} />
                Optimizing…
              </span>
            ) : 'Optimize →'}
          </button>
        </form>

        {/* Loading state */}
        {loading && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
            <div style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🤖</div>
            <p style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Analyzing your video…</p>
            <p style={{ fontSize: '0.875rem' }}>Fetching video data, identifying affiliate opportunities, rewriting description.</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA',
            borderRadius: '0.75rem', padding: '1rem 1.5rem',
            color: '#DC2626', marginBottom: '1.5rem',
          }}>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Video title */}
            <div className="card" style={{ padding: '1rem 1.5rem', background: '#F0FDF4', borderColor: '#BBF7D0' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#16A34A', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Video</p>
              <p style={{ fontWeight: 600, color: '#111827' }}>{result.videoTitle}</p>
            </div>

            {/* AI breakdown */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700, fontSize: '1rem', color: '#111827', marginBottom: '1rem' }}>
                What Changed
              </h3>
              <p style={{ color: '#4B5563', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                {result.changes_summary}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {result.seo_keywords_added.length > 0 && (
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SEO Keywords Added</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {result.seo_keywords_added.map((kw) => (
                        <span key={kw} style={{
                          background: '#F3F4F6', color: '#374151',
                          padding: '0.25rem 0.625rem', borderRadius: '9999px',
                          fontSize: '0.8rem', fontWeight: 500,
                        }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                )}

                {result.affiliate_links_found.length > 0 && (
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Affiliate Products Found</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {result.affiliate_links_found.map((link) => (
                        <span key={link} style={{
                          background: '#F0FDF4', color: '#16A34A',
                          padding: '0.25rem 0.625rem', borderRadius: '9999px',
                          fontSize: '0.8rem', fontWeight: 500,
                          border: '1px solid #BBF7D0',
                        }}>{link}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {result.estimated_improvement && (
                <div style={{
                  marginTop: '1rem', padding: '0.75rem 1rem',
                  background: '#FFFBEB', borderRadius: '0.5rem',
                  border: '1px solid #FDE68A',
                  fontSize: '0.875rem', color: '#92400E',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <span>📈</span>
                  <span>{result.estimated_improvement}</span>
                </div>
              )}
            </div>

            {/* Before / After */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem',
                }}>
                  <span style={{
                    background: '#FEF2F2', color: '#DC2626',
                    padding: '0.2rem 0.6rem', borderRadius: '9999px',
                    fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>Before</span>
                </div>
                <div className="code-block" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>
                    <span className="dim">{result.originalDescription || '(No description)'}</span>
                  </pre>
                </div>
              </div>

              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem',
                }}>
                  <span style={{
                    background: '#F0FDF4', color: '#16A34A',
                    padding: '0.2rem 0.6rem', borderRadius: '9999px',
                    fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>After</span>
                  <button
                    onClick={handleCopy}
                    style={{
                      background: copied ? '#22C55E' : '#F3F4F6',
                      color: copied ? '#fff' : '#374151',
                      border: 'none', borderRadius: '0.375rem',
                      padding: '0.3rem 0.75rem', fontSize: '0.8rem', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="code-block" style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>
                    <span className="highlight">{result.optimized_description}</span>
                  </pre>
                </div>
              </div>
            </div>

            {/* Optimize another */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <button
                onClick={() => { setResult(null); setUrl(''); setError('') }}
                className="btn-outline"
                style={{ padding: '0.625rem 1.5rem', fontSize: '0.9rem' }}
              >
                Optimize Another Video
              </button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
