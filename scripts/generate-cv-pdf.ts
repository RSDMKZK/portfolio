import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

async function generateCV() {
  const pdfDoc = await PDFDocument.create()

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  const pageWidth = 595.28 // A4 width in points
  const pageHeight = 841.89 // A4 height in points
  const margin = 40
  const contentWidth = pageWidth - margin * 2

  // Color palette
  const black = rgb(0.1, 0.1, 0.1)
  const darkGray = rgb(0.25, 0.25, 0.25)
  const mutedGray = rgb(0.45, 0.45, 0.45)
  const ruleColor = rgb(0.2, 0.2, 0.2)

  // ---------------- PAGE 1 ----------------
  const page1 = pdfDoc.addPage([pageWidth, pageHeight])
  let y = pageHeight - 45

  // Header Title
  const title = 'ABDULLAHI MOHAMMED SIBA'
  const titleWidth = helveticaBold.widthOfTextAtSize(title, 18)
  page1.drawText(title, {
    x: (pageWidth - titleWidth) / 2,
    y,
    size: 18,
    font: helveticaBold,
    color: black,
  })
  y -= 16

  // Subtitle
  const subtitle = 'FULL-STACK + AI ENGINEER | AI/ML DEVELOPER | AI PRODUCT & AUTOMATION'
  const subtitleWidth = helveticaBold.widthOfTextAtSize(subtitle, 8.5)
  page1.drawText(subtitle, {
    x: (pageWidth - subtitleWidth) / 2,
    y,
    size: 8.5,
    font: helveticaBold,
    color: darkGray,
  })
  y -= 13

  // Contact line 1
  const contact1 = 'Abuja, Nigeria  •  +234 703 773 2220  •  sibaabdullahi001@gmail.com'
  const contact1Width = helvetica.widthOfTextAtSize(contact1, 8.5)
  page1.drawText(contact1, {
    x: (pageWidth - contact1Width) / 2,
    y,
    size: 8.5,
    font: helvetica,
    color: darkGray,
  })
  y -= 12

  // Contact line 2
  const contact2 = 'abdullahisiba.com  •  LinkedIn  •  GitHub / RSDMKZK'
  const contact2Width = helvetica.widthOfTextAtSize(contact2, 8.5)
  page1.drawText(contact2, {
    x: (pageWidth - contact2Width) / 2,
    y,
    size: 8.5,
    font: helvetica,
    color: darkGray,
  })
  y -= 16

  function drawSectionHeader(page: typeof page1, text: string, currentY: number): number {
    page.drawLine({
      start: { x: margin, y: currentY },
      end: { x: pageWidth - margin, y: currentY },
      thickness: 1,
      color: ruleColor,
    })
    currentY -= 12
    page.drawText(text, {
      x: margin,
      y: currentY,
      size: 9.5,
      font: helveticaBold,
      color: black,
    })
    currentY -= 12
    return currentY
  }

  function wrapText(text: string, maxWidth: number, font: typeof helvetica, size: number): string[] {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const width = font.widthOfTextAtSize(testLine, size)
      if (width <= maxWidth) {
        currentLine = testLine
      } else {
        if (currentLine) lines.push(currentLine)
        currentLine = word
      }
    }
    if (currentLine) lines.push(currentLine)
    return lines
  }

  // PROFESSIONAL SUMMARY
  y = drawSectionHeader(page1, 'PROFESSIONAL SUMMARY', y)
  const summaryText =
    'Computer Science graduate and Full-Stack + AI Engineer with hands-on experience building web and mobile applications, AI-powered products, SaaS platforms, and digital services. Experienced across frontend and backend development, AI/ML integration, databases, APIs, UI/UX, interactive web experiences, and cloud deployment. Builds products from concept and interface design through implementation, integration, deployment, and iteration, with a focus on practical software solutions and real-world problems.'

  const summaryLines = wrapText(summaryText, contentWidth, helvetica, 8.5)
  for (const line of summaryLines) {
    page1.drawText(line, {
      x: margin,
      y,
      size: 8.5,
      font: helvetica,
      color: darkGray,
    })
    y -= 11.5
  }
  y -= 6

  // WORK EXPERIENCE
  y = drawSectionHeader(page1, 'WORK EXPERIENCE', y)

  // CoStream
  page1.drawText('Junior Developer, CoStream', {
    x: margin,
    y,
    size: 9,
    font: helveticaBold,
    color: black,
  })
  const dateStr = 'May 2023 – July 2026'
  const dateWidth = helveticaBold.widthOfTextAtSize(dateStr, 8.5)
  page1.drawText(dateStr, {
    x: pageWidth - margin - dateWidth,
    y,
    size: 8.5,
    font: helveticaBold,
    color: black,
  })
  y -= 11

  page1.drawText('Abuja, Nigeria', {
    x: margin,
    y,
    size: 8,
    font: helveticaOblique,
    color: mutedGray,
  })
  y -= 11

  const workBullets = [
    'Developed and contributed to web and mobile applications across product and client-focused projects.',
    'Built responsive web interfaces using React and modern frontend development practices.',
    'Developed cross-platform mobile applications using Flutter.',
    'Translated product requirements and interface concepts into functional digital experiences.',
    'Worked within collaborative development workflows across frontend implementation and application development.',
  ]

  for (const b of workBullets) {
    const wrapped = wrapText(b, contentWidth - 12, helvetica, 8.5)
    page1.drawText('•', { x: margin + 2, y, size: 8.5, font: helvetica, color: darkGray })
    page1.drawText(wrapped[0], { x: margin + 12, y, size: 8.5, font: helvetica, color: darkGray })
    y -= 11
    for (let i = 1; i < wrapped.length; i++) {
      page1.drawText(wrapped[i], { x: margin + 12, y, size: 8.5, font: helvetica, color: darkGray })
      y -= 11
    }
  }
  y -= 6

  // SELECTED PROJECTS
  y = drawSectionHeader(page1, 'SELECTED PROJECTS', y)

  interface Project {
    title: string
    subtitle: string
    bullets: string[]
  }

  const projects: Project[] = [
    {
      title: 'Trioline Data',
      subtitle: 'VTU & Digital Services Platform',
      bullets: [
        'Built a digital services platform covering airtime, data, electricity payments, examination pins, and cable subscriptions.',
        'Developed frontend functionality with React, TypeScript, Vite, and Tailwind CSS, supported by Node.js/Express backend services.',
        'Used Supabase/PostgreSQL for application data and backend services, including authentication and account functionality.',
        'Worked on wallet funding, payment workflows, external service-provider/API integrations, deployment, and troubleshooting.',
        'Deployment and infrastructure work across Vercel, Render, and Hostinger.',
      ],
    },
    {
      title: 'AI-Powered Collaborative Learning and Performance Support System',
      subtitle: 'AI Education & Gamified Learning Platform',
      bullets: [
        'Developed an AI-powered learning platform combining personalized study assistance, gamification, and academic collaboration.',
        'Implemented AI-assisted summaries, explanations, practice questions, quizzes, flashcards, and learning recommendations.',
        'Designed the Knowledge Arena with interactive learning modes and challenge-based experiences.',
        'Developed a Community Hub concept for academic resource sharing and AI-assisted academic support.',
        'Technology stack includes React, TypeScript, Vite, Tailwind CSS, Supabase/PostgreSQL, and Google Gemini.',
      ],
    },
    {
      title: 'Archer | Private Aviation',
      subtitle: 'Premium Private Aviation Web Experience',
      bullets: [
        'Developed a premium aviation web experience focused on responsive presentation, visual hierarchy, and interactive digital experiences.',
        'Applied UI/UX principles across typography, spacing, composition, responsiveness, and visual presentation.',
        'Worked with modern motion and interaction techniques to create an immersive web experience.',
      ],
    },
    {
      title: 'LegalConsult AI',
      subtitle: 'AI-Powered Legal Technology Platform',
      bullets: [
        'Developed an AI-focused legal technology concept around digital workflows for lawyers, students, supervisors, and clients.',
        'Explored role-based user experiences, AI-assisted workflows, and Google Gemini-powered assistance.',
        'Used Firebase-based application infrastructure for domain-specific product workflows.',
      ],
    },
    {
      title: 'Court2You',
      subtitle: 'Legal Technology Platform',
      bullets: [
        'Developed a legal technology concept focused on improving digital access to court and legal-related services.',
        'Explored web and mobile product experiences, user-focused workflows, and legal service automation.',
      ],
    },
  ]

  for (const proj of projects) {
    page1.drawText(proj.title, {
      x: margin,
      y,
      size: 8.5,
      font: helveticaBold,
      color: black,
    })
    y -= 10.5
    page1.drawText(proj.subtitle, {
      x: margin,
      y,
      size: 8,
      font: helveticaOblique,
      color: mutedGray,
    })
    y -= 10

    for (const b of proj.bullets) {
      const wrapped = wrapText(b, contentWidth - 12, helvetica, 8)
      page1.drawText('•', { x: margin + 2, y, size: 8, font: helvetica, color: darkGray })
      page1.drawText(wrapped[0], { x: margin + 12, y, size: 8, font: helvetica, color: darkGray })
      y -= 10
      for (let i = 1; i < wrapped.length; i++) {
        page1.drawText(wrapped[i], { x: margin + 12, y, size: 8, font: helvetica, color: darkGray })
        y -= 10
      }
    }
    y -= 3
  }

  // Page 1 Footer
  page1.drawText('Abdullahi Mohammed Siba', {
    x: margin,
    y: 20,
    size: 7.5,
    font: helvetica,
    color: mutedGray,
  })
  page1.drawText('1', {
    x: pageWidth - margin - 5,
    y: 20,
    size: 7.5,
    font: helvetica,
    color: mutedGray,
  })

  // ---------------- PAGE 2 ----------------
  const page2 = pdfDoc.addPage([pageWidth, pageHeight])
  y = pageHeight - 45

  // EDUCATION
  y = drawSectionHeader(page2, 'EDUCATION', y)
  page2.drawText('Nile University', {
    x: margin,
    y,
    size: 9,
    font: helveticaBold,
    color: black,
  })
  const eduDate = '2023 – 2026'
  const eduDateWidth = helveticaBold.widthOfTextAtSize(eduDate, 8.5)
  page2.drawText(eduDate, {
    x: pageWidth - margin - eduDateWidth,
    y,
    size: 8.5,
    font: helveticaBold,
    color: black,
  })
  y -= 11

  page2.drawText('B.Sc. Computer Science | Abuja, Nigeria', {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: darkGray,
  })
  y -= 16

  // TECHNICAL SKILLS
  y = drawSectionHeader(page2, 'TECHNICAL SKILLS', y)

  const skillGroups = [
    { label: 'Frontend', val: 'React, Next.js, TypeScript, JavaScript, Tailwind CSS, Flutter, Framer, Vite' },
    { label: 'Backend', val: 'Node.js, Express, Python, FastAPI, REST APIs' },
    { label: 'Databases', val: 'PostgreSQL, Supabase, Firebase' },
    { label: 'AI / ML', val: 'AI/ML development, LLM applications, AI product development, AI automation, Gemini, Claude' },
    { label: 'UI / UX', val: 'Figma, UI/UX design, responsive design, product interface design' },
    { label: 'Motion / Interactive', val: 'GSAP, Framer Motion, WebGL, Higgsfield' },
    { label: 'Cloud / Tools', val: 'Vercel, Render, Netlify, Hostinger, Git, GitHub, VS Code' },
  ]

  for (const s of skillGroups) {
    const labelFormatted = `${s.label}: `
    page2.drawText(labelFormatted, {
      x: margin,
      y,
      size: 8.5,
      font: helveticaBold,
      color: black,
    })
    const offset = helveticaBold.widthOfTextAtSize(labelFormatted, 8.5)
    page2.drawText(s.val, {
      x: margin + offset,
      y,
      size: 8.5,
      font: helvetica,
      color: darkGray,
    })
    y -= 13
  }
  y -= 4

  // CERTIFICATIONS & PROFESSIONAL LEARNING
  y = drawSectionHeader(page2, 'CERTIFICATIONS & PROFESSIONAL LEARNING', y)

  const certs = [
    'Google Learning AI Certificate — 2024',
    'AI and Machine Learning — Microsoft — 2024',
    'Front-End Development — Vocational Schools — 2024',
    'Learning Data Science — Dicoding Academy — 2024',
    'Learning AI Basics — Dicoding Academy — 2024',
    'Advanced AI and Machine Learning — Class Central — 2024',
    'Building LLMs — Class Central — 2024',
  ]

  for (const c of certs) {
    page2.drawText('•', { x: margin + 2, y, size: 8.5, font: helvetica, color: darkGray })
    page2.drawText(c, { x: margin + 12, y, size: 8.5, font: helvetica, color: darkGray })
    y -= 12.5
  }
  y -= 4

  // PROFESSIONAL FOCUS
  y = drawSectionHeader(page2, 'PROFESSIONAL FOCUS', y)
  const focusText =
    'Full-Stack Software Engineering • Artificial Intelligence & Machine Learning • Generative AI & LLM Applications • AI Product Development • SaaS Development • AI Automation • Web & Mobile Application Development • Interactive Web Experiences • UI/UX'

  const focusLines = wrapText(focusText, contentWidth, helvetica, 8.5)
  for (const line of focusLines) {
    page2.drawText(line, {
      x: margin,
      y,
      size: 8.5,
      font: helvetica,
      color: darkGray,
    })
    y -= 11.5
  }
  y -= 6

  // PROFESSIONAL STRENGTHS
  y = drawSectionHeader(page2, 'PROFESSIONAL STRENGTHS', y)
  const strengthsText =
    'Communication • Problem Solving • Critical Thinking • Creativity • Teamwork • Adaptability • Leadership • Time Management'
  page2.drawText(strengthsText, {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: darkGray,
  })
  y -= 16

  // LANGUAGES
  y = drawSectionHeader(page2, 'LANGUAGES', y)
  page2.drawText('English — Fluent', {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: darkGray,
  })
  y -= 16

  // PORTFOLIO
  y = drawSectionHeader(page2, 'PORTFOLIO', y)
  page2.drawText('www.abdullahisiba.com', {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: darkGray,
  })
  y -= 16

  // Page 2 Footer
  page2.drawText('Abdullahi Mohammed Siba', {
    x: margin,
    y: 20,
    size: 7.5,
    font: helvetica,
    color: mutedGray,
  })
  page2.drawText('2', {
    x: pageWidth - margin - 5,
    y: 20,
    size: 7.5,
    font: helvetica,
    color: mutedGray,
  })

  const pdfBytes = await pdfDoc.save()
  const publicDir = path.join(process.cwd(), 'public')
  fs.writeFileSync(path.join(publicDir, 'cv.pdf'), pdfBytes)
  fs.writeFileSync(path.join(publicDir, 'Abdullahi_Mohammed_Siba_CV.pdf'), pdfBytes)
  console.log('Successfully generated public/cv.pdf and public/Abdullahi_Mohammed_Siba_CV.pdf!')
}

generateCV().catch(console.error)
