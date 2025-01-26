import axiosInstance from "../../../api/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {NoteDTO} from "../../../model/note/NoteDTO";

const fetchNote = async (id: string): Promise<NoteDTO> => {
    try {
        const response = await axiosInstance.get<NoteDTO>(`notes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching note:', error);
        throw error;
    }
};

export const useNote = (id: string) => {
    return useQuery<NoteDTO, Error>({
        queryKey: noteQueryKey(id),
        queryFn: () => fetchNote(id),
    });
};

export const noteQueryKey = (id: string) => ['note', id];
