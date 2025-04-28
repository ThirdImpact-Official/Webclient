import { GetPostForumDto} from "@/interfaces/PublicationInterface/Post/getPostForumDto";
import { Card, CardContent, CardHeader, Box, Typography, Divider,Container, CardActionArea, CardActions } from '@mui/material';
import { Dashboard, Home, MoreVert, Settings } from '@mui/icons-material';
import { useMemo, useState,useEffect } from "react";
import { GenericMenuItemProps } from "@/components/common/GenericMenu";
import GenericMenu from "@/components/common/GenericMenu";
import Avatar from '@mui/material/Avatar';
import img from "@/assets/Image/miaou.jpg";
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import AddPostForm from './CreatePost';
import { AddPostForumDto } from "@/interfaces/PublicationInterface/Post/addPostForumDto";
import {PostAction} from "@/actions/PostAction";
import SubPostList from '../ForumComponent/PostComponent/SubPostList';



interface PostItemProps {
    dataitem: GetPostForumDto;
    OnDetails?:(org:GetPostForumDto) => void
}


const PostItem: React.FC<PostItemProps> = ({ dataitem, OnDetails }) => {
    const [item, setItem] = useState<GetPostForumDto>(dataitem);
  

    const [postChild,setPostChild] = useState<GetPostForumDto[]>([]);
    const [page,setPAge] = useState<number>(1);
    const action =new PostAction();
    
       

        const fetchPOstChild = async ()=> {
            try {
                const response = await action.getPostsFromPostParentId(item.id,page,5);
                if(response.Success){
                    setPostChild(response.Data as GetPostForumDto[]);
                }
            }
            catch (e) {
    
            }
        }
        useEffect(() => {
             fetchPOstChild();
        },[item])
    const handleAddPostForm= async (data:AddPostForumDto) => {
        try {
            
            console.log("object", data);
            data.postparentId = item.id;
            data.forumId = item.forumId;
            const response = await action.createPostForPostParent(item.id,data);
            if(response.Success) {
              
                console.log(response.Data);
                console.log(response.Message);
            }
        }
        catch (e) {
                console.log("Error", e.message);
        }
    }
    const menupost: GenericMenuItemProps [] = useMemo(() => 
    [
        {
            label: "Modifier",
            icon: <Settings />,
            onClick: () => console.log("Modification"),
            modalTitle: "Modifier le post",
            modalContent: (
                <>
                    <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
                    <p>Voulez-vous modifier ce post ?</p>
                </>
            )
        },
        {
            label: "Supprimer",
            icon: <Home />,
            onClick: () => console.log("Suppression"),
            color: "#FF0000",
            modalTitle: "Supprimer le post",
            modalContent: (
                <>
                    <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
                    <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
                </>
            )
        },
        {
            label: "Signaler",
            icon: <Dashboard />,
            onClick: () => console.log("Signalement"),
            modalTitle: "Signaler le post",
            modalContent: (
                <>
                    <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
                    <p>Ce contenu vous semble inapproprié ?</p>
                </>
            )
        }
    ],[] );

    return (
        <Card>
            <CardHeader
                avatar={
                    <>
                        <Avatar>
                            R
                        </Avatar>
                    </>
                }
                action={
                    <Box className=" flex justify-end">
                        
                        <Typography 
                                className="pt-2 pr-4" 
                                variant="subtitle2">{ new Date(item.creationDate).toLocaleDateString()}
                        </Typography>
                        <GenericMenu items={menupost}  
                            menuIcon={<><MoreVert/></>} />
                    </Box>
                } >
            </CardHeader>
            <Divider/>
            <CardContent 
                className="flex justify-start ps-4 pb-4">
                <Box className="post-item-content flex justify-start ps-4 pb-4">
                    <Typography>{item.content}</Typography>
                </Box>
            </CardContent> 
            <CardActions className="post-item-footer flex space-x-4 m-2 pb-2 justify-end">
                    <ModalComponent children={<>
                                            <AddPostForm  
                                                postParentId={item.id}
                                                onSubmit={handleAddPostForm} />
                                        </>}
                                    Title="Add response"
                                    ButtonTitle="repondre"
                                    Description="Huh" />
          
                    <ModalComponent    
                            ButtonTitle="Comments"
                            Title="Details"
                            ButtonColor="success"
                            Description="Details" >
                        <Container className="space-y-4 space-x-4">
                            <SubPostList data={postChild} />
                        </Container>
                    </ModalComponent>
            </CardActions>
        </Card>
    );
};
export default PostItem;