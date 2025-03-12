import { Box, Typography,Snackbar,Alert, Tabs, Tab,Grid2 } from '@mui/material';
import GenericTabs from "@/components/factory/GenericComponent/TabGénéric";
import { useRef,useState } from 'react';
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

//mock data

const events: GetEventDto[] = [
    {
        eventId: 1,
        escapegameId: 101,
        eventTitle: "L'Énigme du Pharaon",
        eventDescription: "Un escape game sur le thème de l'Égypte ancienne avec des mystères à résoudre.",
        startDate: "2025-04-15T14:00:00Z",
        endDate: "2025-04-15T16:00:00Z"
    },
    {
        eventId: 2,
        escapegameId: 102,
        eventTitle: "Le Braquage du Siècle",
        eventDescription: "Une mission immersive où vous devez cambrioler une banque avant l'arrivée de la police.",
        startDate: "2025-04-20T10:30:00Z",
        endDate: "2025-04-20T12:00:00Z"
    },
    {
        eventId: 3,
        escapegameId: 103,
        eventTitle: "Virus Apocalypse",
        eventDescription: "Empêchez un virus mortel de se propager en résolvant les énigmes en laboratoire.",
        startDate: "2025-05-05T18:00:00Z",
        endDate: "2025-05-05T20:00:00Z"
    },
    {
        eventId: 4,
        escapegameId: 104,
        eventTitle: "Le Mystère de la Forêt Noire",
        eventDescription: "Une aventure dans une forêt mystérieuse où chaque choix impacte la suite de l'histoire.",
        startDate: "2025-05-10T15:00:00Z",
        endDate: "2025-05-10T17:00:00Z"
    },
    {
        eventId: 5,
        escapegameId: 105,
        eventTitle: "Prison Break",
        eventDescription: "Évadez-vous d’une prison haute sécurité en résolvant des énigmes complexes.",
        startDate: "2025-06-01T13:00:00Z",
        endDate: "2025-06-01T14:30:00Z"
    }
];

const mockEscape: GetEscapeGameDto = {
    "eSGId": 1,
    "eSGNom": "Escape Game 1",
    "eSGCreator": "John Doe",
    "eSGTitle": "The Lost City",
    "eSGContent": "Find the hidden treasure",
    "eSGImgResources": "https://example.com/image1.jpg",
    "eSGWebsite": "https://example.com/game1",
    "eSGPhoneNumber": "123-456-7890",
    "eSG_IsDeleting": false,
    "eSG_IsForChildren": true,
    "eSG_Price_Id": 1,
    "eSG_DILE_Id": 1,
    "price": {
      "id": 1,
      "indicePrice": 19.99
    },
    "difficultyLevel": "Medium", // Ajout de la propriété manquante
    "eSG_CreationDate": new Date("2024-01-01T12:00:00Z"), // Ajout avec une date valide
    "eSG_UpdateTime": new Date("2024-03-12T15:30:00Z") // Ajout avec une date valide
  };
  

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
    const [eventList, setEventList] = useState<GetEventDto[]>(events);
    const [selectedEvent, setSelectedEvent] = useState<GetEventDto | null>(events[0]);
    //escapegame
    const [escapegame]=useState<GetEscapeGameDto>(mockEscape);
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
    }
    ;
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
            content: <EventDetails data={selectedEvent} columns={eventColumns} onUpdate={handleUpdate} />,
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