// File: public/schedule.js

document.addEventListener("DOMContentLoaded", () => {
    // Add code for schedule page if needed
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");
    if (burger && navLinks) {
      burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  });
  