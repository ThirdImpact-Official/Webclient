import { Box, Typography, Snackbar, Alert, Tabs, Tab, Grid2, Skeleton, Modal, FormControl, Button, Pagination, CircularProgres,Card,CardContent } from '@mui/material';
import GenericTabs,{TabItem} from "@/components/factory/GenericComponent/TabGénéric";
import { useEffect, useRef, useState } from 'react';
import EventTab from './EventTab';
import { GetEventDto, EventTypeColumns } from '@/interfaces/EscapeGameInterface/Event/getEventDto';
import DetailsComponent from '@/components/factory/GenericComponent/DetailsComponent';
import CreateEvent from './CreateEvent';
import UpdateEvent from './UpdateEvent';
import { AddEventDto } from '@/interfaces/EscapeGameInterface/Event/addEventDto';
import { UpdateEventDto } from '@/interfaces/EscapeGameInterface/Event/updateEventDto';
import { useParams } from 'react-router-dom';
import EventDetails from './EventDetails';
import { EscapeGameColumns, GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import EscapeGameDetails from '../EscapegameDetails';
import { mock } from 'node:test';
import Item from '@/components/factory/GenericComponent/Item';
import { EscapeGameAction } from '@/actions/EscapeGameAction';
import { useLoading } from '@/context/ContextHook/LoadingContext';
import { useModal } from '@/context/ContextHook/ModalContext';
import { PaginationResponse } from '@/interfaces/ServiceResponse';
import ModalComponent from '@/components/factory/GenericComponent/Modal';

const EventComponentTab = () => {
    const { id } = useParams();
    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    
    // State variables
    const [page, setPage] = useState(1);
    const [totalPage, setPageTotal] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [eventList, setEventList] = useState<GetEventDto[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<GetEventDto | null>(null);
    const [escapegame, setEscapeGame] = useState<GetEscapeGameDto>();
    
    // Context hooks
    const {  isLoading, setLoading } = useState<boolean>(false);
    const { handleOpen, handleClose, setDescription, setTitle } = useModal();
    
    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("success");

    const escapeAction = new EscapeGameAction();

    const handleTabChange = (index: number) => {
        if (tabsRef.current) {
            tabsRef.current.changeTab(index);
        }
    };

    const handLeDetails = (event: GetEventDto) => {
        setSelectedEvent(event);
        handleTabChange(1);
    };

    const handleUpdate = (event: GetEventDto) => {
        setSelectedEvent(event);
        handleTabChange(3);
    };

    const handleFormSubmit = async (eventData: AddEventDto) => {
        try {
            setLoading(true);
            setDescription("Creating event...");
            handleOpen();
            
            const response = await escapeAction.createEvent(eventData);
            
            if (response.Success) {
                setDescription(response.Message);
                setTitle("Success");
                setSnackbarMessage(response.Message);
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                fetchEventList();
            } else {
                setDescription(response.Message);
                setTitle("Error");
                setSnackbarMessage(response.Message);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the event';
            setDescription(errorMessage);
            setTitle("Error");
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSubmit = async (eventData: UpdateEventDto) => {
        try {
            
            setDescription("Updating event...");
            handleOpen();
            
            const response = await escapeAction.updateEvent(eventData);

            if (response.Success) {
                setDescription(response.Message);
                setTitle("Success");
                setSnackbarMessage(response.Message);
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                fetchEventList();
                handleTabChange(0); // Return to list view
            } else {
                setDescription(response.Message);
                setTitle("Error");
                setSnackbarMessage(response.Message);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred while updating the event';
            setDescription(errorMessage);
            setTitle("Error");
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
             setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const eventColumns = EventTypeColumns;

    const fetchEscapeGame = async () => {
        try {
            if (!id) return;
            
            const response = await escapeAction.getEscapeGameById(parseInt(id));
            if (response.Success) {
                setEscapeGame(response.Data as GetEscapeGameDto);
            }
        } catch (error) {
            console.error(error);
            setSnackbarMessage("Failed to fetch escape game details");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const fetchEventList = async () => {
        try {
            if (!id) return;
            
            const response = await escapeAction.getEventsByEscapeGameId(
                parseInt(id), 
                page, 
                pageSize
            ) as PaginationResponse<GetEventDto>;
            
            if (response.Success) {
                setEventList(response.Data as GetEventDto[]);
                setPageTotal(response.TotalPage);
            }
        } catch (error) {
            console.error(error);
            setSnackbarMessage("Failed to fetch events");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        if (id) {
            fetchEscapeGame();
            fetchEventList();
        }
    }, [id, page, pageSize]);

    const tabs: TabItem[] = [
        {
            label: "Event Table",
            content: (
                <>
                    <FormControl className='flex flex-row space-x-10 float-end justify-end items-end'>
                        <Button
                            variant='contained'
                            color='warning'
                            onClick={fetchEventList}
                        >
                            Refresh
                        </Button>
                    </FormControl>
                    <EventTab 
                        data={eventList} 
                        OnDetail={handLeDetails} 
                        OnUpdate={handleUpdate} 
                    />
                    <Pagination 
                        count={totalPage} 
                        page={page} 
                        onChange={handlePageChange} 
                    />
                </>
            ) 
        },
        {
            label: "Details",
            content: selectedEvent ? ( 
                <EventDetails 
                    data={selectedEvent} 
                    columns={eventColumns} 
                    onUpdate={handleUpdate} 
                />
            ) : <Skeleton variant="rectangular" height={200} width={500} />
        },
        {
            label: "Create",
            content: id ? (
                <CreateEvent 
                    escapeGameId={parseInt(id)}
                    onSubmit={handleFormSubmit} 
                />
            ) : <Typography>No escape game selected</Typography>,
        },
        {
            label: "Update",
            content: selectedEvent ? (
                <UpdateEvent 
                    onSubmit={handleUpdateSubmit} 
                    data={selectedEvent} 
                />
            ) : <Typography>No event selected</Typography>,
        },
    ];
    if(isLoading)
    {
        return (
            <Card>
                <CardContent>
                  <CircularProgress />
                </CardContent>
            </Card>
        )
    }
    return (
        <Grid2 container spacing={2} className="items-center justify-evenly">
            <Box className="flex flex-row gap-4">
                <Item className='w-1/3 md:1/3'>
                    <EscapeGameDetails data={escapegame} />
                </Item>
                <Item className='w-2/3 md:1/3'>
                    <Typography variant="body1">Event</Typography>
                    <GenericTabs
                        ref={tabsRef}
                        tabs={tabs}
                        defaultTab={0}
                        ChangeTab={handleTabChange}
                    />
                </Item>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert 
                        onClose={handleCloseSnackbar} 
                        severity={snackbarSeverity}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>  
            </Box>
        </Grid2>
    );
};

export default EventComponentTab;