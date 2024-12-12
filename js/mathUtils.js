window.MathUtils = {
    // 10'un katlarını üretir (10-100 arası)
    generateMultipleOfTen: () => Math.floor(Math.random() * 9 + 1) * 10, // 10 ile 90 arası

    // Verilen sayıya yakın pozitif yanlış cevaplar üretir
    generateWrongAnswers: (correctAnswer) => {
        let wrongAnswers = [];
        
        // İlk yanlış cevap
        let wrong1 = correctAnswer + 10;
        if (wrong1 > 100) wrong1 = correctAnswer - 10;
        wrongAnswers.push(wrong1);
        
        // İkinci yanlış cevap
        let wrong2 = correctAnswer - 10;
        if (wrong2 <= 0) wrong2 = correctAnswer + 20;
        wrongAnswers.push(wrong2);
        
        return wrongAnswers;
    },

    // Diziyi karıştırır
    shuffleArray: (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    // Pozitif sayı kontrolü
    ensurePositive: (num1, num2) => {
        return num1 + num2 <= 100 && num1 > 0 && num2 > 0;
    }
};