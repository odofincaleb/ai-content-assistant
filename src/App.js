import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PromptForm from './components/PromptForm';
import BrowserView from './components/BrowserView';
import Tutorials from './components/Tutorials';
import ScriptEditor from './components/ScriptEditor';
import TextToSpeech from './components/TextToSpeech';
import Humanizer from './components/Humanizer';
import Settings from './components/Settings';
import Home from './components/Home';
import './App.css';

function App() {
  const [url, setUrl] = useState('https://chatgpt.com/');
  const [activeMenu, setActiveMenu] = useState('Home');
  const [selectedFormType, setSelectedFormType] = useState(null);

  useEffect(() => {
    if (
      (activeMenu === 'Tutorials' ||
        activeMenu === 'Script Editor' ||
        activeMenu === 'Text to Speech' ||
        activeMenu === 'Humanizer' ||
        activeMenu === 'Settings' ||
        activeMenu === 'Home') &&
      window.electronAPI &&
      window.electronAPI.hideBrowserView
    ) {
      window.electronAPI.hideBrowserView();
    }
  }, [activeMenu]);

  const handleFormTypeSelect = (formType) => {
    setSelectedFormType(formType);
    setActiveMenu('Scripts');
  };

  let filteredFormTypes = undefined;
  if (activeMenu === 'Scripts' && selectedFormType) {
    filteredFormTypes = [selectedFormType];
  } else if (activeMenu === 'Advertisements') {
    filteredFormTypes = 'advertisement';
  } else if (activeMenu === 'Articles & Blogs') {
    filteredFormTypes = 'articles-blogs';
  } else if (activeMenu === 'Customer Service') {
    filteredFormTypes = 'customer-service';
  } else if (activeMenu === 'Ebooks') {
    filteredFormTypes = 'ebook';
  } else if (activeMenu === 'Ecommerce') {
    filteredFormTypes = 'ecommerce';
  } else if (activeMenu === 'Emails') {
    filteredFormTypes = 'emails';
  } else if (activeMenu === 'Letters') {
    filteredFormTypes = 'letter';
  } else if (activeMenu === 'Marketing') {
    filteredFormTypes = 'marketing';
  } else if (activeMenu === 'Podcasts') {
    filteredFormTypes = 'podcast';
  } else if (activeMenu === 'Press Releases') {
    filteredFormTypes = 'press-release';
  } else if (activeMenu === 'Research') {
    filteredFormTypes = 'research';
  } else if (activeMenu === 'Reviews') {
    filteredFormTypes = 'reviews';
  } else if (activeMenu === 'Rewriter') {
    filteredFormTypes = 'rewriter';
  } else if (activeMenu === 'SEO') {
    filteredFormTypes = 'seo';
  } else if (activeMenu === 'Social Media') {
    filteredFormTypes = 'social-media';
  } else if (activeMenu === 'Video Scripts') {
    filteredFormTypes = 'video-scripts';
  } else if (activeMenu === 'Website Copy') {
    filteredFormTypes = 'website-copy';
  } else if (activeMenu === 'Other') {
    filteredFormTypes = 'other';
  }

  const renderContent = () => {
    if (activeMenu === 'Home') {
      return (
        <div className="app-home-col">
          <Home onFormTypeSelect={handleFormTypeSelect} />
        </div>
      );
    }
    if (activeMenu === 'Script Editor') {
      return <ScriptEditor />;
    }
    if (activeMenu === 'Text to Speech') {
      return <TextToSpeech />;
    }
    if (activeMenu === 'Humanizer') {
      return <Humanizer />;
    }
    if (activeMenu === 'Tutorials') {
      return <Tutorials />;
    }
    if (activeMenu === 'Settings') {
      return <Settings />;
    }
    return (
      <>
        <div className="app-form-col">
          <PromptForm formTypeFilter={filteredFormTypes} />
        </div>
        <div className="app-browser-col">
          <BrowserView url={url} setUrl={setUrl} />
        </div>
      </>
    );
  };

  return (
    <div className="app-root-row-3col">
      <div className="app-sidebar-col">
        <Sidebar activeMenu={activeMenu} onMenuSelect={setActiveMenu} />
      </div>
      {renderContent()}
    </div>
  );
}

export default App;