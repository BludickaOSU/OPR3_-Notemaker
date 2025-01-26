import axiosInstance from "../../../api/axiosInstance";
import {BaseResponse, UserDTO} from "../../../model/user/UserDTO";
import {useQuery} from "@tanstack/react-query";

const fetchUsers = async (): Promise<UserDTO[]> => {
    try {
        const response = await axiosInstance.get<BaseResponse<UserDTO[]>>('admins');
        return response.data.content;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const useUsers = () => {
    return useQuery<UserDTO[], Error>({
        queryKey: usersQueryKey,
        queryFn: fetchUsers
    });
};


export const usersQueryKey = ["users"]