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

  // 4. “Get Started” button => redirect to form.html
  const getStartedBtn = document.getElementById('get-started');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      window.location.href = 'form.html';
    });
  }

  // 5. Display upcoming sessions
  const scheduleList = document.getElementById('study-list');
  const viewButton = document.getElementById('view-sessions');

  function displaySessions() {
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    if (!scheduleList) return;

    if (schedule.length === 0) {
      scheduleList.innerHTML = "<p>No study sessions scheduled.</p>";
    } else {
      scheduleList.innerHTML = "";
      schedule.forEach((session, index) => {
        const item = document.createElement("div");
        item.classList.add("study-session");
        item.innerHTML = `
          <p><strong>${session.subject}</strong></p>
          <p>Date: ${session.date} | Time: ${session.time}</p>
          <p>Priority: <span class="${session.priority.toLowerCase()}">${session.priority}</span></p>
          <button onclick="deleteSession(${index})">Delete</button>
        `;
        scheduleList.appendChild(item);
      });
    }
  }

  if (viewButton) {
    viewButton.addEventListener("click", displaySessions);
  }

  // Automatically load sessions on page load
  displaySessions();

  // Provide a global delete function so the inline onclick works
  window.deleteSession = (index) => {
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    schedule.splice(index, 1); 
    localStorage.setItem('schedule', JSON.stringify(schedule));
    displaySessions();
  };
});
