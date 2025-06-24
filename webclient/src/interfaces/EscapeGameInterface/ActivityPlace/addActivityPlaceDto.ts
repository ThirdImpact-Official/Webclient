import { GetActivityPlaceTypeDto } from "./getActivityPlaceTypeDto";

export interface AddActivityPlaceDto  {
    escapegameId: number;
    activityTypeId: number;
    name: string;
    description: string;
    imgressources: string;
}