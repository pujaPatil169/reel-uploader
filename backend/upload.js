const express = require('express');
const multer = require('multer');
const request = require('request');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Upload endpoint for Instagram
router.post('/upload/instagram', upload.single('media'), (req, res) => {
    // const file = req.file;  //dought it should be req.body.file
    const file = req.body.media;  //dought it should be req.body.file
    const accessToken = req.body.accessToken;

    if (!file || !accessToken) {
        return res.status(400).send({ message: 'File and access token are required' });
    }

    // Logic to upload the file to Instagram
    const formData = {
        access_token: accessToken,
        media: file.buffer // Use the buffer for the file
    };

    request.post({ url: 'https://graph.instagram.com/me/media', formData }, (err, response, body) => {
        if (err) {
            return res.status(500).send(err);
        }
        const data = JSON.parse(body);
        res.send({ message: 'File uploaded successfully to Instagram', data });
    });
});

// Upload endpoint for YouTube
router.post('/upload/youtube', upload.single('media'), (req, res) => {
    const file = req.file;
    const accessToken = req.body.accessToken;

    if (!file || !accessToken) {
        return res.status(400).send({ message: 'File and access token are required' });
    }

    // Logic to upload the file to YouTube
    const formData = {
        access_token: accessToken,
        media: file.buffer // Use the buffer for the file
    };

    request.post({ url: 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=media', formData }, (err, response, body) => {
        if (err) {
            return res.status(500).send(err);
        }
        const data = JSON.parse(body);
        res.send({ message: 'File uploaded successfully to YouTube', data });
    });
});

// Upload endpoint for Snapchat
router.post('/upload/snapchat', upload.single('media'), (req, res) => {
    const file = req.file;
    const accessToken = req.body.accessToken;

    if (!file || !accessToken) {
        return res.status(400).send({ message: 'File and access token are required' });
    }

    // Logic to upload the file to Snapchat
    const formData = {
        access_token: accessToken,
        media: file.buffer // Use the buffer for the file
    };

    request.post({ url: 'https://adsapi.snapchat.com/v1/media/upload', formData }, (err, response, body) => {
        if (err) {
            return res.status(500).send(err);
        }
        const data = JSON.parse(body);
        res.send({ message: 'File uploaded successfully to Snapchat', data });
    });
});

module.exports = router;
