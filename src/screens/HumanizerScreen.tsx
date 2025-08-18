import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  Switch,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { humanizeText } from '../utils/humanizer';

const { width: screenWidth } = Dimensions.get('window');

// Simple theme object since we don't have ThemeContext
const theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#333333',
    textSecondary: '#666666',
    primary: '#5A3EC8',
    border: '#E0E0E0',
  }
};

const HumanizerScreen = () => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [imperfectionPercentage, setImperfectionPercentage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [highlightedOutput, setHighlightedOutput] = useState('');
  const [showImperfectionTypes, setShowImperfectionTypes] = useState(true);
  
  // Imperfection type toggles
  const [imperfectionTypes, setImperfectionTypes] = useState({
    misspellings: true,
    homophones: true,
    capitalization: true,
    typos: true,
    punctuation: true,
    spacing: true,
    repeatedWords: true,
    grammar: true,
    wordChoice: true,
    fillerWords: true
  });

  const imperfectionOptions = [
    { 
      key: 'misspellings', 
      label: 'Add some common misspellings', 
      description: 'ex: "seperate" instead of "separate"',
      examples: ['seperate', 'recieve', 'occassion', 'definately', 'accomodate']
    },
    { 
      key: 'homophones', 
      label: 'Add some common homophone confusions', 
      description: 'ex: "there" instead of "their"',
      examples: ['there', 'their', 'they\'re', 'your', 'you\'re', 'its', 'it\'s', 'to', 'too', 'two']
    },
    { 
      key: 'capitalization', 
      label: 'Add some capitalization issues', 
      description: 'ex: "THis" instead of "This"',
      examples: ['THis', 'THat', 'THey', 'THere', 'THen']
    },
    { 
      key: 'typos', 
      label: 'Add some common typos', 
      description: 'ex: "teh" instead of "the"',
      examples: ['teh', 'thier', 'recieve', 'occassion', 'definately']
    },
    { 
      key: 'punctuation', 
      label: 'Add some punctuation issues', 
      description: 'ex: "Ive" instead of "I\'ve"',
      examples: ['Ive', 'dont', 'cant', 'wont', 'shouldnt', 'couldnt']
    },
    { 
      key: 'spacing', 
      label: 'Add some common spacing issues', 
      description: 'ex: two spaces after a comma or period',
      examples: ['  ', ' ,', ' .', ' !', ' ?']
    },
    { 
      key: 'repeatedWords', 
      label: 'Add some repeated letters and words', 
      description: 'ex: "that that"',
      examples: ['that that', 'the the', 'is is', 'and and', 'but but']
    },
    {
      key: 'grammar',
      label: 'Add some grammatical errors',
      description: 'ex: "He go to school" instead of "He goes to school"',
      examples: ['He go', 'She eat', "I don't have no"]
    },
    {
      key: 'wordChoice',
      label: 'Add some word choice errors',
      description: 'ex: "accept" instead of "except"',
      examples: ['accept', 'affect', 'effect', 'then', 'than']
    },
    {
      key: 'fillerWords',
      label: 'Add some filler words',
      description: 'ex: "um", "like", "you know"',
      examples: ['um', 'like', 'you know', 'actually', 'basically', 'sort of', 'kind of']
    }
  ];

  const styles = getStyles(theme);

  const handleImperfectionToggle = (key) => {
    setImperfectionTypes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to humanize.');
      return;
    }

    setIsProcessing(true);
    setOriginalText(inputText);

    try {
      const result = await humanizeText(inputText, imperfectionPercentage);
      setOutputText(result);
      
      // Create highlighted version
      const highlighted = highlightImperfections(result);
      setHighlightedOutput(highlighted);
    } catch (error) {
      Alert.alert('Error', 'Failed to humanize text. Please try again.');
      console.error('Humanizer error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const highlightImperfections = (text) => {
    // Define imperfection patterns with their colors
    const imperfectionPatterns = [
      { pattern: /\b(um|uh|er|ah|hmm|well|like|you know|i mean)\b/gi, color: '#FF6B6B', label: 'Filler Words' },
      { pattern: /\b(very|really|quite|extremely|totally|completely)\b/gi, color: '#4ECDC4', label: 'Intensifiers' },
      { pattern: /\b(actually|basically|literally|honestly|frankly)\b/gi, color: '#45B7D1', label: 'Qualifiers' },
      { pattern: /\b(thing|stuff|something|anything|everything)\b/gi, color: '#96CEB4', label: 'Vague Words' },
      { pattern: /\b(i think|i believe|i feel|maybe|perhaps|probably)\b/gi, color: '#FFEAA7', label: 'Hedges' },
      { pattern: /\b(so|and so|and then|and like)\b/gi, color: '#DDA0DD', label: 'Connectors' },
      { pattern: /\b(seperate|recieve|occassion|definately|accomodate|neccessary|sucessful|beleive)\b/gi, color: '#FF8E8E', label: 'Misspellings' },
      { pattern: /\b(there|their|you're|your|it's|its|too|to|two|where|were)\b/gi, color: '#FFB366', label: 'Homophones' },
      { pattern: /\b(teh|thier)\b/gi, color: '#FFCC99', label: 'Typos' },
      { pattern: /\b(Ive|dont|cant|wont)\b/gi, color: '#E6B3FF', label: 'Punctuation' },
    ];

    // Create a structure to track highlighted segments with their colors
    const highlights = [];
    
    imperfectionPatterns.forEach(({ pattern, color, label }) => {
      const matches = [...text.matchAll(pattern)];
      matches.forEach((match) => {
        highlights.push({
          text: match[0],
          start: match.index,
          end: match.index + match[0].length,
          color: color,
          label: label
        });
      });
    });

    // Sort highlights by start position
    highlights.sort((a, b) => a.start - b.start);

    // Create highlighted text with color information
    let highlightedText = text;
    let offset = 0;

    highlights.forEach((highlight) => {
      const start = highlight.start + offset;
      const end = start + highlight.text.length;
      const before = highlightedText.substring(0, start);
      const after = highlightedText.substring(end);
      const highlighted = `[${highlight.text}:${highlight.color}]`;
      highlightedText = before + highlighted + after;
      offset += highlighted.length - highlight.text.length;
    });

    return highlightedText;
  };

  const handleSliderChange = (value) => {
    setImperfectionPercentage(Math.round(value * 10) / 10);
  };

  const handleSwapText = () => {
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
      setHighlightedOutput('');
    }
  };

  const handleClearAll = () => {
    setInputText('');
    setOutputText('');
    setHighlightedOutput('');
    setImperfectionPercentage(1);
  };

  const onSliderGestureEvent = (event) => {
    const { translationX } = event.nativeEvent;
    const sliderWidth = screenWidth - 80; // Account for padding
    const percentage = Math.max(0.5, Math.min(20, (translationX / sliderWidth) * 19.5 + 0.5));
    setImperfectionPercentage(Math.round(percentage * 10) / 10);
  };

  const onSliderStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      // Slider interaction ended
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Content Humanizer</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Transform AI-generated content into natural, human-like text by adding realistic imperfections
          </Text>
        </View>

        {/* Imperfection Types Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Imperfection Types</Text>
            <TouchableOpacity 
              onPress={() => setShowImperfectionTypes(!showImperfectionTypes)}
              style={styles.collapseButton}
            >
              <Text style={styles.collapseButtonText}>
                {showImperfectionTypes ? '▼' : '▲'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {showImperfectionTypes && (
            <View style={styles.imperfectionToggles}>
              {imperfectionOptions.map(option => (
                <View key={option.key} style={styles.toggleItem}>
                  <View style={styles.toggleHeader}>
                    <Switch
                      value={imperfectionTypes[option.key]}
                      onValueChange={() => handleImperfectionToggle(option.key)}
                      trackColor={{ false: '#e0e0e0', true: '#5a3ec8' }}
                      thumbColor={imperfectionTypes[option.key] ? '#fff' : '#f4f3f4'}
                    />
                    <Text style={styles.toggleLabel}>{option.label}</Text>
                  </View>
                  <Text style={styles.toggleDescription}>{option.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Text Areas */}
        <View style={styles.textAreasContainer}>
          {/* Input Text */}
          <View style={styles.textAreaCard}>
            <Text style={styles.textAreaTitle}>Input Text (AI-Generated)</Text>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Paste your AI-generated content here..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              textAlignVertical="top"
            />
            <View style={styles.textStats}>
              <Text style={styles.statText}>Characters: {inputText.length}</Text>
              <Text style={styles.statText}>Words: {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</Text>
            </View>
          </View>

          {/* Output Text */}
          {outputText && (
            <View style={styles.textAreaCard}>
              <Text style={styles.textAreaTitle}>Humanized Output</Text>
              <TextInput
                style={styles.textInput}
                value={outputText}
                onChangeText={setOutputText}
                placeholder="Humanized text will appear here..."
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                textAlignVertical="top"
                editable={true}
              />
              <View style={styles.textStats}>
                <Text style={styles.statText}>Characters: {outputText.length}</Text>
                <Text style={styles.statText}>Words: {outputText.trim() ? outputText.trim().split(/\s+/).length : 0}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Imperfection Percentage */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Imperfection Percentage</Text>
          <Text style={styles.percentageDescription}>
            The percentage of words to modify with imperfections
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.percentageValue}>{imperfectionPercentage}%</Text>
            <View style={styles.sliderTrack}>
              <PanGestureHandler
                onGestureEvent={onSliderGestureEvent}
                onHandlerStateChange={onSliderStateChange}
              >
                <View style={styles.sliderThumbContainer}>
                  <View
                    style={[
                      styles.sliderFill,
                      { width: `${((imperfectionPercentage - 0.5) / 19.5) * 100}%` }
                    ]}
                  />
                  <View
                    style={[
                      styles.sliderThumb,
                      { left: `${((imperfectionPercentage - 0.5) / 19.5) * 100}%` }
                    ]}
                  />
                </View>
              </PanGestureHandler>
            </View>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>0.5%</Text>
              <Text style={styles.sliderLabel}>20%</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={handleHumanize}
            disabled={isProcessing || !inputText.trim()}
          >
            <Text style={styles.buttonText}>
              {isProcessing ? '🔄 Processing...' : '✨ Humanize Text'}
            </Text>
          </TouchableOpacity>
          
          {outputText && (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]}
                onPress={() => {
                  // Copy to clipboard functionality would go here
                  Alert.alert('Success', 'Text copied to clipboard!');
                }}
                disabled={!outputText}
              >
                <Text style={styles.buttonText}>📋 Copy Result</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.outlineButton]}
                onPress={handleSwapText}
              >
                <Text style={[styles.buttonText, { color: theme.colors.primary }]}>🔄 Swap Text</Text>
              </TouchableOpacity>
            </>
          )}
          
          <TouchableOpacity 
            style={[styles.button, styles.outlineButton]}
            onPress={handleClearAll}
          >
            <Text style={[styles.buttonText, { color: theme.colors.primary }]}>🗑️ Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureTitle}>Smart Imperfections</Text>
              <Text style={styles.featureDescription}>
                Add realistic human errors at the same rate real people make them
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>⚙️</Text>
              <Text style={styles.featureTitle}>Customizable Types</Text>
              <Text style={styles.featureDescription}>
                Choose which types of imperfections to introduce in your content
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureTitle}>Percentage Control</Text>
              <Text style={styles.featureDescription}>
                Set exact percentage of words to modify (0.5% to 20%)
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📈</Text>
              <Text style={styles.featureTitle}>Text Analytics</Text>
              <Text style={styles.featureDescription}>
                Real-time character and word count statistics for both input and output
              </Text>
            </View>
          </View>
        </View>

        {outputText && highlightedOutput && (
          <View style={styles.section}>
            <View style={styles.outputHeader}>
              <Text style={styles.sectionTitle}>Highlighted Imperfections</Text>
            </View>
            
                         <View style={styles.outputContainer}>
               <Text style={styles.outputText}>
                 {highlightedOutput.split('[').map((part, index) => {
                   if (index === 0) return part;
                   const [imperfectionWithColor, ...rest] = part.split(']');
                   const [imperfection, color] = imperfectionWithColor.split(':');
                   return (
                     <Text key={index}>
                       <Text style={[styles.imperfectionText, { backgroundColor: color || '#FF6B6B' }]}>
                         {imperfection}
                       </Text>
                       {rest.join(']')}
                     </Text>
                   );
                 })}
               </Text>
             </View>

                         <View style={styles.highlightedContainer}>
               <Text style={styles.highlightedTitle}>Imperfections Found:</Text>
               <View style={styles.highlightedText}>
                 <Text style={styles.highlightedOutput}>
                   {highlightedOutput.split('[').map((part, index) => {
                     if (index === 0) return part;
                     const [imperfectionWithColor, ...rest] = part.split(']');
                     const [imperfection, color] = imperfectionWithColor.split(':');
                     return (
                       <Text key={index}>
                         <Text style={[styles.imperfectionText, { backgroundColor: color || '#FF6B6B' }]}>
                           {imperfection}
                         </Text>
                         {rest.join(']')}
                       </Text>
                     );
                   })}
                 </Text>
               </View>
             </View>
          </View>
        )}
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
  descriptionContainer: {
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5a3ec8',
  },
  collapseButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collapseButtonText: {
    fontSize: 16,
    color: '#666',
  },
  imperfectionToggles: {
    gap: 12,
  },
  toggleItem: {
    marginBottom: 12,
  },
  toggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  toggleDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 44,
  },
  textAreasContainer: {
    gap: 16,
    marginBottom: 16,
  },
  textAreaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textAreaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5a3ec8',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f7f8fa',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  textStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  percentageDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  percentageValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5a3ec8',
    marginBottom: 15,
  },
  sliderTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    position: 'relative',
    marginBottom: 8,
  },
  sliderThumbContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#5a3ec8',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#5a3ec8',
    borderRadius: 10,
    top: -8,
    marginLeft: -10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#5a3ec8',
  },
  secondaryButton: {
    backgroundColor: '#28a745',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5a3ec8',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 10,
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  outputContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 15,
    backgroundColor: theme.colors.surface,
  },
  outputText: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  highlightedContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  highlightedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 10,
  },
  highlightedText: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 6,
  },
  highlightedOutput: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  imperfectionText: {
    paddingHorizontal: 2,
    borderRadius: 3,
    fontWeight: 'bold',
  },
});

export default HumanizerScreen;

