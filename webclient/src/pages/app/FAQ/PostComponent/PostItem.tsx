import { GetPostForumDto } from "@/interfaces/PublicationInterface/Post/getPostForumDto";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Divider,
  Avatar,
  CardActions,
  Container,
} from "@mui/material";
import { MoreVert, Settings, Home, Dashboard } from "@mui/icons-material";
import { useMemo, useState, useEffect } from "react";
import GenericMenu, { GenericMenuItemProps } from "@/components/common/GenericMenu";
import img from "@/assets/Image/miaou.jpg";
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import AddPostForm from "./CreatePost";
import { AddPostForumDto } from "@/interfaces/PublicationInterface/Post/addPostForumDto";
import { PostAction } from "@/actions/PostAction";
import SubPostList from "../ForumComponent/PostComponent/SubPostList";

interface PostItemProps {
  dataitem: GetPostForumDto;
  OnDetails?: (org: GetPostForumDto) => void;
}

const PostItem: React.FC<PostItemProps> = ({ dataitem, OnDetails }) => {
  const [item, setItem] = useState<GetPostForumDto>(dataitem);
  const [postChild, setPostChild] = useState<GetPostForumDto[]>([]);
  const [page, setPage] = useState<number>(1);

  const action = new PostAction();

  const fetchPostChild = async () => {
    try {
      const response = await action.getPostsFromPostParentId(item.id, page, 5);
      if (response.Success) {
        setPostChild(response.Data as GetPostForumDto[]);
      }
    } catch {}
  };

  useEffect(() => {
    fetchPostChild();
  }, [item]);

  const handleAddPostForm = async (data: AddPostForumDto) => {
    try {
      data.postparentId = item.id;
      data.forumId = item.forumId;

      const response = await action.createPostForPostParent(item.id, data);
      if (response.Success) {
        fetchPostChild();
      }
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  const menupost: GenericMenuItemProps[] = useMemo(
    () => [
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
        ),
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
        ),
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
        ),
      },
    ],
    []
  );

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        mb: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#0969da", fontWeight: 600 }}>
            {item.userId.toString().charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ color: "#57606a", fontSize: "0.85rem" }}>
              {new Date(item.creationDate).toLocaleDateString()}
            </Typography>

            <GenericMenu items={menupost} menuIcon={<MoreVert />} />
          </Box>
        }
        sx={{
          borderBottom: "1px solid #d8dee4",
          pb: 1,
        }}
      />

      <CardContent sx={{ p: 2 }}>
        <Typography sx={{ color: "#24292f", mb: 1 }}>{item.content}</Typography>
      </CardContent>

      <Divider />

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          p: 2,
        }}
      >
        <ModalComponent
          Title="Répondre"
          ButtonTitle="Répondre"
          Description="Ajouter une réponse"
        >
          <AddPostForm postParentId={item.id} onSubmit={handleAddPostForm} />
        </ModalComponent>

        <ModalComponent
          ButtonTitle="Commentaires"
          Title="Commentaires"
          ButtonColor="success"
          Description="Voir les réponses"
        >
          <Container sx={{ p: 2 }}>
            <SubPostList data={postChild} />
          </Container>
        </ModalComponent>
      </CardActions>
    </Card>
  );
};

export default PostItem;
