import FormInput from '@/components/factory/GenericComponent/FormInput';
import { AddSessionGameDto } from '@/interfaces/EscapeGameInterface/Session/addSessionGameDto';
import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import dayjs from 'dayjs';
interface AddEscapeGameformProps
{
    dataId: number;
}
/**
 * A component to add a session game to an escape game. It displays a form
 * with fields for the price, place maximum, place available and a date picker
 * for the date. The component is a controlled component and when the form
 * is submitted, it calls the onSubmit function passed as a prop.
 *
 * @param {{dataId: number}} props The props object.
 * @param {number} props.dataId The id of the escape game.
 * @returns {React.ReactElement} The react component.
 */
const AddSessionGame: FC<AddEscapeGameformProps> = ({ dataId }) => {
    const [dateValue, setDateValue]= useState(dayjs());
    const [formValues, setFormValues] = useState<AddSessionGameDto>({
        price: 0,
        escapeGameId: dataId,
        date:null,
        placeavailable: 0,
        pLacemaximum: 0
    });
    const handleDateChange = (selectedDate: dayjs.Dayjs | null) => {
        if(selectedDate)
        {
            setDateValue(selectedDate);
            setFormValues((prevValues) => ({
                ...prevValues,
                date: selectedDate ? selectedDate.format() : null,
            }));
        }
            
    };

    return (
        <Box>
            <Typography className='text-center' variant="h6">Add a Session Game</Typography>
            <Box className="w-[400px]">
                <form>
                    <Box className=" p-10 shadow-sm space-y-4">
                            <FormInput
                                label="Price"
                                name="price"
                                onChange={Number}
                                value={formValues.price}
                            />
                            <FormInput
                            
                                label="Place Maximum"
                                name="placeMaximum"
                                onChange={Number}
                                value={formValues.pLacemaximum}
                            />
                            <FormInput
                                label="Place Available"
                                name="placeAvailable"
                                onChange={Number}
                                value={formValues.placeavailable}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Select Date"
                                    value={dateValue}
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                    </Box>
                    <Box className="items-center flex flex-col p-5">
                        <Button variant="contained" color='primary' onClick={()=>console.log(formValues)}> Update </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AddSessionGame;
