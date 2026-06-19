import { GetNotificationDto } from '../../../../interfaces/NotificationInterface/Notification/getNotificationDto';
import { Box, Card, CardContent, Skeleton, Divider, CardActions } from '@mui/material';
import { MoreVert, Settings } from '@mui/icons-material';
import { FC, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import { NotificationAction } from '@/actions/NotificationAction';
import FormUtils from '../../../../classes/FormUtils';
import GenericMenu, { GenericMenuItemProps } from '@/components/common/GenericMenu';
import { TabItem } from '@/components/factory/GenericComponent/TabGénéric';


export interface UserSettings{
    id: number;
    title: string;
    content: string;
    link: string;
}
interface UserSettingsItemProps {
    data: UserSettings;
}

export const UserSettingsItem: FC<UserSettingsItemProps> = ({ data }) => {
    const action = new NotificationAction();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleVisibility = () => {
        if (isVisible) return;
        setIsVisible(true);
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
                {/* Header */}
                <Box className="flex justify-between items-start">
                    <Box>
                        <Typography
                            variant="subtitle1"
                            className="font-semibold text-[#24292f]"
                        >
                            {data.title}
                        </Typography>
                    </Box>
                </Box>

                <Divider className="my-3 border-[#d8dee4]" />

                {/* Content */}
                <Typography variant="body2" className="text-[#24292f]">
                    {data.content}
                </Typography>

                {/* Footer */}
                <CardActions className="flex justify-between items-center mt-3 p-0">
                    <ModalComponent
                        Method={handleVisibility}
                        children={<></>}
                        ButtonTitle="change"
                        Title={data.title}
                        Description={data.content}
                    />

                    <span
                        className={`
                            px-2 py-1 text-xs rounded-md font-medium
                            ${isVisible
                                ? "bg-[#dafbe1] text-[#116329]"
                                : "bg-[#fff8c5] text-[#9a6700]"
                            }
                        `}
                    >
                        {isVisible ? "Read" : "Unread"}
                    </span>
                </CardActions>
            </CardContent>
        </Card>
    );
};


interface UserSettingsComponentProps {
    dataTable: UserSettings[];
}

const UserSettingsComponent: FC<UserSettingsComponentProps> = ({ dataTable }) => {
    if (dataTable.length === 0) {
        return <Skeleton width={500} height={300} />;
    }

    return (
        <section
            className="
                flex flex-col space-y-2
                bg-white
                border border-[#d0d7de]
                rounded-md
                p-4
            "
        >
            {dataTable.map((notification) => (
                <UserSettingsItem key={notification.id} data={notification} />
            ))}
        </section>
    );
};


export default UserSettingsComponent;
