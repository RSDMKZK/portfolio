import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null || formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const publicDir = path.join(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Save as about-profile.jpg and profile.png
    const aboutPath = path.join(publicDir, 'about-profile.jpg')
    const profilePath = path.join(publicDir, 'profile.png')

    fs.writeFileSync(aboutPath, buffer)
    fs.writeFileSync(profilePath, buffer)

    // Also mirror to src/assets/images if directory exists
    const assetsDir = path.join(process.cwd(), 'src', 'assets', 'images')
    if (fs.existsSync(assetsDir)) {
      try {
        fs.writeFileSync(path.join(assetsDir, 'about-profile.jpg'), buffer)
      } catch (err) {
        console.warn('Could not mirror to assets dir:', err)
      }
    }

    const timestamp = Date.now()
    return NextResponse.json({
      success: true,
      message: 'Profile image updated successfully',
      url: `/about-profile.jpg?t=${timestamp}`,
    })
  } catch (error: any) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to save image' },
      { status: 500 }
    )
  }
}
