const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Assuming JWT is used for authentication
const router = express.Router();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/reelUploader', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware to authenticate user and attach user ID to request
const authenticateUser = (req, res, next) => {
    // const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    // if (!token) {
    //     return res.status(401).send('User not authenticated');
    // }
    // jwt.verify(token, 'your_jwt_secret', (err, decoded) => { // Replace 'your_jwt_secret' with your actual secret
    //     if (err) {
    //         return res.status(401).send('Invalid token');
    //     }
    //     req.user = { id: decoded.id }; // Attach user ID to request
    //     next();
    // });

};
// req.user = { id: userId }; // Attach user ID to request
// const userId = req.session.userId; // Example: using session

// Function to set the access token for a user
const setAccessToken = async (userId, platform, token) => {
    await User.findByIdAndUpdate(userId, { [`${platform}AccessToken`]: token });
};

// Function to get the access token for a user
const getAccessToken = async (userId, platform) => {
    const user = await User.findById(userId);
    return user ? user[`${platform}AccessToken`] : null; // Return the token for the specific platform
};

// Instagram OAuth
const INSTAGRAM_CLIENT_ID = '641466758444392';
const INSTAGRAM_CLIENT_SECRET = '646276f05896f8ed808249e6803fa9c8';
const INSTAGRAM_REDIRECT_URI = 'http://localhost:3000/api/auth/instagram/callback';

// Instagram OAuth Route
router.get('/auth/instagram', (req, res) => {
    const url = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    res.redirect(url);
});

// Instagram Callback Route
// router.get('/auth/instagram/callback', authenticateUser, async (req, res) => {
router.get('/auth/instagram/callback', async (req, res) => {
    const { code } = req.query;
    
    const tokenUrl = `https://api.instagram.com/oauth/access_token`;
    const formData = {
        client_id: INSTAGRAM_CLIENT_ID,
        client_secret: INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: INSTAGRAM_REDIRECT_URI,
        code: code
    };

    request.post({ url: tokenUrl, form: formData }, async (err, response, body) => {
        if (err) {
            return res.status(500).send(err);
        }
        const data = JSON.parse(body); // Ensure data is defined here
        // const userId = req.user.id; // Now user ID is available
        const {_id} = req.cookies.user; // Now user ID is available
        console.log(req.cookies.user);
        await setAccessToken(_id, 'instagram', data.access_token); // Store the Instagram access token
        // await setAccessToken(userId, 'instagram', data.access_token); // Store the Instagram access token
        res.send(data);
    });
});

// Snapchat OAuth
const SNAPCHAT_CLIENT_ID = 'YOUR_SNAPCHAT_CLIENT_ID';
const SNAPCHAT_CLIENT_SECRET = 'YOUR_SNAPCHAT_CLIENT_SECRET';
const SNAPCHAT_REDIRECT_URI = 'http://localhost:3000/api/auth/snapchat/callback';

// Snapchat OAuth Route
router.get('/auth/snapchat', (req, res) => {
    const url = `https://accounts.snapchat.com/accounts/oauth2/auth?client_id=${SNAPCHAT_CLIENT_ID}&redirect_uri=${SNAPCHAT_REDIRECT_URI}&response_type=code`;
    res.redirect(url);
});

// Snapchat Callback Route
router.get('/auth/snapchat/callback', authenticateUser, async (req, res) => {
    const { code } = req.query;
    const tokenUrl = `https://accounts.snapchat.com/accounts/oauth2/token`;
    const formData = {
        client_id: SNAPCHAT_CLIENT_ID,
        client_secret: SNAPCHAT_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: SNAPCHAT_REDIRECT_URI,
        code: code
    };

    request.post({ url: tokenUrl, form: formData }, async (err, response, body) => {
        if (err) {
            return res.status(500).send(err);
        }
        const data = JSON.parse(body);
        const userId = req.user.id; // Now user ID is available
        await setAccessToken(userId, 'snapchat', data.access_token); // Store the Snapchat access token
        res.send(data);
    });
});

// YouTube OAuth
const YOUTUBE_CLIENT_ID = 'YOUR_YOUTUBE_CLIENT_ID';
const YOUTUBE_CLIENT_SECRET = 'YOUR_YOUTUBE_CLIENT_SECRET';
const YOUTUBE_REDIRECT_URI = 'http://localhost:3000/api/auth/youtube/callback';

// YouTube OAuth Route
router.get('/auth/youtube', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${YOUTUBE_CLIENT_ID}&redirect_uri=${YOUTUBE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/youtube.upload&response_type=code`;
    res.redirect(url);
});

// YouTube Callback Route
router.get('/auth/youtube/callback', authenticateUser, async (req, res) => {
    const { code } = req.query;
    const tokenUrl = `https://oauth2.googleapis.com/token`;
    const formData = {
        client_id: YOUTUBE_CLIENT_ID,
        client_secret: YOUTUBE_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: YOUTUBE_REDIRECT_URI,
        code: code
    };

    request.post({ url: tokenUrl, form: formData }, async (err, response, body) => {
        if (err) {
            return res.status(500).send(err);
        }
        const data = JSON.parse(body);
        const userId = req.user.id; // Now user ID is available
        await setAccessToken(userId, 'youtube', data.access_token); // Store the YouTube access token
        res.send(data);
    });
});

// Endpoint to get access tokens
router.get('/api/auth/getAccessToken', authenticateUser, async (req, res) => {
    // const userId = req.user.id; // Now user ID is available
    const {_id} = req.cookies.user // Now user ID is available
    const instagramToken = await getAccessToken(_id, 'instagram');
    const snapchatToken = await getAccessToken(_id, 'snapchat');
    const youtubeToken = await getAccessToken(_id, 'youtube');
    
    res.json({
        instagram: instagramToken,
        snapchat: snapchatToken,
        youtube: youtubeToken,
    });
});

module.exports = router;
