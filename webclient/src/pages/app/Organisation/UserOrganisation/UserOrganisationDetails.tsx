import { GetUserDto } from "@/interfaces/User/GetUserDto";
import { Avatar, Box, Typography, Stack, Divider, Paper,Grid2 } from "@mui/material";

import { FC } from "react";

interface UserOrganisationDetailsProps {
    data: GetUserDto;
}

const UserOrganisationDetails: FC<UserOrganisationDetailsProps> = ({ data }) => {
    return (
        <Grid2  sx={{ p: 4, borderRadius: 0, maxWidth: 900, mx: 'auto' }}>
            <Stack spacing={3} alignItems="center">
                <Typography variant="h5">User Organisation</Typography>
                <Avatar
                    sx={{ width: 160, height: 160, fontSize: 48 }}
                    src={data.picture}
                >
                    {data.firstName.charAt(0)}
                </Avatar>
            </Stack>

            <Grid2 container spacing={2} mt={4}>
                {[
                    { label: "Id", value: data.id },
                    { label: "First Name", value: data.firstName },
                    { label: "Last Name", value: data.lastName },
                    { label: "Email", value: data.email },
                    { label: "Email Verified", value: String(data.emailVerified) },
                    { label: "Report Count", value: data.reportCount },
                    { label: "Username", value: data.username },
                ].map(({ label, value }) => (
                    <Grid2 size={6}
                        sx={{ sm: "6",
                             alignItems: "center",}}
                     key={label}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6" color="text.secondary">{label}</Typography>
                            <Typography variant="body1">{value}</Typography>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>

            <Divider sx={{ mt: 4 }} />
        </Grid2>
    );
};

export default UserOrganisationDetails;
