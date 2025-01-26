export interface UserDTO {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string,
    accountCreated: string;
    accountChanged: string | null;
}


export type BaseResponse<TDto> = {
    content: TDto
}