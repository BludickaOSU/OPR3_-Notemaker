import axiosInstance from "../../../api/axiosInstance";
import {useMutation} from "@tanstack/react-query";
import {NoteCreateDTO} from "../../../model/note/NoteCreateDTO";
import {NoteDTO} from "../../../model/note/NoteDTO";

const createNote = async (note: NoteCreateDTO): Promise<NoteDTO> => {
    try {
        const response = await axiosInstance.post<NoteDTO>('notes', note);
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};

export const useNoteCreate = () => {
    return useMutation<NoteDTO, Error, NoteCreateDTO>({
        mutationFn: createNote,
    });
};