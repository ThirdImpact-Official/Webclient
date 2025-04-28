
import UserOrganisationComponent from "./Organisation/UserOrganisation/UserOrganisationComponent";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
 const Organisation: React.FC = () => {
     const authCOntext=useAuth();
     const navigate = useNavigate();
     const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
     useEffect(()=>{
         if (!isAuth){
             navigate("/login");
         }
     })
    return(
        <div className="w-full h-full flex items-center justify-center">
             <UserOrganisationComponent/> 
        </div>);
}

export default Organisation;