import { GetAdminDemandDto, ColumnsAdmTable } from "@/interfaces/AdminDemand/GetAdminDemand";
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import { FC, useState } from "react";

import { Typography,Box } from "@mui/material";

interface AdminDemandTableProps
{
    data: GetAdminDemandDto[];
    onDetails: (org: GetAdminDemandDto) => void
}

const AdminDemandTable:FC<AdminDemandTableProps> = (props) => {
    const [getData,setdata]= useState<GetAdminDemandDto[]>(props.data);
    const columnDt= ColumnsAdmTable;

    const handleDetails = (item:GetAdminDemandDto)=>{
        props.onDetails(item);
    }
    return (
        <>
            <Box className="flex justify-center items-center">
                <Typography variant="h4" className="m-2 p-2">
                     Demande Administrateur</Typography>
            </Box>
            <GenericTable 
                data={props.data} 
                OnDetails={handleDetails}
                columns={columnDt} />
        </>
    )
}

export default AdminDemandTable;