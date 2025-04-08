import { Box, Button, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { UpdateSessionGameDto } from '@/interfaces/EscapeGameInterface/Session/updateSessionGameDto';
import { FC, useState } from "react";
import dayjs from "dayjs";
import FormInput from "@/components/factory/GenericComponent/FormInput";
import { GetSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";

interface UpdateSessionGameProps
{
    data: GetSessionGameDto;

}

const UpdateSessionGame:FC<UpdateSessionGameProps> =({data})=> 
{
    const [dateValue, setDateValue]= useState(dayjs(data.date));

    const [formValues, setFormValues] = useState<UpdateSessionGameDto>({
        segId:data.segId,
        price: data.price,
        escapeGameId: data.escapeGameId,
        date:dateValue.toDate(),
        placeavailable: data.placeavailable,
        pLacemaximum: data.pLacemaximum
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
    if(!data || !data.date)
    {
        return <Typography>les données de la session ne sont pas disponible </Typography>;
    }
    else{
        return (
        <>
            <Box>
                <form>
                    <Box className=" p-10 shadow-sm space-y-4 w-[400px]">
                        <Box>
                            <Typography> ID : {formValues.segId}</Typography>
                        </Box>
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
        </>);

    }


}
export default UpdateSessionGame;
