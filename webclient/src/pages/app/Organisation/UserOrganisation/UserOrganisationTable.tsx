import {Table,Button, TableCell, TableRow, TableBody, TableContainer, TableHead, Paper,Typography,Box} from '@mui/material';

import { GetUserDto } from '@/interfaces/User/GetUserDto';


interface UserOrganisationTableProps {
    GetUserDto: GetUserDto[];
    onDetails:(user: GetUserDto) => void
    onUpdate: (user: GetUserDto) => void
}

const UserOrganisationTable: React.FC<UserOrganisationTableProps> = ({GetUserDto, onDetails, onUpdate}) => {

    return (
        <>
         <Box className="flex justify-center items-center">
                <Typography variant="h4" className="m-2 p-2">
                     Demande Administrateur</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450, maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        
                        <TableRow>
                            <TableCell>UserId</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>FirstName</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            GetUserDto.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => onDetails(user)}>details</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => onUpdate(user)}>update</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
export default UserOrganisationTable;