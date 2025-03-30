// File: public/modules/tips.js

export function fetchAndDisplayTips(jsonUrl, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.textContent = 'Loading tips...';

  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching tips: ${response.status}`);
      }
      return response.json();
    })
    .then(tipsArray => {
      container.innerHTML = '';
      tipsArray.forEach(item => {
        const p = document.createElement('p');
        // Some JSON entries use "tip", others might have "text"
        p.textContent = item.tip || item.text || 'No tip available.';
        container.appendChild(p);
      });
    })
    .catch(err => {
      container.textContent = 'Error loading tips.';
      console.error(err);
    });
}
