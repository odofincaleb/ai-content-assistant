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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLicense } from '../contexts/LicenseContext';
import { useScript } from '../contexts/ScriptContext';
import BrowserSection from '../components/BrowserSection';

// Categories and their form types (matching desktop app)
const categories = {
  'All Scripts': [
    { type: 'Linkedin ads', description: 'Crush your B2B competition with laser-targeted professional ad copy' },
    { type: 'Blog/Article Titles', description: 'Generate viral headlines that skyrocket your click-through rates' },
    { type: 'FACEBOOK ADS', description: 'Create Facebook ads that stop the scroll and convert browsers into buyers' },
    { type: 'GOOGLE ADS', description: 'Write Google ads that dominate search results and drive qualified traffic' },
    { type: 'LinkedIn Post', description: 'Generate LinkedIn posts that establish thought leadership' },
    { type: 'INSTAGRAM CAPTION', description: 'Write Instagram captions that increase engagement' },
    { type: 'TWITTER TWEET', description: 'Craft tweets that trend and amplify your message' },
    { type: 'LONG SALES COPY', description: 'Write long-form sales copy that converts prospects into customers' },
    { type: 'SHORT SALES COPY', description: 'Create concise sales copy that closes deals quickly' },
    { type: 'EMAIL SUBJECT LINES', description: 'Write email subject lines that increase open rates' },
    { type: 'YOUTUBE SCRIPT', description: 'Create YouTube scripts that engage viewers and grow your channel' },
    { type: 'TIKTOK VIDEO SCRIPT', description: 'Create TikTok scripts that trend and build your following' },
    { type: 'GENERAL ADVERTISEMENT', description: 'Craft versatile ad copy that works across all platforms' },
    { type: 'AMAZON SPONSORED BRAND ADS HEADLINE', description: 'Write Amazon ad headlines that dominate search results' },
    { type: 'AMAZON PRODUCT TITLES', description: 'Create Amazon product titles that rank higher and convert better' },
    { type: 'INSTAGRAM REELS', description: 'Create Reels scripts that go viral and skyrocket your reach' },
    { type: 'TWITTER SERIES', description: 'Build Twitter threads that keep followers engaged' },
    { type: 'PINTEREST PIN TITLE AND DESCRIPTION', description: 'Create Pinterest content that drives traffic' },
    { type: 'CALL TO ACTIONS', description: 'Create CTAs that compel action and skyrocket conversion rates' },
    { type: 'HEADLINES', description: 'Write headlines that grab attention and force people to read' },
    { type: 'PRODUCT DESCRIPTION', description: 'Write product descriptions that sell features and benefits' },
    { type: 'PAS FRAMEWORK', description: 'Use the Pain-Agitate-Solution framework to create compelling copy' },
    { type: 'AIDA FRAMEWORK', description: 'Create AIDA copy that guides prospects through the sales funnel' },
    { type: 'YOUTUBE TITLES', description: 'Generate YouTube titles that increase views and improve rankings' },
    { type: 'YOUTUBE HOOKS', description: 'Create YouTube hooks that grab attention in the first 5 seconds' },
    { type: 'TIKTOK VIDEO HOOKS', description: 'Write TikTok hooks that stop the scroll and increase watch time' },
    { type: 'PODCAST SCRIPT', description: 'Create podcast scripts that engage listeners and deliver value' },
    { type: 'PRODUCT OR SERVICE PROMOTION', description: 'Create promotional emails that convert subscribers' },
    { type: 'COLD OUTREACH EMAILS', description: 'Create cold outreach emails that get responses' },
    { type: 'AUTORESPONDER SERIES', description: 'Build email sequences that nurture leads and drive conversions' },
    { type: 'BLOG/ARTICLE IDEAS', description: 'Unlock endless content ideas that keep your audience engaged' },
    { type: 'BLOG/ARTICLE INTRO', description: 'Write irresistible introductions that grab attention' },
    { type: 'BLOG/ARTICLE OUTLINES', description: 'Structure your content like a pro with detailed outlines' },
    { type: 'SHORT BLOG/ARTICLE', description: 'Create concise, powerful articles that deliver maximum impact' },
    { type: 'Paragraph Script', description: 'Write SEO-optimized paragraphs with targeted keywords' },
    { type: 'BLOG/ARTICLE IDEAS', description: 'Unlock endless content ideas that keep your audience engaged' },
    { type: 'BLOG/ARTICLE INTRO', description: 'Write irresistible introductions that grab attention' },
    { type: 'BLOG/ARTICLE OUTLINES', description: 'Structure your content like a pro with detailed outlines' },
    { type: 'SHORT BLOG/ARTICLE', description: 'Create concise, powerful articles that deliver maximum impact' },
    { type: 'GUARANTEES', description: 'Write compelling guarantee statements that build customer confidence' },
    { type: 'COMPANY BIO', description: 'Create engaging company bios that showcase your brand story' },
    { type: 'CONCLUSION SCRIPT', description: 'Write powerful conclusions that leave lasting impressions' },
    { type: 'Apps and SMS Notification', description: 'Create concise notification messages that drive engagement' },
    { type: 'Social Media Content Plan', description: 'Build comprehensive social media content strategies' },
    { type: 'TRENDING INSTAGRAM HASHTAGS', description: 'Generate trending hashtags to boost Instagram reach' },
    { type: 'TRENDING TWITTER HASHTAGS', description: 'Find trending hashtags to amplify Twitter engagement' },
    { type: 'QUORA ANSWERS', description: 'Write thoughtful Quora answers that establish expertise' },
    { type: 'PERSONAL BIO', description: 'Create captivating personal bios that stand out' },
    { type: 'OPTIN PAGES', description: 'Write persuasive opt-in page copy that converts visitors' },
    { type: 'FEATURE/BENEFIT LIST', description: 'Create compelling feature-benefit lists that sell' },
    { type: 'SUBHEADLINES', description: 'Write engaging subheadlines that guide readers through content' },
    { type: 'UNIQUE VALUE PROPOSITION', description: 'Craft clear UVPs that differentiate your offering' },
    { type: 'FAQ GENERATOR', description: 'Generate comprehensive FAQs that address customer concerns' },
    { type: 'PRODUCT TITLES', description: 'Create eye-catching product titles that drive clicks' },
    { type: 'PRODUCT FEATURES/ BULLETS', description: 'Write compelling product bullet points that convert' },
    { type: 'PERSONAL LETTER', description: 'Write warm personal letters that connect with recipients' },
    { type: 'BUSINESS LETTER', description: 'Create professional business letters for formal communication' },
    { type: 'COVER LETTER', description: 'Write compelling cover letters that land interviews' },
    { type: 'REFERENCE/RECOMMENDATION LETTER', description: 'Create strong recommendation letters that support applications' },
    { type: 'RESIGNATION LETTER', description: 'Write professional resignation letters that maintain relationships' },
    { type: 'THANK YOU LETTER', description: 'Create heartfelt thank you letters that show appreciation' },
    { type: 'APOLOGY LETTER', description: 'Write sincere apology letters that mend relationships' },
    { type: 'COMPLAINT LETTER', description: 'Create effective complaint letters that get results' },
    { type: 'INVITATION LETTER', description: 'Write warm invitation letters that encourage attendance' },
    { type: 'CONTENT REWRITER', description: 'Rewrite content to create fresh, engaging pieces' },
    { type: 'REWRITE WITH KEYWORDS', description: 'Rewrite content while incorporating target keywords' },
    { type: 'NICHE IDEAS', description: 'Generate niche ideas for specific industries or topics' },
    { type: 'ANALYZE GIVEN CONTENT', description: 'Analyze content to identify strengths and improvement opportunities' },
    { type: 'INVESTIGATE A PARTICULAR NICHE', description: 'Investigate niche markets for business opportunities' },
    { type: 'GENERATE BUSINESS IDEAS', description: 'Generate innovative business ideas for any industry' },
    { type: 'GENERATE DIGITAL PRODUCT IDEAS', description: 'Create digital product ideas that solve real problems' },
    { type: 'GENERATE PHYSICAL PRODUCT IDEAS', description: 'Develop physical product ideas for various markets' },
    { type: 'GENERATE DOMAIN NAME IDEAS', description: 'Generate memorable domain names for your website' },
    { type: 'KEYWORD RESEARCH', description: 'Conduct comprehensive keyword research for SEO optimization' },
    { type: 'GENERATE A BUSINESS PLAN', description: 'Create comprehensive business plans for new ventures' },
    { type: 'CREATE CHAPTERS AND TOC', description: 'Structure ebooks with detailed chapter outlines' },
    { type: 'CREATE CHAPTERS', description: 'Write detailed chapters for comprehensive ebooks' },
    { type: 'EBOOK CONCLUSION', description: 'Write powerful conclusions that leave lasting impressions' },
    { type: 'CREATE A DISCLAIMER', description: 'Create legal disclaimers that protect your content' },
    { type: 'EBOOK CALL TO ACTION', description: 'Generate compelling CTAs throughout your ebook' },
    { type: 'EBOOK AUTHOR BIO', description: 'Write engaging author bios that build credibility' },
    { type: 'SEO META TAGS', description: 'Create SEO-optimized meta tags for better rankings' },
    { type: 'SEO META DESCRIPTIONS', description: 'Write compelling meta descriptions that drive clicks' },
    { type: 'PODCAST INTERVIEW QUESTIONS', description: 'Create engaging interview questions for podcast guests' },
    { type: 'DIGITAL PRODUCT REVIEW', description: 'Write comprehensive digital product reviews' },
    { type: 'PHYSICAL PRODUCT REVIEW', description: 'Create detailed physical product reviews' },
    { type: 'MINI-VSL (VIDEO SALES LETTER)', description: 'Write compelling video sales letter scripts' },
    { type: 'DIGITAL PRODUCT VIDEO', description: 'Create engaging video scripts for digital products' },
    { type: 'PHYSICAL PRODUCT VIDEO', description: 'Write compelling video scripts for physical products' },
    { type: 'SHORT AD VIDEO', description: 'Create concise ad video scripts for maximum impact' },
    { type: 'TUTORIAL VIDEO', description: 'Write instructional video scripts that teach effectively' },
    { type: 'INFORMATIONAL VIDEO', description: 'Create educational video scripts that inform and engage' },
    { type: 'ANNOUNCEMENT VIDEO', description: 'Write announcement video scripts that create excitement' },
    { type: 'FACEBOOK AD VIDEO', description: 'Create Facebook ad video scripts that convert' },
    { type: 'NEWS ANNOUNCEMENT EMAIL', description: 'Write professional news announcement emails' },
    { type: 'PRODUCT UPDATES EMAIL', description: 'Create engaging product update emails' },
    { type: 'INFORMATIONAL EMAIL', description: 'Write educational emails that provide value' },
    { type: 'GENERAL SUPPORT SCRIPT', description: 'Create helpful customer support scripts' },
    { type: 'PRODUCT/SERVICE ACCESS', description: 'Write clear access instructions for customers' },
    { type: 'SUPPORT SOLUTION FOR A PROBLEM', description: 'Create effective problem-solving support scripts' },
    { type: 'SUPPORT AUTORESPONDER MESSAGE', description: 'Write professional support autoresponder messages' },
    { type: 'ENGAGING QUESTIONS', description: 'Generate engaging questions for audience interaction' },
    { type: 'CREATIVE STORY', description: 'Write creative stories that captivate readers' },
    { type: 'SUMMARIZE TEXT', description: 'Create concise summaries of longer content' },
    { type: 'CITATIONS GENERATOR', description: 'Generate proper citations in various formats' },
    { type: 'QUOTES GENERATOR', description: 'Create inspiring quotes for various themes' },
    { type: 'TONE CHANGER', description: 'Transform content tone while maintaining meaning' },
    { type: 'SONG LYRICS', description: 'Write creative song lyrics in various genres' },
    { type: 'REAL ESTATE LISTING DESCRIPTIONS', description: 'Create compelling real estate listings' },
    { type: 'REVIEW RESPONDER', description: 'Write professional responses to customer reviews' },
    { type: 'PRODUCT NAMES', description: 'Generate creative product names for your offerings' },
    { type: 'ANALOGY MAKER', description: 'Create powerful analogies that simplify complex concepts' },
    { type: 'GROWTH IDEAS', description: 'Generate business growth strategies and ideas' },
    { type: 'KEYWORD EXTRACTOR', description: 'Extract relevant keywords from your content' },
    { type: 'LISTICLE IDEAS', description: 'Generate listicle ideas for engaging content' },
    { type: 'STARTUP IDEAS', description: 'Create innovative startup ideas for any industry' },
    { type: 'TRANSLATE', description: 'Translate content into different languages' }
  ],
  'Advertisements': [
    { type: 'Linkedin ads', description: 'Crush your B2B competition with laser-targeted professional ad copy' },
    { type: 'FACEBOOK ADS', description: 'Create Facebook ads that stop the scroll and convert browsers into buyers' },
    { type: 'GOOGLE ADS', description: 'Write Google ads that dominate search results and drive qualified traffic' },
    { type: 'GENERAL ADVERTISEMENT', description: 'Craft versatile ad copy that works across all platforms' },
    { type: 'AMAZON SPONSORED BRAND ADS HEADLINE', description: 'Write Amazon ad headlines that dominate search results' },
    { type: 'AMAZON PRODUCT TITLES', description: 'Create Amazon product titles that rank higher and convert better' },
    { type: 'FACEBOOK AD VIDEO', description: 'Create Facebook ad video scripts that convert' },
    { type: 'SHORT AD VIDEO', description: 'Create concise ad video scripts for maximum impact' }
  ],
  'Social Media': [
    { type: 'LinkedIn Post', description: 'Generate LinkedIn posts that establish thought leadership' },
    { type: 'INSTAGRAM CAPTION', description: 'Write Instagram captions that increase engagement' },
    { type: 'INSTAGRAM REELS', description: 'Create Reels scripts that go viral and skyrocket your reach' },
    { type: 'TWITTER TWEET', description: 'Craft tweets that trend and amplify your message' },
    { type: 'TWITTER SERIES', description: 'Build Twitter threads that keep followers engaged' },
    { type: 'PINTEREST PIN TITLE AND DESCRIPTION', description: 'Create Pinterest content that drives traffic' },
    { type: 'TRENDING INSTAGRAM HASHTAGS', description: 'Generate trending hashtags to boost Instagram reach' },
    { type: 'TRENDING TWITTER HASHTAGS', description: 'Find trending hashtags to amplify Twitter engagement' },
    { type: 'ENGAGING QUESTIONS', description: 'Generate engaging questions for audience interaction' }
  ],
  'Sales and Marketing': [
    { type: 'LONG SALES COPY', description: 'Write long-form sales copy that converts prospects into customers' },
    { type: 'SHORT SALES COPY', description: 'Create concise sales copy that closes deals quickly' },
    { type: 'CALL TO ACTIONS', description: 'Create CTAs that compel action and skyrocket conversion rates' },
    { type: 'HEADLINES', description: 'Write headlines that grab attention and force people to read' },
    { type: 'PRODUCT DESCRIPTION', description: 'Write product descriptions that sell features and benefits' },
    { type: 'PAS FRAMEWORK', description: 'Use the Pain-Agitate-Solution framework to create compelling copy' },
    { type: 'AIDA FRAMEWORK', description: 'Create AIDA copy that guides prospects through the sales funnel' },
    { type: 'GUARANTEES', description: 'Write compelling guarantee statements that build customer confidence' },
    { type: 'OPTIN PAGES', description: 'Write persuasive opt-in page copy that converts visitors' },
    { type: 'FEATURE/BENEFIT LIST', description: 'Create compelling feature-benefit lists that sell' },
    { type: 'SUBHEADLINES', description: 'Write engaging subheadlines that guide readers through content' },
    { type: 'UNIQUE VALUE PROPOSITION', description: 'Craft clear UVPs that differentiate your offering' },
    { type: 'PRODUCT TITLES', description: 'Create eye-catching product titles that drive clicks' },
    { type: 'PRODUCT FEATURES/ BULLETS', description: 'Write compelling product bullet points that convert' },
    { type: 'REVIEW RESPONDER', description: 'Write professional responses to customer reviews' },
    { type: 'PRODUCT NAMES', description: 'Generate creative product names for your offerings' }
  ],
  'Video Content': [
    { type: 'YOUTUBE SCRIPT', description: 'Create YouTube scripts that engage viewers and grow your channel' },
    { type: 'YOUTUBE TITLES', description: 'Generate YouTube titles that increase views and improve rankings' },
    { type: 'YOUTUBE HOOKS', description: 'Create YouTube hooks that grab attention in the first 5 seconds' },
    { type: 'TIKTOK VIDEO SCRIPT', description: 'Create TikTok scripts that trend and build your following' },
    { type: 'TIKTOK VIDEO HOOKS', description: 'Write TikTok hooks that stop the scroll and increase watch time' },
    { type: 'PODCAST SCRIPT', description: 'Create podcast scripts that engage listeners and deliver value' },
    { type: 'PODCAST INTERVIEW QUESTIONS', description: 'Create engaging interview questions for podcast guests' },
    { type: 'MINI-VSL (VIDEO SALES LETTER)', description: 'Write compelling video sales letter scripts' },
    { type: 'DIGITAL PRODUCT VIDEO', description: 'Create engaging video scripts for digital products' },
    { type: 'PHYSICAL PRODUCT VIDEO', description: 'Write compelling video scripts for physical products' },
    { type: 'SHORT AD VIDEO', description: 'Create concise ad video scripts for maximum impact' },
    { type: 'TUTORIAL VIDEO', description: 'Write instructional video scripts that teach effectively' },
    { type: 'INFORMATIONAL VIDEO', description: 'Create educational video scripts that inform and engage' },
    { type: 'ANNOUNCEMENT VIDEO', description: 'Write announcement video scripts that create excitement' },
    { type: 'PHYSICAL PRODUCT TEXT TO VIDEO', description: 'Transform product descriptions into captivating text-to-video prompts that bring your products to life with AI-generated visuals' },
    { type: 'PHYSICAL PRODUCT PROMOTION VIDEO WITH VEO 3', description: 'Create cutting-edge promotional videos using Google VEO 3 technology for stunning AI-generated product showcases' },
    { type: 'PHYSICAL PRODUCT SCENE-BY-SCENE NARRATIVE PROMOTION VIDEO WITH VEO 3', description: 'Craft detailed scene-by-scene narratives for VEO 3 that tell compelling product stories through AI-generated video sequences' }
  ],
  'Email Marketing': [
    { type: 'EMAIL SUBJECT LINES', description: 'Write email subject lines that increase open rates' },
    { type: 'PRODUCT OR SERVICE PROMOTION', description: 'Create promotional emails that convert subscribers' },
    { type: 'COLD OUTREACH EMAILS', description: 'Create cold outreach emails that get responses' },
    { type: 'AUTORESPONDER SERIES', description: 'Build email sequences that nurture leads and drive conversions' },
    { type: 'NEWS ANNOUNCEMENT EMAIL', description: 'Write professional news announcement emails' },
    { type: 'PRODUCT UPDATES EMAIL', description: 'Create engaging product update emails' },
    { type: 'INFORMATIONAL EMAIL', description: 'Write educational emails that provide value' }
  ],
  'Articles and Blogs': [
    { type: 'Blog/Article Titles', description: 'Generate viral headlines that skyrocket your click-through rates' },
    { type: 'BLOG/ARTICLE IDEAS', description: 'Unlock endless content ideas that keep your audience engaged' },
    { type: 'BLOG/ARTICLE INTRO', description: 'Write irresistible introductions that grab attention' },
    { type: 'BLOG/ARTICLE OUTLINES', description: 'Structure your content like a pro with detailed outlines' },
    { type: 'SHORT BLOG/ARTICLE', description: 'Create concise, powerful articles that deliver maximum impact' },
    { type: 'Paragraph Script', description: 'Write SEO-optimized paragraphs with targeted keywords' }
  ],
  'SEO and Content': [
    { type: 'SEO META TAGS', description: 'Create SEO-optimized meta tags for better rankings' },
    { type: 'SEO META DESCRIPTIONS', description: 'Write compelling meta descriptions that drive clicks' },
    { type: 'KEYWORD RESEARCH', description: 'Conduct comprehensive keyword research for SEO optimization' },
    { type: 'KEYWORD EXTRACTOR', description: 'Extract relevant keywords from your content' },
    { type: 'CONTENT REWRITER', description: 'Rewrite content to create fresh, engaging pieces' },
    { type: 'REWRITE WITH KEYWORDS', description: 'Rewrite content while incorporating target keywords' },
    { type: 'ANALYZE GIVEN CONTENT', description: 'Analyze content to identify strengths and improvement opportunities' }
  ],
  'Business and Professional': [
    { type: 'COMPANY BIO', description: 'Create engaging company bios that showcase your brand story' },
    { type: 'PERSONAL BIO', description: 'Create captivating personal bios that stand out' },
    { type: 'BUSINESS LETTER', description: 'Create professional business letters for formal communication' },
    { type: 'COVER LETTER', description: 'Write compelling cover letters that land interviews' },
    { type: 'REFERENCE/RECOMMENDATION LETTER', description: 'Create strong recommendation letters that support applications' },
    { type: 'RESIGNATION LETTER', description: 'Write professional resignation letters that maintain relationships' },
    { type: 'THANK YOU LETTER', description: 'Create heartfelt thank you letters that show appreciation' },
    { type: 'APOLOGY LETTER', description: 'Write sincere apology letters that mend relationships' },
    { type: 'COMPLAINT LETTER', description: 'Create effective complaint letters that get results' },
    { type: 'INVITATION LETTER', description: 'Write warm invitation letters that encourage attendance' },
    { type: 'PERSONAL LETTER', description: 'Write warm personal letters that connect with recipients' }
  ],
  'Customer Support': [
    { type: 'GENERAL SUPPORT SCRIPT', description: 'Create helpful customer support scripts' },
    { type: 'PRODUCT/SERVICE ACCESS', description: 'Write clear access instructions for customers' },
    { type: 'SUPPORT SOLUTION FOR A PROBLEM', description: 'Create effective problem-solving support scripts' },
    { type: 'SUPPORT AUTORESPONDER MESSAGE', description: 'Write professional support autoresponder messages' }
  ],
  'Ebooks and Publishing': [
    { type: 'CREATE CHAPTERS AND TOC', description: 'Structure ebooks with detailed chapter outlines' },
    { type: 'CREATE CHAPTERS', description: 'Write detailed chapters for comprehensive ebooks' },
    { type: 'EBOOK CONCLUSION', description: 'Write powerful conclusions that leave lasting impressions' },
    { type: 'CREATE A DISCLAIMER', description: 'Create legal disclaimers that protect your content' },
    { type: 'EBOOK CALL TO ACTION', description: 'Generate compelling CTAs throughout your ebook' },
    { type: 'EBOOK AUTHOR BIO', description: 'Write engaging author bios that build credibility' }
  ],
  'Reviews and Analysis': [
    { type: 'DIGITAL PRODUCT REVIEW', description: 'Write comprehensive digital product reviews' },
    { type: 'PHYSICAL PRODUCT REVIEW', description: 'Create detailed physical product reviews' },
    { type: 'REVIEW RESPONDER', description: 'Write professional responses to customer reviews' }
  ],
  'Creative Writing': [
    { type: 'CREATIVE STORY', description: 'Write creative stories that captivate readers' },
    { type: 'SONG LYRICS', description: 'Write creative song lyrics in various genres' },
    { type: 'QUOTES GENERATOR', description: 'Create inspiring quotes for various themes' },
    { type: 'ANALOGY MAKER', description: 'Create powerful analogies that simplify complex concepts' }
  ],
  'Research and Ideas': [
    { type: 'NICHE IDEAS', description: 'Generate niche ideas for specific industries or topics' },
    { type: 'INVESTIGATE A PARTICULAR NICHE', description: 'Investigate niche markets for business opportunities' },
    { type: 'GENERATE BUSINESS IDEAS', description: 'Generate innovative business ideas for any industry' },
    { type: 'GENERATE DIGITAL PRODUCT IDEAS', description: 'Create digital product ideas that solve real problems' },
    { type: 'GENERATE PHYSICAL PRODUCT IDEAS', description: 'Develop physical product ideas for various markets' },
    { type: 'STARTUP IDEAS', description: 'Create innovative startup ideas for any industry' },
    { type: 'LISTICLE IDEAS', description: 'Generate listicle ideas for engaging content' },
    { type: 'GROWTH IDEAS', description: 'Generate business growth strategies and ideas' }
  ],
  'Business Planning': [
    { type: 'GENERATE A BUSINESS PLAN', description: 'Create comprehensive business plans for new ventures' },
    { type: 'GENERATE DOMAIN NAME IDEAS', description: 'Generate memorable domain names for your website' },
    { type: 'REAL ESTATE LISTING DESCRIPTIONS', description: 'Create compelling real estate listings' }
  ],
  'Content Tools': [
    { type: 'SUMMARIZE TEXT', description: 'Create concise summaries of longer content' },
    { type: 'CITATIONS GENERATOR', description: 'Generate proper citations in various formats' },
    { type: 'TONE CHANGER', description: 'Transform content tone while maintaining meaning' },
    { type: 'TRANSLATE', description: 'Translate content into different languages' },
    { type: 'CONCLUSION SCRIPT', description: 'Write powerful conclusions that leave lasting impressions' }
  ]
};

