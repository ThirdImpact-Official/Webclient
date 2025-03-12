import { GetSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import { Box,Divider,Button } from "@mui/material";
import { FC } from "react";
import DetailsComponent from "@/components/factory/GenericComponent/DetailsComponent";
interface SessionDetailsProps {
    data : GetSessionGameDto ;
    columns: {label:string; accessor: keyof GetSessionGameDto }[]
    OnUpdate: (org: GetSessionGameDto) => void

}
const SessionDetails :FC<SessionDetailsProps> = (prop)=> {
    const handleUpdate=(item: GetSessionGameDto)=>
    {
        prop.OnUpdate(item);
    }
   
    return (
        <Box className="flex flex-col items-center justify-center ">    
            <DetailsComponent  data={prop.data} 
                                       columns={prop.columns} />
            <Divider className="mt-4 p-4" orientation="horizontal" flexItem />
            <Box className="items-center flex flex-row ">
                       
                <Button color="success" 
                        onClick={()=>window.location.href=`session/${prop.data.segId}/reservation`}>Reservation</Button>
                <Divider orientation="vertical" 
                            flexItem />
                <Button color="primary" 
                        onClick={()=>handleUpdate} >Update</Button>
                <Divider orientation="vertical" 
                            flexItem />
                <Button color="error">Delete</Button>
                        
            </Box>
        </Box>
    )
}

export default SessionDetails;
