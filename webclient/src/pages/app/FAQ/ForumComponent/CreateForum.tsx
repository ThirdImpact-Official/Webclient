import { Button, TextField, Typography, Box, Card, CardContent } from "@mui/material";
import { useState, FC } from "react";
import { UpdateForumDto } from "@/interfaces/PublicationInterface/Forum/updateForumDto";
import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";

interface UpdateForumProps {
  data: GetForumDto;
  OnSubmit: (data: UpdateForumDto) => void;
}

const UpdateForumTopic: FC<UpdateForumProps> = ({ data, OnSubmit }) => {
  const [formData, setFormData] = useState<UpdateForumDto>({
    id: data.id,
    title: data.title,
    content: data.content,
    userId: data.userId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    OnSubmit(formData);
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
          Modifier le sujet #{formData.id}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography sx={{ mb: 0.5, color: "#57606a" }}>Titre</Typography>
              <TextField
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Entrez le titre du sujet"
                fullWidth
                required
              />
            </Box>

            <Box>
              <Typography sx={{ mb: 0.5, color: "#57606a" }}>Contenu</Typography>
              <TextField
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Décrivez votre sujet"
                multiline
                rows={4}
                fullWidth
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
              Modifier
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateForumTopic;
