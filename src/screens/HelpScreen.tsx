import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  Linking,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getEnvironmentConfig } from '../config/environment';

const HelpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    type: 'Feedback',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const socialMediaLinks = [
    {
      name: 'Instagram',
      handle: '@fiddyscript',
      url: 'https://instagram.com/fiddyscript',
      icon: '📸',
      color: '#E4405F'
    },
    {
      name: 'YouTube',
      handle: '@fiddyscript',
      url: 'https://youtube.com/@fiddyscript',
      icon: '📺',
      color: '#FF0000'
    },
    {
      name: 'X (Twitter)',
      handle: '@fiddyscript',
      url: 'https://x.com/fiddyscript',
      icon: '🐦',
      color: '#000000'
    },
    {
      name: 'Telegram',
      handle: 't.me/fiddyconnect',
      url: 'https://t.me/fiddyconnect',
      icon: '📱',
      color: '#0088CC'
    },
    {
      name: 'Support',
      handle: 'fideantech.com/support',
      url: 'https://fideantech.com/support',
      icon: '🆘',
      color: '#5A3EC8'
    }
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!feedbackForm.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (feedbackForm.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!feedbackForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(feedbackForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Type validation
    if (!feedbackForm.type) {
      newErrors.type = 'Please select a feedback type';
    }

    // Message validation
    if (!feedbackForm.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (feedbackForm.message.trim().length < 10) {
      newErrors.message = 'Feedback must be at least 10 characters';
    } else if (feedbackForm.message.trim().length > 750) {
      newErrors.message = 'Feedback must be 750 words or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFeedbackForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

         try {
       // Send feedback to the API server
                       // Try multiple API URLs
        const response = await tryApiUrls('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: feedbackForm.name.trim(),
            email: feedbackForm.email.trim(),
            type: feedbackForm.type,
            message: feedbackForm.message.trim()
          })
        });

      const savedFeedback = await response.json();
      console.log('Feedback submitted successfully:', savedFeedback);
      
      setSubmitStatus('success');
      setFeedbackForm({
        name: '',
        email: '',
        type: 'Feedback',
        message: ''
      });
      
      Alert.alert('Success', 'Thank you! Your feedback has been sent successfully.');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
      
      Alert.alert('Error', 'Failed to send feedback. Please try again.');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLinkClick = (url: string) => {
    Linking.openURL(url);
  };

  const testConnection = async () => {
    try {
      console.log('Testing API connection...');
      const response = await tryApiUrls('/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      Alert.alert('Connection Test', `API is working! Status: ${data.status}`);
    } catch (error) {
      console.error('Connection test failed:', error);
      Alert.alert('Connection Test', `Failed to connect: ${error.message}`);
    }
  };

  const feedbackTypes = ['Bug', 'Feedback', 'Suggestion', 'Testimonial'];

  // Get API base URL - use localhost for development, IP for mobile
  const getApiBaseUrl = () => {
    // For development, try localhost first, then common IP addresses
    const possibleUrls = [
      'http://192.168.100.4:3001', // Your computer's actual IP
      'http://localhost:3001',
      'http://10.0.2.2:3001', // Android emulator
      'http://127.0.0.1:3001'
    ];
    return possibleUrls[0]; // Start with your computer's IP
  };

  // Try multiple API URLs if one fails
  const tryApiUrls = async (endpoint: string, options: any) => {
    const config = getEnvironmentConfig();
    const possibleUrls = config.apiUrls;

    for (const baseUrl of possibleUrls) {
      try {
        console.log(`Trying to connect to: ${baseUrl}${endpoint}`);
        const response = await fetch(`${baseUrl}${endpoint}`, options);
        console.log(`Response from ${baseUrl}:`, response.status, response.statusText);
        if (response.ok) {
          console.log(`Successfully connected to ${baseUrl}`);
          return response;
        }
      } catch (error) {
        console.log(`Failed to connect to ${baseUrl}:`, error);
        continue;
      }
    }
    throw new Error('Failed to connect to API server - tried all URLs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={keyboardVisible ? styles.scrollViewContentKeyboard : styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <Text style={styles.headerSubtitle}>Get help, connect with us, and share your feedback</Text>
        </View>

        {/* Social Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <Text style={styles.sectionDescription}>
            Follow us on social media for updates, tips, and community support:
          </Text>
          
          <View style={styles.socialMediaGrid}>
            {socialMediaLinks.map((social, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialMediaCard, { borderColor: social.color }]}
                onPress={() => handleSocialLinkClick(social.url)}
                activeOpacity={0.7}
              >
                <Text style={[styles.socialIcon, { color: social.color }]}>
                  {social.icon}
                </Text>
                <View style={styles.socialInfo}>
                  <Text style={styles.socialName}>{social.name}</Text>
                  <Text style={styles.socialHandle}>{social.handle}</Text>
                </View>
                <Text style={styles.socialArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feedback Form Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send Us Feedback/Testimonial/Suggestions</Text>
          <Text style={styles.sectionDescription}>
            We'd love to hear from you! Share your suggestions, report issues, or tell us about your experience.
          </Text>
          
          <View style={styles.feedbackForm}>
            {/* Name Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input, errors.name ? styles.inputError : null]}
                value={feedbackForm.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Enter your name"
                placeholderTextColor="#999"
              />
              {errors.name && <Text style={styles.errorMessage}>{errors.name}</Text>}
            </View>

            {/* Email Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                value={feedbackForm.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}
            </View>

            {/* Feedback Type */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Feedback Type</Text>
              <View style={styles.radioGroup}>
                {feedbackTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.radioOption}
                    onPress={() => handleInputChange('type', type)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.radioButton,
                      feedbackForm.type === type && styles.radioButtonSelected
                    ]}>
                      {feedbackForm.type === type && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text style={styles.radioLabel}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.type && <Text style={styles.errorMessage}>{errors.type}</Text>}
            </View>

                         {/* Message Input */}
             <View style={styles.formGroup}>
               <Text style={styles.label}>Message</Text>
               <TextInput
                 style={[styles.textarea, errors.message ? styles.inputError : null]}
                 value={feedbackForm.message}
                 onChangeText={(value) => handleInputChange('message', value)}
                 placeholder="Share your feedback, testimonial, or suggestions..."
                 placeholderTextColor="#999"
                 multiline
                 numberOfLines={4}
                 textAlignVertical="top"
                 onFocus={() => {
                   // Scroll to the message field when focused
                   setTimeout(() => {
                     // This will be handled by KeyboardAvoidingView
                   }, 100);
                 }}
               />
              <View style={styles.textareaFooter}>
                <Text style={styles.charCount}>
                  {feedbackForm.message.length}/750 characters
                </Text>
                {errors.message && <Text style={styles.errorMessage}>{errors.message}</Text>}
              </View>
            </View>

                         {/* Test Connection Button */}
             <TouchableOpacity
               style={styles.testConnectionBtn}
               onPress={testConnection}
               activeOpacity={0.7}
             >
               <Text style={styles.testConnectionBtnText}>Test Connection</Text>
             </TouchableOpacity>

             {/* Submit Button */}
             <TouchableOpacity
               style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
               onPress={handleSubmit}
               disabled={isSubmitting}
               activeOpacity={0.7}
             >
               {isSubmitting ? (
                 <ActivityIndicator color="#fff" size="small" />
               ) : (
                 <Text style={styles.submitBtnText}>Submit</Text>
               )}
             </TouchableOpacity>

            {/* Submit Status */}
            {submitStatus && (
              <View style={[styles.submitStatus, styles[`submitStatus${submitStatus.charAt(0).toUpperCase() + submitStatus.slice(1)}`]]}>
                <Text style={styles.statusIcon}>
                  {submitStatus === 'success' ? '✅' : '❌'}
                </Text>
                <Text style={styles.statusText}>
                  {submitStatus === 'success' 
                    ? 'Thank you! Your feedback has been sent successfully.'
                    : 'Failed to send feedback. Please try again.'
                  }
                </Text>
              </View>
            )}
                     </View>
         </View>
       </ScrollView>
       </KeyboardAvoidingView>
     </SafeAreaView>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  scrollViewContentKeyboard: {
    flexGrow: 1,
    paddingBottom: 100, // Extra padding when keyboard is visible
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  socialMediaGrid: {
    gap: 12,
  },
  socialMediaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  socialIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  socialInfo: {
    flex: 1,
  },
  socialName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  socialHandle: {
    fontSize: 14,
    color: '#666',
  },
  socialArrow: {
    fontSize: 18,
    color: '#666',
  },
  feedbackForm: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  textarea: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
    minHeight: 100,
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#5A3EC8',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5A3EC8',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
  textareaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
  },
  submitBtn: {
    backgroundColor: '#5A3EC8',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  testConnectionBtn: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  testConnectionBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  submitStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  submitStatusSuccess: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  submitStatusError: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  statusIcon: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 14,
    flex: 1,
  },
});

export default HelpScreen;
