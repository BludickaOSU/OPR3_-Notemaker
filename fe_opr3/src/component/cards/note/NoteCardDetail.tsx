import React from 'react';
import {Card, CardContent, Typography, Box, Button, IconButton, Divider} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NoteDTO } from '../../../model/note/NoteDTO';

interface NoteCardDetailProps {
    note: NoteDTO;
    onClose: () => void;
    onDelete: (id: number) => void;
    onUpdate: (note: NoteDTO) => void;
}

const NoteCardDetail: React.FC<NoteCardDetailProps> = ({ note, onClose, onDelete, onUpdate }) => {
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
                    {note.title}
                </Typography>
                <Divider/>
                <Typography variant="body2" color="text.secondary">
                    {note.text}
                </Typography>
                <Typography>
                    Importance: {note.importancy}
                </Typography>
                <Divider/>
                <Typography variant={"body2"} color={"text.secondary"}>
                    Created: {note.createdDate}
                </Typography>
                <Typography variant={"body2"} color={"text.secondary"}>
                    Expiration at: {note.expirationDate}
                </Typography>
                <Typography>
                    Topics: {note.topics.map(topic => topic.name).join(", ")}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button variant="contained" color="secondary" onClick={() => onDelete(note.id)}>
                        Delete
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onUpdate(note)}>
                        Update
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default NoteCardDetail;