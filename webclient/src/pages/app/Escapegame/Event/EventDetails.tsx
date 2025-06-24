import { Box,Divider,Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { GetEventDto } from "@/interfaces/EscapeGameInterface/Event/getEventDto";
import DetailsComponent from "@/components/factory/GenericComponent/DetailsComponent";
import { on } from 'events';
import FormUtils  from "@/classes/FormUtils";

interface EventDetailsProps{
    data:GetEventDto;
    columns:{label:string; accessor: keyof GetEventDto}[];
    onUpdate: (event: GetEventDto) => void
}
const EventDetails: React.FC<EventDetailsProps> = ({ data, columns, onUpdate }) => {
  const handleUpdate = () => {
    onUpdate(data);
  };

  const handleDelete = () => {
    console.log("onDelete", data);
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {data.eventTitle}
            </Typography>
            <Typography color="text.secondary">
              {data.eventDescription}
            </Typography>
          </Box>

          <Divider />
        <Box className="p-4 flex flex-col ">

          <Typography variant="h6" gutterBottom>
          Informations de l'activité
        </Typography>
        <Typography variant="h6" gutterBottom>
        Date de début : {FormUtils.FormatDate(data.startDate)} - Date de fin : {FormUtils.FormatDate(data.endDate)}
        </Typography>
        </Box>


          <Divider />

          <Box display="flex" justifyContent="flex-center">
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{ minWidth: 120 }}
            >
              Modifier
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default EventDetails; 