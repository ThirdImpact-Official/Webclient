import Item from "@/components/factory/GenericComponent/Item";
import { PriceLevel, DifficultyLevel } from "@/enums/PriceLevel";
import { AddEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/addEscapeGameDto";
import { Grid2, Typography, TextField,Card, Input, InputLabel, Checkbox, Select, MenuItem, Button, Box, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

interface AddEscapeGameFormProps {
  onSubmit: (data: AddEscapeGameDto) => void;
}
const AddEscapeGameForm: FC<AddEscapeGameFormProps> = (props) => {
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
    maxPlayer: 4,
    minPlayer: 2,
    duration: 60,
    language: "fr",
    esg_Org_Id: 0
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
      Create Escape Game
    </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* SECTION 1 — Informations générales */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          General Information
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="esgNom"
            label="Name"
            fullWidth
            value={escapeGameData.esgNom}
            onChange={handleInputChange}
          />

          <TextField
            name="esgTitle"
            label="Title"
            fullWidth
            value={escapeGameData.esgTitle}
            onChange={handleInputChange}
          />

          <TextField
            name="esgContent"
            label="Content"
            fullWidth
            multiline
            rows={3}
            value={escapeGameData.esgContent}
            onChange={handleInputChange}
          />

          <TextField
            name="esgCreator"
            label="Creator"
            fullWidth
            value={escapeGameData.esgCreator}
            onChange={handleInputChange}
          />

          <TextField
            name="esgWebsite"
            label="Website"
            fullWidth
            value={escapeGameData.esgWebsite}
            onChange={handleInputChange}
          />

          <TextField
            name="esgPhoneNumber"
            label="Phone Number"
            fullWidth
            value={escapeGameData.esgPhoneNumber}
            onChange={handleInputChange}
          />
        </Box>
      </Box>

      {/* SECTION 2 — Players */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Players
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            name="minPlayer"
            label="Min Players"
            type="number"
            fullWidth
            value={escapeGameData.minPlayer}
            onChange={handleInputChange}
          />

          <TextField
            name="maxPlayer"
            label="Max Players"
            type="number"
            fullWidth
            value={escapeGameData.maxPlayer}
            onChange={handleInputChange}
          />
        </Box>

        <TextField
          name="language"
          label="Language"
          fullWidth
          sx={{ mt: 2 }}
          value={escapeGameData.language}
          onChange={handleInputChange}
        />
      </Box>

      {/* SECTION 3 — Image & Children */}
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
              checked={escapeGameData.esg_IsForChildren}
              onChange={handleCheckboxChange}
            />
            <Typography>Is For Children</Typography>
          </Box>
        </Box>
      </Box>

      {/* SECTION 4 — Price & Difficulty */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Price & Difficulty
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <InputLabel>Price</InputLabel>
            <Select
              name="esg_Price_Id"
              fullWidth
              value={escapeGameData.esg_Price_Id}
              onChange={handleSelectChange}
            >
              <MenuItem value={PriceLevel.VeryLow}>Very Low</MenuItem>
              <MenuItem value={PriceLevel.Low}>Low</MenuItem>
              <MenuItem value={PriceLevel.Medium}>Medium</MenuItem>
              <MenuItem value={PriceLevel.High}>High</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              name="esg_DILE_Id"
              fullWidth
              value={escapeGameData.esg_DILE_Id}
              onChange={handleSelectChange}
            >
              <MenuItem value={DifficultyLevel.Easy}>Easy</MenuItem>
              <MenuItem value={DifficultyLevel.Medium}>Medium</MenuItem>
              <MenuItem value={DifficultyLevel.Hard}>Hard</MenuItem>
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
          Create
        </Button>
      </Box>
    </Box>
  </Card>
</form>

    </div>
  );
};

export default AddEscapeGameForm;