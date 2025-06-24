import { Box, Button, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

// Fixed interfaces to be consistent
export interface AddSessionGameDto {
    escapeGameId: number;
    date: Date;
    price: number;
    placeAvailable: number;
    placeMaximum: number;
    isRecurrent: boolean;
    sessionDuplicationDto: SessionDuplicationDto | null;
}

interface SessionDuplicationDto {
    sessionGameId: number;
    intervalTime: number;
    startTime: Date; // Changed to Date for consistency
    endTime: Date;   // Changed to Date for consistency
    dayNumber: number;
}

interface AddSessionGameProps {
    dataId: number;
    onSubmit: (data: AddSessionGameDto) => void;
}

const AddSessionGame: FC<AddSessionGameProps> = ({ dataId, onSubmit }) => {
    const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());
    const [isRecurrent, setIsRecurrent] = useState(false);
    const [recurrenceData, setRecurrenceData] = useState({
        intervalTime: 0,
        startTime: dayjs(),
        endTime: dayjs().add(1, 'hour'),
        dayNumber: 0
    });

    const [formValues, setFormValues] = useState({
        price: 0,
        placeAvailable: 0,
        placeMaximum: 0
    });

    const handleDateChange = (selectedDate: Dayjs | null) => {
        setDateValue(selectedDate);
    };

    const handleRecurrenceDateChange = (field: 'startTime' | 'endTime', value: Dayjs | null) => {
        if (!value) return;
        
        setRecurrenceData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        
        setFormValues(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleRecurrenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        
        setRecurrenceData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Validate required fields
        if (!dateValue) {
            alert('Please select a date and time');
            return;
        }

        if (formValues.placeAvailable > formValues.placeMaximum) {
            alert('Available places cannot exceed maximum places');
            return;
        }

        const submissionData: AddSessionGameDto = {
            escapeGameId: dataId,
            date: dateValue.toDate(),
            price: formValues.price,
            placeAvailable: formValues.placeAvailable,
            placeMaximum: formValues.placeMaximum,
            isRecurrent,
            sessionDuplicationDto: isRecurrent ? {
                sessionGameId: 0, // Will be generated server-side
                intervalTime: recurrenceData.intervalTime,
                startTime: recurrenceData.startTime.toDate(),
                endTime: recurrenceData.endTime.toDate(),
                dayNumber: recurrenceData.dayNumber
            } : null
        };

        onSubmit(submissionData);
    };

    return (
        <Box>
            <Typography className='text-center' variant="h6">Add a Session Game</Typography>
            <Box className="flex flex-col items-center justify-center">
                <form onSubmit={handleFormSubmission}>
                    <FormControl className='w-full max-w-md flex flex-col items-center justify-center p-4 space-y-4'>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            inputProps={{ step: "0.01", min: "0" }}
                            onChange={handleChange}
                            value={formValues.price}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Maximum Places"
                            name="placeMaximum"
                            type="number"
                            inputProps={{ min: "1" }}
                            onChange={handleChange}
                            value={formValues.placeMaximum}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Available Places"
                            name="placeAvailable"
                            type="number"
                            inputProps={{ 
                                min: "0", 
                                max: formValues.placeMaximum > 0 ? formValues.placeMaximum.toString() : undefined 
                            }}
                            onChange={handleChange}
                            value={formValues.placeAvailable}
                            required
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Game Date & Time"
                                value={dateValue}
                                onChange={handleDateChange}
                                className="w-full"
                            />
                        </LocalizationProvider>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isRecurrent}
                                    onChange={(e) => setIsRecurrent(e.target.checked)}
                                    name="isRecurrent"
                                />
                            }
                            label="Is this a recurring session?"
                        />

                        {isRecurrent && (
                            <Box className="w-full space-y-4 p-4 border rounded">
                                <Typography variant="subtitle1">Recurrence Settings</Typography>
                                
                                <TextField
                                    fullWidth
                                    label="Interval Time (minutes)"
                                    name="intervalTime"
                                    type="number"
                                    inputProps={{ min: "0" }}
                                    onChange={handleRecurrenceChange}
                                    value={recurrenceData.intervalTime}
                                />

                                <TextField
                                    fullWidth
                                    label="Day Number"
                                    name="dayNumber"
                                    type="number"
                                    inputProps={{ min: "0", max: "6" }}
                                    onChange={handleRecurrenceChange}
                                    value={recurrenceData.dayNumber}
                                    helperText="0 = Sunday, 1 = Monday, ..., 6 = Saturday"
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Start Time"
                                        value={recurrenceData.startTime}
                                        onChange={(value) => handleRecurrenceDateChange('startTime', value)}
                                        className="w-full"
                                    />

                                    <DateTimePicker
                                        label="End Time"
                                        value={recurrenceData.endTime}
                                        onChange={(value) => handleRecurrenceDateChange('endTime', value)}
                                        className="w-full"
                                    />
                                </LocalizationProvider>
                            </Box>
                        )}

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            color="primary"
                            size="large"
                        >
                            Create Session
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Box>
    );
};

export default AddSessionGame;