export interface EnvironmentConfig {
  apiUrls: string[];
  environment: 'development' | 'production';
  timeout: number;
  retryAttempts: number;
}

const developmentConfig: EnvironmentConfig = {
  apiUrls: [
    'http://192.168.100.4:3001',
    'http://localhost:3001',
    'http://10.0.2.2:3001',
    'http://127.0.0.1:3001'
  ],
  environment: 'development',
  timeout: 10000,
  retryAttempts: 3
};

const productionConfig: EnvironmentConfig = {
  apiUrls: [
    'https://feedback-api-production-fd15.up.railway.app'
  ],
  environment: 'production',
  timeout: 15000,
  retryAttempts: 5
};

export const getEnvironmentConfig = (): EnvironmentConfig => {
  // Use __DEV__ to detect development vs production
  return __DEV__ ? developmentConfig : productionConfig;
};

export const isProduction = (): boolean => {
  return !__DEV__;
};
