document.addEventListener('DOMContentLoaded', () => {
    // Correct answers for the quiz
    const correctAnswers = {
        q0: '156', // 12 * 13
        q1: '289', // 17^2
        q2: '13',  // Solve for x: 5x - 3 = 2x + 10 -> x = 13
        q3: '12',  // Square root of 144
        q4: '5040',// 7!
        q5: '6',   // x = 6
        q6: '1024',// 2^10
        q7: '5',   // Solve for y: 3y + 4 = 19 -> y = 5
        q8: '3.1416',// Pi up to 4 decimal places
        q9: '5'    // 5th Fibonacci number (0, 1, 1, 2, 3, 5)
    };

    const loginPage = document.getElementById('login-page');
    const quizPage = document.getElementById('quiz-page');
    const resultPage = document.getElementById('result-page');
    const quizForm = document.getElementById('quiz-form');

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();
        loginPage.style.display = 'none';
        quizPage.style.display = 'block';
        startTimer(); // Optional: You can implement a timer function
    });

    // Handle quiz form submission
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Check if all questions are answered
        const unansweredQuestions = Object.keys(correctAnswers).some(key => {
            const userAnswer = document.querySelector(`input[name=${key}]`).value.trim();
            return userAnswer === '';
        });

        if (unansweredQuestions) {
            alert('Please answer all questions before submitting.');
            return; // Prevent form submission
        }

        let score = 0;

        // Check answers and calculate score
        for (const [key, value] of Object.entries(correctAnswers)) {
            const userAnswer = document.querySelector(`input[name=${key}]`).value.trim();
            if (userAnswer === value) {
                score += 10; // Award 10 points for each correct answer
            }
        }

        // Save the score to the leaderboard and show results
        const username = document.getElementById('username').value.trim();
        updateLeaderboard(username, score);

        document.getElementById('score').textContent = `Your score: ${score} points`;
        quizPage.style.display = 'none';
        resultPage.style.display = 'block';
    });

    // Optional: Timer function (if you want to add a countdown timer)
    function startTimer() {
        const timeDisplay = document.getElementById('time');
        let time = 24 * 60; // 24 minutes in seconds
        const timer = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            time--;

            if (time < 0) {
                clearInterval(timer);
                quizForm.dispatchEvent(new Event('submit')); // Automatically submit when time is up
            }
        }, 1000);
    }

    // Function to update the leaderboard with the new score
    function updateLeaderboard(username, score) {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push({ username, score });
        leaderboard.sort((a, b) => b.score - a.score); // Sort by score descending
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
});
