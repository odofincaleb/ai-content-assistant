import React, { useState, useEffect } from 'react';
import './Settings.css';

const ELEVENLABS_HELP_URL = 'https://help.elevenlabs.io/hc/en-us/articles/14599447207697-How-do-I-authorize-myself-using-an-API-key';
const GOOGLE_CLOUD_HELP_URL = 'https://fideantech.com/get-google-cloud-text-to-speech-api';

const Settings = () => {
  const [settings, setSettings] = useState({
    googleCloudApiKey: '',
    elevenLabsApiKey: '',
    defaultTtsService: 'elevenlabs', // ElevenLabs is now default
    autoSave: true,
    theme: 'dark'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('ttsSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = async () => {
    setIsSaving(true);
    setSaveStatus('Saving...');
    try {
      localStorage.setItem('ttsSettings', JSON.stringify(settings));
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Error saving settings. Please try again.');
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Save on change if autoSave is enabled
  useEffect(() => {
    if (settings.autoSave) {
      localStorage.setItem('ttsSettings', JSON.stringify(settings));
    }
  }, [settings]);

  // Test API keys
  const testApiKey = async (service) => {
    if (!settings[`${service}ApiKey`]) {
      alert(`Please enter your ${service === 'googleCloud' ? 'Google Cloud' : 'ElevenLabs'} API key first.`);
      return;
    }
    setSaveStatus(`Testing ${service === 'googleCloud' ? 'Google Cloud' : 'ElevenLabs'} connection...`);
    try {
      if (service === 'googleCloud') {
        const response = await fetch(`https://texttospeech.googleapis.com/v1/voices?key=${settings.googleCloudApiKey}`);
        if (response.ok) {
          setSaveStatus('✅ Google Cloud: Connected');
        } else {
          setSaveStatus('❌ Google Cloud: Not Connected - Invalid API key');
        }
      } else if (service === 'elevenLabs') {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
          headers: { 'xi-api-key': settings.elevenLabsApiKey }
        });
        if (response.ok) {
          setSaveStatus('✅ ElevenLabs: Connected');
        } else {
          setSaveStatus('❌ ElevenLabs: Not Connected - Invalid API key');
        }
      }
    } catch (error) {
      setSaveStatus(`❌ ${service === 'googleCloud' ? 'Google Cloud' : 'ElevenLabs'}: Not Connected - Network error`);
      console.error('API test error:', error);
    }
    setTimeout(() => setSaveStatus(''), 5000);
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
      setSettings({
        googleCloudApiKey: '',
        elevenLabsApiKey: '',
        defaultTtsService: 'elevenlabs',
        autoSave: true,
        theme: 'dark'
      });
      localStorage.removeItem('ttsSettings');
      setSaveStatus('Settings reset successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure your Text-to-Speech API keys and preferences</p>
      </div>
      <div className="settings-container">
        <div className="settings-section">
          <h2>Text-to-Speech Services</h2>
          <div className="service-card">
            <h3>Google Cloud Text-to-Speech</h3>
            <p>High-quality voices with 380+ options across 50+ languages. Requires Google Cloud account.</p>
            <div className="api-input-group">
              <label>API Key:</label>
              <input
                type="password"
                value={settings.googleCloudApiKey}
                onChange={(e) => handleInputChange('googleCloudApiKey', e.target.value)}
                placeholder="Enter your Google Cloud API key"
                className="api-input"
              />
              <button 
                className="btn btn-secondary test-btn"
                onClick={() => testApiKey('googleCloud')}
                disabled={!settings.googleCloudApiKey}
              >
                Test Key
              </button>
              <a href={GOOGLE_CLOUD_HELP_URL} target="_blank" rel="noopener noreferrer" className="help-link">
                Get API Key Help
              </a>
            </div>
          </div>
          <div className="service-card">
            <h3>ElevenLabs</h3>
            <p>Ultra-realistic AI voices with emotion control and voice cloning capabilities.</p>
            <div className="api-input-group">
              <label>API Key:</label>
              <input
                type="password"
                value={settings.elevenLabsApiKey}
                onChange={(e) => handleInputChange('elevenLabsApiKey', e.target.value)}
                placeholder="Enter your ElevenLabs API key"
                className="api-input"
              />
              <button 
                className="btn btn-secondary test-btn"
                onClick={() => testApiKey('elevenLabs')}
                disabled={!settings.elevenLabsApiKey}
              >
                Test Key
              </button>
              <a href={ELEVENLABS_HELP_URL} target="_blank" rel="noopener noreferrer" className="help-link">
                Get API Key Help
              </a>
            </div>
          </div>
        </div>
        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="preference-group">
            <label>Default TTS Service:</label>
            <select
              value={settings.defaultTtsService}
              onChange={(e) => handleInputChange('defaultTtsService', e.target.value)}
              className="preference-select"
            >
              <option value="google">Google Cloud TTS</option>
              <option value="elevenlabs">ElevenLabs</option>
            </select>
          </div>
          <div className="preference-group">
            <label>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleInputChange('autoSave', e.target.checked)}
              />
              Auto-save settings
            </label>
          </div>
          <div className="preference-group">
            <label>Theme:</label>
            <select
              value={settings.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              className="preference-select"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        <div className="settings-actions">
          <button 
            className="btn btn-primary save-btn"
            onClick={saveSettings}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
          <button 
            className="btn btn-outline reset-btn"
            onClick={resetSettings}
          >
            Reset Settings
          </button>
        </div>
        {saveStatus && (
          <div className="save-status">
            {saveStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 