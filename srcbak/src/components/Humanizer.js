import React, { useState } from 'react';
import './Humanizer.css';

const Humanizer = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [imperfectionPercentage, setImperfectionPercentage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showImperfectionTypes, setShowImperfectionTypes] = useState(true);
  
  // Imperfection type toggles
  const [imperfectionTypes, setImperfectionTypes] = useState({
    misspellings: true,
    homophones: true,
    capitalization: true,
    typos: true,
    punctuation: true,
    spacing: true,
    repeatedWords: true,
    grammar: true,
    wordChoice: true,
    fillerWords: true
  });

  const imperfectionOptions = [
    { 
      key: 'misspellings', 
      label: 'Add some common misspellings', 
      description: 'ex: "seperate" instead of "separate"',
      examples: ['seperate', 'recieve', 'occassion', 'definately', 'accomodate']
    },
    { 
      key: 'homophones', 
      label: 'Add some common homophone confusions', 
      description: 'ex: "there" instead of "their"',
      examples: ['there', 'their', 'they\'re', 'your', 'you\'re', 'its', 'it\'s', 'to', 'too', 'two']
    },
    { 
      key: 'capitalization', 
      label: 'Add some capitalization issues', 
      description: 'ex: "THis" instead of "This"',
      examples: ['THis', 'THat', 'THey', 'THere', 'THen']
    },
    { 
      key: 'typos', 
      label: 'Add some common typos', 
      description: 'ex: "teh" instead of "the"',
      examples: ['teh', 'thier', 'recieve', 'occassion', 'definately']
    },
    { 
      key: 'punctuation', 
      label: 'Add some punctuation issues', 
      description: 'ex: "Ive" instead of "I\'ve"',
      examples: ['Ive', 'dont', 'cant', 'wont', 'shouldnt', 'couldnt']
    },
    { 
      key: 'spacing', 
      label: 'Add some common spacing issues', 
      description: 'ex: two spaces after a comma or period',
      examples: ['  ', ' ,', ' .', ' !', ' ?']
    },
    { 
      key: 'repeatedWords', 
      label: 'Add some repeated letters and words', 
      description: 'ex: "that that"',
      examples: ['that that', 'the the', 'is is', 'and and', 'but but']
    },
    {
      key: 'grammar',
      label: 'Add some grammatical errors',
      description: 'ex: "He go to school" instead of "He goes to school"',
      examples: ['He go', 'She eat', "I don’t have no"]
    },
    {
      key: 'wordChoice',
      label: 'Add some word choice errors',
      description: 'ex: "accept" instead of "except"',
      examples: ['accept', 'affect', 'effect', 'then', 'than']
    },
    {
      key: 'fillerWords',
      label: 'Add some filler words',
      description: 'ex: "um", "like", "you know"',
      examples: ['um', 'like', 'you know', 'actually', 'basically', 'sort of', 'kind of']
    }
  ];

  const handleImperfectionToggle = (key) => {
    setImperfectionTypes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const humanizeText = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      let humanized = inputText;
      const words = humanized.split(/\s+/);
      const totalWords = words.length;
      const wordsToChange = Math.max(1, Math.floor((imperfectionPercentage / 100) * totalWords));
      const activeTypes = imperfectionOptions.filter(option => imperfectionTypes[option.key]);
      if (activeTypes.length === 0) {
        setOutputText(humanized);
        setIsProcessing(false);
        return;
      }
      let modifiedWords = [...words];
      let changesMade = 0;
      const maxAttempts = wordsToChange * 5;
      let attempts = 0;
      // Track changes for highlighting
      let highlightMap = Array(words.length).fill(null);
      while (changesMade < wordsToChange && attempts < maxAttempts) {
        attempts++;
        const randomWordIndex = Math.floor(Math.random() * modifiedWords.length);
        const randomType = activeTypes[Math.floor(Math.random() * activeTypes.length)];
        if (modifiedWords[randomWordIndex] && modifiedWords[randomWordIndex].length > 0) {
          const originalWord = modifiedWords[randomWordIndex];
          let modified = false;
          let newWord = originalWord;
          switch (randomType.key) {
            case 'misspellings':
              // More comprehensive misspelling patterns
              if (originalWord.toLowerCase().includes('separate')) {
                newWord = originalWord.replace(/separate/gi, 'seperate');
                modified = true;
              } else if (originalWord.toLowerCase().includes('receive')) {
                newWord = originalWord.replace(/receive/gi, 'recieve');
                modified = true;
              } else if (originalWord.toLowerCase().includes('occasion')) {
                newWord = originalWord.replace(/occasion/gi, 'occassion');
                modified = true;
              } else if (originalWord.toLowerCase().includes('definitely')) {
                newWord = originalWord.replace(/definitely/gi, 'definately');
                modified = true;
              } else if (originalWord.toLowerCase().includes('accommodate')) {
                newWord = originalWord.replace(/accommodate/gi, 'accomodate');
                modified = true;
              } else if (originalWord.toLowerCase().includes('necessary')) {
                newWord = originalWord.replace(/necessary/gi, 'neccessary');
                modified = true;
              } else if (originalWord.toLowerCase().includes('successful')) {
                newWord = originalWord.replace(/successful/gi, 'sucessful');
                modified = true;
              } else if (originalWord.toLowerCase().includes('believe')) {
                newWord = originalWord.replace(/believe/gi, 'beleive');
                modified = true;
              }
              break;
              
            case 'homophones':
              // More comprehensive homophone patterns
              if (originalWord.toLowerCase() === 'their') {
                newWord = 'there';
                modified = true;
              } else if (originalWord.toLowerCase() === 'there') {
                newWord = 'their';
                modified = true;
              } else if (originalWord.toLowerCase() === 'your') {
                newWord = 'you\'re';
                modified = true;
              } else if (originalWord.toLowerCase() === 'you\'re') {
                newWord = 'your';
                modified = true;
              } else if (originalWord.toLowerCase() === 'its') {
                newWord = 'it\'s';
                modified = true;
              } else if (originalWord.toLowerCase() === 'it\'s') {
                newWord = 'its';
                modified = true;
              } else if (originalWord.toLowerCase() === 'to') {
                newWord = 'too';
                modified = true;
              } else if (originalWord.toLowerCase() === 'too') {
                newWord = 'to';
                modified = true;
              } else if (originalWord.toLowerCase() === 'two') {
                newWord = 'to';
                modified = true;
              } else if (originalWord.toLowerCase() === 'where') {
                newWord = 'were';
                modified = true;
              } else if (originalWord.toLowerCase() === 'were') {
                newWord = 'where';
                modified = true;
              }
              break;
              
            case 'capitalization':
              // More aggressive capitalization changes
              if (originalWord.length > 1) {
                if (originalWord[0] === originalWord[0].toUpperCase()) {
                  // Randomly capitalize second letter
                  if (Math.random() > 0.5) {
                    const firstChar = originalWord[0];
                    const secondChar = originalWord[1];
                    const rest = originalWord.slice(2);
                    newWord = firstChar + secondChar.toUpperCase() + rest;
                    modified = true;
                  }
                } else {
                  // Randomly capitalize first letter
                  if (Math.random() > 0.7) {
                    newWord = originalWord.charAt(0).toUpperCase() + originalWord.slice(1);
                    modified = true;
                  }
                }
              }
              break;
              
            case 'typos':
              // More comprehensive typo patterns
              if (originalWord.toLowerCase() === 'the') {
                newWord = 'teh';
                modified = true;
              } else if (originalWord.toLowerCase() === 'their') {
                newWord = 'thier';
                modified = true;
              } else if (originalWord.toLowerCase() === 'this') {
                newWord = 'thsi';
                modified = true;
              } else if (originalWord.toLowerCase() === 'that') {
                newWord = 'taht';
                modified = true;
              } else if (originalWord.toLowerCase() === 'with') {
                newWord = 'wth';
                modified = true;
              } else if (originalWord.toLowerCase() === 'will') {
                newWord = 'wll';
                modified = true;
              } else if (originalWord.toLowerCase() === 'have') {
                newWord = 'hvae';
                modified = true;
              }
              break;
              
            case 'punctuation':
              // More comprehensive punctuation patterns
              if (originalWord.toLowerCase().includes('i\'ve')) {
                newWord = originalWord.replace(/i've/gi, 'Ive');
                modified = true;
              } else if (originalWord.toLowerCase().includes('don\'t')) {
                newWord = originalWord.replace(/don't/gi, 'dont');
                modified = true;
              } else if (originalWord.toLowerCase().includes('can\'t')) {
                newWord = originalWord.replace(/can't/gi, 'cant');
                modified = true;
              } else if (originalWord.toLowerCase().includes('won\'t')) {
                newWord = originalWord.replace(/won't/gi, 'wont');
                modified = true;
              } else if (originalWord.toLowerCase().includes('shouldn\'t')) {
                newWord = originalWord.replace(/shouldn't/gi, 'shouldnt');
                modified = true;
              } else if (originalWord.toLowerCase().includes('couldn\'t')) {
                newWord = originalWord.replace(/couldn't/gi, 'couldnt');
                modified = true;
              } else if (originalWord.toLowerCase().includes('wouldn\'t')) {
                newWord = originalWord.replace(/wouldn't/gi, 'wouldnt');
                modified = true;
              }
              break;
              
            case 'spacing':
              // Add extra spaces randomly
              if (Math.random() > 0.3) {
                newWord = newWord + ' ';
                modified = true;
              }
              break;
              
            case 'repeatedWords':
              // Duplicate the word
              newWord = newWord + ' ' + newWord;
              modified = true;
              break;
            case 'grammar':
              // Subject-verb agreement (simple present)
              if (/\b(he|she|it)\b/i.test(originalWord) && randomWordIndex + 1 < modifiedWords.length) {
                const nextWord = modifiedWords[randomWordIndex + 1];
                if (/\b(goes|eats|runs|walks|writes|reads|has)\b/i.test(nextWord)) {
                  newWord = nextWord.replace(/es$|s$/i, '');
                  highlightMap[randomWordIndex + 1] = 'grammar';
                  modified = true;
                }
              }
              // Double negative
              if (/\bdon't\b/i.test(originalWord) && randomWordIndex + 1 < modifiedWords.length) {
                const nextWord = modifiedWords[randomWordIndex + 1];
                if (/\b(any|no|none|nothing|never)\b/i.test(nextWord)) {
                  newWord = 'no';
                  highlightMap[randomWordIndex + 1] = 'grammar';
                  modified = true;
                }
              }
              // Tense confusion
              if (/\b(yesterday|last|ago)\b/i.test(originalWord) && randomWordIndex > 0) {
                const prevWord = modifiedWords[randomWordIndex - 1];
                if (/ed$/.test(prevWord)) {
                  newWord = prevWord.replace(/ed$/, '');
                  highlightMap[randomWordIndex - 1] = 'grammar';
                  modified = true;
                }
              }
              break;
            case 'wordChoice':
              // Replace with wrong word
              if (/\b(accept|except)\b/i.test(originalWord)) {
                newWord = originalWord.toLowerCase() === 'accept' ? 'except' : 'accept';
                modified = true;
              } else if (/\b(affect|effect)\b/i.test(originalWord)) {
                newWord = originalWord.toLowerCase() === 'affect' ? 'effect' : 'affect';
                modified = true;
              } else if (/\b(then|than)\b/i.test(originalWord)) {
                newWord = originalWord.toLowerCase() === 'then' ? 'than' : 'then';
                modified = true;
              }
              break;
            case 'fillerWords':
              // Insert filler before or after word
              const fillers = ['um', 'like', 'you know', 'actually', 'basically', 'sort of', 'kind of'];
              if (Math.random() > 0.5) {
                newWord = originalWord + ', ' + fillers[Math.floor(Math.random() * fillers.length)];
              } else {
                newWord = fillers[Math.floor(Math.random() * fillers.length)] + ', ' + originalWord;
              }
              modified = true;
              break;
          }
          if (modified && newWord !== originalWord) {
            modifiedWords[randomWordIndex] = newWord;
            highlightMap[randomWordIndex] = randomType.key;
            changesMade++;
          }
        }
      }
      // Fallback for minimum changes
      if (changesMade < wordsToChange) {
        for (let i = 0; i < modifiedWords.length && changesMade < wordsToChange; i++) {
          if (modifiedWords[i] && modifiedWords[i].length > 2 && !highlightMap[i]) {
            modifiedWords[i] = modifiedWords[i] + ' ';
            highlightMap[i] = 'spacing';
            changesMade++;
          }
        }
      }
      // Render with highlights
      const highlighted = modifiedWords.map((word, i) =>
        highlightMap[i]
          ? `<span class="highlight highlight-${highlightMap[i]}">${word}</span>`
          : word
      ).join(' ');
      setOutputText(highlighted);
      setIsProcessing(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('Text copied to clipboard!');
    }
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  const swapText = () => {
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <div className="humanizer">
      <div className="humanizer-header">
        <h1>Content Humanizer</h1>
        <p>Transform AI-generated content into natural, human-like text by adding realistic imperfections</p>
      </div>

      <div className="humanizer-container">
        <div className="imperfection-row-collapsible">
          <div className="imperfection-types-header">
            <h3>Imperfection Types</h3>
            <button className="collapse-arrow" onClick={() => setShowImperfectionTypes(v => !v)}>
              {showImperfectionTypes ? '▼' : '▲'}
            </button>
          </div>
          {showImperfectionTypes && (
            <div className="imperfection-toggles four-col">
              {imperfectionOptions.map(option => (
                <label key={option.key} className="imperfection-toggle">
                  <input
                    type="checkbox"
                    checked={imperfectionTypes[option.key]}
                    onChange={() => handleImperfectionToggle(option.key)}
                  />
                  <div className="toggle-content">
                    <span className="toggle-label">{option.label}</span>
                    <span className="toggle-description">{option.description}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="text-areas wide-text-areas">
          <div className="text-area-container">
            <h3>Input Text (AI-Generated)</h3>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated content here..."
              rows={12}
            />
            <div className="text-stats">
              <span>Characters: {inputText.length}</span>
              <span>Words: {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</span>
            </div>
            <div className="action-buttons horizontal-actions">
              <button 
                className="btn btn-primary" 
                onClick={humanizeText}
                disabled={isProcessing || !inputText.trim()}
              >
                {isProcessing ? '🔄 Processing...' : '✨ Humanize Text'}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={copyToClipboard}
                disabled={!outputText}
              >
                📋 Copy Result
              </button>
              <button className="btn btn-outline" onClick={swapText}>
                🔄 Swap Text
              </button>
              <button className="btn btn-outline" onClick={clearAll}>
                🗑️ Clear All
              </button>
            </div>
          </div>

          <div className="text-area-container">
            <h3>Humanized Output</h3>
            <div
              className="humanized-output editable-output"
              contentEditable
              suppressContentEditableWarning
              spellCheck={true}
              onInput={e => setOutputText(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{__html: outputText}}
              style={{maxHeight: '400px', overflowY: 'auto'}}
            />
            <div className="text-stats">
              <span>Characters: {outputText.replace(/<[^>]+>/g, '').length}</span>
              <span>Words: {outputText.replace(/<[^>]+>/g, '').trim() ? outputText.replace(/<[^>]+>/g, '').trim().split(/\s+/).length : 0}</span>
            </div>
            <div className="imperfection-percentage-row">
              <div className="control-section">
                <div className="percentage-control">
                  <div className="percentage-header">
                    <span className="percentage-title">Imperfection Percentage (The percentage of words to modify with imperfections)</span>
                    <span className="percentage-value-btn">{imperfectionPercentage}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="20"
                    step="0.5"
                    value={imperfectionPercentage}
                    onChange={(e) => setImperfectionPercentage(parseFloat(e.target.value))}
                    className="percentage-slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="humanizer-features">
          <h3>Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h4>Smart Imperfections</h4>
              <p>Add realistic human errors at the same rate real people make them</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h4>Customizable Types</h4>
              <p>Choose which types of imperfections to introduce in your content</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h4>Percentage Control</h4>
              <p>Set exact percentage of words to modify (0.5% to 20%)</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h4>Text Analytics</h4>
              <p>Real-time character and word count statistics for both input and output</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Humanizer; 