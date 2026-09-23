import { createClient, SupabaseClient } from '@supabase/supabase-js'

export interface Testimonial {
  id?: string
  name: string
  role: string
  text: string
  rating: number
  approved?: boolean
  created_at?: string
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  read?: boolean
  created_at?: string
}

/**
 * Normalizes string by trimming, removing quotes, spaces, dashes, underscores, and lowering case.
 */
function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}

/**
 * Resolves Supabase URL and Key from all potential environment variable naming formats:
 * - NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 * - SUPABASE_URL / SUPABASE_ANON_KEY
 * - "supabase url" / "supabase anon key" (names with spaces as entered in Vercel UI)
 * - SUPABASE_KEY / NEXT_PUBLIC_SUPABASE_KEY / SUPABASE_SERVICE_ROLE_KEY
 */
export const getSupabaseConfig = (): { url: string; key: string; sourceUrlKey: string; sourceAnonKey: string } => {
  const env = process.env

  const urlTargets = [
    'nextpublicsupabaseurl',
    'supabaseurl',
    'nextpublicsupabaseprojecturl',
    'supabaseprojecturl',
  ]

  const keyTargets = [
    'nextpublicsupabaseanonkey',
    'supabaseanonkey',
    'supabaseservicerolekey',
    'nextpublicsupabasekey',
    'supabasekey',
  ]

  let resolvedUrl = ''
  let resolvedKey = ''
  let sourceUrlKey = ''
  let sourceAnonKey = ''

  // 1. Check direct standard environment variable keys
  if (env.NEXT_PUBLIC_SUPABASE_URL) {
    resolvedUrl = env.NEXT_PUBLIC_SUPABASE_URL
    sourceUrlKey = 'NEXT_PUBLIC_SUPABASE_URL'
  } else if (env.SUPABASE_URL) {
    resolvedUrl = env.SUPABASE_URL
    sourceUrlKey = 'SUPABASE_URL'
  } else if (env.NEXT_PUBLIC_SUPABASE_PROJECT_URL) {
    resolvedUrl = env.NEXT_PUBLIC_SUPABASE_PROJECT_URL
    sourceUrlKey = 'NEXT_PUBLIC_SUPABASE_PROJECT_URL'
  } else if (env.SUPABASE_PROJECT_URL) {
    resolvedUrl = env.SUPABASE_PROJECT_URL
    sourceUrlKey = 'SUPABASE_PROJECT_URL'
  }

  if (env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    resolvedKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    sourceAnonKey = 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  } else if (env.SUPABASE_ANON_KEY) {
    resolvedKey = env.SUPABASE_ANON_KEY
    sourceAnonKey = 'SUPABASE_ANON_KEY'
  } else if (env.SUPABASE_SERVICE_ROLE_KEY) {
    resolvedKey = env.SUPABASE_SERVICE_ROLE_KEY
    sourceAnonKey = 'SUPABASE_SERVICE_ROLE_KEY'
  } else if (env.NEXT_PUBLIC_SUPABASE_KEY) {
    resolvedKey = env.NEXT_PUBLIC_SUPABASE_KEY
    sourceAnonKey = 'NEXT_PUBLIC_SUPABASE_KEY'
  } else if (env.SUPABASE_KEY) {
    resolvedKey = env.SUPABASE_KEY
    sourceAnonKey = 'SUPABASE_KEY'
  }

  // 2. Comprehensive check through all process.env keys (fuzzy normalization to handle spaces like "supabase url")
  if (!resolvedUrl || !resolvedKey) {
    for (const [rawName, rawVal] of Object.entries(env)) {
      if (!rawVal || typeof rawVal !== 'string') continue
      const norm = normalizeKey(rawName)

      if (!resolvedUrl && urlTargets.includes(norm)) {
        resolvedUrl = rawVal
        sourceUrlKey = rawName
      }
      if (!resolvedKey && keyTargets.includes(norm)) {
        resolvedKey = rawVal
        sourceAnonKey = rawName
      }
    }
  }

  // Clean leading/trailing quotes and spaces
  const cleanUrl = resolvedUrl ? resolvedUrl.trim().replace(/^["']|["']$/g, '') : ''
  const cleanKey = resolvedKey ? resolvedKey.trim().replace(/^["']|["']$/g, '') : ''

  return {
    url: cleanUrl,
    key: cleanKey,
    sourceUrlKey,
    sourceAnonKey,
  }
}

export const isSupabaseConfigured = (): boolean => {
  const { url, key } = getSupabaseConfig()
  return Boolean(
    url &&
    key &&
    url.startsWith('http') &&
    !url.includes('your-project-id') &&
    !url.includes('placeholder')
  )
}

// Singleton client instance cached across serverless warm invocations
let supabaseClient: SupabaseClient | null = null
let lastConfigUrl = ''
let lastConfigKey = ''

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, key } = getSupabaseConfig()

  if (!url || !key || !url.startsWith('http') || url.includes('your-project-id')) {
    return null
  }

  if (!supabaseClient || lastConfigUrl !== url || lastConfigKey !== key) {
    supabaseClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
    lastConfigUrl = url
    lastConfigKey = key
  }

  return supabaseClient
}
