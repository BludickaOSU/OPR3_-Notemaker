import React, { useState } from 'react';
import { useNotes } from '../hooks/queries/note/useNotes';
import { useNoteDelete } from '../hooks/queries/note/useNotesDelete';
import { useUpdateNotes } from '../hooks/queries/note/useNoteUpdate';
import NoteCard from '../component/cards/note/NoteCard';
import NoteCardDetail from '../component/cards/note/NoteCardDetail';
import NoteUpdateForm from '../component/forms/note/NoteUpdateForm';
import { Box, Container, Typography, Button, Modal } from '@mui/material';
import { NoteCreateForm } from '../component/forms/note/NoteCreateForm';
import { NoteDTO } from '../model/note/NoteDTO';

const NoteContainer: React.FC = () => {
    const { data: notes, isLoading, error, refetch } = useNotes();
    const deleteNote = useNoteDelete();
    const updateNote = useUpdateNotes();
    const [isNoteFormOpen, setIsNoteFormOpen] = useState<boolean>(false);
    const [selectedNote, setSelectedNote] = useState<NoteDTO | null>(null);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);

    const handleNoteFormOpen = () => {
        setIsNoteFormOpen(true);
    };

    const handleNoteFormClose = () => {
        setIsNoteFormOpen(false);
    };

    const handleNoteClick = (note: NoteDTO) => {
        setSelectedNote(note);
    };

    const handleNoteDetailClose = () => {
        setSelectedNote(null);
    };

    const handleSuccess = () => {
        refetch();
    };

    const handleDelete = async (id: number) => {
        await deleteNote(id);
        handleSuccess();
        handleNoteDetailClose();
    };

    const handleUpdate = (note: NoteDTO) => {
        setSelectedNote(note);
        setIsUpdateFormOpen(true);
    };

    const handleUpdateSubmit = async (note: NoteDTO) => {
        const updateData = {
            id: note.id.toString(),
            data: {
                title: note.title,
                text: note.text,
                importancy: note.importancy,
                topicIds: note.topics.map(topic => topic.id), // Ensure this field is present in NoteDTO
            }
        };
        await updateNote.mutateAsync(updateData);
        handleSuccess();
        setIsUpdateFormOpen(false);
        handleNoteDetailClose();
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading notes</div>;

    return (
        <Container>
            <Box sx={{ flexDirection: 'column', alignItems: 'center', textAlign: "center"}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Notes
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleNoteFormOpen}>
                        Add Note
                    </Button>
                </Box>
                {notes?.map(note => (
                    <NoteCard key={note.id} note={note} onClick={handleNoteClick} />
                ))}
                <Modal
                    open={!!selectedNote}
                    onClose={handleNoteDetailClose}
                    aria-labelledby="note-detail-modal"
                    aria-describedby="note-detail-modal-description"
                >
                    <Box>
                        {selectedNote && (
                            <NoteCardDetail
                                note={selectedNote}
                                onClose={handleNoteDetailClose}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        )}
                    </Box>
                </Modal>
                <Modal
                    open={isNoteFormOpen}
                    onClose={handleNoteFormClose}
                    aria-labelledby="note-form-modal"
                    aria-describedby="note-form-modal-description"
                >
                    <Box>
                        <NoteCreateForm onClose={handleNoteFormClose} onSuccess={handleSuccess} />
                    </Box>
                </Modal>
                <Modal
                    open={isUpdateFormOpen}
                    onClose={() => setIsUpdateFormOpen(false)}
                    aria-labelledby="note-update-modal"
                    aria-describedby="note-update-modal-description"
                >
                    <Box>
                        {selectedNote && (
                            <NoteUpdateForm
                                note={selectedNote}
                                onClose={() => setIsUpdateFormOpen(false)}
                                onUpdate={handleUpdateSubmit}
                            />
                        )}
                    </Box>
                </Modal>
            </Box>
        </Container>
    );
};

export default NoteContainer;