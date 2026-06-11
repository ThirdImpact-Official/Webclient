import NotificationComponent from './Notification/NotificationComponent';
import { Box } from "@mui/material";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const Notification = () => {
    const authCOntext=useAuth();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
    useEffect(()=>{
        if (!isAuth){
            navigate("/login");
        }
    })
    return (
        <Box  className="flex items-center justify-center">
            <NotificationComponent />
        </Box>
    )
}
export default Notification;