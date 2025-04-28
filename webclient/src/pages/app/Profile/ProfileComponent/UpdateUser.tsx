import { GetUserDto } from '@/interfaces/User/GetUserDto';
import { UpdateUserDto } from '@/interfaces/User/UpdateUserDto';
import { Grid2, Grid, Typography, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { Update } from 'vite/types/hmrPayload.js';

interface UpdateUserProps {
    data: GetUserDto;
}
const UpdateUserComponent:FC<UpdateUserProps> = (props) => {
    const [updateUser,setUpdateUser]= useState<UpdateUserDto>({
        id: props.data.id,
        username: props.data.username,
        email: props.data.email,
        firstName: props.data.firstName,
        lastName: props.data.lastName,
    });
    return (<>
        <Grid2 className="bg-white column items-center mx-15 space-y-6 px-10">
             <section>
                <Typography>update Profile</Typography>
             </section>
            <Grid2>
                <TextField 
                    rows={1} 
                    name='name' 
                    id="outlined-basic" 
                    label="username" 
                    variant="outlined" />
            </Grid2>
            <Grid2> 
                <TextField 
                    rows={1}  
                    name='email' 
                    id="outlined-basic" 
                    label="email" 
                    variant="outlined" />
            </Grid2> 
            <Grid2> 
                <TextField 
                rows={1}   
                id="outlined-basic"
                label="firstname" 
                variant="outlined" />
            </Grid2> 
            <Grid2> 
                <TextField rows={1} 
                 name='firstName' id="outlined-basic"
                 label="lastname" variant="outlined" />
            </Grid2> 
          
        </Grid2>
    </>)

};
export default UpdateUserComponent;