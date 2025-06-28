import React, { createContext, useContext, useState, useEffect, FC } from "react";
import axios, { AxiosResponse } from "axios";
import { ServiceResponse } from "@/interfaces/ServiceResponse";
import { AuthResponse } from "@/interfaces/User/Authresponse";
import { CreadentialAction } from '../actions/CreadentialAction';
import { GetUserDto } from "@/interfaces/User/GetUserDto";
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
    emailAdress: string;
    password: string;
}

interface AuthContextType {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    user: GetUserDto | null;
    isLoading: boolean; // Ajouté pour gérer l'état de chargement
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

/**
 * Provides authentication state and functions to the application.
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // État de chargement initial
    const [user, setUser] = useState<GetUserDto | null>(null);
    const action = new CreadentialAction();

    /**
     * Initialise l'état d'authentification au démarrage
     */
    const initializeAuth = async () => {
        setIsLoading(true);
        
        const storedAuth = localStorage.getItem("isAuthenticated");
        console.log("Stored auth value:", storedAuth);
        
        if (storedAuth === "true") {
            // Vérifier si l'authentification est toujours valide
            try {
                await checkAuth();
            } catch (error) {
                console.error("Auth initialization failed:", error);
                removeAuth();
            }
        } else {
            setIsAuthenticated(false);
        }
        
        setIsLoading(false);
    };

    /**
     * Logs in to the server with the given credentials.
     */
    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await action.Login(credentials);
            console.log("Login response:", response.Success);
            
            if (response.Success) {
                const data = response.Data as AuthResponse;
                const decoded = jwtDecode<GetUserDto>(data.token);
                
                setUser(decoded);
                persistentAuthentication(true);
                setIsAuthenticated(true);
                
                console.log("Login successful");
            } else {
                persistentAuthentication(false);
                setIsAuthenticated(false);
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            persistentAuthentication(false);
            setIsAuthenticated(false);
            throw error;
        }
    };

    /**
     * Logs out from the server and updates the authentication state.
     */
    const logout = async () => {
        try {
            const response = await action.Logout();
            if (!response.Success) {
                console.warn("Logout API call failed, but continuing with local logout");
            }
        } catch (error) {
            console.error("Logout API error:", error);
            // Continuer avec le logout local même si l'API échoue
        } finally {
            // Toujours nettoyer l'état local
            removeAuth();
            setUser(null);
            setIsAuthenticated(false);
            console.log("Logout completed");
        }
    };

    /**
     * Checks the authentication state of the server
     */
    const checkAuth = async () => {
        try {
            const response = await action.Checkauth();
            
            if (response.Success) {
                console.log("Auth check successful");
                setIsAuthenticated(true);
                persistentAuthentication(true);
                return true;
            } else {
                console.log("Auth check failed - not authenticated");
                await logout();
                return false;
            }
        } catch (error) {
            console.error("Auth check error:", error);
            await logout();
            return false;
        }
    };

    // Initialisation au montage du composant
    useEffect(() => {
        initializeAuth();
    }, []);

    // Configuration axios
    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    // Vérification périodique de l'authentification (toutes les 5 minutes)
    useEffect(() => {
        if (!isAuthenticated) return;

        const interval = setInterval(() => {
            console.log("Periodic auth check");
            checkAuth();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    // Intercepteur axios pour les erreurs 401
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                if (error.response?.status === 401) {
                    console.log("401 intercepted - logging out");
                    await logout();
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    const persistentAuthentication = (valueToStore: boolean) => {
        localStorage.setItem("isAuthenticated", valueToStore.toString());
        console.log("Persistent auth set to:", valueToStore);
    };

    const removeAuth = () => {
        localStorage.removeItem("isAuthenticated");
        console.log("Auth removed from localStorage");
    };

    const value = {
        isAuthenticated,
        login,
        logout,
        user,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to access the authentication context.
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};