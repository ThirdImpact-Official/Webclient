export interface GetPostForumDto extends BaseDto {
    content: string;
    userId: number;
    forumId: number | null;
    postparentId: number | null;
    hasLikeId: number | null;
    hasLike: HasLike | null;
    creationDate: string;
    updatedDate: string;
}