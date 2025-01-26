import React from 'react';
import { Container, Box } from '@mui/material';
import { LoginForm } from '../component/forms/auth/LoginForm';
import { useLogin } from '../hooks/queries/auth/useLogin';
import { UserLoginDTO } from '../model/user/UserLoginDTO';

interface AuthContainerProps {
    onSuccess: () => void;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({ onSuccess }) => {
    const { mutate: login, status, error } = useLogin();

    const handleLogin = (values: UserLoginDTO) => {
        login(values, {
            onSuccess: () => {
                onSuccess();
            }
        });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <LoginForm
                    onSubmit={handleLogin}
                    isLoading={status === 'pending'}
                    error={error ? error.message : null}
                />
            </Box>
        </Container>
    );
};