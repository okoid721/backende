import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// API to upload video
app.post('/api/videos', upload.single('video'), (req, res) => {
  const { title, caption } = req.body;
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(201).json({
    filename: req.file.filename,
    title,
    caption,
  });
});

// API to get all videos
app.get('/api/videos', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).send('Error reading files.');
    const videos = files.map((file) => ({
      filename: file,
      title: file, // You can modify this to fetch titles from a database
      caption: '',  // You can modify this to fetch captions from a database
    }));
    res.json(videos);
  });
});

// API to delete a video
app.delete('/api/videos/:filename', (req, res) => {
  const { filename } = req.params;
  fs.unlink(path.join('uploads', filename), (err) => {
    if (err) return res.status(404).send('File not found.');
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});