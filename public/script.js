// File: public/script.js

// We import the tips fetch module (HEAD version)
import { fetchAndDisplayTips } from './modules/tips.js';

// DOMContentLoaded => Merge logic from both versions
document.addEventListener('DOMContentLoaded', () => {
  // 1. Handle URL parameters (HEAD feature)
  const params = new URLSearchParams(window.location.search);
  const userName = params.get('user'); // e.g. ?user=John
  const welcomeMsgElem = document.getElementById('welcome-msg');

  if (userName && welcomeMsgElem) {
    welcomeMsgElem.textContent = `Welcome back, ${userName}!`;
  }

  // 2. Use Local Storage to detect first-time visitors (HEAD feature)
  const visitedBefore = localStorage.getItem('visitedBefore');
  if (!visitedBefore) {
    alert('Welcome to the Smart Study Scheduler for the first time!');
    localStorage.setItem('visitedBefore', 'true');
  }

  // 3. Fetch and display tips from JSON (HEAD feature)
  fetchAndDisplayTips('tips.json', 'tips-container');

  // 4. “Get Started” button => redirect to form.html (c4ef016 version)
  const getStartedBtn = document.getElementById('get-started');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      // Either show an alert or redirect immediately:
      // alert('You are ready to start scheduling your study sessions!');
      window.location.href = 'form.html';
    });
  }

  // 5. Display upcoming sessions (from c4ef016 version)
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

  // 6. Event to load sessions from localStorage
  if (viewButton) {
    viewButton.addEventListener("click", displaySessions);
  }

  // Automatically display sessions on load
  displaySessions();

  // 7. Attach delete function to global scope or use event delegation
  window.deleteSession = (index) => {
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    schedule.splice(index, 1); 
    localStorage.setItem('schedule', JSON.stringify(schedule));
    displaySessions();
  };
});
