module.exports = (name) => {
  const cleanedName = name.replace(/\s/g, '');
  
  if (cleanedName.length !== 7) return null;

  const letters = cleanedName.split('');
  const formattedLetters = letters.map((letter, index) => {
    const isLast = index === letters.length - 1;
    return `${letter.toUpperCase()}${isLast ? '' : ' + '}`;
  }).join('');

  const templates = [

    // Template 1: Classic Celebration
    () => `
✨ ${formattedLetters} = 7 Letters ✨

🎉 THALA FOR A REASON! 🎉

"${cleanedName.toUpperCase()}" is special because:
• It has exactly 7 letters
• 7 is Dhoni's iconic jersey number
• You're clearly a true THALA fan!

#ThalaForAReason #WhistlePodu 🦁💛`,

    // Template 2: Bold & Proud
    () => `
🔥 POWER 7 ALERT! 🔥

${formattedLetters} = 7 — Just like Dhoni’s legendary jersey!

"${cleanedName.toUpperCase()}" shines bright because it’s all about that perfect 7-letter energy.

#Thala7 #CaptainCool #WhistlePodu 🦁💛`,

    // Template 3: Poetic Vibe
    () => `
🌟 Seven letters strong: ${formattedLetters}

"${cleanedName.toUpperCase()}" carries the spirit of the number 7,
The number of legends, the number of Thala.

Feel the power. Feel the pride.

#ThalaPower #Dhoni7 #WhistlePodu 🦁💛`,

    // Template 4: Minimal & Clean
    () => `
${formattedLetters} = 7 Letters

"${cleanedName.toUpperCase()}" matches the magic number of Dhoni’s jersey.

THALA FOR A REASON. Always.

#ThalaForAReason #SevenIsMagic #WhistlePodu 🦁💛`
  ];

  const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
  return chosenTemplate();
};
