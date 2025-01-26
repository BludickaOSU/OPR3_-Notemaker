import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import {NoteDTO} from "../../../model/note/NoteDTO";
import {NoteUpdateDTO} from "../../../model/note/NoteUpdateDTO";

const updateNote = async ({ id, data }: { id: string; data: NoteUpdateDTO }): Promise<NoteDTO> => {
    try {
        const response = await axiosInstance.put<NoteDTO>(`notes/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const useUpdateNotes = () => {
    const queryClient = useQueryClient();

    return useMutation<NoteDTO, Error, { id: string; data: NoteUpdateDTO }>({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: 'notes'}).then(r => console.log('Invalidated notes:', r));
        },
    });
};