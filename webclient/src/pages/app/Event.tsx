import { Box } from '@mui/material';
import EventComponentTab from './Escapegame/Event/EventComponent';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const Event=()=> {
    const authCOntext=useAuth();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
    useEffect(()=>{
        if (!isAuth){
            navigate("/login");
        }
    })
    return (
        <Box>
        
            <Box>
                <EventComponentTab></EventComponentTab>
            </Box>
        </Box>
    );
}

export default Event;