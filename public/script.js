document.getElementById('get-started').addEventListener('click', () => {
    window.location.href = 'form.html'; // Redirect to form page
});

// Get the study list container and button
const scheduleList = document.getElementById("study-list");
const viewButton = document.getElementById("view-sessions");

// Function to display study sessions
function displaySessions() {
    let schedule = JSON.parse(localStorage.getItem("schedule")) || [];

    if (!scheduleList) return; // Prevent errors if the element is missing

    if (schedule.length === 0) {
        scheduleList.innerHTML = "<p>No study sessions scheduled.</p>";
    } else {
        scheduleList.innerHTML = ""; // Clear before adding new elements

        schedule.forEach((session, index) => {
            let item = document.createElement("div");
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

//  Load sessions immediately when the page loads
document.addEventListener("DOMContentLoaded", displaySessions);

// Load sessions when clicking "View Study Sessions" (optional)
if (viewButton) {
    viewButton.addEventListener("click", displaySessions);
}

// Function to delete a session
function deleteSession(index) {
    let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
    schedule.splice(index, 1); // Remove session
    localStorage.setItem("schedule", JSON.stringify(schedule)); // Update Local Storage
    displaySessions(); // Refresh displayed list without reloading the page
}
