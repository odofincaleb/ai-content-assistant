import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ScriptEditorScreen from './src/screens/ScriptEditorScreen';
import ScriptsScreen from './src/screens/ScriptsScreen';
import TextToSpeechScreen from './src/screens/TextToSpeechScreen';
import PromptFormScreen from './src/screens/PromptFormScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LicenseScreen from './src/screens/LicenseScreen';
import HumanizerScreen from './src/screens/HumanizerScreen';
import TutorialsScreen from './src/screens/TutorialsScreen';
import LicenseInfoScreen from './src/screens/LicenseInfoScreen';
import HelpScreen from './src/screens/HelpScreen';
import UserProfile from './src/components/UserProfile';

// Import context providers
import { LicenseProvider } from './src/contexts/LicenseContext';
import { ScriptProvider } from './src/contexts/ScriptContext';

const Stack = createStackNavigator();

export default function App() {
  // Ensure scrolling works on web
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflowY = 'auto';
      } catch (_) {
        // no-op for native
      }
    }
  }, []);

  return (
    <SafeAreaProvider>
      <LicenseProvider>
        <ScriptProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#1a1a1a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                // Add web-specific navigation options
                ...(Platform.OS === 'web' && {
                  gestureEnabled: false,
                  cardStyleInterpolator: undefined,
                }),
              }}
            >
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: 'Fiddyscript Mobile' }}
              />
              <Stack.Screen 
                name="ScriptEditor" 
                component={ScriptEditorScreen} 
                options={{ title: 'Script Editor' }}
              />
              <Stack.Screen 
                name="Scripts" 
                component={ScriptsScreen} 
                options={{ title: 'Scripts' }}
              />
              <Stack.Screen 
                name="TextToSpeech" 
                component={TextToSpeechScreen} 
                options={{ title: 'Text to Speech' }}
              />
              <Stack.Screen 
                name="PromptForm" 
                component={PromptFormScreen} 
                options={{ title: 'AI Prompt' }}
              />
              <Stack.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{ title: 'Settings' }}
              />
              <Stack.Screen 
                name="License" 
                component={LicenseScreen} 
                options={{ title: 'License' }}
              />
              <Stack.Screen 
                name="Humanizer" 
                component={HumanizerScreen} 
                options={{ title: 'Content Humanizer' }}
              />
              <Stack.Screen 
                name="Tutorials" 
                component={TutorialsScreen} 
                options={{ title: 'Tutorials' }}
              />
              <Stack.Screen 
                name="LicenseInfo" 
                component={LicenseInfoScreen} 
                options={{ title: 'License Info' }}
              />
              <Stack.Screen
                name="Help" 
                component={HelpScreen} 
                options={{ title: 'Help & Support' }}
              />
              <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{ title: 'User Profile' }}
              />
            </Stack.Navigator>
            <StatusBar style="light" />
          </NavigationContainer>
        </ScriptProvider>
      </LicenseProvider>
    </SafeAreaProvider>
  );
}
