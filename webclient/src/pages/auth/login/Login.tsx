import { LoginDto } from "@/interfaces/Credentials/loginDto";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CardContent,
  Card,
  CircularProgress,
  CardActions,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { LoginCredentials } from "@/interfaces/login/loginCredentials";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginCredentials>({
    emailAdress: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  const handleOnChange = (key: keyof LoginCredentials, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await authContext.login(formData);

      if (authContext.isAuthenticated) {
        navigate("/");
      }
    } catch (error) {
      setIsError(true);
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  // Already authenticated
  if (authContext.isAuthenticated) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
          <Typography>Vous êtes déjà connecté.</Typography>
        </Card>
      </Box>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Card sx={{ maxWidth: 400, mx: "auto", p: 4 }}>
          <CircularProgress />
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f6f8fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 24px rgba(140,149,159,0.2)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "#24292f", mb: 3, textAlign: "center" }}
          >
            Connexion
          </Typography>

          {isError && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              onClose={() => setIsError(false)}
            >
              {error}
            </Alert>
          )}

          <TextField
            label="Adresse email"
            value={formData.emailAdress}
            onChange={(e) => handleOnChange("emailAdress", e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              "& fieldset": { borderColor: "#d0d7de" },
              "&:hover fieldset": { borderColor: "#b9c1c9" },
            }}
          />

          <TextField
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleOnChange("password", e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& fieldset": { borderColor: "#d0d7de" },
              "&:hover fieldset": { borderColor: "#b9c1c9" },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#2da44e",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#2c974b",
              },
            }}
            onClick={handleSubmit}
          >
            Se connecter
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
