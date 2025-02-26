import { GetEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import { HttpClient } from "./httpClient";
import { PaginationResponse, ServiceResponse } from "@/interfaces/ServiceResponse";
export class EscapegameActions{
    
    private _httpClient: HttpClient;
    private apibaseurl: string;


    constructor(apibaseurl: string = "http://localhost:5258/api/v1/") {
        this.apibaseurl = apibaseurl;
        this._httpClient = HttpClient.getInstance();
        this._httpClient.setBaseUrl(this.apibaseurl);
    }

    public GetAllEscapeGame(): Promise<ServiceResponse<GetEscapeGameDto> | PaginationResponse<GetEscapeGameDto>> {
        return this._httpClient.GetRequestType("escapegame").execute();
    }
}