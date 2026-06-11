import { FC } from 'react';
import { GetUserDto } from '../../../../interfaces/User/GetUserDto';
import { Card, CardContent, CardHeader,Box, Typography, Stack, CardActions, Link, Grid2 as Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Email, Phone} from '@mui/icons-material';



interface GetUserDtoProps {
    user: GetUserDto;
}
const GetUserDetails:FC<GetUserDtoProps> = (props) => {
    return(<>
       <Card elevation={3} className='hover:shadow-2xl transition-all'>
            <CardHeader
           
             title={<>
                <Box className="p-4">
                    <Typography variant="h6" color="text.primary">
                        Information Utilisateur
                    </Typography>
                </Box>
             </>}
             subheader={<>
                <Box className="p-4">
                    <Typography variant="h6" color="text.secondary">
                        {props.user.username}
                    </Typography>
                </Box>
             </>}
             avatar={
                <>
                    <Box>
                        <Avatar
                        src={props.user.picture || ""}
                        className="bg-blue-500 text-white">{props.user.username.charAt(0).toUpperCase()}</Avatar>

                    </Box>
                </>
             }
             />
            <CardContent>
             <Stack>
             <Grid container spacing={2}>
                        <Grid  size={6}>
                            <Typography variant="body1" color="text.secondary">
                                Pseudo:
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {props.user.username}
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="body1" color="text.secondary">
                                Nom Complet:
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {props.user.firstName} {props.user.lastName}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box display="flex" alignItems="center">
                        <Email color="primary" sx={{ marginRight: 1 }} />
                        <Typography variant="body1" color="text.secondary">
                            Email:
                        </Typography>
                        <Link href={`mailto:${props.user.email}`} sx={{ marginLeft: 1 }}>
                            {props.user.email}
                        </Link>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Phone color="primary" sx={{ marginRight: 1 }} />
                        <Typography variant="body1" color="text.secondary">
                            Telephone:
                        </Typography>
                        <Link href={`tel:${props.user.phoneNumber}`} sx={{ marginLeft: 1 }}>
                            {props.user.phoneNumber}
                        </Link>
                    </Box>
             </Stack>
            </CardContent>
            <CardActions>
                <Box>
                    <Box>
                        <Typography>
                            <strong>LastLogin:</strong>
                        </Typography>
                    </Box>
                    <Box>
                    <Typography>{props.user.lastLogin}</Typography>
                        
                    </Box>
                </Box>
            </CardActions>
       </Card>
    </>)
};

export default GetUserDetails;