import { GetPostForumDto } from "@/interfaces/PublicationInterface/Post/getPostForumDto";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useMemo, useState } from "react";
import GenericMenu, { GenericMenuItemProps } from "@/components/common/GenericMenu";
import img from "@/assets/Image/miaou.jpg";

interface PostItemProps {
  dataitem: GetPostForumDto;
  OnDetails?: (org: GetPostForumDto) => void;
}

const SubPostItem: React.FC<PostItemProps> = ({ dataitem, OnDetails }) => {
  const [item] = useState<GetPostForumDto>(dataitem);

  const menupost: GenericMenuItemProps[] = useMemo(
    () => [
      {
        label: "Modify",
        icon: <MoreVert />,
        onClick: () => console.log("Modify"),
        modalTitle: "Modify the post",
        modalContent: (
          <>
            <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
            <p>Do you want to modify this post?</p>
          </>
        ),
      },
      {
        label: "Delete",
        icon: <MoreVert />,
        color: "#FF0000",
        onClick: () => console.log("Delete"),
        modalTitle: "Delete the post",
        modalContent: (
          <>
            <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
            <p>Are you sure you want to delete this post?</p>
          </>
        ),
      },
      {
        label: "Report",
        icon: <MoreVert />,
        onClick: () => console.log("Report"),
        modalTitle: "Report the post",
        modalContent: (
          <>
            <img src={img} alt="Illustration" style={{ maxWidth: "100%" }} />
            <p>Does this content seem inappropriate to you?</p>
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
          <Avatar
            sx={{
              bgcolor: "#0969da",
              fontWeight: 600,
            }}
          >
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
    </Card>
  );
};

export default SubPostItem;
