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
import { Box, Button, Divider, Select, FormControl, MenuItem, Typography, Grid2, Skeleton, CardContent, CardHeader, Card, Grid, CardActions, Pagination } from '@mui/material';
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
import WorkLayout from "@/components/app/Layout/WorkLayout";



const SessionComponent = () => {   

    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    console.log(tabsRef);
    const { id } =useParams()
    //session
    const [tableSession,setTableSession]= useState([])
    const [selectSession,setSelectSession] = useState(tableSession[0])
    const [page,setPage] = useState<number>(0);  
    const [totalPage,setTotalPage]= useState<number>(0)
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
            const response = await SessionActions.getSessionEscapeGameById(Number.parseInt(id),page,5) as PaginationResponse<GetSessionGameDto>;
            if (response.Success) {
                console.log("response", console.log(response.Data));
                setTableSession(response.Data as GetSessionGameDto[]);
                setTotalPage(response.TotalPage)
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
 const handleChangePage =(event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
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
    useEffect(()=>{
  fetchSessionsByEscapeGameId(id);
    },[page])
    const columns = Sessioncolumns;
    const tabs: TabItem[]=[
        {
            label:"Get all Session",
            content:(
             <>
                <Card
                elevation={0}
                sx={{
                    border: "1px solid #d0d7de",
                    borderRadius: "6px",
                    backgroundColor: "#ffffff",
                    p: 2,
                }}
                >
                {/* Header GitHub-style */}
                <CardHeader
                    title={
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#24292f" }}>
                        Escape Game Details
                        </Typography>
                        <Typography sx={{ color: "#57606a", fontSize: "0.9rem" }}>
                        {escapegame?.esgTitle}
                        </Typography>
                    </Box>
                    }
                    action={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {/* Filtre */}
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <Select defaultValue="">
                            <MenuItem value="">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                        </Select>
                        </FormControl>

                        {/* Refresh */}
                        <Button
                        variant="contained"
                        color="warning"
                        onClick={() => fetchSessionsByEscapeGameId(id)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                        >
                        Refresh
                        <Refresh fontSize="small" />
                        </Button>
                    </Box>
                    }
                    sx={{
                    borderBottom: "1px solid #d8dee4",
                    pb: 1,
                    mb: 2,
                    }}
                />

                {/* Table */}
                <CardContent sx={{ p: 0 }}>
                    {tableSession ? (
                    <GetsessionFromEscapeGame
                        data={tableSession}
                        columns={columns}
                        onDetails={handleDetails}
                        onUpdate={handleUpdate}
                    />
                    ) : (
                    <Skeleton variant="rectangular" height={500} />
                    )}
                </CardContent>

                {/* Pagination GitHub-style */}
                <CardActions
                    sx={{
                    borderTop: "1px solid #d8dee4",
                    pt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    }}
                >
                    <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handleChangePage}
                    sx={{
                        "& .MuiPaginationItem-root": {
                        borderRadius: "6px",
                        border: "1px solid #d0d7de",
                        },
                        "& .Mui-selected": {
                        backgroundColor: "#0969da",
                        color: "#ffffff",
                        borderColor: "#0969da",
                        },
                    }}
                    />
                </CardActions>
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
  <WorkLayout
    title="Escape Game"
    subtitle="Manage escape game details and sessions"
    sidebar={
      <EscapeGameDetails data={escapegame} />
    }
  >
    <GenericTabs
      ref={tabsRef}
      tabs={tabs}
      defaultTab={0}
      ChangeTab={goToTab}
    />
  </WorkLayout>
);

}
export default SessionComponent;
