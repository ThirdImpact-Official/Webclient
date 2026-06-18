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
        setIsRead(!isRead);
        action.setNotificationVisibility(data.id);
    };

    const menupost: GenericMenuItemProps[] = useMemo(() => [
        {
            label: "Settings",
            icon: <Settings />,
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
            className="border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
            elevation={0}
        >
            <CardContent className="p-4">
                {/* Header */}
                <Box className="flex justify-between items-start">
                    <Box>
                        <Typography variant="subtitle1" className="font-semibold">
                            {data.title}
                        </Typography>

                        <Typography variant="caption" className="text-gray-500">
                            {FormUtils.FormatDate(data.creationDate)}
                        </Typography>
                    </Box>

                    <GenericMenu items={menupost} menuIcon={<MoreVert />} />
                </Box>

                <Divider className="my-3" />

                {/* Content */}
                <Typography variant="body2" className="text-gray-700">
                    {data.content}
                </Typography>

                {/* Footer */}
                <CardActions className="flex justify-between items-center mt-3 p-0">
                    <ModalComponent
                        Method={handleVisibility}
                        children={<></>}
                        ButtonTitle="Details"
                        Title={data.title}
                        Description={data.content}
                    />

                    <span
                        className={`px-2 py-1 text-xs rounded-md font-medium ${
                            isRead
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        {isRead ? "Read" : "Unread"}
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
        <section className="flex flex-col space-y-3">
            {dataTable.map((notification) => (
                <UserNotificationItem key={notification.id} data={notification} />
            ))}
        </section>
    );
};

export default UserNotificationComponent;
