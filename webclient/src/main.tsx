import { createRoot } from 'react-dom/client'
import './index.css'
import App from "@/pages/App"
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/factory/Footer'
import Header from './components/factory/Header'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Header/>
            <App />
        <Footer />
    </BrowserRouter>
)
