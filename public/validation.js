// File: public/validation.js

// Handle Burger Menu
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

// Validation for the form
document.getElementById("studyForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh

  const subject = document.getElementById("subject").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const priority = document.getElementById("priority").value;

  if (!subject || !date || !time) {
    alert("All fields are required!");
    return;
  }

  // Ensure the date is today or later
  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    alert("Please select a future date.");
    return;
  }

  // Save to Local Storage
  const session = { subject, date, time, priority };
  let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
  schedule.push(session);
  localStorage.setItem("schedule", JSON.stringify(schedule));

  // Redirect back to homepage
  window.location.href = "index.html";
});
