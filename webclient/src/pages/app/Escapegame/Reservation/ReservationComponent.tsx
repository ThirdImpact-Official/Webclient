import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { Box, Typography, Select, FormControl, MenuItem, Grid, Skeleton, Modal,Button, Card, CardContent, CardHeader, CardActions,Divider, CircularProgress,Pagination } from '@mui/material';
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
import EscapeGameDetails from "../EscapegameDetails";
import { PaginationResponse } from "@/interfaces/ServiceResponse";


const ReservationComponent = () => {
    const {esgId,id}=useParams<{esgId?:string,id?:string}>();
    

    const tabsRef = useRef<{
        changeTab: (index: number) => void;
    } | null>(null);
    //variable
    const [getescapeGame,setescapeGame]=useState<GetEscapeGameDto>()
    const [page,setPage]=useState(1);
    const [totalpage,settotalpage]=useState<number>(0);
    const [error,setError]= useState<string>("");

    const [selectedSession,setSelectedSession]=useState<GetSessionGameDto | null >(null);
    const [reservations, setReservations] = useState<GetSessionReservedDto[]>([]);
    const [user,setUser] = useState<GetUserDto | null>(null); // Correction: ajout de | null
    const [selectedReservation, setSelectedReservation] = useState<GetSessionReservedDto | null>(null); // Correction: initialisation à null
    const [isLoading,setLoading]=useState<boolean>(false);
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
        const response = await ReservAction.getSessionReservedByEscapeGameId(Number.parseInt(esgId!),page,5) as PaginationResponse<GetSessionReservedDto>;
  
        if (response.Success) {
          console.log(response.Data);
          setReservations(response.Data as GetSessionReservedDto[]);
          settotalpage(response.TotalPage);
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    const fetchescapegame= async()=>{
      try
      {
        const response = await escapeAction.getEscapeGameById(Number(esgId));
        if(response.Success)
        {
         setescapeGame(response.Data as GetEscapeGameDto);
        }else
        {
          setError(response.Message)
        }
      }
      catch
      {
        setError("une erreur est srurvenu durant la recupération des donnéee");
      }
    }
    // Correction: Fonction séparée et simplifiée
    const fetchSelectedReservation = async () => {
      try {
        const response = await ReservAction.getSessionReservedBySessionId(Number.parseInt(id!));
        console.log(response);
        if (response.Success) {
          const reservationData = response.Data as GetSessionReservedDto;
          console.log(reservationData);
          setSelectedReservation(reservationData);
          // Correction: Utiliser directement les données de la réponse
          if (reservationData.user) {
            setUser(reservationData.user);
          }
        }
      } catch (error) {
        console.error('Error fetching selected reservation:', error);
      }
    }
    
    const fetchSession = async () => {
      try {
        const response = await ReservAction.getSessionById(Number.parseInt(id!));
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
   * @param {UpdateSessionReservedDto} eventData - The session game data to be updated.
   * This data can be used to update a session game in the database.
   */
  const handleUpdateSubmit = async (eventData: UpdateSessionReservedDto) => {
    try {
        const response = await ReservAction.updateSessionReserved(eventData);

        if (response.Success) {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Success");
            // Correction: Rafraîchir les données après la mise à jour
            await fetchSelectedReservation();
            await fetchReservations();
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
  const fetchSessionById=async (item:number) =>{
    try
    {
      const response= await ReservAction.getSessionById(item);
      if(response.Success)
      {

      }
      else{
        setError(response.Message)
      }
    }
    catch(err)
    {
      setError("an errro has occured during the process ")
    }
  }
  // Correction: useEffect principal avec gestion du loading
  useEffect(() => {
    if (id && esgId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Exécuter les appels API en parallèle pour de meilleures performances
          await Promise.all([
            fetchSession(),
            fetchSelectedReservation(),
            fetchReservations()
           
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, esgId, page]); // Correction: Retirer les dépendances qui causent des boucles
useEffect(()=>{
  fetchescapegame();
},[esgId]);
useEffect(()=>{
  if(selectedReservation !== null)
  {
    fetchSessionById(selectedReservation.sessionGameId)
  }
},[selectedReservation])
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
        <CardActions>
          <Pagination count={totalpage} page={page} onChange={handleChangePage} />
        </CardActions>
        </Card>
        </>
        ),
    },
    {
        label: 'Details',
        content:(
          <Card elevation={3}>
            <CardHeader title="Details de la reservation"  style={{textAlign:"center"}}/>
            <CardContent className="text-center items-center justify-center">
              <Grid container spacing={2}>
                <Grid xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {
                    selectedReservation ? (
                        <GetReservation cols={columns} data={selectedReservation} />
                    ) : <Skeleton variant="rectangular" height={200} width={400}/>
                  }
                </Grid>
                <Grid xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {
                    selectedReservation ? (
                            <GetUserDetails user={selectedReservation.user} />
                        ) : <Skeleton className="tex-center item-center justify-center flex flex-col" variant="rectangular" height={200} width={400}  />
                  }
                </Grid>
              </Grid>
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
                    selectedReservation ? (
                      <UpdateReservation 
                        data={selectedReservation}
                        onSubmit={handleUpdateSubmit} />
                    ) : (
                      <Box className="text-center items-center justify-center">
                        <Skeleton variant="rectangular" height={200} />
                      </Box>
                    )  
                    }
                  </CardContent>
              </Card>
            </>
        ) },
    ];

    // Correction: Utiliser la variable d'état locale au lieu du contexte si nécessaire
    if (isLoading) {
        return <Skeleton variant="rectangular" height={200} width={500} />;
    }

    if(!esgId) {
      return(
        <Grid container spacing={2} className="items-center justify-evenly"> 
            <Box className="flex flex-row gap-2">
                <Grid item xs={12} md={4} >
                  <Card elevation={3} sx={{height:'100%'}}>
                    <CardContent>
                    <Typography color="error">Il manque les paramètres requis</Typography>
                    </CardContent>
                  </Card>
                </Grid>
            </Box>
        </Grid>
      )
    }

  
 return (
  <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
    {/* Colonne Escape Game */}
    <Grid item xs={12} md={4}>
      <Card elevation={3} sx={{ height: "100%" }}>
        <CardContent sx={{ minHeight: 200 }}>

         <EscapeGameDetails data={getescapeGame} />
        </CardContent>
      </Card>
    </Grid>

    {/* Colonne Tabs */}
    <Grid item xs={12} md={4}>
      <GenericTabs
        ref={tabsRef}
        tabs={tabs}
        defaultTab={1}
        ChangeTab={goToTab}
      />
    </Grid>

    {/* Colonne Session Details */}
    <Grid item xs={12} md={4}>
      <Card elevation={3} sx={{ height: "auto" }}>
        <CardHeader title={
          <Typography className="text-center items-center justify-center">
           détails de la session Session

          </Typography>
        } />
        <CardContent>
          {
            selectedSession ?(
              <SessionDetails 
                data={selectedSession} 
                columns={sessionCol} 
                OnUpdate={console.log} 
              />
            ): (
              <Box className="text-center ">
                <CircularProgress/>
              </Box>
            )
          }
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);
};

export default ReservationComponent;