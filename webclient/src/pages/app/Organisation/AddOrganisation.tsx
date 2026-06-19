import { AddAdressDto } from "@/interfaces/OrganisationInterface/Adress/addAdressDto";
import { AddOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/addOrganisationDto";
import { Button, Grid2, Input, TextareaAutosize, TextField,Box, Typography, Divider } from "@mui/material";
import {OrganisationAction} from "@/actions/OrganisationActions";
import React, {  useState } from "react";
import Item from '@/components/factory/GenericComponent/Item';
import { ErrorType } from '../../../enums/RequestType';
import { useAuth } from '../../../context/AuthContext';
import { useModal } from '../../../context/ContextHook/ModalContext';
import { useLoading } from "@/context/ContextHook/LoadingContext";



const AddNewOrganisation = () => {
    const [organisationData, setOrganisationData] = useState<AddOrganisationDto>({
        name: "",
        email: "",
        phoneNumber: "",
        description: "",
        address: null,
        logo: null,
    });
    const [addressData, setAddressData] = useState<AddAdressDto>({
        street: "",
        postalCode: "",
        city: "",
        country: "",
        latitude: 0,
        longitude: 0,
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const action= new OrganisationAction();
    const modal= useModal();
    const load=useLoading();

    //manage the organisation changes
    const handleOrganisationChange = (key: keyof AddOrganisationDto, value: string) => {
        setOrganisationData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    //manage the aDREScHANGE
    const handleAddressChange = (key: keyof AddAdressDto, value: unknown) => {
        setAddressData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    //manage the File Submit 
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setSelectedFile(selectedFile ?? null);
    };
    //Manage Submit
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        organisationData.address = addressData;
        organisationData.formFile = selectedFile;
        let response;
        try {
            load.showLoading = true;
            load.isLoading = true;

            response= await action.AddanOrganisation(organisationData);
            if (response.Success) {
                modal.handleOpen();
                modal.setTitle("Success");
                modal.setDescription(response.Message);
            }
            else
            {
                modal.handleOpen();
                modal.setTitle("Error");
                modal.setDescription(response.Message);
            }
        }
        catch (e) {
            modal.setTitle("Error");
            modal.setDescription(e instanceof Error ? e.message : 'An error occurred');
        }
        finally {
            load.isLoading = false;
        }
    };

return (
  <Box
    sx={{
      width: "100%",
      backgroundColor: "#f6f8fa",
      p: { xs: 2, md: 4 },
    }}
  >
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={3}>
        
        {/* Organisation Section */}
        <Grid2 xs={12} md={6}>
          <Box
            sx={{
              border: "1px solid #d0d7de",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#24292f", mb: 2 }}
            >
              Organisation
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Name"
                value={organisationData.name}
                onChange={(e) => handleOrganisationChange("name", e.target.value)}
                fullWidth
              />

              <TextField
                label="Email"
                value={organisationData.email}
                onChange={(e) => handleOrganisationChange("email", e.target.value)}
                fullWidth
              />

              <TextField
                label="Phone Number"
                value={organisationData.phoneNumber}
                onChange={(e) =>
                  handleOrganisationChange("phoneNumber", e.target.value)
                }
                fullWidth
              />

              <TextField
                label="Description"
                value={organisationData.description}
                onChange={(e) =>
                  handleOrganisationChange("description", e.target.value)
                }
                fullWidth
                multiline
                rows={4}
              />
            </Box>
          </Box>
        </Grid2>

        {/* Address Section */}
        <Grid2 xs={12} md={6}>
          <Box
            sx={{
              border: "1px solid #d0d7de",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#24292f", mb: 2 }}
            >
              Address
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Postal Code"
                value={addressData.postalCode}
                onChange={(e) =>
                  handleAddressChange("postalCode", e.target.value)
                }
                fullWidth
              />

              <TextField
                label="Street"
                value={addressData.street}
                onChange={(e) =>
                  handleAddressChange("street", e.target.value)
                }
                fullWidth
              />

              <TextField
                label="City"
                value={addressData.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                fullWidth
              />

              <TextField
                label="Country"
                value={addressData.country}
                onChange={(e) =>
                  handleAddressChange("country", e.target.value)
                }
                fullWidth
              />

              <TextField
                label="Latitude"
                value={addressData.latitude}
                onChange={(e) =>
                  handleAddressChange("latitude", e.target.value)
                }
                fullWidth
              />

              <TextField
                label="Longitude"
                value={addressData.longitude}
                onChange={(e) =>
                  handleAddressChange("longitude", e.target.value)
                }
                fullWidth
              />

              <Box>
                <Typography sx={{ mb: 1, color: "#57606a" }}>
                  Logo d'organisation
                </Typography>
                <TextField type="file" onChange={handleFileChange} fullWidth />
              </Box>
            </Box>
          </Box>
        </Grid2>
      </Grid2>

      {/* Submit Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#2da44e",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            "&:hover": {
              backgroundColor: "#2c974b",
            },
          }}
        >
          Ajouter
        </Button>
      </Box>
    </form>
  </Box>
);

};

export default AddNewOrganisation;
