import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { Box ,Typography,Select,FormControl,MenuItem,Grid2, Skeleton} from "@mui/material";
import { useRef, useState,useEffect } from "react";
import { GetSessionReservedDto, reservationcolumns } from "@/interfaces/EscapeGameInterface/Reservation/getSessionReservedDto";
import GetReservation from "./GetReservation";
import GetReservationTable from './GetReservationTable';
import { useParams } from "react-router-dom";
import Item from "@/components/factory/GenericComponent/Item";
import { EscapeGameAction } from "@/actions/EscapeGameAction";
import { SessionAction } from "@/actions/SessionAction";
import { GetEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import { GetSessionGameDto, Sessioncolumns } from '../../../../interfaces/EscapeGameInterface/Session/getSessionGameDto';
import SessionDetails from '../Session/SessionDetails';





const ReservationComponent = () => {
    const {id}=useParams();
    console.log(id);
    const tabsRef = useRef<{
        changeTab: (index: number) => void;
    } | null>(null);
    //variable
    const [page,setPage]=useState(1);
    const [selectedSession,setSelectedSession]=useState<GetSessionGameDto>(null);
    const [reservations, setReservations] = useState<GetSessionReservedDto[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<GetSessionReservedDto | null>(reservations[0]);
    // Cal api 
    const escapeAction=new EscapeGameAction();
    const ReservAction= new SessionAction();
    
    // Tab References
    const goToTab = (index: number) => {
        if (tabsRef.current) {
            tabsRef.current.changeTab(index);
        }
    };

    const handleDetails = (reservation: GetSessionReservedDto) => {
        setSelectedReservation(reservation);
        goToTab(1);
    };

    const handleUpdate = (reservation: GetSessionReservedDto) => {
        setSelectedReservation(reservation);
        goToTab(2);
    };
    //------------Fonction-----------
    const fetchReservations = async () => {
      try {
        const response = await ReservAction.getSessionReservedByEscapeGameId(Number.parseInt(id),page,5);
        if (response.Success) {
          console.log(response.Data);
          setReservations(response.Data as GetSessionReservedDto[]);
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    const fetchSession = async () => {
      try {
        const response = await ReservAction.getSessionById(Number.parseInt(id));
        if (response.Success) {
          console.log(response.Data);
          setSelectedSession(response.Data as GetSessionGameDto);
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => {
      if(id != null){
        fetchSession()
        fetchReservations();
      }
  },[id]);
    const sessionCol= Sessioncolumns;
    const columns = reservationcolumns;

    const tabs: TabItem[] = [
        {
            label: 'List',
            content: (
            <>
                <Box className="flex gap-4 justify-end">
                <Typography variant="h5">Filtre</Typography>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <Select>
                    <MenuItem>A</MenuItem>
                    <MenuItem>B</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <Select>
                    <MenuItem>A</MenuItem>
                    <MenuItem>B</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <Select>
                    <MenuItem>A</MenuItem>
                    <MenuItem>B</MenuItem>
                  </Select>
                </FormControl>
                </Box>
                <GetReservationTable
                    data={reservations}
                    columns={columns}
                    OnDetails={handleDetails}
                    OnUpdate={handleUpdate} />
            </>
            ),
        },
        {
            label: 'Details',
            content: selectedReservation ? (
            
                <GetReservation cols={columns} data={selectedReservation} />
            ) :<Skeleton variant="rectangular" height={200} width={500}>unknown</Skeleton>,
        },
        { label: 'Update', 
            content:(
                <>
                </>
            ) },
    ];

    return (
        <Grid2 container spacing={2} className="items-center justify-evenly"> 
            <Box className="flex flex-row gap-2">
                <Item>
                  {
                    selectedSession !=null ?
                    <SessionDetails data={selectedSession} columns={sessionCol} OnUpdate={e=> console.log(e)} />
                    :<Skeleton variant="rectangular" height={200}></Skeleton>
                  }
                </Item>
                <Item>
                    <GenericTabs
                        ref={tabsRef} 
                        tabs={tabs}
                        defaultTab={1}
                        ChangeTab={goToTab}/>
                </Item>
            </Box>
        </Grid2>
    );
};

export default ReservationComponent;