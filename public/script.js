// File: public/script.js

import { fetchAndDisplayTips } from './modules/tips.js';

// Load once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // 1. Burger Menu Toggle
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 2. URL Parameter (e.g. ?user=John)
  const params = new URLSearchParams(window.location.search);
  const userParam = params.get('user'); 
  const welcomeMsgElem = document.getElementById('welcome-msg');

  if (userParam && welcomeMsgElem) {
    welcomeMsgElem.textContent = `Welcome back, ${userParam}!`;
  }

  // 3. Local Storage check for first-time visitors
  const visitedBefore = localStorage.getItem('visitedBefore');
  if (!visitedBefore) {
    alert('Welcome to the Smart Study Scheduler for the first time!');
    localStorage.setItem('visitedBefore', 'true');
  }

  // 4. Fetch and display tips
  fetchAndDisplayTips('tips.json', 'tips-container');

  // 5. “Get Started” => direct to dashboard.html + user’s name
  const getStartedBtn = document.getElementById('get-started');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('username').value.trim();
      if (nameInput) {
        // Pass user param in the URL
        window.location.href = `dashboard.html?user=${encodeURIComponent(nameInput)}`;
      } else {
        alert("Please enter your name before continuing.");
      }
    });
  }

  // 6. Display upcoming sessions from localStorage
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

  // Auto load the sessions on page load
  displaySessions();

  // Provide a global delete function
  window.deleteSession = (index) => {
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    schedule.splice(index, 1);
    localStorage.setItem('schedule', JSON.stringify(schedule));
    displaySessions();
  };
});
