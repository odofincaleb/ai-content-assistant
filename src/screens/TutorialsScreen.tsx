import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeKovDiz4uC2FFs1Gw_4AS3oPAlJPrCImwDhMelezgS3CeAsD1uyxmdr5wzkt6o-Q9Y1mDnYCVF1Jf/pub?gid=0&single=true&output=csv';

interface Video {
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
}

function parseCSV(csv: string): Video[] {
  console.log('Tutorials: Raw CSV data:', csv);
  const lines = csv.trim().split('\n');
  console.log('Tutorials: CSV lines:', lines);
  
  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(',').map(h => {
    const cleanHeader = h.trim().toLowerCase();
    // Handle special cases like "thumbnail (optional)" -> "thumbnail"
    if (cleanHeader.includes('thumbnail')) {
      return 'thumbnail';
    }
    return cleanHeader;
  });
  console.log('Tutorials: Parsed headers:', headers);
  
  return dataLines.map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    console.log(`Tutorials: Line ${index} values:`, values);
    
    const obj: any = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || '';
    });
    
    console.log(`Tutorials: Parsed object ${index}:`, obj);
    return obj as Video;
  });
}

function getVideoEmbedUrl(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.match(/(?:v=|youtu.be\/)([\w-]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}?enablejsapi=1&rel=0&modestbranding=1` : url;
  }
  if (url.includes('vimeo.com')) {
    const id = url.match(/vimeo.com\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}?h=hash&dnt=1` : url;
  }
  return url;
}

// Helper to extract YouTube video ID
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu.be\/)([\w-]+)/);
  return match ? match[1] : null;
}

// Helper to get fallback thumbnail
function getFallbackThumbnail(video: Video): string | null {
  if (video.thumbnail && /\.(jpg|jpeg|png|webp|gif)$/i.test(video.thumbnail)) {
    return video.thumbnail;
  }
  if (video.url && (video.url.includes('youtube.com') || video.url.includes('youtu.be'))) {
    const id = getYouTubeId(video.url);
    if (id) {
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
  }
  return null;
}

const TutorialsScreen = () => {
  const navigation = useNavigation();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const styles = getStyles(theme);

  useEffect(() => {
    console.log('Tutorials: Fetching CSV data from:', CSV_URL);
    
    // Add timeout and better error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    fetch(CSV_URL, { 
      signal: controller.signal,
      mode: 'cors',
      headers: {
        'Accept': 'text/csv,text/plain,*/*'
      }
    })
      .then(res => {
        console.log('Tutorials: CSV response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then(csv => {
        console.log('Tutorials: CSV data received:', csv.substring(0, 200) + '...');
        const parsedVideos = parseCSV(csv);
        console.log('Tutorials: Parsed videos:', parsedVideos);
        setVideos(parsedVideos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Tutorials: Error fetching CSV:', error);
        setLoading(false);
        
        // Show user-friendly error message and fallback data
        console.log('Tutorials: Using fallback data due to fetch error');
        
        // Add some sample data for testing
        setVideos([
          {
            title: 'How to Use Fiddyscript',
            description: 'Quick start guide for getting started with Fiddyscript AI Content Assistant',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
          },
          {
            title: 'Cold Calling Playbook',
            description: 'Complete cold calling training and techniques for sales professionals',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
          },
          {
            title: 'Sales Techniques Masterclass',
            description: 'Advanced sales strategies and techniques for closing deals',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg'
          },
          {
            title: 'Content Creation Tips',
            description: 'Learn how to create engaging content with AI assistance',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/sddefault.jpg'
          },
          {
            title: 'Marketing Strategies',
            description: 'Digital marketing strategies and best practices',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
          },
          {
            title: 'SEO Optimization Guide',
            description: 'Search engine optimization techniques and tips',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
          }
        ]);
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });
  }, []);

  const handleVideoPress = (video: Video) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideo(null);
  };

  const renderVideoCard = (video: Video, index: number) => {
    const fallbackThumb = getFallbackThumbnail(video);
    
    return (
      <TouchableOpacity
        key={index}
        style={styles.videoCard}
        onPress={() => handleVideoPress(video)}
      >
        <View style={styles.thumbnailContainer}>
          {fallbackThumb ? (
            <Image
              source={{ uri: fallbackThumb }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderThumbnail}>
              <Ionicons name="play-circle" size={40} color="#999" />
            </View>
          )}
          <View style={styles.playButton}>
            <Ionicons name="play" size={20} color="#fff" />
          </View>
        </View>
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.videoDescription} numberOfLines={3}>
            {video.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
        <Text style={styles.headerTitle}>Tutorials</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading tutorials...</Text>
          </View>
        ) : (
          <View style={styles.videosGrid}>
            {videos.map((video, index) => renderVideoCard(video, index))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {selectedVideo?.title}
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          {selectedVideo && (
            <View style={styles.videoContainer}>
              <WebView
                source={{ uri: getVideoEmbedUrl(selectedVideo.url) }}
                style={styles.webView}
                allowsFullscreenVideo={true}
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => (
                  <View style={styles.webViewLoading}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                  </View>
                )}
              />
              
              <View style={styles.videoDetails}>
                <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
                <Text style={styles.videoDescription}>{selectedVideo.description}</Text>
              </View>
            </View>
          )}
        </SafeAreaView>
      </Modal>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  videosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  videoCard: {
    width: (screenWidth - 55) / 2, // 2 columns with gap and padding
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: 100,
    backgroundColor: '#f5f5f5',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  placeholderThumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
    lineHeight: 18,
  },
  videoDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#000',
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
    backgroundColor: '#000',
  },
  webViewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoDetails: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default TutorialsScreen;
