const { getPathsTo7 } = require('./digitPathCalc');

/**
 * Converts a name to the product of letter positions and checks for a 7 path.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} The Thala message or null if no path reaches 7.
 */
module.exports = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return null;

  const letters = [...cleanName];
  const letterValues = letters.map(c => c.charCodeAt(0) - 64);
  const product = letterValues.reduce((prod, val) => prod * val, 1);

  const pathsTo7 = getPathsTo7(product);
  if (pathsTo7.length === 0) return null;

  const [path, ops] = [pathsTo7[0][1], pathsTo7[0][2]];

  const templates = [

    // Template 1: Intensity Mode
    () => [
      `🔥 Power Breakdown of "${cleanName}"`,
      "",
      "📊 Letter Positions:",
      letters.map((c, i) => `  ${c} = ${letterValues[i]}`).join('\n'),
      `\n🧮 Total Product = ${product}`,
      "",
      `➡️ Journey to 7: ${path.join(' → ')}`,
      "🔍 Operations Applied:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🎯 Result = 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#WhistlePodu #ProductPower #ThalaForAReason"
    ].join('\n'),

    // Template 2: Math Warrior
    () => [
      `⚔️ Math Warrior: "${cleanName}"`,
      "",
      "🔡 Letter Values:",
      letterValues.join(' × ') + ` = ${product}`,
      "",
      `🛣️ Path to 7: ${path.join(' → ')}`,
      "🔢 Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "✅ Victory Number: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#NumberBattle #MathWarrior #ThalaForAReason"
    ].join('\n'),

    // Template 3: Mystical Calculation
    () => [
      `🔮 Mystical Math of "${cleanName}"`,
      "",
      "✨ Each letter holds energy:",
      letters.map((c, i) => `${c}(${letterValues[i]})`).join(', '),
      `\nCombined force (product): ${product}`,
      "",
      `🔗 Transformation Path: ${path.join(' → ')}`,
      "🔍 Steps to reveal destiny:",
      ops.map((step, i) => `  • ${step}`).join('\n'),
      "",
      "🌟 Sacred Number Reached: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#MysticMath #HiddenPatterns #ThalaForAReason"
    ].join('\n'),

    // Template 4: Bold Minimal
    () => [
      `🔍 Checking "${cleanName}"`,
      "",
      `Letter Values: ${letterValues.join(', ')}`,
      `Product = ${product}`,
      "",
      `Path: ${path.join(' → ')}`,
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "✅ Final Stop: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#SimpleLogic #PowerInProduct #ThalaForAReason"
    ].join('\n')
  ];

  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
