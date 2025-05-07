import { Box, Snackbar, Alert, Grid2, FormControl, Button, Typography, Card, CardContent, Skeleton } from '@mui/material';
import Item from "@/components/factory/GenericComponent/Item";
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { GetActivityPlaceDto, ActivityPlaceColumns } from '@/interfaces/EscapeGameInterface/ActivityPlace/getActivityPlaceDto';
import GenericTabs from '@/components/factory/GenericComponent/TabGénéric';
import DetailsComponent from '@/components/factory/GenericComponent/DetailsComponent';
import UpdateActivityPlace from './UpdateActivityPlace';
import CreateActivityPlace from './CreateActivityPlace'; 
import ActivityPlaceTable from './ActivityPlaceTable';
import ActivityDetails from './ActivityDetails';
import { AddActivityPlaceDto } from '@/interfaces/EscapeGameInterface/ActivityPlace/addActivityPlaceDto';
import { UpdateActivityPlaceDto } from '@/interfaces/EscapeGameInterface/ActivityPlace/updateActivityPlaceDto';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import EscapeGameDetails from '../EscapegameDetails';
import { EscapeGameAction } from '@/actions/EscapeGameAction';

export const mockActivityPlaces: GetActivityPlaceDto[] = [
  {
      acpId: 1,
      name: "",
      acpEsgId: 101,
      activityType: { id: 1, name: "Escape Room" }, // Assuming GetActivityPlaceTypeDto has id & name
      activityId: 5001,
      description: "A thrilling escape room experience.",
      address: "123 Mystery Lane, Paris",
      imgressources: "https://example.com/image1.jpg",
      creationDate: "2024-03-01T10:00:00Z",
      updateDate: "2024-03-10T12:30:00Z",
  },
  {
      acpId: 2,
      acpEsgId: 102,
      name: "",
      activityType: { id: 2, name: "Puzzle Challenge" },
      activityId: 5002,
      description: "A thrilling escape room experience.",
      address: "456 Enigma Street, London",
      imgressources: "https://example.com/image2.jpg",
      creationDate: "2024-02-15T09:00:00Z",
      updateDate: "2024-03-05T14:45:00Z",
  },
  {
      acpId: 3,
      name: "",
      acpEsgId: 103,
      activityType: { id: 3, name: "Treasure Hunt" },
      activityId: 5003,
      description: "A thrilling escape room experience.",
      address: "789 Riddle Road, New York",
      imgressources: "https://example.com/image3.jpg",
      creationDate: "2024-01-20T08:30:00Z",
      updateDate: "2024-02-28T16:15:00Z",
  }
];


const ActivityPlaceComponent = () => {
  const { id } = useParams();
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  //-----
  const EscapeAction= new EscapeGameAction();
  //-----Variable
  const [page,setPage]=useState(1);
  const [activityPlaces, setActivityPlaces] = useState<GetActivityPlaceDto[]>(mockActivityPlaces);
  const [escapeGame,setEscapegame]= useState<GetEscapeGameDto>();
  const [selectedPlace, setSelectedPlace] = useState<GetActivityPlaceDto | null>(activityPlaces[0]);
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>("");

  const handleTabChange = (tabIndex: number) => {
    if (tabsRef.current) {
      tabsRef.current.changeTab(tabIndex);
    }
    setSnackbarOpen(false);
    setSnackbarText("");
  };

  const handleDetailsClick = (place: GetActivityPlaceDto) => {
    setSelectedPlace(place);
    handleTabChange(1);
  };

  const handleUpdateClick = (place: GetActivityPlaceDto) => {
    setSelectedPlace(place);
    handleTabChange(3);
  };
  const handleSubmit=(item: AddActivityPlaceDto | UpdateActivityPlaceDto)=> {
    console.log(item);
  }
  
  //Call Api ---Méthodes 
  const fetchEscapegameById = async () =>
  {
    try {
      const response = await EscapeAction.getEscapeGameById(Number.parseInt(id));
      if (response.Success) {
        setEscapegame(response.Data as GetEscapeGameDto);
      }
    }
    catch (error) {
      console.error('Error fetching escape game:', error);
    }
  }

  const fetchActivityByEscapeGameId = async () => {
    try {
      const response = await EscapeAction.getActivityPlacesByEscapeGame(Number.parseInt(id),page,5);
      if (response.Success) {
        setActivityPlaces(response.Data as GetActivityPlaceDto[]);
      }
    } 
    catch (error) {
      console.error('Error fetching escape game:', error);
    }
  }
  useEffect(() => {
    if(id){
      fetchEscapegameById();
    }
  },[id])
  useEffect(() => {
    if (id) {
      fetchActivityByEscapeGameId();
    }
  },[id,page])

  //Tableau d'ellement a charger 
  const tabItems = [
    {
      label: "List",
      content: (
        <>
          <Card>
            <CardContent>
              <FormControl className='flex flex-row float-end justify-end items-end p-2'>
                    <Button
                      variant='contained'
                      color='warning'
                      onClick={fetchActivityByEscapeGameId}>Refresh</Button>
              </FormControl>
              <ActivityPlaceTable 
                  data={activityPlaces}
                  columns={ActivityPlaceColumns}
                  onDetails={handleDetailsClick}
                  onUpdate={handleUpdateClick}
                /> 
            </CardContent>
          </Card>
        </>
      ),
    },
    {
      label: "Details",
      content: (
        <Card>
          <CardContent>
          <ActivityDetails 
             data={selectedPlace}
             columns={ActivityPlaceColumns} 
             OnUpdate={handleUpdateClick}  />
          </CardContent>
        </Card>
      ),
    },
    {
      label: "Create",
      content: (
        <Card>
          <CardContent>
            <CreateActivityPlace escapeGameId={Number(id)} onSubmit={()=>handleSubmit} />
          </CardContent>
        </Card>
      )
    },
    {
      label: "Update",
      content: (
        <Card>
          <CardContent>
            <UpdateActivityPlace data={selectedPlace} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <Grid2 container spacing={0}>
        <Card className='w-full md:w-1/3'>
          <CardContent>
            {
              escapeGame ? (<EscapeGameDetails data={escapeGame} />) :
              <Skeleton variant="rectangular" width={210} height={118} />
            }
          </CardContent>
        </Card >
        <Card >
        </Card>
        <Card className='w-full md:w-2/3'>
          <CardContent>
            <GenericTabs
              ref={tabsRef}
              tabs={tabItems}
              ChangeTab={handleTabChange}
              defaultTab={0}
            />
          </CardContent>
        </Card>
    
        <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </Grid2>
  );
};
export default ActivityPlaceComponent;