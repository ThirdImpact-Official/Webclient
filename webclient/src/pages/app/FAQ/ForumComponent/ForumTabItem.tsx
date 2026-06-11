import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { Divider,Typography,Card, CardHeader, CardContent,CardActions, Avatar,Button,Menu,MenuItem, Box, FormControl} from '@mui/material';
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import AddPostForm from '../PostComponent/CreatePost';
import { useState } from "react";
import { DensityMedium } from '@mui/icons-material';

interface ForumTabItemProps {
    dataitem: GetForumDto 
    children?: React.ReactNode
}
const ForumTabItem: React.FC<ForumTabItemProps> = ({ dataitem,children}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const formatDate = (date: Date): string => {
    return
  };

  return (
    <>
    <Card className="m-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all">
        <CardHeader 
            className="flex justify-between items-center p-4"
            avatar={<Avatar className="bg-blue-500 text-white">{/* Optionally, you can add initials or icon here */}</Avatar>}
            title={<Typography variant="h6" className="font-semibold">{dataitem.title}</Typography>}
            action={
                <FormControl className=" flow-root">
                    <Typography variant="body2" className="text-gray-500 float-end">
                        {new Date(dataitem.creationDate).toLocaleDateString()}
                    </Typography>
                    <Button className="float-end"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                    <DensityMedium />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </FormControl>
            }
        />
        <CardContent className="px-4">
            <Divider className="my-4" />
            <Typography variant="body2" className="text-gray-700">
            {dataitem.content}
            </Typography>
        </CardContent>
        <CardActions className="flex justify-end space-x-2 p-4">
            {children}
        </CardActions>
        </Card>
    </>
  );
};

export default ForumTabItem;