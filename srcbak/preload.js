console.log("!!! Preload script is running !!!");

const { contextBridge, ipcRenderer } = require("electron");

// Check if electronAPI already exists to prevent conflicts
if (!window.electronAPI) {
  contextBridge.exposeInMainWorld("electronAPI", {
    loadExternalURL: (url, bounds) => {
      console.log("Renderer: Sending URL to main process:", url, bounds);
      ipcRenderer.send("load-external-url", url, bounds);
    },
    hideBrowserView: () => {
      console.log("Renderer: Hiding BrowserView");
      ipcRenderer.send("hide-browser-view");
    },
    copyToClipboard: (text) => {
      ipcRenderer.send("copy-to-clipboard", text);
    },
    clearAllSessions: () => {
      console.log("Renderer: Clearing all sessions");
      ipcRenderer.send("clear-all-sessions");
    },
    getSessionInfo: () => {
      console.log("Renderer: Getting session info");
      ipcRenderer.send("get-session-info");
    },
    onSessionsCleared: (callback) => {
      ipcRenderer.on("sessions-cleared", callback);
    },
    onSessionInfo: (callback) => {
      ipcRenderer.on("session-info", callback);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("Preload script loaded");
});