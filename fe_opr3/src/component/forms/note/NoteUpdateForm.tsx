import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Slider, Card, CardContent, Select, MenuItem, InputLabel, FormControl, Chip, SelectChangeEvent } from '@mui/material';
import { NoteDTO } from '../../../model/note/NoteDTO';
import { useTopics } from '../../../hooks/queries/topic/useTopics';
import { TopicDTO } from '../../../model/topic/TopicDTO';

interface NoteUpdateFormProps {
    note: NoteDTO;
    onClose: () => void;
    onUpdate: (note: NoteDTO) => void;
}

const NoteUpdateForm: React.FC<NoteUpdateFormProps> = ({ note, onClose, onUpdate }) => {
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);
    const [importancy, setImportancy] = useState(note.importancy);
    const [selectedTopics, setSelectedTopics] = useState<number[]>(note.topics.map(topic => topic.id));
    const { data: topics, isLoading: isTopicsLoading, error: topicsError } = useTopics();

    const handleSubmit = () => {
        const updatedNote: NoteDTO = { ...note, title, text, importancy, topics: selectedTopics.map(id => ({ id } as TopicDTO)) };
        onUpdate(updatedNote);
    };

    const handleTopicChange = (event: SelectChangeEvent<number[]>) => {
        setSelectedTopics(event.target.value as number[]);
    };

    return (
        <Card sx={{ marginBottom: 2, backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Update Note
                </Typography>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Typography gutterBottom>Importancy</Typography>
                <Slider
                    value={importancy}
                    onChange={(e, newValue) => setImportancy(newValue as number)}
                    aria-labelledby="importancy-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="topics-label">Topics</InputLabel>
                    <Select
                        labelId="topics-label"
                        multiple
                        value={selectedTopics}
                        onChange={handleTopicChange}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {(selected as number[]).map((value) => (
                                    <Chip key={value} label={topics?.find(topic => topic.id === value)?.name} sx={{ margin: 0.5 }} />
                                ))}
                            </Box>
                        )}
                    >
                        {topics?.map((topic) => (
                            <MenuItem key={topic.id} value={topic.id}>
                                {topic.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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

export default NoteUpdateForm;