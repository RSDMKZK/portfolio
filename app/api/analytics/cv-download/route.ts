import { NextRequest, NextResponse } from 'next/server'
import {
  logCVDownloadEvent,
  getCVDownloadAnalytics,
  clearCVDownloadAnalytics,
} from '@/lib/analyticsStore'

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'siba2025'

function isAuthorized(req: NextRequest): boolean {
  const adminKey = req.headers.get('x-admin-key')
  return Boolean(adminKey && adminKey === ADMIN_SECRET)
}

// POST: Public endpoint - logs a CV download click event
export async function POST(req: NextRequest) {
  try {
    let source = 'cv_page'
    let referrer = ''

    try {
      const body = await req.json()
      if (body && typeof body === 'object') {
        if (body.source && typeof body.source === 'string') {
          source = body.source.trim().slice(0, 50)
        }
        if (body.referrer && typeof body.referrer === 'string') {
          referrer = body.referrer.trim().slice(0, 200)
        }
      }
    } catch {
      // Body may be empty in some beacon calls; defaults will be used
    }

    const userAgent = req.headers.get('user-agent') || 'Unknown'
    const reqReferrer = req.headers.get('referer') || referrer || 'direct'

    const event = await logCVDownloadEvent({
      source,
      userAgent,
      referrer: reqReferrer,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Download event logged successfully',
        event,
      },
      { status: 201 }
    )
  } catch (err: unknown) {
    console.error('Error logging CV download event:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET: Admin analytics endpoint - returns full stats, summaries, and recent click events
export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid admin credentials' },
        { status: 401 }
      )
    }

    const summary = await getCVDownloadAnalytics()

    return NextResponse.json({
      success: true,
      data: summary,
    })
  } catch (err: unknown) {
    console.error('Error fetching CV download analytics:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE: Admin endpoint - resets analytics data if needed
export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid admin credentials' },
        { status: 401 }
      )
    }

    await clearCVDownloadAnalytics()

    return NextResponse.json({
      success: true,
      message: 'CV download analytics cleared',
    })
  } catch (err: unknown) {
    console.error('Error clearing CV download analytics:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
