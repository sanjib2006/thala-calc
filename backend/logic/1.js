module.exports = (name) => {
  const cleanedName = name.replace(/\s/g, '');
  
  if (cleanedName.length === 7) {
    const letters = cleanedName.split('');
    const formattedLetters = letters.map((letter, index) => {
      const isLast = index === letters.length - 1;
      return `${letter.toUpperCase()}${isLast ? '' : ' + '}`;
    }).join('');

    return `
✨ ${formattedLetters} = ${letters.length} Letters ✨

🎉 THALA FOR A REASON! 🎉

"${name}" is special because:
• It has exactly 7 letters
• 7 is Dhoni's iconic jersey number
• You're clearly a true THALA fan!

#ThalaForAReason #WhistlePodu 🦁💛
    `;
  }
  
  return null;
};