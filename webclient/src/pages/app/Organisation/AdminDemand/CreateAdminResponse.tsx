import { CreateAdminDemandDto } from "@/interfaces/AdminDemand/CreateAdminDemand";
import { Box,Button,TextField,Typography } from "@mui/material";
import { useState } from "react";


const CreateAdminResponse =() => {
    const [Createresponse, setCreateresponse] = useState<CreateAdminDemandDto>({
        userid: 0,
        title:"",
        content:"",
        contactNumber:""
    });
    
    return(
        <>
            <form>
                <Box className="text-center justify-center">
                    <Box>
                        <Typography 
                            variant="h3" 
                            color="">Réponse Admin</Typography>
                    </Box>
                    <Box>
                        <TextField 
                            value={Createresponse.title} 
                            name="Titre"/>
                    </Box>
                    <Box>
                        <TextField  
                            value={Createresponse.content} 
                            name="Content" />
                    </Box>
                    <Box>
                        <TextField 
                            value={Createresponse.contactNumber} 
                            name="Contact Number" />
                    </Box>
                </Box>
                <Box>
                    <Button>Submit</Button>
                </Box>
            </form>
        </>
    );
}

export default CreateAdminResponse;