import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'placeholder-key',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'
)

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

async function fetchVideoData(videoId: string) {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) throw new Error('YouTube API key not configured')

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  )
  if (!res.ok) throw new Error('YouTube API request failed')

  const data = await res.json()
  if (!data.items || data.items.length === 0) throw new Error('Video not found')

  const snippet = data.items[0].snippet
  return {
    title: snippet.title as string,
    description: snippet.description as string,
    tags: (snippet.tags || []) as string[],
  }
}

export async function POST(req: NextRequest) {
  try {
    const { youtubeUrl, userId } = await req.json()

    if (!youtubeUrl || !userId) {
      return NextResponse.json({ error: 'Missing youtubeUrl or userId' }, { status: 400 })
    }

    // Check subscription status
    const { data: user } = await supabase
      .from('users')
      .select('subscription_status')
      .eq('id', userId)
      .single()

    if (!user || !['trialing', 'active'].includes(user.subscription_status)) {
      return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
    }

    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    const videoData = await fetchVideoData(videoId)

    const prompt = `You are an expert YouTube affiliate marketer and SEO specialist. Analyze this YouTube video and rewrite its description to maximize affiliate revenue and search discoverability.

VIDEO TITLE: ${videoData.title}

CURRENT DESCRIPTION:
${videoData.description || '(No description provided)'}

VIDEO TAGS: ${videoData.tags.slice(0, 10).join(', ') || 'none'}

Your task: Rewrite the description to:
1. Open with a compelling hook (first 2-3 lines visible before "Show more")
2. Add clear affiliate link placeholders in format [AFFILIATE: ProductName - yourlink.com]
3. Add timestamps if the video is likely tutorial/review content
4. Include 3-5 high-value SEO keywords naturally
5. End with a strong CTA (subscribe, comment, like)
6. Keep total length 200-500 words for optimal YouTube SEO

Respond ONLY with valid JSON matching this exact schema:
{
  "optimized_description": "the full rewritten description",
  "changes_summary": "2-3 sentence plain English explanation of what changed and why",
  "affiliate_links_found": ["array of existing affiliate links or products mentioned"],
  "seo_keywords_added": ["array of SEO keywords you added"],
  "estimated_improvement": "one sentence estimate of expected improvement (e.g., '40% more click-throughs on affiliate links based on above-fold hook optimization')"
}`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const rawContent = message.content[0].type === 'text' ? message.content[0].text : ''

    let result
    try {
      // Strip markdown code fences if present
      const cleaned = rawContent.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
      result = JSON.parse(cleaned)
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    // Save optimization to DB
    await supabase.from('optimizations').insert({
      user_id:               userId,
      youtube_url:           youtubeUrl,
      video_title:           videoData.title,
      original_description:  videoData.description,
      optimized_description: result.optimized_description,
      changes_summary:       result.changes_summary,
      affiliate_links_found: result.affiliate_links_found,
      seo_keywords_added:    result.seo_keywords_added,
      estimated_improvement: result.estimated_improvement,
    })

    return NextResponse.json({
      videoTitle:          videoData.title,
      originalDescription: videoData.description,
      ...result,
    })
  } catch (err) {
    console.error('Optimize error:', err)
    const message = err instanceof Error ? err.message : 'Optimization failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
