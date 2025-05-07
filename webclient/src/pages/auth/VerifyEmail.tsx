import { CreadentialAction } from "@/actions/CreadentialAction";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";

const VerifyEmail = () => {
  const queryParams= new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const client = new CreadentialAction();

  useEffect(() => {
    const fetchVerifyEmail = async (token: string) => {
      try {
        const response = await client.verifyEmail(token,email);
        setMessage(response.Message);
        setSuccess(response.Success);
        setLoading(false);
        console.log(token);
        if (response.Success) {
          setTimeout(() => {
            navigate("/");
          }, 5000); // Redirige après 5 secondes
        }
      } catch (e) {
        setMessage("Une erreur est survenue lors de la vérification.");
        setLoading(false);
      }
    };

    if (token) {
      fetchVerifyEmail(token);
    }
  }, [token, navigate]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, textAlign: "center", width: 400 }}>
        <Typography variant="h4" gutterBottom>
          Vérification de l'email
        
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="body1" color={success ? "green" : "error"}>
              {message}
            </Typography>
            <Typography variant="caption" display="block" mt={2}>
              Redirection dans 5 secondes...
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default VerifyEmail;
