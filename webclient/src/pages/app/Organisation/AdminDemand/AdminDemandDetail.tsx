import { GetAdminDemandDto,ColumnsAdm } from "@/interfaces/AdminDemand/GetAdminDemand";
import { FC, useState } from "react";
import { data } from 'react-router-dom';
import DetailsComponent from '@/components/factory/GenericComponent/DetailsComponent';

interface AdminDetailsProps {
    data: GetAdminDemandDto
}
const AdminDetails:FC<AdminDetailsProps> = (props) => {

    const [adminDetail,setAdminDetails] = useState<GetAdminDemandDto | null>(props.data);
    const columns= ColumnsAdm

    return(
        <>
            <DetailsComponent
                data={adminDetail} 
                columns={columns}  />        
        </>) ;   
};

export default AdminDetails;