import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Linking } from 'react-native';

interface BookmarkTab {
  id: string;
  title: string;
  url: string;
  icon: string;
  category: string;
}

interface BrowserSectionProps {
  title?: string;
  description?: string;
  showBookmarks?: boolean;
}

const BrowserSection: React.FC<BrowserSectionProps> = ({
  title = 'AI Tools',
  description = 'Quick access to AI tools and platforms for content creation',
  showBookmarks = true,
}) => {
  // AI Website bookmarks matching the main desktop app
  const bookmarkTabs: BookmarkTab[] = [
    // AI Tools (matching desktop app)
    {
      id: 'chatgpt',
      title: 'ChatGPT',
      url: 'https://chatgpt.com/',
      icon: '🤖',
      category: 'AI Tools'
    },
    {
      id: 'grok',
      title: 'Grok',
      url: 'https://grok.com/',
      icon: '🧠',
      category: 'AI Tools'
    },
    {
      id: 'perplexity',
      title: 'Perplexity',
      url: 'https://www.perplexity.ai/',
      icon: '🔍',
      category: 'AI Tools'
    },
    {
      id: 'deepseek',
      title: 'Deepseek',
      url: 'https://chat.deepseek.com/',
      icon: '🔬',
      category: 'AI Tools'
    },
    {
      id: 'meta',
      title: 'Meta',
      url: 'https://www.meta.ai/',
      icon: '📘',
      category: 'AI Tools'
    },
    {
      id: 'gemini',
      title: 'Gemini',
      url: 'https://gemini.google.com/app',
      icon: '💎',
      category: 'AI Tools'
    },
    {
      id: 'flow-veo-3',
      title: 'Flow VEO 3',
      url: 'https://labs.google/flow/about',
      icon: '🎬',
      category: 'AI Tools'
    },
    {
      id: 'midjourney',
      title: 'Midjourney',
      url: 'https://www.midjourney.com/',
      icon: '🎨',
      category: 'AI Tools'
    }
  ];

  const openUrl = async (url: string, title: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'Cannot Open URL',
          `Unable to open ${title}. Please check the URL and try again.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        `Failed to open ${title}. Please try again.`,
        [{ text: 'OK' }]
      );
    }
  };

  const getBookmarksByCategory = () => {
    const categories: { [key: string]: BookmarkTab[] } = {};
    bookmarkTabs.forEach(tab => {
      if (!categories[tab.category]) {
        categories[tab.category] = [];
      }
      categories[tab.category].push(tab);
    });
    return categories;
  };

  const renderBookmarkTab = (tab: BookmarkTab) => (
    <TouchableOpacity
      key={tab.id}
      style={styles.bookmarkTab}
      onPress={() => openUrl(tab.url, tab.title)}
    >
      <Text style={styles.bookmarkIcon}>{tab.icon}</Text>
      <Text style={styles.bookmarkTitle}>{tab.title}</Text>
    </TouchableOpacity>
  );

  const renderCategory = (category: string, tabs: BookmarkTab[]) => (
    <View key={category} style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.bookmarkGrid}>
        {tabs.map(renderBookmarkTab)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Quick Access Button */}
      <TouchableOpacity
        style={styles.quickAccessButton}
        onPress={() => openUrl('https://www.google.com', 'Google')}
      >
        <Text style={styles.quickAccessIcon}>🌐</Text>
        <Text style={styles.quickAccessText}>Quick Web Search</Text>
      </TouchableOpacity>

              {/* Bookmark Tabs */}
        {showBookmarks && (
          <View style={styles.bookmarksSection}>
            <Text style={styles.bookmarksTitle}>AI Tools</Text>
          <ScrollView style={styles.bookmarksContainer} showsVerticalScrollIndicator={false}>
            {Object.entries(getBookmarksByCategory()).map(([category, tabs]) =>
              renderCategory(category, tabs)
            )}
          </ScrollView>
        </View>
      )}

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 AI Tools Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Use ChatGPT for text generation and editing</Text>
          <Text style={styles.tipItem}>• Try Perplexity for research and fact-checking</Text>
          <Text style={styles.tipItem}>• Use Midjourney for image generation</Text>
          <Text style={styles.tipItem}>• Experiment with different AI tools for best results</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAccessIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  quickAccessText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookmarksSection: {
    paddingHorizontal: 16,
  },
  bookmarksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bookmarksContainer: {
    maxHeight: 400,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bookmarkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookmarkTab: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: '30%', // 3 columns with some spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bookmarkIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  bookmarkTitle: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 4,
  },
  tipsSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tipsList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  tipItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default BrowserSection; 