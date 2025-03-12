import { Typography,Box } from "@mui/material";
import GenericTable from '@/components/factory/GenericComponent/GenericTable';
import { GetSessionReservedDto } from "@/interfaces/EscapeGameInterface/Reservation/getSessionReservedDto";
import { FC, useState } from "react";



interface GetReservationTableProps{
    data: GetSessionReservedDto [];
    columns: {label:string; accessor: keyof GetSessionReservedDto}[]
    OnDetails:(org: GetSessionReservedDto) => void;
    OnUpdate:(org: GetSessionReservedDto)=> void;
}
const GetReservationTable :FC<GetReservationTableProps>= ({data,columns,OnDetails,OnUpdate}) => {
    const [table,SetTable]= useState(data);

    const handleDetails = (reservation: GetSessionReservedDto) => {
        OnDetails(reservation);
    }
    const handleUpdate= (reservation: GetSessionReservedDto) => {
        OnUpdate(reservation);
    }
    return(
        <Box>
                <Box className="flex justify-center items-center">
                    <Typography> This is a get method</Typography>
                </Box>
                <Box>
                    <GenericTable data={table}
                                  columns={columns} 
                                  OnDetails={handleDetails} 
                                  OnUpdate={handleUpdate} />
                </Box>
        </Box>
    )
}

export default GetReservationTable;