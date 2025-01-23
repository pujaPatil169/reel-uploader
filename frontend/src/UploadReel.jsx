import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { Button, Typography, Box } from '@mui/material';

const UploadReel = () => {
    const [accessTokens, setAccessTokens] = useState({
        instagram: null,
        snapchat: null,
        youtube: null,
    });

    useEffect(() => {
        // Fetch access tokens from the backend
        const fetchAccessTokens = async () => {
            const response = await fetch('/api/auth/getAccessToken'); // Adjust the endpoint as needed
            const data = await response.json();
            setAccessTokens(data);
        };

        fetchAccessTokens();
    }, []);

    const handleUpload = async (platform) => {
        const accessToken = accessTokens[platform];
        if (!accessToken) {
            alert(`Access token for ${platform} is not available.`);
            return;
        }

        const formData = new FormData();
        formData.append('accessToken', token);
        formData.append('media', file);

        setUploading(true);
        setError('');
        
        const response = await fetch('/api/upload/instagram', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || 'Upload failed');
        } else {
            const data = await response.json();
            console.log(data);
        }
        setUploading(false);
    };

    return (
        <Box>
            <Typography variant="h4">Upload Reel</Typography>
            <Button variant="contained" onClick={() => handleUpload('instagram')}>
                Upload to Instagram
            </Button>
            <Button variant="contained" onClick={() => handleUpload('snapchat')}>
                Upload to Snapchat
            </Button>
            <Button variant="contained" onClick={() => handleUpload('youtube')}>
                Upload to YouTube
            </Button>
            {Object.keys(accessTokens).map((platform) => (
                accessTokens[platform] ? (
                    <Alert key={platform} severity="success">{`${platform.charAt(0).toUpperCase() + platform.slice(1)} access token retrieved successfully!`}</Alert>
                ) : (
                    <Alert key={platform} severity="error">{`Failed to retrieve ${platform} access token.`}</Alert>
                )
            ))}
        </Box>
    );
};

export default UploadReel;
