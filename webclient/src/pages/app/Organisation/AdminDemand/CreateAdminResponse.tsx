import { CreateAdminDemandDto } from "@/interfaces/AdminDemand/CreateAdminDemand";
import { Box, Button, TextField, Typography, Card, CardContent } from "@mui/material";
import { useState } from "react";

const CreateAdminResponse = () => {
  const [Createresponse, setCreateresponse] = useState<CreateAdminDemandDto>({
    userid: 0,
    title: "",
    content: "",
    contactNumber: ""
  });

  const handleChange = (key: keyof CreateAdminDemandDto, value: string) => {
    setCreateresponse(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted:", Createresponse);
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        p: 2,
        width: "100%",
        maxWidth: 500,
        mx: "auto"
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#24292f", textAlign: "center" }}
        >
          Réponse Administrateur
        </Typography>

        <TextField
          label="Titre"
          value={Createresponse.title}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
          sx={{
            "& fieldset": { borderColor: "#d0d7de" },
            "&:hover fieldset": { borderColor: "#b9c1c9" }
          }}
        />

        <TextField
          label="Contenu"
          value={Createresponse.content}
          onChange={(e) => handleChange("content", e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{
            "& fieldset": { borderColor: "#d0d7de" },
            "&:hover fieldset": { borderColor: "#b9c1c9" }
          }}
        />

        <TextField
          label="Numéro de contact"
          value={Createresponse.contactNumber}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
          fullWidth
          sx={{
            "& fieldset": { borderColor: "#d0d7de" },
            "&:hover fieldset": { borderColor: "#b9c1c9" }
          }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#2da44e",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#2c974b"
            }
          }}
        >
          Envoyer
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateAdminResponse;
