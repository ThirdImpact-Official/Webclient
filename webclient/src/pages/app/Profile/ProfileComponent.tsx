import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Tabs } from '@mui/material';
import Profile from '../Profile';
import { GetUserDto } from '@/interfaces/User/GetUserDto';
import { useState,FC, useEffect,useRef } from 'react';
import Notification from '../Notification';
import { GetNotificationDto } from '@/interfaces/NotificationInterface/Notification/getNotificationDto';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Skeleton} from "@mui/material";
import { useNavigate, data } from 'react-router-dom';
import GenericTabs, { TabItem } from '../../../components/factory/GenericComponent/TabGénéric';
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import { UserAction } from '@/actions/UserAction';
import { NotificationAction } from '@/actions/NotificationAction';
import { NotificationAddSharp } from '@mui/icons-material';
import UserNotificationComponent from './ProfileComponent/UserNotificationComponent';
import { User } from 'lucide-react';
import UpdateUserComponent from './ProfileComponent/UpdateUser';
import UpdatePassword from './ProfileComponent/UpdatePassword';

export const FakeNotifications: GetNotificationDto[] = [
    {
      id: 1,
      title: 'Bienvenue sur notre plateforme !',
      content: 'Merci de vous être inscrit. Profitez de toutes nos fonctionnalités.',
      isRead: false,
      notificationTypeId: 1,
      notificationType: {} as GetNotificationDto,
      userId: 101,
      creationDate: '2025-04-10T10:00:00.000Z',
      updatedDate: '2025-04-10T10:00:00.000Z',
    },
    {
      id: 2,
      title: 'Mise à jour disponible',
      content: 'Une nouvelle version de l’application est disponible. Découvrez les nouveautés !',
      isRead: true,
      notificationTypeId: 2,
      notificationType: {} as GetNotificationDto,
      userId: 102,
      creationDate: '2025-04-11T12:30:00.000Z',
      updatedDate: '2025-04-11T12:30:00.000Z',
    },
    {
      id: 3,
      title: 'Rappel de sécurité',
      content: 'Pensez à mettre à jour votre mot de passe régulièrement pour sécuriser votre compte.',
      isRead: false,
      notificationTypeId: 3,
      notificationType: {} as GetNotificationDto,
      userId: 103,
      creationDate: '2025-04-12T09:15:00.000Z',
      updatedDate: '2025-04-12T09:15:00.000Z',
    },
  ];
const ProfileComponent = () => {

//--------Variable----------
 const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
const [user, setUser] = useState<GetUserDto | null>(null);
const [page, setPage] = useState<number>(1);
const [notification,setNotification] = useState<GetNotificationDto[] | null >(FakeNotifications);
const [selectNotification,setSelectNotification] = useState<GetNotificationDto | null>(null);
const [showNotification,setShowNotification] = useState<boolean>(false);
const [showProfile,setShowProfile] = useState<boolean>(false);

const useraction = new UserAction();
const notificAction = new NotificationAction();
//--------Function----------
const goToTab = (index: number) => {
    if (tabsRef.current) {
      tabsRef.current.changeTab(index);
    }
  };

const fetchUser = async () => {
    try {
        const response= await useraction.GetCurrentUser();
        if(response.Success) {
            setUser(response.Data as GetUserDto);
        }

    }
    catch (e) {
        console.error(e.message);
    }
}   
const fetchNotification = async () => {
    try {
        const response= await notificAction.getAllNotifications(1,5);
        if(response.Success) {
            setNotification(response.Data as GetNotificationDto[]);
        }
    }
    catch (e) { 
        console.error(e.message);
    }
} 
const handleSubmit = async () => {
    try {

    }
    catch(e) {
        
    }
}

const handleDetailsSubmit = async () => {
    
}
const handleUpdateSubmit = async () => {
    
}
//--------UseEffect---------
useEffect(() => {
    if(user == null){
        fetchUser();
        fetchNotification();
    }
},[user])

//--------Return------------

//--------JSX Component-----
const tabs:TabItem[] = [
    {
        label: "Notification",
        content: notification == null ? <Skeleton /> : (
             <UserNotificationComponent dataTable={notification}/>
            )
    },
    {
        label: "Settings",
        content: <></>
    },
];
//---------------------------
return (
    <>
        <Box className='flex flex-grid justify-evenly gap-10'>
            <Box className=' '>
            {
                user != null ?  (
                 <>

                    <Box className="flex flex-col items-end justify-end">
                     
                        
                    </Box>
                    
                    <Card className="m-4 p-4 rounded-2xl shadow-lg bg-white">
                        <CardHeader className="flex justify-end float-end p-2">

                        </CardHeader >
                        <CardContent className='flex flex-col items-center p-6'>
                            <Avatar
                                sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }} 
                                alt={user.username}
                                src="/static/images/avatar/1.jpg"  />
                            <Typography component="h1" variant="h6">
                                {user.firstName} {user.lastName} 
                            </Typography>
                            <Typography component="h1" variant="h6">
                                {user.username}
                            </Typography>
                            </CardContent>
                        <CardContent className="text-start flex flex-col items-start p-4">
                            
                             <Typography variant="subtitle1">
                                Information
                             </Typography>
                            <Divider className="" orientation="horizontal" /> 
                            <Typography component="h1" variant="h6">
                                <strong> Username :</strong>  {user.username}
                            </Typography>
                            <Typography component="h1" variant="h6">
                                <strong> Email :</strong> {user.email}
                            </Typography>
                            <Typography>
                                <strong> LastName :</strong> {user.lastName} 
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ModalComponent
                                children={<UpdateUserComponent data={user} />}
                                ButtonTitle='Update Profile' 
                                Title='Update Profile' 
                                Description='Update Profile' />
                            <ModalComponent children={<UpdatePassword  />} ButtonTitle='Update Password' Title='Update Password' Description='Update Password' />
                          

                        </CardActions>
                    </Card>
                 </>)
                 : (<><Skeleton width={500} height={300}>
                        <Typography variant="h3" color="initial">
                            Chargement
                        </Typography>
                    </Skeleton></>)
            }
            </Box>      
        <Divider />
        <Box className="flex flex-grid text-center item-center">
            <Box className="justify-center pe-4">
                <GenericTabs tabs={tabs}ref={tabsRef} defaultTab={0} ChangeTab={goToTab}  />
            </Box>
        </Box>            
        </Box>
    </>
    )
}
export default ProfileComponent;