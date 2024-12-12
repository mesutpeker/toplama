// Quiz oyununu başlat
window.quizGame = new QuizGame();

// İlk soruyu göster
window.quizGame.displayQuestion();

// 3D efektleri ekle
AnimationUtils.addFloatingEffect(document.querySelector('.quiz-box'));
