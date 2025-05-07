import {
    Table,
    Button,
    TableCell,
    TableRow,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
    Typography,
    Box,
    Avatar,
    Stack,
  } from '@mui/material';
  
  import { GetUserDto } from '@/interfaces/User/GetUserDto';
  
  interface UserOrganisationTableProps {
    GetUserDto: GetUserDto[];
    onDetails: (user: GetUserDto) => void;
    onUpdate: (user: GetUserDto) => void;
  }
  
  const UserOrganisationTable: React.FC<UserOrganisationTableProps> = ({
    GetUserDto,
    onDetails,
    onUpdate,
  }) => {
    return (
      <Box className="m-4">
        <Typography variant="h4" align="center" gutterBottom>
          Demande Administrateur
        </Typography>
  
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 4, boxShadow: 3 }}
          className="hover:shadow-2xl transition-all"
        >
          <Table aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {GetUserDto.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Avatar src={user.picture}>
                      {user.firstName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        onClick={() => onDetails(user)}
                      >
                        Details
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => onUpdate(user)}
                      >
                        Update
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default UserOrganisationTable;
  