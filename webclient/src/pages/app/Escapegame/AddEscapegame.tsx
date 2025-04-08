import Item from "@/components/factory/GenericComponent/Item";
import { PriceLevel, DifficultyLevel } from "@/enums/PriceLevel";
import { AddEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/addEscapeGameDto";
import { Grid2, Typography, TextField, Input, InputLabel, Checkbox, Select, MenuItem, Button , Box, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";

const AddEscapeGameForm = () => {
  const [escapeGameData, setEscapeGameData] = useState<AddEscapeGameDto>({
    esgNom: "",
    esgCreator: '',
    esgTitle: '',
    esgContent: '',
    esgImgResources: '',
    esgWebsite: '',
    esgPhoneNumber: '',
    esg_IsDeleting: false,
    esg_IsForChildren: false,
    esg_Price_Id: 1,
    esg_DILE_Id: 1,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEscapeGameData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEscapeGameData((previousData) => ({
        ...previousData,
        image: file.name,
      }));
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEscapeGameData((previousData) => ({
      ...previousData,
      isForChildren: event.target.checked,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setEscapeGameData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box className="items-center flex flex-col justify-center">
          <Box >
            <Box className="" >
              <Typography variant="h4" className="text-center">
                Create Escape Game
              </Typography>
            </Box>
            <Box className="space-y-4" >
                
                  <Box  >
                    <TextField
                      name="name"
                      label="Name"
                      fullWidth
                      placeholder="Name"
                      value={escapeGameData.esgNom}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box >
                    <TextField
                      name="content"
                      label="Content"
                      fullWidth
                      placeholder="Content"
                      value={escapeGameData. esgContent}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <TextField
                      name="creator"
                      label="Creator"
                      fullWidth
                      placeholder="Creator"
                      value={escapeGameData.esgCreator}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <TextField
                      name="website"
                      label="Website"
                      fullWidth
                      placeholder="Website"
                      value={escapeGameData.esgWebsite}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <TextField
                      name="phoneNumber"
                      label="Phone Number"
                      fullWidth
                      placeholder="Phone Number"
                      value={escapeGameData.esgPhoneNumber}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <TextField 
                      fullWidth
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <InputLabel>Is For Children</InputLabel>
                    <Checkbox
                      name="isForChildren"
                      checked={escapeGameData. esg_IsForChildren}
                      onChange={handleCheckboxChange}
                    />
                  </Box>
                  <Box>
                    <Box>
                      <InputLabel>Price</InputLabel>
                      <Select
                        name="priceId"
                        value={escapeGameData.esg_Price_Id}
                        onChange={handleSelectChange}
                      >
                        <MenuItem value={PriceLevel.VeryLow}>
                          Very Low
                        </MenuItem>
                        <MenuItem value={PriceLevel.Low}>Low</MenuItem>
                        <MenuItem value={PriceLevel.Medium}>
                          Medium
                        </MenuItem>
                        <MenuItem value={PriceLevel.High}>High</MenuItem>
                      </Select>
                    </Box>
                  </Box>
                </Box>
                <Box>
                    <Box>
                      <InputLabel>Difficulty</InputLabel>
                      <Select
                        name="difficultyLevelId"
                        value={escapeGameData.esg_DILE_Id}
                        onChange={handleSelectChange}
                      >
                        <MenuItem value={DifficultyLevel.Easy}>
                          Easy
                        </MenuItem>
                        <MenuItem value={DifficultyLevel.Medium}>
                          Medium
                        </MenuItem>
                        <MenuItem value={DifficultyLevel.Hard}>
                          Hard
                        </MenuItem>
                      </Select>
                    </Box>
            </Box>
            <Box>
              <Box className="flex-1 items-center text-center p-4 mx-10">
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default AddEscapeGameForm;