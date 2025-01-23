const request = require('supertest');
const app = require('../server'); // Assuming your Express app is exported from server.js

describe('Upload Endpoints', () => {
    it('should upload a file to Instagram', async () => {
        const response = await request(app)
            .post('/api/upload/instagram')
            .attach('media', '/home/puja/Downloads/New Folder/mobile/channelOpening.mp4') // Updated path
            .field('accessToken', 'testAccessToken'); // Replace with a valid test access token

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('File uploaded successfully to Instagram');
    });

    it('should upload a file to YouTube', async () => {
        const response = await request(app)
            .post('/api/upload/youtube')
            .attach('media', '/home/puja/Downloads/New Folder/mobile/channelOpening.mp4') // Updated path
            .field('accessToken', 'testAccessToken'); // Replace with a valid test access token

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('File uploaded successfully to YouTube');
    });

    it('should upload a file to Snapchat', async () => {
        const response = await request(app)
            .post('/api/upload/snapchat')
            .attach('media', '/home/puja/Downloads/New Folder/mobile/channelOpening.mp4') // Updated path
            .field('accessToken', 'testAccessToken'); // Replace with a valid test access token

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('File uploaded successfully to Snapchat');
    });
});
