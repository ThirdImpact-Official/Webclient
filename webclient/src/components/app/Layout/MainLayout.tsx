
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Drawer, useMediaQuery, useTheme } from "@mui/material";
import {SidebarAdmin,SideBarSuperAdmin,useRole} from "../Dashboard/SideBarNav";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import { useAuth } from "@/context/AuthContext";
import { UnitofAction } from "@/actions/UnitofAction";

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
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);
  const [rolesLoaded, setRolesLoaded] = React.useState(false);
  const action = new UnitofAction();

  const fetchRoles = async () => {
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
  };

  useEffect(() => {
    fetchRoles();
    console.log("user",isAdmin);
    
  },[user]); 
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
        {
          isSuperAdmin ? <SideBarSuperAdmin />:<SidebarAdmin />
          
        }
      </Drawer>

       <section className="c-page-wrapper">
       <Outlet />
       </section>
    </Box>
  );
};

export default DashboardLayout;
