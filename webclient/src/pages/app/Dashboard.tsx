import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
/**
 * Dashboard component that renders a simple dashboard view.
 * It displays a paragraph with the text "Dashboard".
 * @returns {React.ReactElement} A div containing the dashboard content.
 */

const Dashboard: React.FC = ()=> {
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
            <p>
                Dashboard
            </p>
        </div>);
}

export default Dashboard;