// thalaLogicAdvanced.js

/**
 * Checks if a name yields the number 7 via sum, product, or difference of its letters' positions.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} A detailed Thala report or null if no check hits 7.
 */
module.exports = (name) => {
  // Normalize input: remove non-letters, convert to uppercase
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return null;

  // Compute letter values (A=1, B=2, ..., Z=26)
  const letters = [...cleanName];
  const letterValues = letters.map(char => char.charCodeAt(0) - 64);
  const lettersSum = letterValues.reduce((sum, val) => sum + val, 0);

  // Extract digits from the total
  const digits = String(lettersSum).split('').map(Number);

  // Define operations with calculation and test
  const operations = [
    {
      type: 'Sum',
      result: digits.reduce((a, b) => a + b, 0),
      format: () => `${digits.join(' + ')} = 7`
    },
    {
      type: 'Product',
      result: digits.reduce((a, b) => a * b, 1),
      format: () => `${digits.join(' × ')} = 7`
    },
    {
      type: 'Difference',
      result: digits.length === 2 ? Math.abs(digits[0] - digits[1]) : null,
      format: () => `|${digits[0]} - ${digits[1]}| = 7`
    }
  ];

  // Find the first successful operation
  const success = operations.find(op => op.result === 7);
  if (!success) return null;

  // Build the explanation using the original format,
  // including letters next to their values
  const letterPairs = letters.map((char, idx) => `${char}(${letterValues[idx]})`);
  const explanation = [
    `"${cleanName}" is special because:`,
    `🔢 Letter values: ${letterPairs.join(' + ')} = ${lettersSum}`,
    `🔍 Digits: [${digits.join(', ')}]`,
    `✨ ${success.type} of digits: ${success.format()}`,
    '',
    '🎉 THALA FOR A REASON! 🎉',
    '#ThalaForAReason #WhistlePodu 🦁💛'
  ];

  return explanation.join('\n');
};
