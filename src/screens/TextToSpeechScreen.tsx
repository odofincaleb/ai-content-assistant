import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLicense } from '../contexts/LicenseContext';
import TTSService from '../services/ttsService';
import { Audio } from 'expo-av';

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

const TextToSpeechScreen: React.FC = () => {
  const navigation = useNavigation();
  const { isLicenseValid } = useLicense();
  const [ttsService] = useState(new TTSService());
  
  // Basic state
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState('elevenlabs');
  
  // Advanced Features State
  const [stability, setStability] = useState(0.5);
  const [similarityBoost, setSimilarityBoost] = useState(0.5);
  const [style, setStyle] = useState(0.0);
  const [useSpeakerBoost, setUseSpeakerBoost] = useState(true);
  
  // Voice Cloning State
  const [clonedVoices, setClonedVoices] = useState<Voice[]>([]);
  const [isCloningVoice, setIsCloningVoice] = useState(false);
  const [cloningProgress, setCloningProgress] = useState(0);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [cloneVoiceName, setCloneVoiceName] = useState('');
  const [cloneVoiceDescription, setCloneVoiceDescription] = useState('');
  
  // Audio State
  const [currentAudioUri, setCurrentAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    const initializeTTS = async () => {
      await ttsService.initialize();
      await loadData();
    };
    initializeTTS();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load ElevenLabs voices
      const elevenLabsVoices = await ttsService.getElevenLabsVoices();
      setVoices(elevenLabsVoices);
      
      if (elevenLabsVoices.length > 0) {
        setSelectedVoice(elevenLabsVoices[0]);
      }

      // Load cloned voices from ElevenLabs API
      try {
        const elevenLabsClonedVoices = await ttsService.getClonedVoices();
        console.log('Loaded cloned voices from ElevenLabs:', elevenLabsClonedVoices);
        
        // Merge with local cloned voices, avoiding duplicates
        setClonedVoices(prev => {
          const existingIds = new Set(prev.map(v => v.voice_id));
          const newVoices = elevenLabsClonedVoices
            .filter(voice => !existingIds.has(voice.voice_id))
            .map(voice => ({
              ...voice,
              id: `cloned_${voice.voice_id}`,
              fileName: 'ElevenLabs Voice',
              date: new Date().toISOString(),
              audioSample: null,
              lang: 'en-US',
              languageCode: 'en-US',
              service: 'cloned'
            }));
          
          return [...prev, ...newVoices];
        });
      } catch (error) {
        console.error('Error loading cloned voices from ElevenLabs:', error);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load voices');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTTS = async () => {
    if (!isLicenseValid) {
      Alert.alert(
        'License Required',
        'Please validate your license to access this feature.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    if (!text.trim()) {
      Alert.alert('No Text', 'Please enter some text to convert to speech');
      return;
    }

    if (!selectedVoice) {
      Alert.alert('No Voice Selected', 'Please select a voice');
      return;
    }

    try {
      setIsGenerating(true);
      
      const settings = {
        service: selectedService,
        stability,
        similarityBoost,
        style,
        useSpeakerBoost
      };

      let audioUri: string;
      
      // Handle cloned voices differently
      if (selectedService === 'cloned' && selectedVoice.service === 'cloned') {
        audioUri = await ttsService.generateClonedVoiceTTS(text, selectedVoice.voice_id, settings);
      } else {
        audioUri = await ttsService.generateTTS(text, selectedVoice, settings);
      }
      
      setCurrentAudioUri(audioUri);
      
      // Load and play the audio
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(newSound);
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
        }
      });
      
      await newSound.playAsync();
      
      Alert.alert('Success', 'Audio generated successfully!');
    } catch (error) {
      console.error('TTS generation error:', error);
      Alert.alert('Error', `Failed to generate audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVoiceClone = async () => {
    if (!isLicenseValid) {
      Alert.alert(
        'License Required',
        'Please validate your license to access this feature.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    try {
      const audioFileUri = await ttsService.pickAudioFile();
      if (!audioFileUri) {
        return;
      }

      setShowCloneModal(true);
      setCloneVoiceName(`Voice ${clonedVoices.length + 1}`);
      setCloneVoiceDescription(`Voice cloned from audio file`);
    } catch (error) {
      console.error('Error picking audio file:', error);
      Alert.alert('Error', 'Failed to pick audio file');
    }
  };

  const handleCloneVoice = async () => {
    if (!cloneVoiceName.trim()) {
      Alert.alert('Error', 'Please enter a voice name');
      return;
    }

    setIsCloningVoice(true);
    setCloningProgress(0);

    try {
      setCloningProgress(10);
      
      // Get the audio file URI (you'll need to store this from the picker)
      const audioFileUri = await ttsService.pickAudioFile();
      if (!audioFileUri) {
        throw new Error('No audio file selected');
      }
      
      setCloningProgress(30);
      
      // Call ElevenLabs API to clone the voice
      const clonedVoiceData = await ttsService.cloneVoiceWithElevenLabs(
        audioFileUri,
        cloneVoiceName,
        cloneVoiceDescription
      );
      
      setCloningProgress(80);
      
      // Create our local cloned voice object
      const clonedVoice = {
        ...clonedVoiceData,
        id: `cloned_${Date.now()}`,
        fileName: 'Audio File',
        date: new Date().toISOString(),
        audioSample: audioFileUri,
        lang: 'en-US',
        languageCode: 'en-US',
        service: 'cloned'
      };

      setCloningProgress(100);
      
      setClonedVoices(prev => [...prev, clonedVoice]);
      setShowCloneModal(false);
      setCloneVoiceName('');
      setCloneVoiceDescription('');
      
      Alert.alert('Success', 'Voice cloned successfully!');
    } catch (error) {
      console.error('Voice cloning error:', error);
      Alert.alert('Error', `Failed to clone voice: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsCloningVoice(false);
      setCloningProgress(0);
    }
  };

  const handleExportAudio = async () => {
    if (!currentAudioUri) {
      Alert.alert('No Audio', 'No audio to export');
      return;
    }

    try {
      await ttsService.exportAudio(currentAudioUri, `tts-${Date.now()}`);
      Alert.alert('Success', 'Audio exported to device');
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', `Failed to export audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleShareAudio = async () => {
    if (!currentAudioUri) {
      Alert.alert('No Audio', 'No audio to share');
      return;
    }

    try {
      await ttsService.shareAudio(currentAudioUri);
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', `Failed to share audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handlePlayPause = async () => {
    if (!currentAudioUri) {
      Alert.alert('No Audio', 'Please generate audio first');
      return;
    }

    try {
      if (isPlaying) {
        await ttsService.stopAudio();
        setIsPlaying(false);
      } else {
        await ttsService.playAudio(currentAudioUri);
        setIsPlaying(true);
        
        // Auto-reset playing state after a delay (audio will finish)
        setTimeout(() => {
          setIsPlaying(false);
        }, 5000); // Adjust based on expected audio length
      }
    } catch (error) {
      Alert.alert('Play Error', error instanceof Error ? error.message : 'Failed to play audio');
      setIsPlaying(false);
    }
  };

  const handlePreviewVoice = async (voice: Voice) => {
    if (!isLicenseValid) {
      Alert.alert(
        'License Required',
        'Please validate your license to access this feature.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    try {
      setIsPreviewing(true);
      await ttsService.previewVoice(voice.voice_id, "Hello, this is a voice preview. How does this voice sound to you?");
      Alert.alert('Preview', 'Playing voice preview...');
    } catch (error) {
      Alert.alert('Preview Error', error instanceof Error ? error.message : 'Failed to preview voice');
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleStop = async () => {
    try {
      await ttsService.stopAudio();
      setIsPlaying(false);
      setIsPreviewing(false);
    } catch (error) {
      Alert.alert('Stop Error', error instanceof Error ? error.message : 'Failed to stop audio');
    }
  };

  const getSelectedVoiceName = () => {
    if (!selectedVoice) return 'No voice selected';
    return selectedVoice.name;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Text to Speech</Text>
            <Text style={styles.headerSubtitle}>ElevenLabs AI Voice Generation</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.settingsButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Text Input */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Enter Text</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter the text you want to convert to speech..."
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <View style={styles.textStats}>
            <Text style={styles.statText}>
              Characters: {text.length} | Words: {text.split(/\s+/).filter(word => word.length > 0).length}
            </Text>
          </View>
        </View>

        {/* Voice Selection */}
        <View style={styles.voiceSection}>
          <Text style={styles.sectionTitle}>Voice Settings</Text>
          
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading voices...</Text>
            </View>
          ) : (
            <View style={styles.voiceContainer}>
              <Text style={styles.voiceLabel}>Selected Voice:</Text>
              <Text style={styles.voiceName}>{getSelectedVoiceName()}</Text>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.voiceScroll}
              >
                {voices.map((voice, index) => (
                  <View key={voice.voice_id} style={styles.voiceOptionContainer}>
                    <TouchableOpacity
                      style={[
                        styles.voiceOption,
                        selectedVoice?.voice_id === voice.voice_id && styles.selectedVoice
                      ]}
                      onPress={() => setSelectedVoice(voice)}
                    >
                      <Text style={[
                        styles.voiceOptionText,
                        selectedVoice?.voice_id === voice.voice_id && styles.selectedVoiceText
                      ]}>
                        {voice.name}
                      </Text>
                      <Text style={[
                        styles.voiceOptionCategory,
                        selectedVoice?.voice_id === voice.voice_id && styles.selectedVoiceText
                      ]}>
                        {voice.category || 'Premium'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.previewButton}
                      onPress={() => handlePreviewVoice(voice)}
                      disabled={isPreviewing}
                    >
                      <Text style={styles.previewButtonText}>
                        {isPreviewing ? '⏳' : '▶️'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Advanced Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Advanced Settings</Text>
          
          {/* Stability */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Stability: {stability.toFixed(1)}</Text>
            <View style={styles.settingButtons}>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => setStability(Math.max(stability - 0.1, 0))}
              >
                <Text style={styles.settingButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => setStability(Math.min(stability + 0.1, 1))}
              >
                <Text style={styles.settingButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Similarity Boost */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Similarity Boost: {similarityBoost.toFixed(1)}</Text>
            <View style={styles.settingButtons}>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => setSimilarityBoost(Math.max(similarityBoost - 0.1, 0))}
              >
                <Text style={styles.settingButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => setSimilarityBoost(Math.min(similarityBoost + 0.1, 1))}
              >
                <Text style={styles.settingButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Style */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Style: {style.toFixed(1)}</Text>
            <View style={styles.settingButtons}>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => setStyle(Math.max(style - 0.1, 0))}
              >
                <Text style={styles.settingButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => setStyle(Math.min(style + 0.1, 1))}
              >
                <Text style={styles.settingButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handleGenerateTTS}
              disabled={isGenerating}
            >
              <Text style={styles.actionButtonText}>
                {isGenerating ? 'Generating...' : '🎤 Generate TTS'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleVoiceClone}
            >
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>🎭 Clone Voice</Text>
            </TouchableOpacity>
          </View>

          {currentAudioUri && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={handlePlayPause}
              >
                <Text style={styles.actionButtonText}>
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={handleStop}
              >
                <Text style={styles.actionButtonText}>⏹️ Stop</Text>
              </TouchableOpacity>
            </View>
          )}

          {currentAudioUri && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.exportButton]}
                onPress={handleExportAudio}
              >
                <Text style={styles.actionButtonText}>💾 Export</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.shareButton]}
                onPress={handleShareAudio}
              >
                <Text style={styles.actionButtonText}>📤 Share</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Cloned Voices */}
        {clonedVoices.length > 0 && (
          <View style={styles.clonedSection}>
            <Text style={styles.sectionTitle}>Cloned Voices</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {clonedVoices.map((voice, index) => (
                <TouchableOpacity
                  key={voice.voice_id}
                  style={styles.clonedVoiceOption}
                  onPress={() => setSelectedVoice(voice)}
                >
                  <Text style={styles.clonedVoiceName}>{voice.name}</Text>
                  <Text style={styles.clonedVoiceDate}>
                    {new Date(voice.date).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Voice Clone Modal */}
      <Modal
        visible={showCloneModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clone Voice</Text>
            
            <Text style={styles.modalLabel}>Voice Name:</Text>
            <TextInput
              style={styles.modalInput}
              value={cloneVoiceName}
              onChangeText={setCloneVoiceName}
              placeholder="Enter voice name"
            />
            
            <Text style={styles.modalLabel}>Description:</Text>
            <TextInput
              style={styles.modalInput}
              value={cloneVoiceDescription}
              onChangeText={setCloneVoiceDescription}
              placeholder="Enter description"
              multiline
            />
            
            {isCloningVoice && (
              <View style={styles.progressContainer}>
                <ActivityIndicator size="small" color="#007AFF" />
                <Text style={styles.progressText}>Cloning voice... {cloningProgress}%</Text>
              </View>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowCloneModal(false)}
                disabled={isCloningVoice}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleCloneVoice}
                disabled={isCloningVoice}
              >
                <Text style={styles.modalButtonText}>
                  {isCloningVoice ? 'Cloning...' : 'Clone Voice'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  settingsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textStats: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  voiceSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  voiceContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  voiceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  voiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  voiceScroll: {
    marginTop: 8,
  },
  voiceOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  voiceOption: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
    alignItems: 'center',
    marginRight: 4,
  },
  previewButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewButtonText: {
    fontSize: 12,
    color: '#fff',
  },
  selectedVoice: {
    backgroundColor: '#007AFF',
  },
  voiceOptionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedVoiceText: {
    color: '#fff',
  },
  voiceOptionCategory: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  settingsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  settingButtons: {
    flexDirection: 'row',
  },
  settingButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  settingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#fff',
  },
  exportButton: {
    backgroundColor: '#34C759',
  },
  shareButton: {
    backgroundColor: '#FF9500',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#333',
  },
  clonedSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  clonedVoiceOption: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clonedVoiceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  clonedVoiceDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default TextToSpeechScreen;
