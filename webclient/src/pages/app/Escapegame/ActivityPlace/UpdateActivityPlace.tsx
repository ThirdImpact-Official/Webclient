import { GetActivityPlaceDto} from "@/interfaces/EscapeGameInterface/ActivityPlace/getActivityPlaceDto";
import { UpdateActivityPlaceDto} from "@/interfaces/EscapeGameInterface/ActivityPlace/updateActivityPlaceDto"; ;
import { Box, Typography,FormControl, TextField, Input, Button, } from '@mui/material';
import { Update } from "vite/types/hmrPayload.js";
import {FC,useState,useEffect} from "react";
import { TextFields } from "@mui/icons-material";
interface UpdateActivityPlaceProps { 
    data: GetActivityPlaceDto
    onSubmit:(item: UpdateActivityPlaceDto) => void
}
const UpdateActivityPlace: FC<UpdateActivityPlaceProps> = ({ data, onSubmit }) => {
    const [formData, setFormData] = useState<UpdateActivityPlaceDto>({ ...data });
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
    return (
        <Box>
            <Box className="flex flex-col gap-4 items-center justify-center m-2 p-4">
                <Box>
                    <Typography variant="h6">Update Activity Place</Typography>
                </Box>
                <FormControl className="space-y-4 border">
                    <Box>
                        <TextField
                            value={formData.name || ""}
                            label="Name"
                            fullWidth
                            placeholder="Enter name"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Box>

                    <Box>
                        <TextField
                            value={formData.description || ""}
                            label="Description"
                            fullWidth
                            placeholder="Enter description"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </Box>

                    <Box>
                        <TextField
                            value={formData.address || ""}
                            label="Location"
                            fullWidth
                            placeholder="Enter location"
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                    <Box className="flex flex-col items-center justify-normal">
                        <Button variant="outlined" >Update</Button>
                    </Box>
                </FormControl>
            </Box>
        </Box>
    );
};
export default UpdateActivityPlace;