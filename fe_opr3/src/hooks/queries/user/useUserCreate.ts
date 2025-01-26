import {UserDTO} from "../../../model/user/UserDTO";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import {NoteCreateDTO} from "../../../model/user/UserCreateDTO";


const createUser = async (user: NoteCreateDTO): Promise<UserDTO> => {
    try {
        const response = await axiosInstance.post<UserDTO>('/users', user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const useUserCreate = () => {
    return useMutation<UserDTO, Error, NoteCreateDTO>({
        mutationFn: createUser,
    });
};