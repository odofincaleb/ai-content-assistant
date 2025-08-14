import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLicense } from '../contexts/LicenseContext';

// Simple theme object since we don't have ThemeContext
const theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#333333',
    textSecondary: '#666666',
    primary: '#5A3EC8',
    border: '#E0E0E0',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
  }
};

interface LicenseInfo {
  licenseKey: string;
  customerName: string;
  email: string;
  isActive: boolean;
  expiryDate: string;
  maxSystems: number;
  systems?: Array<{
    systemId: string;
    activatedAt: string;
    lastSeen: string;
  }>;
}

interface ValidationStatus {
  lastValidation?: Date;
  nextValidation?: Date;
  timeUntilNextValidation?: number;
}

const LicenseInfoScreen = () => {
  const navigation = useNavigation();
  const { isLicenseValid, licenseKey } = useLicense();
  
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  // Update manager state
  const [updateStatus, setUpdateStatus] = useState(null);
  const [updateProgress, setUpdateProgress] = useState(null);
  const [appVersion, setAppVersion] = useState('1.0.0');
  const [isChecking, setIsChecking] = useState(false);
  const [showUpdatePanel, setShowUpdatePanel] = useState(false);

  const styles = getStyles(theme);

  useEffect(() => {
    updateLicenseInfo();
  }, [licenseKey]);

  const updateLicenseInfo = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (!licenseKey) {
        setLicenseInfo(null);
        setError('No license key stored');
        return;
      }

      // Simulate license validation service call
      // In a real app, this would call the actual license validation service
      const mockLicenseInfo: LicenseInfo = {
        licenseKey: licenseKey,
        customerName: 'John Doe',
        email: 'john.doe@example.com',
        isActive: true,
        expiryDate: '2025-12-31',
        maxSystems: 5,
        systems: [
          {
            systemId: 'SYS-001',
            activatedAt: '2024-01-15',
            lastSeen: '2024-01-20'
          },
          {
            systemId: 'SYS-002',
            activatedAt: '2024-01-18',
            lastSeen: '2024-01-21'
          }
        ]
      };

      setLicenseInfo(mockLicenseInfo);

      // Calculate time remaining
      const expiryDate = new Date(mockLicenseInfo.expiryDate);
      const now = new Date();
      const timeRemainingMs = expiryDate.getTime() - now.getTime();
      
      if (timeRemainingMs <= 0) {
        setTimeRemaining('Expired');
      } else {
        const days = Math.floor(timeRemainingMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeRemaining(`${days} days, ${hours} hours`);
      }

      // Mock validation status
      const mockValidationStatus: ValidationStatus = {
        lastValidation: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        nextValidation: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
        timeUntilNextValidation: 6 * 60 * 60 * 1000
      };
      setValidationStatus(mockValidationStatus);

    } catch (error) {
      console.error('Error updating license info:', error);
      setError('Failed to load license information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualValidation = async () => {
    if (!licenseInfo) return;
    
    setIsValidating(true);
    setValidationMessage('');
    
    try {
      // Simulate validation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setValidationMessage('✅ License validation successful');
      
      // Refresh license info
      await updateLicenseInfo();
      
    } catch (error) {
      setValidationMessage('❌ Validation failed: Network error');
    } finally {
      setIsValidating(false);
    }
  };

  const handleCheckForUpdates = async () => {
    setIsChecking(true);
    try {
      // Simulate update check
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Update Check',
        'No updates available. You are using the latest version.',
        [{ text: 'OK' }]
      );
      
    } catch (error) {
      Alert.alert('Error', 'Failed to check for updates');
    } finally {
      setIsChecking(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await updateLicenseInfo();
    setRefreshing(false);
  };

  const getStatusColor = () => {
    if (!licenseInfo || !licenseInfo.isActive) return theme.colors.danger;
    const expiryDate = new Date(licenseInfo.expiryDate);
    const now = new Date();
    const timeRemaining = expiryDate.getTime() - now.getTime();
    if (timeRemaining <= 0) return theme.colors.danger;
    if (timeRemaining < 7 * 24 * 60 * 60 * 1000) return theme.colors.warning;
    return theme.colors.success;
  };

  const getStatusText = () => {
    if (!licenseInfo || !licenseInfo.isActive) return 'Inactive';
    const expiryDate = new Date(licenseInfo.expiryDate);
    const now = new Date();
    const timeRemaining = expiryDate.getTime() - now.getTime();
    if (timeRemaining <= 0) return 'Expired';
    if (timeRemaining < 7 * 24 * 60 * 60 * 1000) return 'Expiring Soon';
    return 'Active';
  };

  const getCurrentSystems = () => {
    return licenseInfo?.systems ? licenseInfo.systems.length : 0;
  };

  const formatTimeUntilNextValidation = (milliseconds?: number) => {
    if (!milliseconds || milliseconds <= 0) return 'Now';
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      const remainingHours = hours % 24;
      return `${days} day${days > 1 ? 's' : ''}${remainingHours > 0 ? `, ${remainingHours} hour${remainingHours > 1 ? 's' : ''}` : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>License Info</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading license information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!licenseInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>License Info</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={48} color={theme.colors.danger} />
          <Text style={styles.errorTitle}>No License Information</Text>
          <Text style={styles.errorMessage}>
            {error || 'Please enter a valid license key to view license information.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>License Info</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* License Status Header */}
        <View style={styles.statusHeader}>
          <View style={[styles.statusPill, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
          
          <View style={styles.versionSection}>
            <Text style={styles.versionLabel}>Version: {appVersion}</Text>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleCheckForUpdates}
              disabled={isChecking}
            >
              <Text style={styles.updateButtonText}>
                {isChecking ? 'Checking...' : 'Check Updates'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Validation Message */}
        {validationMessage && (
          <View style={styles.validationMessage}>
            <Text style={styles.validationMessageText}>{validationMessage}</Text>
          </View>
        )}

        {/* License Information Cards */}
        <View style={styles.cardsContainer}>
          {/* Customer Information */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="person" size={20} color={theme.colors.primary} />
              <Text style={styles.cardTitle}>Customer</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>{licenseInfo.customerName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>{licenseInfo.email}</Text>
              </View>
            </View>
          </View>

          {/* License Status */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="shield-checkmark" size={20} color={theme.colors.primary} />
              <Text style={styles.cardTitle}>Status</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={[styles.detailValue, { color: getStatusColor() }]}>
                  {getStatusText()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Expiry Date:</Text>
                <Text style={styles.detailValue}>
                  {new Date(licenseInfo.expiryDate).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Time Remaining:</Text>
                <Text style={styles.detailValue}>{timeRemaining}</Text>
              </View>
            </View>
          </View>

          {/* System Information */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="desktop" size={20} color={theme.colors.primary} />
              <Text style={styles.cardTitle}>System</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Max Systems:</Text>
                <Text style={styles.detailValue}>{licenseInfo.maxSystems}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Active Systems:</Text>
                <Text style={styles.detailValue}>
                  {getCurrentSystems()} / {licenseInfo.maxSystems}
                </Text>
              </View>
            </View>
          </View>

          {/* Validation Status */}
          {validationStatus && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="refresh" size={20} color={theme.colors.primary} />
                <Text style={styles.cardTitle}>Validation Status</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Last Validation:</Text>
                  <Text style={styles.detailValue}>
                    {validationStatus.lastValidation ? 
                      validationStatus.lastValidation.toLocaleString() : 'Never'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Next Validation:</Text>
                  <Text style={styles.detailValue}>
                    {validationStatus.nextValidation ? 
                      validationStatus.nextValidation.toLocaleString() : 'Now'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Time Until Next:</Text>
                  <Text style={styles.detailValue}>
                    {formatTimeUntilNextValidation(validationStatus.timeUntilNextValidation)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.validationButton}
                  onPress={handleManualValidation}
                  disabled={isValidating}
                >
                  <Text style={styles.validationButtonText}>
                    {isValidating ? 'Validating...' : 'Validate Now'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Registered Systems */}
          {licenseInfo.systems && licenseInfo.systems.length > 0 && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="list" size={20} color={theme.colors.primary} />
                <Text style={styles.cardTitle}>Registered Systems</Text>
              </View>
              <View style={styles.cardContent}>
                {licenseInfo.systems.map((system, index) => (
                  <View key={index} style={styles.systemItem}>
                    <Text style={styles.systemId}>{system.systemId}</Text>
                    <View style={styles.systemDetails}>
                      <Text style={styles.systemDetail}>
                        Activated: {new Date(system.activatedAt).toLocaleDateString()}
                      </Text>
                      <Text style={styles.systemDetail}>
                        Last Seen: {new Date(system.lastSeen).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 10,
    marginBottom: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  versionSection: {
    alignItems: 'flex-end',
  },
  versionLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  updateButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  validationMessage: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  validationMessageText: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 8,
  },
  cardContent: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  validationButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  validationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  systemItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 8,
  },
  systemId: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  systemDetails: {
    gap: 2,
  },
  systemDetail: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});

export default LicenseInfoScreen;
