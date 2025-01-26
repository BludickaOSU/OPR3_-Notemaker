import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import { TopicDTO } from '../../../model/topic/TopicDTO';

interface TopicCreateFormProps {
    onClose: () => void;
    onCreate: (topic: TopicDTO) => void;
}

const TopicCreateForm: React.FC<TopicCreateFormProps> = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        const newTopic: TopicDTO = { id: 0, name, description }; // id will be set by the backend
        onCreate(newTopic);
    };

    return (
        <Card sx={{ marginBottom: 2, backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Create Topic
                </Typography>
                <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
                        Cancel
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TopicCreateForm;