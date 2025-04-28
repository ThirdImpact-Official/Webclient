import StatisticComponent from "./Statistic/StatisticComponent";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
const statistic = () => {
     const authCOntext=useAuth();
        const navigate = useNavigate();
        const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
        useEffect(()=>{
            if (!isAuth){
                navigate("/login");
            }
        })
    return(
        <StatisticComponent />
    )
};

export default statistic; 