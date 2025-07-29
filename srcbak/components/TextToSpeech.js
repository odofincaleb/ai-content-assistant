import React, { useState, useEffect } from 'react';
import TTSService from '../utils/ttsServices';
import './TextToSpeech.css';

const TextToSpeech = () => {
  // Basic state
  const [text, setText] = useState(() => {
    const savedText = localStorage.getItem('ttsText');
    return savedText || '';
  });
  
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedService, setSelectedService] = useState('elevenlabs');
  const [ttsService] = useState(new TTSService());
  const [serviceVoices, setServiceVoices] = useState({
    google: [],
    elevenlabs: []
  });
  
  // NEW: Advanced Features State
  const [useSSML, setUseSSML] = useState(false);
  const [ssmlText, setSSMLText] = useState('');
  const [batchFiles, setBatchFiles] = useState([]);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [qualityPreset, setQualityPreset] = useState('standard');
  const [audioCache, setAudioCache] = useState(new Map());
  const [selectedEmotion, setSelectedEmotion] = useState('neutral');
  const [emotionIntensity, setEmotionIntensity] = useState(0.5);
  const [ageFilter, setAgeFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [accentFilter, setAccentFilter] = useState('all');
  const [voiceSearch, setVoiceSearch] = useState('');
  const [clonedVoices, setClonedVoices] = useState([]);
  const [isCloningVoice, setIsCloningVoice] = useState(false);
  const [cloningProgress, setCloningProgress] = useState(0);
  const [showNameModal, setShowNameModal] = useState(false);
  const [newVoiceName, setNewVoiceName] = useState('');
  const [voiceToRename, setVoiceToRename] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);

  // Save text to localStorage
  useEffect(() => {
    if (text !== undefined && text !== null) {
      localStorage.setItem('ttsText', text);
    }
  }, [text]);

  // Load history and cloned voices
  useEffect(() => {
    const loadData = async () => {
      // Load history
      const savedHistory = localStorage.getItem('ttsHistory');
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          setHistory(parsedHistory.map(entry => ({
            ...entry,
            audioBlob: null
          })));
        } catch (error) {
          console.error('Error loading TTS history:', error);
        }
      }

      // Load local cloned voices
      const savedClonedVoices = localStorage.getItem('clonedVoices');
      if (savedClonedVoices) {
        try {
          setClonedVoices(JSON.parse(savedClonedVoices));
        } catch (error) {
          console.error('Error loading cloned voices:', error);
        }
      }

      // Load cloned voices from ElevenLabs API
      try {
        if (ttsService.settings.elevenLabsApiKey) {
          const elevenLabsClonedVoices = await ttsService.getClonedVoices();
          console.log('Loaded cloned voices from ElevenLabs:', elevenLabsClonedVoices);
          
          // Merge with local cloned voices, avoiding duplicates
          setClonedVoices(prev => {
            const existingIds = new Set(prev.map(v => v.voice_id));
            const newVoices = elevenLabsClonedVoices
              .filter(voice => !existingIds.has(voice.voice_id))
              .map(voice => ({
                id: `cloned_${voice.voice_id}`,
                name: voice.name,
                fileName: 'ElevenLabs Voice',
                date: new Date().toISOString(),
                audioSample: null, // No local audio sample for API voices
                voice_id: voice.voice_id,
                lang: 'en-US',
                languageCode: 'en-US',
                service: 'cloned',
                description: voice.description,
                category: voice.category,
                fine_tuning: voice.fine_tuning,
                labels: voice.labels,
                samples: voice.samples,
                settings: voice.settings,
                sharing: voice.sharing,
                safety_control: voice.safety_control,
                safety_label: voice.safety_label,
                voice_verification: voice.voice_verification
              }));
            
            return [...prev, ...newVoices];
          });
        }
      } catch (error) {
        console.error('Error loading cloned voices from ElevenLabs:', error);
      }
    };

    loadData();
  }, [ttsService]);

  // Save history and cloned voices
  useEffect(() => {
    if (history.length > 0) {
      const historyForStorage = history.map(entry => ({
        text: entry.text,
        voice: entry.voice,
        lang: entry.lang,
        service: entry.service,
        date: entry.date,
        emotion: entry.emotion
      }));
      localStorage.setItem('ttsHistory', JSON.stringify(historyForStorage));
    } else {
      localStorage.removeItem('ttsHistory');
    }
  }, [history]);

  useEffect(() => {
    if (clonedVoices.length > 0) {
      localStorage.setItem('clonedVoices', JSON.stringify(clonedVoices));
    } else {
      localStorage.removeItem('clonedVoices');
    }
  }, [clonedVoices]);

  // Load voices
  useEffect(() => {
    const loadAllVoices = async () => {
      try {
        const googleVoices = await ttsService.getGoogleCloudVoices();
        setServiceVoices(prev => ({ ...prev, google: googleVoices }));
      } catch (error) {
        console.log('Google Cloud voices not available:', error.message);
      }
      try {
        const elevenLabsVoices = await ttsService.getElevenLabsVoices();
        setServiceVoices(prev => ({ ...prev, elevenlabs: elevenLabsVoices }));
        if (!selectedVoice && elevenLabsVoices.length > 0) {
          setSelectedVoice(elevenLabsVoices[0]);
        }
      } catch (error) {
        console.log('ElevenLabs voices not available:', error.message);
      }
    };
    loadAllVoices();
  }, [ttsService, selectedVoice]);

  // Helper functions
  const groupVoices = (voices) => {
    const grouped = {};
    voices.forEach(voice => {
      const lang = voice.lang || voice.languageCode || 'Unknown';
      if (!grouped[lang]) {
        grouped[lang] = [];
      }
      grouped[lang].push(voice);
    });
    return grouped;
  };

  const getCurrentVoices = () => {
    if (selectedService === 'cloned') {
      return clonedVoices;
    }
    return serviceVoices[selectedService] || [];
  };

  const getFilteredVoices = () => {
    let voices = getCurrentVoices();
    
    // Don't apply filters to cloned voices
    if (selectedService === 'cloned') {
      return voices;
    }
    
    // Helper function to extract voice characteristics from name and properties
    const extractVoiceCharacteristics = (voice) => {
      const name = (voice.name || '').toLowerCase();
      const description = (voice.description || '').toLowerCase();
      const labels = voice.labels || {};
      
      // Extract gender from name, description, or labels
      let gender = 'neutral';
      if (name.includes('male') || name.includes('man') || name.includes('guy') || 
          description.includes('male') || description.includes('man') || 
          labels.gender === 'male' || voice.ssmlGender === 'MALE') {
        gender = 'male';
      } else if (name.includes('female') || name.includes('woman') || name.includes('girl') || 
                 description.includes('female') || description.includes('woman') || 
                 labels.gender === 'female' || voice.ssmlGender === 'FEMALE') {
        gender = 'female';
      } else if (name.includes('boy') || name.includes('child') || name.includes('kid') || 
                 description.includes('child') || description.includes('boy') || 
                 labels.age === 'child') {
        gender = 'child';
      }
      
      // Extract age from name, description, or labels
      let age = 'adult';
      if (name.includes('child') || name.includes('kid') || name.includes('young') || 
          name.includes('boy') || name.includes('girl') || 
          description.includes('child') || description.includes('young') || 
          labels.age === 'child') {
        age = 'child';
      } else if (name.includes('teen') || name.includes('adolescent') || name.includes('youth') || 
                 description.includes('teen') || description.includes('adolescent') || 
                 labels.age === 'teen') {
        age = 'teen';
      } else if (name.includes('elder') || name.includes('senior') || name.includes('old') || 
                 name.includes('grandpa') || name.includes('grandma') || 
                 description.includes('elder') || description.includes('senior') || 
                 labels.age === 'elder') {
        age = 'elder';
      }
      
      // Extract accent from name, description, or language
      let accent = 'unknown';
      const lang = voice.lang || voice.languageCode || '';
      if (name.includes('british') || name.includes('uk') || name.includes('england') || 
          description.includes('british') || description.includes('uk') || 
          lang.includes('en-GB')) {
        accent = 'british';
      } else if (name.includes('australian') || name.includes('aussie') || name.includes('australia') || 
                 description.includes('australian') || description.includes('aussie')) {
        accent = 'australian';
      } else if (name.includes('indian') || name.includes('india') || 
                 description.includes('indian') || lang.includes('en-IN')) {
        accent = 'indian';
      } else if (name.includes('irish') || name.includes('ireland') || 
                 description.includes('irish')) {
        accent = 'irish';
      } else if (name.includes('scottish') || name.includes('scotland') || 
                 description.includes('scottish')) {
        accent = 'scottish';
      } else if (name.includes('american') || name.includes('us') || name.includes('usa') || 
                 description.includes('american') || lang.includes('en-US')) {
        accent = 'american';
      }
      
      return { gender, age, accent };
    };
    
    if (ageFilter !== 'all') {
      console.log(`Filtering by age: ${ageFilter}`);
      voices = voices.filter(voice => {
        const { age } = extractVoiceCharacteristics(voice);
        const matches = age === ageFilter.toLowerCase();
        if (!matches) {
          console.log(`Voice "${voice.name}" age: ${age}, filter: ${ageFilter.toLowerCase()}`);
        }
        return matches;
      });
      console.log(`After age filter: ${voices.length} voices`);
    }
    
    if (genderFilter !== 'all') {
      console.log(`Filtering by gender: ${genderFilter}`);
      voices = voices.filter(voice => {
        const { gender } = extractVoiceCharacteristics(voice);
        const matches = gender === genderFilter.toLowerCase();
        if (!matches) {
          console.log(`Voice "${voice.name}" gender: ${gender}, filter: ${genderFilter.toLowerCase()}`);
        }
        return matches;
      });
      console.log(`After gender filter: ${voices.length} voices`);
    }
    
    if (accentFilter !== 'all') {
      console.log(`Filtering by accent: ${accentFilter}`);
      voices = voices.filter(voice => {
        const { accent } = extractVoiceCharacteristics(voice);
        const matches = accent === accentFilter.toLowerCase();
        if (!matches) {
          console.log(`Voice "${voice.name}" accent: ${accent}, filter: ${accentFilter.toLowerCase()}`);
        }
        return matches;
      });
      console.log(`After accent filter: ${voices.length} voices`);
    }
    
    // Apply voice search filter
    if (voiceSearch.trim()) {
      const searchTerm = voiceSearch.toLowerCase().trim();
      voices = voices.filter(voice => {
        const name = (voice.name || '').toLowerCase();
        const description = (voice.description || '').toLowerCase();
        const category = (voice.category || '').toLowerCase();
        
        return name.includes(searchTerm) || 
               description.includes(searchTerm) || 
               category.includes(searchTerm);
      });
      console.log(`After search filter: ${voices.length} voices`);
    }
    
    return voices;
  };

  const groupedVoices = groupVoices(getFilteredVoices());

  const serviceOptions = [
    { value: 'elevenlabs', label: 'ElevenLabs' },
    { value: 'google', label: 'Google Cloud TTS' },
    { value: 'cloned', label: 'Cloned Voices' }
  ];

  // Quality Presets
  const qualityPresets = {
    fast: { rate: 1.2, pitch: 1, volume: 0.9, description: 'Fast generation, lower quality' },
    standard: { rate: 1, pitch: 1, volume: 1, description: 'Balanced speed and quality' },
    high: { rate: 0.9, pitch: 1, volume: 1.1, description: 'Higher quality, slower generation' },
    premium: { rate: 0.8, pitch: 1.05, volume: 1.2, description: 'Premium quality, best results' }
  };

  // Emotion Settings
  const emotionSettings = {
    neutral: { rate: 1, pitch: 1, volume: 1, description: 'Normal, balanced speech' },
    happy: { rate: 1.1, pitch: 1.1, volume: 1.1, description: 'Cheerful, upbeat tone' },
    sad: { rate: 0.9, pitch: 0.9, volume: 0.9, description: 'Melancholic, slower tone' },
    angry: { rate: 1.2, pitch: 1.2, volume: 1.3, description: 'Intense, forceful tone' },
    excited: { rate: 1.3, pitch: 1.15, volume: 1.2, description: 'Energetic, enthusiastic tone' },
    calm: { rate: 0.85, pitch: 0.95, volume: 0.95, description: 'Peaceful, soothing tone' }
  };

  // SSML Helper Functions
  const ssmlHelpers = {
    pause: (duration = '1s') => `<break time="${duration}"/>`,
    emphasis: (text, level = 'moderate') => `<emphasis level="${level}">${text}</emphasis>`,
    prosody: (text, rate = 'medium', pitch = 'medium', volume = 'medium') => 
      `<prosody rate="${rate}" pitch="${pitch}" volume="${volume}">${text}</prosody>`,
    sayAs: (text, interpretAs = 'characters') => `<say-as interpret-as="${interpretAs}">${text}</say-as>`
  };

  // Apply Quality Preset
  const applyQualityPreset = (preset) => {
    const settings = qualityPresets[preset];
    if (settings) {
      setRate(settings.rate);
      setPitch(settings.pitch);
      setVolume(settings.volume);
      setQualityPreset(preset);
    }
  };

  // Apply Emotion Settings
  const applyEmotionSettings = (emotion) => {
    const settings = emotionSettings[emotion];
    if (settings) {
      setRate(settings.rate);
      setPitch(settings.pitch);
      setVolume(settings.volume);
      setSelectedEmotion(emotion);
    }
  };

  // Cache Management
  const getCacheKey = (text, voice, settings) => {
    return `${text}_${voice}_${JSON.stringify(settings)}`;
  };

  const getFromCache = (key) => {
    return audioCache.get(key);
  };

  const addToCache = (key, audioBlob) => {
    const newCache = new Map(audioCache);
    newCache.set(key, audioBlob);
    setAudioCache(newCache);
    
    if (newCache.size > 100) {
      const firstKey = newCache.keys().next().value;
      newCache.delete(firstKey);
      setAudioCache(newCache);
    }
  };

  // Voice Cloning Functions
  const handleVoiceCloneUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsCloningVoice(true);
    setCloningProgress(0);

    try {
      // Check if ElevenLabs API key is configured
      if (!ttsService.settings.elevenLabsApiKey) {
        throw new Error('ElevenLabs API key not configured. Please configure it in Settings.');
      }

      // Start cloning process
      setCloningProgress(10);
      
      // Use a simple default name for now, user can rename later
      const voiceName = `Voice ${clonedVoices.length + 1}`;
      const description = `Voice cloned from ${file.name}`;
      
      setCloningProgress(30);
      
      // Call ElevenLabs API to clone the voice
      const clonedVoiceData = await ttsService.cloneVoiceWithElevenLabs(file, voiceName, description);
      
      setCloningProgress(80);
      
      // Create our local cloned voice object
      const clonedVoice = {
        id: `cloned_${Date.now()}`,
        name: clonedVoiceData.name,
        fileName: file.name,
        date: new Date().toISOString(),
        audioSample: URL.createObjectURL(file),
        // ElevenLabs voice properties
        voice_id: clonedVoiceData.voice_id,
        lang: 'en-US',
        languageCode: 'en-US',
        service: 'cloned',
        // Additional ElevenLabs data
        description: clonedVoiceData.description,
        category: clonedVoiceData.category,
        fine_tuning: clonedVoiceData.fine_tuning,
        labels: clonedVoiceData.labels,
        samples: clonedVoiceData.samples,
        settings: clonedVoiceData.settings,
        sharing: clonedVoiceData.sharing,
        safety_control: clonedVoiceData.safety_control,
        safety_label: clonedVoiceData.safety_label,
        voice_verification: clonedVoiceData.voice_verification
      };

      setCloningProgress(100);
      
      setClonedVoices(prev => [...prev, clonedVoice]);
      
      // Show success message with option to rename
      const shouldRename = confirm(`Voice cloned successfully! Voice ID: ${clonedVoiceData.voice_id}\n\nWould you like to rename this voice?`);
      if (shouldRename) {
        setVoiceToRename(clonedVoice);
        setNewVoiceName(clonedVoice.name || '');
        setShowRenameModal(true);
      }
    } catch (error) {
      console.error('Error cloning voice:', error);
      alert('Error cloning voice: ' + error.message);
    } finally {
      setIsCloningVoice(false);
      setCloningProgress(0);
    }
  };

  const deleteClonedVoice = async (voiceId) => {
    try {
      const voiceToDelete = clonedVoices.find(voice => voice.id === voiceId);
      if (voiceToDelete && voiceToDelete.voice_id) {
        // Delete from ElevenLabs API
        await ttsService.deleteClonedVoice(voiceToDelete.voice_id);
        console.log(`Deleted voice ${voiceToDelete.name} from ElevenLabs`);
      }
      
      // Remove from local state
      setClonedVoices(prev => prev.filter(voice => voice.id !== voiceId));
      alert('Voice deleted successfully!');
    } catch (error) {
      console.error('Error deleting cloned voice:', error);
      alert('Error deleting voice: ' + error.message);
    }
  };

  const handleRenameVoice = async () => {
    if (!newVoiceName || !newVoiceName.trim() || !voiceToRename) return;
    
    // Validate name length and characters
    const trimmedName = newVoiceName.trim();
    if (trimmedName.length < 1 || trimmedName.length > 50) {
      alert('Voice name must be between 1 and 50 characters long.');
      return;
    }
    
    // Check for invalid characters
    if (!/^[a-zA-Z0-9\s\-_]+$/.test(trimmedName)) {
      alert('Voice name can only contain letters, numbers, spaces, hyphens, and underscores.');
      return;
    }
    
    try {
      // Update name on ElevenLabs API
      await ttsService.updateVoiceName(voiceToRename.voice_id, trimmedName);
      
      // Update the voice name locally
      setClonedVoices(prev => prev.map(v => 
        v.id === voiceToRename.id ? { ...v, name: trimmedName } : v
      ));
      
      alert(`Voice renamed to: ${trimmedName}`);
      
      // Close modal
      setShowRenameModal(false);
      setVoiceToRename(null);
      setNewVoiceName('');
    } catch (error) {
      console.error('Error updating voice name:', error);
      
      // Provide fallback option - update locally only
      const shouldUpdateLocally = confirm(
        `Failed to update voice name on ElevenLabs: ${error.message}\n\n` +
        `Would you like to update the name locally only? This will only change the name in this app.`
      );
      
      if (shouldUpdateLocally) {
        // Update the voice name locally only
        setClonedVoices(prev => prev.map(v => 
          v.id === voiceToRename.id ? { ...v, name: trimmedName } : v
        ));
        
        alert(`Voice renamed locally to: ${trimmedName}\n\nNote: The name was not updated on ElevenLabs due to an API error.`);
        
        // Close modal
        setShowRenameModal(false);
        setVoiceToRename(null);
        setNewVoiceName('');
      }
    }
  };

  // NEW: Use cloned voice function
  const useClonedVoice = (clonedVoice) => {
    // Set the cloned voice as the selected voice
    setSelectedVoice(clonedVoice);
    // Switch to a service that supports cloned voices (or create a custom service)
    setSelectedService('cloned');
    
    // Show confirmation
    alert(`Now using cloned voice: ${clonedVoice.name}`);
    
    // You can also add visual feedback by highlighting the voice selection
    console.log('Using cloned voice:', clonedVoice);
  };

  // Core TTS Functions
  const playPreview = async () => {
    const textToCheck = useSSML ? ssmlText : text;
    if (!textToCheck.trim() || !selectedVoice) return;
    
    try {
      setIsPlaying(true);
      const textToProcess = useSSML ? ssmlText : text;
      
      const finalSettings = {
        service: selectedService,
        rate: selectedEmotion !== 'neutral' ? rate * emotionSettings[selectedEmotion].rate : rate,
        pitch: selectedEmotion !== 'neutral' ? pitch * emotionSettings[selectedEmotion].pitch : pitch,
        volume: selectedEmotion !== 'neutral' ? volume * emotionSettings[selectedEmotion].volume : volume,
        useSSML: useSSML,
        emotion: selectedEmotion,
        emotionIntensity: emotionIntensity
      };

      let audioBlob;
      
      // Handle cloned voices differently
      if (selectedService === 'cloned' && selectedVoice.service === 'cloned') {
        // For cloned voices, we'll use a simulated TTS generation
        // In a real implementation, you would send the audio sample to a voice cloning API
        audioBlob = await generateClonedVoiceAudio(textToProcess, selectedVoice, finalSettings);
      } else {
        // Use regular TTS service
        audioBlob = await ttsService.generateTTS(textToProcess, selectedVoice, finalSettings);
      }
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onpause = () => setIsPaused(true);
      audio.onplay = () => setIsPaused(false);
      
      await audio.play();
    } catch (error) {
      console.error('Error playing preview:', error);
      alert(`Error playing preview: ${error.message}`);
      setIsPlaying(false);
    }
  };

  const generateSpeech = async () => {
    const textToCheck = useSSML ? ssmlText : text;
    if (!textToCheck.trim() || !selectedVoice) return;
    
    try {
      setIsGenerating(true);
      
      const settings = { 
        service: selectedService, 
        rate, 
        pitch, 
        volume,
        emotion: selectedEmotion,
        emotionIntensity: emotionIntensity
      };
      const cacheKey = getCacheKey(text, selectedVoice.voice_id || selectedVoice.id, settings);
      let audioBlob = getFromCache(cacheKey);
      
      if (!audioBlob) {
        const textToProcess = useSSML ? ssmlText : text;
        
        const finalSettings = {
          service: selectedService,
          rate: selectedEmotion !== 'neutral' ? rate * emotionSettings[selectedEmotion].rate : rate,
          pitch: selectedEmotion !== 'neutral' ? pitch * emotionSettings[selectedEmotion].pitch : pitch,
          volume: selectedEmotion !== 'neutral' ? volume * emotionSettings[selectedEmotion].volume : volume,
          useSSML: useSSML,
          emotion: selectedEmotion,
          emotionIntensity: emotionIntensity
        };
        
        // Handle cloned voices differently
        if (selectedService === 'cloned' && selectedVoice.service === 'cloned') {
          audioBlob = await generateClonedVoiceAudio(textToProcess, selectedVoice, finalSettings);
        } else {
          audioBlob = await ttsService.generateTTS(textToProcess, selectedVoice, finalSettings);
        }
        
        addToCache(cacheKey, audioBlob);
      }
      
      const newEntry = {
        text: text,
        voice: selectedVoice.voice_id || selectedVoice.id || selectedVoice.name,
        voiceName: selectedVoice.name || 'Unknown',
        lang: selectedVoice.lang || selectedVoice.languageCode || 'Unknown',
        service: selectedService,
        date: new Date().toISOString(),
        audioBlob: audioBlob,
        useSSML: useSSML,
        emotion: selectedEmotion
      };
      
      setHistory(prev => [newEntry, ...prev]);
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onpause = () => setIsPaused(true);
      audio.onplay = () => setIsPaused(false);
      
      setIsPlaying(true);
      await audio.play();
    } catch (error) {
      console.error('Error generating speech:', error);
      alert(`Error generating speech: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate audio for cloned voices using ElevenLabs API
  const generateClonedVoiceAudio = async (text, clonedVoice, settings) => {
    console.log('Generating audio with cloned voice:', clonedVoice.name);
    console.log('Text:', text);
    console.log('Settings:', settings);
    
    try {
      // Check if ElevenLabs API key is configured
      if (!ttsService.settings.elevenLabsApiKey) {
        throw new Error('ElevenLabs API key not configured. Please configure it in Settings.');
      }

      // Check if we have a valid voice_id
      if (!clonedVoice.voice_id) {
        throw new Error('Invalid cloned voice: missing voice_id');
      }

      // Convert our settings to ElevenLabs format
      const elevenLabsOptions = {
        stability: 0.5,
        similarityBoost: 0.75, // Higher similarity for cloned voices
        style: 0.0,
        useSpeakerBoost: true,
        // Apply our custom settings
        rate: settings.rate || 1,
        pitch: settings.pitch || 1,
        volume: settings.volume || 1,
        emotion: settings.emotion || 'neutral',
        emotionIntensity: settings.emotionIntensity || 0.5
      };

      // Generate TTS using ElevenLabs API
      const audioBlob = await ttsService.generateClonedVoiceTTS(text, clonedVoice.voice_id, elevenLabsOptions);
      
      console.log('Cloned voice audio generated successfully using ElevenLabs API');
      return audioBlob;
    } catch (error) {
      console.error('Error in generateClonedVoiceAudio:', error);
      throw new Error(`Failed to generate cloned voice audio: ${error.message}`);
    }
  };

  const pause = () => {
    // Implementation for pause functionality
  };

  const resume = () => {
    // Implementation for resume functionality
  };

  const stop = () => {
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleBatchFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const textFiles = files.filter(file => 
      file.type === 'text/plain' || 
      file.name.endsWith('.txt') ||
      file.name.endsWith('.doc') ||
      file.name.endsWith('.docx')
    );
    setBatchFiles(textFiles);
  };

  const processBatchFiles = async () => {
    if (batchFiles.length === 0 || !selectedVoice) return;
    
    setIsBatchProcessing(true);
    setBatchProgress(0);
    
    try {
      for (let i = 0; i < batchFiles.length; i++) {
        const file = batchFiles[i];
        const text = await readFileAsText(file);
        
        const settings = { 
          service: selectedService, 
          rate, 
          pitch, 
          volume,
          emotion: selectedEmotion,
          emotionIntensity: emotionIntensity
        };
        const cacheKey = getCacheKey(text, selectedVoice.voice_id || selectedVoice.id, settings);
        let audioBlob = getFromCache(cacheKey);
        
        if (!audioBlob) {
          const textToProcess = useSSML ? ssmlText : text;
          const finalSettings = {
            service: selectedService,
            rate: selectedEmotion !== 'neutral' ? rate * emotionSettings[selectedEmotion].rate : rate,
            pitch: selectedEmotion !== 'neutral' ? pitch * emotionSettings[selectedEmotion].pitch : pitch,
            volume: selectedEmotion !== 'neutral' ? volume * emotionSettings[selectedEmotion].volume : volume,
            useSSML: useSSML,
            emotion: selectedEmotion,
            emotionIntensity: emotionIntensity
          };
          audioBlob = await ttsService.generateTTS(textToProcess, { voice_id: selectedVoice.voice_id }, finalSettings);
          addToCache(cacheKey, audioBlob);
        }
        
        const newEntry = {
          text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
          voice: selectedVoice.name || selectedVoice.voice_id,
          lang: selectedVoice.lang || selectedVoice.languageCode || 'Unknown',
          service: selectedService,
          date: new Date().toISOString(),
          audioBlob: audioBlob,
          useSSML: useSSML,
          fileName: file.name,
          emotion: selectedEmotion
        };
        
        setHistory(prev => [newEntry, ...prev]);
        
        const filename = `tts-${file.name.replace(/\.[^/.]+$/, '')}-${Date.now()}`;
        await ttsService.exportAudio(audioBlob, filename);
        
        setBatchProgress(((i + 1) / batchFiles.length) * 100);
      }
      
      alert(`Batch processing complete! Processed ${batchFiles.length} files.`);
      setBatchFiles([]);
    } catch (error) {
      console.error('Error in batch processing:', error);
      alert(`Batch processing failed: ${error.message}`);
    } finally {
      setIsBatchProcessing(false);
      setBatchProgress(0);
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const clearBatchFiles = () => {
    setBatchFiles([]);
    setBatchProgress(0);
  };

  const exportAudio = async () => {
    const textToCheck = useSSML ? ssmlText : text;
    if (!textToCheck.trim()) return;
    
    try {
      const textToProcess = useSSML ? ssmlText : text;
      const finalSettings = {
        service: selectedService,
        rate: selectedEmotion !== 'neutral' ? rate * emotionSettings[selectedEmotion].rate : rate,
        pitch: selectedEmotion !== 'neutral' ? pitch * emotionSettings[selectedEmotion].pitch : pitch,
        volume: selectedEmotion !== 'neutral' ? volume * emotionSettings[selectedEmotion].volume : volume,
        useSSML: useSSML,
        emotion: selectedEmotion,
        emotionIntensity: emotionIntensity
      };
      
      let audioBlob;
      
      // Handle cloned voices differently
      if (selectedService === 'cloned' && selectedVoice.service === 'cloned') {
        audioBlob = await generateClonedVoiceAudio(textToProcess, selectedVoice, finalSettings);
      } else {
        audioBlob = await ttsService.generateTTS(textToProcess, selectedVoice, finalSettings);
      }
      
      const filename = `tts-${selectedService}-${Date.now()}`;
      await ttsService.exportAudio(audioBlob, filename);
    } catch (error) {
      alert(`Export failed: ${error.message}`);
    }
  };

  const playHistory = async (entry) => {
    try {
      if (entry.audioBlob) {
        // If we have the audio blob, play it directly
        const audioUrl = URL.createObjectURL(entry.audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        
        // Clean up the URL after playing
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      } else {
        // If no audio blob, regenerate the audio
        alert('Regenerating audio for playback...');
        
        // Create voice object with proper ID
        const voiceObj = { voice_id: entry.voice };
        
        const audioBlob = await ttsService.generateTTS(entry.text, voiceObj, {
          service: entry.service,
          rate: 1,
          pitch: 1,
          volume: 1,
          useSSML: entry.useSSML || false,
          emotion: entry.emotion || 'neutral',
          emotionIntensity: 1
        });
        
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        
        // Clean up the URL after playing
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (error) {
      console.error('Error playing history entry:', error);
      alert(`Playback failed: ${error.message}`);
    }
  };

  const deleteHistory = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index));
  };

  const deleteAllHistory = () => {
    setHistory([]);
  };

  const exportHistoryAudio = async (entry, index) => {
    try {
      if (entry.audioBlob) {
        const filename = `tts-${entry.service}-${index}-${Date.now()}`;
        await ttsService.exportAudio(entry.audioBlob, filename);
      } else {
        alert('Regenerating audio for export...');
        
        // Create voice object with proper ID
        const voiceObj = { voice_id: entry.voice };
        
        const audioBlob = await ttsService.generateTTS(entry.text, voiceObj, {
          service: entry.service,
          rate: 1,
          pitch: 1,
          volume: 1,
          useSSML: entry.useSSML || false,
          emotion: entry.emotion || 'neutral',
          emotionIntensity: 1
        });
        const filename = `tts-${entry.service}-${index}-${Date.now()}`;
        await ttsService.exportAudio(audioBlob, filename);
      }
    } catch (error) {
      alert(`Export failed: ${error.message}`);
    }
  };

  return (
    <div className="text-to-speech">
      <div className="tts-header">
        <h1>Text to Speech</h1>
        <p>Convert your text into natural-sounding speech with advanced controls</p>
        <div className="tts-note">Note: Configure your API keys in Settings to use Google Cloud TTS or ElevenLabs services.</div>
      </div>

      <div className="tts-container">
        <div className="tts-controls">
          <div className="control-group">
            <label>TTS Service:</label>
            <select
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
                setSelectedVoice(null);
              }}
              className="service-select"
            >
              {serviceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Voice Filtering */}
          <div className="control-group">
            <label>Age Filter:</label>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Ages</option>
              <option value="child">Child</option>
              <option value="teen">Teen</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className="control-group">
            <label>Gender Filter:</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <div className="control-group">
            <label>Accent Filter:</label>
            <select
              value={accentFilter}
              onChange={(e) => setAccentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Accents</option>
              <option value="american">American</option>
              <option value="british">British</option>
              <option value="australian">Australian</option>
              <option value="indian">Indian</option>
              <option value="irish">Irish</option>
              <option value="scottish">Scottish</option>
            </select>
          </div>

          {/* Voice Search */}
          <div className="control-group">
            <label>Search Voices:</label>
            <input
              type="text"
              value={voiceSearch}
              onChange={(e) => setVoiceSearch(e.target.value)}
              placeholder="Search by name, description, or category..."
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div className="control-group">
            <label>
              Voice Selection:
              {selectedVoice && selectedVoice.service === 'cloned' && (
                <span style={{ 
                  marginLeft: '8px', 
                  color: '#9C27B0', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  🎭 Cloned Voice
                </span>
              )}
            </label>
            <select 
              value={selectedVoice ? (selectedVoice.name || selectedVoice.voice_id) : ''} 
              onChange={(e) => {
                const voice = getFilteredVoices().find(v => (v.name || v.voice_id) === e.target.value);
                setSelectedVoice(voice);
              }}
              className="voice-select"
            >
              {Object.entries(groupedVoices).map(([region, regionVoices]) => (
                <optgroup key={region} label={region}>
                  {regionVoices.map((voice, index) => (
                    <option key={index} value={voice.name || voice.voice_id}>
                      {voice.name || voice.voice_id} ({voice.lang || voice.languageCode})
                      {voice.service === 'cloned' ? ' 🎭' : ''}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Quality Preset Selection */}
          <div className="control-group">
            <label>Quality Preset:</label>
            <select
              value={qualityPreset}
              onChange={(e) => applyQualityPreset(e.target.value)}
              className="quality-select"
            >
              {Object.entries(qualityPresets).map(([key, preset]) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} - {preset.description}
                </option>
              ))}
            </select>
          </div>

          {/* Emotion Control */}
          <div className="control-group">
            <label>Emotion:</label>
            <select
              value={selectedEmotion}
              onChange={(e) => applyEmotionSettings(e.target.value)}
              className="emotion-select"
            >
              {Object.entries(emotionSettings).map(([key, emotion]) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} - {emotion.description}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Speed: {rate}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Pitch: {pitch}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Volume: {Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
        </div>

                {/* Voice Cloning Controls */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '15px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <span style={{ color: '#FFD700', fontWeight: 'bold' }}>🎭 Voice Cloning:</span>
          <input
            type="file"
            accept="audio/*"
            onChange={handleVoiceCloneUpload}
            id="voice-clone-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="voice-clone-upload" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
            🎤 Upload Voice Sample
          </label>
          
          <button 
            className="btn btn-outline" 
            style={{ fontSize: '0.85rem' }}
            onClick={async () => {
              try {
                if (!ttsService.settings.elevenLabsApiKey) {
                  alert('Please configure your ElevenLabs API key in Settings first.');
                  return;
                }
                
                const elevenLabsClonedVoices = await ttsService.getClonedVoices();
                console.log('Refreshed cloned voices from ElevenLabs:', elevenLabsClonedVoices);
                
                // Replace all cloned voices with the ones from ElevenLabs
                const newVoices = elevenLabsClonedVoices.map(voice => ({
                  id: `cloned_${voice.voice_id}`,
                  name: voice.name,
                  fileName: 'ElevenLabs Voice',
                  date: new Date().toISOString(),
                  audioSample: null,
                  voice_id: voice.voice_id,
                  lang: 'en-US',
                  languageCode: 'en-US',
                  service: 'cloned',
                  description: voice.description,
                  category: voice.category,
                  fine_tuning: voice.fine_tuning,
                  labels: voice.labels,
                  samples: voice.samples,
                  settings: voice.settings,
                  sharing: voice.sharing,
                  safety_control: voice.safety_control,
                  safety_label: voice.safety_label,
                  voice_verification: voice.voice_verification
                }));
                
                setClonedVoices(newVoices);
                alert(`Refreshed ${newVoices.length} cloned voices from ElevenLabs!`);
              } catch (error) {
                console.error('Error refreshing cloned voices:', error);
                alert('Error refreshing cloned voices: ' + error.message);
              }
            }}
          >
            🔄 Refresh
          </button>
          
          {isCloningVoice && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '100px', 
                height: '6px', 
                background: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div 
                  style={{ 
                    width: `${cloningProgress}%`, 
                    height: '100%', 
                    background: '#FFD700',
                    transition: 'width 0.3s ease'
                  }}
                ></div>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#FFD700' }}>{cloningProgress}%</span>
            </div>
          )}
        </div>

        {/* SSML Controls */}
        <div className="ssml-controls">
          <div className="ssml-toggle">
            <label>
              <input
                type="checkbox"
                checked={useSSML}
                onChange={(e) => setUseSSML(e.target.checked)}
              />
              Enable SSML (Speech Synthesis Markup Language)
            </label>
          </div>
          
          {useSSML && (
            <div className="ssml-editor">
              <label>SSML Text:</label>
              <div className="ssml-note">
                💡 When SSML is enabled, use the SSML text area below instead of the main text area.
              </div>
              <textarea
                value={ssmlText}
                onChange={(e) => setSSMLText(e.target.value)}
                placeholder="Enter SSML markup here... Example: &lt;speak&gt;Hello &lt;break time='1s'/&gt; world!&lt;/speak&gt;"
                rows={4}
                className="ssml-textarea"
              />
              <div className="ssml-helpers">
                <button onClick={() => setSSMLText(ssmlHelpers.pause())}>Add Pause</button>
                <button onClick={() => setSSMLText(ssmlHelpers.emphasis('text'))}>Add Emphasis</button>
                <button onClick={() => setSSMLText(ssmlHelpers.prosody('text'))}>Add Prosody</button>
                <button onClick={() => setSSMLText(ssmlHelpers.sayAs('123', 'cardinal'))}>Add Say-As</button>
              </div>
            </div>
          )}
        </div>

        {/* Batch Processing Controls */}
        {batchFiles.length > 0 && (
          <div className="batch-controls">
            <div className="batch-info">
              <h4>Batch Processing ({batchFiles.length} files)</h4>
              <div className="batch-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${batchProgress}%` }}
                  ></div>
                </div>
                <span>{Math.round(batchProgress)}%</span>
              </div>
              <div className="batch-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={processBatchFiles}
                  disabled={isBatchProcessing || !selectedVoice}
                >
                  {isBatchProcessing ? '🔄 Processing...' : '🚀 Process All Files'}
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={clearBatchFiles}
                  disabled={isBatchProcessing}
                >
                  🗑️ Clear Files
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="tts-text-area">
          <div className="text-input-container">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert to speech..."
              rows={20}
              style={{ color: '#333', backgroundColor: 'white' }}
            />
            <div className="text-stats">
              <span>Characters: {text.length}</span>
              <span>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
            </div>
          </div>
        </div>

        <div className="tts-actions">
          <div className="action-buttons-row">
            <button 
              className="btn btn-primary generate-btn" 
              onClick={generateSpeech} 
              disabled={!(useSSML ? ssmlText.trim() : text.trim()) || isGenerating}
            >
              {isGenerating ? '🔄 Generating...' : '🎵 Generate Speech'}
            </button>
            <button 
              className="btn btn-secondary play-btn" 
              onClick={playPreview} 
              disabled={!(useSSML ? ssmlText.trim() : text.trim()) || isPlaying}
            >
              ▶️ Play
            </button>
            <input
              type="file"
              accept=".txt,.doc,.docx"
              onChange={handleFileUpload}
              id="file-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="btn btn-outline">
              📁 Upload File
            </label>
            
            {/* Batch Upload */}
            <input
              type="file"
              accept=".txt,.doc,.docx"
              onChange={handleBatchFileUpload}
              id="batch-upload"
              multiple
              style={{ display: 'none' }}
            />
            <label htmlFor="batch-upload" className="btn btn-outline">
              📚 Batch Upload
            </label>
            <button className="btn btn-outline" onClick={() => setText('')}>
              🗑️ Clear
            </button>
            <button className="btn btn-success" onClick={exportAudio} disabled={!(useSSML ? ssmlText.trim() : text.trim())}>
              💾 Export Audio
            </button>
          </div>

          <div className="playback-controls">
            {isPlaying && (
              <>
                {isPaused ? (
                  <button className="btn btn-secondary" onClick={resume}>
                    ▶️ Resume
                  </button>
                ) : (
                  <button className="btn btn-secondary" onClick={pause}>
                    ⏸️ Pause
                  </button>
                )}
                <button className="btn btn-danger" onClick={stop}>
                  ⏹️ Stop
                </button>
              </>
            )}
          </div>
        </div>

        {history.length > 0 && (
          <div className="tts-history">
            <div className="history-header">
              <h3>History</h3>
              <button className="btn btn-danger delete-all-btn" onClick={deleteAllHistory}>Delete All</button>
            </div>
            <ul>
              {history.map((entry, idx) => (
                <li key={idx} className="history-entry">
                  <div className="history-content">
                    <div className="history-meta">
                      <span className="history-voice">{entry.voiceName || entry.voice} ({entry.lang})</span>
                      <span className="history-date">{new Date(entry.date).toLocaleString()}</span>
                    </div>
                    <div className="history-text">{entry.text}</div>
                    {entry.emotion && entry.emotion !== 'neutral' && (
                      <div className="history-emotion">
                        Emotion: {entry.emotion.charAt(0).toUpperCase() + entry.emotion.slice(1)}
                      </div>
                    )}
                  </div>
                  <div className="history-actions">
                    <button className="btn btn-secondary" onClick={() => playHistory(entry)}>▶️ Play</button>
                    <button className="btn btn-success" onClick={() => exportHistoryAudio(entry, idx)}>💾 Export</button>
                    <button className="btn btn-outline" onClick={() => deleteHistory(idx)}>🗑️ Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="tts-features">
          <h3>Features</h3>
          <ul>
            <li>🎵 Generate speech from any text</li>
            <li>🌍 Multiple voice options with different languages</li>
            <li>⚙️ Adjustable speed, pitch, and volume</li>
            <li>😊 Emotion control (Happy, Sad, Angry, Excited, etc.)</li>
            <li>🎭 Voice cloning from audio samples</li>
            <li>🔍 Advanced voice filtering (Age, Gender, Accent)</li>
            <li>📁 File upload support (.txt, .doc, .docx)</li>
            <li>📊 Real-time text statistics</li>
            <li>🎮 Playback controls (play, pause, stop)</li>
            <li>💾 Audio export capability</li>
            <li>🔊 High-quality speech synthesis</li>
          </ul>
        </div>
      </div>

      {/* Rename Voice Modal */}
      {showRenameModal && voiceToRename && (
        <div 
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRenameModal(false);
              setVoiceToRename(null);
              setNewVoiceName('');
            }
          }}
        >
          <div className="modal-content">
            <h3>
              ✏️ {voiceToRename.name ? 'Rename Voice' : 'Name Voice'}
            </h3>
            <input
              ref={(input) => {
                if (input) {
                  input.focus();
                  input.select();
                }
              }}
              type="text"
              value={newVoiceName || ''}
              onChange={(e) => setNewVoiceName(e.target.value)}
              placeholder="Enter voice name..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#333',
                fontSize: '1rem',
                marginBottom: '15px'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleRenameVoice();
                }
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowRenameModal(false);
                  setVoiceToRename(null);
                  setNewVoiceName('');
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleRenameVoice}
                disabled={!newVoiceName || !newVoiceName.trim()}
              >
                {voiceToRename.name ? 'Rename' : 'Name'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech; 