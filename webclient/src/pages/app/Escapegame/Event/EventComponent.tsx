import { Box, Typography,Snackbar,Alert, Tabs, Tab,Grid2, Skeleton } from '@mui/material';
import GenericTabs from "@/components/factory/GenericComponent/TabGénéric";
import { useEffect, useRef,useState } from 'react';
import { TabItem } from '@/components/factory/GenericComponent/TabGénéric';
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
//mock data

/**
 * EventComponentTab renders a tab component to display events
 * within the Escape Room game. The component is reusable and
 * can be used in multiple places throughout the application.
 * The component is currently not being used anywhere in the
 * application, but it can be reused in the future.
 */
const EventComponentTab = () => {
    const {id} =useParams();
    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    //----Variable-----
    const [page,setPage]= useState(1);
    const [eventList, setEventList] = useState<GetEventDto[]>();
    const [selectedEvent, setSelectedEvent] = useState<GetEventDto | null>(null);
    //---escapegame--
    const [escapegame,setEscapeGame]=useState<GetEscapeGameDto>();
    const escapeAction= new EscapeGameAction();
    //SnackBar
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    /**
     * Changes the active tab in the tab component.
     *
     * @param {number} index - The index of the tab to be activated.
     * This function uses the tabsRef to switch to the desired tab
     * if the reference to the tab component is available.
     */
    const handleTabChange = (index: number) => {
        if (tabsRef.current) {
            tabsRef.current.changeTab(index);
        }
    };
    const handLeDetails = (event: GetEventDto) => {
        setSelectedEvent(event);
        handleTabChange(1);
    }
    const handleUpdate=(event: GetEventDto) =>{
        setSelectedEvent(event);
        handleTabChange(3);
    }
    /**
     * Handles the form submission for adding or updating an event.
     *
     * @param {AddEventDto | UpdateEventDto} event - The event data to be submitted.
     * This can either be data for adding a new event or updating an existing event.
     */
    const handleFormSubmit = (event: AddEventDto | UpdateEventDto) => {
        // Handle form submission here
        console.log('Form submitted:', event);
    };
    /**
     * Closes the snackbar.
     */
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    // event list Columns
    const eventColumns = EventTypeColumns;

    const tabs: TabItem[] = [
        {
            label: "Event Table",
            content: <EventTab data={eventList} OnDetail={handLeDetails} OnUpdate={handleUpdate} />,
        },
        {
            label: "Details",
            content:selectedEvent ? ( 
                <EventDetails data={selectedEvent} columns={eventColumns} onUpdate={handleUpdate} />
            ) :<Skeleton variant="rectangular" height={200} width={500}></Skeleton>
        },
        {
            label: "Create",
            content: <CreateEvent onSubmit={handleFormSubmit} />,
        },
        {
            label: "Update",
            content: <UpdateEvent onSubmit={handleFormSubmit} data={selectedEvent} />,
        },
    ];
    const fetchEscapeGame = async ()  => {
        const response= await escapeAction.getEscapeGameById(Number.parseInt(id));
        if(response.Success){
            setEscapeGame(response.Data as GetEscapeGameDto);
        }
      
    }
    const fetchEventList = async () => {
        const response = await escapeAction.getEventsByEscapeGameId(Number.parseInt(id), page, 10);
        if (response.Success) {
            console.log(response.Data);
            setEventList(response.Data as GetEventDto[]);
        }
        console.log("message : "+ response.Message);
        console.log(response.Data);
    }
    //Use effect ---------
    useEffect(() => {
        if(id !=null)
        {
            fetchEscapeGame();
            fetchEventList();
        }   
    },[id]);
    return (
        <Grid2 container spacing={2} className=" items-center justify-evenly">
            <Box className="flex flex-row gap-4">
                <Item>
                    <EscapeGameDetails data={escapegame} />
                </Item>
                <Item>
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
                    autoHideDuration={30}
                    onClose={()=> handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} security="success">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>  
            </Box>
        </Grid2>
    );
};

export default EventComponentTab;