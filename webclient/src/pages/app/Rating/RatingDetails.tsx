import { Stack, Box, Avatar, Typography, CardContent, Card, CircularProgress } from "@mui/material"
import { GetRatingDto } from '@/interfaces/EscapeGameInterface/Rating/Rating';
import { useEffect, useState } from "react";
import RenderDetail from "@/components/factory/GenericComponent/RenderDetails";
import { GetUserDto } from "@/interfaces/User/GetUserDto";
import { UnitofAction } from "@/actions/UnitofAction";
import { Label } from '@mui/icons-material';

interface RatingDetailsProps {
    data: GetRatingDto
}

const RatingDetails:React.FC<RatingDetailsProps> = (props) => {

    const [data, setData] = useState<GetRatingDto>(props.data);
    const [user, setUser] = useState<GetUserDto>()
    const [isloading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const action = new UnitofAction()
    const fetchUser = async () => {
        const [isLoading, setLoading] = useState<boolean>(false);
        const response = await action.userAction.GetUserById(Number(data.userId));
        if (response.Success) {
            setUser(response.Data as GetUserDto)
        } else {
            setError("failed to fetch User data :" + response.Message);
        }
    }
        useEffect(() => {
            fetchUser();
        }, [data])
    
        // Compute userPicture so it's available in JSX
        const userPicture = user?.picture == null ? user?.firstName?.charAt(0) : user?.picture;
    
        if (isloading) {
            return (
                <Card>
                    <CardContent>
                        <CircularProgress />
                    </CardContent>
                </Card>
            )
        }
        if (error) {
            return (
                <Card>
                    <CardContent>
                        <Typography>
                            {error}
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
        return (
            <Stack>
                <Box className="flex items-center p-6 gap-3">
                    <Avatar
                        alt={user?.firstName || 'User'}
                        src={typeof userPicture === 'string' && userPicture.length > 1 ? userPicture : undefined}
                        className="h-9 w-9"
                    >
                        {typeof userPicture === 'string' && userPicture.length === 1 ? userPicture : '?'}
                    </Avatar>
                    <Box className="flex flex-col flex-grow">
                        <Typography
                            variant="body2"
                            className="font-medium leading-tight"
                        >
                            {user?.username}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {user?.email}
                        </Typography>
                    </Box>
                </Box>
                <Stack>
                    {
                        [
                            { label: "Titre", value: data?.rateTitle },
                            { label: "Description", value: data?.rateContent },
    
                        ].map((item, index) => (
                            item.value && <>
                                <RenderDetail value={item.value} label={item.label} />
                            </>
                        ))
                    }
                </Stack>
    
            </Stack>
        )
    }

export default RatingDetails;