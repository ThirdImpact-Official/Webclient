import { HttpClient } from './httpClient';
import { GetOrganisationDto } from '../interfaces/Organisation/getOrganisationDto';
import { PaginationResponse, ServiceResponse } from '@/interfaces/ServiceResponse';
import { AddUserOrganisationDto } from '../interfaces/UserOrganisation/addUserOrganisationDto';
import { ErrorType } from '@/enums/RequestType';
import  {AddOrganisationDto}  from '@/interfaces/Organisation/addOrganisationDto';
import { UpdateUserOrganisationDto } from '@/interfaces/UserOrganisation/updateUserOrganisationDto';
import { UpdateAdressDto } from '../interfaces/Adress/updateAdressDto';
import { error } from 'console';
import { GetUserDto } from '@/interfaces/User/GetUserDto';



export class OrganisationAction {
    private readonly HttpClient = HttpClient.getInstance();
  
    private _httpClient: HttpClient;
    private apibaseurl: string;


    constructor(apibaseurl: string = "http://localhost:5258/api/v1/organisation") {
        this.apibaseurl = apibaseurl;
        this._httpClient = HttpClient.getInstance();
        this._httpClient.setBaseUrl(this.apibaseurl);
    }

    /**
     * Retrieves an organisation by its ID from the server.
     * @param {number} id - The ID of the organisation to be retrieved.
     * @returns {Promise<ServiceResponse<GetOrganisationDto>>} A promise that resolves with a ServiceResponse object.
     *          If the request is successful, the data property of the ServiceResponse object will contain the
     *          organisation. If the request fails, the data property will be null and the success property will
     *          be false.
     * @throws {Error} If the request to retrieve the organisation fails.
     */
    public async GetOrganisationById(id: number): Promise<ServiceResponse<GetOrganisationDto>|PaginationResponse<GetOrganisationDto>> {
        try 
        {
            const response = await this._httpClient.GetRequestType("/" + id).execute<GetOrganisationDto>();
            
            if(response.Success)
            {
                return response;
            }
            throw new Error(response.Message);
        }
        catch(error)
        {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            }
        }
    }

    /**
     * Retrieves all organisations from the server.
     * @returns {Promise<ServiceResponse<GetOrganisationDto[]>>} A promise that resolves with a ServiceResponse object.
     *          If the request is successful, the data property of the ServiceResponse object will contain an array of
     *          GetOrganisationDto objects. If the request fails, the data property will be null and the success property will
     *          be false.
     * @throws {Error} If the request to retrieve all organisations fails.
     */

    public async GetAllOrganisation(page:number ,pageSize: number): Promise<ServiceResponse<GetOrganisationDto> | PaginationResponse<GetOrganisationDto>> {
        try {
            const param: string =`?page=${page}&pageSize=${pageSize}`;
            const response:ServiceResponse<GetOrganisationDto> | PaginationResponse<GetOrganisationDto> = await this._httpClient.GetRequestType(param).execute<GetOrganisationDto>();

            if(response.Success)
            {
                return response;
            }
            else
            {
                return response;    
            }
            throw new Error(response.Message);
        } catch (error) {
            return {
                Data: null,
                Success: false,
                Page: 0,
                PageSize: 0,
                TotalPage: 0,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            }
        }
    }

    /**
     * Adds a new organisation.
     * @param {GetOrganisationDto} organisation - The organisation to be added.
     * @returns {Promise<ServiceResponse<GetOrganisationDto>>} A promise that resolves with a ServiceResponse object.
     *          If the request is successful, the data property of the ServiceResponse object will contain the newly
     *          created organisation. If the request fails, the data property will be null and the success property will
     *          be false.
     * @throws {Error} If the request to add the organisation fails.
     */
    public async addOrganisation(organisation: GetOrganisationDto): Promise<ServiceResponse<GetOrganisationDto>|PaginationResponse<GetOrganisationDto>> {
        try {
            const response = await this._httpClient.PostRequestType("")
                .setData(organisation)
                .execute<GetOrganisationDto>();
            if (response.Success) {
                return response;
            }
            throw new Error(response.Message);
        } catch (error) {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            };
        }
    }

    /**
     * Updates an organisation by its ID.
     * @param {GetOrganisationDto} organisation - The organisation to be updated.
     * @returns {Promise<ServiceResponse<GetOrganisationDto>>} A promise that resolves with a ServiceResponse object.
     *          If the request is successful, the data property of the ServiceResponse object will contain the updated
     *          organisation. If the request fails, the data property will be null and the success property will
     *          be false.
     * @throws {Error} If the request to update the organisation fails.
     */
    public async updateOrganization(organization: GetOrganisationDto): Promise<ServiceResponse<GetOrganisationDto>|PaginationResponse<GetOrganisationDto>> {
        try {
            const response = await this._httpClient.PutRequestType("")
                                                    .setData(organization)
                                                    .execute<GetOrganisationDto>();
            if (response.Success) {
                return response;
            }
            throw new Error(response.Message);
        } catch (error) {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            };
        }
    }

    /**
     * Deletes an organisation by its ID.
     * @param {number} id - The ID of the organisation to be deleted.
     * @returns {Promise<ServiceResponse<GetOrganisationDto>>} A promise that resolves with a ServiceResponse object.
     *          If the request is successful, the data property of the ServiceResponse object will contain the deleted
     *          organisation. If the request fails, the data property will be null and the success property will
     *          be false.
     * @throws {Error} If the request to delete the organisation fails.
     */
    public async DeleteOrganisation(id: number): Promise<ServiceResponse<GetOrganisationDto>|PaginationResponse<GetOrganisationDto>> {
        try {
            const response =  await this._httpClient.DeleteRequestType("/" + id)
                                                    .execute<GetOrganisationDto>();
            if (response.Success) {
                return response;
            }
            throw new Error(response.Message);
        } catch (error) {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            };
        }
       
    }
    /**
     * Adds a new organisation.
     * @param {AddOrganisationDto} organisation - The details of the organisation to be added.
     * @returns {Promise<ServiceResponse<GetOrganisationDto>>} A promise that resolves with a ServiceResponse object.
     *          If the request is successful, the data property of the ServiceResponse object will contain the newly
     *          created organisation. If the request fails, the data property will be null and the success property will
     *          be false.
     * @throws {Error} If the request to add the organisation fails.
     */
    public async AddanOrganisation(organisation: AddOrganisationDto): Promise<ServiceResponse<GetOrganisationDto>|PaginationResponse<GetOrganisationDto>> {
        try {
            const response= await this._httpClient.PostRequestType("")
                                                .setData(organisation)
                                                .execute<GetOrganisationDto>();
            if (response.Success) {
                return response;
            }
        } catch (error) {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            }
        }
    }
    /**
     * Adds a user to an organisation.
     * @param {AddUserOrganisationDto} userOrganisation - The data containing user and organisation details.
     * @returns {Promise<ServiceResponse<GetOrganisationDto>>} A promise that resolves with the status of the addition operation.
     * @throws {Error} If the request to add the user to the organisation fails.
     */

    public async addUserOrganisation(userOrganisation: AddUserOrganisationDto): Promise<ServiceResponse<GetOrganisationDto> | PaginationResponse<GetOrganisationDto>> {
        try {
            const response = await this._httpClient
                .setData(userOrganisation)
                .PostRequestType("/user")
                .execute<GetOrganisationDto>();
                
            if (response.Success) {
                return response;
            }
            
            throw new Error(response.Message);
        } catch (error) {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            };
        }
    }

    /**
     * Removes a user from an organisation.
     * @param {UpdateUserOrganisationDto} userOrganisation - The data containing user and organisation details.
     * @returns {Promise<ServiceResponse<GetOrganisationDto>>} A promise that resolves with the status of the removal operation.
     * @throws {Error} If the request to remove the user from the organisation fails.
     */

    public async RemoveUserOrganisationDto(userOrganisation: UpdateUserOrganisationDto): Promise<ServiceResponse<GetOrganisationDto>|PaginationResponse<GetOrganisationDto>> {
        try {
            
            const response:ServiceResponse<GetOrganisationDto>|PaginationResponse<GetOrganisationDto> = await this._httpClient.DeleteRequestType("/user")
                                            .setData<UpdateUserOrganisationDto>(userOrganisation)
                                            .execute<GetOrganisationDto>();
            if ((response).Success) {
                return response;
            }
            throw new Error(response.Message);
        } catch (error) {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            }
        }
    }

    /**
     * Updates the address of the organisation.
     * @param {UpdateAdressDto} updateData - The updated address data.
     * @returns {Promise<ServiceResponse<GetOrganisationDto>>} A promise that resolves with the updated organisation data.
     * @throws {Error} If the request to update the address fails.
     */
    public async updateAddress(updateData: UpdateAdressDto): Promise<ServiceResponse<GetOrganisationDto> | PaginationResponse<GetOrganisationDto>> {
        try {
            const response = await this._httpClient
                .setData<UpdateAdressDto>(updateData)
                .PutRequestType("/address")
                .execute<GetOrganisationDto>();
                
            if (response.Success) {
                return response;
            }
            throw new Error(response.Message);
        } catch (error) {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            };
        }
    }
    public async GetUserOrganisation(id: number): Promise<ServiceResponse<GetUserDto> | PaginationResponse<GetUserDto>> {
        try 
        {
            const response = await this._httpClient.GetRequestType("/user/" + id).execute<GetUserDto>();   

            if(response.Success)
            {
                return response;
            }
        }
        catch(error)
        {
            return {
                Data: null,
                Success: false,
                Message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            }
        }
    }
}
