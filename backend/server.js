const express = require('express');
const bodyParser = require('body-parser');
const oauthRoutes = require('./oauth');
const uploadRoutes = require('./upload');
const authRoutes = require('./authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log the imported routes
console.log('OAuth Routes:', oauthRoutes);
console.log('Upload Routes:', uploadRoutes);

// Routes
app.use('/api', oauthRoutes);
app.use('/api', uploadRoutes);
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
