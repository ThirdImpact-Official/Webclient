import { Box } from '@mui/material';
import ActivityPlaceComponent from './Escapegame/ActivityPlace/ActivityComponent';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const ActivityPlacePage=()=> {
    const authCOntext=useAuth();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
    useEffect(()=>{
        if (!isAuth){
            navigate("/login");
        }
    })
    return(
        <Box>
            <ActivityPlaceComponent />
        </Box>);
}
export default ActivityPlacePage;