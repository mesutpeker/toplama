window.AnimationUtils = {
    addFloatingEffect: (element) => {
        element.classList.add('float');
    },

    shake: (element) => {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
    },

    pulse: (element) => {
        element.classList.add('pulse');
        setTimeout(() => element.classList.remove('pulse'), 500);
    },

    updateProgressBar: (progress) => {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${progress}%`;
    }
};