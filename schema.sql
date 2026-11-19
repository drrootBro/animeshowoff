-- AnimeShowoff waitlist table (Cloudflare D1)
-- Run this once in the D1 console for the database `animeshowoff-waitlist`.
CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  tier TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
