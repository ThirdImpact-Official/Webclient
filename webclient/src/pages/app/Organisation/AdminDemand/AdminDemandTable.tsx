import { GetAdminDemandDto, ColumnsAdmTable } from "@/interfaces/AdminDemand/GetAdminDemand";
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import { FC, useState } from "react";

interface AdminDemandTableProps
{
    data: GetAdminDemandDto[];
}

const AdminDemandTable:FC<AdminDemandTableProps> = (props) => {
    const [getData,setdata]= useState<GetAdminDemandDto[]>(props.data);
    const columnDt= ColumnsAdmTable;

    return (
        <>
            <GenericTable data={props.data} columns={columnDt} />
        </>
    )
}

export default AdminDemandTable;