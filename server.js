const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Default route: serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the form page (from c4ef016 branch)
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
