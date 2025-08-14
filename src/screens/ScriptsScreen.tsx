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
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLicense } from '../contexts/LicenseContext';

// Special Categories from Desktop Sidebar (17 categories)
const scriptCategories = [
  {
    id: 'advertisements',
    name: 'Advertisements',
    icon: '📢',
    description: 'Create compelling ad copy for all platforms',
    formTypes: [
      { id: 'linkedin_ads', name: 'LinkedIn Ads', description: 'Crush your B2B competition with laser-targeted professional ad copy' },
      { id: 'facebook_ads', name: 'Facebook Ads', description: 'Create Facebook ads that stop the scroll and convert browsers into buyers' },
      { id: 'google_ads', name: 'Google Ads', description: 'Write Google ads that dominate search results and drive qualified traffic' },
      { id: 'general_advertisement', name: 'General Advertisement', description: 'Craft versatile ad copy that works across all platforms' },
      { id: 'amazon_sponsored_brand_ads', name: 'Amazon Sponsored Brand Ads Headline', description: 'Write Amazon ad headlines that dominate search results' },
      { id: 'amazon_product_titles', name: 'Amazon Product Titles', description: 'Create Amazon product titles that rank higher and convert better' },
      { id: 'facebook_ad_video', name: 'Facebook Ad Video', description: 'Create Facebook ad video scripts that convert' },
      { id: 'short_ad_video', name: 'Short Ad Video', description: 'Create concise ad video scripts for maximum impact' },
    ]
  },
  {
    id: 'articles_blogs',
    name: 'Articles & Blogs',
    icon: '📝',
    description: 'Create engaging blog posts and articles',
    formTypes: [
      { id: 'blog_titles', name: 'Blog/Article Titles', description: 'Generate viral headlines that skyrocket your click-through rates' },
      { id: 'blog_ideas', name: 'Blog/Article Ideas', description: 'Unlock endless content ideas that keep your audience engaged' },
      { id: 'blog_intro', name: 'Blog/Article Intro', description: 'Write irresistible introductions that grab attention' },
      { id: 'blog_outlines', name: 'Blog/Article Outlines', description: 'Structure your content like a pro with detailed outlines' },
      { id: 'short_blog', name: 'Short Blog/Article', description: 'Create concise, powerful articles that deliver maximum impact' },
      { id: 'paragraph_script', name: 'Paragraph Script', description: 'Write SEO-optimized paragraphs with targeted keywords' },
    ]
  },
  {
    id: 'customer_service',
    name: 'Customer Service',
    icon: '🎧',
    description: 'Create effective customer support scripts',
    formTypes: [
      { id: 'general_support', name: 'General Support Script', description: 'Create helpful customer support scripts' },
      { id: 'product_access', name: 'Product/Service Access', description: 'Write clear access instructions for customers' },
      { id: 'support_solution', name: 'Support Solution for a Problem', description: 'Create effective problem-solving support scripts' },
      { id: 'support_autoresponder', name: 'Support Autoresponder Message', description: 'Write professional support autoresponder messages' },
    ]
  },
  {
    id: 'ebooks',
    name: 'Ebooks',
    icon: '📚',
    description: 'Create comprehensive ebooks and digital books',
    formTypes: [
      { id: 'find_niche', name: 'Find a Niche', description: 'Discover profitable niches for your ebook' },
      { id: 'ebook_idea', name: 'Get an Ebook Idea', description: 'Generate compelling ebook ideas that sell' },
      { id: 'create_chapters_toc', name: 'Create Chapters and TOC', description: 'Structure ebooks with detailed chapter outlines' },
      { id: 'create_chapters', name: 'Create Chapters', description: 'Write detailed chapters for comprehensive ebooks' },
      { id: 'ebook_conclusion', name: 'Ebook Conclusion', description: 'Write powerful conclusions that leave lasting impressions' },
      { id: 'create_disclaimer', name: 'Create a Disclaimer', description: 'Create legal disclaimers that protect your content' },
      { id: 'ebook_cta', name: 'Ebook Call to Action', description: 'Generate compelling CTAs throughout your ebook' },
      { id: 'ebook_author_bio', name: 'Ebook Author Bio', description: 'Write engaging author bios that build credibility' },
    ]
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce',
    icon: '🛒',
    description: 'Create compelling ecommerce content',
    formTypes: [
      { id: 'product_description', name: 'Product Description', description: 'Write product descriptions that sell features and benefits' },
      { id: 'product_titles', name: 'Product Titles', description: 'Create eye-catching product titles that drive clicks' },
      { id: 'product_features', name: 'Product Features/Bullets', description: 'Write compelling product bullet points that convert' },
      { id: 'product_names', name: 'Product Names', description: 'Generate creative product names for your offerings' },
      { id: 'amazon_listing', name: 'Amazon Listing Descriptions', description: 'Create compelling Amazon product listings' },
    ]
  },
  {
    id: 'emails',
    name: 'Emails',
    icon: '📧',
    description: 'Create effective email marketing campaigns',
    formTypes: [
      { id: 'email_subject_lines', name: 'Email Subject Lines', description: 'Write email subject lines that increase open rates' },
      { id: 'product_promotion', name: 'Product or Service Promotion', description: 'Create promotional emails that convert subscribers' },
      { id: 'cold_outreach', name: 'Cold Outreach Emails', description: 'Create cold outreach emails that get responses' },
      { id: 'autoresponder_series', name: 'Autoresponder Series', description: 'Build email sequences that nurture leads and drive conversions' },
      { id: 'news_announcement', name: 'News Announcement Email', description: 'Write professional news announcement emails' },
      { id: 'product_updates', name: 'Product Updates Email', description: 'Create engaging product update emails' },
      { id: 'informational_email', name: 'Informational Email', description: 'Write educational emails that provide value' },
    ]
  },
  {
    id: 'letters',
    name: 'Letters',
    icon: '✉️',
    description: 'Create professional letters for various purposes',
    formTypes: [
      { id: 'business_letter', name: 'Business Letter', description: 'Create professional business letters for formal communication' },
      { id: 'cover_letter', name: 'Cover Letter', description: 'Write compelling cover letters that land interviews' },
      { id: 'reference_letter', name: 'Reference/Recommendation Letter', description: 'Create strong recommendation letters that support applications' },
      { id: 'resignation_letter', name: 'Resignation Letter', description: 'Write professional resignation letters that maintain relationships' },
      { id: 'thank_you_letter', name: 'Thank You Letter', description: 'Create heartfelt thank you letters that show appreciation' },
      { id: 'apology_letter', name: 'Apology Letter', description: 'Write sincere apology letters that mend relationships' },
      { id: 'complaint_letter', name: 'Complaint Letter', description: 'Create effective complaint letters that get results' },
      { id: 'invitation_letter', name: 'Invitation Letter', description: 'Write warm invitation letters that encourage attendance' },
      { id: 'personal_letter', name: 'Personal Letter', description: 'Write warm personal letters that connect with recipients' },
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: '📈',
    description: 'Create powerful marketing content',
    formTypes: [
      { id: 'long_sales_copy', name: 'Long Sales Copy', description: 'Write long-form sales copy that converts prospects into customers' },
      { id: 'short_sales_copy', name: 'Short Sales Copy', description: 'Create concise sales copy that closes deals quickly' },
      { id: 'call_to_actions', name: 'Call to Actions', description: 'Create CTAs that compel action and skyrocket conversion rates' },
      { id: 'headlines', name: 'Headlines', description: 'Write headlines that grab attention and force people to read' },
      { id: 'pas_framework', name: 'PAS Framework', description: 'Use the Pain-Agitate-Solution framework to create compelling copy' },
      { id: 'aida_framework', name: 'AIDA Framework', description: 'Create AIDA copy that guides prospects through the sales funnel' },
      { id: 'guarantees', name: 'Guarantees', description: 'Write compelling guarantee statements that build customer confidence' },
      { id: 'optin_pages', name: 'Opt-in Pages', description: 'Write persuasive opt-in page copy that converts visitors' },
      { id: 'feature_benefit_list', name: 'Feature/Benefit List', description: 'Create compelling feature-benefit lists that sell' },
      { id: 'subheadlines', name: 'Subheadlines', description: 'Write engaging subheadlines that guide readers through content' },
      { id: 'unique_value_proposition', name: 'Unique Value Proposition', description: 'Craft clear UVPs that differentiate your offering' },
      { id: 'review_responder', name: 'Review Responder', description: 'Write professional responses to customer reviews' },
    ]
  },
  {
    id: 'other',
    name: 'Other',
    icon: '🔧',
    description: 'Miscellaneous content creation tools',
    formTypes: [
      { id: 'summarize_text', name: 'Summarize Text', description: 'Create concise summaries of longer content' },
      { id: 'citations_generator', name: 'Citations Generator', description: 'Generate proper citations in various formats' },
      { id: 'tone_changer', name: 'Tone Changer', description: 'Transform content tone while maintaining meaning' },
      { id: 'translate', name: 'Translate', description: 'Translate content into different languages' },
      { id: 'conclusion_script', name: 'Conclusion Script', description: 'Write powerful conclusions that leave lasting impressions' },
    ]
  },
  {
    id: 'podcasts',
    name: 'Podcasts',
    icon: '🎙️',
    description: 'Create engaging podcast content',
    formTypes: [
      { id: 'podcast_script', name: 'Podcast Script', description: 'Create podcast scripts that engage listeners and deliver value' },
      { id: 'podcast_interview_questions', name: 'Podcast Interview Questions', description: 'Create engaging interview questions for podcast guests' },
    ]
  },
  {
    id: 'press_releases',
    name: 'Press Releases',
    icon: '📰',
    description: 'Create professional press releases',
    formTypes: [
      { id: 'press_release', name: 'Press Release', description: 'Write professional press releases that get media attention' },
    ]
  },
  {
    id: 'research',
    name: 'Research',
    icon: '🔍',
    description: 'Research and analysis tools',
    formTypes: [
      { id: 'niche_ideas', name: 'Niche Ideas', description: 'Generate niche ideas for specific industries or topics' },
      { id: 'investigate_niche', name: 'Investigate a Particular Niche', description: 'Investigate niche markets for business opportunities' },
      { id: 'generate_business_ideas', name: 'Generate Business Ideas', description: 'Generate innovative business ideas for any industry' },
      { id: 'generate_digital_product_ideas', name: 'Generate Digital Product Ideas', description: 'Create digital product ideas that solve real problems' },
      { id: 'generate_physical_product_ideas', name: 'Generate Physical Product Ideas', description: 'Develop physical product ideas for various markets' },
      { id: 'startup_ideas', name: 'Startup Ideas', description: 'Create innovative startup ideas for any industry' },
      { id: 'listicle_ideas', name: 'Listicle Ideas', description: 'Generate listicle ideas for engaging content' },
      { id: 'growth_ideas', name: 'Growth Ideas', description: 'Generate business growth strategies and ideas' },
      { id: 'generate_business_plan', name: 'Generate a Business Plan', description: 'Create comprehensive business plans for new ventures' },
      { id: 'generate_domain_name_ideas', name: 'Generate Domain Name Ideas', description: 'Generate memorable domain names for your website' },
      { id: 'real_estate_listing', name: 'Real Estate Listing Descriptions', description: 'Create compelling real estate listings' },
    ]
  },
  {
    id: 'reviews',
    name: 'Reviews',
    icon: '⭐',
    description: 'Create compelling product reviews',
    formTypes: [
      { id: 'digital_product_review', name: 'Digital Product Review', description: 'Write comprehensive digital product reviews' },
      { id: 'physical_product_review', name: 'Physical Product Review', description: 'Create detailed physical product reviews' },
    ]
  },
  {
    id: 'rewriter',
    name: 'Rewriter',
    icon: '🔄',
    description: 'Rewrite and improve existing content',
    formTypes: [
      { id: 'content_rewriter', name: 'Content Rewriter', description: 'Rewrite content to create fresh, engaging pieces' },
      { id: 'rewrite_with_keywords', name: 'Rewrite with Keywords', description: 'Rewrite content while incorporating target keywords' },
      { id: 'analyze_given_content', name: 'Analyze Given Content', description: 'Analyze content to identify strengths and improvement opportunities' },
    ]
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: '🎯',
    description: 'Create SEO-optimized content',
    formTypes: [
      { id: 'seo_meta_tags', name: 'SEO Meta Tags', description: 'Create SEO-optimized meta tags for better rankings' },
      { id: 'seo_meta_descriptions', name: 'SEO Meta Descriptions', description: 'Write compelling meta descriptions that drive clicks' },
      { id: 'keyword_research', name: 'Keyword Research', description: 'Conduct comprehensive keyword research for SEO optimization' },
      { id: 'keyword_extractor', name: 'Keyword Extractor', description: 'Extract relevant keywords from your content' },
    ]
  },
  {
    id: 'social_media',
    name: 'Social Media',
    icon: '📱',
    description: 'Create engaging social media content',
    formTypes: [
      { id: 'linkedin_post', name: 'LinkedIn Post', description: 'Generate LinkedIn posts that establish thought leadership' },
      { id: 'instagram_caption', name: 'Instagram Caption', description: 'Write Instagram captions that increase engagement' },
      { id: 'instagram_reels', name: 'Instagram Reels', description: 'Create Reels scripts that go viral and skyrocket your reach' },
      { id: 'twitter_tweet', name: 'Twitter Tweet', description: 'Craft tweets that trend and amplify your message' },
      { id: 'twitter_series', name: 'Twitter Series', description: 'Build Twitter threads that keep followers engaged' },
      { id: 'pinterest_pin', name: 'Pinterest Pin Title and Description', description: 'Create Pinterest content that drives traffic' },
      { id: 'trending_instagram_hashtags', name: 'Trending Instagram Hashtags', description: 'Generate trending hashtags to boost Instagram reach' },
      { id: 'trending_twitter_hashtags', name: 'Trending Twitter Hashtags', description: 'Find trending hashtags to amplify Twitter engagement' },
      { id: 'engaging_questions', name: 'Engaging Questions', description: 'Generate engaging questions for audience interaction' },
    ]
  },
  {
    id: 'video_scripts',
    name: 'Video Scripts',
    icon: '🎥',
    description: 'Create compelling video content',
    formTypes: [
      { id: 'youtube_script', name: 'YouTube Script', description: 'Create YouTube scripts that engage viewers and grow your channel' },
      { id: 'youtube_titles', name: 'YouTube Titles', description: 'Generate YouTube titles that increase views and improve rankings' },
      { id: 'youtube_hooks', name: 'YouTube Hooks', description: 'Create YouTube hooks that grab attention in the first 5 seconds' },
      { id: 'youtube_outlines', name: 'YouTube Outlines', description: 'Structure YouTube videos with detailed outlines' },
      { id: 'youtube_shorts', name: 'YouTube Shorts', description: 'Create engaging YouTube Shorts scripts' },
      { id: 'youtube_descriptions', name: 'YouTube Descriptions', description: 'Write search-optimized YouTube descriptions' },
      { id: 'youtube_hashtags', name: 'YouTube Hashtags', description: 'Generate trending hashtags for YouTube videos' },
      { id: 'youtube_tags', name: 'YouTube Tags', description: 'Create effective tags for YouTube search optimization' },
      { id: 'tiktok_video_script', name: 'TikTok Video Script', description: 'Create TikTok scripts that trend and build your following' },
      { id: 'tiktok_video_hooks', name: 'TikTok Video Hooks', description: 'Write TikTok hooks that stop the scroll and increase watch time' },
      { id: 'tiktok_video_ideas', name: 'TikTok Video Ideas', description: 'Generate creative TikTok video ideas that resonate' },
      { id: 'mini_vsl', name: 'Mini-VSL (Video Sales Letter)', description: 'Write compelling video sales letter scripts' },
      { id: 'digital_product_video', name: 'Digital Product Video', description: 'Create engaging video scripts for digital products' },
      { id: 'physical_product_video', name: 'Physical Product Video', description: 'Write compelling video scripts for physical products' },
      { id: 'physical_product_text_to_video', name: 'Physical Product Text to Video', description: 'Create text-to-video prompts for physical products' },
      { id: 'physical_product_promotion_video_veo3', name: 'Physical Product Promotion Video with VEO 3', description: 'Create VEO 3 promotional videos for physical products' },
      { id: 'physical_product_scene_by_scene_veo3', name: 'Physical Product Scene-by-Scene Narrative with VEO 3', description: 'Create scene-by-scene VEO 3 narratives for physical products' },
      { id: 'tutorial_video', name: 'Tutorial Video', description: 'Write instructional video scripts that teach effectively' },
      { id: 'informational_video', name: 'Informational Video', description: 'Create educational video scripts that inform and engage' },
      { id: 'announcement_video', name: 'Announcement Video', description: 'Write announcement video scripts that create excitement' },
      { id: 'amazon_video_script', name: 'Amazon Video Script', description: 'Create compelling Amazon video scripts for product promotion' },
    ]
  }
];

const ScriptsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { isLicenseValid } = useLicense();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showFormTypesModal, setShowFormTypesModal] = useState(false);

  useEffect(() => {
    const openCategoryId = (route.params as any)?.openCategoryId;
    if (openCategoryId) {
      const category = scriptCategories.find(c => c.id === openCategoryId);
      if (category) {
        setSelectedCategory(category);
        setShowFormTypesModal(true);
      }
      // clear the param to avoid reopening repeatedly
      navigation.setParams({ openCategoryId: undefined } as any);
    }
  }, [route.params]);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setShowFormTypesModal(true);
  };

  const handleFormTypeClick = (formType: any) => {
    if (!isLicenseValid) {
      Alert.alert(
        'License Required',
        'Please validate your license to access this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to License', onPress: () => navigation.navigate('License' as never) }
        ]
      );
      return;
    }

    setShowFormTypesModal(false);
    // Navigate to PromptForm with the selected form type
    navigation.navigate('PromptForm' as never, {
      formType: formType.name,
      formTypeId: formType.id,
      category: selectedCategory.name,
      categoryId: selectedCategory.id,
    } as never);
  };

  const getFilteredCategories = () => {
    if (!searchTerm) return scriptCategories;

    return scriptCategories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.formTypes.some(formType => 
        formType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formType.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredCategories = getFilteredCategories();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scripts & Forms</Text>
          <Text style={styles.headerSubtitle}>Choose a category to get started</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search categories or form types..."
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

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryClick(category)}
            >
              <View style={styles.categoryIconContainer}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <Text style={styles.formTypeCount}>{category.formTypes.length} form types</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Form Types Modal */}
        <Modal
          visible={showFormTypesModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFormTypesModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedCategory?.name}</Text>
              <Text style={styles.modalSubtitle}>Select a form type</Text>
            </View>

            <ScrollView style={styles.modalContent}>
              {selectedCategory?.formTypes.map((formType: any) => (
                <TouchableOpacity
                  key={formType.id}
                  style={styles.formTypeCard}
                  onPress={() => handleFormTypeClick(formType)}
                >
                  <View style={styles.formTypeHeader}>
                    <Text style={styles.formTypeName}>{formType.name}</Text>
                  </View>
                  <Text style={styles.formTypeDescription}>{formType.description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  clearSearch: {
    fontSize: 18,
    color: '#999',
    padding: 5,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  categoryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  formTypeCount: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
    backgroundColor: '#2a2a2a',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#cccccc',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formTypeCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  formTypeHeader: {
    marginBottom: 8,
  },
  formTypeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  formTypeDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
});

export default ScriptsScreen;
