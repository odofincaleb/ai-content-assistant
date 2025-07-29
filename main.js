const { app, BrowserWindow, session, ipcMain, BrowserView } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let browserView;

function createWindow() {
  // Determine environment
  const isDev = process.env.NODE_ENV === 'development' || process.env.ELECTRON_START_URL;

  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true, // Enable <webview>
      webSecurity: !isDev, // Disable webSecurity in dev for local loading, enable in prod
      allowRunningInsecureContent: isDev ? true : false,
    },
  });

  // Set Content Security Policy - Updated to allow external resources for tutorials
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
          "style-src 'self' 'unsafe-inline' https:; " +
          "img-src 'self' data: blob: https: http:; " +
          "media-src 'self' data: blob: https: http:; " +
          "connect-src 'self' https: http: ws: wss:; " +
          "frame-src 'self' https: http:; " +
          "object-src 'none'; " +
          "base-uri 'self';"
        ]
      }
    });
  });

  // Configure session for persistent storage
  const ses = session.defaultSession;
  
  // Enable persistent storage
  ses.setPermissionRequestHandler((webContents, permission, callback) => {
    // Allow common permissions for AI sites
    const allowedPermissions = ['notifications', 'media', 'geolocation'];
    if (allowedPermissions.includes(permission)) {
      callback(true);
    } else {
      callback(false);
    }
  });

  // Robust loading logic
  const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:3000';
  if (isDev) {
    // Development mode - use localhost
    mainWindow.loadURL(startUrl).catch((err) => {
      console.error('Failed to load dev server:', err);
    });
  } else {
    // Production mode - use file path
    const indexPath = path.join(__dirname, 'build', 'index.html');
    if (fs.existsSync(indexPath)) {
      mainWindow.loadFile(indexPath).catch((err) => {
        console.error('Failed to load build/index.html:', err);
      });
    } else {
      mainWindow.loadURL('data:text/html,<h2>Build not found. Please run npm run build.</h2>');
      console.error('build/index.html not found. Please run npm run build.');
    }
  }

  // Only open DevTools in development mode
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handler for loading external URLs in BrowserView
ipcMain.on('load-external-url', (event, url, bounds) => {
  console.log('Main: Received URL to load in BrowserView:', url, bounds);
  
  if (!mainWindow) {
    console.error('Main: Main window not available');
    return;
  }

  try {
    // Remove existing BrowserView if it exists
    if (browserView) {
      mainWindow.removeBrowserView(browserView);
      browserView = null;
    }

    // Use a separate session partition for Perplexity
    let partition = 'persist:ai-sessions';
    let shouldStripCSP = true;
    if (url.includes('perplexity.ai')) {
      partition = 'persist:perplexity-session';
      shouldStripCSP = false;
    }

    browserView = new BrowserView({
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        session: session.fromPartition(partition),
        partition,
        webSecurity: false,
        allowRunningInsecureContent: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        plugins: false,
        experimentalFeatures: false,
      }
    });

    mainWindow.setBrowserView(browserView);

    if (bounds && bounds.width > 0 && bounds.height > 0) {
      browserView.setBounds(bounds);
      browserView.setAutoResize({ width: true, height: true });
    } else {
      const windowBounds = mainWindow.getBounds();
      const defaultBounds = {
        x: Math.round(windowBounds.width * 0.6),
        y: 0,
        width: Math.round(windowBounds.width * 0.4),
        height: windowBounds.height
      };
      browserView.setBounds(defaultBounds);
      browserView.setAutoResize({ width: true, height: true });
    }

    browserView.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    browserView.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
      details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
      details.requestHeaders['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';
      details.requestHeaders['Accept-Language'] = 'en-US,en;q=0.9';
      details.requestHeaders['Accept-Encoding'] = 'gzip, deflate, br';
      details.requestHeaders['DNT'] = '1';
      details.requestHeaders['Connection'] = 'keep-alive';
      details.requestHeaders['Upgrade-Insecure-Requests'] = '1';
      details.requestHeaders['Sec-Fetch-Dest'] = 'document';
      details.requestHeaders['Sec-Fetch-Mode'] = 'navigate';
      details.requestHeaders['Sec-Fetch-Site'] = 'none';
      details.requestHeaders['Sec-Fetch-User'] = '?1';
      callback({ requestHeaders: details.requestHeaders });
    });

    // Only strip CSP for non-Perplexity sites
    if (shouldStripCSP) {
      browserView.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        let responseHeaders = { ...details.responseHeaders };
        if (responseHeaders['content-security-policy']) {
          delete responseHeaders['content-security-policy'];
        }
        if (responseHeaders['Content-Security-Policy']) {
          delete responseHeaders['Content-Security-Policy'];
        }
        callback({ responseHeaders });
      });
    }

    browserView.webContents.loadURL(url, {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      extraHeaders: 'Accept-Language: en-US,en;q=0.9\nAccept-Encoding: gzip, deflate, br\nDNT: 1\nConnection: keep-alive\nUpgrade-Insecure-Requests: 1'
    }).then(() => {
      console.log('Main: URL loaded successfully');
    }).catch((error) => {
      console.error('Main: Error loading URL:', error);
    });

    browserView.webContents.on('did-start-loading', () => {
      console.log('Main: BrowserView started loading');
    });
    browserView.webContents.on('did-finish-load', () => {
      console.log('Main: BrowserView finished loading');
    });
    browserView.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
      console.error('Main: BrowserView failed to load:', errorCode, errorDescription, validatedURL);
    });
    browserView.webContents.on('dom-ready', () => {
      console.log('Main: BrowserView DOM is ready');
    });
    browserView.webContents.on('did-navigate', (event, navigationUrl) => {
      console.log('Main: BrowserView navigated to:', navigationUrl);
    });

  } catch (error) {
    console.error('Main: Error creating/setting BrowserView:', error);
  }
});

// IPC handler for hiding BrowserView
ipcMain.on('hide-browser-view', (event) => {
  console.log('Main: Hiding BrowserView');
  if (mainWindow && browserView) {
    mainWindow.removeBrowserView(browserView);
    browserView = null;
  }
});

ipcMain.on('copy-to-clipboard', (event, text) => {
  require('electron').clipboard.writeText(text);
});

// IPC handler to clear all sessions (logout from all sites)
ipcMain.on('clear-all-sessions', (event) => {
  console.log('Main: Clearing all sessions');
  session.defaultSession.clearStorageData({
    storages: ['cookies', 'localstorage', 'sessionstorage', 'indexdb', 'websql']
  }).then(() => {
    console.log('Main: All sessions cleared successfully');
    event.reply('sessions-cleared');
  }).catch((error) => {
    console.error('Main: Error clearing sessions:', error);
  });
});

// IPC handler to get session info
ipcMain.on('get-session-info', (event) => {
  session.defaultSession.getStorageData().then((data) => {
    event.reply('session-info', {
      cookies: data.cookies.length,
      localStorage: data.localStorage.length,
      sessionStorage: data.sessionStorage.length
    });
  });
});