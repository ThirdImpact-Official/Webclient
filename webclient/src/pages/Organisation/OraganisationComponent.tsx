import ModalComponent from '@/components/factory/GenericComponent/Modal';
import { Table, Box, TableRow, TableContainer, TableHead, TableCell, TableBody, Button, Paper, Pagination,  } from '@mui/material';
import AddNewOrganisation from './AddOrganisation';
import { useState } from 'react';
import { GetOrganisationDto } from '@/interfaces/Organisation/getOrganisationDto';
import AddressDetail from './AddressComposant/AdressDetail';
import UpdateOrganisation from './UpdateOrganisation';
import OrganisationDetails from './OrganisationDetails';



const testObjects: GetOrganisationDto[] = [
    {
        orgId: 1,
      name: 'Test Organisation',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      description: '',
      address: {
        // assuming GetAdressDto has the following properties
        adressId: 0,
        street: '123 Main St',
        city: 'Anytown',
        country: 'CA',
        postalCode: '12345',
        latitude: 0,
        longitude: 0
      }
    },
    {
      orgId: 2,
      name: 'Another Test Organisation',
      email: 'another@example.com',
      phoneNumber: '9876543210',
      description: '',
      address: null
    },
    {
        orgId: 3,
      name: 'Empty Organisation',
      email: '',
      description: '',
      phoneNumber: '',
      address: null
    },
    {
     orgId: 4,
      name: 'Invalid Organisation',
      email: ' invalid email',
      phoneNumber: ' invalid phone number',
      description: '',
      address: {
        adressId: 0,
        street: ' invalid street',
        city: ' invalid city',
        country: ' invalid state',
        postalCode: ' invalid zip',
        latitude: 0,
        longitude: 0
      }
    },
    {
        orgId: 5,
      name: 'Organisation with missing address',
      email: 'missing@example.com',
      phoneNumber: '1234567890',
      address: undefined,
      description: ''
    }
  ];

const OrganisationComponent = () => {

    const [Organisation, setOrganisation] = useState<GetOrganisationDto | null>(null);

    /*
        function to handle the data from the child component 
        for details 
    */
    function handleDataFromChild(data: GetOrganisationDto) {
        setOrganisation(data);
    
    }
   
    
    function handleClick(done: boolean): void {
        throw new Error('Function not implemented.');
    }

    return (
            <>
                <Box display={'flex'} flex={4}>
                  
                    <Box flexGrow={1}>
                        <Box className="float float-end  ">
                            <ModalComponent children={<AddNewOrganisation />} ButtonTitle={"addOrganisation"} Title={"updateOrganisation"} Description={"allow u to update an organisation"} />
                        </Box>
                     
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Details</TableCell>
                                        <TableCell>Update</TableCell>
                                        <TableCell>Address</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {testObjects.map((org) => (
                                        <TableRow key={org.orgId}>
                                            <TableCell>{org.orgId}</TableCell>
                                            <TableCell>{org.name}</TableCell>
                                            <TableCell>{org.email}</TableCell>
                                            <TableCell>{org.phoneNumber}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDataFromChild(org)}>detail</Button>
                                            </TableCell>
                                            <TableCell>
                                                <ModalComponent children={<UpdateOrganisation handleCallBackResponse={handleClick}  data={org} />} ButtonTitle='Update' Title={"Update"} Description={"allow u to update an organisation"} />
                                            </TableCell>
                                            <TableCell>
                                                <Button>
                                                    <ModalComponent
                                                        ButtonTitle="Address"
                                                        Title="Details"
                                                        Description="Address details"
                                                        children={<AddressDetail props={org.address} />}
                                                    />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination className="float-end"  count={10} />
                    </Box>
                    <Box className="mx-10 px-10 bg-white rounded-md " flex={1}>
                       
                       <OrganisationDetails data={Organisation} />
                   </Box>
                </Box>
            </>
    )
}

export default OrganisationComponent;





