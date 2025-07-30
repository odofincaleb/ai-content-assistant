// Storage service for form persistence

const STORAGE_KEYS = {
  FORM_DATA: 'ai_content_assistant_form_data'
};

// Form Persistence Service
export const formStorageService = {
  // Save form data for a specific form type
  saveFormData: (formType, formData) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEYS.FORM_DATA) || '{}');
      existingData[formType] = {
        ...formData,
        lastUsed: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(existingData));
      return true;
    } catch (error) {
      console.error('Error saving form data:', error);
      return false;
    }
  },

  // Load form data for a specific form type
  loadFormData: (formType) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEYS.FORM_DATA) || '{}');
      return existingData[formType] || null;
    } catch (error) {
      console.error('Error loading form data:', error);
      return null;
    }
  },

  // Clear form data for a specific form type
  clearFormData: (formType) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEYS.FORM_DATA) || '{}');
      delete existingData[formType];
      localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(existingData));
      return true;
    } catch (error) {
      console.error('Error clearing form data:', error);
      return false;
    }
  },

  // Clear all form data
  clearAllFormData: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.FORM_DATA);
      return true;
    } catch (error) {
      console.error('Error clearing all form data:', error);
      return false;
    }
  }
}; 