import axiosInstance from "../../../api/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {BaseResponse, NoteDTO} from "../../../model/note/NoteDTO";


const fetchNotes = async (): Promise<NoteDTO[]> => {
    try {
        const response = await axiosInstance.get<BaseResponse<NoteDTO[]>>('notes');
        return response.data.content;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};

export const useNotes = () => {
    return useQuery<NoteDTO[], Error>({
        queryKey: notesQueryKey,
        queryFn: fetchNotes
    });
};


export const notesQueryKey = ["notes"]