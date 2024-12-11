const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Import routes
const tasksRoutes = require('./routes/tasks');

// Use routes
app.use('/api/v1/tasks', tasksRoutes);

app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
