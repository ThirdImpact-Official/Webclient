import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { AddPostForumDto } from "@/interfaces/PublicationInterface/Post/addPostForumDto";

interface AddPostFormProps {
  forumId?: number;
  postParentId?: number;
  onSubmit: (data: AddPostForumDto) => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: AddPostForumDto = {
      content,
      userId: 0,
      forumId: null,
      postparentId: null,
    };

    onSubmit(data);
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
          Ajouter un post
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Contenu du post"
              fullWidth
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#2da44e",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#2c974b" },
              }}
            >
              Soumettre
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPostForm;
