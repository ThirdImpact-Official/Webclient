import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import ForumTabItem from "./ForumTabItem";
import { Box, Pagination, Skeleton, Card, CardContent, Typography, Divider, Button } from "@mui/material";
import PostList from "../PostComponent/PostList";
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import AddPostForm from "../PostComponent/CreatePost";
import { AddPostForumDto } from "@/interfaces/PublicationInterface/Post/addPostForumDto";
import { useEffect, useState } from "react";
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

interface SelectedForumProps {
  selectedForum?: GetForumDto;
}

const SelectedForum: React.FC<SelectedForumProps> = ({ selectedForum }) => {
  const [forumData, setForumData] = useState<GetForumDto | null>(selectedForum || null);
  const [postData, setPostData] = useState<GetPostForumDto[] | null>(null);
  const [page, setPage] = useState<number>(1);

  const postAct = new PostAction();

  if (!selectedForum) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>No forum selected</Typography>
      </Box>
    );
  }

  const fetchPostFromForum = async (pageValue: number) => {
    try {
      const response = await postAct.getPostsByForumId(selectedForum.id, pageValue, 10);
      if (response.Success) {
        setPostData(response.Data as GetPostForumDto[]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPostForm = async (data: AddPostForumDto) => {
    try {
      const response = await postAct.createPostForForum(selectedForum.id, data);
      if (response.Success) {
        setPage(1);
        fetchPostFromForum(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchPostFromForum(value);
  };

  useEffect(() => {
    fetchPostFromForum(page);
  }, [selectedForum]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* Forum Header */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Forum
            </Typography>

            <ModalComponent
              Title="Add Post"
              ButtonTitle="Add Post"
              Description="Create a new post"
              children={<AddPostForm postParentId={forumData.id} onSubmit={handleAddPostForm} />}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <ForumTabItem dataitem={forumData} />
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          {postData ? (
            <>
              <PostList data={postData} />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination count={10} page={page} onChange={handlePageChange} />
              </Box>
            </>
          ) : (
            <Skeleton variant="rectangular" height={200} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SelectedForum;
