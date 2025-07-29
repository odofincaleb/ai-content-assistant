import React, { useEffect, useState, useRef } from 'react';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeKovDiz4uC2FFs1Gw_4AS3oPAlJPrCImwDhMelezgS3CeAsD1uyxmdr5wzkt6o-Q9Y1mDnYCVF1Jf/pub?gid=0&single=true&output=csv';

function parseCSV(csv) {
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
    
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || '';
    });
    
    console.log(`Tutorials: Parsed object ${index}:`, obj);
    return obj;
  });
}

function getVideoEmbed(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.match(/(?:v=|youtu.be\/)([\w-]+)/)?.[1];
    return id ? (
      <iframe 
        width="100%" 
        height="100%" 
        src={`https://www.youtube.com/embed/${id}?enablejsapi=1&rel=0&modestbranding=1`} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen 
        title="YouTube video"
        style={{ borderRadius: '8px', border: 'none' }}
      />
    ) : null;
  }
  if (url.includes('vimeo.com')) {
    const id = url.match(/vimeo.com\/(\d+)/)?.[1];
    return id ? (
      <iframe 
        width="100%" 
        height="100%" 
        src={`https://player.vimeo.com/video/${id}?h=hash&dnt=1`} 
        frameBorder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowFullScreen 
        title="Vimeo video"
        style={{ borderRadius: '8px', border: 'none' }}
      />
    ) : null;
  }
  // Fallback for direct video URLs
  return (
    <video 
      width="100%" 
      height="100%" 
      controls 
      src={url}
      style={{ borderRadius: '8px', border: 'none' }}
    />
  );
}

// Helper to extract YouTube video ID
function getYouTubeId(url) {
  const match = url.match(/(?:v=|youtu.be\/)([\w-]+)/);
  return match ? match[1] : null;
}

// Helper to get fallback thumbnail
function getFallbackThumbnail(video) {
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

export default function Tutorials() {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

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
            description: 'Quick start guide',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
          },
          {
            title: 'Cold Calling Playbook',
            description: 'Cold calling training',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
          },
          {
            title: 'Sales Techniques Masterclass',
            description: 'Advanced sales strategies',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg'
          }
        ]);
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });
  }, []);

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Tutorials</h2>
      {loading && <div>Loading...</div>}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 20,
        width: '100%',
        justifyContent: 'flex-start'
      }}>
        {videos.map((video, i) => {
          const fallbackThumb = getFallbackThumbnail(video);
          return (
          <div key={i} style={{ 
            background: '#fff', 
            borderRadius: 12, 
            boxShadow: '0 2px 8px #e3e7ee', 
            padding: 12, 
            cursor: 'pointer',
            flex: '0 0 300px',
            maxWidth: '300px'
          }} onClick={() => setSelected(video)}>
            <div style={{ width: '100%', position: 'relative', borderRadius: 8, marginBottom: 8, overflow: 'hidden', background: '#f5f5f5', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
              {fallbackThumb ? (
                <img
                  src={fallbackThumb}
                  alt={video.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    border: 'none'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: fallbackThumb ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif',
                  background: '#f5f5f5'
                }}
              >
                Thumbnail
              </div>
            </div>
            <div style={{ fontWeight: 600, fontSize: 16, color: '#23272f' }}>{video.title}</div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>{video.description}</div>
          </div>
        );
        })}
      </div>
      {selected && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, maxWidth: '95vw', width: '95vw', maxHeight: '90vh', boxShadow: '0 4px 32px #23272f99', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: 8, right: 12, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#23272f' }} onClick={() => setSelected(null)}>&times;</button>
            <div style={{ marginBottom: 12, position: 'relative', height: '70vh' }} ref={videoRef}>
              <div style={{ width: '100%', height: '100%' }}>
                {getVideoEmbed(selected.url)}
              </div>
              <button 
                style={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8, 
                  background: 'rgba(0,0,0,0.7)', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '4px', 
                  padding: '8px 16px', 
                  fontSize: '14px', 
                  cursor: 'pointer',
                  zIndex: 10
                }} 
                onClick={toggleFullscreen}
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
            </div>
            <div style={{ fontWeight: 600, fontSize: 18, color: '#23272f' }}>{selected.title}</div>
            <div style={{ fontSize: 14, color: '#555', marginTop: 4 }}>{selected.description}</div>
          </div>
        </div>
      )}
    </div>
  );
} 