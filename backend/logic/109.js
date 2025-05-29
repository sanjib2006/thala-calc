const { getPathsTo7 } = require('./digitPathCalc');

/**
 * Converts a name to its power-5 letter value sum and checks for a 7 path.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} The Thala message or null if no path reaches 7.
 */
module.exports = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return null;

  const letters = [...cleanName];
  const letterValues = letters.map(c => c.charCodeAt(0) - 64);
  const power5Values = letterValues.map(v => v ** 5);
  const total = power5Values.reduce((sum, val) => sum + val, 0);

  const pathsTo7 = getPathsTo7(total);
  if (pathsTo7.length === 0) return null;

  const [path, ops] = [pathsTo7[0][1], pathsTo7[0][2]];

  const templates = [

    // Template 1: Cosmic Power
    () => [
      `🌌 Cosmic Power Unleashed: "${cleanName}"`,
      "",
      "⚡ Letter energies elevated to the 5th dimension:",
      letters.map((c, i) => `  ${c} = ${letterValues[i]}^5 = ${power5Values[i]}`).join('\n'),
      `\n🔮 Total Cosmic Force: ${total}`,
      "",
      `🛤️ Pathway to Destiny: ${path.join(' → ')}`,
      "🔎 Transformation Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🎯 Ultimate Number Achieved: 7",
      "🔥 THALA FOR A REASON! 🔥",
      "",
      "#Thala7 #Dhoni7 #SevenMagic #ThalaForAReason"
    ].join('\n'),

    // Template 2: Fifth Power Legacy
    () => [
      `⚡ Fifth Power Legacy: "${cleanName}"`,
      "",
      "🔢 Each letter’s 5th power value:",
      letters.map((c, i) => `${c}(${letterValues[i]}^5) = ${power5Values[i]}`).join(', '),
      `\n🧮 Summed Legacy Value: ${total}`,
      "",
      `➡️ Numeric Journey: ${path.join(' → ')}`,
      "🧩 Calculation Details:",
      ops.map((step, i) => `  • ${step}`).join('\n'),
      "",
      "🏆 Final Destination: 7",
      "🔥 THALA FOR A REASON! 🔥",
      "",
      "#Thala7 #DhoniLegend #SevenPower #ThalaForAReason"
    ].join('\n')
  ];

  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
