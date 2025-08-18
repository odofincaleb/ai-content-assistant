import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import licenseValidationService from '../services/licenseValidationService';

interface ValidationResult {
  success: boolean;
  isValid: boolean;
  needsValidation: boolean;
  reason?: string;
  error?: string;
}

interface UserRole {
  role: string | null;
  permissions: string[];
}

interface LicenseContextType {
  isLicenseValid: boolean;
  licenseKey: string | null;
  isLoading: boolean;
  error: string | null;
  userRole: UserRole;
  userEmail: string | null;
  validateLicense: (licenseKey: string) => Promise<ValidationResult>;
  clearLicense: () => Promise<void>;
  setLicenseKey: (key: string) => void;
  setUserEmail: (email: string) => void;
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
  isMember: () => boolean;
  loadUserPermissions: () => Promise<void>;
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

export const useLicense = () => {
  const context = useContext(LicenseContext);
  if (context === undefined) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  return context;
};

interface LicenseProviderProps {
  children: ReactNode;
}

export const LicenseProvider: React.FC<LicenseProviderProps> = ({ children }) => {
  const [isLicenseValid, setIsLicenseValid] = useState(false);
  const [licenseKey, setLicenseKeyState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>({ role: null, permissions: [] });
  const [userEmail, setUserEmailState] = useState<string | null>(null);

  useEffect(() => {
    loadLicenseFromStorage();
  }, []);

  const loadUserPermissions = async () => {
    try {
      if (!licenseKey || !userEmail) return;

      const response = await fetch(`https://feedback-api-production-fd15.up.railway.app/api/licenses/status?licenseKey=${licenseKey}&userEmail=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setUserRole({
          role: data.userRole,
          permissions: data.userPermissions || []
        });
      }
    } catch (error) {
      console.error('Error loading user permissions:', error);
    }
  };

  const hasPermission = (permission: string): boolean => {
    return userRole.permissions.includes(permission);
  };

  const isAdmin = (): boolean => {
    return userRole.role === 'admin';
  };

  const isMember = (): boolean => {
    return userRole.role === 'member';
  };

  const setUserEmail = async (email: string) => {
    setUserEmailState(email);
    await AsyncStorage.setItem('fiddyscript_user_email', email);
    await loadUserPermissions();
  };

  const loadLicenseFromStorage = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const storedLicenseKey = await AsyncStorage.getItem('fiddyscript_license_key');
      const storedUserEmail = await AsyncStorage.getItem('fiddyscript_user_email');
      
      if (storedUserEmail) {
        setUserEmailState(storedUserEmail);
      }
      
      if (storedLicenseKey) {
        setLicenseKeyState(storedLicenseKey);
        
        // Try to validate the license
        const result = await licenseValidationService.quickLicenseCheck(storedLicenseKey);
        
        if (result.success && result.isValid) {
          setIsLicenseValid(true);
          setError(null);
          
          // Load user permissions if we have both license and email
          if (storedUserEmail) {
            await loadUserPermissions();
          }
        } else {
          setIsLicenseValid(false);
          setError(result.error || 'License validation failed');
        }
      } else {
        // For testing, auto-load the test license
        const testLicenseKey = 'FD-TEST-MOBILE-2024';
        setLicenseKeyState(testLicenseKey);
        
        // Auto-validate the test license
        const result = await licenseValidationService.quickLicenseCheck(testLicenseKey);
        
        if (result.success && result.isValid) {
          setIsLicenseValid(true);
          setError(null);
        } else {
          setIsLicenseValid(false);
          setError('Failed to auto-validate test license');
        }
      }
    } catch (error) {
      console.error('Error loading license from storage:', error);
      setIsLicenseValid(false);
      setError('Failed to load license from storage');
    } finally {
      setIsLoading(false);
    }
  };

  const validateLicense = async (licenseKey: string): Promise<ValidationResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Validating license:', licenseKey);
      
      // First try online validation
      const result = await licenseValidationService.validateLicense(licenseKey);
      
      if (result.success && result.isValid) {
        setIsLicenseValid(true);
        setLicenseKeyState(licenseKey);
        setError(null);
        
        // Store the license key
        await AsyncStorage.setItem('fiddyscript_license_key', licenseKey);
        
        // Load user permissions if we have a user email
        if (userEmail) {
          await loadUserPermissions();
        }
        
        return {
          success: true,
          isValid: true,
          needsValidation: false
        };
      } else {
        setIsLicenseValid(false);
        setError(result.error || 'License validation failed');
        return {
          success: false,
          isValid: false,
          needsValidation: false,
          error: result.error || 'License validation failed'
        };
      }
    } catch (error) {
      console.error('License validation error:', error);
      setIsLicenseValid(false);
      setError('Network error or invalid license');
      return {
        success: false,
        isValid: false,
        needsValidation: false,
        error: 'Network error or invalid license'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const clearLicense = async () => {
    try {
      setIsLicenseValid(false);
      setLicenseKeyState(null);
      setError(null);
      setUserRole({ role: null, permissions: [] });
      setUserEmailState(null);
      
      await AsyncStorage.removeItem('fiddyscript_license_key');
      await AsyncStorage.removeItem('fiddyscript_user_email');
    } catch (error) {
      console.error('Error clearing license:', error);
    }
  };

  const setLicenseKey = (key: string) => {
    setLicenseKeyState(key);
  };

  const value: LicenseContextType = {
    isLicenseValid,
    licenseKey,
    isLoading,
    error,
    userRole,
    userEmail,
    validateLicense,
    clearLicense,
    setLicenseKey,
    setUserEmail,
    hasPermission,
    isAdmin,
    isMember,
    loadUserPermissions
  };

  return (
    <LicenseContext.Provider value={value}>
      {children}
    </LicenseContext.Provider>
  );
}; 