import React,{FC}from 'react';
import { GetAdressDto } from '../../../interfaces/OrganisationInterface/Adress/getAdressDto';
import { Box, Typography, Divider } from '@mui/material';
import ModalComponent from '@/components/factory/GenericComponent/Modal';




interface AddressDetailProps 
{
    props?: GetAdressDto;
}
const AddressDetail: FC<AddressDetailProps> = ({ props: address }) => {
  if (!address) {
    return <Typography variant="body1">Not defined</Typography>;
  }

  return (
    <Box className=" items-center justify-center bg-white selection:flex flex-col m-10 p-4 text-center ">
      <Box className="p-4">
        <Typography variant="h4">Address Details</Typography>
      </Box>
      <Box className=" bg-white mx-10 my-4 space-y-2">
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
          <ModalComponent ButtonTitle='Update' 
                          children={<>formupdate</>} 
                          Title='' 
                          Description="" />
                          
          <ModalComponent ButtonTitle='Delete' 
                          children={<>DeletepopUP</>} 
                          Title='' 
                          Description="" />
        </Box>
      </Box>
    </Box>
  );
};

export default AddressDetail;