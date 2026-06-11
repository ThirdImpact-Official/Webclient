import { Box,FormControl,Select,MenuItem,Typography } from "@mui/material";
import * as React from "react";
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import { GetSessionGameDto } from '../../../../interfaces/EscapeGameInterface/Session/getSessionGameDto';


interface GetSessionProps {
    data: GetSessionGameDto[];
    columns: { label:string; accessor: keyof GetSessionGameDto}[]
    onDetails:(item: GetSessionGameDto) => void
    onUpdate:(item: GetSessionGameDto) => void
}
const GetsessionFromEscapeGame : React.FC<GetSessionProps> = (props) => {
    
    const handleDetails=(item:GetSessionGameDto)=> {
        props.onDetails(item);
    }
    const handleUpdate=(item:GetSessionGameDto)=> {
        props.onUpdate(item);
    }
    return(
        <>
            <GenericTable
                data={props.data} 
                columns={props.columns}  
                OnDetails={handleDetails} 
                OnUpdate={handleUpdate} />
        </>
    )
}
export default GetsessionFromEscapeGame;