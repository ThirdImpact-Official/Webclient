import { GetActivityPlaceTypeDto } from "./getActivityPlaceTypeDto";

export interface AddActivityPlaceDto  {
    acpEsgId: number;
    activityType: GetActivityPlaceTypeDto | null;
    activityId: number;
    adress: string;
    imgressources: string;
}