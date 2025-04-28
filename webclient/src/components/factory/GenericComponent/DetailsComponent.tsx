import RenderDetail from "./RenderDetails";
import { Box, Typography } from "@mui/material";


interface DetailsProps<T>
{
    data:T;
    columns: {label:string, accessor: keyof T }[];
}

const DetailsComponent=<T,>({data, columns}: DetailsProps<T>)=> {
    if(data === null) {
        return(
        <Box className="items-center flex flex-col">
            <Typography variant="h5">No data</Typography>
        </Box>)
    }
    return(
        <Box sx={{
          
          }}>
            <Box className="items-center m-2 p-4 flex flex-col ">
                <Typography variant="h3" 
                            className="items-center">Details</Typography>
            </Box>
            <Box className="items-center flex flex-col justify-start">
            {columns.map((column)=>
            {
                return <RenderDetail 
                                     key={column.accessor as string} 
                                     label={column.label} 
                                     value={data[column.accessor]} />;
            })}
            </Box>
        </Box>
    );
}

export default DetailsComponent;
