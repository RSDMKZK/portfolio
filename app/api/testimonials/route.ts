import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient, isSupabaseConfigured, Testimonial } from '@/lib/supabase'
import { DEFAULT_TESTIMONIALS } from '@/lib/defaultTestimonials'
import {
  isTestimonialDeleted,
  markTestimonialDeleted,
  clearAllTestimonials,
} from '@/lib/testimonialsStore'

export async function GET() {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      const filtered = DEFAULT_TESTIMONIALS.filter((t) => !isTestimonialDeleted(t))
      return NextResponse.json({
        data: filtered,
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
      const filtered = DEFAULT_TESTIMONIALS.filter((t) => !isTestimonialDeleted(t))
      return NextResponse.json({
        data: filtered,
        isConfigured: true,
        error: error.message,
      })
    }

    const validTestimonials = (data || []).filter((t: Testimonial) => !isTestimonialDeleted(t))

    return NextResponse.json({
      data: validTestimonials,
      isConfigured: true,
    })
  } catch (err: unknown) {
    console.error('Unexpected error in GET /api/testimonials:', err)
    return NextResponse.json({
      data: [],
      isConfigured: false,
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, role, email, text, rating } = body

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

    const cleanEmail = typeof email === 'string' && email.trim() ? email.trim().toLowerCase() : undefined

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
        email: cleanEmail,
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

    // Try inserting with email first
    const insertPayload: Record<string, unknown> = {
      name: name.trim(),
      role: cleanRole,
      text: text.trim(),
      rating: Math.round(parsedRating),
      approved: true,
    }
    if (cleanEmail) {
      insertPayload.email = cleanEmail
    }

    let { data, error } = await supabase
      .from('testimonials')
      .insert([insertPayload])
      .select()

    // If remote table does not have an 'email' column yet, retry without email
    if (error && error.message && error.message.toLowerCase().includes('email')) {
      console.warn('Supabase table missing email column, retrying insert without email column...')
      delete insertPayload.email
      const retryResult = await supabase
        .from('testimonials')
        .insert([insertPayload])
        .select()
      data = retryResult.data
      error = retryResult.error
      if (data && data[0] && cleanEmail) {
        data[0].email = cleanEmail
      }
    }

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to insert testimonial' },
        { status: 500 }
      )
    }

    const savedRecord = data?.[0]
    if (savedRecord && cleanEmail && !savedRecord.email) {
      savedRecord.email = cleanEmail
    }

    return NextResponse.json(
      {
        success: true,
        data: savedRecord,
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const deleteAll = searchParams.get('all') === 'true'

    if (deleteAll) {
      clearAllTestimonials()

      const supabase = getSupabaseClient()
      if (supabase) {
        try {
          await supabase
            .from('testimonials')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000')
        } catch (e) {
          console.warn('Supabase delete error (handled via persistent store):', e)
        }
      }

      return NextResponse.json({
        success: true,
        message: 'All testimonials deleted from database',
      })
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      )
    }

    // Record persistent deletion
    markTestimonialDeleted(id)

    const supabase = getSupabaseClient()
    if (supabase) {
      try {
        await supabase
          .from('testimonials')
          .delete()
          .eq('id', id)
      } catch (e) {
        console.warn('Supabase single delete error (handled via persistent store):', e)
      }
    }

    return NextResponse.json({
      success: true,
      id,
    })
  } catch (err: unknown) {
    console.error('Unexpected error in DELETE /api/testimonials:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

