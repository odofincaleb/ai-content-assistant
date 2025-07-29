import React, { useState, useRef, useEffect } from 'react';
import './ScriptEditor.css';

const ScriptEditor = () => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [autosave, setAutosave] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSourceCode, setShowSourceCode] = useState(false);
  const [showVisualAids, setShowVisualAids] = useState(true);
  const [showInvisibleChars, setShowInvisibleChars] = useState(false);
  const [showBlocks, setShowBlocks] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef(null);

  // Calculate word count
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    setWordCount(words);
  }, [content]);

  // Handle content change
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Menu handlers
  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // File operations
  const handleNewDocument = () => {
    setContent('');
  };

  const handleSave = () => {
    // Save functionality would be implemented here
    console.log('Saving document...');
  };

  const handleClearAll = () => {
    setContent('');
  };

  // Formatting functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const insertContent = (type) => {
    switch (type) {
      case 'image':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          formatText('insertImage', imageUrl);
        }
        break;
      case 'link':
        const linkUrl = prompt('Enter URL:');
        const linkText = prompt('Enter link text:');
        if (linkUrl && linkText) {
          formatText('createLink', linkUrl);
        }
        break;
      case 'table':
        const rows = prompt('Enter number of rows:');
        const cols = prompt('Enter number of columns:');
        if (rows && cols) {
          // Simple table insertion
          const tableHTML = generateTable(parseInt(rows), parseInt(cols));
          formatText('insertHTML', tableHTML);
        }
        break;
      default:
        break;
    }
  };

  const generateTable = (rows, cols) => {
    let table = '<table border="1" style="border-collapse: collapse;">';
    for (let i = 0; i < rows; i++) {
      table += '<tr>';
      for (let j = 0; j < cols; j++) {
        table += '<td style="padding: 8px; border: 1px solid #ccc;">Cell</td>';
      }
      table += '</tr>';
    }
    table += '</table>';
    return table;
  };

  // Sidebar tool functions
  const handleSidebarTool = (tool) => {
    switch (tool) {
      case 'getContent':
        // Get content from external source
        console.log('Getting content...');
        break;
      case 'scrapeURL':
        const url = prompt('Enter URL to scrape:');
        if (url) {
          console.log('Scraping URL:', url);
        }
        break;
      case 'fileToText':
        // File to text conversion
        console.log('Converting file to text...');
        break;
      case 'youtubeToText':
        const youtubeUrl = prompt('Enter YouTube URL:');
        if (youtubeUrl) {
          console.log('Converting YouTube to text:', youtubeUrl);
        }
        break;
      case 'textToSpeech':
        // Text to speech functionality
        console.log('Converting text to speech...');
        break;
      case 'translate':
        // Translation functionality
        console.log('Translating content...');
        break;
      case 'exportPDF':
        // Export to PDF
        console.log('Exporting to PDF...');
        break;
      case 'toWordPress':
        // Export to WordPress
        console.log('Exporting to WordPress...');
        break;
      case 'humanize':
        // Humanize content
        console.log('Humanizing content...');
        break;
      default:
        console.log('Tool clicked:', tool);
        break;
    }
  };

  return (
    <div className="script-editor">
      {/* Header */}
      <div className="editor-header">
        <div className="editor-title">Script Editor</div>
        <div className="window-controls">
          <button className="window-control minimize">─</button>
          <button className="window-control maximize">□</button>
          <button className="window-control close">×</button>
        </div>
      </div>

      <div className="editor-main">
        {/* Left Sidebar */}
        <div className="editor-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Image Library</div>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('editImage')}>
              <span className="icon">✏️</span>
              Edit Image
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('insertImage')}>
              <span className="icon">🖼️</span>
              Insert Image
            </button>
          </div>

          <div className="sidebar-section">
            <button className="sidebar-btn" onClick={() => handleSidebarTool('deleteToTop')}>
              <span className="icon">🗑️↑</span>
              Delete to Top
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('deleteToBottom')}>
              <span className="icon">🗑️↓</span>
              Delete to Bottom
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('removeLinks')}>
              <span className="icon">🔗❌</span>
              Remove Links
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('autoPunctuate')}>
              <span className="icon">{`{;}`}</span>
              Auto Punctuate
            </button>
          </div>

          <div className="sidebar-section">
            <button className="sidebar-btn" onClick={() => handleSidebarTool('getContent')}>
              <span className="icon">⬇️</span>
              Get Content
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('scrapeURL')}>
              <span className="icon">🌐</span>
              Scrape URL
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('fileToText')}>
              <span className="icon">📄</span>
              File to Text
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('youtubeToText')}>
              <span className="icon">▶️</span>
              YouTube to Text
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('textToSpeech')}>
              <span className="icon">🔊</span>
              Text to Speech
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('translate')}>
              <span className="icon">🔄</span>
              Translate/Cloak
            </button>
          </div>

          <div className="sidebar-section">
            <button className="sidebar-btn" onClick={() => handleSidebarTool('sourceCode')}>
              <span className="icon">❓</span>
              Full Source Code
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('exportPDF')}>
              <span className="icon">📄</span>
              Export to PDF
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('toWordPress')}>
              <span className="icon">W</span>
              To WordPress
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('createSnippet')}>
              <span className="icon">📝</span>
              Create Snippet
            </button>
            <button className="sidebar-btn" onClick={() => handleSidebarTool('humanize')}>
              <span className="icon">👤</span>
              Humanize
            </button>
          </div>

          <div className="sidebar-section">
            <button className="sidebar-btn ai-prompts">
              <span className="icon">🧠</span>
              AI Prompts
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="editor-content">
          {/* Menu Bar */}
          <div className="menu-bar">
            <button 
              className={`menu-item ${activeMenu === 'file' ? 'active' : ''}`}
              onClick={() => handleMenuClick('file')}
            >
              File
            </button>
            <button 
              className={`menu-item ${activeMenu === 'edit' ? 'active' : ''}`}
              onClick={() => handleMenuClick('edit')}
            >
              Edit
            </button>
            <button 
              className={`menu-item ${activeMenu === 'view' ? 'active' : ''}`}
              onClick={() => handleMenuClick('view')}
            >
              View
            </button>
            <button 
              className={`menu-item ${activeMenu === 'insert' ? 'active' : ''}`}
              onClick={() => handleMenuClick('insert')}
            >
              Insert
            </button>
            <button 
              className={`menu-item ${activeMenu === 'format' ? 'active' : ''}`}
              onClick={() => handleMenuClick('format')}
            >
              Format
            </button>
            <button 
              className={`menu-item ${activeMenu === 'tools' ? 'active' : ''}`}
              onClick={() => handleMenuClick('tools')}
            >
              Tools
            </button>
            <button 
              className={`menu-item ${activeMenu === 'table' ? 'active' : ''}`}
              onClick={() => handleMenuClick('table')}
            >
              Table
            </button>
          </div>

          {/* Dropdown Menus */}
          {activeMenu === 'file' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleNewDocument}>
                <span className="icon">📄</span>
                New document
              </div>
              <div className="dropdown-item">
                <span className="icon">👁️</span>
                Preview
              </div>
              <div className="dropdown-item">
                <span className="icon">🖨️</span>
                Print... Ctrl+P
              </div>
            </div>
          )}

          {activeMenu === 'edit' && (
            <div className="dropdown-menu">
              <div className="dropdown-item">Undo Ctrl+Z</div>
              <div className="dropdown-item">Redo Ctrl+Y</div>
              <div className="dropdown-item">Cut Ctrl+X</div>
              <div className="dropdown-item">Copy Ctrl+C</div>
              <div className="dropdown-item">Paste Ctrl+V</div>
              <div className="dropdown-item">Paste as text</div>
              <div className="dropdown-item">Select all Ctrl+A</div>
              <div className="dropdown-item">Find and replace... Ctrl+F</div>
            </div>
          )}

          {activeMenu === 'view' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => setShowSourceCode(!showSourceCode)}>
                &lt;&gt; Source code
              </div>
              <div className="dropdown-item" onClick={() => setShowVisualAids(!showVisualAids)}>
                Visual aids {showVisualAids && '✓'}
              </div>
              <div className="dropdown-item" onClick={() => setShowInvisibleChars(!showInvisibleChars)}>
                Show invisible characters
              </div>
              <div className="dropdown-item" onClick={() => setShowBlocks(!showBlocks)}>
                Show blocks
              </div>
              <div className="dropdown-item">Preview</div>
              <div className="dropdown-item" onClick={() => setIsFullscreen(!isFullscreen)}>
                Fullscreen Ctrl+Shift+F {isFullscreen && '✓'}
              </div>
            </div>
          )}

          {activeMenu === 'insert' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => insertContent('image')}>Image...</div>
              <div className="dropdown-item" onClick={() => insertContent('link')}>Link... Ctrl+K</div>
              <div className="dropdown-item">Media...</div>
              <div className="dropdown-item">Code sample...</div>
              <div className="dropdown-item">Table →</div>
              <div className="dropdown-item">Special character...</div>
              <div className="dropdown-item">Emojis...</div>
              <div className="dropdown-item">Horizontal line</div>
              <div className="dropdown-item">Page break</div>
              <div className="dropdown-item">Nonbreaking space</div>
              <div className="dropdown-item">Anchor...</div>
              <div className="dropdown-item">Date/time →</div>
            </div>
          )}

          {activeMenu === 'format' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => formatText('bold')}>B Bold Ctrl+B</div>
              <div className="dropdown-item" onClick={() => formatText('italic')}>I Italic Ctrl+I</div>
              <div className="dropdown-item" onClick={() => formatText('underline')}>U Underline Ctrl+U</div>
              <div className="dropdown-item" onClick={() => formatText('strikeThrough')}>S Strikethrough</div>
              <div className="dropdown-item" onClick={() => formatText('superscript')}>X² Superscript</div>
              <div className="dropdown-item" onClick={() => formatText('subscript')}>X₂ Subscript</div>
              <div className="dropdown-item" onClick={() => formatText('formatBlock', '<code>')}>&lt;&gt; Code</div>
              <div className="dropdown-item">Formats →</div>
              <div className="dropdown-item">Blocks →</div>
              <div className="dropdown-item">Fonts →</div>
              <div className="dropdown-item">Font sizes →</div>
              <div className="dropdown-item">Align →</div>
              <div className="dropdown-item">Line height →</div>
              <div className="dropdown-item">A Text color</div>
              <div className="dropdown-item">Background color</div>
              <div className="dropdown-item">Ix Clear formatting</div>
            </div>
          )}

          {activeMenu === 'tools' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => setShowSourceCode(!showSourceCode)}>
                &lt;&gt; Source code
              </div>
              <div className="dropdown-item">Word count</div>
            </div>
          )}

          {activeMenu === 'table' && (
            <div className="dropdown-menu">
              <div className="dropdown-item">Table</div>
              <div className="dropdown-item">Cell</div>
              <div className="dropdown-item">Row</div>
              <div className="dropdown-item">Column</div>
              <div className="dropdown-item">Table properties</div>
              <div className="dropdown-item">Delete table</div>
            </div>
          )}

          {/* Toolbar */}
          <div className="toolbar">
            <div className="toolbar-group">
              <button className="toolbar-btn" onClick={() => formatText('undo')}>↶</button>
              <button className="toolbar-btn" onClick={() => formatText('redo')}>↷</button>
            </div>

            <div className="toolbar-group">
              <select className="toolbar-select">
                <option>Paragraph</option>
              </select>
              <select className="toolbar-select">
                <option>Helvetica</option>
              </select>
              <select className="toolbar-select">
                <option>12pt</option>
              </select>
            </div>

            <div className="toolbar-group">
              <button className="toolbar-btn" onClick={() => formatText('bold')}>B</button>
              <button className="toolbar-btn" onClick={() => formatText('italic')}>I</button>
              <button className="toolbar-btn" onClick={() => formatText('underline')}>U</button>
              <button className="toolbar-btn" onClick={() => formatText('strikeThrough')}>S</button>
            </div>

            <div className="toolbar-group">
              <button className="toolbar-btn" onClick={() => insertContent('link')}>🔗</button>
              <button className="toolbar-btn" onClick={() => insertContent('image')}>🖼️</button>
              <button className="toolbar-btn" onClick={() => insertContent('video')}>▶️</button>
              <button className="toolbar-btn" onClick={() => insertContent('table')}>⊞</button>
            </div>

            <div className="toolbar-group">
              <button className="toolbar-btn" onClick={() => formatText('justifyLeft')}>⫷</button>
              <button className="toolbar-btn" onClick={() => formatText('justifyCenter')}>⫸</button>
              <button className="toolbar-btn" onClick={() => formatText('justifyRight')}>⫹</button>
              <button className="toolbar-btn" onClick={() => formatText('justifyFull')}>⫺</button>
            </div>

            <div className="toolbar-group">
              <button className="toolbar-btn" onClick={() => formatText('insertUnorderedList')}>•</button>
              <button className="toolbar-btn" onClick={() => formatText('insertOrderedList')}>1.</button>
              <button className="toolbar-btn" onClick={() => formatText('outdent')}>←</button>
              <button className="toolbar-btn" onClick={() => formatText('indent')}>→</button>
            </div>

            <div className="toolbar-group">
              <button className="toolbar-btn">😊</button>
              <button className="toolbar-btn">Ω</button>
              <button className="toolbar-btn">Iₓ</button>
              <button className="toolbar-btn">...</button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="editor-area">
            {showSourceCode ? (
              <textarea
                ref={editorRef}
                className="source-editor"
                value={content}
                onChange={handleContentChange}
                placeholder="Enter your content here..."
              />
            ) : (
              <div
                ref={editorRef}
                className="rich-editor"
                contentEditable
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: content }}
                placeholder="Enter your content here..."
              />
            )}
          </div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="status-left">
              <button className="status-btn" onClick={handleNewDocument}>File</button>
              <button className="status-btn" onClick={handleSave}>Save</button>
              <label className="autosave-checkbox">
                <input
                  type="checkbox"
                  checked={autosave}
                  onChange={(e) => setAutosave(e.target.checked)}
                />
                Autosave
              </label>
            </div>
            <div className="status-right">
              <span className="word-count">{wordCount} words</span>
              <button className="status-btn" onClick={handleClearAll}>Clear All</button>
              <button className="status-btn">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptEditor; 