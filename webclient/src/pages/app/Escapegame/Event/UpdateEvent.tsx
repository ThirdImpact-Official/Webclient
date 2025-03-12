import { Box, TextField, FormControl, Button } from '@mui/material';
import { UpdateEventDto } from '../../../interfaces/EscapeGameInterface/Event/updateEventDto';
import { GetEventDto } from "@/interfaces/EscapeGameInterface/Event/getEventDto";
import React, { useState, FC } from "react";

interface UpdateEventProps {
    data: GetEventDto;
    onSubmit: (event: UpdateEventDto) => void;
}

/**
 * UpdateEvent is a React functional component that renders a form for updating event details.
 *
 * @param {UpdateEventProps} props - The component props
 * @returns {React.ReactElement} The component that provides the update form interface.
 */
const UpdateEvent: FC<UpdateEventProps> = ({ data, onSubmit }) => {
  const [eventFormData, setEventFormData] = useState<UpdateEventDto>({
    ...data,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventFormData((prevState) => ({
      ...prevState,
      [name]: new Date(value),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(eventFormData);
  };

  return (
    <Box className="flex flex-col gap-4 items-center justify-center">
      <form onSubmit={handleSubmit}>
        <FormControl className="space-y-4 bg-white m-4 p-4">
          <Box className="space-y-4 m-2 p-4">
            <Box>

            <TextField
              label="Event Title"
              name="eventTitle"
              value={eventFormData.eventTitle}
              onChange={handleFormChange}
              required
              />
        </Box>
        <Box>
            <TextField
            
              label="Event Description"
              name="eventDescription"
              value={eventFormData.eventDescription}
              onChange={handleFormChange}
              multiline
              rows={5}
              required
            />

        </Box>
        <Box>
            <TextField
            
              label="Start Date"
              name="startDate"
              type="datetime-local"
              value={eventFormData.startDate.toISOString().slice(0, 16)}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
            />
        </Box>
        <Box>
            <TextField
              label="End Date"
              name="endDate"
              type="datetime-local"
              value={eventFormData.endDate.toISOString().slice(0, 16)}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
            />
        </Box>
          </Box>
          <Box className="flex items-center justify-center m-2 p-4">
            <Button type="submit" variant="contained" color="primary">
              Update Event
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default UpdateEvent;
