import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useScript } from '../contexts/ScriptContext';

type ScriptEditorRouteProp = RouteProp<{
  ScriptEditor: {
    formType?: string;
    scriptId?: string;
  };
}, 'ScriptEditor'>;

const ScriptEditorScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScriptEditorRouteProp>();
  const { addScript, updateScript, scripts } = useScript();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const formType = route.params?.formType || 'Script';
  const scriptId = route.params?.scriptId;

  useEffect(() => {
    if (scriptId) {
      // Load existing script
      const script = scripts.find(s => s.id === scriptId);
      if (script) {
        setTitle(script.title);
        setContent(script.content);
        setCategory(script.category);
      }
    } else {
      // Set default category based on form type
      setCategory(formType);
    }
  }, [scriptId, scripts, formType]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your script');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content for your script');
      return;
    }

    setIsLoading(true);

    try {
      const scriptData = {
        title: title.trim(),
        content: content.trim(),
        category: category || formType,
        formType: formType,
        updatedAt: new Date().toISOString(),
      };

      if (scriptId) {
        await updateScript(scriptId, scriptData);
        Alert.alert('Success', 'Script updated successfully!');
      } else {
        await addScript(scriptData);
        Alert.alert('Success', 'Script created successfully!');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save script. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    setIsLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const aiGeneratedContent = `AI-generated content for ${formType}:\n\nThis is a sample AI-generated script for ${formType}. The AI has analyzed your requirements and created compelling content that follows best practices for this type of script.\n\nKey features of this generated content:\n• Optimized for ${formType}\n• Engaging and persuasive\n• Follows industry best practices\n• Ready to use immediately`;
      
      setContent(aiGeneratedContent);
      setIsLoading(false);
      Alert.alert('AI Generation Complete', 'Your script has been generated successfully!');
    }, 2000);
  };

  const handleClear = () => {
    Alert.alert(
      'Clear Script',
      'Are you sure you want to clear all content? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {
          setTitle('');
          setContent('');
        }}
      ]
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
          <Text style={styles.headerTitle}>Script Editor</Text>
          <Text style={styles.headerSubtitle}>{formType}</Text>
        </View>

        {/* Form Type Display */}
        <View style={styles.formTypeSection}>
          <View style={styles.formTypeCard}>
            <Text style={styles.formTypeLabel}>Form Type</Text>
            <Text style={styles.formTypeValue}>{formType}</Text>
          </View>
        </View>

        {/* Title Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Script Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter a descriptive title for your script"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          <Text style={styles.charCount}>{title.length}/100</Text>
        </View>

        {/* Category Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Category</Text>
          <TextInput
            style={styles.categoryInput}
            placeholder="Enter category (optional)"
            placeholderTextColor="#999"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* Content Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Script Content</Text>
          <TextInput
            style={styles.contentInput}
            placeholder={`Start writing your ${formType.toLowerCase()} script here...`}
            placeholderTextColor="#999"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            maxLength={5000}
          />
          <Text style={styles.charCount}>{content.length}/5000</Text>
        </View>

        {/* Writing Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Writing Tips for {formType}</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Keep your content engaging and relevant</Text>
            <Text style={styles.tipItem}>• Use clear, concise language</Text>
            <Text style={styles.tipItem}>• Include a strong call-to-action</Text>
            <Text style={styles.tipItem}>• Proofread before saving</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.generateButton]}
              onPress={handleGenerateAI}
              disabled={isLoading}
            >
              <Text style={styles.actionButtonText}>
                {isLoading ? 'Generating...' : '🤖 Generate AI'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.clearButton]}
              onPress={handleClear}
              disabled={isLoading}
            >
              <Text style={styles.clearButtonText}>🗑️ Clear</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Saving...' : '💾 Save Script'}
            </Text>
          </TouchableOpacity>
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
  inputSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  tipsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  actionsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  generateButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default ScriptEditorScreen; 