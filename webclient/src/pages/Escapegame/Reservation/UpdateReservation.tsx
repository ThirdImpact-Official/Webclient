import { Box } from "@mui/material";
import { UpdateEscapeGameDto } from '../../../interfaces/EscapeGameInterface/EscapeGame/updateEscapeGameDto';
import { FC ,useState} from "react";
import { GetEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";


interface UpdateReservationProps {
    data: GetEscapeGameDto;
}


/**
 * A React functional component for updating a reservation. It takes in data
 * of type `GetEscapeGameDto` and initializes a state for the reservation form
 * using this data. The component returns a styled Box containing a placeholder
 * paragraph indicating an update method.
 *
 * @param {Object} props - The props object containing data for the reservation.
 * @returns {React.ReactElement} The component that provides the update interface.
 */


const UpdateReservation: FC<UpdateReservationProps> = ({ data }) => {
  const [reservationData, setReservationData] = useState<UpdateEscapeGameDto>({
    ...data,
  });

  return (
    <Box className="flex items-center justify-center shadow-sm">
      <form>
      </form>
      <p>This is an update method</p>
    </Box>
  );
};

export default UpdateReservation;