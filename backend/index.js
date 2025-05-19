const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow frontend origins from localhost and Vercel
app.use(cors({
  origin: [
    'http://localhost:3000',               // local dev
    'https://thala-calc.vercel.app',       // Vercel frontend
  ],
  methods: ['POST'],
  credentials: true
}));

// Parse JSON requests
app.use(express.json({ limit: '10kb' }));

// 🧠 Logic file caching in production
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

// ✅ POST /check route
app.post('/check', (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ reason: 'Name must be a string' });
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res.status(400).json({ 
        reason: 'Only alphabets and spaces allowed! ❌'
      });
    }

    const logicFiles = getLogicFiles();
    for (const file of logicFiles) {
      const logicFn = require(path.join(__dirname, 'logic', file));
      const result = logicFn(name.trim());
      if (result) return res.json({ reason: result });
    }

    res.json({ 
      reason: 'No Thala reason found, but keep trying! 🤷‍♂️' 
    });

  } catch (error) {
    next(error); // go to error handler
  }
});

// ✅ Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: '🏏 Thala service is running!' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ reason: 'Server error occurred' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
