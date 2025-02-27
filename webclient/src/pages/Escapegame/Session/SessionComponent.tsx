import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { useRef, useState } from "react";
import { GetSessionGameDto, Sessioncolumns } from '../../../interfaces/EscapeGameInterface/Session/getSessionGameDto';
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import UpdateSessionGame from "./UpdateSession";
import AddSessionGame from "./AddSession";
import DetailsComponent from "@/components/factory/GenericComponent/DetailsComponent";
import { useParams } from "react-router";



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



const SessionComponent = () => {   

    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    const {id} =useParams()
    const [tableSession,setTableSession]= useState(mockSessions)
    const [selectSession,setSelectSession] = useState(mockSessions[0])
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
                <GenericTable data={tableSession} columns={columns}  OnDetails={handleDetails} OnUpdate={handleUpdate} />
             </>)
        },
        {
            
            label:"Details",
            content:(
                <>
               
                    <DetailsComponent  data={selectSession} columns={columns} />
            
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
        <>
            <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab}  />
        </>
    )
}
export default SessionComponent;
