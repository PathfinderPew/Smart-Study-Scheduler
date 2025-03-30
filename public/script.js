// File: public/script.js

import { fetchAndDisplayTips } from './modules/tips.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Handle URL parameters
  const params = new URLSearchParams(window.location.search);
  const userName = params.get('user'); // e.g. ?user=John
  const welcomeMsgElem = document.getElementById('welcome-msg');

  if (userName && welcomeMsgElem) {
    welcomeMsgElem.textContent = `Welcome back, ${userName}!`;
  }

  // 2. Use Local Storage to detect first-time visitors
  const visitedBefore = localStorage.getItem('visitedBefore');
  if (!visitedBefore) {
    alert('Welcome to the Smart Study Scheduler for the first time!');
    localStorage.setItem('visitedBefore', 'true');
  }

  // 3. Fetch and display tips from JSON
  fetchAndDisplayTips('tips.json', 'tips-container');

  // 4. Add an event listener for the "Get Started" button
  const getStartedBtn = document.getElementById('get-started');
  getStartedBtn.addEventListener('click', () => {
    alert('You are ready to start scheduling your study sessions!');
    // For example, redirect to the validation page, dashboard, or schedule page:
    // window.location.href = "dashboard.html";
  });
});
