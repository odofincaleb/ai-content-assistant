export const humanizeText = async (text: string, imperfectionPercentage: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let humanized = text;
      const words = humanized.split(/\s+/);
      const totalWords = words.length;
      const wordsToChange = Math.max(1, Math.floor((imperfectionPercentage / 100) * totalWords));
      
      let modifiedWords = [...words];
      let changesMade = 0;
      const maxAttempts = wordsToChange * 5;
      let attempts = 0;

      const imperfectionTypes = [
        {
          name: 'misspellings',
          patterns: [
            { from: /separate/gi, to: 'seperate' },
            { from: /receive/gi, to: 'recieve' },
            { from: /occasion/gi, to: 'occassion' },
            { from: /definitely/gi, to: 'definately' },
            { from: /accommodate/gi, to: 'accomodate' },
            { from: /necessary/gi, to: 'neccessary' },
            { from: /successful/gi, to: 'sucessful' },
            { from: /believe/gi, to: 'beleive' },
          ]
        },
        {
          name: 'homophones',
          patterns: [
            { from: /\btheir\b/gi, to: 'there' },
            { from: /\bthere\b/gi, to: 'their' },
            { from: /\byour\b/gi, to: "you're" },
            { from: /\byou're\b/gi, to: 'your' },
            { from: /\bits\b/gi, to: "it's" },
            { from: /\bit's\b/gi, to: 'its' },
            { from: /\bto\b/gi, to: 'too' },
            { from: /\btoo\b/gi, to: 'to' },
            { from: /\btwo\b/gi, to: 'to' },
            { from: /\bwhere\b/gi, to: 'were' },
            { from: /\bwere\b/gi, to: 'where' },
          ]
        },
        {
          name: 'capitalization',
          transform: (word: string) => {
            if (word.length > 1) {
              if (word[0] === word[0].toUpperCase()) {
                if (Math.random() > 0.5) {
                  const firstChar = word[0];
                  const secondChar = word[1];
                  const rest = word.slice(2);
                  return firstChar + secondChar.toUpperCase() + rest;
                }
              } else {
                if (Math.random() > 0.5) {
                  return word.charAt(0).toUpperCase() + word.slice(1);
                }
              }
            }
            return word;
          }
        },
        {
          name: 'typos',
          patterns: [
            { from: /\bthe\b/gi, to: 'teh' },
            { from: /\btheir\b/gi, to: 'thier' },
            { from: /\breceive\b/gi, to: 'recieve' },
            { from: /\boccasion\b/gi, to: 'occassion' },
            { from: /\bdefinitely\b/gi, to: 'definately' },
          ]
        },
        {
          name: 'punctuation',
          patterns: [
            { from: /\bive\b/gi, to: 'Ive' },
            { from: /\bdont\b/gi, to: 'dont' },
            { from: /\bcant\b/gi, to: 'cant' },
            { from: /\bwont\b/gi, to: 'wont' },
          ]
        },
        {
          name: 'spacing',
          transform: (word: string) => {
            if (Math.random() > 0.7) {
              return word + '  ';
            }
            return word;
          }
        },
        {
          name: 'repeatedWords',
          transform: (word: string) => {
            if (Math.random() > 0.8) {
              return word + ' ' + word;
            }
            return word;
          }
        },
        {
          name: 'grammar',
          patterns: [
            { from: /\bgoes\b/gi, to: 'go' },
            { from: /\beats\b/gi, to: 'eat' },
            { from: /\bhas\b/gi, to: 'have' },
          ]
        },
        {
          name: 'wordChoice',
          patterns: [
            { from: /\bexcept\b/gi, to: 'accept' },
            { from: /\beffect\b/gi, to: 'affect' },
            { from: /\bthan\b/gi, to: 'then' },
          ]
        },
        {
          name: 'fillerWords',
          transform: (word: string) => {
            if (Math.random() > 0.9) {
              const fillerWords = ['um', 'like', 'you know', 'actually', 'basically', 'sort of', 'kind of'];
              const randomFiller = fillerWords[Math.floor(Math.random() * fillerWords.length)];
              return word + ' ' + randomFiller;
            }
            return word;
          }
        }
      ];

      while (changesMade < wordsToChange && attempts < maxAttempts) {
        attempts++;
        const randomWordIndex = Math.floor(Math.random() * modifiedWords.length);
        const randomType = imperfectionTypes[Math.floor(Math.random() * imperfectionTypes.length)];
        
        if (modifiedWords[randomWordIndex] && modifiedWords[randomWordIndex].length > 0) {
          const originalWord = modifiedWords[randomWordIndex];
          let modified = false;
          let newWord = originalWord;

          if (randomType.patterns) {
            for (const pattern of randomType.patterns) {
              if (pattern.from.test(originalWord)) {
                newWord = originalWord.replace(pattern.from, pattern.to);
                modified = true;
                break;
              }
            }
          } else if (randomType.transform) {
            const transformed = randomType.transform(originalWord);
            if (transformed !== originalWord) {
              newWord = transformed;
              modified = true;
            }
          }

          if (modified) {
            modifiedWords[randomWordIndex] = newWord;
            changesMade++;
          }
        }
      }

      resolve(modifiedWords.join(' '));
    }, 1000);
  });
};
