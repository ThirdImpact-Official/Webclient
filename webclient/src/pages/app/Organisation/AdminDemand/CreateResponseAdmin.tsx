import { useState ,FC } from "react";
import { Box,Typography,TextField,Button } from "@mui/material";
import { ResponseAdminDemandDto } from '../../../../interfaces/AdminDemand/ResponseAdminDemand';


interface AddResponseAdminProps
{
    adminId: number;
}

const AddResponseAdmin: FC<AddResponseAdminProps> = ({ adminId }) => {
    const [responseDetails, setResponseDetails] = useState<ResponseAdminDemandDto>({
        id: adminId,
        motifRefus: "",
        commentairesAdmin: "",
    });

    return (
        <form>
            <Box className="text-center justify-center">
                <Box>
                    <Typography variant="h3">Réponse Admin</Typography>
                </Box>
                <Box>
                    <TextField 
                        value={responseDetails.motifRefus} 
                        onChange={(e) => setResponseDetails({ ...responseDetails, motifRefus: e.target.value })}
                        name="motifRefus"
                        placeholder="Motif de refus"
                        fullWidth
                    />
                </Box>
                <Box>
                    <TextField 
                        value={responseDetails.commentairesAdmin} 
                        onChange={(e) => setResponseDetails({ ...responseDetails, commentairesAdmin: e.target.value })}
                        name="commentairesAdmin"
                        placeholder="Commentaires"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Box>
            </Box>
            <Box>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
        </form>
    );
}

export default AddResponseAdmin;