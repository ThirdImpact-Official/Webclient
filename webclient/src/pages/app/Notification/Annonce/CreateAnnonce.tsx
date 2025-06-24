import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { AddAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/addAnnonceDto";
import { OrganisationAction } from '../../../../actions/OrganisationActions';
import Organisation from '@/pages/app/Organisation';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/GetOrganisationDto';
import { useNavigate } from 'react-router-dom';
import { useToasted } from '@/context/ContextHook/ToastedContext';
import { UnitofAction } from '@/actions/UnitofAction';
interface CreateAnnonceProps {
    onSubmit: (data: AddAnnonceDto) => void;  
}

const CreateAnnonce: FC<CreateAnnonceProps> = ({ onSubmit }) => {
    const action = new UnitofAction();
    const [announcement, setAnnouncement] = useState<AddAnnonceDto>({
        name: '',
        description: '',
        formFile: null,
        organisationId: 0
    });
    const [Organisation,setorganisation]=useState<GetOrganisationDto>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(announcement);
        event.preventDefault();
        onSubmit(announcement);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnnouncement({ 
            ...announcement,
            [event.target.name]: event.target.value 
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setAnnouncement({ 
            ...announcement,
            formFile: file
        });
    };
    const fetchOrganisationId= async ()=> {
        try
        {
            const response = await action.organisationAction.GetOrganisationByIdForCurrentUser();
            if(response.Success)
            {
                const statData = response.Data as GetOrganisationDto[];
                setorganisation(statData[0]);
                setAnnouncement({...announcement,organisationId:statData[0].orgId});
            }
        }
        catch(err)
        {

        }
    }
    useEffect(() => {
        fetchOrganisationId();
    },[setorganisation]);
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
                            required
                        />
                    </Box>
                    <Box>
                        <Typography>Description</Typography>
                        <TextField
                            type="text"
                            name="description"
                            value={announcement.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            required
                        />
                    </Box>
                    <Box>
                        <Typography>Image</Typography>
                        <TextField
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            InputProps={{
                                inputProps: {
                                    accept: "image/*"
                                }
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
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