import UserOrganisationComponent from "./Organisation/UserOrganisation/UserOrganisationComponent";
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Organisation: React.FC = () => {
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authContext.isAuthenticated) {
            navigate("/login");
        }
    }, []); // Proper dependencies

  

    return (
        <div className="w-full h-full flex items-center justify-center">
            <UserOrganisationComponent /> 
        </div>
    );
}

export default Organisation;