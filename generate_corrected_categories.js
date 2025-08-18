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

// Extract categories structure from HomeScreen.tsx
const categoriesMatch = homeScreenContent.match(/const categories = \{([\s\S]*?)\};/);
const correctedCategories = {};

if (categoriesMatch) {
  const categoriesContent = categoriesMatch[1];
  
  // Extract each category
  const categoryMatches = categoriesContent.match(/'([^']+)':\s*\[([\s\S]*?)\]/g);
  
  if (categoryMatches) {
    categoryMatches.forEach(match => {
      const categoryName = match.match(/'([^']+)':/)[1];
      const categoryContent = match.match(/\[([\s\S]*?)\]/)[1];
      
      // Extract scripts from this category
      const scriptMatches = categoryContent.match(/\{\s*type:\s*'([^']+)',\s*description:\s*'([^']+)'\s*\}/g);
      
      if (scriptMatches) {
        const validScripts = [];
        
        scriptMatches.forEach(scriptMatch => {
          const scriptType = scriptMatch.match(/type:\s*'([^']+)'/)[1];
          const scriptDescription = scriptMatch.match(/description:\s*'([^']+)'/)[1];
          
          // Only include if it exists in formConfigs
          if (availableForms.has(scriptType)) {
            validScripts.push({ type: scriptType, description: scriptDescription });
          }
        });
        
        if (validScripts.length > 0) {
          correctedCategories[categoryName] = validScripts;
        }
      }
    });
  }
}

// Count total scripts in corrected categories
let totalCorrectedScripts = 0;
Object.values(correctedCategories).forEach(categoryScripts => {
  totalCorrectedScripts += categoryScripts.length;
});

console.log('=== CORRECTED CATEGORIES ANALYSIS ===');
console.log(`Available forms in formConfigs.ts: ${availableForms.size}`);
console.log(`Scripts in corrected categories: ${totalCorrectedScripts}`);
console.log(`Categories with valid scripts: ${Object.keys(correctedCategories).length}`);

// Show breakdown by category
console.log('\n=== CATEGORY BREAKDOWN ===');
Object.keys(correctedCategories).forEach(categoryName => {
  console.log(`${categoryName}: ${correctedCategories[categoryName].length} scripts`);
});

// Generate the corrected categories object as a string
let categoriesString = 'const categories = {\n';
Object.keys(correctedCategories).forEach(categoryName => {
  categoriesString += `  '${categoryName}': [\n`;
  correctedCategories[categoryName].forEach(script => {
    categoriesString += `    { type: '${script.type}', description: '${script.description}' },\n`;
  });
  categoriesString += `  ],\n`;
});
categoriesString += '};';

// Write the corrected categories to a file
fs.writeFileSync('corrected_categories.js', categoriesString);
console.log('\n=== CORRECTED CATEGORIES SAVED ===');
console.log('Corrected categories object saved to corrected_categories.js');
console.log('You can copy this content to replace the categories object in HomeScreen.tsx');