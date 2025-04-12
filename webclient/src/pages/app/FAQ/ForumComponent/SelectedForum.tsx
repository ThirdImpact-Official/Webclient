import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import ForumTabItem from "./ForumTabItem";
import { Box, Skeleton } from '@mui/material';
import PostList from "../PostComponent/PostList";
import img from "@/assets/Image/miaou.jpg";
import { useEffect } from "react";

import React, { useState } from "react";
import { PostAction } from "@/actions/PostAction";

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

interface SelectedForumProps{
    selectedForum?: GetForumDto;
}

const SelectedForum:React.FC<SelectedForumProps> = ({selectedForum}) => {
    const [Forumdata,setForumdata] =useState<GetForumDto>(selectedForum); 
    const [PostData,setPostData ]=useState<GetPostForumDto []|null>(null);
    const [page,setPage]= useState(1);
    //-----api Call-------
    const postAct= new PostAction();
    //-----------------------
    if(selectedForum==null){
        return(
            <div>
                <p>Nope</p>
            </div>
        );
    }
    const fetchPostFromForum = async () => {
        try {
            const response= await postAct.getPostsByForumId(selectedForum.id,1,10);
            if(response.Success){
                setPostData(response.Data as GetPostForumDto[]);
            }
            

        } catch (error) {
            console.error(error);
        }
    }
    //----Useeffect----------
    useEffect(() => {
        fetchPostFromForum();
    },[setForumdata])
    //-----------------------
    return(
    <>
    <Box>
       
        <Box>
            <ForumTabItem dataitem={Forumdata}/>
        </Box>
        <Box className="pt-4">
            {
                PostData !=null ?
                <PostList data={PostData }  />
                :<Skeleton width={500} height={100}> </Skeleton>
            }
        </Box>
    </Box>

    </>)
}
export default SelectedForum;