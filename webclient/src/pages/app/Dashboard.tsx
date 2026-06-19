import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Box, Card, CardContent, Typography, Button,Stack } from '@mui/material';
import { UnitofAction } from '@/actions/UnitofAction';
import { Campaign, Forum, Business, Notifications, BarChart, Person, SportsEsports } from '@mui/icons-material';

interface DashboardCardProps {
  
  title: string;
  description: string;
  backgroundColor: string;
  onClick?: () => void;
  buttonText: string;
  buttonOnClick?: () => void;
  icon: React.ReactNode; // <-- NOUVEAU
}

const DashBoardCard = ({
  title,
  description,
  backgroundColor,
  onClick,
  buttonText,
  buttonOnClick,
  icon,
}: DashboardCardProps) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: onClick ? "pointer" : "default",
      border: "1px solid #d0d7de",
      borderRadius: "6px",
      backgroundColor: "#f6f8fa",
      transition: "background-color 0.15s ease, transform 0.15s ease",
      "&:hover": {
        backgroundColor: "#f3f4f6",
        transform: onClick ? "translateY(-2px)" : "none",
      },
    }}
  >
    <CardContent sx={{ color: "#24292f" }}>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: "#57606a" }}>
        {description}
      </Typography>

      {buttonText && (
        <Button
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            buttonOnClick?.();
          }}
          sx={{
            mt: 2,
            borderColor: "#d0d7de",
            color: "#24292f",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              borderColor: "#b9c1c9",
            },
          }}
        >
          {buttonText}
        </Button>
      )}
    </CardContent>
  </Card>
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
  <Box
    sx={{
      display: "grid",
      gap: 2,
      p: 2,
      backgroundColor: "#ffffff",

      // Responsive GitHub-style grid
      gridTemplateColumns: {
        xs: "1fr",           // mobile
        sm: "repeat(2, 1fr)", // tablette
        md: "repeat(3, 1fr)", // laptop
        lg: "repeat(4, 1fr)", // desktop
        xl: "repeat(5, 1fr)", // grand écran (ton layout original)
      },
    }}
  >
    <DashBoardCard
      title="Annonces"
      description="Liste des annonces"
      backgroundColor="#e91e63"
      buttonText="Voir"
      buttonOnClick={() => navigate('/notification')}
      icon={<Campaign fontSize="large" />}
    />

    <DashBoardCard
      title="Forums"
      description="Liste des forums disponibles"
      backgroundColor="#9c27b0"
      buttonText="Voir"
      buttonOnClick={() => navigate('/forum')}
      icon={<Forum fontSize="large" />}
    />

    <DashBoardCard
      title="Organisation"
      description="Gérer votre organisation"
      backgroundColor="#3f51b5"
      buttonText="Voir"
      buttonOnClick={() => navigate('/organisation/user')}
      icon={<Business fontSize="large" />}
    />

    <DashBoardCard
      title="Notifications"
      description={`Vous avez ${count} notifications`}
      backgroundColor="#673ab7"
      buttonText="Voir"
      icon={<Notifications fontSize="large" />}
    />

    <DashBoardCard
      title="Statistiques"
      description="Vos statistiques d'activité"
      backgroundColor="#2196f3"
      buttonText="Voir"
      buttonOnClick={() => navigate('/stats')}
      icon={<BarChart fontSize="large" />}
    />

    <DashBoardCard
      title="Profile"
      description="Accéder à votre profile"
      backgroundColor="#03a9f4"
      buttonText="Voir"
      buttonOnClick={() => navigate('/profile')}
      icon={<Person fontSize="large" />}
    />

    <DashBoardCard
      title="EscapeGame"
      description="Vos parties en cours"
      backgroundColor="#4caf50"
      buttonText="Voir"
      buttonOnClick={() => navigate('/escape-game')}
      icon={<SportsEsports fontSize="large" />}
    />
  </Box>
);

};

export default Dashboard;
