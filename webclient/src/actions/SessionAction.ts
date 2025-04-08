import { AddSessionReservedDto } from '@/interfaces/EscapeGameInterface/Reservation/addSessionReservedDto';
import { GetSessionReservedDto } from '@/interfaces/EscapeGameInterface/Reservation/getSessionReservedDto';
import { AddSessionGameDto } from '@/interfaces/EscapeGameInterface/Session/addSessionGameDto';
import { GetSessionGameDto } from '@/interfaces/EscapeGameInterface/Session/getSessionGameDto';
import { UpdateSessionGameDto } from '@/interfaces/EscapeGameInterface/Session/updateSessionGameDto';
import { HttpClient } from './httpClient'; // Assurez-vous que le chemin est correct
import { ServiceResponse, PaginationResponse } from '@/interfaces/ServiceResponse'; // Assurez-vous que le chemin est correct



// Assurez-vous que les DTOs sont correctement définis

export class SessionAction {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
        this.httpClient.setBaseUrl('http://localhost:7159/escape-game/session'); // Remplacez par l'URL de votre API
    }

    // Méthodes pour les Sessions de Jeu
    public async getSessionById(id: number): Promise<ServiceResponse<GetSessionGameDto> | PaginationResponse<GetSessionGameDto>> {
        return await this.httpClient
            .GetRequestType(`/${id}`)
            .execute<GetSessionGameDto>();
    }
    public async getSessionEscapeGameById(id: number, page: number, pageSize: number): Promise<ServiceResponse<GetSessionGameDto> | PaginationResponse<GetSessionGameDto>> {
        return await this.httpClient
            .GetRequestType(`/escapegame/${id}?page=${page}&pageSize=${pageSize}`)
            .execute<GetSessionGameDto>();
    }
    public async createSessionGame(session: AddSessionGameDto): Promise<ServiceResponse<GetSessionGameDto> | PaginationResponse<GetSessionGameDto>> {
        return await this.httpClient
            .PostRequestType('')
            .setData(session)
            .execute<GetSessionGameDto>();
    }

    public async updateSessionGame(session: UpdateSessionGameDto): Promise<ServiceResponse<GetSessionGameDto> | PaginationResponse<GetSessionGameDto>> {
        return await this.httpClient
            .PutRequestType('')
            .setData(session)
            .execute<GetSessionGameDto>();
    }

    public async deleteSessionGame(id: number): Promise<ServiceResponse<GetSessionGameDto> | PaginationResponse<GetSessionGameDto>> {
        return await this.httpClient
            .DeleteRequestType(`/${id}`)
            .execute<GetSessionGameDto>();
    }

    // Méthodes pour les Sessions Réservées
    public async getSessionReservedByUser(userId: string, page: number, pageSize: number): Promise<ServiceResponse<GetSessionReservedDto> | PaginationResponse<GetSessionReservedDto>> {
        const param: string = `?page=${page}&pageSize=${pageSize}`;
        return await this.httpClient
            .GetRequestType(`/sessionreserved/user${param}`)
            .execute<GetSessionReservedDto>();
    }

    public async getSessionReservedByEscapeGameId(escapeGameId: number, page: number, pageSize: number): Promise<ServiceResponse<GetSessionReservedDto> | PaginationResponse<GetSessionReservedDto>> {
        const param: string = `?page=${page}&pageSize=${pageSize}`;
        return await this.httpClient
            .GetRequestType(`/sessionreserved/escapeGame/${escapeGameId}${param}`)
            .execute<GetSessionReservedDto>();
         
    }

    public async addSessionReserved(reservation: AddSessionReservedDto): Promise<ServiceResponse<GetSessionReservedDto> | PaginationResponse<GetSessionReservedDto>> {
        return await this.httpClient
            .PostRequestType('/sessionreserved')
            .setData(reservation)
            .execute<GetSessionReservedDto>();
    }

    public async cancelSessionReserved(userId: string, sessionId: number): Promise<ServiceResponse<GetSessionReservedDto> | PaginationResponse<GetSessionReservedDto>> {
        return await this.httpClient
            .PutRequestType(`/sessionreserved/${sessionId}`)
            .setData({ userId })
            .execute<GetSessionReservedDto>();
    }
}
