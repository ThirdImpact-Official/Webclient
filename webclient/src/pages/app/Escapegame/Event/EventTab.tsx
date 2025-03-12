import { GetEventDto } from "@/interfaces/EscapeGameInterface/Event/getEventDto";
import { Box, Typography,TableCell,TableRow,Table,TableHead,TableContainer,Paper,TableBody,Button } from "@mui/material";
import { useState,FC } from "react";

interface EventTabsProp {
    data: GetEventDto[] | null;
    OnDetail?: (event: GetEventDto) => void;
    OnUpdate?: (event: GetEventDto) => void;
}

const EventTab:FC<EventTabsProp> = ({data,OnDetail, OnUpdate}) => {
    return(
        <Box>EventTab 
            <Typography variant="body1">Event</Typography>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End date</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Update</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item) => (
                        <TableRow key={item.eventId}>
                            <TableCell>{item.eventId}</TableCell>
                            <TableCell>{item.eventTitle}</TableCell>
                            <TableCell>{item.eventDescription}</TableCell>
                            <TableCell>
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                }).format(new Date(item.startDate))}
                            </TableCell>
                            <TableCell>
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                }).format(new Date(item.endDate))}
                            </TableCell>
                            <TableCell>
                                <Button variant='contained' onClick={() => OnDetail?.(item)}>Details</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant='contained' onClick={() => OnUpdate?.(item)}>Update</Button>
                            </TableCell>
                         
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>)
};
export default EventTab;
