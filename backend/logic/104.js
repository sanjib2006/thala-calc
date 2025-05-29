// sum of cubes 
const { getPathsTo7 } = require('./digitPathCalc');

/**
 * Converts a name to its cubed letter value sum and checks for a 7 path.
 * @param {string} name - The input name to evaluate.
 * @returns {string|null} The Thala message or null if no path reaches 7.
 */
module.exports = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return null;

  const letters = [...cleanName];
  const letterValues = letters.map(c => c.charCodeAt(0) - 64);
  const cubedValues = letterValues.map(v => v ** 3);
  const total = cubedValues.reduce((sum, val) => sum + val, 0);

  const pathsTo7 = getPathsTo7(total);
  if (pathsTo7.length === 0) return null;

  const [path, ops] = [pathsTo7[0][1], pathsTo7[0][2]];

  const templates = [

    // Template 1: Power Surge
    () => [
      `⚡ Power Surge Detected in "${cleanName}" ⚡`,
      "",
      "🔡 Letter strengths (cubed):",
      letters.map((c, i) => `  ${c} = ${letterValues[i]}³ = ${cubedValues[i]}`).join('\n'),
      `\n🔢 Total = ${total}`,
      "",
      `➡️ Path to 7: ${path.join(' → ')}`,
      "🔍 Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "🔥 Ends at 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#PowerOfSeven #WhistlePodu 🦁💛 #ThalaForAReason"
    ].join('\n'),

    // Template 2: Mythical Energy
    () => [
      `🐉 Mythical Energy in "${cleanName}"`,
      "",
      "🔢 Cubed letter values:",
      letters.map((c, i) => `  ${c} → ${letterValues[i]}³ = ${cubedValues[i]}`).join('\n'),
      `\nTotal Energy: ${total}`,
      "",
      `🚀 Magic path: ${path.join(' → ')}`,
      "🧩 Steps traced:",
      ops.map((step, i) => `  Step ${i + 1}: ${step}`).join('\n'),
      "",
      "💫 Result: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#MysticMath #Number7 #ThalaForAReason"
    ].join('\n'),

    // Template 3: Thala Circuit
    () => [
      `🧠 "${cleanName}" in the Thala Circuit`,
      "",
      "📐 Cube charge per letter:",
      letters.map((c, i) => `${c}(${letterValues[i]}³) = ${cubedValues[i]}`).join(', '),
      `\nTotal Sum = ${total}`,
      "",
      `⚙️ Flow to 7: ${path.join(' → ')}`,
      "🔄 Operations:",
      ops.map((step, i) => `  • ${step}`).join('\n'),
      "",
      "🎯 Destination: 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#DigitFlow #CubeEnergy #ThalaForAReason"
    ].join('\n'),

    // Template 4: Cubic Precision (Simple)
    () => [
      `📊 Cubic Precision Analysis: "${cleanName}"`,
      "",
      `Letter Cubes: ${cubedValues.join(' + ')} = ${total}`,
      `\n➡️ Journey: ${path.join(' → ')}`,
      "",
      "Steps:",
      ops.map((step, i) => `  ${i + 1}. ${step}`).join('\n'),
      "",
      "✔️ Ends in 7",
      "🎉 THALA FOR A REASON! 🎉",
      "",
      "#SimpleMath #ThalaCubes #ThalaForAReason"
    ].join('\n')
  ];

  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
