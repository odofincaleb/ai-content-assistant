import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getEnvironmentConfig } from '../config/environment';

interface LicenseSystem {
  systemId: string;
  fingerprint: string;
  lastSeen: string;
  isActive: boolean;
}

interface License {
  licenseKey: string;
  isActive: boolean;
  expiryDate: string;
  maxSystems: number;
  systems: LicenseSystem[];
}

interface LicenseData {
  licenses: License[];
}

interface ValidationResult {
  success: boolean;
  isValid: boolean;
  needsValidation: boolean;
  reason?: string;
  error?: string;
}

class LicenseValidationService {
  private readonly STORAGE_KEYS = {
    SYSTEM_ID: 'fiddyscript_system_id',
    LAST_VALIDATION: 'fiddyscript_last_validation',
    VALIDATION_INTERVAL: 'fiddyscript_validation_interval',
    LICENSE_KEY: 'fiddyscript_license_key',
    UNLIMITED_LICENSE: 'fiddyscript_unlimited_license',
  };

  // Mock license data for testing (fallback) - only for development
  private readonly MOCK_LICENSES: LicenseData = {
    licenses: []
  };

  constructor() {
    this.initializeSystemId();
  }

  private async initializeSystemId(): Promise<void> {
    const existingId = await AsyncStorage.getItem(this.STORAGE_KEYS.SYSTEM_ID);
    if (!existingId) {
      const newId = this.generateSystemId();
      await AsyncStorage.setItem(this.STORAGE_KEYS.SYSTEM_ID, newId);
    }
  }

