import FormUtils from "@/classes/FormUtils";
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
export const reservationcolumns: Array<{ label: string; accessor: keyof GetSessionReservedDto }> = [
    FormUtils.TableMapper("ID", "id"),
    FormUtils.TableMapper("Content", "content"),
    FormUtils.TableMapper("isCancel", "isCancel"),
    FormUtils.TableMapper("Confirmation", "isConfirmed"),
    FormUtils.TableMapper("Date de creation", "creationDate"),
];
