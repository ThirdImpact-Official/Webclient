import { AddActivityPlaceDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/addActivityPlaceDto";
import { Box, TextField, Typography,FormControl,Button } from "@mui/material";
import { useState } from "react";

interface CreateActivityPlaceProps{
    escapeGameId: number;
    onSubmit:(item:  AddActivityPlaceDto) => void
}
class test{
   
        acpEsgId: number;
        activityId: number;
        adress: string;
        imgressources: string;
    
}
/**
 * React component to create a new activity place for an escape game.
 * This component is rendered as a form with input fields for the activity place's
 * name, address, and image resources.
 * When the form is submitted, the component will call the onSubmit function
 * with the new activity place's data as an argument.
 * @param {object} props - Component props
 * @param {number} props.escapeGameId - ID of the escape game
 * @param {function} props.onSubmit - Function to call when the form is submitted
 */
const CreateActivityPlace: React.FC<CreateActivityPlaceProps> = ({ escapeGameId, onSubmit }) => {
    const [formData, setFormData] = useState<AddActivityPlaceDto>({
        acpEsgId: escapeGameId,
        activityId: 0,
        name: "",
        description: "",
        address:'',
        imgressources: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFormData((prevState) => ({
                ...prevState,
                imageResources: reader.result as string,
            }));
        };
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box>
            <Box className="flex flex-col gap-4 items-center justify-center m-2 p-4  ">
                <Box>
                    <Typography variant="h6">Create Activity Place</Typography>
                </Box>
                <FormControl className="border">
                    <Box className="space-y-4">
                        <Box>
                            <TextField
                                    label="Name"
                                    name="name"
                                    fullWidth
                                    value={formData.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                />

                        </Box>
                        <Box>
                            <TextField
                                label="Description"
                                name="name"
                                fullWidth
                                value={formData.description}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box>
                            <TextField
                                label="Address"
                                name="address"
                                fullWidth
                                value={formData.address}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box>
                            <Typography>Image</Typography>
                            <TextField

                                name="imageResources"
                                type="file"
                                onChange={handleImageChange}
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                    <Box className=" flex flex-col items-center justify-center m-2 p-4">
                        <Button variant="outlined" onClick={handleSubmit}>
                            Create
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </Box>
    );
};
export default CreateActivityPlace;