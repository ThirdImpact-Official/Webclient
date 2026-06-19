import { FC, useState } from "react";
import { UpdateAdressDto } from "@/interfaces/OrganisationInterface/Adress/updateAdressDto";
import { GetAdressDto } from "@/interfaces/OrganisationInterface/Adress/getAdressDto";
import {
  TextField,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

interface UpdateAdressProps {
  data: GetAdressDto;
  onSubmit: (item: UpdateAdressDto) => void;
}

const UpdateAddressForm: FC<UpdateAdressProps> = ({ data, onSubmit }) => {
  const [addressData, setAddressData] = useState<UpdateAdressDto>({
    ...data,
  });

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(addressData);
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#24292f", mb: 2 }}
        >
          Update Address
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Street"
              name="street"
              value={addressData.street}
              onChange={handleFieldChange}
              fullWidth
            />

            <TextField
              label="Postal Code"
              name="postalCode"
              value={addressData.postalCode}
              onChange={handleFieldChange}
              fullWidth
            />

            <TextField
              label="City"
              name="city"
              value={addressData.city}
              onChange={handleFieldChange}
              fullWidth
            />

            <TextField
              label="Country"
              name="country"
              value={addressData.country}
              onChange={handleFieldChange}
              fullWidth
            />

            <TextField
              label="Latitude"
              name="latitude"
              value={addressData.latitude}
              onChange={handleFieldChange}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#2da44e",
                textTransform: "none",
                fontWeight: 600,
                mt: 1,
                "&:hover": { backgroundColor: "#2c974b" },
              }}
            >
              Update
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UpdateAddressForm;
