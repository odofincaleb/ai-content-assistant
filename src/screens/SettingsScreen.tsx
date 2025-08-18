import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
  TextInput,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLicense } from '../contexts/LicenseContext';
import { useScript } from '../contexts/ScriptContext';
import TTSService from '../services/ttsService';

const SettingsScreen: React.FC = () => {
  const { isLicenseValid, licenseKey, clearLicense } = useLicense();
  const { scripts, loadScripts, saveScripts } = useScript();
  const [ttsService] = useState(new TTSService());
  
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // ElevenLabs API Settings
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('');
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiTestResult, setApiTestResult] = useState<{ valid: boolean; error?: string; voices?: number } | null>(null);

  useEffect(() => {
    const initializeTTS = async () => {
      await ttsService.initialize();
      await loadTTSSettings();
    };
    initializeTTS();
  }, []);

  const loadTTSSettings = async () => {
    try {
      const settings = ttsService.getSettings();
      setElevenLabsApiKey(settings.elevenLabsApiKey);
    } catch (error) {
      console.error('Error loading TTS settings:', error);
    }
  };

  const handleSaveTTSSettings = async () => {
    try {
      await ttsService.updateSettings({
        elevenLabsApiKey: elevenLabsApiKey.trim()
      });
      Alert.alert('Success', 'TTS settings saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save TTS settings');
    }
  };

  const handleTestElevenLabsAPI = async () => {
    if (!elevenLabsApiKey.trim()) {
      Alert.alert('Error', 'Please enter your ElevenLabs API key first');
      return;
    }

    setIsTestingApi(true);
    setApiTestResult(null);

    try {
      // Temporarily update the service with the new API key
      await ttsService.updateSettings({ elevenLabsApiKey: elevenLabsApiKey.trim() });
      
      const result = await ttsService.testElevenLabsAPI();
      setApiTestResult(result);
      
      if (result.valid) {
        Alert.alert('Success', `API key is valid! Found ${result.voices} voices.`);
      } else {
        Alert.alert('Error', `API test failed: ${result.error}`);
      }
    } catch (error) {
      setApiTestResult({ valid: false, error: error instanceof Error ? error.message : 'Unknown error' });
      Alert.alert('Error', 'Failed to test API key');
    } finally {
      setIsTestingApi(false);
    }
  };

  const openElevenLabsWebsite = () => {
    Linking.openURL('https://elevenlabs.io/');
  };

  const openElevenLabsAPIKeyHelp = () => {
    Linking.openURL('https://elevenlabs.io/docs/api-reference/authentication');
  };

  const openElevenLabsVoiceCloningHelp = () => {
    Linking.openURL('https://elevenlabs.io/docs/api-reference/voice-cloning');
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        scripts,
        settings: {
          notifications: notificationsEnabled,
          autoSave: autoSaveEnabled,
          darkMode: darkModeEnabled,
          elevenLabsApiKey: elevenLabsApiKey ? '***HIDDEN***' : '',
        },
        exportDate: new Date().toISOString(),
        version: '1.0.0',
      };
      
      // In a real app, you'd save this to file or share
      console.log('Export data:', JSON.stringify(exportData, null, 2));
      Alert.alert('Success', 'Data exported successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportData = async () => {
    setIsImporting(true);
    try {
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Data imported successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to import data');
    } finally {
      setIsImporting(false);
    }
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all scripts and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearLicense();
            // Clear scripts would be implemented here
            Alert.alert('Success', 'All data has been cleared');
          }
        }
      ]
    );
  };

  const handleSyncData = async () => {
    try {
      await loadScripts();
      await saveScripts();
      Alert.alert('Success', 'Data synchronized successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to synchronize data');
    }
  };

  const getAppStats = () => {
    const totalScripts = scripts.length;
    const salesScripts = scripts.filter(s => s.category === 'Sales').length;
    const marketingScripts = scripts.filter(s => s.category === 'Marketing').length;
    const otherScripts = totalScripts - salesScripts - marketingScripts;
    
    return {
      totalScripts,
      salesScripts,
      marketingScripts,
      otherScripts,
    };
  };

  const stats = getAppStats();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Configure your app preferences</Text>
        </View>

        {/* ElevenLabs API Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎤 ElevenLabs API Configuration</Text>
          <Text style={styles.sectionDescription}>
            Configure your ElevenLabs API key to enable professional text-to-speech and voice cloning features.
          </Text>
          
          <View style={styles.apiKeyContainer}>
            <Text style={styles.inputLabel}>API Key:</Text>
            <TextInput
              style={styles.apiKeyInput}
              value={elevenLabsApiKey}
              onChangeText={setElevenLabsApiKey}
              placeholder="Enter your ElevenLabs API key"
              placeholderTextColor="#999"
              secureTextEntry={true}
            />
          </View>
          
          <View style={styles.apiButtons}>
            <TouchableOpacity
              style={[styles.apiButton, styles.testButton]}
              onPress={handleTestElevenLabsAPI}
              disabled={isTestingApi || !elevenLabsApiKey.trim()}
            >
              {isTestingApi ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.apiButtonText}>Test API</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.apiButton, styles.saveButton]}
              onPress={handleSaveTTSSettings}
            >
              <Text style={styles.apiButtonText}>Save Settings</Text>
            </TouchableOpacity>
          </View>
          
          {apiTestResult && (
            <View style={[
              styles.apiTestResult,
              apiTestResult.valid ? styles.apiTestSuccess : styles.apiTestError
            ]}>
              <Text style={styles.apiTestText}>
                {apiTestResult.valid 
                  ? `✅ API Valid - ${apiTestResult.voices} voices available`
                  : `❌ API Error - ${apiTestResult.error}`
                }
              </Text>
            </View>
          )}
          
          <View style={styles.helpLinks}>
            <TouchableOpacity style={styles.helpLink} onPress={openElevenLabsWebsite}>
              <Text style={styles.helpLinkText}>🌐 Visit ElevenLabs Website</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.helpLink} onPress={openElevenLabsAPIKeyHelp}>
              <Text style={styles.helpLinkText}>🔑 How to Get API Key</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.helpLink} onPress={openElevenLabsVoiceCloningHelp}>
              <Text style={styles.helpLinkText}>🎭 Voice Cloning Guide</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* License Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 License Management</Text>
          
          <View style={styles.licenseInfo}>
            <Text style={styles.licenseLabel}>Status:</Text>
            <Text style={[
              styles.licenseStatus,
              isLicenseValid ? styles.licenseValid : styles.licenseInvalid
            ]}>
              {isLicenseValid ? '✅ Valid' : '❌ Invalid'}
            </Text>
          </View>
          
          {licenseKey && (
            <View style={styles.licenseInfo}>
              <Text style={styles.licenseLabel}>License Key:</Text>
              <Text style={styles.licenseKey}>{licenseKey}</Text>
            </View>
          )}
          
          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={clearLicense}
          >
            <Text style={styles.actionButtonText}>Clear License</Text>
          </TouchableOpacity>
        </View>

        {/* App Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 App Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalScripts}</Text>
              <Text style={styles.statLabel}>Total Scripts</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.salesScripts}</Text>
              <Text style={styles.statLabel}>Sales Scripts</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.marketingScripts}</Text>
              <Text style={styles.statLabel}>Marketing Scripts</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.otherScripts}</Text>
              <Text style={styles.statLabel}>Other Scripts</Text>
            </View>
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💾 Data Management</Text>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.exportButton]}
            onPress={handleExportData}
            disabled={isExporting}
          >
            {isExporting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.actionButtonText}>Export Data</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.importButton]}
            onPress={handleImportData}
            disabled={isImporting}
          >
            {isImporting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.actionButtonText}>Import Data</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.syncButton]}
            onPress={handleSyncData}
          >
            <Text style={styles.actionButtonText}>Sync Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={handleClearAllData}
          >
            <Text style={styles.actionButtonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Preferences</Text>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Auto Save</Text>
            <Switch
              value={autoSaveEnabled}
              onValueChange={setAutoSaveEnabled}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={autoSaveEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>❓ Support</Text>
          
          <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportLinkText}>📧 Contact Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportLinkText}>📖 User Guide</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportLinkText}>🐛 Report Bug</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportLinkText}>⭐ Rate App</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ App Information</Text>
          
          <View style={styles.appInfo}>
            <Text style={styles.appInfoLabel}>Version:</Text>
            <Text style={styles.appInfoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.appInfo}>
            <Text style={styles.appInfoLabel}>Build:</Text>
            <Text style={styles.appInfoValue}>2024.1.1</Text>
          </View>
          
          <View style={styles.appInfo}>
            <Text style={styles.appInfoLabel}>Platform:</Text>
            <Text style={styles.appInfoValue}>React Native</Text>
          </View>
        </View>
      </ScrollView>
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
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  apiKeyContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  apiKeyInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  apiButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  apiButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  testButton: {
    backgroundColor: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  apiButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  apiTestResult: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  apiTestSuccess: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  apiTestError: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  apiTestText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  helpLinks: {
    marginTop: 8,
  },
  helpLink: {
    paddingVertical: 8,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  licenseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  licenseLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  licenseStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  licenseValid: {
    color: '#34C759',
  },
  licenseInvalid: {
    color: '#FF3B30',
  },
  licenseKey: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exportButton: {
    backgroundColor: '#34C759',
  },
  importButton: {
    backgroundColor: '#007AFF',
  },
  syncButton: {
    backgroundColor: '#FF9500',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  supportLink: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportLinkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  appInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  appInfoValue: {
    fontSize: 16,
    color: '#666',
  },
});

export default SettingsScreen; 