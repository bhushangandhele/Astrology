import React, { useState, useEffect, useRef } from 'react';
import { searchCitiesAsync, type CityInfo } from '../utils/cities';
import { UI_TRANSLATIONS } from '../utils/i18n';

export interface BirthProfileData {
  name: string;
  gender: 'Male' | 'Female';
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
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  
  // Custom Date/Time State for Mobile Compatibility
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmpm] = useState('AM');
  
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

  const searchTimeoutRef = useRef<number | null>(null);

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPlace(val);
    
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }

    if (val.length >= 2) {
      searchTimeoutRef.current = window.setTimeout(async () => {
        const suggestions = await searchCitiesAsync(val);
        setCitySuggestions(suggestions);
        setShowSuggestions(true);
      }, 300);
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
      setGender(profile.gender || 'Male');
      
      // Parse YYYY-MM-DD
      const [pYear, pMonth, pDay] = profile.dob.split('-');
      setYear(pYear);
      setMonth(pMonth);
      setDay(pDay);

      // Parse HH:mm
      const [pHourStr, pMinStr] = profile.tob.split(':');
      let pHour = parseInt(pHourStr, 10);
      const pAmpm = pHour >= 12 ? 'PM' : 'AM';
      if (pHour > 12) pHour -= 12;
      if (pHour === 0) pHour = 12;
      
      setHour(pHour.toString());
      setMinute(pMinStr);
      setAmpm(pAmpm);

      setPlace(profile.place);
      setLatitude(profile.latitude);
      setLongitude(profile.longitude);
      setTimezone(profile.timezone);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !day || !month || !year || !hour || !minute || !place) return;

    // Compile DOB (YYYY-MM-DD)
    const compiledDob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
    // Compile TOB (HH:mm in 24hr format)
    let h24 = parseInt(hour, 10);
    if (ampm === 'PM' && h24 !== 12) h24 += 12;
    if (ampm === 'AM' && h24 === 12) h24 = 0;
    const compiledTob = `${String(h24).padStart(2, '0')}:${minute.padStart(2, '0')}`;

    const profileData: BirthProfileData = {
      name,
      gender,
      dob: compiledDob,
      tob: compiledTob,
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

      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
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
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>{language === 'MR' ? 'लिंग' : 'Gender'}</label>
          <select 
            className="input-cosmic" 
            value={gender} 
            onChange={e => setGender(e.target.value as 'Male' | 'Female')}
          >
            <option value="Male">{language === 'MR' ? 'पुरुष' : 'Male'}</option>
            <option value="Female">{language === 'MR' ? 'स्त्री' : 'Female'}</option>
          </select>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Custom Date Selector */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>{t.dob}</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="number"
              min="1"
              max="31"
              placeholder={language === 'MR' ? 'दिवस' : 'DD'}
              className="input-cosmic date-time-input"
              style={{ width: '28%', textAlign: 'center' }}
              value={day}
              onChange={e => setDay(e.target.value)}
              required
            />
            <select
              className="input-cosmic date-time-input"
              style={{ width: '40%' }}
              value={month}
              onChange={e => setMonth(e.target.value)}
              required
            >
              <option value="">{language === 'MR' ? 'महिना' : 'Month'}</option>
              <option value="1">{language === 'MR' ? 'जानेवारी' : 'Jan'}</option>
              <option value="2">{language === 'MR' ? 'फेब्रुवारी' : 'Feb'}</option>
              <option value="3">{language === 'MR' ? 'मार्च' : 'Mar'}</option>
              <option value="4">{language === 'MR' ? 'एप्रिल' : 'Apr'}</option>
              <option value="5">{language === 'MR' ? 'मे' : 'May'}</option>
              <option value="6">{language === 'MR' ? 'जून' : 'Jun'}</option>
              <option value="7">{language === 'MR' ? 'जुलै' : 'Jul'}</option>
              <option value="8">{language === 'MR' ? 'ऑगस्ट' : 'Aug'}</option>
              <option value="9">{language === 'MR' ? 'सप्टेंबर' : 'Sep'}</option>
              <option value="10">{language === 'MR' ? 'ऑक्टोबर' : 'Oct'}</option>
              <option value="11">{language === 'MR' ? 'नोव्हेंबर' : 'Nov'}</option>
              <option value="12">{language === 'MR' ? 'डिसेंबर' : 'Dec'}</option>
            </select>
            <input
              type="number"
              min="1900"
              max="2100"
              placeholder={language === 'MR' ? 'वर्ष' : 'YYYY'}
              className="input-cosmic date-time-input"
              style={{ width: '32%', textAlign: 'center' }}
              value={year}
              onChange={e => setYear(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Custom Time Selector */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>{t.tob}</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select
              className="input-cosmic date-time-input"
              style={{ width: '35%', textAlign: 'center' }}
              value={hour}
              onChange={e => setHour(e.target.value)}
              required
            >
              <option value="">{language === 'MR' ? 'तास' : 'HH'}</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span style={{ color: '#fff', display: 'flex', alignItems: 'center', fontWeight: 600 }}>:</span>
            <input
              type="number"
              min="0"
              max="59"
              placeholder={language === 'MR' ? 'मिनिट' : 'MM'}
              className="input-cosmic date-time-input"
              style={{ width: '35%', textAlign: 'center' }}
              value={minute}
              onChange={e => setMinute(e.target.value)}
              required
            />
            <select
              className="input-cosmic date-time-input"
              style={{ width: '30%' }}
              value={ampm}
              onChange={e => setAmpm(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
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
        disabled={isLoading || !name || !day || !month || !year || !hour || !minute || !place}
      >
        {isLoading ? t.calculating : btnText}
      </button>
    </form>
  );
};
