//sum of squares

const { getPathsTo7 } = require('./digitPathCalc');

/**
 * Converts a name to its squared letter value sum and checks for a 7 path.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} The Thala message or null if no path reaches 7.
 */
module.exports = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return null;

  const letters = [...cleanName];
  const letterValues = letters.map(c => c.charCodeAt(0) - 64);
  const squaredValues = letterValues.map(v => v * v);
  const total = squaredValues.reduce((sum, val) => sum + val, 0);

  const pathsTo7 = getPathsTo7(total);
  if (pathsTo7.length === 0) return null;

  const [path, ops] = [pathsTo7[0][1], pathsTo7[0][2]];

  const templates = [

    // Template 1: Spark of Destiny
    () => [
      `✨ The Spark Behind "${cleanName}" ✨`,
      "",
      "Each letter's strength (squared):",
      letters.map((c, i) => `  ${c} = ${letterValues[i]}² = ${squaredValues[i]}`).join('\n'),
      `\n🧮 Total = ${total}`,
      "",
      `📈 Journey to 7: ${path.join(' → ')}`,
      "🔍 Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🎯 7 is reached!",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#WhistlePodu 🦁💛 #7Magic #ThalaForAReason"
    ].join('\n'),

    // Template 2: Divine Sequence
    () => [
      `🪔 Divine Code of "${cleanName}"`,
      "",
      "📖 Letter powers (squared positions):",
      letters.map((c, i) => `  ${c} → ${letterValues[i]}² = ${squaredValues[i]}`).join('\n'),
      `\n🔢 Total sacred value: ${total}`,
      "",
      `🛤️ Number path: ${path.join(' → ')}`,
      "📌 Transformation steps:",
      ops.map((step, i) => `  Step ${i + 1}: ${step}`).join('\n'),
      "",
      "💫 The number 7 emerges!",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#Numerology #ThalaVibes #ThalaForAReason"
    ].join('\n'),

    // Template 3: Code of the Lion
    () => [
      `🦁 Code of the Lion: "${cleanName}"`,
      "",
      "Strength of each letter squared:",
      letters.map((c, i) => `${c}(${letterValues[i]}²) = ${squaredValues[i]}`).join(', '),
      `\n🔢 Total Power = ${total}`,
      "",
      `➡️ Path to 7: ${path.join(' → ')}`,
      "🛠️ Steps taken:",
      ops.map((step, i) => `  • ${step}`).join('\n'),
      "",
      "🏁 Destination: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#LionHeart #7Theory #ThalaForAReason"
    ].join('\n'),

    // Template 4: Minimal Legendary Style
    () => [
      `📣 "${cleanName}"`,
      "",
      `Letter position squares: ${squaredValues.join(' + ')} = ${total}`,
      `\nPath to 7: ${path.join(' → ')}`,
      "",
      "Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "✅ Ends in 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#MinimalMagic #7Vibes #ThalaForAReason"
    ].join('\n')
  ];

  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
