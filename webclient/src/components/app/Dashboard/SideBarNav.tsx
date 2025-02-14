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
  return (
    <Box sx={{ width: 240, bgcolor: "background.paper", height: "100%" }}>
      {/* Logo */}
      <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>My Dashboard</Box>
      <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }} > <AccountUser /></Box>
      <Divider />

      {/* Menu */}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Paramètres" />
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
