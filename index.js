// Import modules using ES6 syntax
import express from 'express';
import path from 'path';
import customerRoutes from './customer/routes.js';
import functionRoutes from './function/routes.js';
import miscRoutes from './misc/routes.js';
import exeMiscMailerRoutes from './exesummary/router.js';
import fileUploadRoutes from './fileupload/fileupload.js';
import cors from 'cors';

// Initialize the Express app
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/customer', customerRoutes);
app.use('/function', functionRoutes);
app.use('/misc', miscRoutes);
app.use('/sendmail', exeMiscMailerRoutes);
app.use('/fileupload', fileUploadRoutes);

// Serve static files from the React app
app.use(express.static(path.join(process.cwd(), 'frontend/build')));

// Serve the React app for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/build', 'index.html'));
});

// Start the server
app.listen(port, () => console.log(`App Listening on port: ${port}`));
