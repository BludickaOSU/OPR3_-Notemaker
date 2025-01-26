import React, { useState } from 'react';
import { UserDTO } from '../../../model/user/UserDTO';
import {Typography, IconButton, Button, Modal, Box, Divider} from '@mui/material';
import {Close as CloseIcon, DeleteForever} from '@mui/icons-material';
import Card from "@mui/material/Card";
import { UserUpdateForm } from '../../forms/user/UserUpdateForm';
import {UserDeleteConfirmation} from "../../forms/user/UserDeleteConfirmation";

interface UserCardDetailProps {
    user: UserDTO;
    onClose: () => void;
    onSuccess: () => void;
}

export const UserCardDetail: React.FC<UserCardDetailProps> = ({ user, onClose, onSuccess }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpenOpen] = useState(false);


    const handleDeleteOpen = () => {
        setIsDeleteOpenOpen(true);
    }

    const handleFormClose = () => {
        setIsFormOpen(false);
        onClose();
    };

    const handleDeleteClose = () => {
        setIsDeleteOpenOpen(false);
        onClose();
    }

    const handleSuccess = () => {
        setIsFormOpen(false);
        onSuccess();
        onClose();
    };

    return (
        <Card sx={{ position: 'relative', p: 4 }}>
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
            <Typography variant="h5" gutterBottom>{user.firstName} {user.lastName}</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography>Email: {user.email}</Typography>
            <Typography>Account created: {user.accountCreated}</Typography>

            {user.accountChanged ? (
                <Typography>Account changed: {user.accountChanged}</Typography>
            ) : (
                <Typography>Account changed: N/A</Typography>
            )}
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant={"contained"} color={"error"} startIcon={<DeleteForever/> } onClick={handleDeleteOpen}>
                    Delete
                </Button>
            </Box>
            <Modal
                open={isFormOpen}
                onClose={handleFormClose}
                aria-labelledby="user-update-form-modal"
                aria-describedby="user-update-form-modal-description"
            >
                <Box>
                    <UserUpdateForm
                        userId={user.id.toString()}
                        onClose={handleFormClose}
                        onSuccess={handleSuccess} />
                </Box>
            </Modal>

            <Modal
                open={isDeleteOpen}
                onClose={handleDeleteClose}
                arial-labelledby={"user-delete-confirmation-modal"}
                arial-describedby={"user-delete-confirmation-modal-description"}>
                <Box>
                    <UserDeleteConfirmation
                        id={user.id}
                        onClose={handleDeleteClose}
                        onSuccess={handleSuccess}
                    />
                </Box>
            </Modal>
        </Card>
    );
};