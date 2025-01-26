import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import { TopicDTO } from '../../../model/topic/TopicDTO';

interface TopicUpdateFormProps {
    topic: TopicDTO;
    onClose: () => void;
    onUpdate: (topic: TopicDTO) => void;
}

const TopicUpdateForm: React.FC<TopicUpdateFormProps> = ({ topic, onClose, onUpdate }) => {
    const [name, setName] = useState(topic.name);
    const [description, setDescription] = useState(topic.description);

    const handleSubmit = () => {
        const updatedTopic: TopicDTO = { ...topic, name, description };
        onUpdate(updatedTopic);
    };

    return (
        <Card sx={{ marginBottom: 2, backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Update Topic
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

export default TopicUpdateForm;