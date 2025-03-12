import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import { Box, Button, Divider, Typography } from '@mui/material';
import { FC } from 'react';


interface OrganisationDetailsProps
{
    data: GetOrganisationDto;
}
const OrganisationDetails: FC<OrganisationDetailsProps> = ({ data }) => {
    if (!data) {
        return null;
    }

    return (
        <Box className="flex items-center justify-center  mx-15 rounded-md ">
            <Box className="bg-white mx-15 space-y-6 px-10">
                <Box>
                    <Typography className="flex-1 text-center p-4" variant="h4">Details</Typography>
                </Box>
                <Box className="flex items-center gap-4">
                    <Typography variant="h5" className="text-start">ID:</Typography>
                    <Typography variant="body1" className="mx-2 text-center">{data.orgId}</Typography>
                </Box>
                <Box className="flex gap-4 justify-between">
                    <Typography variant="h5" className="text-start">Name:</Typography>
                    <Typography variant="body1" className="text-center">{data.name}</Typography>
                </Box>
                <Box className="flex gap-4 justify-between">
                    <Typography variant="h5">Email:</Typography>
                    <Typography variant="body1" className="text-center">{data.email}</Typography>
                </Box>
                <Box>
                    <Typography variant="h5">Description:</Typography>
                    <Typography variant="body1">{data.description}</Typography>
                </Box>
                <Box className="flex gap-4 justify-between">
                    <Typography variant="h5">Phone Number:</Typography>
                    <Typography variant="body1" className="mx-2 text-center">{data.phoneNumber}</Typography>
                </Box>
                <Divider className="mt-4 p-4" orientation="horizontal" flexItem />
                <Box className="flex items-center justify-center m-4 p-2">
                    <Button sx={{ mr: 2 }} variant="contained" color="error">Delete</Button>
                </Box>
            </Box>
        </Box>
    );
}
export default OrganisationDetails;