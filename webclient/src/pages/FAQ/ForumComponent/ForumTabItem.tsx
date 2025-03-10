import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { Divider,Typography,Card, CardHeader, CardContent,CardActions, Avatar} from '@mui/material';
import FormatUtils from "@/classes/FormUtils";

interface ForumTabItemProps {
    dataitem: GetForumDto 
    children?: React.ReactNode
}
const ForumTabItem: React.FC<ForumTabItemProps> = ({ dataitem,children}) => {
  const formatDate = (date: Date): string => {
    return
  };

  return (
    <>
        <Card className="grid grid-flow-row items-center m-2">
            <CardHeader className="flex justify-end float-end p-2"
                avatar={
                    <Avatar>

                    </Avatar>
                }
                title={ <Typography variant="h5">{dataitem.title}</Typography>}
                action={
                        <Typography variant="body1">
                            {new Date(dataitem.creationDate).toLocaleDateString()}
                        </Typography>
                    }
                >
            </CardHeader>
            <CardContent className="ps-4">
                <Divider className="mt-4" />
                <Typography variant="body1" noWrap>
                {dataitem.content}
                </Typography>
            </CardContent>
            <CardActions className="flex justify-end">
                {children}
            </CardActions>
        </Card>
    </>
  );
};

export default ForumTabItem;