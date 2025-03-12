import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Button, Paper, Pagination } from '@mui/material';

import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';


interface OrganisationTableProps
{
    Organisation: GetOrganisationDto[];
    OnDetails:(org: GetOrganisationDto) => void;
    OnUpdate: (org: GetOrganisationDto) => void;
    onAddress: (org: GetOrganisationDto) => void;

}

const OrganisationTable = ({Organisation, OnDetails, OnUpdate, onAddress}: OrganisationTableProps) => {

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
                    <TableCell>Address</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Organisation.map((org) => (
                    <TableRow key={org.orgId}>
                        <TableCell>{org.orgId}</TableCell>
                        <TableCell>{org.name}</TableCell>
                        <TableCell>{org.email}</TableCell>
                        <TableCell>{org.phoneNumber}</TableCell>
                        <TableCell>
                            <Button onClick={() => OnDetails(org)}>Detail</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => OnUpdate(org)}>Update</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => onAddress(org)}>
                                    Address
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    )
}
export default OrganisationTable;