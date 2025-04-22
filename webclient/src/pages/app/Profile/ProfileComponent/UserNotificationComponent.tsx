import { data } from 'react-router-dom';
import { GetNotificationDto } from '../../../../interfaces/NotificationInterface/Notification/getNotificationDto';
import Notification from '../../Notification';
import { Box, Card, CardContent, Skeleton, Divider, CardActions } from '@mui/material';
import { FC } from 'react';
import Typography from '@mui/material/Typography';
import ModalComponent from '@/components/factory/GenericComponent/Modal';


interface NotificationItemProps {
    data :GetNotificationDto;
}
export const UserNotificationItem:FC<NotificationItemProps> = (props)=>{
    return (
    <>
        <section className='flex flex-grid gap-10 rounded-lg bg-white shadow-lg'>
            <Box className="items-start m-2 p-2">
                <Box>
                    <Typography className="items-center m-2 p-2">
                    { props.data.title}
                    </Typography>
                </Box>
            </Box>
            <Box className="items-end m-2 p-2">
              <Box>
                <Typography>
                    {props.data.creationDate}
                </Typography>
              </Box>
              <Box>
              </Box>
              <CardActions>
                <ModalComponent children={
                  <></>} ButtonTitle='Details' Title={ props.data.title} Description={props.data.content} />
              </CardActions>
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