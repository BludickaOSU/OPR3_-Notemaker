import React from 'react';
import { Container, Box } from '@mui/material';
import { RegisterForm } from '../component/forms/auth/RegisterForm';
import { useRegister } from '../hooks/queries/auth/useRegister';
import { NoteCreateDTO } from '../model/user/UserCreateDTO';
import { useNavigate } from 'react-router';
import links from '../links.json';

export const RegisterContainer: React.FC = () => {
    const { mutate: register, status, error } = useRegister();
    const navigate = useNavigate();

    const handleRegister = (values: NoteCreateDTO) => {
        register(values);
        navigate(links.login);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <RegisterForm
                    onSubmit={handleRegister}
                    isLoading={status === 'pending'}
                    error={error ? error.message : null}
                />
            </Box>
        </Container>
    );
};