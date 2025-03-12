import { Box,Divider,Button } from "@mui/material";
import { GetEventDto } from "@/interfaces/EscapeGameInterface/Event/getEventDto";
import DetailsComponent from "@/components/factory/GenericComponent/DetailsComponent";
import { on } from 'events';


interface EventDetailsProps{
    data:GetEventDto;
    columns:{label:string; accessor: keyof GetEventDto}[];
    onUpdate: (event: GetEventDto) => void
}
const EventDetails:React.FC<EventDetailsProps> =({data,columns,onUpdate})=>{
    const onUpdateButton = (event: GetEventDto) =>
    {
        onUpdate(event);
    };
    const onDeleteButton = (event: GetEventDto) =>
    { 
        console.log("", event);
    };
    return (
        <Box className=" flex flex-col items-center justify-center">
            <Box className="items-center justify-center">
                <DetailsComponent data={data} columns={columns} />
            </Box>
            <Divider className="mt-4 p-4" orientation="horizontal" flexItem />
            <Box className="flex flex-row  justify-center items-center gap-4">
                <Button color="primary" onClick={() => onUpdateButton(data)}>Update</Button>
                <Divider orientation='vertical' flexItem />
                <Button color="error" onClick={() => onUpdateButton(data)}>Delete</Button>
            </Box>
        </Box>
    )
}
export default EventDetails; 