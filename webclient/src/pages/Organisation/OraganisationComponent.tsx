import ModalComponent from '@/components/factory/GenericComponent/Modal';
import { Table, Box, Toolbar, Typography, List, TableRow, ListItem, TableContainer, TableHead, TableCell, TableBody, Button, Paper } from '@mui/material';
import AddNewOrganisation from './AddOrganisation';
import { useState } from 'react';
import { GetOrganisationDto } from '@/interfaces/Organisation/getOrganisationDto';
import AddressDetail from './AdressDetail';
import UpdateOrganisation from './UpdateOrganisation';
import OrganisationDetails from './Organisationdetails';

enum Sgbd
{
    Table=0,
    Add=1,
    Details=2,
    Update=3,
    Default=4
}
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

    const [State,setState]= useState<Sgbd>(Sgbd.Table);
    const [Organisation, setOrganisation] = useState<GetOrganisationDto | null>(null);

    function handleDataFromChild(data: GetOrganisationDto) {
        setOrganisation(data);
        setState(Sgbd.Details);
    }

    const component= {
        [Sgbd.Table]:<OrganisationTable 
                                sendata={handleDataFromChild}/>,
        [Sgbd.Add]: <AddNewOrganisation/>,
        [Sgbd.Details]: <OrganisationDetails 
                                data={Organisation}/>,
        [Sgbd.Update]: <UpdateOrganisation
                                data={Organisation}/>,
        [Sgbd.Default]: <p>huh </p>
    }
    
    return (
            <>
                <Box display={'flex'} flex={4}>
                    <Box flex={1}>
                        <Toolbar>
                            <Typography variant="h6">
                            <List sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
                                <ListItem>
                                    <ModalComponent children={<AddNewOrganisation/>} Title={"addOrganisation"} Description={"allow u to add an organisation"} />
                                </ListItem>
                                <ListItem>
                                    <Button onClick={() => setState(Sgbd.Table) }>Organisation
                                        </Button>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={() => setState(Sgbd.Table)}>Table</Button>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={() => setState(Sgbd.Add)}>Add</Button>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={() => setState(Sgbd.Update)}>Update</Button>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={() => setState(Sgbd.Details)}>Detail</Button>
                                </ListItem>
                                </List>
                            </Typography>
                        </Toolbar>
                    
                    </Box>
                    <Box flexGrow={1}>
                    {
                        component[State]
                    }
                    </Box>
                </Box>
            </>
    )
}

export default OrganisationComponent;

interface ChildrenProps {
    sendata:(data: GetOrganisationDto)=> void;
}
function OrganisationTable(props: ChildrenProps) {
    const { sendata } = props;

    const handleClick = (organisation: GetOrganisationDto) => {
        sendata(organisation);
    };

    return (
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
                                <Button onClick={() => handleClick(org)}>Details</Button>
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
        </TableContainer>)
}




