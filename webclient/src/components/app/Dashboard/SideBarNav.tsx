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
import {Comment, BarChart, Dashboard, ExitToApp, Home, HomeWork, BookOnline, NotificationAddSharp, PermDeviceInformation } from '@mui/icons-material';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserAction } from '@/actions/UserAction';
import { GetUserDto } from '@/interfaces/User/GetUserDto';
import { useAuth } from '@/context/AuthContext';
import { UnitofAction } from '@/actions/UnitofAction';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';

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

// Main Sidebar Component
interface SidebarProps {
  nom: string;
  link: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [organisation, setOrganisation] = React.useState<GetOrganisationDto | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const action = new UnitofAction();
  const navigate = useNavigate();
  const [isAdmin, setAdmin] = React.useState<boolean>(false);
  const [isSuperAdmin, setSuperAdmin] = React.useState<boolean>(false);
  const [rolesLoaded, setRolesLoaded] = React.useState<boolean>(false);

  const handleRedirection = (arg: string) => {
    navigate(arg);
  };

  const fetchIsAdmin = async () => {
    if (user) {
      try {
        const response = await action.CredentialAction.IsAdmin();
        if (response.Success) {
          setAdmin(response.Data);
        }
      } catch (error) {
        console.error('Error fetching admin status:', error);
      }
    }
  };

  const fetchIsSuperAdmin = async () => {
    if (user) {
      try {
        const response = await action.CredentialAction.IsSuperAdmin();
        if (response.Success) {
          setSuperAdmin(response.Data);
        }
      } catch (error) {
        console.error('Error fetching super admin status:', error);
      }
    }
  };

  const fetchDataOrganisation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await action.organisationAction.GetOrganisationByIdForCurrentUser();
      if (response.Success) {
        const statData = response.Data as GetOrganisationDto[];
        console.log(statData);
        setOrganisation(statData[0] || null);
      } else {
        setError('Failed to load organisation statistics.');
      }
    } catch (err) {
      setError('An error occurred while loading organisation statistics.');
      console.error('Organisation fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load user roles and organization data
  useEffect(() => {
  
    const loadData = async () => {
      if ( !rolesLoaded) {
        await Promise.all([
          fetchIsSuperAdmin(),
          fetchIsAdmin(),
          fetchDataOrganisation()
        ]);
         getSidebarElements();
        setRolesLoaded(true);
      }
    };

    loadData();
  }, [user, rolesLoaded,isSuperAdmin]); // Only depend on user and rolesLoaded

  // Super Admin sidebar elements
  const getSuperAdminSidebarElements = (): SidebarProps[] => [
    {
      nom: "Admin Panel",
      link: "/admin",
      icon: <Home />,
    },
    {
      nom: "Profils",
      link: "/profile",
      icon: <PermDeviceInformation />,
    },
    {
      nom: "Dashboard",
      link: "/",
      icon: <Dashboard />,
    },
    {
      nom: "Notifications",
      link: "/notification",
      icon: <NotificationAddSharp />,
    },
    {
      nom: "Organisation",
      link: "/organisation",
      icon: <HomeWork />,
    },
    {
      nom: "Reservation",
      link: "/escapegame/1",
      icon: <BookOnline />,
    },
    {
      nom: "F.A.Q.",
      link: "/Faq",
      icon: <Comment />,
    },
    {
      nom: "Statistic",
      link: "/statistic",
      icon: <BarChart />,
    },
    {
      nom: "Déconnexion",
      link: "/logout",
      icon: <ExitToApp />,
    }
  ];

  // Admin sidebar elements
  const getAdminSidebarElements = (): SidebarProps[] => [
    {
      nom: "Profils",
      link: "/profile",
      icon: <PermDeviceInformation />,
    },
    {
      nom: "Dashboard",
      link: "/",
      icon: <Dashboard />,
    },
    {
      nom: "Notifications",
      link: "/notification",
      icon: <NotificationAddSharp />,
    },
    {
      nom: "Organisation",
      link: organisation ? `/organisation/user/${organisation.orgId}` : "/organisation",
      icon: <HomeWork />,
    },
    {
      nom: "Reservation",
      link: "/escapegame/1",
      icon: <BookOnline />,
    },
    {
      nom: "F.A.Q.",
      link: "/Faq",
      icon: <Comment />,
    },
    {
      nom: "Statistic",
      link: "/statistic",
      icon: <BarChart />,
    },
    {
      nom: "Déconnexion",
      link: "/logout",
      icon: <ExitToApp />,
    }
  ];

  // Regular user sidebar elements
  const getUserSidebarElements = (): SidebarProps[] => [
    {
      nom: "Profils",
      link: "/profile",
      icon: <PermDeviceInformation />,
    },
    {
      nom: "Dashboard",
      link: "/",
      icon: <Dashboard />,
    },
    {
      nom: "Notifications",
      link: "/notification",
      icon: <NotificationAddSharp />,
    },
    {
      nom: "Reservation",
      link: "/escapegame/1",
      icon: <BookOnline />,
    },
    {
      nom: "F.A.Q.",
      link: "/Faq",
      icon: <Comment />,
    },
    {
      nom: "Déconnexion",
      link: "/logout",
      icon: <ExitToApp />,
    }
  ];

  // Get appropriate sidebar elements based on user role
  const getSidebarElements = (): SidebarProps[] => {
    
    if (isSuperAdmin) {
      return getSuperAdminSidebarElements();
    } else if (isAdmin && !isSuperAdmin) {
      return getAdminSidebarElements();
    } else {
      return getUserSidebarElements();
    }
  };

  if (loading || !rolesLoaded) {
    return (
      <Box sx={{ width: 240, bgcolor: "background.paper", height: "100%" }}>
        {/* Logo */}
        <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          My Dashboard
        </Box>
        <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          <AccountUser />
        </Box>
        <Divider />

        {/* Loading Menu */}
        <List className="w-full h-fit flex flex-col gap-4 items-center justify-start">
          <ListItem key="Chargement" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CircularProgress size={24} />
              </ListItemIcon>
              <ListItemText primary="Chargement..." />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: 240, bgcolor: "background.paper", height: "100%" }}>
        <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          My Dashboard
        </Box>
        <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          <AccountUser />
        </Box>
        <Divider />
        <Box sx={{ p: 2, textAlign: "center", color: "error.main" }}>
          <Typography variant="body2">{error}</Typography>
        </Box>
      </Box>
    );
  }

  const sidebarElements = getSidebarElements();

  return (
    <Box sx={{ width: 240, bgcolor: "background.paper", height: "100%" }}>
      {/* Logo */}
      <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
        My Dashboard
      </Box>
      <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
        <AccountUser />
      </Box>
      <Divider />

      {/* Menu */}
      <List className="w-full h-fit flex flex-col gap-4 items-center justify-start">
        {sidebarElements.map((item: SidebarProps) => (
          <ListItem key={item.nom} disablePadding>
            <ListItemButton onClick={() => handleRedirection(item.link)}>
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