import { FC, useState, ChangeEvent } from 'react';
import { 
  Box, Button, TextField, Typography, Select, MenuItem, Input, Checkbox, InputLabel, 
  SelectChangeEvent,Card,CardContent } from '@mui/material';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { UpdateEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/updateEscapeGameDto';
import { PriceLevel, DifficultyLevel } from '@/enums/PriceLevel';

interface UpdateEscapeGameProps {
  data: GetEscapeGameDto;
  onSubmit: (updatedEscapeGame: UpdateEscapeGameDto) => void;
}

const UpdateEscapeGameForm: FC<UpdateEscapeGameProps> = ({ data, onSubmit }) => {
  const [updatedEscapeGame, setUpdatedEscapeGame] = useState<UpdateEscapeGameDto>({
    esgId: data.esgId,
    esgNom: data.esgNom,
    esgCreator: data.esgCreator,
    esgTitle: data.esgTitle,
    esgContent: data.esgContent,
    esgImgResources: data.esgImgResources,
    esgWebsite: data.esgWebsite,
    esgPhoneNumber: data.esgPhoneNumber,
    esg_IsForChildren: data.esg_IsForChildren,
    esg_Price_Id: data.esg_Price_Id,
    esg_DILE_Id: data.esg_DILE_Id,
    // Add the missing fields with default values or from data
    maxPlayers: (data as any).maxPlayers || 1,
    minPlayers: (data as any).minPlayers || 1,
    language: (data as any).language || ''
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedEscapeGame((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedEscapeGame((prev) => ({ ...prev, [name]: Number(value) || 0 }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setUpdatedEscapeGame((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setUpdatedEscapeGame((prev) => ({
      ...prev,
      esgImgResources: selectedFile ? selectedFile.name : '',
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setUpdatedEscapeGame((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(updatedEscapeGame);
  };

  return (
<form onSubmit={handleSubmit}>
  <Card
    elevation={0}
    sx={{
      border: "1px solid #d0d7de",
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      p: 3,
      maxWidth: 800,
      mx: "auto",
    }}
  >
    <Typography
      variant="h5"
      sx={{ fontWeight: 600, color: "#24292f", mb: 3, textAlign: "center" }}
    >
      Mettre à jour l’Escape Game
    </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* SECTION 1 — Informations générales */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Informations générales
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="esgNom"
            label="Nom"
            fullWidth
            value={updatedEscapeGame.esgNom}
            onChange={handleInputChange}
          />

          <TextField
            name="esgTitle"
            label="Titre"
            fullWidth
            value={updatedEscapeGame.esgTitle}
            onChange={handleInputChange}
          />

          <TextField
            name="esgContent"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={updatedEscapeGame.esgContent}
            onChange={handleInputChange}
          />

          <TextField
            name="esgCreator"
            label="Créateur"
            fullWidth
            value={updatedEscapeGame.esgCreator}
            onChange={handleInputChange}
          />

          <TextField
            name="esgWebsite"
            label="Site Web"
            fullWidth
            value={updatedEscapeGame.esgWebsite}
            onChange={handleInputChange}
          />

          <TextField
            name="esgPhoneNumber"
            label="Téléphone"
            fullWidth
            value={updatedEscapeGame.esgPhoneNumber}
            onChange={handleInputChange}
          />
        </Box>
      </Box>

      {/* SECTION 2 — Joueurs */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Joueurs
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            name="minPlayers"
            label="Min joueurs"
            type="number"
            fullWidth
            value={updatedEscapeGame.minPlayers}
            onChange={handleNumberInputChange}
            inputProps={{ min: 1 }}
          />

          <TextField
            name="maxPlayers"
            label="Max joueurs"
            type="number"
            fullWidth
            value={updatedEscapeGame.maxPlayers}
            onChange={handleNumberInputChange}
            inputProps={{ min: 1 }}
          />
        </Box>

        <TextField
          name="language"
          label="Langue"
          fullWidth
          sx={{ mt: 2 }}
          value={updatedEscapeGame.language}
          onChange={handleInputChange}
        />
      </Box>

      {/* SECTION 3 — Image & Enfants */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Image & Options
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <InputLabel>Image</InputLabel>
            <TextField type="file" fullWidth onChange={handleFileChange} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox
              name="esg_IsForChildren"
              checked={updatedEscapeGame.esg_IsForChildren}
              onChange={handleCheckboxChange}
            />
            <Typography>Pour enfants</Typography>
          </Box>
        </Box>
      </Box>

      {/* SECTION 4 — Prix & Difficulté */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Prix & Difficulté
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <InputLabel>Prix</InputLabel>
            <Select
              name="esg_Price_Id"
              fullWidth
              value={updatedEscapeGame.esg_Price_Id}
              onChange={handleSelectChange}
            >
              <MenuItem value={PriceLevel.VeryLow}>Très bas</MenuItem>
              <MenuItem value={PriceLevel.Low}>Bas</MenuItem>
              <MenuItem value={PriceLevel.Medium}>Moyen</MenuItem>
              <MenuItem value={PriceLevel.High}>Élevé</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputLabel>Difficulté</InputLabel>
            <Select
              name="esg_DILE_Id"
              fullWidth
              value={updatedEscapeGame.esg_DILE_Id}
              onChange={handleSelectChange}
            >
              <MenuItem value={DifficultyLevel.Easy}>Facile</MenuItem>
              <MenuItem value={DifficultyLevel.Medium}>Moyen</MenuItem>
              <MenuItem value={DifficultyLevel.Hard}>Difficile</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      {/* SUBMIT */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#2da44e",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            "&:hover": { backgroundColor: "#2c974b" },
          }}
        >
          Mettre à jour
        </Button>
      </Box>
    </Box>
  </Card>
</form>
  );
};

export default UpdateEscapeGameForm;