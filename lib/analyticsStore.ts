import fs from 'fs'
import path from 'path'
import { getSupabaseClient } from './supabase'

export interface CVDownloadEvent {
  id: string
  event: string
  source: string
  created_at: string
  user_agent?: string
  referrer?: string
}

export interface AnalyticsSummary {
  totalDownloads: number
  downloadsToday: number
  downloadsThisWeek: number
  topSources: { source: string; count: number; percentage: number }[]
  recentEvents: CVDownloadEvent[]
  isSupabaseConfigured: boolean
}

const DATA_DIR = path.join(process.cwd(), 'data')
const ANALYTICS_FILE = path.join(DATA_DIR, 'cv_analytics.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// In-memory fallback if file system is read-only
let memoryEvents: CVDownloadEvent[] = [
  {
    id: 'seed-dl-1',
    event: 'cv_download',
    source: 'cv_page_header',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    referrer: 'https://linkedin.com',
  },
  {
    id: 'seed-dl-2',
    event: 'cv_download',
    source: 'cv_page_footer',
    created_at: new Date(Date.now() - 3600000 * 22).toISOString(),
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referrer: 'direct',
  },
  {
    id: 'seed-dl-3',
    event: 'cv_download',
    source: 'cv_modal',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    referrer: 'https://github.com',
  },
]

function readLocalEvents(): CVDownloadEvent[] {
  try {
    ensureDataDir()
    if (!fs.existsSync(ANALYTICS_FILE)) {
      fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(memoryEvents, null, 2), 'utf8')
      return memoryEvents
    }
    const raw = fs.readFileSync(ANALYTICS_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      memoryEvents = parsed
      return parsed
    }
    return memoryEvents
  } catch (err) {
    console.error('Error reading local CV analytics file:', err)
    return memoryEvents
  }
}

function writeLocalEvents(events: CVDownloadEvent[]): void {
  memoryEvents = events
  try {
    ensureDataDir()
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(events, null, 2), 'utf8')
  } catch (err) {
    console.error('Error writing local CV analytics file:', err)
  }
}

export async function logCVDownloadEvent(params: {
  source?: string
  userAgent?: string
  referrer?: string
}): Promise<CVDownloadEvent> {
  const cleanSource = params.source?.trim() || 'cv_page'
  const newEvent: CVDownloadEvent = {
    id: `cv-dl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    event: 'cv_download',
    source: cleanSource,
    created_at: new Date().toISOString(),
    user_agent: params.userAgent || 'Unknown',
    referrer: params.referrer || 'direct',
  }

  // 1. Try to record in Supabase if configured
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('cv_downloads')
        .insert([
          {
            event: 'cv_download',
            source: cleanSource,
            user_agent: params.userAgent || null,
            referrer: params.referrer || null,
          },
        ])
        .select()

      if (!error && data && data.length > 0) {
        newEvent.id = data[0].id || newEvent.id
      }
    } catch (err) {
      console.warn('Supabase cv_downloads insert error (falling back to local):', err)
    }
  }

  // 2. Always persist locally for resilience and immediate querying
  const current = readLocalEvents()
  current.unshift(newEvent)
  // Keep last 1,000 events to prevent unbounded growth
  const trimmed = current.slice(0, 1000)
  writeLocalEvents(trimmed)

  return newEvent
}

export async function getCVDownloadAnalytics(): Promise<AnalyticsSummary> {
  let allEvents = readLocalEvents()
  const supabase = getSupabaseClient()
  let isSupabaseConfigured = false

  if (supabase) {
    isSupabaseConfigured = true
    try {
      const { data, error } = await supabase
        .from('cv_downloads')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && Array.isArray(data) && data.length > 0) {
        // Merge Supabase events with local events (deduplicating by ID or timestamp)
        const combined = [...data, ...allEvents]
        const seenIds = new Set<string>()
        const deduped: CVDownloadEvent[] = []
        for (const item of combined) {
          const key = item.id || `${item.created_at}-${item.source}`
          if (!seenIds.has(key)) {
            seenIds.add(key)
            deduped.push({
              id: item.id || `sb-${Date.now()}`,
              event: item.event || 'cv_download',
              source: item.source || 'cv_page',
              created_at: item.created_at || new Date().toISOString(),
              user_agent: item.user_agent || undefined,
              referrer: item.referrer || undefined,
            })
          }
        }
        allEvents = deduped.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      }
    } catch (err) {
      console.warn('Error reading cv_downloads from Supabase, using local:', err)
    }
  }

  const now = new Date().getTime()
  const oneDayAgo = now - 24 * 60 * 60 * 1000
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000

  const totalDownloads = allEvents.length
  let downloadsToday = 0
  let downloadsThisWeek = 0
  const sourceCountMap: Record<string, number> = {}

  for (const ev of allEvents) {
    const t = new Date(ev.created_at).getTime()
    if (t >= oneDayAgo) downloadsToday++
    if (t >= oneWeekAgo) downloadsThisWeek++

    const src = ev.source || 'cv_page'
    sourceCountMap[src] = (sourceCountMap[src] || 0) + 1
  }

  const topSources = Object.entries(sourceCountMap)
    .map(([source, count]) => ({
      source,
      count,
      percentage: totalDownloads > 0 ? Math.round((count / totalDownloads) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)

  return {
    totalDownloads,
    downloadsToday,
    downloadsThisWeek,
    topSources,
    recentEvents: allEvents.slice(0, 100),
    isSupabaseConfigured,
  }
}

export async function clearCVDownloadAnalytics(): Promise<void> {
  writeLocalEvents([])
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      await supabase.from('cv_downloads').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    } catch (err) {
      console.warn('Error clearing cv_downloads from Supabase:', err)
    }
  }
}
