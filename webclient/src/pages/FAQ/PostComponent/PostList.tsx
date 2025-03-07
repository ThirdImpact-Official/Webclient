import { GetPostForumDto } from "@/interfaces/PublicationInterface/Post/getPostForumDto"
import { Box, Typography } from "@mui/material"
import PostItem from "./PostItem"
import { useState } from "react"
interface PostlistProps{
    data: GetPostForumDto[]
    OnDetails?: (org: GetPostForumDto) => void
}

/**
 * Component PostList
 * 
 * @param {{ data: GetPostForumDto[]; onDetails?: (post: GetPostForumDto) => void }} props
 * 
 * @returns Un composant React affichant une liste de posts
 */
const PostList: React.FC<{ data: GetPostForumDto[]; onDetails?: (post: GetPostForumDto) => void }> = ({ data, onDetails }) => {
    const handlePostDetails = (post: GetPostForumDto) => {
        onDetails?.(post);
    };

    return (
        <Box>
            <Typography variant="h6">Réponses</Typography>
            <Box className="space-y-4">
                {data.map((post) => (
                    <PostItem key={post.PostId} dataitem={post} OnDetails={handlePostDetails} />
                ))}
            </Box>
        </Box>
    );
};
export default PostList;