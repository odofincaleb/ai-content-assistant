import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLicense } from '../contexts/LicenseContext';
import { formConfigs, getDefaultFormConfig, toneOptions } from '../utils/formConfigs';
import BrowserSection from '../components/BrowserSection';

// Normalization helper to match form names/ids across Desktop and Mobile
const normalizeKey = (value?: string) => {
  if (!value) return '';
  return value
    .toString()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ') // remove punctuation, keep spaces/numbers
    .replace(/\s+/g, ' ') // collapse spaces
    .trim();
};

// Build a normalized index of all available form configs
const buildConfigIndex = (configs: Record<string, any>) => {
  const index = new Map<string, string>(); // normalizedKey -> originalKey
  Object.keys(configs).forEach((key) => {
    const n = normalizeKey(key);
    if (n) {
      if (!index.has(n)) index.set(n, key);
    }
  });
  return index;
};

// Attempt to resolve a config key using multiple strategies
const resolveConfigKey = (
  configs: Record<string, any>,
  index: Map<string, string>,
  formType?: string,
  formTypeId?: string
): string | undefined => {
  if (formTypeId && configs[formTypeId]) return formTypeId;
  if (formType && configs[formType]) return formType;

  // Try common case transforms
  if (formTypeId) {
    const variants = [
      formTypeId.toUpperCase(),
      formTypeId.toLowerCase(),
      formTypeId.replace(/_/g, ' '),
      formTypeId.replace(/\s+/g, '_'),
    ];
    for (const v of variants) if (configs[v]) return v;
  }
  if (formType) {
    const variants = [
      formType.toUpperCase(),
      formType.toLowerCase(),
      formType.replace(/\s+/g, '_'),
      formType.replace(/_/g, ' '),
    ];
    for (const v of variants) if (configs[v]) return v;
  }

  // Normalized exact match
  const nId = normalizeKey(formTypeId);
  const nName = normalizeKey(formType);
  if (nId && index.has(nId)) return index.get(nId);
  if (nName && index.has(nName)) return index.get(nName);

  // Substring fallback (pick first reasonable candidate)
  for (const [nKey, originalKey] of index.entries()) {
    if (nId && (nKey.includes(nId) || nId.includes(nKey))) return originalKey;
    if (nName && (nKey.includes(nName) || nName.includes(nKey))) return originalKey;
  }

  return undefined;
};

type PromptFormRouteProp = RouteProp<{
  PromptForm: {
    formType?: string;
    formTypeId?: string;
    category?: string;
  };
}, 'PromptForm'>;

const PromptFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PromptFormRouteProp>();
  const { isLicenseValid } = useLicense();
  
  const formType = route.params?.formType || 'FACEBOOK ADS';
  const formTypeId = route.params?.formTypeId;
  const category = route.params?.category;
  const categoryId = (route.params as any)?.categoryId as string | undefined;
  
  const configIndex = useMemo(() => buildConfigIndex(formConfigs as any), []);
  const resolvedKey = useMemo(
    () => resolveConfigKey(formConfigs as any, configIndex, formType, formTypeId),
    [formType, formTypeId, configIndex]
  );
  
  // Use resolved key, then try original, then default
  const formConfig = (resolvedKey && (formConfigs as any)[resolvedKey]) 
    || (formConfigs as any)[formType]
    || getDefaultFormConfig(formType);
  
  const [answers, setAnswers] = useState<string[]>(formConfig.questions.map(() => ''));
  const [errors, setErrors] = useState<string[]>(formConfig.questions.map(() => ''));
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  
  // Dropdown states
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
  const [dropdownItems, setDropdownItems] = useState<{ [key: number]: Array<{ label: string; value: string }> }>({});

  useEffect(() => {
    if (!isLicenseValid) {
      Alert.alert(
        'License Required',
        'Please validate your license to access this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to License', onPress: () => navigation.navigate('License') }
        ]
      );
      navigation.goBack();
    }
  }, [isLicenseValid, navigation]);

  // Initialize dropdown items for tone fields
  useEffect(() => {
    const newDropdownItems: { [key: number]: Array<{ label: string; value: string }> } = {};
    
    formConfig.questions.forEach((question, index) => {
      if (formConfig.toneQuestionIndex === index && formConfig.tones) {
        newDropdownItems[index] = formConfig.tones.map(tone => ({
          label: tone,
          value: tone
        }));
      }
    });
    
    setDropdownItems(newDropdownItems);
  }, [formConfig.toneQuestionIndex, formConfig.tones]);

  const isNumberField = (question: string, fieldIndex: number) => {
    return formConfig.numberQuestionIndex === fieldIndex;
  };

  const isToneField = (fieldIndex: number) => {
    return formConfig.toneQuestionIndex === fieldIndex;
  };

  const validateField = (value: string, fieldIndex: number) => {
    if (!value.trim()) {
      return 'This field is required';
    }
    
    if (isNumberField(formConfig.questions[fieldIndex], fieldIndex)) {
      const num = parseInt(value);
      if (isNaN(num) || num <= 0) {
        return 'Please enter a valid number';
      }
    }
    
    return '';
  };

  const validateForm = () => {
    const newErrors = answers.map((answer, index) => validateField(answer, index));
    setErrors(newErrors);
    return newErrors.every(error => !error);
  };

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    
    // Clear error when user starts typing
    if (errors[index]) {
      const newErrors = [...errors];
      newErrors[index] = '';
      setErrors(newErrors);
    }
  };

  const handleBlur = (index: number) => {
    const error = validateField(answers[index], index);
    const newErrors = [...errors];
    newErrors[index] = error;
    setErrors(newErrors);
  };

  const handleDropdownOpen = (index: number, open: boolean) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [index]: open
    }));
  };

  // Function to save recent form type to AsyncStorage
  const saveRecentFormType = async (formType: string) => {
    try {
      const storedFormsJson = await AsyncStorage.getItem('recent_form_types');
      let recentForms: string[] = storedFormsJson ? JSON.parse(storedFormsJson) : [];

      // Remove if already exists to move it to the top
      recentForms = recentForms.filter(item => item !== formType);

      // Add the new type to the beginning
      recentForms.unshift(formType);

      // Limit to last 4
      recentForms = recentForms.slice(0, 4);

      await AsyncStorage.setItem('recent_form_types', JSON.stringify(recentForms));
    } catch (e) {
      console.error('Failed to save recent form type', e);
    }
  };

  const generatePrompt = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields correctly.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate prompt using template
      let prompt = formConfig.template;
      answers.forEach((answer, index) => {
        prompt = prompt.replace(`{${index + 1}}`, answer);
      });
      
      setGeneratedPrompt(prompt);
      
      // Save the form type to recent history after successful generation
      await saveRecentFormType(formType);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate prompt. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPrompt = async () => {
    if (generatedPrompt.trim()) {
      try {
        await Clipboard.setStringAsync(generatedPrompt);
        Alert.alert('Copied!', 'Prompt copied to clipboard');
      } catch (error) {
        Alert.alert('Error', 'Failed to copy to clipboard');
      }
    } else {
      Alert.alert('No Content', 'Please generate a prompt first');
    }
  };



  const clearFields = () => {
    setAnswers(formConfig.questions.map(() => ''));
    setErrors(formConfig.questions.map(() => ''));
    setGeneratedPrompt('');
  };

  const renderField = (question: string, index: number) => {
    if (isToneField(index)) {
      return (
        <View style={styles.dropdownContainer}>
                     <DropDownPicker
             open={openDropdowns[index] || false}
             value={answers[index]}
             items={dropdownItems[index] || []}
             setOpen={(open) => handleDropdownOpen(index, open)}
             setValue={(callback) => {
               const value = callback(answers[index]);
               handleChange(index, value);
               // Close dropdown after selection
               setTimeout(() => handleDropdownOpen(index, false), 100);
             }}
             setItems={() => {}}
             style={styles.dropdown}
             dropDownContainerStyle={styles.dropdownList}
             placeholder="Select a tone..."
             placeholderStyle={styles.dropdownPlaceholder}
             labelStyle={styles.dropdownLabel}
             listMode="SCROLLVIEW"
             scrollViewProps={{
               nestedScrollEnabled: true,
             }}
             zIndex={3000 - index}
             zIndexInverse={1000 + index}
             closeAfterSelecting={true}
           />
        </View>
      );
    }

    return (
      <TextInput
        style={[
          styles.input,
          errors[index] && styles.inputError
        ]}
        placeholder={formConfig.examples[index]}
        placeholderTextColor="#999"
        value={answers[index]}
        onChangeText={(value) => handleChange(index, value)}
        onBlur={() => handleBlur(index)}
        multiline={question.length > 50}
        numberOfLines={question.length > 50 ? 3 : 1}
        keyboardType={isNumberField(question, index) ? 'numeric' : 'default'}
      />
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Prompt Form</Text>
          <Text style={styles.headerSubtitle}>{category ? `${category} > ${formType}` : formType}</Text>
        </View>

        {/* Form Type Display */}
        <View style={styles.formTypeSection}>
          <View style={styles.formTypeCard}>
            <Text style={styles.formTypeLabel}>Category</Text>
            <Text style={styles.formTypeValue}>{category || 'General'}</Text>
          </View>
          <View style={styles.formTypeCard}>
            <Text style={styles.formTypeLabel}>Form Type</Text>
            <Text style={styles.formTypeValue}>{formType}</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Fill in the Details</Text>
          
          {formConfig.questions.map((question, index) => (
            <View key={index} style={styles.fieldContainer}>
              <Text style={styles.questionLabel}>
                {question}
              </Text>
              
              {renderField(question, index)}
              
              {errors[index] && (
                <Text style={styles.errorText}>{errors[index]}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Note Section */}
        {formConfig.note && (
          <View style={styles.noteSection}>
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>{formConfig.note}</Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.generateButton]}
              onPress={generatePrompt}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <ActivityIndicator size="small" color="#fff" />
                             ) : (
                 <Text style={styles.actionButtonText}>📝 Generate Prompt</Text>
               )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.clearButton]}
              onPress={clearFields}
              disabled={isGenerating}
            >
              <Text style={styles.clearButtonText}>🗑️ Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.backButton]}
              onPress={() => {
                // Navigate back to Scripts and reopen the selected category's form-types modal
                if (categoryId) {
                  (navigation as any).navigate('Scripts', { openCategoryId: categoryId });
                } else {
                  (navigation as any).navigate('Scripts');
                }
              }}
              disabled={isGenerating}
            >
              <Text style={styles.actionButtonText}>⬅ Back</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Generated Prompt */}
        {generatedPrompt && (
          <View style={styles.resultSection}>
            <Text style={styles.sectionTitle}>Generated AI Prompt</Text>
            <View style={styles.promptContainer}>
              <Text style={styles.promptText}>{generatedPrompt}</Text>
            </View>
                         <TouchableOpacity
               style={styles.copyButton}
               onPress={copyPrompt}
             >
               <Text style={styles.copyButtonText}>📋 Copy Prompt</Text>
             </TouchableOpacity>
          </View>
        )}

        {/* Browser Section */}
        <BrowserSection 
          title="Web Research Tools"
          description="Quick access to research websites and content creation tools"
          showBookmarks={true}
        />

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips for {formType}</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Be specific and detailed in your answers</Text>
            <Text style={styles.tipItem}>• Consider your target audience carefully</Text>
            <Text style={styles.tipItem}>• Choose the right tone for your brand</Text>
            <Text style={styles.tipItem}>• Include relevant keywords and hashtags</Text>
            <Text style={styles.tipItem}>• Use the browser section for research and inspiration</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontSize: 24,
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
  formTypeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formTypeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTypeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  formTypeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  formSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4,
  },
  dropdownContainer: {
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  dropdownLabel: {
    color: '#333',
    fontSize: 16,
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 50,
  },
  generateButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  backButton: {
    backgroundColor: '#666',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  promptContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promptText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  copyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tipsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tipsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  noteSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  noteCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default PromptFormScreen; 