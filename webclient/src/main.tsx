import { createRoot } from 'react-dom/client'
import './index.css'
import App from "@/pages/App"
import { BrowserRouter } from 'react-router-dom'
import { AuthContext, AuthProvider, useAuth } from './context/AuthContext'
import { Typography } from '@mui/material'


function authConstant() {
    const auth  = useAuth();
    return auth;
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)
