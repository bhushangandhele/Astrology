-- saved_profiles table
CREATE TABLE IF NOT EXISTS saved_profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    dob TEXT NOT NULL,         -- YYYY-MM-DD
    tob TEXT NOT NULL,         -- HH:MM
    place TEXT NOT NULL,       -- City, Country
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    timezone TEXT NOT NULL,    -- e.g., "Asia/Kolkata"
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- match_history table (compatibility searches)
CREATE TABLE IF NOT EXISTS match_history (
    id TEXT PRIMARY KEY,
    profile_a_id TEXT NOT NULL,
    profile_b_id TEXT NOT NULL,
    score REAL NOT NULL,        -- Total gun score (out of 36)
    details TEXT NOT NULL,      -- JSON string of matching details
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(profile_a_id) REFERENCES saved_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(profile_b_id) REFERENCES saved_profiles(id) ON DELETE CASCADE
);
