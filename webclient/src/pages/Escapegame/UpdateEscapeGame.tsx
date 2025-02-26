import { FC, useState, ChangeEvent } from 'react';
import { 
  Box, Button, TextField, Typography, Select, MenuItem, Input, Checkbox, InputLabel, 
  SelectChangeEvent,
  Grid2, 
} from '@mui/material';
import { GetEscapeGameDto } from '../../interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { UpdateEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/updateEscapeGameDto';
import Item from '@/components/factory/GenericComponent/Item';


enum PriceLevel {
  VeryLow = 1,
  Low,
  Medium,
  High,
}

enum DifficultyLevel {
  Easy = 1,
  Medium,
  Hard,
}

interface UpdateEscapeGameProps {
  data: GetEscapeGameDto;
  onSubmit: (updatedEscapeGame: UpdateEscapeGameDto) => void;
}

const UpdateEscapeGameForm: FC<UpdateEscapeGameProps> = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState<UpdateEscapeGameDto>({

    ...data
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    setFormData((prev) => ({
      ...prev,
      eSGImgResources: selectedFile ? selectedFile.name : '',
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className="items-center grid grid-flow-col-dense ">
        <Grid2 container spacing={2}>
          <Typography className="text-center" variant="h4">
            Update Escape Game
          </Typography>
          <Grid2 size={8} className=" px-10">
            <Item className="flex flex-col space-y-4 ">
              <Typography>Id: {formData.eSGId}</Typography>
              <TextField
                name="eSGNom"
                type="text"
                className="flex-1 text-center px-15"
                label="Nom"
                placeholder="Nom"
                value={formData.eSGNom}
                onChange={handleInputChange}
              />
              <TextField
                name="eSGContent"
                className="flex-1 text-center px-15"
                placeholder="Content"
                label="Content"
                value={formData.eSGContent}
                onChange={handleInputChange}
              />
              <TextField
                name="eSGCreator"
                className="flex-1 text-center px-10"
                label="Creator"
                placeholder="Creator"
                value={formData.eSGCreator}
                onChange={handleInputChange}
              />
             
                <TextField
                  name="eSGWebsite"
                  className="flex-1 text-center px-10"
                  placeholder="Website"
                  label="Website"
                  value={formData.eSGWebsite}
                  onChange={handleInputChange}
                />
                <TextField
                  name="eSGPhoneNumber"
                  className="flex-1 text-center px-10"
                  placeholder="Phone Number"
                  label="Phone Number"
                  value={formData.eSGPhoneNumber}
                  onChange={handleInputChange}
                />
                <Input
                  type="file"
                  className="flex-1 text-center px-10"
                  onChange={handleFileChange}
                />

          

              <InputLabel>Is For Children</InputLabel>
              <Checkbox
                name="eSGIsForChildren"
                checked={formData.eSG_IsForChildren}
                onChange={handleCheckboxChange}
                size="large"
                />
                  <TextField
                    name="eSGTitle"
                    className="flex-1 text-center px-10"
                    placeholder="Title"
                    label="Title"
                    value={formData.eSGTitle}
                    onChange={handleInputChange}
                  />
                <Box >
                  <InputLabel>Price</InputLabel>
                  <Select
                    name="eSGPriceId"
                    value={formData.eSG_Price_Id}
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
                    name="eSGDifficultyLevelId"
                    value={formData.eSG_DILE_Id}
                    onChange={handleSelectChange}>
                    <MenuItem value={DifficultyLevel.Easy}>Easy</MenuItem>
                    <MenuItem value={DifficultyLevel.Medium}>Medium</MenuItem>
                    <MenuItem value={DifficultyLevel.Hard}>Hard</MenuItem>
                  </Select>
                </Box>
                </Item>
           
          </Grid2>
          <Box className="flex-1 items-center text-center mx-10">
            <Button variant="contained" type="submit">
              Update
            </Button>
          </Box>
        </Grid2>
      </Box>
    </form>
  );
};

export default UpdateEscapeGameForm;
