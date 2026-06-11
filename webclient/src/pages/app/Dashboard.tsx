import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Box, Card, CardContent, Typography, Button,Stack } from '@mui/material';
import { UnitofAction } from '@/actions/UnitofAction';


interface DashboardCardProps{
  gridArea:string;
  title: string;
  description: string;
  backgroundColor:string;
  onClick?: () => void;
  buttonText: string;
  buttonOnClick?: () => void;
}

const DashBoardCard = ({
  gridArea,
  title,
  description,
  backgroundColor,
  onClick,
  buttonText,
  buttonOnClick,
}: DashboardCardProps) => (
  <Box sx={{ gridArea, height: '100%',padding:"10px" }}>
    <Card
      onClick={onClick}
      sx={{
        margin: 2,
        width: '100%',
        height: 'auto',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: onClick ? 'scale(1.02)' : 'none',
        },
      }}
    >
      <CardContent sx={{ backgroundColor, color: '#fff', height: '100%' }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        {buttonText && (
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card onClick if button is clicked
              buttonOnClick?.();
            }}
            sx={{
              mt: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  </Box>
);



/**
 * Dashboard component that renders a simple dashboard view. 
 * It displays cards in a grid layout.
 * @returns {React.ReactElement}
 */
const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const action = new UnitofAction();
  const [count,setCount ]= React.useState<number>(0);

  const fetchUnreadNotification= async ()=> {
    const response = await  action.notificationAction.GetNotificationcount();
    if(response.Success)
    {
      setCount(response.Data as number);
    }
  }
  useEffect(()=> {
    fetchUnreadNotification();
  },[]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return (
    <Stack
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        columnGap: 0,
        rowGap: 0,
        height: '100vh',
        p: 2,
      }}
    >
     <DashBoardCard
        gridArea="1 / 1 / 2 / 4"
        title="Annonces"
        description="Liste des annonces"
        backgroundColor="#e91e63"
        buttonText="Voir"
        buttonOnClick={() => navigate('/notification')}
      />
      <DashBoardCard
        gridArea="1 / 4 / 2 / 6"
        title="Forums"
        description="Liste des forums disponibles"
        backgroundColor="#9c27b0"
        buttonText="Voir"
        buttonOnClick={() => navigate('/forum')}
      />
      <DashBoardCard
        gridArea="2 / 1 / 3 / 4"
        title="Organisation"
        description="Gérer votre organisation"
        backgroundColor="#3f51b5"
        buttonText="Voir"
        buttonOnClick={() => navigate('/organisation/user')}
      />
      <DashBoardCard
        gridArea="2 / 4 / 3 / 6"
        title="Notifications"
        description={`Vous avez ${count} notifications`}
        backgroundColor="#673ab7"
        buttonText="Voir"
      
      />
      <DashBoardCard
        gridArea="3 / 1 / 6 / 3"
        title="Statistiques"
        description="Vos statistiques d'activité"
        backgroundColor="#2196f3"
        buttonText="Voir"
        buttonOnClick={() => navigate('/stats')}
      />
      <DashBoardCard
        gridArea="3 / 3 / 6 / 4"
        title="Profile"
        description="Accéder à votre profile"
        backgroundColor="#03a9f4"
        buttonText="Voir"
        buttonOnClick={() => navigate('/profile')}
      />
      <DashBoardCard
        gridArea="3 / 4 / 6 / 6"
        title="EscapeGame"
        description="Vos parties en cours"
        backgroundColor="#4caf50"
        buttonText="Voir"
        buttonOnClick={() => navigate('/escape-game')}
      />
    </Stack>
  );
};

export default Dashboard;
