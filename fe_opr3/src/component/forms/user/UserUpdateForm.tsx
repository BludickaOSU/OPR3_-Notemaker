import React, { useEffect } from 'react';
import * as yup from 'yup';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from '@mui/icons-material/Close';
import { Container, Typography, TextField, Button, IconButton } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {useUser} from "../../../hooks/queries/user/useUser";
import {useUserUpdate} from "../../../hooks/queries/user/useUserUpdate";
import {UserUpdateDTO} from "../../../model/user/UserUpdateDTO";

interface UserUpdateFormProps {
    userId: string;
    onClose: () => void;
    onSuccess: ()=> void;
}

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
});

export const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ userId, onClose, onSuccess }) => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { data: user, isLoading, error } = useUser(userId);
    const { mutate: updateUser, status, error: updateError } = useUserUpdate();

    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName);
            setValue('lastName', user.lastName);
        }
    }, [user, setValue]);

    const onSubmit = async (data: UserUpdateDTO) => {
        try {
            await updateUser({ id: userId, data }, {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                },
            });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (isLoading) {
        return <Typography>Loading user data...</Typography>;
    }

    if (error) {
        return <Typography>Error loading user data</Typography>;
    }

    return (
        <Container>
            <Card sx={{ position: 'relative' }}>
    <CardContent>
        <IconButton
            aria-label="close"
    onClick={onClose}
    sx={{
        position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
    }}
>
    <CloseIcon />
    </IconButton>
    <Typography variant="h4" component="h1" gutterBottom>
    Update User
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Controller
    name="firstName"
    control={control}
    defaultValue=""
    render={({ field }) => (
        <TextField
            {...field}
    label="First Name"
    variant="outlined"
    margin="normal"
    fullWidth
    error={!!errors.firstName}
    helperText={errors.firstName ? errors.firstName.message : ''}
    />
)}
    />
    <Controller
    name="lastName"
    control={control}
    defaultValue=""
    render={({ field }) => (
        <TextField
            {...field}
    label="Last Name"
    variant="outlined"
    margin="normal"
    fullWidth
    error={!!errors.lastName}
    helperText={errors.lastName ? errors.lastName.message : ''}
    />
)}
    />
    <Button type="submit" variant="contained" color="primary" disabled={status === 'pending'}>
    Submit
    </Button>
    {updateError && <Typography color="error">{updateError.message}</Typography>}
        </form>
        </CardContent>
        </Card>
        </Container>
    );
    };