const { getPathsTo7 } = require('./digitPathCalc');

/**
 * Converts a name to its numerical value and checks for a 7 path.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} The Thala message or null if no path reaches 7.
 */
module.exports = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return null;

  const letters = [...cleanName];
  const letterValues = letters.map(char => char.charCodeAt(0) - 64);
  const total = letterValues.reduce((sum, val) => sum + val, 0);

  const pathsTo7 = getPathsTo7(total);
  if (pathsTo7.length === 0) return null;

  const [path, ops] = [pathsTo7[0][1], pathsTo7[0][2]];

  const templates = [
    // Template 1: Simplified Dramatic Format
    () => [
      `🧠 Analysis of "${cleanName}"`,
      "",
      "➡️ Letter values:",
      letters.map((c, i) => `  ${c} = ${letterValues[i]}`).join('\n'),
      `\n🧮 Total = ${total}`,
      "",
      `📈 Path to 7: ${path.join(' → ')}`,
      "🔢 Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🎉 YES! The journey ends in 7!",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "💬 Even numbers acknowledge it...",
      "This name echoes with greatness.",
      "",
      "#WhistlePodu 🦁💛 #7Magic #ThalaForAReason"
    ].join('\n'),

    // Template 2: Warrior Style (Simplified)
    () => [
      `⚔️ Warrior's Tale of "${cleanName}"`,
      "",
      "🔡 Strength in each letter:",
      letters.map((c, i) => `${c}(${letterValues[i]})`).join(' + ') + ` = ${total}`,
      "",
      `🛣️ Path to 7: ${path.join(' → ')}`,
      "🧠 Moves made:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🏆 Victory! 7 Achieved.",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "🕊️ Just like Thala finishes with grace,",
      "this name completes its destiny.",
      "",
      "#WhistlePodu 🦁💛 #ThalaMagic #MSD"
    ].join('\n')
  ];

  // Choose a random template
  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
