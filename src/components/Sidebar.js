import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ activeMenu, onMenuSelect }) {
  const [scriptsOpen, setScriptsOpen] = useState(false);

  const navItems = [
    { 
      label: 'Home', 
      icon: '🏠',
      description: 'Main dashboard'
    },
    { 
      label: 'Scripts', 
      icon: '📝',
      hasSubmenu: true,
      description: 'Content creation tools'
    },
    { 
      label: 'Script Editor', 
      icon: '✏️',
      description: 'Advanced script editing'
    },
    { 
      label: 'Text to Speech', 
      icon: '🔊',
      description: 'Voice generation'
    },
    { 
      label: 'Humanizer', 
      icon: '🤖',
      description: 'AI content humanization'
    },
    { 
      label: 'Tutorials', 
      icon: '📚',
      description: 'Learning resources'
    },
    { 
      label: 'Help', 
      icon: '❓',
      description: 'Support & guidance'
    },
    { 
      label: 'Settings', 
      icon: '⚙️',
      description: 'App configuration'
    }
  ];

  const scriptSubmenu = [
    { label: 'Advertisements', icon: '📢' },
    { label: 'Articles & Blogs', icon: '📄' },
    { label: 'Customer Service', icon: '🎧' },
    { label: 'Ebooks', icon: '📖' },
    { label: 'Ecommerce', icon: '🛒' },
    { label: 'Emails', icon: '📧' },
    { label: 'Letters', icon: '✉️' },
    { label: 'Marketing', icon: '📈' },
    { label: 'Podcasts', icon: '🎙️' },
    { label: 'Press Releases', icon: '📰' },
    { label: 'Research', icon: '🔍' },
    { label: 'Reviews', icon: '⭐' },
    { label: 'Rewriter', icon: '🔄' },
    { label: 'SEO', icon: '🎯' },
    { label: 'Social Media', icon: '📱' },
    { label: 'Video Scripts', icon: '🎬' },
    { label: 'Website Copy', icon: '🌐' }
  ];

  const handleMenuClick = (item) => {
    if (item.label === 'Scripts') {
      setScriptsOpen(!scriptsOpen);
    } else {
      onMenuSelect(item.label);
      setScriptsOpen(false);
    }
  };

  const handleSubmenuClick = (subItem) => {
    onMenuSelect(subItem.label);
    setScriptsOpen(false);
  };

  const handleClose = () => {
    if (window.electronAPI && window.electronAPI.closeApp) {
      window.electronAPI.closeApp();
    } else {
      window.close();
    }
  };

  return (
    <div className="sidebar">
      {/* Header with Brand */}
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-logo">🎯</div>
          <div className="brand-text">
            <h1 className="brand-title">Fiddyscript</h1>
            <p className="brand-subtitle">AI Content Assistant</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <div key={index} className="nav-item-container">
            <button
              className={`nav-item ${activeMenu === item.label ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
              title={item.description}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.hasSubmenu && (
                <span className={`nav-arrow ${scriptsOpen ? 'open' : ''}`}>▼</span>
              )}
            </button>
            
            {item.hasSubmenu && scriptsOpen && (
              <div className="submenu">
                {scriptSubmenu.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    className={`submenu-item ${activeMenu === subItem.label ? 'active' : ''}`}
                    onClick={() => handleSubmenuClick(subItem)}
                  >
                    <span className="submenu-icon">{subItem.icon}</span>
                    <span className="submenu-label">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="close-btn" onClick={handleClose}>
          <span className="close-icon">✕</span>
          <span className="close-text">Close App</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;