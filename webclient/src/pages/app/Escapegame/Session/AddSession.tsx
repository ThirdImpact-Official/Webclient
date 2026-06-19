import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { FC, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

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
  startTime: Date;
  endTime: Date;
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
    endTime: dayjs().add(1, "hour"),
    dayNumber: 0,
  });

  const [formValues, setFormValues] = useState({
    price: 0,
    placeAvailable: 0,
    placeMaximum: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleRecurrenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setRecurrenceData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dateValue) return alert("Please select a date");

    if (formValues.placeAvailable > formValues.placeMaximum)
      return alert("Available places cannot exceed maximum places");

    const submissionData: AddSessionGameDto = {
      escapeGameId: dataId,
      date: dateValue.toDate(),
      price: formValues.price,
      placeAvailable: formValues.placeAvailable,
      placeMaximum: formValues.placeMaximum,
      isRecurrent,
      sessionDuplicationDto: isRecurrent
        ? {
            sessionGameId: 0,
            intervalTime: recurrenceData.intervalTime,
            startTime: recurrenceData.startTime.toDate(),
            endTime: recurrenceData.endTime.toDate(),
            dayNumber: recurrenceData.dayNumber,
          }
        : null,
    };

    onSubmit(submissionData);
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#24292f", mb: 2, textAlign: "center" }}
        >
          Add a Session Game
        </Typography>

        <form onSubmit={handleFormSubmission}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                max:
                  formValues.placeMaximum > 0
                    ? formValues.placeMaximum.toString()
                    : undefined,
              }}
              onChange={handleChange}
              value={formValues.placeAvailable}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Game Date & Time"
                value={dateValue}
                onChange={setDateValue}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isRecurrent}
                  onChange={(e) => setIsRecurrent(e.target.checked)}
                />
              }
              label="Is this a recurring session?"
            />

            {isRecurrent && (
              <Box
                sx={{
                  border: "1px solid #d0d7de",
                  borderRadius: "6px",
                  p: 2,
                  mt: 1,
                  backgroundColor: "#f6f8fa",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Recurrence Settings
                </Typography>

                <TextField
                  fullWidth
                  label="Interval Time (minutes)"
                  name="intervalTime"
                  type="number"
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
                    onChange={(v) =>
                      v && setRecurrenceData((p) => ({ ...p, startTime: v }))
                    }
                    sx={{ width: "100%", mt: 2 }}
                  />

                  <DateTimePicker
                    label="End Time"
                    value={recurrenceData.endTime}
                    onChange={(v) =>
                      v && setRecurrenceData((p) => ({ ...p, endTime: v }))
                    }
                    sx={{ width: "100%", mt: 2 }}
                  />
                </LocalizationProvider>
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#2da44e",
                textTransform: "none",
                fontWeight: 600,
                mt: 2,
                "&:hover": { backgroundColor: "#2c974b" },
              }}
            >
              Create Session
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSessionGame;
