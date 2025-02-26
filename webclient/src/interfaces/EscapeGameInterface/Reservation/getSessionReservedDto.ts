import { GetSessionGameDto } from "../Session/getSessionGameDto";

export interface GetSessionReservedDto {
    id: number;
    content: string;
    userId: string;
    sessionGameId: number;
    sessionGame: GetSessionGameDto | null;
    isCancel: boolean;
    cancelReason: string;
    isConfirmed: boolean;
    creationDate: string;
    updateDate: string;
}