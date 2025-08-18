# Fiddyscript Mobile App

A React Native mobile application for Fiddyscript AI Content Assistant.

## 🚀 Features

- **License Management**: Secure license validation with offline support
- **Script Editor**: Create and edit AI-powered scripts
- **AI Prompt Form**: Generate content with AI assistance
- **Settings**: Configure app preferences
- **Cross-Platform**: Works on both Android and iOS

## 📱 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **AsyncStorage** for local data persistence
- **Expo Speech** for text-to-speech functionality

## 🛠️ Installation

1. **Prerequisites**:
   - Node.js (v16 or higher)
   - npm or yarn
   - Expo CLI: `npm install -g @expo/cli`

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the App**:
   ```bash
   # For Android
   npm run android
   
   # For iOS (requires macOS)
   npm run ios
   
   # For web development
   npm run web
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
│   ├── LicenseContext.tsx
│   └── ScriptContext.tsx
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── LicenseScreen.tsx
│   ├── ScriptEditorScreen.tsx
│   ├── PromptFormScreen.tsx
│   └── SettingsScreen.tsx
├── services/           # Business logic services
│   └── licenseValidationService.ts
└── utils/             # Utility functions
```

## 🔐 License System

The app uses the same license validation system as the desktop version:

- **Online Validation**: Validates licenses against S3-stored data
- **Offline Support**: Allows previously validated licenses to work offline
- **Unlimited Licenses**: Supports unlimited system licenses
- **System Registration**: Tracks device registration for license management

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark interface design
- **Responsive Layout**: Adapts to different screen sizes
- **Touch-Friendly**: Optimized for mobile interaction
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages

## 🔧 Development

### Adding New Screens

1. Create a new screen component in `src/screens/`
2. Add the screen to the navigation stack in `App.tsx`
3. Update the navigation types if needed

### Adding New Features

1. Create components in `src/components/`
2. Add business logic in `src/services/`
3. Create context providers in `src/contexts/` if needed

### Styling

The app uses React Native's StyleSheet API with a consistent design system:
- Primary color: `#007AFF`
- Background: `#f5f5f5`
- Text colors: `#333`, `#666`, `#999`
- Success: `#4CAF50`
- Error: `#F44336`

## 📦 Building for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

## 🔄 Updates and Maintenance

- **Dependencies**: Keep Expo SDK and React Native updated
- **Security**: Regularly update license validation logic
- **Performance**: Monitor app performance and optimize as needed

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **License validation fails**: Check internet connection and license key format
3. **Build errors**: Ensure all dependencies are properly installed

### Debug Mode

Enable debug mode by shaking the device or pressing `Cmd+D` (iOS) / `Cmd+M` (Android) in the simulator.

## 📄 License

This project is part of the Fiddyscript AI Content Assistant suite. See the main project license for details.

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for all new components
3. Test on both Android and iOS devices
4. Update documentation for new features

---

**Fiddyscript Mobile** - AI Content Assistant for Mobile Devices 