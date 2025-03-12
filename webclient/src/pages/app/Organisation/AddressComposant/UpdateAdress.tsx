import { UpdateAdressDto } from "@/interfaces/OrganisationInterface/Adress/updateAdressDto"
import { FC,useState } from "react"
import { on } from 'events';
import { GetAdressDto } from "@/interfaces/OrganisationInterface/Adress/getAdressDto";
import { TextField, Typography, Box,Button } from '@mui/material';

interface UpdateAdressProps {
    data: GetAdressDto
    onSubmit: (item: UpdateAdressDto) => void
}

const UpdateAddressForm: FC<UpdateAdressProps> = ({ data, onSubmit }) => {
    const [addressData, setAddressData] = useState<UpdateAdressDto>({
        ...data,
    });

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAddressData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(addressData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <form className="flex flex-col gap-4">
                <TextField
                    label="Street"
                    name="street"
                    value={addressData.street}
                    onChange={handleFieldChange}
                />
                <TextField
                    label="Postal Code"
                    name="postalCode"
                    value={addressData.postalCode}
                    onChange={handleFieldChange}
                />
                <TextField
                    label="City"
                    name="city"
                    value={addressData.city}
                    onChange={handleFieldChange}
                />
                <TextField
                    label="Country"
                    name="country"
                    value={addressData.country}
                    onChange={handleFieldChange}
                />
                <TextField
                    label="Latitude"
                    name="latitude"
                    value={addressData.latitude}
                    onChange={handleFieldChange}
                />
                <Box className="mt-4 justify-center">
                    <Button type="submit" onClick={handleSubmit}>
                        Update
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
export default UpdateAddressForm;