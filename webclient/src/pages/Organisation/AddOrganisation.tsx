import { AddAdressDto } from "@/interfaces/OrganisationInterface/Adress/addAdressDto";
import { AddOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/addOrganisationDto";
import { Button, Grid2, Input, TextareaAutosize, TextField,Box } from "@mui/material";

import React, {  useState } from "react";
import Item from '@/components/factory/GenericComponent/Item';



const AddNewOrganisation = () => {
    const [organisationData, setOrganisationData] = useState<AddOrganisationDto>({
        name: "",
        email: "",
        phoneNumber: "",
        description: "",
        address: null,
        formFile: null,
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

    const handleOrganisationChange = (key: keyof AddOrganisationDto, value: string) => {
        setOrganisationData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleAddressChange = (key: keyof AddAdressDto, value: unknown) => {
        setAddressData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setSelectedFile(selectedFile ?? null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        organisationData.address = addressData;
        organisationData.formFile = selectedFile;
    };

    return (
        <Box>
            
            <form className=" text-center" onSubmit={handleSubmit}>
                <Grid2 container spacing={4} className="pt-10 my-4 mx-10 ">
                        <Grid2 className="p-4 bg-white" size={6}>
                            
                                <h3 className="text-2xl m-1">Organisation :</h3>
                                <hr />
                        
                                <Item className=" flex flex-col space-y-4 m-auto">
                                    <TextField
                                        label="Name"
                                        placeholder="insert name"
                                        type="text"
                                        value={organisationData.name}
                                        onChange={(e) => handleOrganisationChange("name", e.target.value)}
                                        />
                            
                                    <TextField
                                        label="Email"
                                        placeholder="insert email"
                                        type="text"
                                        value={organisationData.email}
                                        onChange={(e) => handleOrganisationChange("email", e.target.value)}
                                        />
                            
                                    <TextField
                                        label="PhoneNumber"
                                        placeholder="insert phone number"
                                        type="text"
                                        value={organisationData.phoneNumber}
                                        onChange={(e) => handleOrganisationChange("phoneNumber", e.target.value)}
                                        />
                            
                                    <TextareaAutosize
                                        placeholder="insert description"
                                        minRows={3}
                                        style={{ width: "350px", height: "100px", borderRadius: "5px", border: "1px solid #ccc" }}
                                        value={organisationData.description}
                                        onChange={(e) => handleOrganisationChange("description", e.target.value)}
                                        />
                                </Item>
                            </Grid2>
                            <Grid2 className="bg-white p-4" size={6} >
                                <h3 className="text-2xl m-1">Address</h3>
                                <hr />
                                <Item className=" flex flex-col  space-y-4">
                                    <TextField
                                        label="Postal Code"
                                        placeholder="insert postal code"
                                        type="text"
                                        value={addressData.postalCode}
                                        onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                                        />
                                    <TextField
                                        label="City"
                                        placeholder="insert city"
                                        type="text"
                                        value={addressData.city}
                                        onChange={(e) => handleAddressChange("city", e.target.value)}
                                    />
                                    <TextField
                                        label="Country"
                                        placeholder="insert country"
                                        type="text"
                                        value={addressData.country}
                                        onChange={(e) => handleAddressChange("country", e.target.value)}
                                    />
                                    <TextField
                                        label="Latitude"
                                        placeholder="insert latitude"
                                        type="text"
                                        value={addressData.latitude}
                                        onChange={(e) => handleAddressChange("latitude", e.target.value)}
                                        />
                                
                                    <TextField
                                        label="Longitude"
                                        placeholder="insert longitude"
                                        type="text"
                                        value={addressData.longitude}
                                        onChange={(e) => handleAddressChange("longitude", e.target.value)}
                                        />
                                    <div className="p-6">
                                        <h3 className="text-2xl">Logo d'organisation</h3>
                                        <Input
                                            type="file"
                                            placeholder="insert logo"
                                            style={{ width: "350px", height: "70px" }}
                                            onChange={handleFileChange}
                                            />
                                    </div>
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
