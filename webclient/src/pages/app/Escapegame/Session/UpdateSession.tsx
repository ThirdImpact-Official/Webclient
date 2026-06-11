import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { UpdateSessionGameDto } from '@/interfaces/EscapeGameInterface/Session/updateSessionGameDto';
import { FC, useState } from "react";
import dayjs from "dayjs";
import FormInput from "@/components/factory/GenericComponent/FormInput";
import { GetSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import { on } from 'events';

interface UpdateSessionGameProps
{
    data: GetSessionGameDto;
    onSubmit: (sessionGame: UpdateSessionGameDto) => void;
}

const UpdateSessionGame:FC<UpdateSessionGameProps> =({data,onSubmit})=> 
{
    const [dateValue, setDateValue]= useState(dayjs(data.date));

    const [formValues, setFormValues] = useState<UpdateSessionGameDto>({
        segId:data.segId,
        price: data.price,
        escapeGameId: data.escapeGameId,
        date:dateValue.toDate(),
        placeAvailable: data.placeAvailable,
        placeMaximum: data.placeMaximum
    });
        function FormatDate(dateString: string | null | undefined) {
            if (!dateString) return 'Date inconnue';
        
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? 'Date inconnue' : new Intl.DateTimeFormat('fr-FR').format(date);
        
        }
    const handleDateChange = (newDate: dayjs.Dayjs | null) => {
        if (newDate) {
            setDateValue(newDate);
            setFormValues((prevValues) => ({
                ...prevValues,
                date: new Date(newDate.format()),
            }));
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((previousValues) => ({
            ...previousValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formValues);
    }

    if(!data || !data.date)
    {
        return <Typography>les données de la session ne sont pas disponible </Typography>;
    }
    else{
        return (
        <>
            <Typography className='text-center' variant="h6">Update a Session Game</Typography>
            <Box className="flex justify-center items-center text-center">
                <form onSubmit={handleSubmit}>
                    <FormControl className=" p-10 shadow-sm space-y-4 w-1/2 hover:shadow-lg transition-all">
                        <Box className=" p-10 shadow-sm space-y-4">
                            <Box>
                                <Typography> ID : {formValues.segId}</Typography>
                            </Box>
                                <TextField
                                    label="Price"
                                    name="price"
                                    onChange={handleChange}
                                    value={formValues.price}
                                />
                                <TextField
                                    label="Place Maximum"
                                    name="placeMaximum"
                                    onChange={handleChange}
                                    value={formValues.placeMaximum}
                                />
                                <TextField
                                    label="Place Available"
                                    name="placeAvailable"
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
                    </FormControl>
                    <Box className="items-center flex flex-col p-5">
                        <Button 
                            variant="contained" 
                            color='primary' 
                            type="submit"> Update </Button>
                    </Box>
                </form>
            </Box>
        </>);

    }


}
export default UpdateSessionGame;
