import React, { useEffect } from 'react';
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
import {Comment, BarChart, Dashboard, ExitToApp, Home, HomeWork, BookOnline, NotificationAddSharp, PermDeviceInformation } from '@mui/icons-material';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserAction } from '@/actions/UserAction';
import { GetUserDto } from '@/interfaces/User/GetUserDto';


// Account User Component
const AccountUser = () => {
  const [user,setUser]=React.useState<GetUserDto | null>(null);
  const action=new UserAction();
  //--------------
  const fetchUser = async () => {
    try {
      const response = await  action.GetCurrentUser();
      if(response.Success) {
        setUser(response.Data as GetUserDto || null);
      }

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  const userpicture=user?.picture==null ? user?.firstName.charAt(0) : user?.picture
  useEffect(()=>{
    if(user==null)
    {
      fetchUser();
    }
  },[user]);

  if(user != null){

    return  (
      <Box className="flex items-center p-6 gap-3">
        <Avatar
          alt={userpicture}
          src="/api/placeholder/36/36"
          className="h-9 w-9"
        />
        <Box className="flex flex-col flex-grow">
          <Typography 
            variant="body2" 
            className="font-medium leading-tight"
          >
            {user.username}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
          >
             {user.email}
          </Typography>
        </Box>
      </Box>
    );
  }
  else{
    return(
      <Box>
        <Typography variant="body2" color="">
          Chargement
        </Typography>
      </Box>
    )
  }
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
      nom:"Profils",
      link:"/profile",
      icon:(<PermDeviceInformation/>),
    },
    {
      nom:"Dashboard",
      link:"/",
      icon:(<Dashboard/>),
    },
    {
      nom:"Notifications",
      link:"/notification",
      icon:(<NotificationAddSharp/>),
    },
    {
      nom:"Organisation",
      link:"/organisation/user/1",
      icon:(<HomeWork/>),
    },
    {
      nom:"Reservation",
      link:"/escapegame/1",
      icon:(<BookOnline/>),
    },
    {
      nom:"F.A.Q.",
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
            <ListItem key={item.nom} disablePadding>
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
