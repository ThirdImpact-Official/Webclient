import { Box, Divider, Typography } from "@mui/material";

const NotFound = () => {
    return (
        <Box className="flex items-center justify-center bg-slate-400 m-10 p-20 border-collapse border border-black/10 b-rounded-4 border-r-8 shadow-sm">
            <Box className="flex flex-col items-center m-10 p-20 justify-center">
                <Divider />
                <Typography variant="h1">404</Typography>
                <img src="./404.png" />
                <Divider />
            </Box>
        </Box>
    );
}

export default NotFound;