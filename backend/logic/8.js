const { getPathsTo7 } = require('./digitPathCalc');

/**
 * Counts letters in the name and checks for a 7 path.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} The Thala message or null if no path reaches 7.
 */
module.exports = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  const letterCount = cleanName.length;
  if (letterCount === 0) return null;

  const pathsTo7 = getPathsTo7(letterCount);
  if (pathsTo7.length === 0) return null;

  const [path, ops] = [pathsTo7[0][1], pathsTo7[0][2]];

  const templates = [

    // Template 1: Intensity Mode
    () => [
      `🔥 Letter Count Analysis of "${cleanName}"`,
      "",
      `🔠 Total Letters: ${letterCount}`,
      "",
      `➡️ Journey to 7: ${path.join(' → ')}`,
      "🔍 Operations Applied:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🎯 Result = 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#WhistlePodu #LetterLogic #ThalaForAReason"
    ].join('\n'),

    // Template 2: Math Warrior
    () => [
      `⚔️ Math Warrior: "${cleanName}"`,
      "",
      `🧮 Letter Count = ${letterCount}`,
      "",
      `🛣️ Path to 7: ${path.join(' → ')}`,
      "🔢 Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "✅ Victory Number: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#NumberBattle #LetterCount #ThalaForAReason"
    ].join('\n'),

    // Template 3: Mystical Calculation
    () => [
      `🔮 Mystical Name Reading of "${cleanName}"`,
      "",
      `✨ Character Count: ${letterCount}`,
      "",
      `🔗 Transformation Path: ${path.join(' → ')}`,
      "🔍 Steps to reveal destiny:",
      ops.map((step, i) => `  • ${step}`).join('\n'),
      "",
      "🌟 Sacred Number Reached: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#MysticCount #HiddenPatterns #ThalaForAReason"
    ].join('\n'),

    // Template 4: Bold Minimal
    () => [
      `🔍 Checking "${cleanName}"`,
      "",
      `Letter Count = ${letterCount}`,
      "",
      `Path: ${path.join(' → ')}`,
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "✅ Final Stop: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#SimpleLogic #PowerInCount #ThalaForAReason"
    ].join('\n')
  ];

  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
