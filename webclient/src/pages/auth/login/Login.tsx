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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CreadentialAction } from "@/actions/CreadentialAction";
import React, { useEffect, useState } from "react";
import { LoginCredentials } from "@/interfaces/login/loginCredentials";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Login page.
 */
const Login: React.FC = () => {
  // -------------------- State --------------------
  const [formData, setFormData] = useState<LoginCredentials>({
    emailAdress: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const authContext = useAuth();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    authContext.isAuthenticated
  );

  // -------------------- Handlers --------------------
  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  const handleOnChange = (key: keyof LoginCredentials, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await authContext.login(formData);

      if (authContext.isAuthenticated) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authContext.isAuthenticated) {
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setIsAuthenticated(false);
    }
  }, [authContext.isAuthenticated, navigate]);

  // -------------------- Component --------------------
  if (isAuthenticated) {
    return (
      <Card>
        <CardContent>
          <Typography>Auth already complete</Typography>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Box className="m-2 p-2 text-center">
      <form className="items-center justify-center">
        <Box
          className="space-y-4 my-20 py-20"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 8,
            p: 4,
            width: { xs: "90%", sm: 400 },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5">Connect to The Application</Typography>

          <Box>
            <Typography>Email</Typography>
            <TextField
              name="email"
              label="Email"
              value={formData.emailAdress}
              onChange={(e) => handleOnChange("emailAdress", e.target.value)}
              fullWidth
            />
          </Box>

          <Box>
            <Typography>Password</Typography>
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleOnChange("password", e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            variant="contained"
            className="bg-black"
            onClick={handleSubmit}
          >
            Connecter
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
