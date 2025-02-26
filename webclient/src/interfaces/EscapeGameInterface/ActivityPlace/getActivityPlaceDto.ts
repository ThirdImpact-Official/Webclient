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