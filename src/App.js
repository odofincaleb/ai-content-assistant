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