import axiosInstance from "../../../api/axiosInstance";
import {queryClient} from "../queryClient";
import {notesQueryKey} from "./useNotes";

const deleteNote = async (id: number) => {
    try {
        await axiosInstance.delete(`notes/${id}`);
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};

export const useNoteDelete = () => {
    return async (id: number) => {
        await deleteNote(id);
        await queryClient.invalidateQueries({queryKey: notesQueryKey});
    };
};