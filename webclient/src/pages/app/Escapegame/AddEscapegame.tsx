import Item from "@/components/factory/GenericComponent/Item";
import { PriceLevel, DifficultyLevel } from "@/enums/PriceLevel";
import { AddEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/addEscapeGameDto";
import { Grid2, Typography, TextField, Input, InputLabel, Checkbox, Select, MenuItem, Button , Box, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

interface AddEscapeGameFormProps {
  onSubmit: (data: AddEscapeGameDto) => void;
}
const AddEscapeGameForm :FC<AddEscapeGameFormProps> = (props) => {
  const [escapeGameData, setEscapeGameData] = useState<AddEscapeGameDto>({
    esgNom: "",
    esgCreator: "",
    esgTitle: "",
    esgContent: "",
    esgImgResources: null,
    esgWebsite: "",
    esgPhoneNumber: "",
    esg_IsForChildren: false,
    esg_Price_Id: 1,
    esg_DILE_Id: 1,
  });
  const [isCheck,setISCheck] = useState<boolean>(false);
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
        esgImgResources: file,
      }));
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEscapeGameData((previousData) => ({
      ...previousData,
      esg_IsForChildren: event.target.checked, 
    }));
   
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setEscapeGameData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(escapeGameData);
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
                      name="esgNom"
                      label="Name"
                      fullWidth
                      placeholder="Name"
                      value={escapeGameData.esgNom}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box >
                    <TextField
                      name="esgTitle"
                      label="Title"
                      fullWidth
                      placeholder="Title"
                      value={escapeGameData.esgTitle}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box >
                    <TextField
                      name="esgContent"
                      label="Content"
                      fullWidth
                      placeholder="Content"
                      value={escapeGameData. esgContent}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <TextField
                      name="esgCreator"
                      label="Creator"
                      fullWidth
                      placeholder="Creator"
                      value={escapeGameData.esgCreator}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <TextField
                      name="esgWebsite"
                      label="Website"
                      fullWidth
                      placeholder="Website"
                      value={escapeGameData.esgWebsite}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <TextField
                      name="esgPhoneNumber"
                      label="Phone Number"
                      fullWidth
                      placeholder="Phone Number"
                      value={escapeGameData.esgPhoneNumber}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <TextField 
                      name="esgImgResources"
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
                      name="esg_IsForChildren"

                      checked={isCheck}
                      onChange={handleCheckboxChange}
                    />
                  </Box>
                  <Box>
                    <Box>
                      <InputLabel>Price</InputLabel>
                      <Select
                        name="esg_Price_Id"
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
                        name="esg_DILE_Id"
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