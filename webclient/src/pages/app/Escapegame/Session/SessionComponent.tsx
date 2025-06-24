import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { useEffect, useRef, useState } from "react";
import { GetSessionGameDto, Sessioncolumns } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import UpdateSessionGame from "./UpdateSession";
import AddSessionGame from "./AddSession";
import { UpdateSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/updateSessionGameDto";
import { AddSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/addSessionGameDto";

import DetailsComponent from "@/components/factory/GenericComponent/DetailsComponent";
import { useParams } from "react-router";
import { Box, Button, Divider, Select, FormControl, MenuItem, Typography, Grid2, Skeleton, CardContent, CardHeader, Card, Grid } from '@mui/material';
import GetsessionFromEscapeGame from './GetSessionFromEscapegame';
import SessionDetails from './SessionDetails';

import EscapeGameDetails from "../EscapegameDetails";
import { GetEscapeGameDto, EscapeGameColumns} from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import Item from "@/components/factory/GenericComponent/Item";
import { EscapeGameAction } from '@/actions/EscapeGameAction';
import { SessionAction } from "@/actions/SessionAction";
import { useModal } from "@/context/ContextHook/ModalContext";
import { useLoading } from "@/context/ContextHook/LoadingContext";
import { Refresh } from '@mui/icons-material';
import { on } from 'events';




const SessionComponent = () => {   

    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    console.log(tabsRef);
    const { id } =useParams()
    //session
    const [tableSession,setTableSession]= useState([])
    const [selectSession,setSelectSession] = useState(tableSession[0])
    const [page,setPage] = useState<number>(0);  
    //escapegame
    const [escapegame, setEscapeGame]=useState<GetEscapeGameDto>(null)
    // Api call-------------
    const EscapeGameActions = new EscapeGameAction();
    const SessionActions = new SessionAction();
    //Context---------------
    const  Modal=useModal();
    const Loading=useLoading();

    //----------------------
    const goToTab = (index: number) => {
        if (tabsRef.current) {
          tabsRef.current.changeTab(index);
        }
    };
    const handleDetails=(item:GetSessionGameDto)=> {
        setSelectSession(item)
        goToTab(1)
    }
    const handleUpdate=(item:GetSessionGameDto)=> {
        setSelectSession(item)
        goToTab(3)
    }
    // API Function to fetch escape game details by ID
    async function fetchEscapeGameById(id: string) {
        try {
            const response = await EscapeGameActions.getEscapeGameById(Number.parseInt(id));
            if (response.Success) {
                setEscapeGame(response.Data as GetEscapeGameDto);
            }
        } catch (error) {
            console.error('Error fetching escape game:', error);
        }
    }
    // API Function to fetch sessions by escape game ID
    async function fetchSessionsByEscapeGameId(escapeGameId: string) {
        try {
            const response = await SessionActions.getSessionEscapeGameById(Number.parseInt(id),page,5);
            if (response.Success) {
                console.log("response", console.log(response.Data));
                setTableSession(response.Data as GetSessionGameDto[]);
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    }
   const handleFormSubmit = async (eventData: AddSessionGameDto) => {
            try {
                const response = await SessionActions.createSessionGame(eventData);
    
                if (response.Success) {
                    Modal.handleOpen();
                    Modal.setDescription(response.Message);
                    Modal.setTitle("Success");
                } else {
                    Modal.handleOpen();
                    Modal.setDescription(response.Message);
                    Modal.setTitle("Error");
                }
            } catch (error) {
                Modal.handleOpen();
                Modal.setDescription(error instanceof Error ? error.message : 'An error occurred');
                Modal.setTitle("Error");
            }
       }

        const handleUpdateSubmit = async (eventData: UpdateSessionGameDto) => {
            try {
                const response = await SessionActions.updateSessionGame(eventData);
                if (response.Success) {
                    Modal.handleOpen();
                    Modal.setDescription(response.Message);
                    Modal.setTitle("Success");
                } else {
                    Modal.handleOpen();
                    Modal.setDescription(response.Message);
                    Modal.setTitle("Error");
                }
            } catch (error) {
                Modal.handleOpen();
                Modal.setDescription(error instanceof Error ? error.message : 'An error occurred');
                Modal.setTitle("Error");
            }
        }

    //UseEffect
    useEffect(()=>{

        if(id != null){
            fetchSessionsByEscapeGameId(id);
            fetchEscapeGameById(id);
        }
    },[id]);
    const columns = Sessioncolumns;
    const tabs: TabItem[]=[
        {
            label:"Get all Session",
            content:(
             <>
             <Card elevation={3}>
                <CardHeader 
                    title="Escape Game Details" 
                    subheader={escapegame?.esgTitle}
                    action={
                        <>
                          <Typography variant="h5">Filtre</Typography>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                <Select>
                                    <MenuItem>A</MenuItem>
                                    <MenuItem>B</MenuItem>
                                </Select>
                                </FormControl>
                        <FormControl className='flex flex-row space-x-10 float-end justify-end items-end'>
                                    <Button
                                    variant='contained'
                                    color='warning'
                                    onClick={()=>fetchSessionsByEscapeGameId(id)}>Refresh
                                    <Refresh />
                                </Button>
                        </FormControl> 
                        </>
                    } />
                <CardContent>
                    {
                        tableSession ? 
                        <GetsessionFromEscapeGame
                                data={tableSession}
                                columns={columns}
                                onDetails={handleDetails}
                                onUpdate={handleUpdate} />
                                : <Skeleton variant="rectangular" height={500} />
                    }
                </CardContent>
             </Card>
             </>)
        },
        {
            
            label:"Details",
            content:(
                <>  
                <Card elevation={3}>
                    <CardContent>
                        {selectSession != null ?

                            <SessionDetails data={selectSession} columns={columns} OnUpdate={handleUpdate} />
                            :<Skeleton variant="rectangular" height={500} />
                        }
                    </CardContent>
                </Card>
                </>)
        },
        {
            label:"Create",
            content:(
                <>
                    <Card elevation={3}>
                        <CardHeader title="Add Session Game"  />
                        <CardContent>
                            <AddSessionGame dataId={Number.parseInt(id)} onSubmit={handleFormSubmit}/>
                        </CardContent>
                    </Card>
                </>
            )
        },
        {
            label:"Update",
            content:(
                <>
                    <Card elevation={3}>
                        <CardHeader title="Update Session Game"  />
                        <CardContent>
                            { selectSession != null ? (
                                <UpdateSessionGame 
                                    data={selectSession} 
                                    onSubmit={handleUpdateSubmit} />
                            ):<Skeleton variant="rectangular" height={500} />}
                        </CardContent>
                    </Card>
                </>
            )
        }
    ]
    return(
        <Grid2 container spacing={2} className="flex justify-evenly items-center">
            <Box className="flex flex-row gap-4">
                <Grid2 size={4} className="flex flex-col gap-4 w-1/3 md:1/3">
                    <Card elevation={3}>
                        <CardContent>
                            <EscapeGameDetails data={escapegame}  />
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={6}  className="flex flex-col gap-4 w-2/3 md:2/3">
                    <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab}  />
                </Grid2>
            </Box>
        </Grid2>
    )
}
export default SessionComponent;
