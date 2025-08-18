import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLicense } from '../contexts/LicenseContext';

const LicenseScreen: React.FC = () => {
  const { isLicenseValid, licenseKey, validateLicense, clearLicense, setLicenseKey } = useLicense();
  
  const [inputLicenseKey, setInputLicenseKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (licenseKey) {
      setInputLicenseKey(licenseKey);
    }
  }, [licenseKey]);

  const handleValidateLicense = async () => {
    if (!inputLicenseKey.trim()) {
      Alert.alert('Error', 'Please enter a license key');
      return;
    }

    setIsValidating(true);
    setValidationMessage('');
    setValidationError('');

    try {
      const result = await validateLicense(inputLicenseKey.trim());
      
      if (result.success && result.isValid) {
        setValidationMessage(result.reason || 'License validated successfully!');
        Alert.alert('Success', 'License validated successfully!');
      } else {
        setValidationError(result.error || 'License validation failed');
        Alert.alert('Validation Failed', result.error || 'License validation failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setValidationError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsValidating(false);
    }
  };

  const handleClearLicense = () => {
    Alert.alert(
      'Clear License',
      'Are you sure you want to clear the current license?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearLicense();
            setInputLicenseKey('');
            setValidationMessage('');
            setValidationError('');
            Alert.alert('Success', 'License cleared successfully');
          }
        }
      ]
    );
  };

  const getStatusColor = () => {
    if (isLicenseValid) return '#4CAF50';
    if (validationError) return '#F44336';
    return '#FF9800';
  };

  const getStatusText = () => {
    if (isLicenseValid) return '✓ Valid License';
    if (validationError) return '✗ Invalid License';
    return '⚠ License Status Unknown';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>License Management</Text>
        <Text style={styles.headerSubtitle}>Enter and validate your Fiddyscript license</Text>
      </View>

      {/* License Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>License Status</Text>
        <View style={[styles.statusCard, { borderLeftColor: getStatusColor() }]}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
          {licenseKey && (
            <Text style={styles.licenseKeyText}>License: {licenseKey}</Text>
          )}
          {validationMessage && (
            <Text style={styles.successMessage}>{validationMessage}</Text>
          )}
          {validationError && (
            <Text style={styles.errorMessage}>{validationError}</Text>
          )}
        </View>
      </View>

      {/* License Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enter License Key</Text>
        <Text style={styles.instructionText}>
          Enter your Fiddyscript license key to activate the application.
        </Text>
        <TextInput
          style={styles.licenseInput}
          placeholder="Enter license key (e.g., FD-XXXXXX-XXXX-XXXX)"
          value={inputLicenseKey}
          onChangeText={setInputLicenseKey}
          placeholderTextColor="#999"
          autoCapitalize="characters"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.validateButton, isValidating && styles.disabledButton]}
          onPress={handleValidateLicense}
          disabled={isValidating}
        >
          {isValidating ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.validateButtonText}>🔍 Validate License</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Troubleshooting */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Troubleshooting</Text>
        <View style={styles.troubleshootingCard}>
          <Text style={styles.troubleshootingTitle}>Common Issues:</Text>
          <Text style={styles.troubleshootingText}>
            • Make sure you have an internet connection for first-time validation{'\n'}
            • Check that your license key is correct and active{'\n'}
            • Ensure your license hasn't expired{'\n'}
            • Try clearing the license and re-entering it{'\n'}
            • Contact support if issues persist
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.clearButton]}
          onPress={handleClearLicense}
        >
          <Text style={styles.actionButtonText}>🗑️ Clear License</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.retryButton]}
          onPress={handleValidateLicense}
          disabled={isValidating || !inputLicenseKey.trim()}
        >
          <Text style={styles.actionButtonText}>🔄 Retry Validation</Text>
        </TouchableOpacity>
      </View>

      {/* Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>License Information</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • Your license key is stored securely on your device{'\n'}
            • First-time validation requires internet connection{'\n'}
            • Subsequent validations can work offline{'\n'}
            • Unlimited licenses support multiple devices{'\n'}
            • Contact support for license issues
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  section: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statusCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  statusIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  licenseKeyText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  successMessage: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  errorMessage: {
    fontSize: 14,
    color: '#F44336',
    marginTop: 5,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  licenseInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    fontFamily: 'monospace',
  },
  validateButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  troubleshootingCard: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  troubleshootingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  troubleshootingText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  actionButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#F44336',
  },
  retryButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoText: {
    fontSize: 14,
    color: '#0d47a1',
    lineHeight: 20,
  },
});

export default LicenseScreen; 