import { FC, useState, ChangeEvent } from 'react';
import { 
  Box, Button, TextField, Typography, Select, MenuItem, Input, Checkbox, InputLabel, 
  SelectChangeEvent} from '@mui/material';
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
    esg_DILE_Id: data.esg_DILE_Id
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedEscapeGame((prev) => ({ ...prev, [name]: value }));
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
      <Box className="grid grid-cols-1 gap-4 justify-between">
        <Typography variant="h4" className="text-center">
          Update Escape Game
        </Typography>
        <Box>
          <Box className="space-y-4">
            <Box>
              <TextField
                name="esgNom"
                type="text"
                label="Nom"
                fullWidth
                placeholder="Nom"
                value={updatedEscapeGame.esgNom}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                name="esgTitle"
                label="Titre"
                fullWidth
                placeholder="Titre"
                value={updatedEscapeGame.esgTitle}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                name="esgContent"
                label="Description"
                fullWidth
                placeholder="Description"
                value={updatedEscapeGame.esgContent}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                name="esgCreator"
                label="Créateur"
                placeholder="Créateur"
                fullWidth
                value={updatedEscapeGame.esgCreator}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                name="esgWebsite"
                label="Site Web"
                fullWidth
                placeholder="Site Web"
                value={updatedEscapeGame.esgWebsite}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                name="esgPhoneNumber"
                label="Téléphone"
                fullWidth
                placeholder="Téléphone"
                value={updatedEscapeGame.esgPhoneNumber}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
        
          <Box>
            <InputLabel>Image</InputLabel>
            <TextField
              type="file"
              fullWidth
              onChange={handleFileChange}
            />
            <InputLabel>Pour enfants ?</InputLabel>
            <Checkbox
              name="esg_IsForChildren"
              checked={updatedEscapeGame.esg_IsForChildren}
              onChange={handleCheckboxChange}
            />
          </Box>
          <Box>
            <InputLabel>Prix</InputLabel>
            <Select
              name="esg_Price_Id"
              value={updatedEscapeGame.esg_Price_Id}
              onChange={handleSelectChange}
            >
              <MenuItem value={PriceLevel.VeryLow}>Très bas</MenuItem>
              <MenuItem value={PriceLevel.Low}>Bas</MenuItem>
              <MenuItem value={PriceLevel.Medium}>Moyen</MenuItem>
              <MenuItem value={PriceLevel.High}>Élevé</MenuItem>
            </Select>
          </Box>
          <Box>
            <InputLabel>Difficulté</InputLabel>
            <Select
              name="esg_DILE_Id"
              value={updatedEscapeGame.esg_DILE_Id}
              onChange={handleSelectChange}
            >
              <MenuItem value={DifficultyLevel.Easy}>Facile</MenuItem>
              <MenuItem value={DifficultyLevel.Medium}>Moyen</MenuItem>
              <MenuItem value={DifficultyLevel.Hard}>Difficile</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box className="flex items-center justify-center">
          <Button variant="contained" type="submit">
            Mettre à jour
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default UpdateEscapeGameForm;