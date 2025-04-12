import { FC, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AddAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/addAnnonceDto";

interface CreateAnnonceProps
{
    onSubmit: (data: any) => void;  
}

const CreateAnnonce:FC<CreateAnnonceProps> = ({ onSubmit }) =>
{
    const [createAnnonce, setCretateAnnocne]= useState<AddAnnonceDto>({
        name: '',
        description: '',
    });


    return(
    <>
        <Box className="text-center" >
            <Typography variant="h4">Create an Annonce </Typography>
            <form className="flex items-center justify-center mx-15 rounded-md space-y-2 ">
                <Box>
                    <Box>
                        <Box>
                            <Typography>Name</Typography>
                        </Box>
                        <Box>
                            <TextField type="text" value={createAnnonce.name} onChange={(e) => setCretateAnnocne({ ...createAnnonce, name: e.target.value })} />
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>Description</Typography>
                        </Box>
                        <Box>
                            <TextField type="text" value={createAnnonce.description}  onChange={(e) => setCretateAnnocne({ ...createAnnonce, description: e.target.value })} />
                        </Box>
                    </Box>
                    <Box>
                        <Button onClick={onSubmit}>envoyer</Button>
                    </Box>
                </Box>
            </form>
        </Box>
    </>)
}
export default CreateAnnonce;