import React , { createContext, useContext, useState,useEffect, FC } from "react";
import axios from "axios";
import { ServiceResponse } from "@/interfaces/ServiceResponse";
import { error } from "console";


interface LoginCredentials 
{
        username: string;
        password: string;
}

interface AuthContextType {
    login:(credentials: LoginCredentials)=> Promise<void> ;
    logout:()=> Promise<void>,
    isAuthenticated: boolean;
};

export const AuthContext= createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
    children: React.ReactNode   
}
/**
 * Provides authentication state and functions to the application.
 *
 * The `AuthProvider` component is used to wrap the entire application in
 * order to provide authentication state and functions to the application.
 *
 * The component uses the `useState` hook to store the authentication state in
 * the component's state, and the `useEffect` hook to set up an interceptor for
 * axios to handle authentication.
 *
 * The `login` function is used to log in to the server, and the `logout`
 * function is used to log out of the server.
 *
 * The `isAuthenticated` state is used to determine whether the user is
 * authenticated or not.
 *
 * The component also provides a `checkAuth` function that can be used to
 * check the authentication state of the server.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const apiUrl = 'http://localhost:8080';


    /**
     * Logs in to the server with the given credentials.
     *
     * Updates the `isAuthenticated` state to `true` if the login is successful.
     *
     * Throws an error if the request to log in fails.
     * @param {LoginCredentials} credentials - The username and password to log in with.
     */
    const login = async (credentials: LoginCredentials) => {
        try {
            await axios.post(`${apiUrl}/login`, credentials, {
                withCredentials: true,
            });
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error(error.response.message);
        }
    };
    /**
     * Logs out from the server and updates the authentication state.
     *
     * Throws an error if the logout request fails.
     *
     * @throws {Error} If the request to log out fails.
     */
    const logout = async () => {
        try {
           const response = await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
           if(!response.data.success)
           {
                throw new error('Logout failed');
           }
           setIsAuthenticated(false);
        } catch (error) {
            throw new Error(error.response?.message || 'Logout failed');
        }
    };
    /**
     * Checks the authentication state of the server by making a GET request to the `/checkauth` endpoint.
     * If the request is successful, the `isAuthenticated` state is updated to true.
     * If the request fails, the `isAuthenticated` state is updated to false and an error is thrown.
     *
     * @throws {Error} If the request to check authentication fails.
     */
    const checkAuth = async () => {
        try {
            const response = await axios.get<ServiceResponse<string>>(`${apiUrl}/checkauth`, {
                withCredentials: true,
            });
 
            setIsAuthenticated(response.data.success || false);

        } catch (error) {
            setIsAuthenticated(false);
            throw new Error(error.response.message);
        }
    };
    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);
    
    useEffect(()=> 
    {
            checkAuth();
    });

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
          async error => {
                if (error.response?.status === 401) {
                   await  logout();
                }
                return Promise.reject(error);
            }
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    const value = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to access the authentication context.
 *
 * This hook provides access to the authentication context, allowing components
 * to use authentication-related state and functions. It must be used within a
 * component wrapped by `AuthProvider`.
 *
 * @throws {Error} If the hook is used outside of an `AuthProvider`.
 *
 * @returns {AuthContextType} The authentication context value.
 */

export const useAuth = (): AuthContextType =>{

    const  context = useContext(AuthContext);
    if(!context)
    {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
} 