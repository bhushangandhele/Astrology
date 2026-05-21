import React, { useState, useEffect } from 'react';
import { searchCities, type CityInfo } from '../utils/cities';
import { UI_TRANSLATIONS } from '../utils/i18n';

export interface BirthProfileData {
  name: string;
  dob: string;
  tob: string;
  place: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface ProfileFormProps {
  onSubmit: (data: BirthProfileData) => void;
  isLoading: boolean;
  submitButtonText?: string;
  language?: 'EN' | 'MR';
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  isLoading,
  submitButtonText,
  language = 'EN'
}) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [place, setPlace] = useState('');
  
  // Geocoding coords & timezone
  const [latitude, setLatitude] = useState<number>(28.6139);
  const [longitude, setLongitude] = useState<number>(77.2090);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  
  // Autocomplete state
  const [citySuggestions, setCitySuggestions] = useState<CityInfo[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Saved profiles state
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [shouldSaveProfile, setShouldSaveProfile] = useState(false);

  // Fetch saved profiles on mount
  useEffect(() => {
    fetchSavedProfiles();
  }, []);

  const fetchSavedProfiles = () => {
    try {
      const saved = localStorage.getItem('astro_profiles');
      if (saved) {
        setSavedProfiles(JSON.parse(saved));
      } else {
        setSavedProfiles([]);
      }
    } catch (err) {
      console.error('Failed to fetch saved profiles from localStorage', err);
    }
  };

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPlace(val);
    if (val.length >= 2) {
      const suggestions = searchCities(val);
      setCitySuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (city: CityInfo) => {
    setPlace(`${city.name}, ${city.country}`);
    setLatitude(city.latitude);
    setLongitude(city.longitude);
    setTimezone(city.timezone);
    setCitySuggestions([]);
    setShowSuggestions(false);
  };

  const handleSelectSavedProfile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = e.target.value;
    setSelectedProfileId(pId);
    if (!pId) return;

    const profile = savedProfiles.find(p => p.id === pId);
    if (profile) {
      setName(profile.name);
      setDob(profile.dob);
      setTob(profile.tob);
      setPlace(profile.place);
      setLatitude(profile.latitude);
      setLongitude(profile.longitude);
      setTimezone(profile.timezone);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob || !tob || !place) return;

    const profileData: BirthProfileData = {
      name,
      dob,
      tob,
      place,
      latitude,
      longitude,
      timezone
    };

    // If "save profile" is checked and not loading a saved profile directly, save it!
    if (shouldSaveProfile && !selectedProfileId) {
      try {
        const saved = localStorage.getItem('astro_profiles');
        const currentProfiles = saved ? JSON.parse(saved) : [];
        const newProfile = {
          id: Date.now().toString(),
          ...profileData
        };
        const updatedProfiles = [...currentProfiles, newProfile];
        localStorage.setItem('astro_profiles', JSON.stringify(updatedProfiles));
        fetchSavedProfiles(); // Refresh list
        setShouldSaveProfile(false); // Reset checkbox
      } catch (err) {
        console.error('Failed to save profile to localStorage', err);
      }
    }

    onSubmit(profileData);
  };

  const t = UI_TRANSLATIONS[language];
  const btnText = submitButtonText || t.generatePredictions;

  return (
    <form onSubmit={handleSubmit} className="glass-panel gold-themed">
      <h3 className="title-cosmic" style={{ fontSize: '1.4rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)', paddingBottom: '0.5rem' }}>
        {t.enterDetails}
      </h3>

      {savedProfiles.length > 0 && (
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="saved-profile-select">{t.loadProfile}</label>
          <select
            id="saved-profile-select"
            className="input-cosmic"
            style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}
            value={selectedProfileId}
            onChange={handleSelectSavedProfile}
          >
            <option value="">{t.chooseProfile}</option>
            {savedProfiles.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.dob} at {p.place})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="user-name">{t.fullName}</label>
        <input
          id="user-name"
          type="text"
          className="input-cosmic"
          required
          placeholder={language === 'MR' ? 'नाव प्रविष्ट करा' : 'Enter name'}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
        <div className="form-group">
          <label htmlFor="dob-picker">{t.dob}</label>
          <input
            id="dob-picker"
            type="date"
            className="input-cosmic"
            required
            value={dob}
            onChange={e => setDob(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tob-picker">{t.tob}</label>
          <input
            id="tob-picker"
            type="time"
            className="input-cosmic"
            required
            value={tob}
            onChange={e => setTob(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group" style={{ position: 'relative' }}>
        <label htmlFor="place-picker">{t.place}</label>
        <input
          id="place-picker"
          type="text"
          className="input-cosmic"
          required
          placeholder={t.searchPlaceHolder}
          value={place}
          onChange={handleCityInputChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && citySuggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              background: '#0c0a1e',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '8px',
              zIndex: 100,
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            {citySuggestions.map((city, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  borderBottom: idx === citySuggestions.length - 1 ? 'none' : '1px solid rgba(139, 92, 246, 0.1)',
                  color: '#fff',
                  transition: 'background 0.2s'
                }}
                onMouseDown={() => handleSelectSuggestion(city)}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                <span style={{ fontWeight: 600 }}>{city.name}</span>, <span style={{ color: '#94a3b8' }}>{city.country}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Advanced coordinates (collapsed/shown neatly as tiny detail) */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#94a3b8',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div>{language === 'MR' ? 'अक्षांश:' : 'Latitude:'} <span style={{ color: '#fff', fontWeight: 600 }}>{latitude.toFixed(4)}°N</span></div>
        <div>{language === 'MR' ? 'रेखांश:' : 'Longitude:'} <span style={{ color: '#fff', fontWeight: 600 }}>{longitude.toFixed(4)}°E</span></div>
        <div>{language === 'MR' ? 'वेळ क्षेत्र:' : 'Timezone:'} <span style={{ color: '#f59e0b', fontWeight: 600 }}>{timezone}</span></div>
      </div>

      {!selectedProfileId && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            id="save-profile-checkbox"
            type="checkbox"
            style={{ width: '1rem', height: '1rem', cursor: 'pointer' }}
            checked={shouldSaveProfile}
            onChange={e => setShouldSaveProfile(e.target.checked)}
          />
          <label htmlFor="save-profile-checkbox" style={{ fontSize: '0.9rem', color: '#94a3b8', cursor: 'pointer' }}>
            {t.saveProfile}
          </label>
        </div>
      )}

      <button
        type="submit"
        className="btn-cosmic gold"
        style={{ width: '100%' }}
        disabled={isLoading || !name || !dob || !tob || !place}
      >
        {isLoading ? t.calculating : btnText}
      </button>
    </form>
  );
};
