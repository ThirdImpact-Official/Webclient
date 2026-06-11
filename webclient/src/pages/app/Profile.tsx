import ProfileComponent from '@/pages/app/Profile/ProfileComponent';
import { Box } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const Profile = () => {
    const authCOntext=useAuth();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
    useEffect(()=>{
        if (!isAuth){
            navigate("/login");
        }
    })
    return (
        <Box className="text-center">

            <ProfileComponent />
        </Box>
    ) 
    
}
export default Profile;