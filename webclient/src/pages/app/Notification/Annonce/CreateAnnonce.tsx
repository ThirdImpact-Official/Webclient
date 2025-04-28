import { FC, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AddAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/addAnnonceDto";

interface CreateAnnonceProps
{
    onSubmit: (data: any) => void;  
}

const CreateAnnonce: FC<CreateAnnonceProps> = ({ onSubmit }) => {
    const [announcement, setAnnouncement] = useState<AddAnnonceDto>({
        name: '',
        description: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(announcement);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnnouncement({ ...announcement,
            [event.target.name]: event.target.value });
    };

    return (
        <Box className="text-center">
            <Typography className="p-4" variant="h4">Create an Annonce</Typography>
            <form className="flex items-center justify-center mx-15 rounded-md space-y-2" onSubmit={handleSubmit}>
                <Box className="space-y-2">
                    <Box>
                        <Typography>Name</Typography>
                        <TextField
                            type="text"
                            name="name"
                            value={announcement.name}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <Typography>Description</Typography>
                        <TextField
                            type="text"
                            name="description"
                            value={announcement.description}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box className="flex items-center justify-center p-4">
                        <Button variant="contained" type="submit">Send</Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};
export default CreateAnnonce;