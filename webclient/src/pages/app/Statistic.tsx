import StatisticComponent from "./Statistic/StatisticComponent";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
/**
 * Page de la statistique.
 * 
 * Permet d'afficher les statitiques de l'application
 * 
 * @returns {React.ReactElement} le composant de la page de statistique
 */
const statistic = () => {
     const authCOntext=useAuth();
        const navigate = useNavigate();
        const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
        const [isLoaded, setIsLoaded] = useState(false);
       useEffect(()=>{
           if (!isAuth){
               navigate("/login");
           }
       },[]);
    return(
        
        <StatisticComponent />
    )
};

export default statistic; 