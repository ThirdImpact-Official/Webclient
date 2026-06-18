import { Box, Card, CardActions, CardContent, Divider, Grid2 } from '@mui/material';
import { GetUserDto } from '@/interfaces/User/GetUserDto';
import { useState, useEffect, useRef, useMemo } from 'react';
import { GetNotificationDto } from '@/interfaces/NotificationInterface/Notification/getNotificationDto';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Skeleton } from "@mui/material";
import GenericTabs, { TabItem } from '../../../components/factory/GenericComponent/TabGénéric';
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import { UserAction } from '@/actions/UserAction';
import { NotificationAction } from '@/actions/NotificationAction';
import { Settings } from '@mui/icons-material';
import UserNotificationComponent from './ProfileComponent/UserNotificationComponent';
import UpdateUserComponent from './ProfileComponent/UpdateUser';
import UpdatePassword from './ProfileComponent/UpdatePassword';
import GenericMenu from '@/components/common/GenericMenu';

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
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  const [user, setUser] = useState<GetUserDto | null>(null);
  const [notification, setNotification] = useState<GetNotificationDto[] | null>(FakeNotifications);

  const useraction = new UserAction();
  const notificAction = new NotificationAction();

  const goToTab = (index: number) => {
    if (tabsRef.current) {
      tabsRef.current.changeTab(index);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await useraction.GetCurrentUser();
      if (response.Success) setUser(response.Data as GetUserDto);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const fetchNotification = async () => {
    try {
      const response = await notificAction.getAllNotifications(1, 5);
      if (response.Success) setNotification(response.Data as GetNotificationDto[]);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    if (user == null) {
      fetchUser();
      fetchNotification();
    }
  }, [user]);

  const tabs: TabItem[] = [
    {
      label: "Notifications",
      content: notification == null ? <Skeleton /> : <UserNotificationComponent dataTable={notification} />,
    },
    {
      label: "Settings",
      content: <></>,
    },
  ];

  const menupost = useMemo(
    () => [
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
        ),
      },
    ],
    []
  );

  return (
    <Box className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT COLUMN — PROFILE CARD */}
        <section className="w-full md:w-1/3">
          {user ? (
            <Card className="rounded-xl border border-gray-200 bg-white">
              <Box className="flex justify-end p-2">
                <GenericMenu items={menupost} />
              </Box>

              <CardContent className="flex flex-col items-center text-center">
                <Avatar
                  sx={{ bgcolor: "secondary.main", width: 110, height: 110 }}
                  alt={user.username}
                  src="/static/images/avatar/1.jpg"
                />
                <Typography variant="h6" className="mt-3 font-semibold">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  @{user.username}
                </Typography>
              </CardContent>

              <Divider />

              <CardContent className="space-y-2">
                <Typography variant="subtitle2" className="uppercase text-gray-500 tracking-wide">
                  Profile Information
                </Typography>

                <Typography><strong>Username:</strong> {user.username}</Typography>
                <Typography><strong>Email:</strong> {user.email}</Typography>
                <Typography><strong>Last Name:</strong> {user.lastName}</Typography>
              </CardContent>

              <CardActions className="flex justify-center gap-3 pb-4">
                <ModalComponent
                  children={<UpdateUserComponent data={user} />}
                  ButtonTitle="Update Profile"
                  Title="Update Profile"
                  Description="Update Profile"
                />
                <ModalComponent
                  children={<UpdatePassword />}
                  ButtonTitle="Update Password"
                  Title="Update Password"
                  Description="Update Password"
                />
              </CardActions>
            </Card>
          ) : (
            <Skeleton width={500} height={300} />
          )}
        </section>

        {/* RIGHT COLUMN — TABS */}
        <Grid2 className="w-full md:w-2/3">
          <Card className="rounded-xl border border-gray-200 bg-white">
            <CardContent>
              <GenericTabs
                tabs={tabs}
                ref={tabsRef}
                defaultTab={0}
                ChangeTab={goToTab}
              />
            </CardContent>
          </Card>
        </Grid2>
      </div>
    </Box>
  );
};

export default ProfileComponent;
