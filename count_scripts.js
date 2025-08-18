const fs = require('fs');

// Read the HomeScreen.tsx file
const content = fs.readFileSync('src/screens/HomeScreen.tsx', 'utf8');

// Extract the categories object
const categoriesMatch = content.match(/const categories = \{([\s\S]*?)\};/);

if (categoriesMatch) {
  // Extract just the categories content
  const categoriesContent = categoriesMatch[1];
  
  // Count scripts by counting the occurrences of "{ type:"
  const scriptMatches = categoriesContent.match(/\{ type:/g);
  const totalScripts = scriptMatches ? scriptMatches.length : 0;
  
  console.log('Total scripts found in categories object:', totalScripts);
  
  // Also count by category
  const categoryMatches = categoriesContent.match(/'([^']+)':\s*\[([\s\S]*?)\]/g);
  
  if (categoryMatches) {
    categoryMatches.forEach(match => {
      const categoryName = match.match(/'([^']+)':/)[1];
      const categoryContent = match.match(/\[([\s\S]*?)\]/)[1];
      const categoryScripts = categoryContent.match(/\{ type:/g);
      const count = categoryScripts ? categoryScripts.length : 0;
      console.log(`${categoryName}: ${count} scripts`);
    });
  }
} else {
  console.log('Categories object not found in the file');
}