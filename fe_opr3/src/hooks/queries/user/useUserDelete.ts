import axiosInstance from "../../../api/axiosInstance";
import {queryClient} from "../queryClient";
import {usersQueryKey} from "./useUsers";

const deleteUser = async (id: number) => {
    try {
        await axiosInstance.delete(`/admins/${id}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const useUserDelete = () => {
    return async (id: number) => {
        await deleteUser(id);
        await queryClient.invalidateQueries({queryKey: usersQueryKey});
    };
};