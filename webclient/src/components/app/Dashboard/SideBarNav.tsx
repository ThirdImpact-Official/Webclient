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
  ListItemText,
  CircularProgress
} from '@mui/material';
import {
  Dashboard,
  Person,
  Contacts,

  Groups,
  Lock,
  BarChart,
  Help,
  ExitToApp,
  CalendarToday,
  VideogameAsset,
  EventSeat,
  DashboardCustomize
} from '@mui/icons-material';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserAction } from '@/actions/UserAction';
import { GetUserDto } from '@/interfaces/User/GetUserDto';
import { useAuth } from '@/context/AuthContext';
import { UnitofAction } from '@/actions/UnitofAction';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import { GroupIcon } from 'lucide-react';
import { Notifications } from '@mui/icons-material';
import { BookOnlineRounded } from '@mui/icons-material';
import { useCallback } from 'react';

// Account User Component
const AccountUser = () => {
  const [user, setUser] = React.useState<GetUserDto | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const action = new UserAction();
  
  const fetchUser = async () => {
    if (isLoading) return; // Prevent multiple simultaneous calls
    
    setIsLoading(true);
    try {
      const response = await action.GetCurrentUser();
      if (response.Success) {
        setUser(response.Data as GetUserDto || null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user === null && !isLoading) {
      fetchUser();
    }
  }, []); // Empty dependency array to prevent infinite loop

  if (isLoading) {
    return (
      <Box className="flex items-center p-6 gap-3">
        <CircularProgress size={24} />
        <Typography variant="body2">Chargement...</Typography>
      </Box>
    );
  }

  if (user !== null) {
    const userPicture = user?.picture == null ? user?.firstName?.charAt(0) : user?.picture;
    
    return (
      <Box className="flex items-center p-6 gap-3">
        <Avatar
          alt={user.firstName || 'User'}
          src={typeof userPicture === 'string' && userPicture.length > 1 ? userPicture : undefined}
          className="h-9 w-9"
        >
          {typeof userPicture === 'string' && userPicture.length === 1 ? userPicture : '?'}
        </Avatar>
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

  return (
    <Box className="flex items-center p-6 gap-3">
      <Typography variant="body2" color="text.secondary">
        Aucun utilisateur trouvé
      </Typography>
    </Box>
  );
};
export const useRole = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);
  const [rolesLoaded, setRolesLoaded] = React.useState(false);
  const action = new UnitofAction();

  const fetchRoles = (async () => {
    if (!user) return;
    
    try {
      const [adminResponse, superAdminResponse] = await Promise.all([
        action.CredentialAction.IsAdmin(),
        action.CredentialAction.IsSuperAdmin()
      ]);
      console.log(adminResponse);
      console.log(superAdminResponse);
      if (adminResponse.Success) setIsAdmin(adminResponse.Data);
      if (superAdminResponse.Success) setIsSuperAdmin(superAdminResponse.Data);

    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setRolesLoaded(true);
    }
  });

  useEffect(() => {
    if (user && !rolesLoaded) {
      fetchRoles();
    }
  }, [user, rolesLoaded, fetchRoles]);

  return { isAdmin, isSuperAdmin, rolesLoaded };
};

export const SidebarAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useRole();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ 
      width: 240,
      height: '100vh',
      bgcolor: 'background.paper',
      position: 'fixed',
      left: 0,
      top: 0,
      overflowY: 'auto',
      borderRight: '1px solid #ccc'
    }}>
      <Box sx={{p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20  }}>
        <h3>Menu Principal</h3>
        <AccountUser />
      </Box>
      <Divider />
      
      <List>
        {/* Section Principale */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/')}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/contact')}>
            <ListItemIcon><Contacts /></ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/notification')}>
            <ListItemIcon><Notifications /></ListItemIcon>
            <ListItemText primary="Annonce" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/profile')}>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItemButton>
        </ListItem>

        {/* Section Organisation */}
        {/* Section Organisation */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/organisation/user')}>
            <ListItemIcon><Groups /></ListItemIcon>
            <ListItemText primary="Organisation" />
          </ListItemButton>
        </ListItem>

        {/* Section Escape Game */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/escapegame')}>
            <ListItemIcon><VideogameAsset /></ListItemIcon>
            <ListItemText primary="Escape Games" />
          </ListItemButton>
        </ListItem>

      

        {/* Section Autres */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/faq')}>
            <ListItemIcon><Help /></ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/statistic')}>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText primary="Statistiques" />
          </ListItemButton>
        </ListItem>


        {/* Déconnexion */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/logout')}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export  const SideBarSuperAdmin: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
   return (
    <Box sx={{ 
      width: 240,
      height: '100vh',
      bgcolor: 'background.paper',
      position: 'fixed',
      left: 0,
      top: 0,
      overflowY: 'auto',
      borderRight: '1px solid #ccc'
    }}>
      <Box sx={{p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20  }}>
        <h3>Menu Principal</h3>
        <AccountUser />
      </Box>
      <Divider />
      
      <List>
        {/* Section Principale */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/')}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('/organisation')}>
              <ListItemIcon><DashboardCustomize/></ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
        
      
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/signalement')}>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary="Signalement" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/contact')}>
            <ListItemIcon><Contacts /></ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/notification')}>
            <ListItemIcon><Notifications /></ListItemIcon>
            <ListItemText primary="Annonce" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/profile')}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItemButton>
        </ListItem>

        {/* Section Organisation */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/organisation/user')}>
            <ListItemIcon><Groups /></ListItemIcon>
            <ListItemText primary="Organisation" />
          </ListItemButton>
        </ListItem>

        {/* Section Escape Game */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/escapegame')}>
            <ListItemIcon><VideogameAsset /></ListItemIcon>
            <ListItemText primary="Escape Games" />
          </ListItemButton>
        </ListItem>

      

        {/* Section Autres */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/faq')}>
            <ListItemIcon><Help /></ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/statistic')}>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText primary="Statistiques" />
          </ListItemButton>
        </ListItem>


        {/* Déconnexion */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/logout')}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>);
}


