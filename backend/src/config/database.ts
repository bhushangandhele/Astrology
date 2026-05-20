import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.resolve(__dirname, '../../astro.db');
const SCHEMA_PATH = path.resolve(__dirname, '../models/schema.sql');

// Enable verbose mode for better debugging
const sqlite = sqlite3.verbose();

const db = new sqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log(`Connected to SQLite database at: ${DB_PATH}`);
    initializeDatabase();
  }
});

function initializeDatabase() {
  try {
    const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
    
    // Split SQL by semicolons to execute each statement separately
    const statements = schemaSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    db.serialize(() => {
      // Enable foreign key constraints
      db.run('PRAGMA foreign_keys = ON;', (err) => {
        if (err) console.error('Error enabling foreign keys:', err.message);
      });

      for (const statement of statements) {
        db.run(statement, (err) => {
          if (err) {
            console.error('Error executing schema statement:', err.message);
            console.error('Statement was:', statement);
          }
        });
      }
    });
    
    console.log('Database tables successfully initialized or checked.');
  } catch (err) {
    console.error('Failed to read or run database schema:', err);
  }
}

export default db;
