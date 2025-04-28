import React , { createContext, useContext, useState,useEffect, FC } from "react";
import axios, { AxiosResponse } from "axios";
import { ServiceResponse } from "@/interfaces/ServiceResponse";
import { log } from "console";
import { AuthResponse } from "@/interfaces/User/Authresponse";
import { CreadentialAction } from '../actions/CreadentialAction';
import Login from '../pages/auth/login/Login';



interface LoginCredentials 
{
        emailAdress: string;
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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(()=>{
        const storedAuth =localStorage.getItem("isAuthenticated");
        console.log("value ", storedAuth);
        return storedAuth==="true";
    });
    const apiUrl = 'http://localhost:7159/escape-game';
    const action=new CreadentialAction();

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
            const respons  = await action.Login(credentials);
            console.log(" data from login :");
            console.log(respons.Success);
            if(respons.Success)
            {
                console.log(respons.Data)
                
                persistentAutentication(true);
                setIsAuthenticated(true);
            }
            else
            {
                persistentAutentication(false);
                setIsAuthenticated(false);
            }
            
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
           const response = await action.Logout();
           if(!response.Success)
           {
                throw new Error('Logout failed');
           }
           //remove authnetication
           RemoveAuth();
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
            const response = await action.Checkauth();
            if(response.Success) {
                console.log(response.Success);
                if(response.Success != isAuthenticated)
                {
                    setIsAuthenticated(response.Success);
                }
                else
                {
                    setIsAuthenticated(true);
                }
            }
            else {
                setIsAuthenticated(false);
                logout();
            }

        } catch (error) {
            setIsAuthenticated(false);
            throw new Error(error.response?.Message);
        }
    }
    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);
    // vérifie a interval régulier que l'utilisateur est connecter 
    useEffect(()=> 
    {
        const interval = setInterval(()=>{
            checkAuth();

        },5*60*1000);

        return () =>clearInterval(interval);
    },[]);

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

    function persistentAutentication(valuetoStored:boolean){
        localStorage.setItem("isAuthenticated",valuetoStored.toString());

        setIsAuthenticated(valuetoStored);
        console.log("from persistence methodes "+isAuthenticated);
    }
    function RemoveAuth()
    {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
    }

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
