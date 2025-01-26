import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { UserLoginDTO } from '../../../model/user/UserLoginDTO';

const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

interface LoginFormProps {
    onSubmit: (values: UserLoginDTO) => void;
    isLoading: boolean;
    error: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
    const formik = useFormik<UserLoginDTO>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
            />
            <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button color="primary" variant="contained" fullWidth type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </Box>
    );
};