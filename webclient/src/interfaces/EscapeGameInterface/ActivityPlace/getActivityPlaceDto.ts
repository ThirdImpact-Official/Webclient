import FormUtils from "@/classes/FormUtils";
import { GetActivityPlaceTypeDto } from "./getActivityPlaceTypeDto";

export interface GetActivityPlaceDto  {
    acpId: number;
    acpEsgId: number;
    activityType: GetActivityPlaceTypeDto | null;
    activityId: number;
    adress: string;
    imgressources: string;
    creationDate: string;
    updateDate: string;
}
export const ActivityPlaceColumns = [
    FormUtils.TableMapper("ID", "acpId"),
    FormUtils.TableMapper("ID Escape Game", "acpEsgId"),
    FormUtils.TableMapper("Type d'activité", "activityType"),
    FormUtils.TableMapper("ID Activité", "activityId"),
    FormUtils.TableMapper("Adresse", "adress"),
    FormUtils.TableMapper("Images", "imgressources"),
    FormUtils.TableMapper("Date de création", "creationDate"),
    FormUtils.TableMapper("Dernière mise à jour", "updateDate"),
];
