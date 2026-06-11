import { data } from 'react-router-dom';
import { GetNotificationDto } from '../../../../interfaces/NotificationInterface/Notification/getNotificationDto';
import Notification from '../../Notification';
import { Box, Card, CardContent, Skeleton, Divider, CardActions } from '@mui/material';
import { Dashboard, Home, MoreVert, Settings } from '@mui/icons-material';
import { FC, useEffect, useState ,useMemo } from 'react';
import Typography from '@mui/material/Typography';
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import { NotificationAction } from '@/actions/NotificationAction';
import FormUtils from '../../../../classes/FormUtils';
import GenericMenu, { GenericMenuItemProps } from '@/components/common/GenericMenu';

interface NotificationItemProps {
    data :GetNotificationDto;
}
export const UserNotificationItem:FC<NotificationItemProps> = (props)=>{
    const action=new NotificationAction();
    const [Isread, setIsread] = useState<boolean>(props.data.isRead);
    const HandleVisisbility =() => {
        setIsread(!Isread);
        action.setNotificationVisibility(props.data.id)
    }
    const menupost: GenericMenuItemProps[] = useMemo(() => [
        {
            label: "Settings",
            icon: <Settings />,
            onClick: () => console.log("Modification"),
            modalTitle: "Modify the post",
            modalContent: (
                <>
                    <img src={""} alt="Illustration" style={{ maxWidth: "100%" }} />
                    <p>Do you want to modify this post?</p>
                </>
            )
        }
    ], []);
    return (
    <>
        <section className='flex justify-evenly flex-grid gap-10 rounded-lg bg-white shadow-lg'>
            <Box className="items-start m-1 p-1">
                <Box>
                    <Typography
                        variant='h6' 
                        className="items-center p-2">
                    {props.data.title}
                    </Typography>
                </Box>
            </Box>
            <Box className="text-end p-2 float-end items-end">
                
                <Box>
                    <Typography>
                        {FormUtils.FormatDate(props.data.creationDate)}
                        <></>
                     
                        <GenericMenu  
                            items={menupost} menuIcon={<MoreVert />} />
                    </Typography>
                </Box>
 
              <CardActions className='flex justify-end items-end'>
                <ModalComponent
                Method={()=> HandleVisisbility()}
                children={
                  <></>}ButtonTitle='Details' 
                        Title={ props.data.title}
                        Description={props.data.content} />
              </CardActions>
              { " : "+Isread ? "Read" : "unread" }
            </Box>
            <Divider />
        </section>
    </>
    )
}

interface UserNotificationComponentProps{
    dataTable: GetNotificationDto[];
}
const UserNotificationComponent: FC<UserNotificationComponentProps> = ({ dataTable }) => {
    if(dataTable.length === 0){
        return(
        <>
            <Skeleton width={500} height={300}> </Skeleton>
        </>)
    }
    else{
        return (
            <>
              <section className='flex flex-col space-y-4'>
                    {dataTable.map((notification) => (
                        
                        <UserNotificationItem key={notification.id} data={notification} />
                    ))}
              </section>
            </>
        );
    }
};

export default UserNotificationComponent;