  private generateSystemId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 15);
    const platform = Platform.OS;
    return `mobile_${platform}_${timestamp}_${random}`;
  }

  private async getSystemId(): Promise<string> {
    let systemId = await AsyncStorage.getItem(this.STORAGE_KEYS.SYSTEM_ID);
    if (!systemId) {
      systemId = this.generateSystemId();
      await AsyncStorage.setItem(this.STORAGE_KEYS.SYSTEM_ID, systemId);
    }
    return systemId;
  }

  private async getSystemFingerprint(): Promise<string> {
    const systemId = await this.getSystemId();
    const platform = Platform.OS;
    const version = Platform.Version;
    return `${systemId}_${platform}_${version}`;
  }

  private async loadLicensesFromMock(): Promise<LicenseData> {
    // For now, return mock data
    return this.MOCK_LICENSES;
  }

  async validateLicense(licenseKey: string): Promise<ValidationResult> {
    try {
      console.log('Starting license validation for:', licenseKey);
      
      // Save the license key
      await AsyncStorage.setItem(this.STORAGE_KEYS.LICENSE_KEY, licenseKey);

      // Always try to validate with the API server first
      const apiResult = await this.validateLicenseWithAPI(licenseKey);
      if (apiResult.success) {
        return apiResult;
      }

      // If API fails, return the error (no fallback to mock)
      console.log('API validation failed:', apiResult.error);
      return apiResult;
    } catch (error) {
      console.error('License validation error:', error);
      
      return {
        success: false,
        isValid: false,
        needsValidation: false,
        error: error instanceof Error ? error.message : 'Network error or invalid license'
      };
    }
  }

  private async validateLicenseWithAPI(licenseKey: string): Promise<ValidationResult> {
    try {
      const config = getEnvironmentConfig();
      const systemId = await this.getSystemId();
      const fingerprint = await this.getSystemFingerprint();

      // First, check if the license exists and is active
      const statusResponse = await fetch(`${config.apiUrls[0]}/api/licenses/status?licenseKey=${licenseKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!statusResponse.ok) {
        return {
          success: false,
          isValid: false,
          needsValidation: false,
          error: `License not found or invalid (${statusResponse.status})`
        };
      }

      const statusResult = await statusResponse.json();
      
      if (!statusResult.isActive) {
        return {
          success: false,
          isValid: false,
          needsValidation: false,
          error: 'License is inactive or suspended'
        };
      }

      // Now try to activate the device with the API
      const response = await fetch(`${config.apiUrls[0]}/api/licenses/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licenseKey: licenseKey,
          deviceId: systemId,
          platform: Platform.OS,
          deviceName: `Mobile ${Platform.OS}`,
          userEmail: 'test@example.com' // Default for testing
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          isValid: false,
          needsValidation: false,
          error: `Device activation failed: ${response.status} - ${errorText}`
        };
      }

      const result = await response.json();
      
      if (result.success) {
        // Set unlimited license flag if needed
        if (result.maxDevices >= 999999) {
          await AsyncStorage.setItem(this.STORAGE_KEYS.UNLIMITED_LICENSE, 'true');
        }
        
        return {
          success: true,
          isValid: true,
          needsValidation: false,
          reason: 'License validated successfully via API'
        };
      } else {
        return {
          success: false,
          isValid: false,
          needsValidation: false,
          error: result.error || 'API validation failed'
        };
      }
    } catch (error) {
      console.error('API validation error:', error);
      return {
        success: false,
        isValid: false,
        needsValidation: false,
        error: error instanceof Error ? error.message : 'Network error during validation'
      };
    }
  }

  private async validateLicenseWithMock(licenseKey: string): Promise<ValidationResult> {
    try {
      // Load license data from mock source
      const licenseData = await this.loadLicensesFromMock();
      const license = licenseData.licenses.find(l => l.licenseKey === licenseKey);

      if (!license) {
        return {
          success: false,
          isValid: false,
          needsValidation: false,
          error: 'License not found. Please check your license key.'
        };
      }

      if (!license.isActive) {
        return {
          success: false,
          isValid: false,
          needsValidation: false,
          error: 'License is inactive'
        };
      }

      const expiryDate = new Date(license.expiryDate);
      if (expiryDate < new Date()) {
        return {
          success: false,
          isValid: false,
          needsValidation: false,
          error: 'License has expired'
        };
      }

      const systemId = await this.getSystemId();
      const fingerprint = await this.getSystemFingerprint();

      // Check if this system is already registered
      const existingSystem = license.systems.find(s => s.systemId === systemId);

      if (existingSystem) {
        // System is already registered, update last seen
        console.log('System already registered, updating last seen');
        return await this.updateSystemLastSeen(licenseKey, systemId);
      } else {
        // Check if license has unlimited systems or if we're under the limit
        const currentSystems = license.systems ? license.systems.length : 0;
        const maxSystems = license.maxSystems || 5;
        
        // For unlimited licenses (maxSystems = -1 or very high number), always allow
        if (maxSystems === -1 || maxSystems >= 999999) {
          console.log('License has unlimited systems, registering new system');
          return await this.registerSystem(licenseKey, systemId, fingerprint);
        }
        
        // Check if system limit is reached
        if (currentSystems >= maxSystems) {
          return {
            success: false,
            isValid: false,
            needsValidation: false,
            error: `System limit reached for license: ${licenseKey} (${currentSystems}/${maxSystems})`
          };
        }

        // System needs to be registered
        console.log('Registering new system for license');
        return await this.registerSystem(licenseKey, systemId, fingerprint);
      }
    } catch (error) {
      console.error('Mock license validation error:', error);
      
      return {
        success: false,
        isValid: false,
        needsValidation: true,
        error: error instanceof Error ? error.message : 'Unknown validation error'
      };
    }
  }

  private async registerSystem(licenseKey: string, systemId: string, fingerprint: string): Promise<ValidationResult> {
    try {
      // Simulate system registration
      console.log('Registering system:', systemId, 'for license:', licenseKey);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set unlimited license flag if this is an unlimited license
      const licenseData = await this.loadLicensesFromMock();
      const license = licenseData.licenses.find(l => l.licenseKey === licenseKey);
      if (license && (license.maxSystems === -1 || license.maxSystems >= 999999)) {
        await AsyncStorage.setItem(this.STORAGE_KEYS.UNLIMITED_LICENSE, 'true');
      }
      
      this.setLastValidationTime();
      
      return {
        success: true,
        isValid: true,
        needsValidation: false,
        reason: 'System registered successfully'
      };
    } catch (error) {
      console.error('System registration error:', error);
      return {
        success: false,
        isValid: false,
        needsValidation: false,
        error: 'Failed to register system'
      };
    }
  }

  private async updateSystemLastSeen(licenseKey: string, systemId: string): Promise<ValidationResult> {
    try {
      // Simulate updating last seen
      console.log('Updating last seen for system:', systemId);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.setLastValidationTime();
      
      return {
        success: true,
        isValid: true,
        needsValidation: false,
        reason: 'System validation successful'
      };
    } catch (error) {
      console.error('Update last seen error:', error);
      return {
        success: false,
        isValid: false,
        needsValidation: false,
        error: 'Failed to update system status'
      };
    }
  }

  async validateLicenseOffline(licenseKey: string): Promise<ValidationResult> {
    try {
      console.log('Performing offline license validation');
      
      const systemId = await this.getSystemId();
      
      // Check if we have an unlimited license flag
      const unlimitedFlag = await AsyncStorage.getItem(this.STORAGE_KEYS.UNLIMITED_LICENSE);
      if (unlimitedFlag === 'true') {
        console.log('Offline validation: Unlimited license detected');
        return {
          success: true,
          isValid: true,
          needsValidation: false,
          reason: 'Unlimited license validated offline'
        };
      }

      // For regular licenses, check if we have recent validation
      const lastValidation = await this.getLastValidationTime();
      if (lastValidation) {
        const timeSinceValidation = Date.now() - lastValidation;
        const validationInterval = 24 * 60 * 60 * 1000; // 24 hours
        
        if (timeSinceValidation < validationInterval) {
          console.log('Offline validation: Recent validation found');
          return {
            success: true,
            isValid: true,
            needsValidation: false,
            reason: 'Recent validation found'
          };
        }
      }

      // If we reach here, we need online validation
      return {
        success: false,
        isValid: false,
        needsValidation: true,
        error: 'Offline validation failed. Please check your internet connection and try again.'
      };
    } catch (error) {
      console.error('Offline validation error:', error);
      return {
        success: false,
        isValid: false,
        needsValidation: true,
        error: 'Offline validation failed'
      };
    }
  }

  async quickLicenseCheck(licenseKey: string): Promise<ValidationResult> {
    try {
      console.log('Performing quick license check');
      
      // Check if we have a stored license key
      const storedLicenseKey = await AsyncStorage.getItem(this.STORAGE_KEYS.LICENSE_KEY);
      if (!storedLicenseKey || storedLicenseKey !== licenseKey) {
        return {
          success: false,
          isValid: false,
          needsValidation: true,
          error: 'License key not found in storage'
        };
      }

      // Always validate with the backend to ensure license is still active
      console.log('Quick check: Validating with backend');
      const result = await this.validateLicense(licenseKey);
      if (result.success) {
        this.setLastValidationTime();
      }
      return result;
    } catch (error) {
      console.error('Quick license check error:', error);
      return {
        success: false,
        isValid: false,
        needsValidation: true,
        error: 'Quick license check failed'
      };
    }
  }

  private setLastValidationTime(): void {
    AsyncStorage.setItem(this.STORAGE_KEYS.LAST_VALIDATION, Date.now().toString());
  }

  private async getLastValidationTime(): Promise<number | null> {
    const timestamp = await AsyncStorage.getItem(this.STORAGE_KEYS.LAST_VALIDATION);
    return timestamp ? parseInt(timestamp, 10) : null;
  }

  async clearLicenseData(): Promise<void> {
    await AsyncStorage.multiRemove([
      this.STORAGE_KEYS.LICENSE_KEY,
      this.STORAGE_KEYS.LAST_VALIDATION,
      this.STORAGE_KEYS.VALIDATION_INTERVAL,
      this.STORAGE_KEYS.UNLIMITED_LICENSE
    ]);
  }
}

export default new LicenseValidationService(); 