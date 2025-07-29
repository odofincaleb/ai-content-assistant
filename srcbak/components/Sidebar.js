import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ activeMenu, onMenuSelect }) {
  const [scriptsOpen, setScriptsOpen] = useState(false);

  const navItems = [
    { label: 'Home', icon: '🏠', description: 'Main dashboard' },
    { label: 'Scripts', icon: '📝', hasSubmenu: true, description: 'Content creation tools' },
    { label: 'Script Editor', icon: '✏️', description: 'Advanced script editing' },
    { label: 'Text to Speech', icon: '🔊', description: 'Voice generation' },
    { label: 'Humanizer', icon: '🤖', description: 'AI content humanization' },
    { label: 'Tutorials', icon: '📚', description: 'Learning resources' },
    { label: 'Help', icon: '❓', description: 'Support & guidance' },
    { label: 'Settings', icon: '⚙️', description: 'App configuration' }
  ];

  const handleMenuClick = (item) => {
    if (item.label === 'Scripts') {
      setScriptsOpen(!scriptsOpen);
    } else {
      onMenuSelect(item.label);
      setScriptsOpen(false);
    }
  };

  return (
    <div className="sidebar-root">
      <div className="sidebar-logo">Fiddyscript<br /><span>AI Content Assistant</span></div>
      <ul className="sidebar-nav">
        {navItems.map(item => (
          <li
            key={item.label}
            className={activeMenu === item.label ? 'active' : ''}
            onClick={() => handleMenuClick(item)}
            title={item.description}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar; 