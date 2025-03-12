import { Box, FormControl, TextField,Button} from "@mui/material";
import { useState,FC } from "react";
import { AddEventDto } from "@/interfaces/EscapeGameInterface/Event/addEventDto";

interface CreateEventProps {
    onSubmit: (event: AddEventDto) => void;
}

/**
 * CreateEvent is a React functional component that renders a form for creating a new event.
 * The component is reusable and can be used in multiple places throughout the application.
 * The component accepts an onSubmit function that is called when the form is submitted.
 * The onSubmit function is expected to accept a single argument of type AddEventDto, which
 * contains the event data entered by the user.
 *
 * The component state is an object of type AddEventDto, which contains the event data
 * entered by the user. The state is initially set to an object with default values of
 * 0 for the escapegameId and empty strings for the eventTitle and eventDescription.
 *
 * The component contains a form with input fields for the eventTitle and eventDescription.
 * The form also includes a submit button that calls the onSubmit function when clicked.
 *
 * @param {CreateEventProps} props - The component props.
 * @param {Function} props.onSubmit - The function to call when the form is submitted.
 * @returns {React.ReactElement} The component that provides the create form interface.
 */

const CreateEvent :FC<CreateEventProps> = ({onSubmit}) => {
    const [eventFormData, setEventFormData] = useState<AddEventDto | null>({
        escapegameId: 0,
        eventTitle: "",
        eventDescription: "",
        StartDate: new Date(),
        EndDate: new Date(),
    });

    /**
     * Updates the event form data state with the new value from the input field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.
     * The event's target should contain the name and value of the input field, which
     * is used to update the corresponding field in the event form data state.
     */
    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEventFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    /**
     * Handles the form submission event by invoking the provided onSubmit function
     * with the current event form data.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        onSubmit(eventFormData);
    }
    /**
     * Updates the event form data state with a new date for the specified field.
     *
     * @param {string} name - The name of the field to be updated in the event form data.
     * @param {Date | null} date - The new date value to be set for the specified field. 
     * If null, the field value will not be updated.
     */
    const handleDateChange = (name: string, date: Date | null) => {
        if (date) {
            setEventFormData((prevState) => ({
                ...prevState,
                [name]: date,
            }));
        }
    };
    return (
        <Box className="flex flex-col items-center justify-center m-2 p-4">
            <form onSubmit={handleSubmit}>
                <FormControl className=" bg-white m-4">
                    <Box className="m-2 p-4 space-y-4">

                    {Object.entries(eventFormData).map(([name, value], index) => {
                        // Special handling for date fields
                        if (name === "StartDate" || name === "EndDate") {
                            return (
                                <Box key={index}>
                                    <TextField
                                        label={name}
                                        name={name}
                                        type="datetime-local"
                                        value={value instanceof Date ? value.toISOString().slice(0, 16) : value}
                                        onChange={(e) => handleDateChange(name, new Date(e.target.value))}
                                        InputLabelProps={{ shrink: true }}
                                        />
                                </Box>
                            );
                        }
                        
                        return (
                            <Box key={index}>
                                <TextField
                                    label={name}
                                    name={name}
                                    value={value}
                                    rows={3}
                                    multiline
                                    onChange={handleFormChange}
                                    />
                            </Box>
                        );
                    })}
                    </Box>
                    <Box className="flex items-center justify-center m-2 p-4">
                        <Button type="submit" variant="contained">Submit</Button>
                    </Box>
                </FormControl>
            </form>
        </Box>
    );
};
export default CreateEvent;