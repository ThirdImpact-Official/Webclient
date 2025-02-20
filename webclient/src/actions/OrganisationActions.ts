import { HttpClient } from './httpClient';
import { GetOrganisationDto } from '../interfaces/Organisation/getOrganisationDto';
import { ServiceResponse } from '@/interfaces/ServiceResponse';
import { AddUserOrganisationDto } from '../interfaces/UserOrganisation/addUserOrganisationDto';

export class OrganisationAction {

    private readonly HttpClient = HttpClient.getInstance();
    private SelectedOrganisation: any = null;
    private _httpClient: HttpClient;
    private  apibaseurl: string ;
    constructor(apibaseurl: string= "http://localhost:5000/api/v1/organisation")
    {
       this.apibaseurl = apibaseurl;
       this._httpClient = HttpClient.getInstance();
       this._httpClient.setBaseUrl(this.apibaseurl);
    }
    /// <summary>
    public GetOrganisationById(id: number): Promise<ServiceResponse<GetOrganisationDto>> {
        return this._httpClient.GetRequestType("/" + id)
                               .execute<GetOrganisationDto>();
    }


    /// <summary>
    /// Retrieves all organisations
    /// </summary>
    /// <returns>A ServiceResponse containing all organisations if the request is successful, otherwise an error is thrown</returns>
    public GetAllOrganisation(): Promise<ServiceResponse<GetOrganisationDto[]>> {
        return this._httpClient.GetRequestType("")
                               .execute<GetOrganisationDto[]>();
    }
       
    /// <summary>
    /// Adds a new organisation
    /// </summary>
    /// <param name="organisation">The organisation to add</param>
    /// <returns>A ServiceResponse containing the added organisation if the request is successful, otherwise an error is thrown</returns>
    public AddOrganisation(organisation: GetOrganisationDto): Promise<ServiceResponse<GetOrganisationDto>> {
        return this._httpClient.PostRequestType("")
                               .setData(organisation)
                               .execute<GetOrganisationDto>();
    }
    /**
     * Updates an organization
     * @param organization The organization to update
     * @returns A ServiceResponse containing the updated organization if the request is successful, otherwise an error is thrown
     */
    public async updateOrganization(organization: GetOrganisationDto): Promise<ServiceResponse<GetOrganisationDto>> {
        try {
            const response = await this._httpClient.PutRequestType("")
                                                   .setData(organization)
                                                   .execute<GetOrganisationDto>();
            if (response.success) {
                return response;
            }
            throw new Error(response.message);
        } catch (error) {
            return {
                data: null,
                success: false,
                message: error instanceof Error ? error.message : 'An error occurred',
                ErrorType: ErrorType.Bad,
            };
        }
    }

    public DeleteOrganisation(id: number): Promise<ServiceResponse<GetOrganisationDto>> {
        return this._httpClient.DeleteRequestType("/" + id)
                               .execute<GetOrganisationDto>();
    }

    public AddUserOrganisationDto(userOrganisation: AddUserOrganisationDto): Promise<ServiceResponse<GetOrganisationDto>> {
        return this._httpClient.PostRequestType("/user")
                               .setData(userOrganisation)
                               .execute<GetOrganisationDto>();
    }
    public RemoceUserOrganisationDto(userOrganisation: AddUserOrganisationDto): Promise<ServiceResponse<GetOrganisationDto>> {
        return this._httpClient.DeleteRequestType("/user")
                               .setData(userOrganisation)
                               .execute<GetOrganisationDto>();
    }
}