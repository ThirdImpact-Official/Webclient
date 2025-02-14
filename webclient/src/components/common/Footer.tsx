import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center", 
               py: 2,
               px: 10,
               bgcolor: "grey.800",
               color: "white" }}>
      <Typography variant="body2">© 2025 My Dashboard - Tous droits réservés</Typography>
    </Box>
  );
};

export default Footer;
