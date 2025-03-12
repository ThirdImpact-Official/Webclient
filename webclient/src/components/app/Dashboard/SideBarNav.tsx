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
import {Comment, BarChart, Dashboard, ExitToApp, Home, HomeWork, BookOnline } from '@mui/icons-material';
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
interface sidebarprops
{
  nom:string;
  link:string;
  icon: React.ReactNode;

}

const Sidebar: React.FC = () => {

  const navigate=useNavigate();
  const handleredirection= (arg: string) => {
    navigate(arg);
  }
  const sidebarElement =[
    {
      nom:"Admin",
      link:"/organisation",
      icon:(<Home/>),
    },
    {
      nom:"Dashboard",
      link:"/",
      icon:(<Dashboard/>),
    },
    {
      nom:"organisation",
      link:"/organisation/user/1",
      icon:(<HomeWork/>),
    },
    {
      nom:"Reservation",
      link:"/escapegame/1",
      icon:(<BookOnline/>),
    },
    {
      nom:"Faq",
      link:"/Faq",
      icon:(  <Comment />),
    },
    {
      nom:"Statistic",
      link:"/stat",
      icon:( <BarChart />),
    },
    {
      nom:"Déconnexion",
      link:"/",
      icon:( <ExitToApp/>),
    }
  ]
  return (
    <Box sx={{ width: 240, bgcolor: "background.paper", height: "100%" }}>
      {/* Logo */}
      <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>My Dashboard</Box>
      <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }} > <AccountUser /></Box>
      <Divider />

      {/* Menu */}
  
        
      <List className="w-full h-fit flex flex-col gap-4 items-center justify-start">
        {sidebarElement.map((item: sidebarprops) =>(
            <ListItem disablePadding>
            <ListItemButton onClick={() => handleredirection(item.link)}>
                <ListItemIcon>
                {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.nom} />
              </ListItemButton>
            </ListItem>
        ))}
     
      </List>
    </Box>
  );
};

export default Sidebar;
