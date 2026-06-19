import { GetNotificationDto } from '../../../../interfaces/NotificationInterface/Notification/getNotificationDto';
import { Box, Card, CardContent, Skeleton, Divider, CardActions } from '@mui/material';
import { MoreVert, Settings } from '@mui/icons-material';
import { FC, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import { NotificationAction } from '@/actions/NotificationAction';
import FormUtils from '../../../../classes/FormUtils';
import GenericMenu, { GenericMenuItemProps } from '@/components/common/GenericMenu';

interface NotificationItemProps {
    data: GetNotificationDto;
}

export const UserNotificationItem: FC<NotificationItemProps> = ({ data }) => {
    const action = new NotificationAction();
    const [isRead, setIsRead] = useState<boolean>(data.isRead);

    const handleVisibility = () => {
        if (isRead) return;
        setIsRead(true);
        action.setNotificationVisibility(data.id);
    };

    const menupost: GenericMenuItemProps[] = useMemo(() => [
        {
            label: "Settings",
            icon: <Settings fontSize="small" />,
            onClick: () => console.log("Modification"),
            modalTitle: "Modify the post",
            modalContent: (
                <>
                    <img src="" alt="Illustration" style={{ maxWidth: "100%" }} />
                    <p>Do you want to modify this post?</p>
                </>
            )
        }
    ], []);

    return (
        <Card
            className="
                border border-[#d0d7de]
                rounded-md
                bg-[#f6f8fa]
                hover:bg-[#f3f4f6]
                transition-all
                duration-150
            "
            elevation={0}
        >
            <CardContent className="p-4">
                <Box className="flex justify-between items-start">
                    <Box>
                        <Typography
                            variant="subtitle1"
                            className="font-semibold text-[#24292f]"
                        >
                            {data.title}
                        </Typography>

                        <Typography
                            variant="caption"
                            className="text-[#57606a] font-mono"
                        >
                            {FormUtils.FormatDate(data.creationDate)}
                        </Typography>
                    </Box>

                    <GenericMenu items={menupost}>
                        <MoreVert className="text-[#57606a] cursor-pointer" />
                    </GenericMenu>
                </Box>

                <Divider className="my-3 border-[#d8dee4]" />

                <Typography variant="body2" className="text-[#24292f]">
                    {data.content}
                </Typography>

                <CardActions className="flex justify-between items-center mt-3 p-0">
                    <ModalComponent
                        Method={handleVisibility}
                        children={<></>}
                        ButtonTitle="Details"
                        Title={data.title}
                        Description={data.content}
                    />

                    <span
                        className={`
                            px-2 py-1 text-xs rounded-md font-medium
                            ${isRead
                                ? "bg-[#dafbe1] text-[#116329]"
                                : "bg-[#fff8c5] text-[#9a6700]"
                            }
                        `}
                    >
                        {isRead ? "Available" : "Unavailable"}
                    </span>
                </CardActions>
            </CardContent>
        </Card>
    );
};

interface UserNotificationComponentProps {
    dataTable: GetNotificationDto[];
}

const UserNotificationComponent: FC<UserNotificationComponentProps> = ({ dataTable }) => {
    if (dataTable.length === 0) {
        return <Skeleton width={500} height={300} />;
    }

    return (
        <section
            className="
                flex flex-col space-y-2
                bg-white
                rounded-md
                p-4
            "
        >
            {dataTable.map((notification) => (
                <UserNotificationItem key={notification.id} data={notification} />
            ))}
        </section>
    );
};


export default UserNotificationComponent;
