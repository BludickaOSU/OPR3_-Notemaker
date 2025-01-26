import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Typography, Stack, Button} from '@mui/material';
import links from "../../links.json"


export const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate(links.login);
    };

    return (
        <Stack>
            <Link to={links.home} style={{ textDecoration: 'none' }}>
                <Typography component="h1" align="center" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: '1.25rem' }}>
                    Notes
                </Typography>
            </Link>
            <Link to={links.topic} style={{ textDecoration: 'none' }}>
                <Typography align="center" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: '1.25rem' }}>
                    Topics
                </Typography>
            </Link>
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ marginTop: 2 }}>
                Logout
            </Button>
        </Stack>
    );
};