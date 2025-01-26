import React, { useEffect } from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import { AuthContainer } from '../../containers/AuthContainer';
import { useNavigate } from 'react-router-dom';
import links from '../../links.json';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate(links.home);
        }
    }, [navigate]);

    const handleRegisterRedirect = () => {
        navigate(links.register);
    };

    const handleLoginSuccess = () => {
        navigate(links.home);
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h4">Login</Typography>
            </Box>
            <AuthContainer onSuccess={handleLoginSuccess} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link component="button" variant="body2" onClick={handleRegisterRedirect}>
                        Register
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};