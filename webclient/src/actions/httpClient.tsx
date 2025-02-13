import { ErrorType, RequestType } from "@/enums/RequestType";
import axios,{ AxiosInstance} from "axios";


interface ServiceResponse<T>
{
    data: T;
    success: boolean;
    message: string;
    ErrorType: ErrorType;
}

export class HttpClient 
{
    private Axios: AxiosInstance;
    private baseUrl: string ="";
    private url: string= "";
    private requestType: RequestType = RequestType.GET;
    private static instance: HttpClient;
    private Data : unknown = null;
    // 
    constructor(  )
    {
       this.Axios= axios.create({
           headers:{
                'Content-Type': 'application/json'
           }
       });
    }

    /**
    * Sends a request to the server and returns a promise that resolves with a ServiceResponse object.
    * @param {string} url - The URL of the request.
    * @param {RequestType} requestType - The type of the request.
    * @param {T} data - The data to be sent with the request.
    * @returns {Promise<ServiceResponse<T>>} A promise that resolves with a ServiceResponse object.
    */
    private Sendrequest<T>( url: string, requestType: RequestType, data?: T ): Promise<ServiceResponse<T>>
    {
        return new Promise<ServiceResponse<T>>((resolve)=>
            {
                let methodes:string;
                switch (requestType) {
                    case RequestType.GET:
                        methodes = "get";
                        break;
                    case RequestType.POST:
                        methodes = "post";
                        break;
                    case RequestType.PUT:
                        methodes = "put";
                        break;
                    case RequestType.DELETE:
                        methodes = "delete";
                        break;
                    default:
                        methodes = "get";
                        break;
                }
                this.Axios
                .request({
                        url: this.baseUrl + url, 
                        method: methodes,
                        data: data})
                .then((response) => {
                        resolve({
                            data: response.data, 
                            success: true, 
                            message: "Success", 
                            ErrorType: ErrorType.Good})    
                })
                .catch((error) => {
                        resolve({
                            data: null,
                            success: false,
                            message: error.message,
                            ErrorType: ErrorType.Bad});
                })
            
            });
    
    }
    /**
     * Sets the base URL of the API endpoint for all subsequent requests.
     * 
     * @param {string} baseUrl - The base URL of the API endpoint. This URL
     * is prepended to all request URLs used in the other methods of this class.
     * @returns {HttpClient} The instance of HttpClient for method chaining.
     */
    public setBaseUrl( baseUrl: string ): HttpClient
    {
        this.baseUrl = baseUrl;
        return this;
    }
    
    /**
     * Returns the single instance of HttpClient.
     * This is a singleton method that returns the single instance of HttpClient,
     * creating one if it doesn't already exist. This is useful for when you want
     * to ensure that all requests are made with the same instance of HttpClient.
     * @returns {HttpClient} The single instance of HttpClient.
     */
    public static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    }

    /**
     * Sets the HTTP request type to GET and configures the request URL.
     *
     * @param {string} url - The endpoint URL for the GET request.
     * @returns {HttpClient} The instance of HttpClient for method chaining.
     */
    public GetRequestType( url: string ): HttpClient
    {
        this.requestType = RequestType.GET;
        this.url = url;
        return this;
    }
    /**
     * Sets the HTTP request type to POST and configures the request URL.
     *
     * @param {string} url - The endpoint URL for the POST request.
     * @returns {HttpClient} The instance of HttpClient for method chaining.
     */

    public PostRequestType( url: string ): HttpClient
    {
        this.requestType = RequestType.POST;
        this.url = url;
        return this;
    }
/**
 * Sets the HTTP request type to PUT and configures the request URL.
 *
 * @param {string} url - The endpoint URL for the PUT request.
 * @returns {HttpClient} The instance of HttpClient for method chaining.
 */

    public PutRequestType( url: string ): HttpClient
    {
        this.requestType = RequestType.PUT;
        this.url = url;
        return this;
    }
/**
 * Sets the HTTP request type to DELETE and configures the request URL.
 *
 * @param {string} url - The endpoint URL for the DELETE request.
 * @returns {HttpClient} The instance of HttpClient for method chaining.
 */

    public DeleteRequestType( url: string ): HttpClient
    {
        this.requestType = RequestType.DELETE;
        this.url = url;
        return this;
    }
/**
 * Sets the data to be used in an HTTP request.
 *
 * @template T - The type of data to be set.
 * @param {T} data - The data to be used in the request.
 * @returns {HttpClient} The instance of HttpClient for method chaining.
 */

    public setData<T>( data: T ): HttpClient
    {
        this.Data = data;
        return this;
    }

/**
 * Executes an HTTP request based on the configured request type and URL.
 * 
 * @template T - The type of data expected in the response.
 * @returns {Promise<ServiceResponse<T>>} A promise that resolves to a service response containing the data, success status, message, and error type.
 * @throws Will return an error response if the base URL is not set or if the request fails.
 */

    public async execute<T>(): Promise<ServiceResponse<T>>
    {
        if (!this.baseUrl) {
            return {
                data: null,
                success: false,
                message: 'Base URL not set',
                ErrorType: ErrorType.Null,
            };
        }

        try {
            let response: ServiceResponse<T>;
            const fullUrl = `${this.baseUrl}${this.url}`;
            if(this.requestType == RequestType.GET)
            {
                 response = await this.Sendrequest(fullUrl, this.requestType);
            }
            else
            {
                if(this.Data == null)
                {
                    return {
                        data: null,
                        success: false,
                        message: 'Data not set',
                        ErrorType: ErrorType.Null,
                    };
                }
                response = await this.Sendrequest(fullUrl, this.requestType, this.Data as T);
            }

            return response as ServiceResponse<T>;
        } catch (error) {
            return {
                data: null,
                success: false,
                message: error.message,
                ErrorType: ErrorType.Bad,
            };
        }
    }
}   