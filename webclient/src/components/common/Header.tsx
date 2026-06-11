import React, { FC, useEffect, useState } from "react";
import { AppBar,  Button, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const color=  grey[900];

  return (
    <div className="bg-gray-800">
        <AppBar  sx={{ backgroundColor: color, py: 2,px: 10 }} position="sticky">
            <Toolbar >
                {/* Bouton menu pour mobile */}
                <IconButton edge="start"  
                            aria-label="menu" 
                            onClick={onMenuClick} 
                            sx={{ mr: 2, display: { md: "none" } }}>
                <MenuIcon />
                </IconButton>

                {/* Titre */}
                <Typography variant="h6" 
                            sx={{ flexGrow: 1 }}>
                        Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
  );
};

export default Header;

export const HeaderHome:FC<HeaderProps> = ({onMenuClick}) => {
  const color=  grey[900];
 
  return(
    <>
     <AppBar  sx={{ backgroundColor: color, py: 2,px: 10 }} position="sticky">
            <Toolbar >
                {/* Bouton menu pour mobile */}
                <IconButton edge="start"  
                            aria-label="menu" 
                            onClick={onMenuClick} 
                            sx={{ mr: 2, display: { md: "none" } }}>
                <MenuIcon />
                </IconButton>

                {/* Titre */}
                <Typography variant="h3" 
                            sx={{ flexGrow: 1 }}>
                        EscapeGame Next Door
                </Typography>
                <Box >
                  <Box sx={{ minHeight: "10vh",width:"auto" }}>
                    <HeaderButton />
                  </Box>
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
};

const HeaderButton =()=> {
  const auth= useAuth();
  const [isauthenticated,setauthenticated]=useState(false);
  useEffect(()=>{
    if(isauthenticated){
      setauthenticated(true);
    }
    else{
      setauthenticated(auth.isAuthenticated);
    }
  },[auth.isAuthenticated])
  if(!auth.isAuthenticated){
    console.log("From header : " +auth.isAuthenticated);
    console.log("FromHeader : " + isauthenticated);
  }
  if(isauthenticated)
  {
    return(
      <>
        <Box>
            <Typography>Connected </Typography>
            <Button
              onClick={auth.logout}
              variant="contained"
              className="bg-red-600" >Logout</Button>
        </Box>
      </>
    )
  }
  else{
    return(
      <>  
      <Typography> not Connected {auth.isAuthenticated}</Typography>
      <Button
            variant="contained"
            className="bg-red-600">
            <Link to="login">Login</Link>
        </Button>
      </>
    )
  }
}

