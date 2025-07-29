import React, { useRef, useEffect } from 'react';
import './BrowserView.css';

function BrowserView({ url, setUrl }) {
  const urlInput = useRef();
  const containerRef = useRef();
  const urlBarRef = useRef();

  // Send the default URL and bounds on mount
  useEffect(() => {
    if (window.electronAPI && window.electronAPI.loadExternalURL) {
      sendUrlAndBounds(url);
    }
    // eslint-disable-next-line
  }, []);

  // Helper to send URL and bounds
  const sendUrlAndBounds = (targetUrl) => {
    // Use the parent .app-browser-col container for bounds
    let boundsRef = containerRef.current;
    let parent = boundsRef;
    while (parent && !parent.classList.contains('app-browser-col')) {
      parent = parent.parentElement;
    }
    if (window.electronAPI && window.electronAPI.loadExternalURL && parent) {
      const rect = parent.getBoundingClientRect();
      let urlBarHeight = 0;
      if (urlBarRef.current) {
        urlBarHeight = urlBarRef.current.getBoundingClientRect().height;
      }
      window.electronAPI.loadExternalURL(targetUrl, {
        x: Math.round(rect.left),
        y: Math.round(rect.top + urlBarHeight),
        width: Math.round(rect.width),
        height: Math.round(rect.height - urlBarHeight)
      });
    }
  };

  const handleLoad = (e) => {
    e.preventDefault();
    const newUrl = urlInput.current.value;
    setUrl(newUrl);
    sendUrlAndBounds(newUrl);
  };

  const handleBookmarkClick = (bookmarkUrl) => {
    setUrl(bookmarkUrl);
    if (urlInput.current) {
      urlInput.current.value = bookmarkUrl;
    }
    sendUrlAndBounds(bookmarkUrl);
  };

  return (
    <div className="browser-view-card" ref={containerRef}>
      {/* Always render the browser URL bar at the top */}
      <div className="browser-url-bar-top-wrapper" ref={urlBarRef}>
        {/* Bookmark links */}
        <div className="browser-bookmarks">
          <button 
            type="button" 
            className="browser-bookmark-btn" 
            onClick={() => handleBookmarkClick('https://chatgpt.com/')}
            title="ChatGPT"
          >
            ChatGPT
          </button>
          <button 
            type="button" 
            className="browser-bookmark-btn" 
            onClick={() => handleBookmarkClick('https://grok.com/')}
            title="Grok"
          >
            Grok
          </button>
          <button 
            type="button" 
            className="browser-bookmark-btn" 
            onClick={() => handleBookmarkClick('https://www.perplexity.ai/')}
            title="Perplexity"
          >
            Perplexity
          </button>
          <button 
            type="button" 
            className="browser-bookmark-btn" 
            onClick={() => handleBookmarkClick('https://chat.deepseek.com/')}
            title="Deepseek"
          >
            Deepseek
          </button>
          <button 
            type="button" 
            className="browser-bookmark-btn" 
            onClick={() => handleBookmarkClick('https://www.meta.ai/')}
            title="Meta AI"
          >
            Meta
          </button>
          <button 
            type="button" 
            className="browser-bookmark-btn" 
            onClick={() => handleBookmarkClick('https://gemini.google.com/app')}
            title="Gemini"
          >
            Gemini
          </button>
        </div>
        <form className="browser-url-bar-top" onSubmit={handleLoad} autoComplete="off">
          <input
            ref={urlInput}
            type="text"
            defaultValue={url}
            placeholder="Enter URL (e.g. https://chatgpt.com)"
            className="browser-url-input"
            autoFocus={false}
          />
          <button type="submit" className="browser-url-load-btn">Load</button>
        </form>
        <div className="browser-session-controls">
          <button 
            type="button" 
            className="browser-session-btn" 
            onClick={() => {
              if (window.electronAPI && window.electronAPI.clearAllSessions) {
                if (confirm('This will log you out from all AI websites. Continue?')) {
                  window.electronAPI.clearAllSessions();
                }
              }
            }}
            title="Logout from all AI sites"
          >
            Clear Sessions
          </button>
        </div>
      </div>
      <div className="webview-container">
        {/* External site will be loaded in Electron's BrowserView, not here */}
        <div style={{width: '100%', height: 400, border: '1px solid #e3e7ee', borderRadius: 12, background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888'}}>External site will appear in the main window.</div>
      </div>
    </div>
  );
}

export default BrowserView; 