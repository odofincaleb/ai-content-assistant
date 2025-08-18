import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Script {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ScriptContextType {
  scripts: Script[];
  currentScript: Script | null;
  isLoading: boolean;
  addScript: (script: Omit<Script, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateScript: (id: string, updates: Partial<Script>) => Promise<void>;
  deleteScript: (id: string) => Promise<void>;
  setCurrentScript: (script: Script | null) => void;
  loadScripts: () => Promise<void>;
  saveScripts: () => Promise<void>;
}

const ScriptContext = createContext<ScriptContextType | undefined>(undefined);

export const useScript = () => {
  const context = useContext(ScriptContext);
  if (!context) {
    throw new Error('useScript must be used within a ScriptProvider');
  }
  return context;
};

interface ScriptProviderProps {
  children: ReactNode;
}

export const ScriptProvider: React.FC<ScriptProviderProps> = ({ children }) => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addScript = async (scriptData: Omit<Script, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newScript: Script = {
      ...scriptData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedScripts = [...scripts, newScript];
    setScripts(updatedScripts);
    await saveScriptsToStorage(updatedScripts);
  };

  const updateScript = async (id: string, updates: Partial<Script>) => {
    const updatedScripts = scripts.map(script =>
      script.id === id
        ? { ...script, ...updates, updatedAt: new Date().toISOString() }
        : script
    );
    setScripts(updatedScripts);
    await saveScriptsToStorage(updatedScripts);
  };

  const deleteScript = async (id: string) => {
    const updatedScripts = scripts.filter(script => script.id !== id);
    setScripts(updatedScripts);
    await saveScriptsToStorage(updatedScripts);
  };

  const loadScripts = async () => {
    try {
      setIsLoading(true);
      const storedScripts = await AsyncStorage.getItem('fiddyscript_scripts');
      if (storedScripts) {
        const parsedScripts = JSON.parse(storedScripts);
        setScripts(parsedScripts);
      }
    } catch (error) {
      console.error('Error loading scripts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveScripts = async () => {
    await saveScriptsToStorage(scripts);
  };

  const saveScriptsToStorage = async (scriptsToSave: Script[]) => {
    try {
      await AsyncStorage.setItem('fiddyscript_scripts', JSON.stringify(scriptsToSave));
    } catch (error) {
      console.error('Error saving scripts:', error);
    }
  };

  const value: ScriptContextType = {
    scripts,
    currentScript,
    isLoading,
    addScript,
    updateScript,
    deleteScript,
    setCurrentScript,
    loadScripts,
    saveScripts,
  };

  return (
    <ScriptContext.Provider value={value}>
      {children}
    </ScriptContext.Provider>
  );
}; 