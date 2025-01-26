import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { TopicDTO } from '../../../model/topic/TopicDTO';

interface TopicCardProps {
    topic: TopicDTO;
    onClick: (topic: TopicDTO) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
    return (
        <Card sx={{ marginBottom: 2, backgroundColor: '#f5f5f5' }} onClick={() => onClick(topic)}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {topic.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {topic.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TopicCard;