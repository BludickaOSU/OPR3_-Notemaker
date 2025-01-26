import React from 'react';
import { Card, CardContent, Typography, Box, Button, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TopicDTO } from '../../../model/topic/TopicDTO';

interface TopicCardDetailProps {
    topic: TopicDTO;
    onClose: () => void;
    onDelete: (id: number) => void;
    onUpdate: (topic: TopicDTO) => void;
}

const TopicCardDetail: React.FC<TopicCardDetailProps> = ({ topic, onClose, onDelete, onUpdate }) => {
    return (
        <Card sx={{ marginBottom: 2, backgroundColor: '#f5f5f5', position: 'relative' }}>
            <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <CardContent>
                <Typography variant="h5" component="div">
                    {topic.name}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                    {topic.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button variant="contained" color="secondary" onClick={() => onDelete(topic.id)}>
                        Delete
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onUpdate(topic)}>
                        Update
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TopicCardDetail;