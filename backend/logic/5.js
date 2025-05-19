//power 4 edition 
const { getPathsTo7 } = require('./digitPathCalc');

/**
 * Converts a name to its power-4 letter value sum and checks for a 7 path.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} The Thala message or null if no path reaches 7.
 */
module.exports = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return null;

  const letters = [...cleanName];
  const letterValues = letters.map(c => c.charCodeAt(0) - 64);
  const power4Values = letterValues.map(v => v ** 4);
  const total = power4Values.reduce((sum, val) => sum + val, 0);

  const pathsTo7 = getPathsTo7(total);
  if (pathsTo7.length === 0) return null;

  const [path, ops] = [pathsTo7[0][1], pathsTo7[0][2]];

  const templates = [

    // Template 1: HyperCore
    () => [
      `🚀 HyperCore Scan: "${cleanName}"`,
      "",
      "💥 Letters charged to 4th power:",
      letters.map((c, i) => `  ${c} = ${letterValues[i]}^4 = ${power4Values[i]}`).join('\n'),
      `\n🔢 Total Core Energy: ${total}`,
      "",
      `➡️ Route to 7: ${path.join(' → ')}`,
      "🔬 Breakdown:",
      ops.map((step, i) => `  Step ${i + 1}: ${step}`).join('\n'),
      "",
      "✅ Destination: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#QuantumName #Power4 #ThalaForAReason"
    ].join('\n'),

    // Template 2: Destiny Formula
    () => [
      `🧮 Destiny Formula Unlocked for "${cleanName}"`,
      "",
      "📊 Calculating (position^4) for each letter:",
      letters.map((c, i) => `${c}(${letterValues[i]}^4) = ${power4Values[i]}`).join(', '),
      `\nSum = ${total}`,
      "",
      `📈 Pathway: ${path.join(' → ')}`,
      "🧠 Operations:",
      ops.map((step, i) => `  • ${step}`).join('\n'),
      "",
      "🎯 It ends at 7!",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#DestinyAligned #PowerPath #ThalaForAReason"
    ].join('\n'),

    // Template 3: Legendary Circuit
    () => [
      `💫 Legendary Circuit: "${cleanName}"`,
      "",
      "🔡 Letter Voltages (raised to 4th power):",
      letters.map((c, i) => `  ${c} = ${power4Values[i]}`).join('\n'),
      `\nTotal Circuit Power: ${total}`,
      "",
      `⚡ Energy Flow: ${path.join(' → ')}`,
      "🔍 Operational Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🏁 Final Output: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#LegendName #PowerVolt #ThalaForAReason"
    ].join('\n'),

    // Template 4: Clean & Confident
    () => [
      `🔍 Analysis Report: "${cleanName}"`,
      "",
      `Power 4 Values: ${power4Values.join(' + ')} = ${total}`,
      `\n➡️ Steps: ${path.join(' → ')}`,
      "",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🎯 Reached: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#CleanCut #4thPower #ThalaForAReason"
    ].join('\n')
  ];

  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
