import {BaseResponse, UserDTO} from "../../../model/user/UserDTO";
import axiosInstance from "../../../api/axiosInstance";
import {useQuery} from "@tanstack/react-query";

const getCurrentUser = async (): Promise<UserDTO> => {
    try {
        const response = await axiosInstance.get<BaseResponse<UserDTO>>('auth/currentUser');
        return response.data.content;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const useLoggedUser = () => {
    return useQuery<UserDTO, Error>({
        queryKey: usersQueryKey,
        queryFn: getCurrentUser
    });
};


export const usersQueryKey = ["currentUser"]