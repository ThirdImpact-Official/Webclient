import { GetActivityPlaceTypeDto } from './getActivityPlaceTypeDto';
export interface UpdateActivityPlaceDto {
    acpId: number;
    escapegameId: number;
    activityTypeId: number;
    name: string;
    description: string;
    imgressources: string;
}