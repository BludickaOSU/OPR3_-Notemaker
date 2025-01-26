import React from 'react';
import { Container, Typography, TextField, Button, IconButton } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNoteCreate } from '../../../hooks/queries/note/useNoteCreate';
import { NoteCreateDTO } from '../../../model/note/NoteCreateDTO';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface NoteFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    text: yup.string().required('Text is required'),
    expirationDate: yup.date().nullable(),
});

export const NoteCreateForm: React.FC<NoteFormProps> = ({ onClose, onSuccess }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<NoteCreateDTO>({
        resolver: yupResolver(schema),
    });
    const { mutate: createNote, status, error } = useNoteCreate();

    const onSubmit = (data: NoteCreateDTO) => {
        createNote(data, {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
        });
    }

    return (
        <Container>
            <Card sx={{ position: 'relative' }}>
                <CardContent>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create Note
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.title}
                                    helperText={errors.title ? errors.title.message : ''}
                                />
                            )}
                        />
                        <Controller
                            name="text"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Text"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.text}
                                    helperText={errors.text ? errors.text.message : ''}
                                />
                            )}
                        />
                        <Controller
                            name="expirationDate"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    customInput={<TextField
                                        label="Expiration Date"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        error={!!errors.expirationDate}
                                        helperText={errors.expirationDate ? errors.expirationDate.message : ''}
                                    />}
                                />
                            )}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={status === 'pending'}>
                            Submit
                        </Button>
                        {error && <Typography color="error">{error.message}</Typography>}
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};