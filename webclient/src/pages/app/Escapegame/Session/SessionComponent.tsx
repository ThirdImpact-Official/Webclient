import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { useRef, useState } from "react";
import { GetSessionGameDto, Sessioncolumns } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import UpdateSessionGame from "./UpdateSession";
import AddSessionGame from "./AddSession";
import DetailsComponent from "@/components/factory/GenericComponent/DetailsComponent";
import { useParams } from "react-router";
import { Box, Button, Divider,Select,FormControl,MenuItem,Typography, Grid2} from "@mui/material";
import GetsessionFromEscapeGame from './GetSessionFromEscapegame';
import SessionDetails from './SessionDetails';

import EscapeGameDetails from "../EscapegameDetails";
import { GetEscapeGameDto, EscapeGameColumns} from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import Item from "@/components/factory/GenericComponent/Item";



const mockSessions: GetSessionGameDto[] = [
    {
        segId: 1,
        escapeGameId: 101,
        date: new Date("2025-03-15T14:00:00"),
        price: 25.99,
        placeavailable: 8,
        pLacemaximum: 10,
    },
    {
        segId: 2,
        escapeGameId: 102,
        date: new Date("2025-03-16T16:30:00"),
        price: 30.50,
        placeavailable: 5,
        pLacemaximum: 8,
    },
    {
        segId: 3,
        escapeGameId: 103,
        date: new Date("2025-03-17T18:00:00"),
        price: 20.00,
        placeavailable: 10,
        pLacemaximum: 12,
    },
    {
        segId: 4,
        escapeGameId: 104,
        date: new Date("2025-03-18T20:00:00"),
        price: 27.75,
        placeavailable: 6,
        pLacemaximum: 10,
    },
    {
        segId: 5,
        escapeGameId: 105,
        date: new Date("2025-03-19T13:00:00"),
        price: 22.00,
        placeavailable: 4,
        pLacemaximum: 6,
    },
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
  


const SessionComponent = () => {   

    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    console.log(tabsRef);
    const {id} =useParams()
    //session
    const [tableSession,setTableSession]= useState(mockSessions)
    const [selectSession,setSelectSession] = useState(mockSessions[0])
    //escapegame
    const [escapegame]=useState<GetEscapeGameDto>(mockEscape)
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
    const columns = Sessioncolumns;
    const tabs: TabItem[]=[
        {
            label:"Get all Session",
            content:(
             <>
              <GetsessionFromEscapeGame
                        data={tableSession}
                        columns={columns}
                        onDetails={handleDetails}
                        onUpdate={handleUpdate} />
             </>)
        },
        {
            
            label:"Details",
            content:(
                <>
                    <SessionDetails data={selectSession} columns={columns} OnUpdate={handleUpdate} />
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
