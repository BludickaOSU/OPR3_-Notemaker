import React, { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import { useUserDelete } from '../../../hooks/queries/user/useUserDelete';

interface UserDeleteConfirmationProps {
    id: number;
    onClose: () => void;
    onSuccess: () => void;
}

export const UserDeleteConfirmation: React.FC<UserDeleteConfirmationProps> = ({ id, onClose, onSuccess }) => {
    const deleteUser = useUserDelete();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleDelete = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteUser(id);
            onSuccess();
            onClose();
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="delete-confirmation-modal"
            aria-describedby="delete-confirmation-modal-description"
        >
            <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, boxShadow: 24 }}>
                <Typography id="delete-confirmation-modal-description" variant="h6" component="h2">
                    Are you sure you want to delete this user?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </Box>
                {error && <Typography color="error">{error.message}</Typography>}
            </Box>
        </Modal>
    );
};