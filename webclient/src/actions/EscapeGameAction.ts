import { GetEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import { HttpClient } from "./httpClient";
import { PaginationResponse, ServiceResponse } from "@/interfaces/ServiceResponse";
import { AddActivityPlaceDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/addActivityPlaceDto";
import { GetActivityPlaceDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/getActivityPlaceDto";
import { GetActivityPlaceTypeDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/getActivityPlaceTypeDto";
import { UpdateActivityPlaceDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/updateActivityPlaceDto";
import { AddEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/addEscapeGameDto";
import { UpdateEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/updateEscapeGameDto";
import { AddEventDto } from "@/interfaces/EscapeGameInterface/Event/addEventDto";
import { GetEventDto } from "@/interfaces/EscapeGameInterface/Event/getEventDto";
import { UpdateEventDto } from "@/interfaces/EscapeGameInterface/Event/updateEventDto";

export class EscapeGameActions {
    private readonly httpClient: HttpClient;
    private readonly apibaseurl: string;

    constructor(apibaseurl: string = "http://localhost:5258/api/v1/") {
        this.apibaseurl = apibaseurl;
        this.httpClient = HttpClient.getInstance();
        this.httpClient.setBaseUrl(this.apibaseurl);
    }

    public async getAllEscapeGames(): Promise<ServiceResponse<GetEscapeGameDto> | PaginationResponse<GetEscapeGameDto>> {
        return await this.httpClient
            .GetRequestType("escapegame")
            .execute<GetEscapeGameDto>();
    }

    public async getEscapeGameById(id: number): Promise<ServiceResponse<GetEscapeGameDto> | PaginationResponse<GetEscapeGameDto>> {
        return await this.httpClient
            .GetRequestType(`escapegame/${id}`)
            .execute<GetEscapeGameDto>();
    }

    public async createEscapeGame(escapeGame: AddEscapeGameDto): Promise<ServiceResponse<GetEscapeGameDto> | PaginationResponse<GetEscapeGameDto>> {
        return await this.httpClient
            .PostRequestType('escapegame')
            .setData(escapeGame)
            .execute<GetEscapeGameDto>();
    }

    public async updateEscapeGame(escapeGame: UpdateEscapeGameDto): Promise<ServiceResponse<GetEscapeGameDto> | PaginationResponse<GetEscapeGameDto>> {
        return await this.httpClient
            .PutRequestType('escapegame')
            .setData(escapeGame)
            .execute<GetEscapeGameDto>();
    }

    public async deleteEscapeGame(id: number): Promise<ServiceResponse<GetEscapeGameDto> | PaginationResponse<GetEscapeGameDto>> {
        return await this.httpClient
            .DeleteRequestType(`escapegame/${id}`)
            .execute<GetEscapeGameDto>();
    }

    // Méthodes pour les Activity Places
    public async getAllActivityTypes(): Promise<ServiceResponse<GetActivityPlaceTypeDto[]> | PaginationResponse<GetActivityPlaceTypeDto[]>> {
        return await this.httpClient
            .GetRequestType('activityplace/type')
            .execute<GetActivityPlaceTypeDto[]>();
    }

    public async getActivityPlaces(page: number, pageSize: number, activityTypeId: number): Promise<ServiceResponse<GetActivityPlaceDto> |PaginationResponse<GetActivityPlaceDto>> {
        const param: string =`?page=${page}&pageSize=${pageSize}&activityTypeId=${activityTypeId}`;
        return await this.httpClient
            .GetRequestType('activityplace'+param)
            .execute<GetActivityPlaceDto>();
    }

    public async getActivityPlaceById(id: number): Promise<ServiceResponse<GetActivityPlaceDto> | PaginationResponse<GetActivityPlaceDto>> {
        return await this.httpClient
            .GetRequestType(`activityplace/${id}`)
            .execute<GetActivityPlaceDto>();
    }

    public async createActivityPlace(activityPlace: AddActivityPlaceDto): Promise<ServiceResponse<GetActivityPlaceDto> | PaginationResponse<GetActivityPlaceDto>> {
        return await this.httpClient
            .PostRequestType('activityplace')
            .setData(activityPlace)
            .execute<GetActivityPlaceDto>();
    }

    public async updateActivityPlace(activityPlace: UpdateActivityPlaceDto): Promise<ServiceResponse<GetActivityPlaceDto> | PaginationResponse<GetActivityPlaceDto>> {
        return await this.httpClient
            .PutRequestType('activityplace')
            .setData(activityPlace)
            .execute<GetActivityPlaceDto>();
    }

    public async deleteActivityPlace(id: number): Promise<ServiceResponse<GetActivityPlaceDto> | PaginationResponse<GetActivityPlaceDto>> {
        return await this.httpClient
            .DeleteRequestType(`activityplace/${id}`)
            .execute<GetActivityPlaceDto>();
    }

    // Méthodes pour les Events
    public async getEventsByEscapeGameId(id: number, page: number, pageSize: number): Promise<ServiceResponse<GetEventDto> | PaginationResponse<GetEventDto>> {
        const param: string =`?page=${page}&pageSize=${pageSize}`;

        return await this.httpClient
            .GetRequestType(`/event/escapeGame/${id}`+param)
            .execute<GetEventDto>();
    }

    public async getEventById(id: number): Promise<ServiceResponse<GetEventDto> | PaginationResponse<GetEventDto>> {
        return await this.httpClient
            .GetRequestType(`/event/${id}`)
            .execute<GetEventDto>();
    }

    public async createEvent(event: AddEventDto): Promise<ServiceResponse<GetEventDto> | PaginationResponse<GetEventDto>> {
        return await this.httpClient
            .PostRequestType('/event')
            .setData(event)
            .execute<GetEventDto>();
    }

    public async updateEvent(event: UpdateEventDto): Promise<ServiceResponse<GetEventDto> | PaginationResponse<GetEventDto>> {
        return await this.httpClient
            .PutRequestType('/event')
            .setData(event)
            .execute<GetEventDto>();
    }

    public async deleteEvent(id: number): Promise<ServiceResponse<GetEventDto> | PaginationResponse<GetEventDto>> {
        return await this.httpClient
            .DeleteRequestType(`/event/${id}`)
            .execute<GetEventDto>();
    }
}
