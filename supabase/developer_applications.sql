CREATE TABLE developer_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin_url TEXT,
  github_url TEXT,
  location TEXT,
  years_experience INTEGER,
  hourly_rate INTEGER,
  availability TEXT,
  specialisations TEXT[] DEFAULT '{}',
  certifications TEXT,
  about TEXT,
  top_projects TEXT,
  why_magematch TEXT,
  portfolio_url TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE developer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply"
  ON developer_applications
  FOR INSERT WITH CHECK (true);