import React, { useState, useEffect } from 'react';
import './Settings.css';

const ELEVENLABS_HELP_URL = 'https://help.elevenlabs.io/hc/en-us/articles/14599447207697-How-do-I-authorize-myself-using-an-API-key';
const GOOGLE_CLOUD_HELP_URL = 'https://fideantech.com/get-google-cloud-text-to-speech-api';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    googleCloudApiKey: '',
    elevenLabsApiKey: '',
    defaultTtsService: 'elevenlabs',
    autoSave: true,
    theme: 'dark'
  });
  
  // WordPress logins state
  const [wordPressLogins, setWordPressLogins] = useState([]);
  const [newWordPressLogin, setNewWordPressLogin] = useState({
    label: '',
    url: '',
    username: '',
    appPassword: ''
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
    
    // Load WordPress logins
    const savedWordPressLogins = localStorage.getItem('wordPressLogins');
    if (savedWordPressLogins) {
      try {
        const parsed = JSON.parse(savedWordPressLogins);
        setWordPressLogins(parsed);
      } catch (error) {
        console.error('Error loading WordPress logins:', error);
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

  // Save WordPress logins
  const saveWordPressLogins = () => {
    try {
      localStorage.setItem('wordPressLogins', JSON.stringify(wordPressLogins));
      setSaveStatus('WordPress logins saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Error saving WordPress logins. Please try again.');
      console.error('Error saving WordPress logins:', error);
    }
  };

  // Auto-save WordPress logins when they change
  useEffect(() => {
    if (wordPressLogins.length > 0) {
      localStorage.setItem('wordPressLogins', JSON.stringify(wordPressLogins));
    }
  }, [wordPressLogins]);

  // Add new WordPress login
  const addWordPressLogin = () => {
    if (!newWordPressLogin.label || !newWordPressLogin.url || !newWordPressLogin.username || !newWordPressLogin.appPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    const newLogin = {
      id: Date.now(),
      ...newWordPressLogin
    };
    
    setWordPressLogins(prev => [...prev, newLogin]);
    setNewWordPressLogin({ label: '', url: '', username: '', appPassword: '' });
    saveWordPressLogins();
  };

  // Delete WordPress login
  const deleteWordPressLogin = (id) => {
    if (window.confirm('Are you sure you want to delete this WordPress login?')) {
      setWordPressLogins(prev => prev.filter(login => login.id !== id));
      saveWordPressLogins();
    }
  };

  // Test WordPress connection
  const testWordPressConnection = async (login) => {
    setSaveStatus(`Testing connection to ${login.label}...`);
    try {
      // First, ensure URL has proper format
      let testUrl = login.url;
      if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
        testUrl = 'https://' + testUrl;
      }
      if (testUrl.endsWith('/')) {
        testUrl = testUrl.slice(0, -1);
      }
      
      console.log('Testing WordPress connection to:', testUrl);
      
      const response = await fetch(`${testUrl}/wp-json/wp/v2/posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${login.username}:${login.appPassword}`)}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('WordPress test response status:', response.status);
      
             if (response.ok) {
         const successMessage = `✅ ${login.label}: Connected successfully`;
         console.log(successMessage);
         setSaveStatus(successMessage);
         // Also show an alert for immediate feedback
         alert(successMessage);
       } else {
         const errorText = await response.text();
         console.error('WordPress test error response:', errorText);
         const errorMessage = `❌ ${login.label}: Connection failed (${response.status}) - Check credentials`;
         setSaveStatus(errorMessage);
         alert(errorMessage);
       }
     } catch (error) {
       console.error('WordPress test error:', error);
       const errorMessage = `❌ ${login.label}: Connection failed - ${error.message}`;
       setSaveStatus(errorMessage);
       alert(errorMessage);
     }
     setTimeout(() => setSaveStatus(''), 5000);
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

  // Render tabs
  const renderTabs = () => (
    <div className="settings-tabs">
      <button 
        className={`tab ${activeTab === 'general' ? 'active' : ''}`}
        onClick={() => setActiveTab('general')}
      >
        General
      </button>
      <button 
        className={`tab ${activeTab === 'wordpress' ? 'active' : ''}`}
        onClick={() => setActiveTab('wordpress')}
      >
        WordPress Logins
      </button>
      <button 
        className={`tab ${activeTab === 'tts' ? 'active' : ''}`}
        onClick={() => setActiveTab('tts')}
      >
        Text to Speech API Keys
      </button>
    </div>
  );

  // Render General Settings
  const renderGeneralSettings = () => (
    <div className="settings-section">
      <h2>General Preferences</h2>
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
  );

  // Render WordPress Settings
  const renderWordPressSettings = () => (
    <div className="settings-section">
      <h2>WordPress Site Logins</h2>
      <p>Add your WordPress sites to enable direct posting from the Script Editor.</p>
      
      {/* Add new WordPress login form */}
      <div className="wordpress-add-form">
        <h3>Add New WordPress Site</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Label (Site Name):</label>
            <input
              type="text"
              value={newWordPressLogin.label}
              onChange={(e) => setNewWordPressLogin(prev => ({ ...prev, label: e.target.value }))}
              placeholder="e.g., My Blog"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>WordPress URL:</label>
            <input
              type="url"
              value={newWordPressLogin.url}
              onChange={(e) => setNewWordPressLogin(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://yoursite.com"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={newWordPressLogin.username}
              onChange={(e) => setNewWordPressLogin(prev => ({ ...prev, username: e.target.value }))}
              placeholder="your_username"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>App Password:</label>
            <input
              type="password"
              value={newWordPressLogin.appPassword}
              onChange={(e) => setNewWordPressLogin(prev => ({ ...prev, appPassword: e.target.value }))}
              placeholder="your_app_password"
              className="form-input"
            />
          </div>
        </div>
        <button 
          className="btn btn-primary"
          onClick={addWordPressLogin}
        >
          Add WordPress Site
        </button>
      </div>

      {/* WordPress logins list */}
      <div className="wordpress-logins-list">
        <h3>Saved WordPress Sites</h3>
        {wordPressLogins.length === 0 ? (
          <p className="no-logins">No WordPress sites added yet.</p>
        ) : (
          <div className="logins-table">
            <table>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>WordPress URL</th>
                  <th>Username</th>
                  <th>App Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {wordPressLogins.map((login) => (
                  <tr key={login.id}>
                    <td>{login.label}</td>
                    <td>{login.url}</td>
                    <td>{login.username}</td>
                    <td>{'*'.repeat(login.appPassword.length)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => testWordPressConnection(login)}
                      >
                        Test
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteWordPressLogin(login.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // Render TTS Settings
  const renderTTSSettings = () => (
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
          </div>
  );

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure your application settings and API keys</p>
          </div>
      
      {renderTabs()}
      
      <div className="settings-container">
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'wordpress' && renderWordPressSettings()}
        {activeTab === 'tts' && renderTTSSettings()}
        
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