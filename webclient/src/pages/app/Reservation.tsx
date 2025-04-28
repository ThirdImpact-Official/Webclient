import ReservationComponent from "./Escapegame/Reservation/ReservationComponent";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const Reservation=() => {
    const authCOntext=useAuth();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
    useEffect(()=>{
        if (!isAuth){
            navigate("/login");
        }
    })
    return (
        <>
            <ReservationComponent />
        </>
    );
}

export default Reservation;