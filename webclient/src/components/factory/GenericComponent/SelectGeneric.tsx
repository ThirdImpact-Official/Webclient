import { MenuItem, Select, SelectChangeEvent, Box } from "@mui/material";
import { FC, useState } from "react";

interface SelectGenericProps<T> {
  data: T[];
  columns: { label: string; accessor: keyof T }[];
  OnChange: (data: T) => void;
}

const SelectGeneric = <T extends { id: number }>({
  data,
  columns,
  OnChange,
}: SelectGenericProps<T>) => {
  const [selectedItemId, setSelectedItemId] = useState<number>(data[0].id);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const selected = event.target.value;
    setSelectedItemId(selected as number);

    const selectedData = data.find((item) => item.id === selected);
    if (selectedData) {
      OnChange(selectedData);
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Select
        value={selectedItemId}
        onChange={handleChange}
        fullWidth
        sx={{
          borderRadius: "6px",
          backgroundColor: "#ffffff",
          "& fieldset": { borderColor: "#d0d7de" },
          "&:hover fieldset": { borderColor: "#b9c1c9" },
          "& .MuiSelect-select": {
            paddingY: "10px",
            color: "#24292f",
          },
        }}
      >
        {data.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
            sx={{
              fontSize: "0.9rem",
              color: "#24292f",
              "&:hover": {
                backgroundColor: "#f6f8fa",
              },
            }}
          >
            {columns.map((col) => item[col.accessor]).join(", ")}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SelectGeneric;
