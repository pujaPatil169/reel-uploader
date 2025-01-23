import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Reel Uploader</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

export default Layout;
