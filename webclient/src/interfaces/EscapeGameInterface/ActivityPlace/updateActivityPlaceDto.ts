import { GetActivityPlaceTypeDto } from './getActivityPlaceTypeDto';
export interface UpdateActivityPlaceDto {
    acpId: number;
    acpEsgId: number;
    activityType: GetActivityPlaceTypeDto | null;
    activityId: number;
    adress: string;
    imgressources: string;
}