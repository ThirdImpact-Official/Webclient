
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Drawer, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../Dashboard/SideBarNav";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import "./layout.css"

// Largeur de la sidebar sur desktop

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
 
          flexShrink: 0,
          "& .MuiDrawer-paper": {
          
            boxSizing: "border-box",
          },
          display: isMobile && !mobileOpen ? "none" : "block",
        }}
      >
        <Sidebar />
      </Drawer>

       <section className="c-page-wrapper">
       <Outlet />
       </section>
    </Box>
  );
};

export default DashboardLayout;
