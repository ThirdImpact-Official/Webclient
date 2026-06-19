import { UpdateAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/updateAnnonceDto";
import { GetAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import { FC, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from "@mui/material";

interface UpdateAnnonceProps {
  data: GetAnnonceDto;
  onSubmit: (data: UpdateAnnonceDto) => void;
}

const UpdateAnnonce: FC<UpdateAnnonceProps> = ({ data, onSubmit }) => {
  const [updateData, setUpdateData] = useState<UpdateAnnonceDto>({
    id: data.id,
    name: data.name,
    description: data.description,
  });

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(updateData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
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
          Update Announcement
        </Typography>

        <form onSubmit={handleUpdate}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            
            <Box>
              <Typography sx={{ mb: 0.5, color: "#57606a" }}>Name</Typography>
              <TextField
                fullWidth
                name="name"
                value={updateData.name}
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
                value={updateData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
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
              Update
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateAnnonce;
