import { UpdateAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/updateAnnonceDto"
import { GetAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import { FC ,useState} from "react";
import { Box,Typography,TextField,Button } from "@mui/material";
interface UpdateAnnonceProps
{
    data:GetAnnonceDto;
    onSubmit:(data:UpdateAnnonceDto) => void;
}

/*
    Méthodes de mise a jour des annonces utilisateur 
*/ 
const UpdateAnnonce:FC<UpdateAnnonceProps> = ({data,onSubmit}) => {

    const [updateAnnonce, setUpdateAnnonce] = useState<UpdateAnnonceDto>({
       id:data.id,
       name:data.name,
       description:data.description,
    });

    return(
    <>
    <Box className="text-center">
         
        <Typography>Update an Annonce </Typography>
        <form className="flex items-center justify-center mx-15 rounded-md space-y-2 ">
            <Box>
                <Box>
                    <Box>
                        <Typography>Name</Typography>
                    </Box>
                    <Box>
                        <TextField type="text" value={updateAnnonce.name} onChange={(e) => setUpdateAnnonce({ ...updateAnnonce, name: e.target.value })} />
                    </Box>
                </Box>
                <Box>
                    <Box>
                    <Typography>Description </Typography>
                    </Box>
                    <Box>
                        <TextField type="text" value={updateAnnonce.description} onChange={(e)=> setUpdateAnnonce({ ...updateAnnonce, description: e.target.value })} />
                    </Box>
                </Box>
                <Box>
                    <Button  onClick={()=>onSubmit(updateAnnonce)}> Update </Button>
                </Box>
                
            </Box>
        </form>
    </Box>
</>);
}

export default UpdateAnnonce;