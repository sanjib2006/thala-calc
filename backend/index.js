const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Allow env config

// Enhanced CORS setup (optional)
app.use(cors({
  origin: ['https://thala-calc.vercel.app/', 'https://thala-calc.onrender.com'],
  methods: ['POST']
}));

// Better JSON parsing with limit
app.use(express.json({ limit: '10kb' }));

// Cache logic files in production
let logicFilesCache;
const getLogicFiles = () => {
  if (process.env.NODE_ENV === 'production' && logicFilesCache) {
    return logicFilesCache;
  }
  const logicFolder = path.join(__dirname, 'logic');
  const files = fs.readdirSync(logicFolder)
    .filter(file => file.endsWith('.js'))
    .sort((a, b) => parseInt(a) - parseInt(b));
  
  if (process.env.NODE_ENV === 'production') {
    logicFilesCache = files;
  }
  return files;
};

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ reason: 'Server error occurred' });
});

app.post('/check', (req, res) => {
  try {
    const { name } = req.body;

    // Input validation (enhanced)
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ reason: 'Name must be a string' });
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res.status(400).json({ 
        reason: 'Only alphabets and spaces allowed! ❌'
      });
    }

    // Process logic files
    const logicFiles = getLogicFiles();
    for (const file of logicFiles) {
      const logicFn = require(path.join(__dirname, 'logic', file));
      const result = logicFn(name.trim()); // Trim whitespace
      if (result) return res.json({ reason: result });
    }

    // No match found
    res.json({ 
      reason: 'No Thala reason found, but keep trying! 🤷‍♂️' 
    });

  } catch (error) {
    next(error); // Forward to error handler
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: '🏏 Thala service is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});