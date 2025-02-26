import React,{FC}from 'react';
import { GetAdressDto } from '../../../interfaces/OrganisationInterface/Adress/getAdressDto';
import { Box, Typography, Button, Divider } from '@mui/material';




interface AddressDetailProps 
{
    props?: GetAdressDto;
}
const AddressDetail: FC<AddressDetailProps> = ({ props: address }) => {
  if (!address) {
    return <Typography variant="body1">Not defined</Typography>;
  }

  return (
    <Box className="flex flex-col mt-4 p-4 text-center w-4/6">
      <Typography variant="h4">Address Details</Typography>
      <Box className="mx-10 my-4 space-y-2">
        <Box className="flex gap-4 justify-between">
          <Typography sx={{pe:'5px'}} variant="h5">Street:</Typography>
          <Typography variant="body1">{address.street}</Typography>
        </Box>
        <Box className="flex gap-4 justify-between">
          <Typography variant="h5">Postal Code:</Typography>
          <Typography variant="body1">{address.postalCode}</Typography>
        </Box>
        <Box className="flex gap-4 justify-between">
          <Typography variant="h5">City:</Typography>
          <Typography variant="body1">{address.city}</Typography>
        </Box>
        <Box className="flex gap-4 justify-between">
          <Typography variant="h5">Country:</Typography>
          <Typography variant="body1">{address.country}</Typography>
        </Box>
        <Divider />
        <Box className="flex justify-between mt-2">
          <Button color="primary">Update</Button>
          <Button color="error">Delete</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddressDetail;