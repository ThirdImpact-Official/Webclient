import { FC, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Alert,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { UpdateOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/updateOrganisationDto";
import { UnitofAction } from "@/actions/UnitofAction";

interface FormProps {
  data: UpdateOrganisationDto;
  handleCallBackResponse(done: boolean): void;
}

const UpdateOrganisationForm: FC<FormProps> = ({ data, handleCallBackResponse }) => {
  const [organisation, setOrganisation] = useState<UpdateOrganisationDto>(data);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const action = new UnitofAction();

  const handleFieldChange = (key: keyof UpdateOrganisationDto, value: string) => {
    setOrganisation((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("orgId", organisation.orgId.toString());
      formData.append("name", organisation.name);
      formData.append("description", organisation.description);
      formData.append("email", organisation.email);
      formData.append("phoneNumber", organisation.phoneNumber);

      if (organisation.file) {
        formData.append("file", organisation.file);
      }

      const response = await action.organisationAction.updateOrganization(formData);

      if (response.Success) {
        setSuccess(response.Message);
        handleCallBackResponse(true);
      } else {
        setError(response.Message);
      }
    } catch {
      setError("Une erreur s'est produite lors de la mise à jour.");
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#24292f", mb: 2 }}
        >
          Modifier l’organisation
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            
            <TextField
              label="Email"
              value={organisation.email}
              type="email"
              onChange={(e) => handleFieldChange("email", e.target.value)}
              fullWidth
            />

            <TextField
              label="Numéro de téléphone"
              value={organisation.phoneNumber}
              onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
              fullWidth
            />

            <TextField
              label="Nom"
              value={organisation.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              fullWidth
            />

            <TextField
              label="Description"
              value={organisation.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              fullWidth
              multiline
              rows={4}
            />

            <Box>
              <Typography sx={{ mb: 1, color: "#57606a" }}>
                Logo (facultatif)
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setOrganisation((prev) => ({ ...prev, file }));
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#2da44e",
                textTransform: "none",
                fontWeight: 600,
                mt: 2,
                "&:hover": { backgroundColor: "#2c974b" },
              }}
            >
              Mettre à jour
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateOrganisationForm;
