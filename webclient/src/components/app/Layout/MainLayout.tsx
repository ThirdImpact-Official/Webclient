
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Drawer, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../Dashboard/SideBarNav";
import Footer from "../../common/Footer";
import Header from "../../common/Header";


// Largeur de la sidebar sur desktop
const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // Ouvrir / fermer le menu latéral sur mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar (Drawer sur mobile) */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: isMobile && !mobileOpen ? "none" : "block",
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Contenu principal */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: "100vh",width:"auto" }}>
        {/* Header */}
        <Header onMenuClick={handleDrawerToggle} />

        {/* Contenu dynamique */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f4f4",width:"auto" }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
