import { UpdateActivityPlaceDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/updateActivityPlaceDto";
import { GetActivityPlaceDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/getActivityPlaceDto";
import { Box, Typography, FormControl, TextField, Button } from '@mui/material';
import { FC, useState } from "react";

interface UpdateActivityPlaceProps {
    data: GetActivityPlaceDto;
    onSubmit: (item: UpdateActivityPlaceDto) => void;
}

const UpdateActivityPlace: FC<UpdateActivityPlaceProps> = ({ data, onSubmit }) => {
    const [formData, setFormData] = useState<UpdateActivityPlaceDto>({ 
        acpId: data.acpId,
        escapegameId: data.escapegameId,
        activityTypeId: data.activityTypeId,
        name: data.name,
        description: data.description,
        imgressources: data.imgressources || ""
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
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData(prev => ({
                    ...prev,
                    imgressources: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', p: 2 }}>
                <Typography variant="h6">Update Activity Place</Typography>
                
                <FormControl fullWidth sx={{ '& > *': { mb: 2 } }}>
                    <TextField
                        name="name"
                        value={formData.name || ""}
                        label="Name"
                        fullWidth
                        placeholder="Enter name"
                        onChange={handleChange}
                    />

                    <TextField
                        name="description"
                        value={formData.description || ""}
                        label="Description"
                        fullWidth
                        placeholder="Enter description"
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />

                    <Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>Image</Typography>
                        <TextField
                            name="imgressources"
                            type="file"
                            onChange={handleImageChange}
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ accept: "image/*" }}
                        />
                        {formData.imgressources && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2">Preview:</Typography>
                                <img 
                                    src={formData.imgressources} 
                                    alt="Preview" 
                                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                                />
                            </Box>
                        )}
                    </Box>

                    <Button 
                        variant="contained" 
                        type="submit"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Update
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
};

export default UpdateActivityPlace;