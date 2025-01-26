import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UserUpdateDTO} from "../../../model/user/UserUpdateDTO";
import {UserDTO} from "../../../model/user/UserDTO";
import axiosInstance from "../../../api/axiosInstance";

const updateUser = async ({ id, data }: { id: string; data: UserUpdateDTO }): Promise<UserDTO> => {
    try {
        const response = await axiosInstance.put<UserDTO>(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const useUserUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation<UserDTO, Error, { id: string; data: UserUpdateDTO }>({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: 'users'}).then(r => console.log('Invalidated users:', r));
        },
    });
};