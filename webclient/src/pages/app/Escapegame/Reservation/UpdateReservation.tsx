import { Box, FormControl, Button, TextField, FormControlLabel } from '@mui/material';

import { FC ,useState} from "react";
import { UpdateSessionReservedDto } from "@/interfaces/EscapeGameInterface/Reservation/updateSessionReservedDto";
import { GetSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import { GetSessionReservedDto } from "@/interfaces/EscapeGameInterface/Reservation/getSessionReservedDto";
import { CheckBox } from '@mui/icons-material';
import { Form } from 'react-router-dom';


interface UpdateReservationProps {
    data: GetSessionReservedDto;
    onSubmit: (data: UpdateSessionReservedDto) => void;
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


const UpdateReservation: FC<UpdateReservationProps> = ({ data,onSubmit }) => {
  const [reservationData, setReservationData] = useState<UpdateSessionReservedDto>({
    ...data,
  });
  const handleSubmit = () => onSubmit(reservationData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value}=event.target;
    setReservationData(prev =>({
      ...prev,  
      [name]: name ==='id' || name==='sessionGameId' ? Number(value) : value
    }))
  }

  return (
    <Box className="flex items-center justify-center shadow-sm">
      <FormControl>
        <Box>
          
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={reservationData.content}
                    onChange={handleChange}
                 />
              <FormControlLabel
                onChange={handleChange} 
                control={<CheckBox />} label="Active" />
                
              <FormControlLabel
                onChange={handleChange} 
                control={<CheckBox />} label="Active" />    
        </Box>
        <Box>
          <Button onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </FormControl>
      <p>This is an update method</p>
    </Box>
  );
};

export default UpdateReservation;