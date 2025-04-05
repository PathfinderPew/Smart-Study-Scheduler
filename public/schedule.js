// File: public/schedule.js

document.addEventListener('DOMContentLoaded', () => {
  // Burger menu for small screens
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // FullCalendar Setup
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  // Create a new Calendar instance
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth', // or 'timeGridWeek', etc.
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    events: loadEventsFromLocalStorage(), // custom function
    editable: false,
    selectable: false,
  });

  calendar.render();

  // ============== HELPER FUNCTIONS ==============
  function loadEventsFromLocalStorage() {
    // Our "schedule" array is stored in localStorage
    const schedule = JSON.parse(localStorage.getItem('schedule')) || [];

    // Convert each session to a Calendar event
    // FullCalendar expects events like:
    // { title: 'My Event', start: 'YYYY-MM-DDThh:mm' }
    return schedule.map(session => {
      const dateStr = session.date;
      const timeStr = session.time; // e.g., "13:00"
      // Combine them into ISO-like string "YYYY-MM-DDTHH:mm"
      const startStr = `${dateStr}T${timeStr}`;
      return {
        title: session.subject + ` (${session.priority} Priority)`,
        start: startStr
      };
    });
  }
});
