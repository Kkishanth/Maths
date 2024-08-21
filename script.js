document.addEventListener('DOMContentLoaded', function() {
    const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in a day
    const quizDuration = 24 * 60 * 60; // 24 hours in seconds

    // Handle login
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        if (username) {
            localStorage.setItem('username', username);
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('quiz-page').style.display = 'block';
            loadQuestions();
            startTimer();
        }
    });

    // Handle quiz form submission
    document.getElementById('quiz-form').addEventListener('submit', function(e) {
        e.preventDefault();
        let score = 0;
        const formData = new FormData(e.target);
        for (let [key, value] of formData.entries()) {
            if (value === 'correct') {
                score += 10;
            }
        }
        localStorage.setItem('score', score);
        document.getElementById('quiz-page').style.display = 'none';
        document.getElementById('result-page').style.display = 'block';
        document.getElementById('score').innerText = `You scored ${score} out of 100.`;
    });

    function loadQuestions() {
        fetch('questions.html')
            .then(response => response.text())
            .then(data => {
                const container = document.getElementById('questions-container');
                container.innerHTML = data;
            });
    }

    function startTimer() {
        const now = Date.now();
        const startTime = localStorage.getItem('quizStartTime');
        const endTime = startTime ? parseInt(startTime) + ONE_DAY : now + ONE_DAY;

        if (!startTime || now > endTime) {
            localStorage.setItem('quizStartTime', now);
            localStorage.removeItem('score');
        }

        updateTimer(endTime);
    }

    function updateTimer(endTime) {
        const timer = document.getElementById('time');
        const interval = setInterval(() => {
            const now = Date.now();
            const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            timer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(interval);
                document.getElementById('quiz-page').style.display = 'none';
                document.getElementById('result-page').style.display = 'block';
                document.getElementById('score').innerText = 'Time is up!';
            }
        }, 1000);
    }
});
function saveToExcel(score) {
    const username = localStorage.getItem('username');

    fetch('/save-results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, score })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Confirmation message from the server
    });
}
