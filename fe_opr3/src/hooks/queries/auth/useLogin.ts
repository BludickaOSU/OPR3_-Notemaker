import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { UserLoginDTO } from "../../../model/user/UserLoginDTO";
import { LoginResponse } from "../../../model/auth/LoginResponse";

const login = async (userLoginDTO: UserLoginDTO): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", userLoginDTO);
    localStorage.setItem("authToken", response.data.token);
    return response.data;
};

export const useLogin = () => {
    return useMutation<LoginResponse, Error, UserLoginDTO>({
        mutationFn: login,
    });
};