import { createRoot } from 'react-dom/client'
import './index.css'
import App from "@/pages/App"
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        // mettre le  context d'autentification ici
        //
            <App />
    </BrowserRouter>
)
