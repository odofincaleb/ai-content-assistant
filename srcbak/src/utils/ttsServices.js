// TTS Services Utility
// Handles Google Cloud TTS, ElevenLabs, and Browser TTS

class TTSService {
  constructor() {
    this.settings = this.loadSettings();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('ttsSettings');
      return saved ? JSON.parse(saved) : {
        googleCloudApiKey: '',
        elevenLabsApiKey: '',
        defaultTtsService: 'browser'
      };
    } catch (error) {
      console.error('Error loading TTS settings:', error);
      return {
        googleCloudApiKey: '',
        elevenLabsApiKey: '',
        defaultTtsService: 'browser'
      };
    }
  }

  // Google Cloud TTS
  async generateGoogleCloudTTS(text, voice, options = {}) {
    if (!this.settings.googleCloudApiKey) {
      throw new Error('Google Cloud API key not configured');
    }

    const requestBody = {
      input: { text },
      voice: {
        languageCode: voice.languageCode || 'en-US',
        name: voice.name || 'en-US-Standard-A',
        ssmlGender: voice.ssmlGender || 'NEUTRAL'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: options.rate || 1.0,
        pitch: options.pitch || 0.0,
        volumeGainDb: options.volume ? Math.log10(options.volume) * 20 : 0.0
      }
    };

    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.settings.googleCloudApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Google Cloud TTS Error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return this.decodeGoogleAudio(data.audioContent);
    } catch (error) {
      console.error('Google Cloud TTS error:', error);
      throw error;
    }
  }

  // ElevenLabs TTS
  async generateElevenLabsTTS(text, voiceId, options = {}) {
    if (!this.settings.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    const requestBody = {
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: options.stability || 0.5,
        similarity_boost: options.similarityBoost || 0.5,
        style: options.style || 0.0,
        use_speaker_boost: options.useSpeakerBoost || true
      }
    };

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.settings.elevenLabsApiKey
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`ElevenLabs TTS Error: ${error.detail?.message || 'Unknown error'}`);
      }

      const audioBlob = await response.blob();
      return audioBlob;
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      throw error;
    }
  }

  // ElevenLabs Voice Cloning
  async cloneVoiceWithElevenLabs(audioFile, voiceName, description = '') {
    if (!this.settings.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      const formData = new FormData();
      formData.append('name', voiceName);
      formData.append('description', description);
      formData.append('files', audioFile);

      const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
        method: 'POST',
        headers: {
          'xi-api-key': this.settings.elevenLabsApiKey
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`ElevenLabs Voice Cloning Error: ${error.detail?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return {
        voice_id: data.voice_id,
        name: data.name,
        description: data.description,
        category: data.category,
        fine_tuning: data.fine_tuning,
        labels: data.labels,
        samples: data.samples,
        settings: data.settings,
        sharing: data.sharing,
        high_quality_base_model_ids: data.high_quality_base_model_ids,
        safety_control: data.safety_control,
        safety_label: data.safety_label,
        voice_verification: data.voice_verification
      };
    } catch (error) {
      console.error('ElevenLabs voice cloning error:', error);
      throw error;
    }
  }

  // Generate TTS with cloned voice using ElevenLabs
  async generateClonedVoiceTTS(text, clonedVoiceId, options = {}) {
    if (!this.settings.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    const requestBody = {
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: options.stability || 0.5,
        similarity_boost: options.similarityBoost || 0.75, // Higher similarity for cloned voices
        style: options.style || 0.0,
        use_speaker_boost: options.useSpeakerBoost || true
      }
    };

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${clonedVoiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.settings.elevenLabsApiKey
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`ElevenLabs Cloned Voice TTS Error: ${error.detail?.message || 'Unknown error'}`);
      }

      const audioBlob = await response.blob();
      return audioBlob;
    } catch (error) {
      console.error('ElevenLabs cloned voice TTS error:', error);
      throw error;
    }
  }

  // Update voice name on ElevenLabs
  async updateVoiceName(voiceId, newName) {
    if (!this.settings.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      // Simplified approach - just update the name directly
      // According to ElevenLabs API docs, this should work
      const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': this.settings.elevenLabsApiKey
        },
        body: JSON.stringify({
          name: newName
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('ElevenLabs API Error Response:', errorData);
        
        // Try alternative approach - use PATCH method
        if (response.status === 422) {
          console.log('Trying alternative PATCH method...');
          const patchResponse = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': this.settings.elevenLabsApiKey
            },
            body: JSON.stringify({
              name: newName
            })
          });
          
          if (!patchResponse.ok) {
            const patchError = await patchResponse.json();
            throw new Error(`ElevenLabs Update Voice Error: ${patchError.detail?.message || patchError.message || 'Unknown error'}`);
          }
          
          return true;
        }
        
        throw new Error(`ElevenLabs Update Voice Error: ${errorData.detail?.message || errorData.message || 'Unknown error'}`);
      }

      return true;
    } catch (error) {
      console.error('ElevenLabs update voice error:', error);
      throw error;
    }
  }

  // Delete cloned voice from ElevenLabs
  async deleteClonedVoice(voiceId) {
    if (!this.settings.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
        method: 'DELETE',
        headers: {
          'xi-api-key': this.settings.elevenLabsApiKey
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`ElevenLabs Delete Voice Error: ${error.detail?.message || 'Unknown error'}`);
      }

      return true;
    } catch (error) {
      console.error('ElevenLabs delete voice error:', error);
      throw error;
    }
  }

  // Get cloned voices from ElevenLabs
  async getClonedVoices() {
    if (!this.settings.elevenLabsApiKey) {
      return [];
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': this.settings.elevenLabsApiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cloned voices');
      }

      const data = await response.json();
      // Filter to only return cloned voices (voices with voice_id that are not default)
      return data.voices.filter(voice => voice.category === 'cloned' || voice.voice_id.length > 20);
    } catch (error) {
      console.error('Error fetching cloned voices:', error);
      return [];
    }
  }

  // Browser TTS (with recording capability)
  async generateBrowserTTS(text, voice, options = {}) {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      // Create audio context for recording
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const mediaStreamDestination = audioContext.createMediaStreamDestination();
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        resolve(audioBlob);
      };

      mediaRecorder.onerror = (error) => {
        reject(new Error(`Browser TTS recording error: ${error}`));
      };

      // Start recording and speaking
      mediaRecorder.start();
      utterance.onstart = () => {
        // Connect speech synthesis to audio context
        // Note: This is a simplified approach. Full implementation would require
        // more complex audio routing in the browser
      };

      utterance.onend = () => {
        mediaRecorder.stop();
      };

      utterance.onerror = (error) => {
        mediaRecorder.stop();
        reject(new Error(`Browser TTS error: ${error}`));
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  // Get available voices for each service
  async getGoogleCloudVoices() {
    if (!this.settings.googleCloudApiKey) {
      return [];
    }

    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/voices?key=${this.settings.googleCloudApiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Google Cloud voices');
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching Google Cloud voices:', error);
      return [];
    }
  }

  async getElevenLabsVoices() {
    if (!this.settings.elevenLabsApiKey) {
      return [];
    }

    try {
      // Get all voices including community voices
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': this.settings.elevenLabsApiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ElevenLabs voices');
      }

      const data = await response.json();
      const allVoices = data.voices || [];
      
      // Also try to get community voices if available
      try {
        const communityResponse = await fetch('https://api.elevenlabs.io/v1/voices/community', {
          headers: {
            'xi-api-key': this.settings.elevenLabsApiKey
          }
        });
        
        if (communityResponse.ok) {
          const communityData = await communityResponse.json();
          const communityVoices = communityData.voices || [];
          
          // Combine premium and community voices
          const combinedVoices = [...allVoices, ...communityVoices];
          console.log(`Loaded ${allVoices.length} premium voices + ${communityVoices.length} community voices = ${combinedVoices.length} total`);
          
          return combinedVoices;
        }
      } catch (communityError) {
        console.log('Community voices not available:', communityError.message);
      }
      
      console.log(`Loaded ${allVoices.length} ElevenLabs voices`);
      return allVoices;
    } catch (error) {
      console.error('Error fetching ElevenLabs voices:', error);
      return [];
    }
  }

  getBrowserVoices() {
    return window.speechSynthesis.getVoices();
  }

  // Decode Google Cloud audio content (base64 to blob)
  decodeGoogleAudio(audioContent) {
    const binaryString = atob(audioContent);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'audio/mp3' });
  }

  // Export audio to file
  async exportAudio(audioBlob, filename = 'tts-output') {
    try {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Error exporting audio:', error);
      throw error;
    }
  }

  // Generate TTS based on selected service
  async generateTTS(text, voice, options = {}) {
    const service = options.service || this.settings.defaultTtsService;

    switch (service) {
      case 'google':
        return await this.generateGoogleCloudTTS(text, voice, options);
      case 'elevenlabs':
        // ElevenLabs uses voice_id, not id
        const voiceId = voice.voice_id || voice.id || voice;
        return await this.generateElevenLabsTTS(text, voiceId, options);
      case 'browser':
      default:
        return await this.generateBrowserTTS(text, voice, options);
    }
  }

  // Test API keys
  async testGoogleCloudAPI() {
    if (!this.settings.googleCloudApiKey) {
      return { valid: false, error: 'No API key provided' };
    }

    try {
      const voices = await this.getGoogleCloudVoices();
      return { valid: true, voices: voices.length };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  async testElevenLabsAPI() {
    if (!this.settings.elevenLabsApiKey) {
      return { valid: false, error: 'No API key provided' };
    }

    try {
      const voices = await this.getElevenLabsVoices();
      return { valid: true, voices: voices.length };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

export default TTSService; 