import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import {
  Divider,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton
} from "@mui/material";
import { DensityMedium } from "@mui/icons-material";
import { useState } from "react";

interface ForumTabItemProps {
  dataitem: GetForumDto;
  children?: React.ReactNode;
}

const ForumTabItem: React.FC<ForumTabItemProps> = ({ dataitem, children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

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
            {dataitem.title.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#24292f" }}>
            {dataitem.title}
          </Typography>
        }
        subheader={
          <Typography sx={{ color: "#57606a", fontSize: "0.85rem" }}>
            {new Date(dataitem.creationDate).toLocaleDateString()}
          </Typography>
        }
        action={
          <IconButton onClick={handleClick}>
            <DensityMedium />
          </IconButton>
        }
        sx={{
          borderBottom: "1px solid #d8dee4",
          pb: 1,
        }}
      />

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

      <CardContent sx={{ p: 2 }}>
        <Typography sx={{ color: "#24292f", mb: 2 }}>
          {dataitem.content}
        </Typography>
      </CardContent>

      <Divider />

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
          gap: 1,
        }}
      >
        {children}
      </CardActions>
    </Card>
  );
};

export default ForumTabItem;
