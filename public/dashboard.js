// File: public/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  const welcomeMessage = document.getElementById('welcome-message');
  const quotesContainer = document.getElementById('quotes-container');
  const refreshQuotesBtn = document.getElementById('refresh-quotes');
  const updateStatsBtn = document.getElementById('update-stats');
  const focusLevelElem = document.getElementById('focus-level');
  const lastSessionElem = document.getElementById('last-session');
  const progressBarInner = document.getElementById('progress-bar-inner');

  // 1. Handle URL Parameters (e.g., ?user=John)
  const params = new URLSearchParams(window.location.search);
  const userName = params.get('user');
  if (userName) {
    welcomeMessage.textContent = `Hello, ${userName}!`;
  }

  // 2. Load / Set Initial Stats from Local Storage
  loadStats();

  // 3. Fetch Motivational Quotes (from JSON or external API)
  fetchQuotes();

  // Refresh quotes on button click
  refreshQuotesBtn.addEventListener('click', fetchQuotes);

  // Update stats on button click
  updateStatsBtn.addEventListener('click', () => {
    const newFocus = prompt('Enter your current focus level (1-10)', '5');
    if (newFocus) {
      const stats = {
        focusLevel: newFocus,
        lastSession: new Date().toLocaleString()
      };
      saveStats(stats);
      displayStats(stats);
    }
  });

  // Animate progress bar to show daily progress
  animateProgressBar();

  // ============ HELPER FUNCTIONS ============

  // Fetch quotes from local JSON or external API
  function fetchQuotes() {
    quotesContainer.innerHTML = 'Loading quotes...';
    // If using a local file, place quotes.json in /public 
    // If using an API, replace url with the appropriate endpoint
    const url = 'quotes.json'; // or 'https://api.quotable.io/quotes?limit=3'

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching quotes: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // If using an external API, data structure might differ
        quotesContainer.innerHTML = '';
        data.forEach((quoteObj) => {
          const p = document.createElement('p');
          p.textContent = quoteObj.text
            || quoteObj.quote
            || quoteObj.tip
            || 'No quote text found.';
          quotesContainer.appendChild(p);
        });
      })
      .catch(err => {
        quotesContainer.innerHTML = 'Error loading quotes.';
        console.error(err);
      });
  }

  // Load stats from local storage
  function loadStats() {
    const savedStats = JSON.parse(localStorage.getItem('studyStats')) || null;
    if (savedStats) {
      displayStats(savedStats);
    }
  }

  // Save stats to local storage
  function saveStats(stats) {
    localStorage.setItem('studyStats', JSON.stringify(stats));
  }

  // Display stats in the DOM
  function displayStats(stats) {
    focusLevelElem.textContent = stats.focusLevel;
    lastSessionElem.textContent = stats.lastSession;
  }

  // Animate the progress bar to a random daily progress (for demo)
  function animateProgressBar() {
    // Example: randomly fill between 0% and 100%
    const progress = Math.floor(Math.random() * 101);
    progressBarInner.style.width = progress + '%';
  }
});
