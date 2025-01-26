import React, { useState } from 'react';
import { useUsers } from '../hooks/queries/user/useUsers';
import { Box, Container, LinearProgress, Typography, Modal } from '@mui/material';
import { UserCard } from '../component/cards/user/UserCard';
import { UserCardDetail } from '../component/cards/user/UserCardDetail';
import { useUser } from '../hooks/queries/user/useUser';
import { UserDTO } from '../model/user/UserDTO';


export const UserContainer: React.FC = () => {
    const { data: users, isLoading, error, refetch } = useUsers();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const { data: selectedUser, isLoading: isUserLoading, error: userError } = useUser(selectedUserId?.toString() || '');

    const handleCardClick = (id: number) => {
        setSelectedUserId(id);
    };

    const handleClose = () => {
        setSelectedUserId(null);
    };

    const handleSuccess = () => {
        refetch();
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LinearProgress />
                <Typography>Loading users</Typography>
            </Box>
        );
    }

    if (error || !users) {
        return <Typography>Error loading users</Typography>;
    }

    return (
        <Container>
            <Box sx={{ flexDirection: 'column', alignItems: 'center', textAlign: "center"}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Users
                    </Typography>
                </Box>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Box key={user.id} sx={{ marginBottom: 2 }} onClick={() => handleCardClick(user.id)}>
                            <UserCard user={user} />
                        </Box>
                    ))
                ) : (
                    <Typography>No users available</Typography>
                )}
                <Modal
                    open={!!selectedUserId}
                    onClose={handleClose}
                    aria-labelledby="user-detail-modal"
                    aria-describedby="user-detail-modal-description"
                >
                    <Box >
                        {isUserLoading ? (
                            <Typography>Loading user details...</Typography>
                        ) : userError || !selectedUser ? (
                            <Typography>Error loading user details</Typography>
                        ) : (
                            <UserCardDetail user={selectedUser as UserDTO} onClose={handleClose} onSuccess={handleSuccess} />
                        )}
                    </Box>
                </Modal>
            </Box>
        </Container>
    );
};