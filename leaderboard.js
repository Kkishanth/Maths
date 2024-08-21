document.addEventListener('DOMContentLoaded', () => {
    const leaderboardList = document.getElementById('leaderboard-list');

    function renderLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        
        // Sort the leaderboard by score in descending order
        leaderboard.sort((a, b) => b.score - a.score);

        // Clear the current leaderboard list
        leaderboardList.innerHTML = '';

        // Populate the leaderboard list with scores
        leaderboard.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="rank">${index + 1}</span>
                <span class="username">${entry.username}</span>
                <span class="score">${entry.score}</span>
            `;
            leaderboardList.appendChild(listItem);
        });
    }

    // Initialize and render the leaderboard
    renderLeaderboard();
});
