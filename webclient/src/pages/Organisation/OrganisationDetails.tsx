import { GetOrganisationDto } from '@/interfaces/Organisation/getOrganisationDto';
import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';


interface OrganisationDetailsProps
{
    data: GetOrganisationDto;
}
const OrganisationDetails:FC<OrganisationDetailsProps> = ({data}) => {
    if(data == null)
    {

        return <></>;
    } 
    else
    {
        return(
                <div className="flex items-center justify-center">
                    <Box className="my-10 space-y-4 space-x-4  shadow-sm px-4">
                        <div>
                            <Typography className='text-center text-xls'>Details</Typography>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <Typography className='text-start'><strong >Id :</strong></Typography>
                                <Typography className="my-2 text-center">{data.orgId}</Typography>
                            </div>
                        </div>
                        <div>
                            <Typography><strong>Name :</strong></Typography>
                            <Typography className="text-center">{data.name} </Typography>
                        </div>
                        <div>
                            <Typography><strong>Email :</strong></Typography>
                            <Typography className="text-center">{data.email} </Typography>

                        </div>
                        <div>
                            <Typography><strong>Description :</strong> </Typography>
                            <Typography>{data.description}</Typography>
                        </div>
                        <div>
                            <Typography><strong>Phone Number :</strong></Typography>
                            <p className="my-2 text-center"> {data.phoneNumber} </p>
                        </div>
                        <div className='flex items-center justify-center m-4 p-2'>
                     
                            <Button sx={{mr:2}} variant="contained" color='error'>Delete</Button>
                        </div>
                    </Box>
            </div>)
    }
}
export default OrganisationDetails;