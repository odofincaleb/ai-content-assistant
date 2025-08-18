const fs = require('fs');

// Read both files
const homeScreenContent = fs.readFileSync('src/screens/HomeScreen.tsx', 'utf8');
const formConfigsContent = fs.readFileSync('src/utils/formConfigs.ts', 'utf8');

// Extract form configurations from formConfigs.ts
const formMatches = formConfigsContent.match(/'[A-Z_\s/]+': \{/g);
const availableForms = new Set();
if (formMatches) {
  formMatches.forEach(match => {
    const formName = match.match(/'([^']+)'/)[1];
    availableForms.add(formName);
  });
}

// Extract scripts from HomeScreen.tsx categories
const categoriesMatch = homeScreenContent.match(/const categories = \{([\s\S]*?)\};/);
const scriptsInCategories = [];
const missingScripts = [];

if (categoriesMatch) {
  const categoriesContent = categoriesMatch[1];
  const typeMatches = categoriesContent.match(/type: '([^']+)'/g);
  
  if (typeMatches) {
    typeMatches.forEach(match => {
      const scriptName = match.match(/type: '([^']+)'/)[1];
      scriptsInCategories.push(scriptName);
      
      if (!availableForms.has(scriptName)) {
        missingScripts.push(scriptName);
      }
    });
  }
}

console.log('=== ANALYSIS RESULTS ===');
console.log(`Scripts in HomeScreen.tsx categories: ${scriptsInCategories.length}`);
console.log(`Available forms in formConfigs.ts: ${availableForms.size}`);
console.log(`Scripts in categories that don't exist in formConfigs: ${missingScripts.length}`);

if (missingScripts.length > 0) {
  console.log('\n=== MISSING SCRIPTS (in categories but not in formConfigs) ===');
  missingScripts.forEach((script, index) => {
    console.log(`${index + 1}. ${script}`);
  });
}

// Also check for duplicates in categories
const duplicates = [];
const seen = new Set();
scriptsInCategories.forEach(script => {
  if (seen.has(script)) {
    if (!duplicates.includes(script)) {
      duplicates.push(script);
    }
  } else {
    seen.add(script);
  }
});

if (duplicates.length > 0) {
  console.log('\n=== DUPLICATE SCRIPTS IN CATEGORIES ===');
  duplicates.forEach((script, index) => {
    console.log(`${index + 1}. ${script}`);
  });
}

console.log('\n=== SUMMARY ===');
console.log(`Expected script count after cleanup: ${scriptsInCategories.length - missingScripts.length - duplicates.length}`);
console.log(`This should match formConfigs.ts count: ${availableForms.size}`);