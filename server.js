const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // sanitize filename
    const safe = file.originalname.replace(/[^a-zA-Z0-9.\-_%()_]/g, '_');
    cb(null, Date.now() + '-' + safe);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!/\.stl$/i.test(file.originalname)) return cb(new Error('Only .stl files are allowed'));
    cb(null, true);
  }
});

const app = express();

// Basic CORS so a frontend served from another origin/port can POST to /upload during development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/', (req, res) => res.send('Upload server running'));

app.post('/upload', upload.single('stl'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Return relative path for convenience
  const rel = path.relative(__dirname, req.file.path).replace(/\\/g, '/');
  res.json({ filename: rel, originalname: req.file.originalname });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err && err.message ? err.message : err);
  res.status(500).json({ error: err && err.message ? err.message : 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Upload server listening on http://localhost:${PORT}`));
