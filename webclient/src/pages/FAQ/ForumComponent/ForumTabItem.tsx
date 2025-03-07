import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { Divider,Box,Typography, Button, Pagination} from '@mui/material';
import FormatUtils from "@/classes/FormUtils";

interface ForumTabItemProps {
    dataitem: GetForumDto 
    OnDetails?:(org:GetForumDto) => void
}
const ForumTabItem: React.FC<ForumTabItemProps> = ({ dataitem,OnDetails }) => {
  const formatDate = (date: Date): string => {
    return
  };

  return (
    <>
        <Box className="grid grid-flow-row items-center m-2">
            <Box className="flex justify-end float-end p-2">
                <Typography variant="body1">
                    {dataitem.creationDate}
                </Typography>

            </Box>
            <Box className="ps-4">
                <Typography variant="h5">{dataitem.title}</Typography>
                <Divider className="mt-4" />
                <Typography variant="body1" noWrap>
                {dataitem.content}
                </Typography>
            </Box>
            <Box className="flex justify-end float-end p-4">
                <Button onClick={()=>OnDetails(dataitem)} className="p-4" variant="contained">View</Button>
            </Box>
        </Box>
    </>
  );
};

export default ForumTabItem;