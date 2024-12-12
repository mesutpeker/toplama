class QuizGame {
    constructor() {
        this.score = 0;
        this.currentQuestion = null;
        this.autoNextTimeout = null;
    }

    generateQuestion() {
        const num1 = window.MathUtils.generateMultipleOfTen();
        const num2 = window.MathUtils.generateMultipleOfTen();
        
        // Ensure numbers are valid and their sum is <= 100
        if (!window.MathUtils.ensurePositive(num1, num2)) {
            return this.generateQuestion();
        }

        const sum = num1 + num2;
        const wrongAnswers = window.MathUtils.generateWrongAnswers(sum);
        
        // Randomly decide which number to hide
        const hideFirst = Math.random() < 0.5;
        const questionText = hideFirst ? 
            `? + ${num2} = ${sum}` : 
            `${num1} + ? = ${sum}`;

        const correctAnswer = hideFirst ? num1 : num2;
        const options = [correctAnswer, ...wrongAnswers];
        window.MathUtils.shuffleArray(options);

        return {
            question: questionText,
            options: options,
            correctAnswer: correctAnswer,
            correctIndex: options.indexOf(correctAnswer)
        };
    }

    displayQuestion() {
        this.currentQuestion = this.generateQuestion();
        
        const questionElement = document.getElementById('question');
        questionElement.innerHTML = `<span class="question-highlight">${this.currentQuestion.question}</span>`;
        
        const options = document.getElementsByClassName('option');
        for (let i = 0; i < options.length; i++) {
            options[i].textContent = this.currentQuestion.options[i];
            options[i].className = 'option option-3d';
            options[i].disabled = false;
        }

        // Update score display
        document.getElementById('score-value').textContent = this.score;
    }

    checkAnswer(selectedIndex) {
        if (!this.currentQuestion) return;
        
        const options = document.getElementsByClassName('option');
        const selectedOption = options[selectedIndex];
        const correctOption = options[this.currentQuestion.correctIndex];
        
        // Disable all options
        for (let option of options) {
            option.disabled = true;
        }

        if (selectedIndex === this.currentQuestion.correctIndex) {
            this.handleCorrectAnswer(selectedOption);
        } else {
            this.handleWrongAnswer(selectedOption, correctOption);
        }
    }

    handleCorrectAnswer(selectedOption) {
        selectedOption.classList.add('correct');
        window.AnimationUtils.pulse(selectedOption);
        this.showEmojiFeedback(true);
        this.score += 10;
        this.autoNextTimeout = setTimeout(() => this.nextQuestion(), 2000);
    }

    handleWrongAnswer(selectedOption, correctOption) {
        selectedOption.classList.add('wrong');
        correctOption.classList.add('correct');
        window.AnimationUtils.shake(selectedOption);
        this.showEmojiFeedback(false);
        this.autoNextTimeout = setTimeout(() => this.nextQuestion(), 3000);
    }

    showEmojiFeedback(isCorrect) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-feedback';
        emoji.textContent = isCorrect ? '👍' : '☝️';
        emoji.style.animation = isCorrect ? 'emojiAppear 2s forwards' : 'emojiShake 3s forwards';
        document.querySelector('.quiz-box').appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, isCorrect ? 2000 : 3000);
    }

    nextQuestion() {
        if (this.autoNextTimeout) {
            clearTimeout(this.autoNextTimeout);
            this.autoNextTimeout = null;
        }
        this.displayQuestion();
    }
}