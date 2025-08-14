import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';

interface TTSSettings {
  elevenLabsApiKey: string;
  defaultTtsService: string;
}

interface Voice {
  voice_id: string;
  name: string;
  description?: string;
  category?: string;
  fine_tuning?: any;
  labels?: any;
  samples?: any;
  settings?: any;
  sharing?: any;
  safety_control?: any;
  safety_label?: string;
  voice_verification?: any;
}

class TTSService {
  private settings: TTSSettings;

  constructor() {
    this.settings = {
      elevenLabsApiKey: '',
      defaultTtsService: 'elevenlabs'
    };
    // Load settings asynchronously
    this.loadSettings();
  }

  // Initialize settings - call this after constructor
  async initialize() {
    await this.loadSettings();
  }

  private async loadSettings() {
    try {
      const saved = await AsyncStorage.getItem('ttsSettings');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading TTS settings:', error);
    }
  }

  private async saveSettings() {
    try {
      await AsyncStorage.setItem('ttsSettings', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving TTS settings:', error);
    }
  }

  // Update settings
  async updateSettings(newSettings: Partial<TTSSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    await this.saveSettings();
  }

  // Get current settings
  getSettings(): TTSSettings {
    return { ...this.settings };
  }

  // ElevenLabs TTS
  async generateElevenLabsTTS(text: string, voiceId: string, options: any = {}): Promise<string> {
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
        throw new Error(`ElevenLabs TTS Error: ${error.detail?.message || error.message || 'Unknown error'}`);
      }

      // Get the response as an array buffer instead of blob
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Save to mobile file system
      const fileName = `tts-${Date.now()}.mp3`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      
      // Convert to base64 and save
      const base64String = btoa(String.fromCharCode(...uint8Array));
      await FileSystem.writeAsStringAsync(fileUri, base64String, { encoding: FileSystem.EncodingType.Base64 });
      
      return fileUri;
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      throw error;
    }
  }

  // ElevenLabs Voice Cloning
  async cloneVoiceWithElevenLabs(audioFileUri: string, voiceName: string, description: string = ''): Promise<Voice> {
    if (!this.settings.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      const formData = new FormData();
      formData.append('name', voiceName);
      formData.append('description', description);
      
      // Read file and append to form data
      const fileInfo = await FileSystem.getInfoAsync(audioFileUri);
      if (!fileInfo.exists) {
        throw new Error('Audio file not found');
      }
      
      const fileBlob = await this.uriToBlob(audioFileUri);
      formData.append('files', fileBlob, 'voice_sample.mp3');

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
  async generateClonedVoiceTTS(text: string, clonedVoiceId: string, options: any = {}): Promise<string> {
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

      // Get the response as an array buffer instead of blob
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const fileName = `tts-cloned-${Date.now()}.mp3`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      
      // Convert to base64 and save
      const base64String = btoa(String.fromCharCode(...uint8Array));
      await FileSystem.writeAsStringAsync(fileUri, base64String, { encoding: FileSystem.EncodingType.Base64 });
      
      return fileUri;
    } catch (error) {
      console.error('ElevenLabs cloned voice TTS error:', error);
      throw error;
    }
  }

  // Update voice name on ElevenLabs
  async updateVoiceName(voiceId: string, newName: string): Promise<boolean> {
    if (!this.settings.elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
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
        throw new Error(`ElevenLabs Update Voice Error: ${errorData.detail?.message || errorData.message || 'Unknown error'}`);
      }

      return true;
    } catch (error) {
      console.error('ElevenLabs update voice error:', error);
      throw error;
    }
  }

  // Delete cloned voice from ElevenLabs
  async deleteClonedVoice(voiceId: string): Promise<boolean> {
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
  async getClonedVoices(): Promise<Voice[]> {
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
      // Filter to only return cloned voices
      return data.voices.filter((voice: Voice) => voice.category === 'cloned' || voice.voice_id.length > 20);
    } catch (error) {
      console.error('Error fetching cloned voices:', error);
      return [];
    }
  }

  // Get available voices for ElevenLabs
  async getElevenLabsVoices(): Promise<Voice[]> {
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
        console.log('Community voices not available:', communityError);
      }
      
      console.log(`Loaded ${allVoices.length} ElevenLabs voices`);
      return allVoices;
    } catch (error) {
      console.error('Error fetching ElevenLabs voices:', error);
      return [];
    }
  }

  // Export audio to device
  async exportAudio(audioFileUri: string, filename: string = 'tts-output'): Promise<boolean> {
    try {
      // Request permissions with more specific permissions for Android
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Media library permission not granted. Please grant storage permissions in your device settings.');
      }

      // Check if file exists
      const fileInfo = await FileSystem.getInfoAsync(audioFileUri);
      if (!fileInfo.exists) {
        throw new Error('Audio file not found');
      }

      // Create asset
      const asset = await MediaLibrary.createAssetAsync(audioFileUri);
      
      // Create album if it doesn't exist
      const albums = await MediaLibrary.getAlbumsAsync();
      const ttsAlbum = albums.find(album => album.title === 'Fiddyscript TTS');
      
      if (ttsAlbum) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], ttsAlbum.id, false);
      } else {
        await MediaLibrary.createAlbumAsync('Fiddyscript TTS', asset, false);
      }

      return true;
    } catch (error) {
      console.error('Error exporting audio:', error);
      throw error;
    }
  }

  // Share audio file
  async shareAudio(audioFileUri: string): Promise<boolean> {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('Sharing not available on this device');
      }

      await Sharing.shareAsync(audioFileUri, {
        mimeType: 'audio/mpeg',
        dialogTitle: 'Share TTS Audio'
      });

      return true;
    } catch (error) {
      console.error('Error sharing audio:', error);
      throw error;
    }
  }

  // Pick audio file for voice cloning
  async pickAudioFile(): Promise<string | null> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Error picking audio file:', error);
      throw error;
    }
  }

  // Test API keys
  async testElevenLabsAPI(): Promise<{ valid: boolean; error?: string; voices?: number }> {
    if (!this.settings.elevenLabsApiKey) {
      return { valid: false, error: 'No API key provided' };
    }

    try {
      const voices = await this.getElevenLabsVoices();
      return { valid: true, voices: voices.length };
    } catch (error) {
      return { valid: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Helper: Convert URI to Blob (React Native compatible)
  private async uriToBlob(uri: string): Promise<Blob> {
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    return new Blob([arrayBuffer], { type: 'audio/mpeg' });
  }

  private currentSound: Audio.Sound | null = null;

  // Play audio file
  async playAudio(audioFileUri: string): Promise<void> {
    try {
      // Check if file exists
      const fileInfo = await FileSystem.getInfoAsync(audioFileUri);
      if (!fileInfo.exists) {
        throw new Error('Audio file not found');
      }

      // Stop any currently playing audio
      if (this.currentSound) {
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      }

      // Create and play sound
      const { sound } = await Audio.Sound.createAsync({ uri: audioFileUri });
      this.currentSound = sound;
      
      // Set up playback status monitoring
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          this.currentSound = null;
        }
      });
      
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
      throw error;
    }
  }

  // Preview voice with sample text
  async previewVoice(voiceId: string, sampleText: string = "Hello, this is a voice preview."): Promise<void> {
    try {
      // Stop any currently playing audio
      if (this.currentSound) {
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      }

      // Generate a short preview audio
      const previewUri = await this.generateElevenLabsTTS(sampleText, voiceId, {
        stability: 0.5,
        similarityBoost: 0.5,
        style: 0.0,
        useSpeakerBoost: true
      });

      // Play the preview
      const { sound } = await Audio.Sound.createAsync({ uri: previewUri });
      this.currentSound = sound;
      
      // Set up playback status monitoring
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          this.currentSound = null;
        }
      });
      
      await sound.playAsync();
    } catch (error) {
      console.error('Error previewing voice:', error);
      throw error;
    }
  }

  // Stop audio playback
  async stopAudio(): Promise<void> {
    try {
      if (this.currentSound) {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }

  // Generate TTS based on selected service
  async generateTTS(text: string, voice: Voice, options: any = {}): Promise<string> {
    const service = options.service || this.settings.defaultTtsService;

    switch (service) {
      case 'elevenlabs':
        const voiceId = voice.voice_id || voice.id || voice;
        return await this.generateElevenLabsTTS(text, voiceId, options);
      default:
        throw new Error('Service not supported on mobile');
    }
  }
}

export default TTSService;

