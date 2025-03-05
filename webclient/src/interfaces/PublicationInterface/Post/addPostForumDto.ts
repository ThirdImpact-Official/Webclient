export interface AddPostForumDto extends AddDto {
    content: string;
    userId: number;
    forumId: number | null;
    postparentId: number | null;
}