// Import required packages
const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5001; // Use port 5001 for the backend

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS)
// This is crucial to allow your React frontend (on a different port)
// to communicate with this backend.
app.use(cors());

// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());


// --- API Routes ---

// A simple test route to make sure the server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from your Express backend!' });
});

// We will add more routes here for groups, expenses, users, etc.
// For example:
// app.get('/api/groups', (req, res) => { ... });
// app.post('/api/groups', (req, res) => { ... });


// --- Start the Server ---

// Make the app listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
