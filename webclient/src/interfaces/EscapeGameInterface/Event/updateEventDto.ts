export interface UpdateEventDto extends UpdateDto {
    eventId: number;
    escapegameId: number;
    escapegame: Escapegame | null;
    eventTitle: string;
    eventDescription: string;
}