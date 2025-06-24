import React,{useEffect,useState} from 'react';
import { useAuth } from '@/context/AuthContext';
import {Box, CardContent,Card,CardActions,Button, Typography,CircularProgress} from '@mui/material'
import ModalComponent from '@/components/factory/GenericComponent/Modal';
/***
 * Logout component
 */
export const Logout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const auth = useAuth();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await auth.logout();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if(isLoading)
  {
    return(
         <React.Fragment>
      <Box className="text-center">
        <p>Vous &ecirc;tes sur le point de vous d&eacute;connecter</p>
      </Box>
      <Box className="text-center justify-center items-center flex flex-col">

        <Card>
            <CardContent>
             <CircularProgress />
            </CardContent>
        </Card>
      </Box>
    </React.Fragment>
    )
  }
  return (
    <React.Fragment>
       <Box className="text-center mb-10 " />
      <Box className="text-center">
        <p>Vous &ecirc;tes sur le point de vous d&eacute;connecter</p>
      </Box>
       <Box className="text-center justify-center items-center flex flex-col">

      <ModalComponent
        Title="Deconnection"
        ButtonTitle="D&eacute;connection"
        Description=""
        ButtonColor="error"
        
      >
        <Card>
          <CardContent>
           <Typography>
             <p>&Ecirc;tes-vous s&ucirc;r de vouloir vous d&eacute;connecter ?</p>
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleLogout} disabled={isLoading}>Déconnection connection</Button>
          </CardActions>
        </Card>
      </ModalComponent>
      </Box>
    </React.Fragment>
  );
};
export default Logout;