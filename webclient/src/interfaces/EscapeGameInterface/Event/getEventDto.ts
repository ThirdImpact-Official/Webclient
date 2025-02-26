export interface GetEventDto extends BaseDto {
    eventId: number;
    escapegameId: number;
    eventTitle: string;
    eventDescription: string;
    startDate: string;
    endDate: string;
}