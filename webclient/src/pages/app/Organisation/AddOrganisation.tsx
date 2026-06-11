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
        <Box>
            <form className=" text-center" onSubmit={handleSubmit}>
                <Grid2 container spacing={4} className="pt-10 my-4 mx-10 ">
                        <Grid2 className="p-4 bg-white" size={6}>
                            
                                <Typography variant="h6" 
                                            className="m-1">Organisation :</Typography>
                                <Divider orientation="horizontal" flexItem />
                        
                                <Item className=" flex flex-col space-y-4 m-auto">
                                    <Box>
                                        <TextField
                                            label="Name"
                                            placeholder="insert name"
                                            type="text"
                                            value={organisationData.name}
                                            onChange={(e) => handleOrganisationChange("name", e.target.value)}
                                            />

                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Email"
                                            placeholder="insert email"
                                            type="text"
                                            value={organisationData.email}
                                            onChange={(e) => handleOrganisationChange("email", e.target.value)}
                                            />

                                    </Box>
                                    <Box>
                                        <TextField
                                            label="PhoneNumber"
                                            placeholder="insert phone number"
                                            type="text"
                                            value={organisationData.phoneNumber}
                                            onChange={(e) => handleOrganisationChange("phoneNumber", e.target.value)}
                                            />
                                    </Box>          
                                    <Box>
                                        <TextField
                                            placeholder="insert description"
                                            value={organisationData.description}
                                            fullWidth
                                            multiline
                                            rows={4}
                                            onChange={(e) => handleOrganisationChange("description", e.target.value)}
                                            />
                                    </Box>
                                </Item>
                            </Grid2>
                            <Grid2 className="bg-white p-4" size={6} >
                                <Typography
                                    variant="h6"
                                     className="m-1">Address</Typography>
                                <hr />
                                <Item className=" flex flex-col  space-y-4">
                                    <Box>
                                        <TextField
                                            label="Postal Code"
                                            placeholder="insert postal code"
                                            type="text"
                                            value={addressData.postalCode}
                                            onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                                            />

                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Street"
                                            placeholder="Street"
                                            type="text"
                                            value={addressData.street}
                                            onChange={(e) => handleAddressChange("street", e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            label="City"
                                            placeholder="insert city"
                                            type="text"
                                            value={addressData.city}
                                            onChange={(e) => handleAddressChange("city", e.target.value)}
                                        />

                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Country"
                                            placeholder="insert country"
                                            type="text"
                                            value={addressData.country}
                                            onChange={(e) => handleAddressChange("country", e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                    <TextField
                                        label="Latitude"
                                        placeholder="insert latitude"
                                        type="text"
                                        value={addressData.latitude}
                                        onChange={(e) => handleAddressChange("latitude", e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Longitude"
                                            placeholder="insert longitude"
                                            type="text"
                                            value={addressData.longitude}
                                            onChange={(e) => handleAddressChange("longitude", e.target.value)}
                                            />
                                    </Box>
                                    <Box className="p-6">
                                        <Typography variant="h6">Logo d'organisation</Typography>
                                        <TextField
                                            type="file"
                                            placeholder="insert logo"
                                            onChange={handleFileChange}
                                            />
                                    </Box>
                                </Item>
                            </Grid2>
            
                    </Grid2>
                    <Box className="flex flex-col items-center justify-center text-center" >
                            <Button
                                type="submit"
                                variant="contained"
                                className="bg-blue-500 p-4 border-rounded rounded-sm text-center">
                                Ajouter
                            </Button>
                        
                    </Box>
            </form>
        </Box>
    );
};

export default AddNewOrganisation;
