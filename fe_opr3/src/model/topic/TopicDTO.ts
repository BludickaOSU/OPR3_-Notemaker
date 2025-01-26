export interface TopicDTO {
    id: number;
    name: string;
    description?: string;
}

export type BaseResponse<TDto> = {
    content: TDto
}