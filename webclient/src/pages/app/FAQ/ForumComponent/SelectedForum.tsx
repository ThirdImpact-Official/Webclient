import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import ForumTabItem from "./ForumTabItem";
import { Box, Grid2, Pagination, Skeleton } from '@mui/material';
import PostList from "../PostComponent/PostList";
import img from "@/assets/Image/miaou.jpg";
import { useEffect } from "react";
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import AddPostForm from '../PostComponent/CreatePost';
import { AddPostForumDto } from "@/interfaces/PublicationInterface/Post/addPostForumDto";
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
    const [PostData,setPostData ]=useState<GetPostForumDto [] | null>([]);
    const [page,setPage]= useState<number>(1);
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
    const handleAddPostForm = async (data:AddPostForumDto) => {
        try {
            const response= await postAct.createPostForForum(selectedForum.id,data);
            if(response.Success){
                setPage(1);
                fetchPostFromForum(page);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        try {
            setPage(value);
            fetchPostFromForum(page);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchPostFromForum = async (value:number) => {
        try {
            const response= await postAct.getPostsByForumId(selectedForum.id,page,10);
            if(response.Success){
                console.log(response.Data);
                setPostData(response.Data as GetPostForumDto []);
            }
            

        } catch (error) {
            console.error(error);
        }
    }
    //----Useeffect----------
    useEffect(() => {
        fetchPostFromForum(page);
    },[setForumdata])
    //-----------------------
    return(
    <>
    <Box>
       
        <Box>
        <Box className="post-item-footer flex pe-2 pb-2 justify-end ">
                    <ModalComponent 
                            children={<>
                                    <AddPostForm  
                                        postParentId={Forumdata.id} 
                                        onSubmit={handleAddPostForm} />
                                    </>}
                            Title="Add response"
                            ButtonTitle="ajouter un post"
                            Description="Huh" />
            </Box>
            <ForumTabItem dataitem={Forumdata}/>
        </Box>
        <Box className="pt-4">
            {
                PostData !=null ?
                <Grid2>
                    <PostList   data={PostData}  />
                    <Pagination 
                        count={10} 
                        page={page} 
                        onChange={handlePageChange} />
                </Grid2>
                :<Skeleton  
                    width={500} 
                    height={100}> </Skeleton>
            }
        </Box>
    </Box>

    </>)
}
export default SelectedForum;