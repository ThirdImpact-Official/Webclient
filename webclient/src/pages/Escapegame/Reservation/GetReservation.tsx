import { Box, Button, Divider} from "@mui/material"
import DetailsComponent from '@/components/factory/GenericComponent/DetailsComponent';
import { GetSessionReservedDto } from '../../../interfaces/EscapeGameInterface/Reservation/getSessionReservedDto';
import { FC, useState } from "react";
import { DetailsProps } from "@/interfaces/common/detailsProps";


/**
 * GetReservationDetails is a React functional component that displays the details
 * of a reservation using the DetailsComponent. It accepts reservation data and
 * column definitions as props and renders buttons for reservation actions.
 *
 * @param {GetSessionReservedDto} data - The reservation data to display.
 * @param {Array<{label: string; accessor: keyof GetSessionReservedDto}>} cols - 
 *        The column definitions for the reservation details.
 * @returns {JSX.Element} A JSX element containing the reservation details and action buttons.
 */

const GetReservationDetails: FC<DetailsProps<GetSessionReservedDto>> = ({
  data,
  cols,
}) => {
  const [reservationDetails] =
    useState<GetSessionReservedDto>(data);

  return (
  <>
    <Box className="flex text-center  justify-center items-center space-y-4 p-4 m-4 ]">
      <DetailsComponent
        data={reservationDetails}
        columns={cols}
      />
    </Box>
    <Box className="items-center flex flex-rows justify-evenly ">
                       
        <Button color="success" 
                onClick={()=>console.log(reservationDetails)}>Reservation</Button>
        <Divider orientation="vertical" 
                  flexItem />
        <Button color="primary" 
                onClick={()=>console.log("update")} >Update</Button>
        <Divider orientation="vertical" 
                  flexItem />
        <Button onClick={()=>console.log("delete")} color="error">Delete</Button>
                   
    </Box>
  </>
  );

};
export default GetReservationDetails;
