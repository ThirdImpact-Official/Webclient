import { GetUserDto } from "@/interfaces/User/GetUserDto";
import { Box, Divider, Typography } from "@mui/material";

import { FC } from "react";

interface UserOrganisationDetailsProps
{ 
    data: GetUserDto;
}

const UserOrganisationDetails: FC<UserOrganisationDetailsProps> = ({ data }) => {
    return (
        <Box className="flex items-center  w-3/6 h-full">
            <Box className="space-y-4 px-4">
                <Typography variant="h5" align="center">
                    User Organisation
                </Typography>
                <Box className="space-y-6">
                    <Box className="flex gap-2 justify-between">
                        <Typography> ID </Typography>
                        <Typography>{data.userId}</Typography>
                    </Box>
                    <Box className="flex gap-2 justify-between">
                        <Typography>First Name:</Typography>
                        <Typography>{data.firstName}</Typography>
                    </Box>
                    <Box className="flex gap-2 justify-between">
                        <Typography>Last Name:</Typography>
                        <Typography>{data.lastName}</Typography>
                    </Box>
                    <Box className="flex gap-2 justify-between">
                        <Typography>Email:</Typography>
                        <Typography>{data.email}</Typography>
                    </Box>
                    <Box className="flex gap-2 justify-between">
                        <Typography>Email Verified:</Typography>
                        <Typography>{String(data.emailVerified)}</Typography>
                    </Box>

                    <Box className="flex gap-2 justify-between">
                        <Typography>Report Count:</Typography>
                        <Typography>{data.reportCount}</Typography>
                    </Box>
                    <Box className="flex gap-2 justify-between">
                        <Typography>Username:</Typography>
                        <Typography>{data.username}</Typography>
                    </Box>
                    <Divider />
                </Box>
            </Box>
        </Box>
    );
}

export default UserOrganisationDetails;