const categoryNames = Object.keys(categories);

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { isLicenseValid, licenseKey } = useLicense();
  const { scripts, addScript } = useScript();
  const [activeCategory, setActiveCategory] = useState('All Scripts');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [recentFormTypes, setRecentFormTypes] = useState<string[]>([]);

  useEffect(() => {
    // Load recent form types from AsyncStorage
    const loadRecentFormTypes = async () => {
      try {
        const storedFormsJson = await AsyncStorage.getItem('recent_form_types');
        if (storedFormsJson) {
          const recentForms = JSON.parse(storedFormsJson);
          setRecentFormTypes(recentForms);
        }
      } catch (e) {
        console.error('Failed to load recent form types', e);
      }
    };

    loadRecentFormTypes();
  }, []);

  // Refresh recent form types when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const loadRecentFormTypes = async () => {
        try {
          const storedFormsJson = await AsyncStorage.getItem('recent_form_types');
          if (storedFormsJson) {
            const recentForms = JSON.parse(storedFormsJson);
            setRecentFormTypes(recentForms);
          }
        } catch (e) {
          console.error('Failed to load recent form types', e);
        }
      };
      loadRecentFormTypes();
    });

    return unsubscribe;
  }, [navigation]);

  const handleFormTypeClick = (formType: string) => {
    if (!isLicenseValid) {
      Alert.alert(
        'License Required',
        'Please validate your license to access this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to License', onPress: () => navigation.navigate('License') }
        ]
      );
      return;
    }

    // Navigate to PromptForm with the selected form type
    navigation.navigate('PromptForm', { formType });
  };

  const getFilteredForms = () => {
    if (activeCategory === 'All Scripts') {
      // Return all forms from all categories
      const allForms = [];
      Object.keys(categories).forEach(category => {
        if (category !== 'All Scripts') {
          categories[category].forEach(form => {
            allForms.push({ ...form, category });
          });
        }
      });
      return allForms;
    } else {
      return categories[activeCategory] || [];
    }
  };

  const filteredForms = getFilteredForms().filter(form =>
    form.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedForms = filteredForms.slice(startIndex, endIndex);

  // Reset to page 1 when search term or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // Get form details for recent form types
  const getRecentFormDetails = () => {
    return recentFormTypes.map(formType => {
      // Find the form in categories
      for (const category of Object.keys(categories)) {
        const form = categories[category].find(f => f.type === formType);
        if (form) {
          return {
            type: form.type,
            description: form.description,
            category: category
          };
        }
      }
      return null;
    }).filter(Boolean);
  };

  const recentFormDetails = getRecentFormDetails();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView 
        style={[styles.scrollView, Platform.OS === 'web' && { height: '100vh' }]} 
        showsVerticalScrollIndicator={Platform.OS === 'web'}
        contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && { minHeight: '100%', paddingBottom: 120 }]}
        scrollEventThrottle={16}
        bounces={true}
        alwaysBounceVertical={false}
        scrollEnabled={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Fiddyscript</Text>
          <Text style={styles.headerSubtitle}>AI Content Assistant</Text>
        </View>

        {/* License Status */}
        <View style={styles.statusSection}>
          <View style={[styles.statusCard, { borderLeftColor: isLicenseValid ? '#4CAF50' : '#F44336' }]}>
            <View style={[styles.statusIndicator, { backgroundColor: isLicenseValid ? '#4CAF50' : '#F44336' }]}>
              <Text style={styles.statusText}>
                {isLicenseValid ? '✓ Licensed' : '✗ License Required'}
              </Text>
            </View>
            {licenseKey && (
              <Text style={styles.licenseKeyText}>License: {licenseKey}</Text>
            )}
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Search Scripts</Text>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search scripts, categories, or descriptions..."
              placeholderTextColor="#999"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {searchTerm.length > 0 && (
              <TouchableOpacity onPress={() => setSearchTerm('')}>
                <Text style={styles.clearSearch}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Recent Scripts Used */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Scripts Used</Text>
          {recentFormDetails.length > 0 ? (
            <View style={styles.recentScriptsList}>
              {recentFormDetails.map((form, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.recentScriptItem}
                  onPress={() => handleFormTypeClick(form.type)}
                  activeOpacity={0.7}
                  delayPressIn={0}
                >
                  <Text style={styles.recentScriptTitle}>{form.type}</Text>
                  <Text style={styles.recentScriptCategory}>📁 {form.category}</Text>
                  <Text style={styles.recentScriptDescription}>{form.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎯</Text>
              <Text style={styles.emptyTitle}>No forms used yet</Text>
              <Text style={styles.emptyDescription}>
                Use your first form to get started
              </Text>
            </View>
          )}
        </View>

        {/* Category Tabs */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryTabs}
            scrollEnabled
          >
            {categoryNames.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  activeCategory === category && styles.activeCategoryTab
                ]}
                onPress={() => setActiveCategory(category)}
                activeOpacity={0.7}
                delayPressIn={0}
              >
                <Text style={[
                  styles.categoryTabText,
                  activeCategory === category && styles.activeCategoryTabText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Scripts Grid */}
        <View style={styles.scriptsSection}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'All Scripts' ? 'All Scripts' : activeCategory}
            {searchTerm && ` - Search Results`}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredForms.length} scripts available
          </Text>
          
          <View style={styles.scriptsGrid}>
            {paginatedForms.map((form, index) => (
              <TouchableOpacity
                key={`${form.type}-${index}`}
                style={styles.scriptCard}
                onPress={() => handleFormTypeClick(form.type)}
                activeOpacity={0.7}
                delayPressIn={0}
              >
                <View style={styles.scriptCardHeader}>
                  <Text style={styles.scriptType}>{form.type}</Text>
                  {activeCategory === 'All Scripts' && (
                    <Text style={styles.scriptCategory}>📁 {form.category}</Text>
                  )}
                </View>
                <Text style={styles.scriptDescription}>{form.description}</Text>
                <View style={styles.scriptCardFooter}>
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => handleFormTypeClick(form.type)}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Text style={[styles.paginationButtonText, currentPage === 1 && styles.paginationButtonTextDisabled]}>
                  ← Previous
                </Text>
              </TouchableOpacity>
              
              <View style={styles.paginationInfo}>
                <Text style={styles.paginationText}>
                  Page {currentPage} of {totalPages}
                </Text>
              </View>
              
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <Text style={[styles.paginationButtonText, currentPage === totalPages && styles.paginationButtonTextDisabled]}>
                  Next →
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>



        {/* Scripts Navigation Button */}
        <View style={styles.scriptsSection}>
          <TouchableOpacity
            style={styles.scriptsButton}
            onPress={() => navigation.navigate('Scripts')}
          >
            <Text style={styles.scriptsButtonIcon}>📝</Text>
            <Text style={styles.scriptsButtonTitle}>Scripts & Forms</Text>
            <Text style={styles.scriptsButtonSubtitle}>Browse all content types</Text>
          </TouchableOpacity>
        </View>

                            {/* Text to Speech Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('TextToSpeech')}
                      >
                        <Text style={styles.scriptsButtonIcon}>🔊</Text>
                        <Text style={styles.scriptsButtonTitle}>Text to Speech</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Convert text to audio</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Humanizer Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('Humanizer')}
                      >
                        <Text style={styles.scriptsButtonIcon}>🎭</Text>
                        <Text style={styles.scriptsButtonTitle}>Content Humanizer</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Make AI content more human-like</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Tutorials Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('Tutorials')}
                      >
                        <Text style={styles.scriptsButtonIcon}>📚</Text>
                        <Text style={styles.scriptsButtonTitle}>Tutorials</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Learn with video guides</Text>
                      </TouchableOpacity>
                    </View>

                    {/* License Info Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('LicenseInfo')}
                      >
                        <Text style={styles.scriptsButtonIcon}>🔐</Text>
                        <Text style={styles.scriptsButtonTitle}>License Info</Text>
                        <Text style={styles.scriptsButtonSubtitle}>View license details & status</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Help Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('Help')}
                      >
                        <Text style={styles.scriptsButtonIcon}>🆘</Text>
                        <Text style={styles.scriptsButtonTitle}>Help & Support</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Get help & send feedback</Text>
                      </TouchableOpacity>
                    </View>

                    {/* User Profile Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('UserProfile')}
                      >
                        <Text style={styles.scriptsButtonIcon}>👤</Text>
                        <Text style={styles.scriptsButtonTitle}>User Profile</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Manage your role & permissions</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Settings Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('Settings')}
                      >
                        <Text style={styles.scriptsButtonIcon}>⚙️</Text>
                        <Text style={styles.scriptsButtonTitle}>Settings</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Configure app & API keys</Text>
                      </TouchableOpacity>
                    </View>

        {/* Browser Section */}
        <BrowserSection 
          title="Quick Web Access"
          description="Access research tools and content creation platforms"
          showBookmarks={true}
        />
      </ScrollView>
    </SafeAreaView>
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
  scrollContent: {
    paddingBottom: Platform.OS === 'web' ? 100 : 20,
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
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
  statusSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  licenseKeyText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearSearch: {
    fontSize: 18,
    color: '#999',
    padding: 4,
  },
  categorySection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryTabs: {
    flexDirection: 'row',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCategoryTab: {
    backgroundColor: '#007AFF',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scriptsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  scriptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scriptCard: {
    width: '48%',
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
  scriptCardHeader: {
    marginBottom: 8,
  },
  scriptType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  scriptCategory: {
    fontSize: 12,
    color: '#666',
  },
  scriptDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  scriptCardFooter: {
    alignItems: 'flex-end',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  recentScriptsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentScriptItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 4,
  },
  recentScriptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recentScriptCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  recentScriptDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    lineHeight: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // Pagination Styles
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paginationButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  paginationButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationButtonTextDisabled: {
    color: '#999',
  },
  paginationInfo: {
    alignItems: 'center',
  },
  paginationText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  scriptsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scriptsButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scriptsButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  scriptsButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  scriptsButtonSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen; 