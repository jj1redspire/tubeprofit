import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'
)

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId  = session.metadata?.userId
        const subId   = session.subscription as string
        const custId  = session.customer as string
        if (!userId) break

        const sub = await stripe.subscriptions.retrieve(subId)

        // Update user subscription status
        await supabase.from('users').update({
          stripe_customer_id:  custId,
          subscription_status: sub.status,
          trial_end:           sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
          current_period_end:  new Date(sub.current_period_end * 1000).toISOString(),
        }).eq('id', userId)

        // Upsert subscriptions table
        await supabase.from('subscriptions').upsert({
          user_id:            userId,
          stripe_customer_id: custId,
          stripe_sub_id:      subId,
          status:             sub.status,
          trial_end:          sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        }, { onConflict: 'user_id' })
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub    = event.data.object as Stripe.Subscription
        const custId = sub.customer as string

        // Update subscriptions table
        await supabase.from('subscriptions')
          .update({
            status:             sub.status,
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_customer_id', custId)

        // Update users table
        await supabase.from('users')
          .update({ subscription_status: sub.status })
          .eq('stripe_customer_id', custId)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
