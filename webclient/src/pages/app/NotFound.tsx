import { Box, Typography, Button } from "@mui/material";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(authContext.isAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f6f8fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          p: 4,
          maxWidth: "500px",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(140,149,159,0.2)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#24292f", mb: 2 }}
        >
          404
        </Typography>

        <Typography sx={{ color: "#57606a", mb: 3 }}>
          Oups… La page que vous cherchez n’existe pas ou a été déplacée.
        </Typography>

        <Box
          component="img"
          src="/404.png"
          alt="Not found illustration"
          sx={{
            width: "100%",
            maxWidth: "300px",
            mx: "auto",
            mb: 3,
            borderRadius: "6px",
          }}
        />

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#2da44e",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#2c974b",
            },
          }}
        >
          Retour au tableau de bord
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
