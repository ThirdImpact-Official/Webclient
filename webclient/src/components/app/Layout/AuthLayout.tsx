import { Box } from "@mui/material";
import Header from "../../common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";

const AuthLayout = () => {
  const handleDrawerToggle = () => {
    console.warn("Drawer toggle not implemented");
  };

  return (
    <Box className="w-full text-center">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <Header onMenuClick={handleDrawerToggle} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            backgroundColor: "#f4f4f4",
          }}
        >
          <Box
            sx={{
              bgcolor: "black",
              color: "white",
              p: 2,
              borderRight: { md: "1px solid #ccc" },
            }}
          >
        
          </Box>

          <Box sx={{ p: 2 }}>
            <Outlet />
          </Box>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default AuthLayout;
