import { GetPostForumDto } from "@/interfaces/PublicationInterface/Post/getPostForumDto"
import { Box, Typography,Container,Grid2 } from "@mui/material"

import PostItem from "./PostItem"
import React, { useState } from "react"
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
        <Container>

            <Typography variant="h6">Réponses</Typography>
            <Box className="space-y-4">
                {data.map((post) => (
                     
                        <PostItem key={post.id} dataitem={post} OnDetails={handlePostDetails} />
                ))}
            </Box>
        </Container>
    );
};
export default PostList;