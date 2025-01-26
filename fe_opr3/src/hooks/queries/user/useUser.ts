import axiosInstance from "../../../api/axiosInstance";
import {UserDTO} from "../../../model/user/UserDTO";
import {useQuery} from "@tanstack/react-query";


const fetchUser = async (id: string): Promise<UserDTO> => {
    try {
        const response = await axiosInstance.get<UserDTO>(`admins/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const useUser = (id: string) => {
    return useQuery<UserDTO, Error>({
        queryKey: userQueryKey(id),
        queryFn: () => fetchUser(id),
    });
};

export const userQueryKey = (id: string) => ['user', id];
