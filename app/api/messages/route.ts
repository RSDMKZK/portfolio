import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient, getSupabaseConfig, ContactMessage } from '@/lib/supabase'

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'siba2025'

// In-memory fallback messages store when Supabase keys aren't set
const fallbackMessages: ContactMessage[] = [
  {
    id: 'demo-msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    subject: 'Web App Consultation Inquiry',
    message: 'Hi Siba, I came across your portfolio and was blown away by your projects. We are looking to develop a full-stack SaaS platform next month. Would love to schedule a call!',
    read: false,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'demo-msg-2',
    name: 'Marcus Vance',
    email: 'marcus@designflow.io',
    subject: 'Mobile App Collaboration',
    message: 'Hello! We need a talented React Native/Mobile developer for an upcoming fintech client. Please let me know your current availability.',
    read: true,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
]

// Verify admin authorization header
function isAuthorized(req: NextRequest): boolean {
  const adminKey = req.headers.get('x-admin-key')
  return Boolean(adminKey && adminKey === ADMIN_SECRET)
}

// POST: Public submission from Contact page
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      // Graceful fallback when environment variables are pending
      const localMsg: ContactMessage = {
        id: `local-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        read: false,
        created_at: new Date().toISOString(),
      }
      fallbackMessages.unshift(localMsg)

      return NextResponse.json(
        {
          success: true,
          data: localMsg,
          isConfigured: false,
          notice: 'Saved to local buffer. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to persist in Supabase.',
        },
        { status: 201 }
      )
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          read: false,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error inserting message:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to save message to database' },
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
    console.error('Unexpected error in POST /api/messages:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET: Admin only - list all messages
export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin credentials' }, { status: 401 })
    }

    const supabase = getSupabaseClient()
    const config = getSupabaseConfig()

    if (!supabase) {
      return NextResponse.json({
        data: fallbackMessages,
        isConfigured: false,
        diagnostics: {
          detectedUrlKey: config.sourceUrlKey || null,
          detectedAnonKey: config.sourceAnonKey || null,
        },
      })
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error querying messages:', error)
      return NextResponse.json({
        data: fallbackMessages,
        isConfigured: true,
        error: error.message,
      })
    }

    return NextResponse.json({
      data: data || [],
      isConfigured: true,
      diagnostics: {
        detectedUrlKey: config.sourceUrlKey,
        detectedAnonKey: config.sourceAnonKey,
      },
    })
  } catch (err: unknown) {
    console.error('Unexpected error in GET /api/messages:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH: Admin only - mark message as read / unread
export async function PATCH(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, read } = body

    if (!id || typeof read !== 'boolean') {
      return NextResponse.json({ error: 'Message ID and read status are required' }, { status: 400 })
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      const target = fallbackMessages.find((m) => m.id === id)
      if (target) target.read = read
      return NextResponse.json({ success: true, isConfigured: false })
    }

    const { error } = await supabase
      .from('messages')
      .update({ read })
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, isConfigured: true })
  } catch (err: unknown) {
    console.error('Unexpected error in PATCH /api/messages:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: Admin only - delete message
export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 })
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      const idx = fallbackMessages.findIndex((m) => m.id === id)
      if (idx !== -1) fallbackMessages.splice(idx, 1)
      return NextResponse.json({ success: true, isConfigured: false })
    }

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, isConfigured: true })
  } catch (err: unknown) {
    console.error('Unexpected error in DELETE /api/messages:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
