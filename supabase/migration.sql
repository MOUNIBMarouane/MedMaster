-- =============================================
-- MedMaster Waiting List — Supabase Migration
-- =============================================
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  ville TEXT NOT NULL,
  universite TEXT NOT NULL,
  annee TEXT NOT NULL,
  besoin TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index on email for duplicate checks
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);

-- Index on created_at for ordering
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist (created_at DESC);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: allow anonymous inserts (for the signup form)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Policy: allow anonymous count (for the counter)
CREATE POLICY "Allow anonymous select for count" ON waitlist
  FOR SELECT
  USING (true);

-- Add telephone field (if not already present)
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS telephone TEXT;

-- Add internship specialty field (Stage Hub feature)
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS specialite_stage TEXT;

-- Optional: create a view for quick stats
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT
  COUNT(*) AS total_signups,
  COUNT(DISTINCT ville) AS unique_cities,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '24 hours') AS last_24h,
  ville,
  COUNT(*) AS count_per_city
FROM waitlist
GROUP BY ville;
