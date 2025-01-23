import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { setAccessToken } from './auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setAccessToken(data.accessToken);
            // Redirect or update UI as needed
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <Typography variant="h4">Login</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p>{error}</p>}
            <Button type="submit">Login</Button>
        </form>
    );
};

export default Login;

