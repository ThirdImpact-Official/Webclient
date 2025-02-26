import React from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  Divider, 
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Dashboard, ExitToApp } from '@mui/icons-material';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



// Account User Component
const AccountUser = () => {
  return (
    <Box className="flex items-center p-6 gap-3">
      <Avatar
        alt="User Avatar"
        src="/api/placeholder/36/36"
        className="h-9 w-9"
      />
      <Box className="flex flex-col flex-grow">
        <Typography 
          variant="body2" 
          className="font-medium leading-tight"
        >
          John Doe
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary"
        >
          johnDoe@gmail.com
        </Typography>
      </Box>
    </Box>
  );
};


// Main Sidebar Component

const Sidebar: React.FC = () => {

  const navigate=useNavigate();
  const handleredirection= (arg: string) => {
    navigate(arg);
  }

  return (
    <Box sx={{ width: 240, bgcolor: "background.paper", height: "100%" }}>
      {/* Logo */}
      <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>My Dashboard</Box>
      <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }} > <AccountUser /></Box>
      <Divider />

      {/* Menu */}
      <List>
        <ListItem disablePadding>

        <ListItem disablePadding>
        <ListItemButton onClick={() => handleredirection("/organisation")}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </ListItem>
        </ListItem>
          <ListItemButton onClick={() => handleredirection("/")}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItemButton>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleredirection("/organisation/user/1")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText  primary="Organisation" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleredirection("/escapegame/1")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="EscapeGame" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleredirection("/reservation")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Reservation" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleredirection("/session")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText  primary="Session" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleredirection("/statistic")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Statisitic" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding >
        <ListItemButton onClick={() => handleredirection("/parameters")} >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText  primary="Parametres" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
