import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import ForumTabItem from "./ForumTabItem";
import { Box } from '@mui/material';
import PostList from "../PostComponent/PostList";
import img from "@/assets/Image/miaou.jpg";


import React, { useState } from "react";

export interface GetPostForumDto {
    PostId: number;
    content: string;
    userId: number;
    forumId: number | null;
    postparentId: number | null;
    hasLikeId: number | null;
    hasLike: HasLike | null;
    creationDate: string;
    updatedDate: string;
}

export interface HasLike {  
    id: number;
}  
const uri =  img;
const posts: GetPostForumDto[] = [
    {
        PostId: 1,
        content: "Premier post de test",
        userId: 101,
        forumId: 1,
        postparentId: null,
        hasLikeId: 1,
        hasLike: { id: 1 },
        creationDate: "2025-03-07T12:00:00Z",
        updatedDate: "2025-03-07T12:30:00Z",
    },
    {
        PostId: 2,
        content: "Deuxième post avec plus de texte pour voir l'affichage.",
        userId: 102,
        forumId: null,
        postparentId: null,
        hasLikeId: null,
        hasLike: null,
        creationDate: "2025-03-06T14:20:00Z",
        updatedDate: "2025-03-06T15:00:00Z",
    },
    {
        PostId: 3,
        content: "Un troisième message de test avec un like.",
        userId: 103,
        forumId: 2,
        postparentId: null,
        hasLikeId: 3,
        hasLike: { id: 3 },
        creationDate: "2025-03-05T10:00:00Z",
        updatedDate: "2025-03-05T10:45:00Z",
    },
    {
        PostId: 4,
        content: "Post sans like pour tester l'affichage.",
        userId: 104,
        forumId: 1,
        postparentId: null,
        hasLikeId: null,
        hasLike: null,
        creationDate: "2025-03-04T16:30:00Z",
        updatedDate: "2025-03-04T17:10:00Z",
    },
    {
        PostId: 5,
        content: "Un autre test avec un forum associé.",
        userId: 105,
        forumId: 3,
        postparentId: null,
        hasLikeId: 5,
        hasLike: { id: 5 },
        creationDate: "2025-03-03T09:15:00Z",
        updatedDate: "2025-03-03T09:45:00Z",
    }
];

interface SelectedForumProps{
    selectedForum?: GetForumDto;
}

const SelectedForum:React.FC<SelectedForumProps> = ({selectedForum}) => {
    const [Forumdata] =useState<GetForumDto>(selectedForum); 
    const [PostData,setPostData ]=useState(posts);
    if(selectedForum==null){
        return(
            <div>
                <p>Nope</p>
            </div>
        );
    }
    return(
    <>
    <Box>
       
        <Box>
            <ForumTabItem dataitem={Forumdata}/>
        </Box>
        <Box className="pt-4">
            <PostList data={PostData}  />
        </Box>
    </Box>

    </>)
}
export default SelectedForum;