-- ====================================================================
-- SUPABASE SCHEMA FOR ABDULLAHI SIBA PORTFOLIO
-- (Testimonials & Contact Messages)
-- Run this complete script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. TESTIMONIALS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (visitors/public) to view approved testimonials
DROP POLICY IF EXISTS "Allow public read access" ON public.testimonials;
CREATE POLICY "Allow public read access"
  ON public.testimonials
  FOR SELECT
  TO public
  USING (approved = true);

-- Policy: Allow anyone (clients/guests) to submit a new testimonial
DROP POLICY IF EXISTS "Allow public insert" ON public.testimonials;
CREATE POLICY "Allow public insert"
  ON public.testimonials
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Index for ordering by creation date
CREATE INDEX IF NOT EXISTS testimonials_created_at_idx 
  ON public.testimonials (created_at DESC);

-- Seed initial testimonials
INSERT INTO public.testimonials (name, role, text, rating, approved)
VALUES
  (
    'ADEBANJI CALEB',
    'CEO, COSTREAM',
    'Siba delivered an exceptional website that exceeded our expectations. His attention to detail and creative vision is unmatched.',
    5,
    true
  ),
  (
    'OSTIN EMMANUEL',
    'Founder, DesignCo',
    'Working with siba was a game-changer for our business. The mobile app he built increased our user engagement by 300%.',
    5,
    true
  ),
  (
    'Emily Davis',
    'Marketing Director',
    'Professional, creative, and reliable. siba transformed our brand identity and created a stunning e-commerce platform.',
    5,
    true
  )
ON CONFLICT DO NOTHING;

-- --------------------------------------------------------------------
-- 2. MESSAGES TABLE (Contact Form Inquiries)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert/send a message from the contact form
DROP POLICY IF EXISTS "Allow public insert messages" ON public.messages;
CREATE POLICY "Allow public insert messages"
  ON public.messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow service role / anon reading messages for dashboard
DROP POLICY IF EXISTS "Allow read messages" ON public.messages;
CREATE POLICY "Allow read messages"
  ON public.messages
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow updating read status
DROP POLICY IF EXISTS "Allow update messages" ON public.messages;
CREATE POLICY "Allow update messages"
  ON public.messages
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Policy: Allow deleting messages
DROP POLICY IF EXISTS "Allow delete messages" ON public.messages;
CREATE POLICY "Allow delete messages"
  ON public.messages
  FOR DELETE
  TO public
  USING (true);

-- Index for fast ordering by newest message
CREATE INDEX IF NOT EXISTS messages_created_at_idx 
  ON public.messages (created_at DESC);
