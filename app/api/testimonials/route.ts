import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient, isSupabaseConfigured, Testimonial } from '@/lib/supabase'
import { DEFAULT_TESTIMONIALS } from '@/lib/defaultTestimonials'

export async function GET() {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json({
        data: DEFAULT_TESTIMONIALS,
        isConfigured: false,
      })
    }

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials from Supabase:', error)
      return NextResponse.json({
        data: DEFAULT_TESTIMONIALS,
        isConfigured: true,
        error: error.message,
      })
    }

    // If table is empty, provide default testimonials as starter
    if (!data || data.length === 0) {
      return NextResponse.json({
        data: DEFAULT_TESTIMONIALS,
        isConfigured: true,
      })
    }

    return NextResponse.json({
      data,
      isConfigured: true,
    })
  } catch (err: unknown) {
    console.error('Unexpected error in GET /api/testimonials:', err)
    return NextResponse.json({
      data: DEFAULT_TESTIMONIALS,
      isConfigured: false,
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, role, text, rating } = body

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { error: 'Review text is required' },
        { status: 400 }
      )
    }

    const parsedRating = Number(rating)
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json(
        { error: 'Rating must be a number between 1 and 5' },
        { status: 400 }
      )
    }

    const cleanRole = typeof role === 'string' && role.trim() ? role.trim() : 'Client'

    const supabase = getSupabaseClient()

    if (!supabase) {
      // Return optimistic record with notice
      const localTestimonial: Testimonial = {
        id: `local-${Date.now()}`,
        name: name.trim(),
        role: cleanRole,
        text: text.trim(),
        rating: Math.round(parsedRating),
        approved: true,
        created_at: new Date().toISOString(),
      }

      return NextResponse.json(
        {
          success: true,
          data: localTestimonial,
          isConfigured: false,
          message: 'Saved locally. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to persist in Supabase.',
        },
        { status: 200 }
      )
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([
        {
          name: name.trim(),
          role: cleanRole,
          text: text.trim(),
          rating: Math.round(parsedRating),
          approved: true,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to insert testimonial' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: data?.[0],
        isConfigured: true,
      },
      { status: 201 }
    )
  } catch (err: unknown) {
    console.error('Unexpected error in POST /api/testimonials:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
