import { GetPostForumDto } from "@/interfaces/PublicationInterface/Post/getPostForumDto";
import { Card, CardContent, CardHeader, Box, Typography, Divider } from '@mui/material';
import { Dashboard, Home, MoreVert, Settings } from '@mui/icons-material';
import { useMemo, useState } from "react";
import { GenericMenuItemProps } from "@/components/common/GenericMenu";
import GenericMenu from "@/components/common/GenericMenu";
import Avatar from '@mui/material/Avatar';
import img from "@/assets/Image/miaou.jpg";
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import AddPostForm from "../../PostComponent/CreatePost";
import { AddPostForumDto } from "@/interfaces/PublicationInterface/Post/addPostForumDto";

interface PostItemProps {
    dataitem: GetPostForumDto;
    OnDetails?:(org:GetPostForumDto) => void
}

const PostItem: React.FC<PostItemProps> = ({ dataitem, OnDetails }) => {
    const [item, setItem] = useState<GetPostForumDto>(dataitem);

    const handleAddPostForm = (data: AddPostForumDto) => {
        console.log("Data submitted:", data);
    };

    const menupost: GenericMenuItemProps[] = useMemo(() => [
        {
            label: "Modify",
            icon: <Settings />,
            onClick: () => console.log("Modification"),
            modalTitle: "Modify the post",
            modalContent: (
                <>
                    <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
                    <p>Do you want to modify this post?</p>
                </>
            )
        },
        {
            label: "Delete",
            icon: <Home />,
            onClick: () => console.log("Deletion"),
            color: "#FF0000",
            modalTitle: "Delete the post",
            modalContent: (
                <>
                    <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
                    <p>Are you sure you want to delete this post?</p>
                </>
            )
        },
        {
            label: "Report",
            icon: <Dashboard />,
            onClick: () => console.log("Report"),
            modalTitle: "Report the post",
            modalContent: (
                <>
                    <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
                    <p>Does this content seem inappropriate to you?</p>
                </>
            )
        }
    ], []);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar>
                        R
                    </Avatar>
                }
                action={
                    <Box className="flex justify-end">
                        <Typography 
                            className="pt-2 pr-4" 
                            variant="subtitle2">
                            {new Date(item.creationDate).toLocaleDateString()}
                        </Typography>
                        <GenericMenu items={menupost} menuIcon={<MoreVert />} />
                    </Box>
                }
            />
            <Divider />
            <CardContent className="flex justify-start ps-4 pb-4">
                <Box className="post-item-content flex justify-start ps-4 pb-4">
                    <Typography>{item.content}</Typography>
                </Box>
            </CardContent>
            <Box className="post-item-footer flex pb-2 justify-end">
                <ModalComponent 
                    children={<AddPostForm onSubmit={handleAddPostForm} />}
                    Title="Add response"
                    ButtonTitle="Reply"
                    Description="Add your response"
                />
            </Box>
        </Card>
    );
};

export default PostItem;
