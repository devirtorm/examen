export function containsSequentialNumbers(password) {
    for (let i = 0; i < password.length - 1; i++) {
      if (!isNaN(password[i])) {
        const currentNumber = parseInt(password[i], 10);
        if (i > 0 && !isNaN(password[i - 1])) {
          const prevNumber = parseInt(password[i - 1], 10);
          if (
            currentNumber - prevNumber === 1 ||
            prevNumber - currentNumber === 1
          ) {
            return true; // Encuentra números consecutivos hacia atrás
          }
        }
        if (i < password.length - 1 && !isNaN(password[i + 1])) {
          const nextNumber = parseInt(password[i + 1], 10);
          if (
            currentNumber - nextNumber === 1 ||
            nextNumber - currentNumber === 1
          ) {
            return true; // Encuentra números consecutivos hacia adelante
          }
        }
      }
    }

    
    return false;
  }

  export function containsCommonSpanishWord(password, spanishWords) {
    const letterSequences = password.match(/[a-zA-ZñÑáéíóúÁÉÍÓÚ]+/g) || [];
    const lowerCaseSequences = letterSequences.map(sequence => sequence.toLowerCase());

    return spanishWords.some(word => lowerCaseSequences.includes(word.toLowerCase()));
  }