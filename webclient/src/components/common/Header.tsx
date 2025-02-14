import React, { FC } from "react";
import { AppBar,  Button, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

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
                    /* Bouton de connexion */
                    <Button className="bg-red-600">
                      <Link to="login">Login</Link>
                      </Button>
                    <Button className="bg-red-600" >Logout</Button>
                  </Box>
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
};
