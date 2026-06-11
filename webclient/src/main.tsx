import { createRoot } from 'react-dom/client'
import './index.css'
import App from "@/pages/App"
import { BrowserRouter } from 'react-router-dom'
import { AuthContext, AuthProvider, useAuth } from './context/AuthContext'
import { Typography } from '@mui/material'
import { ToastedContext, ToastedProvider } from './context/ContextHook/ToastedContext'
import ModalComponent from './components/factory/GenericComponent/Modal'
import { ModalProvider } from './context/ContextHook/ModalContext'
import { LoadingProvider } from './context/ContextHook/LoadingContext'


function authConstant() {
    const auth  = useAuth();
    return auth;
}

createRoot(document.getElementById('root')!).render(
    //BrowserRouter
    //ToastedProvider for notification
    //authProvider for authentication
    <BrowserRouter>
        <ModalProvider>
            <LoadingProvider>
                <ToastedProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </ToastedProvider>
            </LoadingProvider>
        </ModalProvider>
    </BrowserRouter>
)
