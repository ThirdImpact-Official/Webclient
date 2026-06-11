import { CreateAdminDemandDto } from "@/interfaces/AdminDemand/CreateAdminDemand";
import { Box,Button,FormControl,TextField,Typography } from "@mui/material";
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
            <FormControl>
                <Box className="text-center items-center justify-center space-y-4">
                    <Box>
                        <Typography 
                        
                            variant="h3" 
                            color="">Réponse Admin</Typography>
                    </Box>
                    <Box>
                        <TextField 
                            placeholder="Titre"
                            value={Createresponse.title} 
                            name="Titre"/>
                    </Box>
                    <Box>
                        <TextField  
                            variant="outlined"
                            placeholder="Content"
                            value={Createresponse.content} 
                            name="Content" />
                    </Box>
                    <Box>
                        <TextField 
                            placeholder="Contact Number"
                            value={Createresponse.contactNumber} 
                            name="Contact Number" />
                    </Box>
                </Box>
                <Box className="flex items-center justify-center m-2 p-2">
                    <Button variant="contained"
                    >Submit</Button>
                </Box>
            </FormControl>
        </>
    );
}

export default CreateAdminResponse;