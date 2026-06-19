import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { AddAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/addAnnonceDto";
import { GetOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/GetOrganisationDto";
import { UnitofAction } from "@/actions/UnitofAction";

interface CreateAnnonceProps {
  onSubmit: (data: AddAnnonceDto) => void;
}

const CreateAnnonce: FC<CreateAnnonceProps> = ({ onSubmit }) => {
  const action = new UnitofAction();

  const [announcement, setAnnouncement] = useState<AddAnnonceDto>({
    name: "",
    description: "",
    formFile: null,
    organisationId: 0,
  });

  const [organisation, setOrganisation] = useState<GetOrganisationDto | null>(
    null
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(announcement);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnouncement((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAnnouncement((prev) => ({
      ...prev,
      formFile: file,
    }));
  };

  const fetchOrganisationId = async () => {
    try {
      const response =
        await action.organisationAction.GetOrganisationByIdForCurrentUser();

      if (response?.Success && Array.isArray(response.Data) && response.Data.length > 0) {
        const org = response.Data[0];
        setOrganisation(org);

        setAnnouncement((prev) => ({
          ...prev,
          organisationId: org.orgId ?? 0,
        }));
      }
    } catch (err) {
      console.warn("Organisation fetch failed (Brave may have blocked it):", err);
    }
  };

  useEffect(() => {
    fetchOrganisationId();
  }, []);

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
          Create an Announcement
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            
            <Box>
              <Typography sx={{ mb: 0.5, color: "#57606a" }}>Name</Typography>
              <TextField
                fullWidth
                name="name"
                value={announcement.name}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <Typography sx={{ mb: 0.5, color: "#57606a" }}>
                Description
              </Typography>
              <TextField
                fullWidth
                name="description"
                value={announcement.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Box>

            <Box>
              <Typography sx={{ mb: 0.5, color: "#57606a" }}>Image</Typography>
              <TextField
                type="file"
                onChange={handleFileChange}
                InputProps={{
                  inputProps: { accept: "image/*" },
                }}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#2da44e",
                textTransform: "none",
                fontWeight: 600,
                mt: 1,
                "&:hover": { backgroundColor: "#2c974b" },
              }}
            >
              Send
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAnnonce;
