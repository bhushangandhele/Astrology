"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.getProfiles = exports.saveProfile = void 0;
const database_1 = __importDefault(require("../config/database"));
const crypto_1 = __importDefault(require("crypto"));
const saveProfile = async (req, res) => {
    try {
        const { name, dob, tob, place, latitude, longitude, timezone } = req.body;
        if (!name || !dob || !tob || !place || latitude === undefined || longitude === undefined || !timezone) {
            res.status(400).json({ error: 'Missing required parameters to save profile.' });
            return;
        }
        const id = crypto_1.default.randomUUID();
        const query = `
      INSERT INTO saved_profiles (id, name, dob, tob, place, latitude, longitude, timezone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
        database_1.default.run(query, [id, name, dob, tob, place, Number(latitude), Number(longitude), timezone], function (err) {
            if (err) {
                console.error('Error saving profile:', err.message);
                res.status(500).json({ error: 'Failed to save profile to database', details: err.message });
            }
            else {
                res.status(201).json({
                    message: 'Profile successfully saved',
                    profile: { id, name, dob, tob, place, latitude, longitude, timezone }
                });
            }
        });
    }
    catch (err) {
        console.error('Error in saveProfile controller:', err);
        res.status(500).json({ error: 'Failed to process save profile request', details: err.message });
    }
};
exports.saveProfile = saveProfile;
const getProfiles = async (req, res) => {
    try {
        const query = 'SELECT * FROM saved_profiles ORDER BY created_at DESC';
        database_1.default.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error fetching profiles:', err.message);
                res.status(500).json({ error: 'Failed to retrieve saved profiles', details: err.message });
            }
            else {
                res.status(200).json({ profiles: rows });
            }
        });
    }
    catch (err) {
        console.error('Error in getProfiles controller:', err);
        res.status(500).json({ error: 'Failed to process retrieve profiles request', details: err.message });
    }
};
exports.getProfiles = getProfiles;
const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Missing profile ID parameter' });
            return;
        }
        const query = 'DELETE FROM saved_profiles WHERE id = ?';
        database_1.default.run(query, [id], function (err) {
            if (err) {
                console.error('Error deleting profile:', err.message);
                res.status(500).json({ error: 'Failed to delete profile', details: err.message });
            }
            else if (this.changes === 0) {
                res.status(404).json({ error: 'Profile not found' });
            }
            else {
                res.status(200).json({ message: 'Profile successfully deleted' });
            }
        });
    }
    catch (err) {
        console.error('Error in deleteProfile controller:', err);
        res.status(500).json({ error: 'Failed to process delete profile request', details: err.message });
    }
};
exports.deleteProfile = deleteProfile;
