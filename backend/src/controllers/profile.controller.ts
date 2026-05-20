import { Request, Response } from 'express';
import db from '../config/database';
import crypto from 'crypto';

export interface SavedProfile {
  id: string;
  name: string;
  dob: string;
  tob: string;
  place: string;
  latitude: number;
  longitude: number;
  timezone: string;
  created_at?: string;
}

export const saveProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, dob, tob, place, latitude, longitude, timezone } = req.body;

    if (!name || !dob || !tob || !place || latitude === undefined || longitude === undefined || !timezone) {
      res.status(400).json({ error: 'Missing required parameters to save profile.' });
      return;
    }

    const id = crypto.randomUUID();
    const query = `
      INSERT INTO saved_profiles (id, name, dob, tob, place, latitude, longitude, timezone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [id, name, dob, tob, place, Number(latitude), Number(longitude), timezone], function(err) {
      if (err) {
        console.error('Error saving profile:', err.message);
        res.status(500).json({ error: 'Failed to save profile to database', details: err.message });
      } else {
        res.status(201).json({
          message: 'Profile successfully saved',
          profile: { id, name, dob, tob, place, latitude, longitude, timezone }
        });
      }
    });
  } catch (err: any) {
    console.error('Error in saveProfile controller:', err);
    res.status(500).json({ error: 'Failed to process save profile request', details: err.message });
  }
};

export const getProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = 'SELECT * FROM saved_profiles ORDER BY created_at DESC';

    db.all(query, [], (err, rows: SavedProfile[]) => {
      if (err) {
        console.error('Error fetching profiles:', err.message);
        res.status(500).json({ error: 'Failed to retrieve saved profiles', details: err.message });
      } else {
        res.status(200).json({ profiles: rows });
      }
    });
  } catch (err: any) {
    console.error('Error in getProfiles controller:', err);
    res.status(500).json({ error: 'Failed to process retrieve profiles request', details: err.message });
  }
};

export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Missing profile ID parameter' });
      return;
    }

    const query = 'DELETE FROM saved_profiles WHERE id = ?';

    db.run(query, [id], function(err) {
      if (err) {
        console.error('Error deleting profile:', err.message);
        res.status(500).json({ error: 'Failed to delete profile', details: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Profile not found' });
      } else {
        res.status(200).json({ message: 'Profile successfully deleted' });
      }
    });
  } catch (err: any) {
    console.error('Error in deleteProfile controller:', err);
    res.status(500).json({ error: 'Failed to process delete profile request', details: err.message });
  }
};
