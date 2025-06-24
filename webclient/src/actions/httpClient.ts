import { ErrorType, RequestType } from "@/enums/RequestType";
import { PaginationResponse, ServiceResponse } from "@/interfaces/ServiceResponse";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class HttpClient {
    private Axios: AxiosInstance;
    private baseUrl: string = "";
    private url: string = "";
    private requestType: RequestType = RequestType.GET;
    private static instance: HttpClient;
    private Data: unknown = null;
    private jwtCookieName: string = 'jwt';
    
    constructor() {
        this.Axios = axios.create({
            withCredentials: true
        });
        
        // Intercepteur pour ajouter le token JWT à chaque requête
        this.Axios.interceptors.request.use((config) => {
            const token = this.getJwtCookieValue();
            
            // Toujours définir Content-Type
            if (!config.headers['Content-Type']) {
               
               
            }
            
            // Ajouter le token JWT s'il existe
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
                console.log('JWT token added to request:', token.substring(0, 20) + '...');
            } else {
                console.log('No JWT token found in cookies');
                // Ne pas supprimer l'en-tête Authorization s'il n'y a pas de token
                // car certaines routes peuvent ne pas en avoir besoin
            }
            
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // Intercepteur de réponse pour gérer les erreurs d'authentification
        this.Axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    console.log('Unauthorized request - JWT may be invalid or expired');
                    // Optionnellement, supprimer le cookie JWT invalide
                    this.clearJwtCookie();
                }
                return Promise.reject(error);
            }
        );
    }
    
    /**
    * Sends a request to the server and returns a promise that resolves with a ServiceResponse object.
    */
    private Sendrequest<T>(actionurl: string, requestType: RequestType, data?: T): Promise<ServiceResponse<T>> {
        console.log("Sending request to:", actionurl);
        console.log("Request type:", requestType);
        console.log("Request data:", data);
        
        return new Promise<ServiceResponse<T>>((resolve) => {
            const method = this.getHttpMethod(requestType);
            
            const config: AxiosRequestConfig = {
                url: actionurl,
                method: method,
                data: data
            };
             // Si c'est du FormData, on ne définit pas Content-Type (axios le fait automatiquement)
            if (data instanceof FormData) {
                config.data = data;
            } else if (data) {
                config.data = data;
                config.headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
            }
            this.Axios.request(config)
            .then((axiosResponse) => {
                console.log("Response received:", axiosResponse.status);
                const res = axiosResponse.data;
                const standard: ServiceResponse<T> = {
                    Data: res.data,
                    Success: res.success,
                    Message: res.message,
                    ErrorType: res.errorType
                };
                resolve(standard);
            })
            .catch((error) => {
                console.error("Request failed:", error);
                console.error("Error response:", error.response?.data);
                console.error("Error status:", error.response?.status);
                
                resolve({
                    Data: null,
                    Success: false,
                    Message: error.response?.data?.message || error.message || "Request failed",
                    ErrorType: error.response?.data?.errorType || ErrorType.Bad
                });
            });
        });        
    }
    
    private SendPageRequest<T>(actionurl: string, requestType: RequestType, data?: T): Promise<PaginationResponse<T>> {
        console.log("Sending paginated request to:", actionurl);
        
        return new Promise<PaginationResponse<T>>((resolve) => {
            const method = this.getHttpMethod(requestType);
            
            const config: AxiosRequestConfig = {
                url: actionurl,
                method: method,
                data: data
            };
            
            this.Axios.request(config)
            .then((axiosResponse) => {
                const res = axiosResponse.data;
                const paginated: PaginationResponse<T> = {
                    Data: res.data,
                    Success: res.success,
                    Message: res.message,
                    ErrorType: res.errorType,
                    Page: res.page,
                    PageSize: res.pageSize,
                    TotalPage: res.totalPage
                };
                resolve(paginated);
            })
            .catch((error) => {
                console.error("Paginated request failed:", error);
                resolve({
                    Data: null,
                    Success: false,
                    Page: 0,
                    PageSize: 0,
                    TotalPage: 0,
                    Message: error.response?.data?.message || error.message || "Request failed",
                    ErrorType: error.response?.data?.errorType || ErrorType.Bad
                });
            });
        });
    }
    
    /**
     * Convertit le RequestType en méthode HTTP string
     */
    private getHttpMethod(requestType: RequestType): string {
        switch (requestType) {
            case RequestType.GET:
                return "get";
            case RequestType.POST:
                return "post";
            case RequestType.PUT:
                return "put";
            case RequestType.DELETE:
                return "delete";
            default:
                return "get";
        }
    }
    
    /**
     * Définit le nom du cookie contenant le JWT
     */
    public setJwtCookieName(cookieName: string): HttpClient {
        this.jwtCookieName = cookieName;
        return this;
    }
    
    /**
     * Vérifie si le cookie JWT est présent dans le document
     */
    private hasJwtCookie(): boolean {
        return this.getJwtCookieValue() !== null;
    }
    
    /**
     * Récupère la valeur du cookie JWT avec une meilleure gestion des erreurs
     */
    private getJwtCookieValue(): string | null {
        try {
            if (typeof document === 'undefined') {
                console.log('Document is undefined (SSR context)');
                return null;
            }
            
            if (!document.cookie) {
                console.log('No cookies found in document');
                return null;
            }
            
            const cookies = document.cookie.split(';');
            console.log('Available cookies:', cookies.map(c => c.split('=')[0].trim()));
            
            const jwtCookie = cookies.find(cookie => {
                const trimmedCookie = cookie.trim();
                return trimmedCookie.startsWith(`${this.jwtCookieName}=`);
            });
            
            if (jwtCookie) {
                const value = jwtCookie.split('=')[1]?.trim();
                if (value && value !== '') {
                    console.log(`JWT cookie '${this.jwtCookieName}' found`);
                    return value;
                } else {
                    console.log(`JWT cookie '${this.jwtCookieName}' is empty`);
                    return null;
                }
            } else {
                console.log(`JWT cookie '${this.jwtCookieName}' not found`);
                return null;
            }
        } catch (error) {
            console.error('Error reading JWT cookie:', error);
            return null;
        }
    }

    /**
     * Supprime le cookie JWT (utile en cas de token expiré)
     */
    private clearJwtCookie(): void {
        try {
            if (typeof document !== 'undefined') {
                document.cookie = `${this.jwtCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
                console.log(`JWT cookie '${this.jwtCookieName}' cleared`);
            }
        } catch (error) {
            console.error('Error clearing JWT cookie:', error);
        }
    }

    /**
     * Définit manuellement le token JWT (utile après connexion)
     */
    public setJwtToken(token: string, expires?: Date): HttpClient {
        try {
            if (typeof document !== 'undefined') {
                let cookieString = `${this.jwtCookieName}=${token}; path=/; SameSite=Strict`;
                
                if (expires) {
                    cookieString += `; expires=${expires.toUTCString()}`;
                }
                
                // Ajouter Secure en production
                if (window.location.protocol === 'https:') {
                    cookieString += '; Secure';
                }
                
                document.cookie = cookieString;
                console.log(`JWT token set in cookie '${this.jwtCookieName}'`);
            }
        } catch (error) {
            console.error('Error setting JWT cookie:', error);
        }
        return this;
    }

    /**
     * Sets the base URL of the API endpoint for all subsequent requests.
     */
    public setBaseUrl(baseUrl: string): HttpClient {
        this.baseUrl = baseUrl;
        return this;
    }
    
    /**
     * Returns the single instance of HttpClient.
     */
    public static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    }

    /**
     * Sets the HTTP request type to GET and configures the request URL.
     */
    public GetRequestType(url: string): HttpClient {
        this.requestType = RequestType.GET;
        this.url = url;
        return this;
    }
    
    /**
     * Sets the HTTP request type to POST and configures the request URL.
     */
    public PostRequestType(url: string): HttpClient {
        this.requestType = RequestType.POST;
        this.url = url;
        return this;
    }
    
    /**
     * Sets the HTTP request type to PUT and configures the request URL.
     */
    public PutRequestType(url: string): HttpClient {
        this.requestType = RequestType.PUT;
        this.url = url;
        return this;
    }
    
    /**
     * Sets the HTTP request type to DELETE and configures the request URL.
     */
    public DeleteRequestType(url: string): HttpClient {
        this.requestType = RequestType.DELETE;
        this.url = url;
        return this;
    }
    
    /**
     * Sets the data to be used in an HTTP request.
     */
    public setData<T>(data: T): HttpClient {
        this.Data = data;
        return this;
    }
    public setFormDate<T>(data: T): HttpClient {
        
        this.Data = data;
        return this;
    }
    private ResetState(): void {
        this.url = '';
        this.requestType = RequestType.GET;
        this.Data = null;
    }
    
    /**
     * Executes an HTTP request based on the configured request type and URL.
     */
    public async execute<T>(): Promise<ServiceResponse<T>> {
        const currentState = {
            baseUrl: this.baseUrl,
            url: this.url,
            requestType: this.requestType,
            Data: this.Data,
        };

        if (!this.baseUrl) {
            return {
                Data: null,
                Success: false,
                Message: 'Base URL not set',
                ErrorType: ErrorType.Null,
            };
        }

        try {
            const fullUrl = `${this.baseUrl}${this.url}`;
            console.log("Executing request:", {
                url: fullUrl,
                method: this.getHttpMethod(this.requestType),
                hasData: this.Data !== null,
                hasJWT: this.hasJwtCookie()
            });
            
            let response: ServiceResponse<T>;
            
            if (this.requestType === RequestType.GET) {
                response = await this.Sendrequest(fullUrl, this.requestType);
            } else {
                response = await this.Sendrequest(fullUrl, this.requestType, this.Data as T);
            }
            
            return response as ServiceResponse<T>;
        } catch (error: any | Error) {
            console.error("Execute error:", error);
            return {
                Data: null,
                Success: false,
                Message: error.message || "Unknown error",
                ErrorType: ErrorType.Bad,
            };
        } finally {
            // Optionnellement, vous pouvez choisir de réinitialiser l'état ou le conserver
            // this.ResetState();
        }
    }
    
    public async executePagination<T>(): Promise<PaginationResponse<T>> {
        const currentState = {
            baseUrl: this.baseUrl,
            url: this.url,
            requestType: this.requestType,
            Data: this.Data,
        };

        if (!this.baseUrl) {
            return {
                Data: null,
                Success: false,
                Message: 'Base URL not set',
                TotalPage: 0,
                Page: 0,
                PageSize: 0,
                ErrorType: ErrorType.Null,
            };
        }

        try {
            const fullUrl = `${this.baseUrl}${this.url}`;
            console.log("Executing paginated request:", {
                url: fullUrl,
                method: this.getHttpMethod(this.requestType),
                hasData: this.Data !== null,
                hasJWT: this.hasJwtCookie()
            });
            
            let response: PaginationResponse<T>;
            
            if (this.requestType === RequestType.GET) {
                response = await this.SendPageRequest(fullUrl, this.requestType);
            } else {
                response = await this.SendPageRequest(fullUrl, this.requestType, this.Data as T);
            }
            
            return response as PaginationResponse<T>;
        } catch (error: any | Error) {
            console.error("ExecutePagination error:", error);
            return {
                Data: null,
                Success: false,
                Message: error.message || "Unknown error",
                TotalPage: 0,
                Page: 0,
                PageSize: 0,
                ErrorType: ErrorType.Bad,
            };
        } finally {
            // Optionnellement, vous pouvez choisir de réinitialiser l'état ou le conserver
            // this.ResetState();
        }
    }

    /**
     * Méthode utilitaire pour déboguer les cookies
     */
    public debugCookies(): void {
        console.log('=== Cookie Debug Info ===');
        console.log('JWT Cookie Name:', this.jwtCookieName);
        console.log('Document cookies:', document.cookie);
        console.log('JWT Cookie Value:', this.getJwtCookieValue());
        console.log('Has JWT Cookie:', this.hasJwtCookie());
        console.log('========================');
    }
}