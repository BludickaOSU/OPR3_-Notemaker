import {TopicDTO} from "../topic/TopicDTO";

export interface NoteDTO {
    id: number;
    title: string;
    text: string;
    importancy: number;
    topics: TopicDTO[];
    createdDate: string;
    expirationDate: string | null;
}

export type BaseResponse<TDto> = {
    content: TDto
}