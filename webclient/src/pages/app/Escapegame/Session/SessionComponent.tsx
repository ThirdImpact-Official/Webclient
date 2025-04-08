import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { useEffect, useRef, useState } from "react";
import { GetSessionGameDto, Sessioncolumns } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import UpdateSessionGame from "./UpdateSession";
import AddSessionGame from "./AddSession";
import DetailsComponent from "@/components/factory/GenericComponent/DetailsComponent";
import { useParams } from "react-router";
import { Box, Button, Divider,Select,FormControl,MenuItem,Typography, Grid2, Skeleton} from "@mui/material";
import GetsessionFromEscapeGame from './GetSessionFromEscapegame';
import SessionDetails from './SessionDetails';

import EscapeGameDetails from "../EscapegameDetails";
import { GetEscapeGameDto, EscapeGameColumns} from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import Item from "@/components/factory/GenericComponent/Item";
import { EscapeGameAction } from '@/actions/EscapeGameAction';
import { SessionAction } from "@/actions/SessionAction";





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
             {
                tableSession ? 
                <GetsessionFromEscapeGame
                          data={tableSession}
                          columns={columns}
                          onDetails={handleDetails}
                          onUpdate={handleUpdate} />
                          : <Skeleton variant="rectangular" height={500} />
             }
             </>)
        },
        {
            
            label:"Details",
            content:(
                <>
                {selectSession != null ?

                    <SessionDetails data={selectSession} columns={columns} OnUpdate={handleUpdate} />
                    :<Skeleton variant="rectangular" height={500} />
                }
                </>)
        },
        {
            label:"Create",
            content:(
                <>
                    <AddSessionGame dataId={Number.parseInt(id)} />
                </>
            )
        },
        {
            label:"Update",
            content:(
                <>
                    <UpdateSessionGame data={selectSession} />
                </>
            )
        }
    ]
    return(
        <Grid2 container spacing={2} className="flex justify-evenly items-center">
            <Box className="flex flex-row gap-4">
                <Item>
                    <section>
                        <EscapeGameDetails data={escapegame}  />
                    </section>
                </Item>
                <Item>
                    <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab}  />
                </Item>
            </Box>
        </Grid2>
    )
}
export default SessionComponent;
