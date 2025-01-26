import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { NoteDTO } from '../../../model/note/NoteDTO';

interface NoteCardProps {
    note: NoteDTO;
    onClick: (note: NoteDTO) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
    return (
        <Card sx={{ marginBottom: 2, backgroundColor: '#f5f5f5' }} onClick={() => onClick(note)}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {note.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {note.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NoteCard;