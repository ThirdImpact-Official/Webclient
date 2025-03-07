import { GetPostForumDto} from "@/interfaces/PublicationInterface/Post/getPostForumDto";
import { Box, Typography, Button, Menu, MenuList, MenuItem, ListItemIcon, ListItem, IconButton } from '@mui/material';
import { Dashboard, Home, Settings } from '@mui/icons-material';
import { useState } from "react";
import { GenericMenuItemProps } from "@/components/common/GenericMenu";
import GenericMenu from "@/components/common/GenericMenu";
import MenuIcon from '@mui/icons-material/Menu';
import DensityMedium from '@mui/icons-material/DensityMedium';
import img from "@/assets/Image/miaou.jpg";
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import AddPostForm from './CreatePost';
import { AddPostForumDto } from "@/interfaces/PublicationInterface/Post/addPostForumDto";

interface PostItemProps {
    dataitem: GetPostForumDto;
    OnDetails?:(org:GetPostForumDto) => void
}


const PostItem: React.FC<PostItemProps> = ({ dataitem, OnDetails }) => {
    const [item, setItem] = useState<GetPostForumDto>(dataitem);

    const handleSignalement=() => {

    }
    const handleAddPostForm=(data:AddPostForumDto) => {
        console.log("", data);
    }
    const menupost: GenericMenuItemProps [] =
    [
        {
            label: "Modifier",
            icon: <><Settings/></>,
            onClick: () => {console.log("hey gho")},
            modalTitle: "Modifier",
            modalContent:<>
                    <img src={img} />
                    <p>Nique ta mère</p>
            </> 
        },
        {
            label: "Supprimer",
            icon: <><Home/></>,
            onClick: () => {console.log("hey ho")},
            color: "#FF0000",
            modalTitle: "Supprimer",
            modalContent:<>
                    <img src={img} />
                    <p>Nique ta mère</p>
                </> 
        },
        {
            label: "Signaler",
            icon: <><Dashboard/></>,
            onClick: () => {console.log("hey ho")},
            modalTitle: "Signalement",
            modalContent:<>
                <img src={img} />
                <p>Nique ta mère</p>
            </> 
        },
    ] 
    return (
        <Box className="grid grid-flow-row border post-item">
            <Box className="post-item-header pt-4 flex justify-end">
                <Typography className="" variant="subtitle2">{item.creationDate}</Typography>
               
              <GenericMenu items={menupost}  
                           menuIcon={<><DensityMedium/></>} />
            </Box>
            <Box className="post-item-content flex justify-start ps-4 pb-4">
                <Typography>{item.content}</Typography>
            </Box>
            <Box className="post-item-footer flex  justify-end">
                <ModalComponent children={<><AddPostForm onSubmit={handleAddPostForm} /></>}
                                Title="Add response"
                                ButtonTitle="repondre"
                                Description="Huh" />
            </Box>
        </Box>
    );
};
export default PostItem;