import { FC, useState, ChangeEvent } from 'react';
import { 
  Box, Button, TextField, Typography, Select, MenuItem, Input, Checkbox, InputLabel, 
  SelectChangeEvent,
  Grid2} from '@mui/material';
import { GetEscapeGameDto } from '../../interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { UpdateEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/updateEscapeGameDto';
import Item from '@/components/factory/GenericComponent/Item';
import { PriceLevel, DifficultyLevel } from '@/enums/PriceLevel';





interface UpdateEscapeGameProps {
  data: GetEscapeGameDto;
  onSubmit: (updatedEscapeGame: UpdateEscapeGameDto) => void;
}


const UpdateEscapeGameForm: FC<UpdateEscapeGameProps> = ({ data, onSubmit }) => {
  const [updatedEscapeGame, setUpdatedEscapeGame] = useState<UpdateEscapeGameDto>({
    ...data,
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
      imageFileName: selectedFile ? selectedFile.name : '',
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
        <Grid2 container spacing={4}>
          <Grid2   size={12}>
            <Item className="grid grid-cols-1 gap-4">
              <TextField
                name="name"
                type="text"
                label="Name"
                placeholder="Name"
                value={updatedEscapeGame.eSGNom}
                onChange={handleInputChange}
              />
              <TextField
                name="description"
                label="Description"
                placeholder="Description"
                value={updatedEscapeGame.eSGContent}
                onChange={handleInputChange}
              />
              <TextField
                name="creator"
                label="Creator"
                placeholder="Creator"
                value={updatedEscapeGame.eSGCreator}
                onChange={handleInputChange}
              />
              <TextField
                name="website"
                label="Website"
                placeholder="Website"
                value={updatedEscapeGame.eSGWebsite}
                onChange={handleInputChange}
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
                value={updatedEscapeGame.eSGPhoneNumber}
                onChange={handleInputChange}
              />
            </Item>
          </Grid2>
          <Grid2  size={12} >
            <Item>
              <Input
                type="file"
                className="w-full"
                onChange={handleFileChange}
              />
              <InputLabel>Is For Children</InputLabel>
              <Checkbox
                name="isForChildren"
                checked={updatedEscapeGame.eSG_IsForChildren}
                onChange={handleCheckboxChange}
              />
            </Item>
          </Grid2>
          <Grid2  size={12} >
            <Item>
              <Box>
                <InputLabel>Price</InputLabel>
                <Select
                  name="priceId"
                  value={updatedEscapeGame.eSG_Price_Id}
                  onChange={handleSelectChange}
                >
                  <MenuItem value={PriceLevel.VeryLow}>Very Low</MenuItem>
                  <MenuItem value={PriceLevel.Low}>Low</MenuItem>
                  <MenuItem value={PriceLevel.Medium}>Medium</MenuItem>
                  <MenuItem value={PriceLevel.High}>High</MenuItem>
                </Select>
              </Box>
              <Box>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  name="difficultyLevelId"
                  value={updatedEscapeGame.eSG_DILE_Id}
                  onChange={handleSelectChange}
                >
                  <MenuItem value={DifficultyLevel.Easy}>Easy</MenuItem>
                  <MenuItem value={DifficultyLevel.Medium}>Medium</MenuItem>
                  <MenuItem value={DifficultyLevel.Hard}>Hard</MenuItem>
                </Select>
              </Box>
            </Item>
          </Grid2>
        </Grid2>
        <Box className="flex items-center justify-center">
          <Button variant="contained" type="submit">
            Update
          </Button>
        </Box>
      </Box>
    </form>
  );
};
export default UpdateEscapeGameForm;
