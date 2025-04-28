import { useEffect,useRef,useState } from "react";
import { NotificationAction } from "@/actions/NotificationAction";
import { AnnonceService } from "@/actions/AnnonceAction";
import { AnnonceColumns, GetAnnonceDto,AnnonceColumnsTab } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import { Box, Skeleton, Tabs, Snackbar, Alert, Card, CardContent, CardHeader, Typography } from '@mui/material';
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
    const [page,setPage]= useState(1);
    const annService = new AnnonceService();
    const notifiService= new NotificationAction();
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
    const handleCreatSubmit = async (data: AddAnnonceDto) => {
        if(data === null || data === undefined) {
            
            setSnackbarMessage(" Unable to submit Successfully");
            setSnackbarOpen(true);
            console.log(data);
            return;
        }
        else{
            const response= await annService.addAnnonce(data);
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

    }
    const handleUpdate = (data: GetAnnonceDto) => {
        setSelectAnnonce(data);
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
        fetchNotification();
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
                        title="Annonce"
                        action={
                            <>
                            <Typography variant="h4">Annonce</Typography>
                            </>
                        }
                     />
                    <CardContent>
                        <Anoncetabs 
                            data={annonce}
                            columns={AnnonceColumnsTab}
                            onDetails={setSelectAnnonce}
                            onUpdate={setSelectAnnonce} />
                    </CardContent>
                </Card>
            </>):<Skeleton></Skeleton>,
        },
        {
            label: "Details",
            content: (
            <>
                <Card elevation={3} >
                     <CardContent>
                        <DetailsComponent
                            data={selectAnnonce} 
                            columns={annoncecolumns} />
                     </CardContent>
                </Card>
            </>),
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
            <Box>
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