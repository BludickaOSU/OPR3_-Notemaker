import React, { useEffect } from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import { RegisterContainer } from '../../containers/RegisterContainer';
import { useNavigate } from 'react-router-dom';
import links from '../../links.json';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate(links.home);
        }
    }, [navigate]);

    const handleLoginRedirect = () => {
        navigate(links.login);
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h4">Register</Typography>
            </Box>
            <RegisterContainer />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Typography variant="body2">
                    Already have an account?{' '}
                    <Link component="button" variant="body2" onClick={handleLoginRedirect}>
                        Login
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};