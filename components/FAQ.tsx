'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'Do I need a credit card to start the free trial?',
    a: 'No. Your 7-day free trial starts immediately with just your email. We only ask for a card when you decide to continue after the trial.',
  },
  {
    q: 'How does TubeProfit fetch my video data?',
    a: 'We use the official YouTube Data API v3. You paste a YouTube URL and we pull the title, description, and tags automatically — no copy-pasting required.',
  },
  {
    q: 'Will the AI actually know about my specific affiliate programs?',
    a: 'The AI identifies products and links already in your description and optimizes placement and copy around them. If your description is empty, it creates placeholder slots in the format [AFFILIATE: ProductName] for you to fill in.',
  },
  {
    q: 'Can I use this on old videos in my back catalog?',
    a: 'Absolutely. In fact, this is one of the highest-ROI uses — updating 50 old videos with optimized descriptions can compound affiliate revenue for years with no new filming required.',
  },
  {
    q: 'How many videos can I optimize per month?',
    a: 'Unlimited. The $29/mo covers as many optimizations as you run.',
  },
  {
    q: 'What if the AI output needs tweaking?',
    a: 'The output is a starting point, not law. You get the full text in an editable copy block. Adjust the affiliate links, timestamps, and keywords to match your style before pasting into YouTube Studio.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
          color: '#111827',
          letterSpacing: '-0.025em',
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                border: '1px solid',
                borderColor: open === i ? '#22C55E' : '#E5E7EB',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '1.25rem 1.5rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-outfit), sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#111827',
                }}>{faq.q}</span>
                <span style={{
                  color: '#22C55E',
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  flexShrink: 0,
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s',
                }}>+</span>
              </button>
              {open === i && (
                <div style={{
                  padding: '0 1.5rem 1.25rem',
                  color: '#6B7280',
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
