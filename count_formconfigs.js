const fs = require('fs');

// Read the formConfigs.ts file
const content = fs.readFileSync('src/utils/formConfigs.ts', 'utf8');

// Count the number of form configurations by counting the pattern 'FORM_NAME': {
const formMatches = content.match(/'[A-Z_\s/]+': \{/g);
const totalForms = formMatches ? formMatches.length : 0;

console.log('Total form configurations in formConfigs.ts:', totalForms);

// Also show the first few matches to verify
if (formMatches) {
  console.log('\nFirst 10 form configurations found:');
  formMatches.slice(0, 10).forEach((match, index) => {
    const formName = match.match(/'([^']+)'/)[1];
    console.log(`${index + 1}. ${formName}`);
  });
  
  if (formMatches.length > 10) {
    console.log(`... and ${formMatches.length - 10} more`);
  }
}