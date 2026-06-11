export interface GetSignalementForumDto {
    id: number;
    forumId: number;
    postForumId: number;
    userId: number;
    signalementTypeId: number;
    description: string | null;
    isPertinent: boolean;
    isClosed: boolean;
    creationDate: string;
    updateDate: string;
}
export interface GetSignalementTypeDto {
    id: number;
    title: string;
    content: string;
    isPertinent: boolean;
    isSensitive: boolean;
}
export interface GetSignalementDto  {
    id: number;
    content: string;
    signalementTypeId: number;
    signaledUserId: number;
    signalingUserId: number;
}