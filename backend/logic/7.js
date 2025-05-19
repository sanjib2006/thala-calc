const { getPathsTo7 } = require('./digitPathCalc');

/**
 * Converts a name to the product of squares of letter positions and checks for a 7 path.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} The Thala message or null if no path reaches 7.
 */
module.exports = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return null;

  const letters = [...cleanName];
  const letterPositions = letters.map(c => c.charCodeAt(0) - 64);
  const squaredValues = letterPositions.map(val => val ** 2);
  const productOfSquares = squaredValues.reduce((prod, val) => prod * val, 1);

  const pathsTo7 = getPathsTo7(productOfSquares);
  if (pathsTo7.length === 0) return null;

  const [path, ops] = [pathsTo7[0][1], pathsTo7[0][2]];

  const templates = [

    // Template 1: Power Squared
    () => [
      `🔢 Squares of Power in "${cleanName}"`,
      "",
      "🧮 Letter Values Squared:",
      letters.map((c, i) => `  ${c}² = ${squaredValues[i]}`).join('\n'),
      `\n✖️ Product of Squares = ${productOfSquares}`,
      "",
      `➡️ Journey to 7: ${path.join(' → ')}`,
      "🔍 Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🎯 Result = 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#PowerOfSquares #HiddenMath #ThalaForAReason"
    ].join('\n'),

    // Template 2: Epic Strength Mode
    () => [
      `⚡ Epic Strength of "${cleanName}"`,
      "",
      "💪 Every letter squared for strength:",
      letters.map((c, i) => `${c}(${letterPositions[i]})² = ${squaredValues[i]}`).join('\n'),
      "",
      `Total Power = ${productOfSquares}`,
      "",
      `🛤️ Trail to 7: ${path.join(' → ')}`,
      "🧠 Operations used:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🔥 Ends at 7!",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#StrengthInNumbers #ThalaApproved #ThalaForAReason"
    ].join('\n'),

    // Template 3: Silent Power Style
    () => [
      `📘 Quiet Calculation of "${cleanName}"`,
      "",
      `Letter positions: ${letterPositions.join(', ')}`,
      `Their squares: ${squaredValues.join(', ')}`,
      "",
      `Product of squares: ${productOfSquares}`,
      "",
      `Path: ${path.join(' → ')}`,
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "✅ Final result: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#SilentPower #CalculatedDestiny #ThalaForAReason"
    ].join('\n')
  ];

  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
