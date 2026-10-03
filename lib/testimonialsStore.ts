import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const DELETED_FILE = path.join(DATA_DIR, 'deleted_testimonials.json')

interface DeletionState {
  deletedIds: string[]
  clearedAt?: string // ISO date string if all were cleared
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function getDeletionState(): DeletionState {
  try {
    ensureDataDir()
    if (!fs.existsSync(DELETED_FILE)) {
      // Initialize with existing seed IDs so all current reviews are removed
      const initial: DeletionState = {
        deletedIds: [
          '2ea3324a-7b13-4aaa-af33-56b3d5305184',
          '480d4d7c-91ef-4d18-82d8-adc6a922b345',
          '9996acb2-0b43-4314-a0e9-857421f1b824',
          '2fc0e43a-2848-4306-adf6-9b683a7245f4',
          'seed-1',
          'seed-2',
          'seed-3',
        ],
        clearedAt: new Date().toISOString(),
      }
      fs.writeFileSync(DELETED_FILE, JSON.stringify(initial, null, 2), 'utf8')
      return initial
    }

    const content = fs.readFileSync(DELETED_FILE, 'utf8')
    return JSON.parse(content) as DeletionState
  } catch (err) {
    console.error('Error reading deleted testimonials file:', err)
    return { deletedIds: [] }
  }
}

export function markTestimonialDeleted(id: string): void {
  try {
    ensureDataDir()
    const state = getDeletionState()
    if (!state.deletedIds.includes(id)) {
      state.deletedIds.push(id)
      fs.writeFileSync(DELETED_FILE, JSON.stringify(state, null, 2), 'utf8')
    }
  } catch (err) {
    console.error('Error saving deleted testimonial:', err)
  }
}

export function clearAllTestimonials(): void {
  try {
    ensureDataDir()
    const state = getDeletionState()
    state.clearedAt = new Date().toISOString()
    fs.writeFileSync(DELETED_FILE, JSON.stringify(state, null, 2), 'utf8')
  } catch (err) {
    console.error('Error clearing all testimonials:', err)
  }
}

export function isTestimonialDeleted(testimonial: { id?: string; created_at?: string }): boolean {
  const state = getDeletionState()
  if (testimonial.id && state.deletedIds.includes(testimonial.id)) {
    return true
  }
  if (state.clearedAt && testimonial.created_at) {
    const createdTime = new Date(testimonial.created_at).getTime()
    const clearedTime = new Date(state.clearedAt).getTime()
    if (createdTime <= clearedTime) {
      return true
    }
  }
  return false
}
