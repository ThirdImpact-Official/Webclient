import DetailsComponent from "@/components/factory/GenericComponent/DetailsComponent";
import { GetActivityPlaceDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/getActivityPlaceDto";
import { Button, Divider,Box } from "@mui/material";
import { FC, useState } from "react";

interface ActivityProps {
    data: GetActivityPlaceDto;
    columns: { label: string; accessor: keyof GetActivityPlaceDto }[];
    OnUpdate: (item:GetActivityPlaceDto) => void;
}

const ActivityDetails:FC<ActivityProps> = (prop) => {
    const [detailData]= useState(prop.data);
    const handleUpdate= ()=> {
     prop.OnUpdate(detailData);
    }
    return (
        <>
            <Box>
                <DetailsComponent
                    columns={prop.columns}
                    data={detailData} />

            </Box>
            <Divider className="mt-4 p-4" orientation="horizontal" flexItem />
            <Box>
                <Button onClick={()=>handleUpdate}>Update</Button>
                <Divider className="mt-4 p-4" 
                         orientation="vertical" 
                         flexItem />
            </Box>
        </>
    )
}
export default ActivityDetails;