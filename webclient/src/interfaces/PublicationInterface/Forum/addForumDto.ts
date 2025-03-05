export interface AddForumDto extends AddDto {
    id: number;
    title: string;
    content: string;
    userId: number;
}