export interface ProductCaseStudy {
  id: string
  slug: string
  projectNumber: string
  category: 'FINTECH' | 'EDTECH' | 'AI' | 'LEGALTECH' | 'TRAVEL' | 'MOBILE' | 'GAMING' | 'EXPERIMENTAL'
  categoryLabel: string
  title: string
  subtitle: string
  oneLineDescription: string
  status: 'LIVE' | 'ACADEMIC PROJECT' | 'PROTOTYPE' | 'CONCEPT' | 'IN DEVELOPMENT' | 'EXPERIMENT'
  year: string
  role: string
  tags: string[]
  externalUrl?: string
  
  // The 4 Core Questions (Section 17)
  whatIsIt: string
  whoIsItFor: string
  whatProblemDoesItSolve: string
  whatDidAbdullahiBuild: string

  // Case Study Sections
  overview: string
  theProblem: string
  theSolution: string
  myRole: string[]
  primaryAreas: string[]
  
  // Technical Credibility (Section 18)
  techStack: {
    name: string
    responsibility: string
  }[]
  
  // Architecture Flow
  architectureFlow: {
    step: string
    description: string
  }[]
  
  challenges: string
  resultStatus: string
}

export const productsData: ProductCaseStudy[] = [
  {
    id: '01',
    slug: 'trioline-data',
    projectNumber: '01',
    category: 'FINTECH',
    categoryLabel: 'Digital Services Platform · VTU · Fintech Infrastructure',
    title: 'Trioline Data',
    subtitle: 'A digital services platform for everyday payments and essential digital services.',
    oneLineDescription: 'Centralized digital services platform for airtime, data bundles, utilities, and examination services.',
    status: 'LIVE',
    year: '2025 - Present',
    role: 'Full-Stack Product Developer',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Paystack', 'Vercel', 'Render'],
    externalUrl: 'https://triolinedata.com',

    whatIsIt: 'A centralized digital services and VTU platform for everyday utility and telecommunication purchases.',
    whoIsItFor: 'Everyday consumers, small businesses, and students needing instant access to airtime, internet data, electricity tokens, and exam services.',
    whatProblemDoesItSolve: 'Digital services such as airtime, data, electricity, and exam pins are traditionally fragmented across disparate portals with unreliable payment flows.',
    whatDidAbdullahiBuild: 'End-to-end web application, custom wallet ledger, payment gateway integration, authentication, PostgreSQL database schema, automated external VTU dispatchers, and production deployment.',

    overview: 'Trioline Data is a comprehensive digital services platform engineered to provide reliable, instant access to utility and telecommunication services from a single account. The product unites a responsive client-side interface with a hardened backend API, secure wallet system, Paystack transaction gateway, automated service fulfillments, and external vendor integrations.',
    theProblem: 'Consumers frequently encounter fragmented experiences when purchasing digital utilities. Managing separate accounts across multiple telecom portals and utility websites results in duplicated payments, poor transaction tracking, and delayed token delivery. Users require a unified, secure platform with an authoritative wallet and instant order delivery.',
    theSolution: 'Built a centralized digital services platform combining user authentication, automated wallet funding, multi-service checkout, transaction tracking, and resilient connections to external VTU providers through a modern, responsive web application.',
    myRole: [
      'Frontend implementation using React, TypeScript, Vite, and Tailwind CSS',
      'Backend API architecture using Node.js and Express',
      'Database schema design, security policies, and PostgreSQL queries in Supabase',
      'User authentication, session security, and email verification workflows',
      'Wallet balance management, ledger consistency, and transaction reconciliation',
      'Paystack payment gateway integration for automated wallet funding',
      'External VTU API integrations for automated instant service provisioning',
      'Production deployment and environment configuration across Vercel and Render'
    ],
    primaryAreas: [
      'Airtime vending across major telecom networks',
      'Instant internet data bundle subscriptions',
      'Prepaid and postpaid electricity bill payments',
      'Cable TV subscriptions (DStv, GOtv, Startimes)',
      'Examination verification services (WAEC, NECO, JAMB tokens)',
      'Automated wallet funding & ledger tracking',
      'User account management & profile verification',
      'Detailed transaction history with receipts and status states'
    ],
    techStack: [
      { name: 'React & Vite', responsibility: 'Responsive interface architecture, state management, and client routing' },
      { name: 'TypeScript', responsibility: 'Type-safe contracts across frontend interfaces and backend payload models' },
      { name: 'Tailwind CSS', responsibility: 'Design system styling, responsive layouts, and accessible UI components' },
      { name: 'Node.js & Express', responsibility: 'Backend REST API, transaction controllers, and provider webhooks' },
      { name: 'Supabase & PostgreSQL', responsibility: 'Relational data modeling, ACID transactions, and Row Level Security' },
      { name: 'Paystack', responsibility: 'Secure payment collection and automated virtual account funding' },
      { name: 'Vercel & Render', responsibility: 'Continuous integration, edge hosting, and production backend container runtime' }
    ],
    architectureFlow: [
      { step: 'User Client', description: 'React & Vite single-page application running in modern web browsers' },
      { step: 'Backend API Gateway', description: 'Node.js / Express service handling route authorization, business validation, and rates' },
      { step: 'Database Layer', description: 'Supabase / PostgreSQL managing users, wallets, ledgers, and transaction states' },
      { step: 'Payment Processor', description: 'Paystack processing direct cards, bank transfers, and dedicated reserved accounts' },
      { step: 'VTU Providers', description: 'External telecom and utility APIs executing automated instant fulfillment' }
    ],
    challenges: 'Coordinating multiple asynchronous third-party systems reliably—ensuring that wallet deductions, payment provider confirmations, and external VTU API dispatches remain strictly synchronized without duplicate debits or unfulfilled orders.',
    resultStatus: 'Deployed and operating in production, providing automated daily transactions with sub-second wallet validations and real-time transaction reporting.'
  },
  {
    id: '02',
    slug: 'ai-collaborative-learning',
    projectNumber: '02',
    category: 'EDTECH',
    categoryLabel: 'AI Education Platform · Learning Technology · Gamification',
    title: 'AI-Powered Collaborative Learning Platform',
    subtitle: 'An educational platform combining study assistance, gamification, and academic collaboration.',
    oneLineDescription: 'Interactive educational platform using Gemini AI to turn academic materials into flashcards, quizzes, and gamified study arenas.',
    status: 'ACADEMIC PROJECT',
    year: '2025',
    role: 'Full-Stack Application Developer & AI Integrator',
    tags: ['React 19', 'TypeScript', 'Vite 6', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Google Gemini API', 'Gemini 2.5 Flash', 'Row Level Security'],
    
    whatIsIt: 'An AI-assisted study platform that analyzes uploaded academic documents to generate practice quizzes, concept flashcards, and gamified study challenges.',
    whoIsItFor: 'University students, study groups, and self-directed learners struggling to synthesize dense course materials into actionable exam prep.',
    whatProblemDoesItSolve: 'Students spend excessive hours manually summarizing lecture notes, textbooks, and slides into flashcards and quizzes rather than actively testing their knowledge.',
    whatDidAbdullahiBuild: 'Complete React 19 interface, file parsing pipeline, Gemini API prompt engineering for structured educational outputs, Supabase database with RLS, and the Knowledge Arena gamification engine.',

    overview: 'An educational technology platform built to help students learn directly from their course materials. The system combines an AI study assistant with game mechanics and community resource sharing, turning static lecture notes into interactive quizzes, concept flashcards, and competitive study challenges.',
    theProblem: 'Dense academic literature and slide decks are passive learning media. Students frequently experience cognitive overload and struggle to identify knowledge gaps without rigorous self-testing and structured practice.',
    theSolution: 'Engineered an integrated study pipeline where uploaded academic materials are parsed, analyzed via Google Gemini AI, and instantly converted into interactive flashcards, adaptive practice quizzes, and gamified Knowledge Arena sessions.',
    myRole: [
      'Full-stack frontend architecture using React 19, TypeScript, and Vite 6',
      'Integration of Google Gemini 2.5 Flash for material summarization, quiz generation, and concept extraction',
      'Database architecture in PostgreSQL with Row Level Security policies',
      'Authentication and user profile management using Supabase Auth',
      'Implementation of Knowledge Arena gamification mechanics: points, levels, challenges, and leaderboards',
      'Design of the Community Hub for sharing peer-reviewed lecture notes and past questions',
      'Responsive, accessible UI with motion transitions'
    ],
    primaryAreas: [
      'AI Study Assistant: Material upload, summaries, explanations, and weakness-focused recommendations',
      'Practice Quizzes: Instant question generation with answer verification and contextual feedback',
      'Concept Cards & Flash Blitz: Spaced repetition flashcards with active recall testing',
      'Knowledge Arena: Gamified study modes with progressive difficulty, scoring, and badges',
      'Community Hub: Academic resource exchange categorized by department, campus, and subject',
      'Progress Analytics: Real-time tracking of completed challenges and mastery levels'
    ],
    techStack: [
      { name: 'React 19 & Vite 6', responsibility: 'Modern reactive frontend with high-performance rendering and component modularity' },
      { name: 'Google Gemini API', responsibility: 'Document comprehension, educational question generation, and explanation synthesis' },
      { name: 'Supabase & PostgreSQL', responsibility: 'User authentication, document metadata storage, and gamification state persistence' },
      { name: 'Row Level Security', responsibility: 'Strict tenant data protection ensuring students only access their private study content' },
      { name: 'Tailwind CSS', responsibility: 'Adaptive dark-mode interface and responsive learning dashboards' }
    ],
    architectureFlow: [
      { step: 'Learning Material Upload', description: 'Student uploads lecture slides, syllabi, or notes in the client interface' },
      { step: 'Client Validation & Auth', description: 'Supabase Auth verifies user permissions and stores session state' },
      { step: 'AI Document Processing', description: 'Backend pipeline transmits sanitized document excerpts to Gemini 2.5 Flash' },
      { step: 'Structured Output Engine', description: 'AI returns verified JSON schemas for quizzes, summaries, and flashcards' },
      { step: 'Knowledge Arena Gamification', description: 'Student answers challenges; scores update points, levels, and leaderboard stats' }
    ],
    challenges: 'Enforcing deterministic, valid JSON schema structures from LLM responses when parsing complex multiformat academic notes, and optimizing token consumption for long lecture documents.',
    resultStatus: 'Completed academic prototype with functioning AI document summarization, live quiz generation, and integrated Knowledge Arena mechanics.'
  },
  {
    id: '03',
    slug: 'legalconsult-ai',
    projectNumber: '03',
    category: 'LEGALTECH',
    categoryLabel: 'Legal Technology · AI · Case Support Platform',
    title: 'LegalConsult AI',
    subtitle: 'An AI-assisted legal technology platform designed around legal consultation and case workflows.',
    oneLineDescription: 'Role-based platform connecting lawyers, clients, and students with AI-assisted legal workflows and document support.',
    status: 'PROTOTYPE',
    year: '2025',
    role: 'Application Developer & AI Integrator',
    tags: ['AI', 'Gemini 1.5 Flash', 'Firebase', 'TypeScript', 'LegalTech', 'Role-Based Access'],

    whatIsIt: 'A role-based legal workflow platform designed to streamline consultation requests, document understanding, and case information sharing.',
    whoIsItFor: 'Legal practitioners, law students, supervisors, and clients looking for structured consultation workflows and accessible case assistance.',
    whatProblemDoesItSolve: 'Legal consultations suffer from unstructured initial inquiries, document misplacement, and time-consuming manual information gathering before attorney meetings.',
    whatDidAbdullahiBuild: 'Role-based dashboards (client, lawyer, student), structured case intake workflows, and Gemini AI-assisted legal document parsing and query support.',

    overview: 'LegalConsult AI is a specialized legal technology concept that introduces role-specific workspaces and AI-assisted workflows to traditional legal consultations. Designed around distinct user roles, the system structures client inquiry intakes and assists practitioners in reviewing background information efficiently.',
    theProblem: 'Clients often struggle to articulate their legal circumstances systematically, while lawyers spend valuable billable hours sorting through disarranged notes and documents prior to formal consultations.',
    theSolution: 'A structured legal workflow application with dedicated portals for clients, attorneys, and law students, augmented with AI-assisted information retrieval and document question-answering.',
    myRole: [
      'Frontend user interface development and role-based routing',
      'Integration of Google Gemini 1.5 Flash for document understanding and query assistance',
      'Firebase Authentication and database state modeling for multi-party case files',
      'Structured intake form design ensuring legal information is categorized cleanly',
      'Implementation of consultation scheduling workflows'
    ],
    primaryAreas: [
      'Multi-role access: Dedicated dashboards for Clients, Lawyers, and Students',
      'AI-assisted legal information retrieval and query understanding',
      'Document parsing for case background review',
      'Structured case intake questionnaires and workflow progression',
      'Consultation appointment coordination'
    ],
    techStack: [
      { name: 'Google Gemini 1.5 Flash', responsibility: 'AI-assisted legal information parsing and document question-answering' },
      { name: 'Firebase', responsibility: 'Authentication, Firestore realtime database, and file storage' },
      { name: 'TypeScript', responsibility: 'Type safety and strict data contract management for case files' },
      { name: 'Tailwind CSS', responsibility: 'Professional legal workspace aesthetic with high visual clarity' }
    ],
    architectureFlow: [
      { step: 'Role Authentication', description: 'User authenticates into a verified Client, Lawyer, or Student persona' },
      { step: 'Case Intake / Document', description: 'Client submits structured inquiry details and relevant case background' },
      { step: 'AI Workflow Assistance', description: 'Gemini processes text to extract key dates, parties, and factual summaries' },
      { step: 'Practitioner Review', description: 'Lawyer views synthesized case brief and schedules consultation' }
    ],
    challenges: 'Designing prompt guardrails to strictly position the system as "AI-assisted legal support" rather than generating unauthorized legal counsel, maintaining strict professional boundaries.',
    resultStatus: 'Functional prototype with working role-based dashboards and document query intelligence.'
  },
  {
    id: '04',
    slug: 'court2you',
    projectNumber: '04',
    category: 'LEGALTECH',
    categoryLabel: 'Legal Technology · Digital Platform',
    title: 'Court2You',
    subtitle: 'A digital platform concept focused on improving access to court-related workflows and services.',
    oneLineDescription: 'Digital interface designed to simplify citizen access to court-related procedures, schedules, and information.',
    status: 'PROTOTYPE',
    year: '2025',
    role: 'Product Designer & Frontend Developer',
    tags: ['LegalTech', 'Web Application', 'Product Design', 'TypeScript', 'Tailwind CSS'],

    whatIsIt: 'A digital platform concept focused on making complex court processes and public legal information accessible to citizens.',
    whoIsItFor: 'Citizens, litigants, and legal representatives needing transparent access to court procedures, schedule tracking, and filing requirements.',
    whatProblemDoesItSolve: 'Physical court registries and legal administrative workflows are opaque, requiring physical presence and manual navigation of convoluted bureaucratic procedures.',
    whatDidAbdullahiBuild: 'User journey architecture, comprehensive frontend interface, procedure checklist workflows, and step-by-step court information navigation.',

    overview: 'Court2You is a public-interest legal technology project that explores how modern web design can demystify court-related procedures. The platform organizes filing checklists, hearing schedule lookups, and procedural guidance into an intuitive, accessible web application.',
    theProblem: 'Navigating public court services involves fragmented departmental jurisdictions, unclear filing prerequisites, and inconsistent procedural guidelines, creating steep barriers for non-lawyers.',
    theSolution: 'Built a centralized digital experience centered around structured, step-by-step guidance, process trackers, and accessible explanations of judicial administrative workflows.',
    myRole: [
      'Product concept definition and user journey mapping',
      'Frontend engineering using modern React and TypeScript',
      'Accessible UI design with responsive, high-contrast layouts',
      'Structured categorization of court procedural guides and forms'
    ],
    primaryAreas: [
      'Court information and jurisdictional directory',
      'Step-by-step procedural guides for common court filings',
      'Case status lookup interface prototype',
      'Document requirements and submission checklists',
      'Legal aid contact points and public advisory directory'
    ],
    techStack: [
      { name: 'React', responsibility: 'Interactive interface components and client state' },
      { name: 'TypeScript', responsibility: 'Structured modeling of court procedures and jurisdictional categories' },
      { name: 'Tailwind CSS', responsibility: 'Clean government-grade design language prioritizing accessibility' }
    ],
    architectureFlow: [
      { step: 'Information Entry', description: 'User selects relevant jurisdiction or legal service category' },
      { step: 'Interactive Workflow', description: 'System provides guided checklist of procedural requirements and forms' },
      { step: 'Structured Output', description: 'User receives verified documentation guidance and next court action steps' }
    ],
    challenges: 'Translating complex statutory and administrative legal language into straightforward, step-by-step digital workflows that everyday citizens can navigate without confusion.',
    resultStatus: 'Completed product design and functional interactive web prototype.'
  },
  {
    id: '05',
    slug: 'career-skill-mapper',
    projectNumber: '05',
    category: 'AI',
    categoryLabel: 'AI · Career Technology · Recommendation Platform',
    title: 'AI Career Skill Mapper',
    subtitle: 'An AI-assisted platform for mapping skills, identifying gaps, and exploring career development paths.',
    oneLineDescription: 'Intelligent career path analyzer comparing current developer skills against industry roles to identify exact learning gaps.',
    status: 'PROTOTYPE',
    year: '2025',
    role: 'Full-Stack Developer & Algorithm Designer',
    tags: ['AI', 'Career Technology', 'Recommendation System', 'React', 'Gemini API', 'TypeScript'],

    whatIsIt: 'An AI-powered skill gap analyzer that evaluates a developer or student’s current profile against desired career benchmarks.',
    whoIsItFor: 'Early-career developers, university graduates, and tech professionals transitioning into specialized engineering disciplines.',
    whatProblemDoesItSolve: 'Aspiring engineers frequently know the job title they desire (e.g., Agentic AI Engineer or Cloud Architect) but lack clarity on which specific missing competencies to prioritize.',
    whatDidAbdullahiBuild: 'Skill assessment intake engine, Gemini AI comparison algorithm, visual skill gap breakdown, and personalized curriculum recommendations.',

    overview: 'AI Career Skill Mapper provides structured career path analysis by comparing a candidate’s self-reported technical skills against live industry requirements for target roles. By applying Google Gemini AI, it generates a pragmatic roadmap detailing high-priority gaps and suggested project milestones.',
    theProblem: 'Generic job descriptions list dozens of technologies without indicating relative importance, leaving aspiring engineers overwhelmed and misallocating their learning time.',
    theSolution: 'A structured evaluation system that maps user proficiencies onto target role taxonomies, identifies foundational versus advanced gaps, and suggests tailored learning paths.',
    myRole: [
      'Interactive skill inventory and target career selection interface',
      'Gemini API prompt engineering for balanced, actionable skill audits',
      'Visualization of competency matrices and priority learning trajectories',
      'Implementation of interactive milestone tracking'
    ],
    primaryAreas: [
      'Comprehensive skill assessment intake',
      'Target career benchmarking across modern engineering roles',
      'AI-assisted gap analysis highlighting critical missing proficiencies',
      'Curated learning path suggestions and project-based milestones',
      'Exportable skill roadmap'
    ],
    techStack: [
      { name: 'React & TypeScript', responsibility: 'Interactive skill matrix selector and dynamic roadmap visualization' },
      { name: 'Google Gemini API', responsibility: 'Gap analysis evaluation and tailored developmental advice' },
      { name: 'Tailwind CSS', responsibility: 'Sleek analytical dashboard layout and visual progress meters' }
    ],
    architectureFlow: [
      { step: 'User Skill Input', description: 'User selects verified technical competencies and desired career trajectory' },
      { step: 'Taxonomy Comparison', description: 'System correlates user profile against target engineering standards' },
      { step: 'AI Gap Synthesis', description: 'Gemini evaluates deficiency vectors and prioritizes essential proficiencies' },
      { step: 'Learning Roadmap', description: 'Platform renders customized project objectives and sequential skill targets' }
    ],
    challenges: 'Designing an objective scoring mechanism that differentiates between basic familiarity and production-grade mastery when suggesting career development milestones.',
    resultStatus: 'Working web prototype demonstrating automated skill gap assessments and dynamic roadmap generation.'
  },
  {
    id: '06',
    slug: 'legal-consultation-scheduler',
    projectNumber: '06',
    category: 'LEGALTECH',
    categoryLabel: 'Legal Technology · Scheduling · Case Management',
    title: 'Legal Consultation Scheduling System',
    subtitle: 'A scheduling and availability management system designed for legal consultation workflows.',
    oneLineDescription: 'Full-stack appointment and calendar booking platform built specifically for law firms and attorney availability.',
    status: 'PROTOTYPE',
    year: '2024 - 2025',
    role: 'Full-Stack Developer',
    tags: ['LegalTech', 'Scheduling', 'Full-Stack', 'Email Automation', 'React', 'Node.js', 'PostgreSQL'],

    whatIsIt: 'A dedicated booking and appointment management platform tailored to legal practices and consultation rules.',
    whoIsItFor: 'Boutique law practices, independent attorneys, and prospective clients seeking transparent consultation bookings.',
    whatProblemDoesItSolve: 'Phone tag, timezone misalignments, and missed appointments that drain administrative hours and frustrate prospective clients.',
    whatDidAbdullahiBuild: 'Attorney availability management console, public client booking interface, conflict prevention logic, and automated email confirmation dispatchers.',

    overview: 'Built using a structured waterfall-with-backtracking methodology, this system resolves the scheduling friction between busy legal practitioners and clients. It provides attorneys with granular control over consultation windows while giving clients a friction-free booking experience with automated reminders.',
    theProblem: 'Attorneys have unpredictable court calendars and strict conflict-of-interest check requirements that render off-the-shelf meeting schedulers inadequate.',
    theSolution: 'A tailored legal consultation booking engine with lawyer-controlled availability buffers, intake questionnaires, appointment management dashboards, and automated email notifications.',
    myRole: [
      'Full-stack architecture and implementation of booking state machines',
      'Lawyer calendar availability management interface with custom slot intervals',
      'Public-facing client reservation portal with conflict screening prompts',
      'Automated email notification workflows for confirmations and reminders',
      'Database schema for bookings, attorney schedules, and client records'
    ],
    primaryAreas: [
      'Granular attorney availability configuration',
      'Interactive client slot selection and booking confirmation',
      'Automated transactional confirmation and reminder emails',
      'Attorney schedule management dashboard',
      'Appointment cancellation and rescheduling workflows'
    ],
    techStack: [
      { name: 'React & TypeScript', responsibility: 'Interactive booking calendar and attorney schedule admin views' },
      { name: 'Node.js', responsibility: 'Backend scheduling validation, conflict prevention, and time-slot calculations' },
      { name: 'PostgreSQL', responsibility: 'Relational storage for attorney profiles, availability windows, and bookings' },
      { name: 'Nodemailer / Email API', responsibility: 'Automated delivery of appointment invites and reminder notifications' }
    ],
    architectureFlow: [
      { step: 'Lawyer Availability Setup', description: 'Attorney sets working hours, buffer times, and consultation durations' },
      { step: 'Client Slot Selection', description: 'Prospective client selects an open time and completes intake details' },
      { step: 'Conflict Check & Save', description: 'Backend locks slot atomically in PostgreSQL to prevent double-booking' },
      { step: 'Automated Reminders', description: 'System issues transactional calendar invites and email confirmations to both parties' }
    ],
    challenges: 'Preventing race conditions during simultaneous bookings across overlapping time slots while accommodating attorney emergency schedule adjustments.',
    resultStatus: 'Functional full-stack prototype with verified email dispatch and slot booking logic.'
  },
  {
    id: '07',
    slug: 'trioline-travel',
    projectNumber: '07',
    category: 'TRAVEL',
    categoryLabel: 'Travel Technology · Digital Services Platform',
    title: 'Trioline Travel',
    subtitle: 'A travel services platform concept designed around travel and pilgrimage-related services.',
    oneLineDescription: 'Digital travel platform concept planned for comprehensive travel services and structured pilgrimage arrangements.',
    status: 'IN DEVELOPMENT',
    year: '2026 (Planned)',
    role: 'Product Concept & Interface Architect',
    tags: ['TravelTech', 'Web Application', 'Product Concept', 'In Development', 'React', 'Tailwind CSS'],

    whatIsIt: 'A planned digital platform within the Trioline ecosystem focused on travel packages, itinerary coordination, and pilgrimage logistics.',
    whoIsItFor: 'Travelers, group coordinators, and individuals planning international trips and religious pilgrimages (Umrah/Hajj) with authorized operators.',
    whatProblemDoesItSolve: 'Pilgrimage and travel logistics often require juggling disjointed offline agencies, visa guides, and accommodation bookings without unified digital visibility.',
    whatDidAbdullahiBuild: 'Conceptual product design, user flow blueprints, package discovery interfaces, and customer inquiry management architecture.',

    overview: 'Trioline Travel is a planned product currently in development. It is engineered to bring digital convenience to travel logistics and, where properly licensed, to structured religious pilgrimages. The platform prioritizes transparent package pricing, verified itineraries, and centralized customer assistance.',
    theProblem: 'Planning international group travel and specialized pilgrimages is frequently fraught with hidden costs, unverified travel operators, and cumbersome paper-based documentation.',
    theSolution: 'A transparent digital platform presenting structured travel packages, clear itinerary schedules, and integrated customer communication channels.',
    myRole: [
      'Conceptual product architecture and requirements definition',
      'Component design for travel package discovery and itinerary previews',
      'System design for booking inquiries and customer management'
    ],
    primaryAreas: [
      'Curated travel package discovery',
      'Pilgrimage service information and preparation guides',
      'Itinerary timeline visualization',
      'Customer inquiry intake and consultation coordination'
    ],
    techStack: [
      { name: 'React & Next.js', responsibility: 'High-performance package catalog and static marketing pages' },
      { name: 'Tailwind CSS', responsibility: 'Clean travel brand identity and responsive media gallery layouts' }
    ],
    architectureFlow: [
      { step: 'Package Discovery', description: 'Traveler explores verified package offerings and seasonal pilgrimage dates' },
      { step: 'Inquiry Intake', description: 'Traveler submits group details, visa requirements, and preference options' },
      { step: 'Customer Support Flow', description: 'Operations team coordinates licensed travel execution' }
    ],
    challenges: 'Designing customer onboarding flows that clearly differentiate between informational previews and regulated booking operations.',
    resultStatus: 'Currently in active product concept and interface development (clearly labeled as a planned product).'
  },
  {
    id: '08',
    slug: 'mobile-applications',
    projectNumber: '08',
    category: 'MOBILE',
    categoryLabel: 'Mobile Development · Cross-Platform Applications',
    title: 'Mobile Applications Suite',
    subtitle: 'Cross-platform mobile applications engineered for high performance on Android & iOS.',
    oneLineDescription: 'Native-feel mobile engineering utilizing Flutter and React Native for utilities, communication, and digital services.',
    status: 'PROTOTYPE',
    year: '2024 - 2025',
    role: 'Mobile Application Developer',
    tags: ['Flutter', 'React Native', 'Android', 'iOS', 'Firebase', 'Supabase'],

    whatIsIt: 'A collection of genuine cross-platform mobile applications engineered for responsive, native-like user experiences on handheld devices.',
    whoIsItFor: 'Mobile-first users seeking fast utility, real-time sync, and offline-capable mobile workflows.',
    whatProblemDoesItSolve: 'Web-only tools often lack hardware integrations (biometrics, local push notifications, camera scanner) and optimal touch responsiveness.',
    whatDidAbdullahiBuild: 'Cross-platform mobile architectures, state management systems, local device caching, biometric authentication, and backend synchronization.',

    overview: 'Mobile engineering work focusing on clean state architecture, 60fps animations, and dependable backend communication across both Android and iOS. Projects emphasize offline-first persistence, push notifications, and adaptive interfaces.',
    theProblem: 'Delivering consistent, snappy mobile experiences without maintaining two entirely disjointed native codebases requires disciplined cross-platform architecture.',
    theSolution: 'Built multi-platform mobile solutions using Flutter and React Native with unified backend interfaces via Supabase and Firebase.',
    myRole: [
      'Mobile UI component development with touch-first ergonomics',
      'Local persistence and offline data caching strategies',
      'Push notification setup and device permission handling',
      'Cross-platform testing on physical Android and iOS hardware'
    ],
    primaryAreas: [
      'Cross-platform UI implementation (Flutter / React Native)',
      'Offline-capable local storage and sync',
      'Authentication and biometrics',
      'Clean navigation architecture'
    ],
    techStack: [
      { name: 'Flutter & Dart', responsibility: 'Compiled native performance and custom high-refresh widget trees' },
      { name: 'React Native', responsibility: 'JavaScript-driven cross-platform component architecture' },
      { name: 'Firebase & Supabase', responsibility: 'Realtime data sync, authentication, and mobile push services' }
    ],
    architectureFlow: [
      { step: 'Device Touch Event', description: 'Hardware input processed with zero UI-thread blocking' },
      { step: 'Local State / SQLite Cache', description: 'Instant optimistic update rendered locally' },
      { step: 'Background Synchronization', description: 'Network payload dispatched to backend API with automatic retry' }
    ],
    challenges: 'Maintaining 60fps frame rates during complex list rendering and managing intermittent mobile connectivity gracefully.',
    resultStatus: 'Functional cross-platform mobile implementations and device prototypes.'
  },
  {
    id: '09',
    slug: 'game-development',
    projectNumber: '09',
    category: 'GAMING',
    categoryLabel: 'Game Development · Interactive Experiences · Learning Mechanics',
    title: 'Interactive Systems & Game Mechanics',
    subtitle: 'Gamified learning engines and interactive web experiences built with game design principles.',
    oneLineDescription: 'Exploration of game loops, progressive difficulty, reward mechanics, and interactive web animation.',
    status: 'EXPERIMENT',
    year: '2024 - 2025',
    role: 'Gameplay & Mechanics Developer',
    tags: ['Game Mechanics', 'Gamification', 'Knowledge Arena', 'Interactive Systems', 'TypeScript', 'Web Animation'],

    whatIsIt: 'Implementations of game loops, challenge-response systems, reward pacing, and tactile animations applied to web and educational contexts.',
    whoIsItFor: 'Users looking for engaging, intrinsically motivating digital experiences that go beyond static forms.',
    whatProblemDoesItSolve: 'Traditional software often feels dry and disengaging; applying proven game design principles dramatically increases user retention and focus.',
    whatDidAbdullahiBuild: 'The Knowledge Arena gamification engine (points, combo streaks, difficulty scaling), real-time feedback loops, and interactive web mechanics.',

    overview: 'Focusing on game mechanics as an engineering craft, this work examines how points, feedback timers, level thresholds, and tactile motion design turn passive tasks into captivating experiences.',
    theProblem: 'User attrition is highest during repetitive or rigorous tasks such as self-study, memorization, and routine data entry.',
    theSolution: 'Engineered responsive game loops featuring immediate visual feedback, progressive challenge tiers, and achievement milestones.',
    myRole: [
      'Design of game loops, scoring algorithms, and combo multipliers',
      'Integration of physics-informed motion and audio-tactile feedback',
      'State management for player progression, stats, and achievements'
    ],
    primaryAreas: [
      'Knowledge Arena learning modes (Flash Blitz, Concepts Cards)',
      'Scoring algorithms with progressive difficulty curves',
      'Badge allocation and milestone progression systems',
      'Interactive visual feedback and responsive animation'
    ],
    techStack: [
      { name: 'TypeScript', responsibility: 'Authoritative game state engines and deterministic scoring models' },
      { name: 'Framer Motion / GSAP', responsibility: 'High-frame-rate visual feedback, transitions, and particle bursts' },
      { name: 'React', responsibility: 'UI integration of player heads-up displays (HUD) and scoreboards' }
    ],
    architectureFlow: [
      { step: 'Challenge Trigger', description: 'Engine presents time-bounded or objective-based challenge' },
      { step: 'User Action Evaluation', description: 'Deterministic engine scores response speed and accuracy' },
      { step: 'Reward & Progression', description: 'Multiplier applied; visual celebratory feedback triggered; stats saved' }
    ],
    challenges: 'Tuning scoring and difficulty curves so that challenges feel genuinely rewarding rather than punishing or trivially easy.',
    resultStatus: 'Operational game loops integrated into educational platforms and interactive demos.'
  },
  {
    id: '10',
    slug: 'experiments',
    projectNumber: '10',
    category: 'EXPERIMENTAL',
    categoryLabel: 'Experimental Projects · Creative Code · Web Animation',
    title: 'Creative Web Experiments',
    subtitle: 'Explorations in scroll-linked movement, spatial composition, and cinematic transitions.',
    oneLineDescription: 'Technical experiments exploring GSAP scroll scrubbing, fluid typography, and interactive spatial interactions.',
    status: 'EXPERIMENT',
    year: '2024 - 2026',
    role: 'Creative Developer',
    tags: ['GSAP', 'ScrollTrigger', 'Framer Motion', 'Creative Tech', 'WebGL', 'Spatial Web'],

    whatIsIt: 'A curated sandbox of creative engineering experiments pushing the envelope of browser animation and kinetic typography.',
    whoIsItFor: 'Design-forward digital products, experiential agency portfolios, and interactive brand websites.',
    whatProblemDoesItSolve: 'Standard web layouts are often static and predictable, failing to evoke emotion or guide user attention through storytelling.',
    whatDidAbdullahiBuild: 'Scroll-linked aircraft visual journeys, custom cursor dynamics, parallax depth orchestrations, and interactive GSAP timelines.',

    overview: 'These experiments explore the intersection of technical performance and artistic visual motion. Projects include scroll-linked spatial composition, custom cursor reactive trails, and physics-driven UI transitions that maintain 60fps.',
    theProblem: 'Complex web animations frequently degrade browser performance, causing frame drops and battery drain on mobile devices.',
    theSolution: 'Engineered hardware-accelerated transforms utilizing GSAP ScrollTrigger and Framer Motion with rigorous layout recalculation discipline.',
    myRole: [
      'Prototyping physics-informed scroll interactions and timelines',
      'Optimizing GPU rendering layers (`will-change: transform`, composite layers)',
      'Implementing fluid kinetic typography and responsive spatial layout'
    ],
    primaryAreas: [
      'Scroll-based Aircraft Flight Experience: spatial composition and velocity-linked animation',
      'GSAP ScrollTrigger parallax coordinate systems',
      'Kinetic typography and shimmering gradient shaders',
      'Custom cursor glowing reactive trails and interactive canvas ripples'
    ],
    techStack: [
      { name: 'GSAP & ScrollTrigger', responsibility: 'High-precision timeline sequencing and scrubbed scroll synchronization' },
      { name: 'Framer Motion', responsibility: 'Declarative component physics and exit/enter spring animations' },
      { name: 'CSS GPU Compositing', responsibility: 'Transform-only matrix modifications preventing expensive layout reflows' }
    ],
    architectureFlow: [
      { step: 'Scroll Event Scrub', description: 'Browser scroll tick captured by GSAP without UI jank' },
      { step: 'Matrix Transformation', description: 'Element coordinates calculated and applied via hardware transform3d' },
      { step: 'Visual Storytelling', description: 'Cinematic visual sequence progresses smoothly in sync with user velocity' }
    ],
    challenges: 'Achieving butter-smooth scroll synchronization across high-refresh desktop monitors while remaining fully performant on touchscreens.',
    resultStatus: 'Active experimental showcase embedded into this portfolio and creative demos.'
  }
]
