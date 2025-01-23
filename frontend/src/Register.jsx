import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Handle successful registration (e.g., redirect to login)
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <Typography variant="h4">Register</Typography>
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
            <Button type="submit">Register</Button>
        </form>
    );
};

export default Register;
