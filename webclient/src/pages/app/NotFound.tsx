import { Box, Divider, Typography } from "@mui/material";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const NotFound = () => {
    const authCOntext=useAuth();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
    useEffect(()=>{
        if (!isAuth){
            navigate("/login");
        }
    },[isAuth])
    return (
        <Box className="flex items-center justify-center bg-slate-400 m-10 p-20 border-collapse border border-black/10 b-rounded-4 border-r-8 shadow-sm">
            <Box className="flex flex-col items-center m-10 p-20 justify-center">
                <Divider />
                <Typography variant="h1">404</Typography>
                <img src="./404.png" />
                <Divider />
            </Box>
        </Box>
    );
}

export default NotFound;