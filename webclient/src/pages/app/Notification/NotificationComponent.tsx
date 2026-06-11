import { useEffect,useRef,useState } from "react";
import { NotificationAction } from "@/actions/NotificationAction";
import { AnnonceService } from "@/actions/AnnonceAction";
import { AnnonceColumns, GetAnnonceDto,AnnonceColumnsTab } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import { Box, Skeleton, Tabs, Snackbar, Alert, Card, CardContent, CardHeader, Typography, FormControl,Button, CardActions,Pagination, CircularProgress } from '@mui/material';
import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { NotificationColumns } from "@/interfaces/NotificationInterface/Notification/getNotificationDto";
import { AddAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/addAnnonceDto";
import { UpdateAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/updateAnnonceDto";
import { GetNotificationDto } from "@/interfaces/NotificationInterface/Notification/getNotificationDto";
import Anoncetabs from "./Annonce/AnnonceTableau";
import CreateAnnonce from './Annonce/CreateAnnonce';
import UpdateAnnonce from './Annonce/UpdateAnnonce';
import { idID } from "@mui/material/locale";
import { Details } from "@mui/icons-material";
import DetailsComponent from '@/components/factory/GenericComponent/DetailsComponent';
import { RefreshCwIcon } from "lucide-react";
import { FormDataHelper } from "@/classes/FormDataHelper";
import AnnonceDetails from "./Annonce/Annoncedetails";
import { GetOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/getOrganisationDto";

import { OrganisationAction } from "@/actions/OrganisationActions";
import OrganisationDetails from '../Organisation/OrganisationDetails';
/*
    Notification Component 
    ce composant Contient la liste des notifications 
    et des operations affectuer  sur les notifications
*/
const NotificationComponent = () => {
    
    //------------variabale--------
    const [selectNotification, setSelectNotification] = useState()
    const [notification, setNotification] = useState<GetNotificationDto[] | null>();
    const [annonce,setAnnonce] = useState<GetAnnonceDto [] | null>(null);
    const [selectAnnonce,setSelectAnnonce]=useState<GetAnnonceDto| null>(null);
    const [getorganisation,setOrganisation]=useState<GetOrganisationDto | null >(null);

    const [page,setPage]= useState(1);
    const annService = new AnnonceService();
    const notifiService= new NotificationAction();
    const organisationAction=new OrganisationAction();
    const [error,setError]=useState("");
    const [isLoading,setLoaging]=useState<boolean>(false);
    //------------Tans reference---
    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    //------------Function && Handlers---------
    const goToTab = (index: number) => {
        if (tabsRef.current) {
          tabsRef.current.changeTab(index);
        }
      };
       const fetchOrganisation = async () => {
          const res = await organisationAction.GetOrganisationByIdForCurrentUser();
          if (res.Success) {
            setOrganisation(res.Data as GetOrganisationDto);
          } else {
            setError("Unable to retrieve the organisation");
          }
        };
    const fetchAnnonce = async () => {
        try {
            const response= await annService.getAllAnnonces(page,5);
            if(response.Success) {
                console.log("retrieve annonce",response.Data);
                setAnnonce(response.Data as GetAnnonceDto []);
                
            } 
        } catch (error) {
            console.error(error);
        }
    }
    const handleChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }
    const fetchNotification = async () => {
            try {
                const response= await notifiService.getAllNotifications(page,5);
                if(response.Success)
                {
                    setNotification(response.Data as GetNotificationDto[]);
                }
            } catch (error) {
                
            }
    }
    const handleDelete=async(item:GetAnnonceDto)=>{
        try
        {
            const response= await annService.deleteAnnonce(item.id)
            if(response.Success)
            {
                 fetchAnnonce();
            }
            else{
                setError("");
            }
        }
        catch(rtt)
        {
             setError("");
        }
    }

    const handleCreatSubmit = async (data: AddAnnonceDto) => {
        if(data === null || data === undefined) {
            
            setSnackbarMessage(" Unable to submit Successfully");
            setSnackbarOpen(true);
            
            return;
        }
        else{
            console.log("data",data);
            const formdata= FormDataHelper.toFormData(data);
            console.log("formData",formdata);
            const response= await annService.addAnnonce(formdata);
            console.log(response);
            if(response.Success) {
                setSnackbarMessage("");
                setSnackbarOpen(true);
            }
            else {
                setSnackbarMessage(" Unable to submit Successfully");
                setSnackbarOpen(true);
            }
        }
    }
    const handleCloseSnackbar = () => {
     setSnackbarOpen(false);
   }
    const handleonDetails = (data: GetAnnonceDto) =>{
        setSelectAnnonce(data);
        goToTab(1);
    }
    const handleUpdate = (data: GetAnnonceDto) => {
        setSelectAnnonce(data);
        goToTab(3);
    }
    const handleUpdateSubmit = async (data: UpdateAnnonceDto ) => {
        if(data === null || data === undefined) {
            setSnackbarMessage(" Unable to submit Successfully");
            setSnackbarOpen(true);
            return;
        }
        else{
            const response= await annService.updateAnnonce(data);
            if(response.Success) {
                setSnackbarMessage("sucessfully posted");
                setSnackbarOpen(true);
            }
            else {
                setSnackbarMessage(" Unable to submit Successfully");
                setSnackbarOpen(true);
            }
        }
    }
    //------------UseEffect--------
    useEffect   (() => {
        fetchAnnonce();
        fetchOrganisation();
    }, [page]);
    //------------Columns----------
    const annoncecolumns =AnnonceColumns;
    const notificationColumns=NotificationColumns;
    //------------Render-----------
    const tabs: TabItem [] = [
        {
            label: "Annonce",
            content: annonce != null ? (
            <>
                <Card elevation={3}>
                    <CardHeader
                        title={
                            <>
                                <Typography variant="h4">Annonce</Typography>
                            </>
                        }
                        action={
                            <>
                          
                            <FormControl>
                                <Button
                                    onClick={() => fetchAnnonce()}
                                    variant="contained"
                                    color="warning">Referesh  
                                       <RefreshCwIcon className="ps-1" /> 
                                    </Button>
                            </FormControl>
                            </>
                        }
                     />
                    <CardContent>
                        <Anoncetabs 
                            data={annonce}
                            columns={AnnonceColumnsTab}
                            onDetails={handleonDetails}
                            onUpdate={handleUpdate} />
                    </CardContent>
                    <CardActions>
                         <Pagination
                                page={page}
                                className="float-end"
                                onChange={handleChangePage}
                                count={10}
                                />
                    </CardActions>
                </Card>
            </>):<Skeleton></Skeleton>,
        },
        {
            label: "Details",
            content: selectAnnonce != null ? (
            <>
                <Card elevation={3} >
                     <CardContent>
                       <AnnonceDetails data={selectAnnonce} columns={annoncecolumns} onUpdate={handleUpdate}  onDelete={handleDelete}/> 
                     </CardContent>
                </Card>
            </>):(<Card>
                <CardContent className="text-center items-center justify-center ">
                    
                    <CircularProgress />
                
                    
                </CardContent>
                </Card>
                ),
        },
        {
            label: "Create Annonce",
            content:  (
            <>
                <Card>
                    <CardContent> 
                        <CreateAnnonce onSubmit={handleCreatSubmit} />
                    </CardContent>
                </Card>
            </>),
        },
        {
            label: "Update Annonce",
            content:selectAnnonce !=null ? ( 
            <>
                <Card>
                    <CardContent>
                        <UpdateAnnonce onSubmit={handleUpdateSubmit} data={selectAnnonce} />
                    </CardContent>
                </Card>
            </>) : <Skeleton></Skeleton>
        },
       
    ]
    return (
        <>
            <Box className="flex flex-row text-center items-center justify-center ">
                  <Box>
                        <OrganisationDetails data={getorganisation}   />
                      </Box>
                <GenericTabs tabs={tabs} ref={tabsRef} ChangeTab={goToTab}   />
            </Box>
            <Snackbar
                       open={snackbarOpen}
                       autoHideDuration={30}
                       onClose={()=> handleCloseSnackbar}>
                          <Alert onClose={handleCloseSnackbar} security="success">
                              {snackbarMessage}
                          </Alert>
            </Snackbar>  
        </>
    )
}
export default NotificationComponent;