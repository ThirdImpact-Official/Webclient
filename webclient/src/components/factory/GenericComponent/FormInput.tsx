import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";

interface FormInputProps {
  label: string;
  name: string;
  value: string | number | boolean | File | null;
  type?: "text" | "email" | "number" | "select" | "checkbox" | "file";
  options?: { label: string; value: string | number }[];
  onChange: (name: string, value: string | number | boolean | File | null) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  type = "text",
  options,
  onChange
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
    const target = e.target as HTMLInputElement;

    if (type === "file") {
      onChange(name, target.files?.[0] || null);
    } else if (type === "checkbox") {
      onChange(name, target.checked);
    } else {
      onChange(name, target.value);
    }
  };

  return (
    <>
      {type === "select" ? (
        <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "#57606a" }}>{label}</InputLabel>

          <Select
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            name={name}
            sx={{
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              "& fieldset": { borderColor: "#d0d7de" },
              "&:hover fieldset": { borderColor: "#b9c1c9" },
            }}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      ) : type === "checkbox" ? (
        <FormControlLabel
          sx={{
            mt: 1,
            color: "#24292f",
            "& .MuiCheckbox-root": {
              color: "#57606a",
              "&.Mui-checked": { color: "#0969da" }
            }
          }}
          control={<Checkbox checked={value as boolean} onChange={handleChange} name={name} />}
          label={label}
        />

      ) : type === "file" ? (
        <Button
          variant="outlined"
          component="label"
          sx={{
            mt: 2,
            borderColor: "#d0d7de",
            color: "#24292f",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f6f8fa",
              borderColor: "#b9c1c9"
            }
          }}
        >
          {label}
          <input type="file" hidden onChange={handleChange} accept="image/*" />
        </Button>

      ) : (
        <TextField
          label={label}
          name={name}
          value={value}
          type={type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            mt: 2,
            "& .MuiInputBase-root": {
              borderRadius: "6px",
              backgroundColor: "#ffffff",
            },
            "& fieldset": { borderColor: "#d0d7de" },
            "&:hover fieldset": { borderColor: "#b9c1c9" },
            "& .MuiInputLabel-root": { color: "#57606a" },
          }}
        />
      )}
    </>
  );
};

export default FormInput;
