import { Box } from "@mui/material";
import FaqComponent from "./FAQ/FaqComponent";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const FAQ = () => {
        const authCOntext=useAuth();
        const navigate = useNavigate();
        const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
        useEffect(()=>{
            if (!isAuth){
                navigate("/login");
            }
        })
    return (
        <Box className="flex items-center justify-center">
            <FaqComponent />
        </Box>
    );
}

export default FAQ;