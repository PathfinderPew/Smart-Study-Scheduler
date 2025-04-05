// File: public/dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  // Burger Menu Toggle
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

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
  if (refreshQuotesBtn) {
    refreshQuotesBtn.addEventListener('click', fetchQuotes);
  }

  // Update stats on button click
  if (updateStatsBtn) {
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
  }

  // Animate progress bar to show daily progress
  animateProgressBar();

  // ============ HELPER FUNCTIONS ============

  function fetchQuotes() {
    quotesContainer.innerHTML = 'Loading quotes...';
    const url = 'quotes.json';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching quotes: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
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

  function loadStats() {
    const savedStats = JSON.parse(localStorage.getItem('studyStats')) || null;
    if (savedStats) {
      displayStats(savedStats);
    }
  }

  function saveStats(stats) {
    localStorage.setItem('studyStats', JSON.stringify(stats));
  }

  function displayStats(stats) {
    focusLevelElem.textContent = stats.focusLevel;
    lastSessionElem.textContent = stats.lastSession;
  }

  function animateProgressBar() {
    const progress = Math.floor(Math.random() * 101);
    progressBarInner.style.width = progress + '%';
  }
});
