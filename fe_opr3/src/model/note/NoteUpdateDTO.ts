export interface NoteUpdateDTO {
    title: string;
    text: string;
    importancy: number;
    topicIds: number[];
}