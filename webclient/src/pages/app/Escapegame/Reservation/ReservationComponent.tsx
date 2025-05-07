import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { Box, Typography, Select, FormControl, MenuItem, Grid2, Skeleton, Modal,Button, Card, CardContent, CardHeader, CardActions,Divider } from '@mui/material';
import { useRef, useState,useEffect } from "react";
import { GetSessionReservedDto, reservationcolumns } from "@/interfaces/EscapeGameInterface/Reservation/getSessionReservedDto";
import GetReservation from "./GetReservation";
import GetReservationTable from './GetReservationTable';
import { useParams, data } from 'react-router-dom';
import Item from "@/components/factory/GenericComponent/Item";
import { EscapeGameAction } from "@/actions/EscapeGameAction";
import { SessionAction } from "@/actions/SessionAction";
import { GetEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import { GetSessionGameDto, Sessioncolumns } from '../../../../interfaces/EscapeGameInterface/Session/getSessionGameDto';
import SessionDetails from '../Session/SessionDetails';
import { useModal } from "@/context/ContextHook/ModalContext";
import { useLoading } from "@/context/ContextHook/LoadingContext";
import { AddSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/addSessionGameDto";
import { UpdateSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/updateSessionGameDto";
import { Update } from "@mui/icons-material";
import UpdateReservation from "./UpdateReservation";
import { UpdateSessionReservedDto } from "@/interfaces/EscapeGameInterface/Reservation/updateSessionReservedDto";
import GetUserDetails from "../../Profile/ProfileComponent/GetUserDetails";
import { GetUserDto } from "../../../../interfaces/User/GetUserDto";

const ReservationComponent = () => {
    const {esgId,id}=useParams();
    
    console.log(id);
    console.log(esgId);
    const tabsRef = useRef<{
        changeTab: (index: number) => void;
    } | null>(null);
    //variable
    const [page,setPage]=useState(1);
    const [selectedSession,setSelectedSession]=useState<GetSessionGameDto>(null);
    const [reservations, setReservations] = useState<GetSessionReservedDto[]>([]);
    const [user,setUser] = useState<GetUserDto>(null);
    const [selectedReservation, setSelectedReservation] = useState<GetSessionReservedDto | null>(reservations[0]);
    // Cal api 
    const escapeAction=new EscapeGameAction();
    const ReservAction= new SessionAction();
    //Context
    const Modal=useModal();
    const Loading=useLoading();
    
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
        const response = await ReservAction.getSessionReservedByEscapeGameId(Number.parseInt(esgId),page,5);
  
        if (response.Success) {
          console.log(response.Data);
          setReservations(response.Data as GetSessionReservedDto[]);
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    const fetchselectedSession = async () => {
      try {
       let response = await ReservAction.getSessionReservedBySessionId(Number.parseInt(id));
       console.log(response);
        if (response.Success) {
          console.log(response.Data);
          setSelectedReservation(response.Data as GetSessionReservedDto);
          setUser(selectedReservation.user);
        }
      }
      catch (error) {

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
  
  /**
   * Handles the form submission for creating a new session game.
   *
   * @param {AddSessionGameDto} eventData - The session game data to be submitted.
   * This data is used to create a new session game in the system.
   * Opens a modal to display the success or error message based on the response.
   */
    const handleFormSubmit = async (eventData: AddSessionGameDto) => {
        try {
            const response = await ReservAction.createSessionGame(eventData);

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

  /**
   * Handles the form submission for updating a session game.
   *
   * @param {UpdateSessionGameDto} eventData - The session game data to be updated.
   * This data can be used to update a session game in the database.
   */
  const handleUpdateSubmit = async (eventData: UpdateSessionReservedDto) => {
    try {
        const response = await ReservAction.updateSessionReserved(eventData);

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
  useEffect(() => {
    if(id != null){
      fetchSession()
      fetchselectedSession()
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
        <Card>
        <CardHeader
          title="Reservations"
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
                  onClick={fetchReservations}>Refresh</Button>
              </FormControl>
            </>
          }/>
        <CardContent>
            <GetReservationTable
                data={reservations}
                columns={columns}
                OnDetails={handleDetails}
                OnUpdate={handleUpdate} />
        </CardContent>
        </Card>
        </>
        ),
    },
    {
        label: 'Details',
        content:(
          <Card elevation={3}>
            <CardContent>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  {
                    selectedReservation ? (
                        <GetReservation cols={columns} data={selectedReservation} />
                    ) :<Skeleton variant="rectangular" height={200} width={500}>unknown</Skeleton>
                  }
                </Grid2>
                <Grid2 size={6}>
                  {
                    selectedReservation ? (
                            <GetUserDetails user={selectedReservation.user} />
                        ) :<Skeleton variant="rectangular" height={200} width={500}>unknown</Skeleton>
                  }
                </Grid2>
              </Grid2>
            </CardContent>
            <Divider orientation="horizontal" flexItem className="m-4" />
            <CardActions className="flex flex-row items-center justify-evenly ">           
              <Button color="success" 
                    >Confirmer</Button>
              <Divider orientation="vertical" 
                        flexItem />
              <Button  color="error">Cancel</Button>
            </CardActions>
          </Card>
        ) 
    },
    { label: 'Update', 
        content:(
            <>
              <Card>
                  <CardHeader 
                    title="Update Reservation"
                    action={
                      <>
                      </>
                    }
                    />
                  <CardContent>
                    {
                    selectedReservation ? (<>
                      <UpdateReservation 
                        data={selectedReservation}
                        onSubmit={handleUpdateSubmit} />
                    </>) :
                      (<Skeleton  />)  
                    }
                  </CardContent>
              </Card>
            </>
        ) },
    ];

    return (
        <Grid2 container spacing={2} className="items-center justify-evenly"> 
            <Box className="flex flex-row gap-2">
                <Grid2 size={6}>
                  <Card elevation={3}>
                    <CardContent>
                    {
                      selectedSession !=null ?
                      <SessionDetails data={selectedSession} columns={sessionCol} OnUpdate={e=> console.log(e)} />
                      :<Skeleton variant="rectangular" height={200}></Skeleton>
                    }
                    </CardContent>
                  </Card>
                </Grid2>
                <Grid2 size={10}>
                    <GenericTabs
                        ref={tabsRef} 
                        tabs={tabs}
                        defaultTab={1}
                        ChangeTab={goToTab}/>
                </Grid2>
            </Box>
        </Grid2>
    );
};

export default ReservationComponent;