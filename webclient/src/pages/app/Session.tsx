import SessionComponent from "./Escapegame/Session/SessionComponent";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const Session=()=> {
    const authCOntext=useAuth();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
    useEffect(()=>{
        if (!isAuth){
            navigate("/login");
        }
    })
    return(
        <SessionComponent/>
        
    );
}

export default Session;