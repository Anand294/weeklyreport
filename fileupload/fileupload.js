// Import required modules using ES6 syntax
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// To replace __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express Router
const router = express.Router();

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Uploads directory
  },
  filename: (req, file, cb) => {
    // Add timestamp to the original filename
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);  // Get the file extension
    const basename = path.basename(file.originalname, ext);  // Get the file name without extension
    const filename = `${timestamp}_${basename}${ext}`;  // Filename format: timestamp_filename.extension
    cb(null, filename);
  }
});

// Initialize upload middleware
const upload = multer({ storage: storage });

// Define the file upload route
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Get the filename after it is uploaded
  const fileName = req.file.filename;  // Filename in the format `timestamp_filename.extension`

  // Send the filename in the response
  res.status(200).json({ 
    message: 'File uploaded successfully', 
    filename: fileName  // Return the new filename
  });
});

// Route to serve uploaded files
router.get('/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', fileName); // Adjust path to your uploads directory

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("File not found or error:", err);
      res.status(404).send("File not found");
    }
  });
});

// Export the router using ES6 syntax
export default router;
