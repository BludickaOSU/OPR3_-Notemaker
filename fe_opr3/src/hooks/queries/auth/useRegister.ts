import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { NoteCreateDTO } from "../../../model/user/UserCreateDTO";
import { UserDTO } from "../../../model/user/UserDTO";

const register = async (userRegisterDTO: NoteCreateDTO): Promise<UserDTO> => {
    const response = await axiosInstance.post<UserDTO>("auth/signup", userRegisterDTO);
    return response.data;
};

export const useRegister = () => {
    return useMutation<UserDTO, Error, NoteCreateDTO>({
        mutationFn: register,
    });
};