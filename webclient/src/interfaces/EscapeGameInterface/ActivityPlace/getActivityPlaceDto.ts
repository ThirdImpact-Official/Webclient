import FormUtils from "@/classes/FormUtils";
import { GetActivityPlaceTypeDto } from "./getActivityPlaceTypeDto";

export interface GetActivityPlaceDto  {
    acpId: number;
    escapegameId: number;
    activityType: GetActivityPlaceTypeDto | null;
    name: string;
    description: string;
    activityTypeId: number;
    addresseId: number | null;
    imgressources: string;
    creationDate: string;
    updateDate: string;
}
export const ActivityPlaceColumns : Array<{ label: string; accessor: keyof GetActivityPlaceDto}> =
[
    FormUtils.TableMapper<GetActivityPlaceDto>("Images", "imgressources"),
    FormUtils.TableMapper<GetActivityPlaceDto>("ID", "acpId"),
    FormUtils.TableMapper<GetActivityPlaceDto>("ID Escape Game", "escapegameId"),
    FormUtils.TableMapper<GetActivityPlaceDto>("ID Activité", "activityTypeId"),
    FormUtils.TableMapper<GetActivityPlaceDto>("Date de création", "creationDate"),
    FormUtils.TableMapper<GetActivityPlaceDto>("Dernière mise à jour", "updateDate"),
];
