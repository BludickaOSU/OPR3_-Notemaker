export interface NoteCreateDTO{
    title: string;
    text: string;
    expirationDate?: Date | null;
}