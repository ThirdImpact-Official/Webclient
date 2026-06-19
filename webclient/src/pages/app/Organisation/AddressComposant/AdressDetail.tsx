import React, { FC } from "react";
import { GetAdressDto } from "../../../interfaces/OrganisationInterface/Adress/getAdressDto";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import UpdateAdress from "./UpdateAdress";

interface AddressDetailProps {
  props?: GetAdressDto;
}

const AddressDetail: FC<AddressDetailProps> = ({ props: address }) => {
  if (!address) {
    return (
      <Typography sx={{ color: "#57606a", textAlign: "center", mt: 2 }}>
        Not defined
      </Typography>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#24292f", mb: 2, textAlign: "center" }}
        >
          Address Details
        </Typography>

        <Stack spacing={2}>
          {/* Street */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600, color: "#24292f" }}>
              Street:
            </Typography>
            <Typography>{address.street}</Typography>
          </Box>

          {/* Postal Code */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600, color: "#24292f" }}>
              Postal Code:
            </Typography>
            <Typography>{address.postalCode}</Typography>
          </Box>

          {/* City */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600, color: "#24292f" }}>
              City:
            </Typography>
            <Typography>{address.city}</Typography>
          </Box>

          {/* Country */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600, color: "#24292f" }}>
              Country:
            </Typography>
            <Typography>{address.country}</Typography>
          </Box>

          <Divider />

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <ModalComponent
              ButtonTitle="Update"
              Title="Update Address"
              Description=""
              children={<UpdateAdress data={address} OnSubmit={() => {}} />}
            />

            <ModalComponent
              ButtonTitle="Delete"
              Title="Delete Address"
              Description=""
              children={<>DeletepopUP</>}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AddressDetail;
