import { useState ,FC } from "react";
import { Box,Typography,TextField,Button } from "@mui/material";
import { ResponseAdminDemandDto } from '../../../../interfaces/AdminDemand/ResponseAdminDemand';
import { on } from "events";


interface AddResponseAdminProps
{
    data: ResponseAdminDemandDto;
    onSubmit: (data: ResponseAdminDemandDto) => void
}

const AddResponseAdmin: FC<AddResponseAdminProps> = (props) => {
    const [responseDetails, setResponseDetails] = useState<ResponseAdminDemandDto>({
        id: props.data.id,
        motifRefus: props.data.motifRefus,
        commentairesAdmin: props.data.commentairesAdmin,
    });
    const handleSubmit = (event: React.FormEvent, data: ResponseAdminDemandDto) => {
        event.preventDefault();
        props.onSubmit(data);
        // Your form submission logic here
      };
    return (
        <form>
            <Box className="text-center justify-center space-y-4">
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
            <Box className="flex items-center justify-center m-4">
                <Button
                    onClick={(event) => handleSubmit(event, responseDetails)} 
                    type="submit"
                    variant="contained" 
                    color="primary">Submit</Button>
            </Box>
        </form>
    );
}

export default AddResponseAdmin;