import FormInput from '@/components/factory/GenericComponent/FormInput';
import { AddSessionGameDto } from '@/interfaces/EscapeGameInterface/Session/addSessionGameDto';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { FC, ReactEventHandler, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import dayjs from 'dayjs';
interface AddEscapeGameformProps
{
    dataId: number;
    onSubmit: (data: AddSessionGameDto) => void
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
const AddSessionGame: FC<AddEscapeGameformProps> = ({ dataId,onSubmit }) => {
    const [dateValue, setDateValue]= useState(dayjs());
    const [formValues, setFormValues] = useState<AddSessionGameDto>({
        price: 0,
        escapeGameId: dataId,
        date:null,
        placeAvailable: 0,
        placeMaximum: 0
    });
    /**
     * permet de mettre a jour la date
     * au sein du formulaire
     * @param selectedDate 
     */
    const handleDateChange = (selectedDate: dayjs.Dayjs | null) => {
        setDateValue(selectedDate ?? dayjs());
        setFormValues((prevValues) => ({
            ...prevValues,
            date: selectedDate ? selectedDate.toDate() : null,
        }));
    };
    /**
     * 
     * @param event permet de mettre a jour les champs du formulaire
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    /**
     * permet de faire la soumission du formulaire
     * @param event 
     */
    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ ...formValues, date: dateValue.toDate() });
    };
    return (
        <Box>
            <Typography className='text-center' variant="h6">Add a Session Game</Typography>
            <Box className="flew flex-col columns-1 text-center items-center justify-center">
                <form onSubmit={handleFormSubmission}>
                    <FormControl className='w-1/2 flex flex-col items-center justify-center hover:shadow-lg transition-all'>
                        <Box className=" p-10 shadow-sm space-y-4">
                                <TextField
                                    label="Price"
                                    name="price"
                                    type='number'
                                    onChange={handleChange}
                                    value={formValues.price}
                                />
                                <TextField
                                
                                    label="Place Maximum"
                                    name="placeMaximum"
                                    type='number'
                                    onChange={handleChange}
                                    value={formValues.placeMaximum}
                                />
                                <TextField
                                    label="Place Available"
                                    name="placeAvailable"
                                    type='number'
                                    onChange={handleChange}
                                    value={formValues.placeAvailable}
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
                            <Button
                                variant="contained" 
                                type='submit'
                                color='primary'> Update </Button>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </Box>
    );
};

export default AddSessionGame;
