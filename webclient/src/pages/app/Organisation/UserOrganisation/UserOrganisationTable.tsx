import {Table,Button, TableCell, TableRow, TableBody, TableContainer, TableHead, Paper} from '@mui/material';

import { GetUserDto } from '../../../interfaces/User/GetUserDto';


interface UserOrganisationTableProps {
    GetUserDto: GetUserDto[];
    onDetails:(user: GetUserDto) => void
    onUpdate: (user: GetUserDto) => void
}

const UserOrganisationTable: React.FC<UserOrganisationTableProps> = ({GetUserDto, onDetails, onUpdate}) => {

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450, maxWidth: 650 }} aria-label="simple table">
            <TableHead>
                
                <TableRow>
                    <TableCell>UserId</TableCell>
                    <TableCell>UserName</TableCell>
                    <TableCell>FirstName</TableCell>
                    <TableCell>Lastname</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Picture</TableCell>
                    <TableCell>EmailVerified</TableCell>
                    <TableCell>ReportCount</TableCell>
                    <TableCell>RoleId</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Update</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                   {
                       GetUserDto.map((user) => (
                           <TableRow key={user.userId}>
                               <TableCell>{user.userId}</TableCell>
                               <TableCell>{user.username}</TableCell>
                               <TableCell>{user.firstName}</TableCell>
                               <TableCell>{user.lastName}</TableCell>
                               <TableCell>{user.email}</TableCell>
                               <TableCell><img src={user.picture} alt="" /></TableCell>
                               <TableCell>{user.emailVerified ? "true" : "false"}</TableCell>
                               <TableCell>{user.reportCount}</TableCell>
                               <TableCell>{user.roleId}</TableCell>
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
    );
}
export default UserOrganisationTable;