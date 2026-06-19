import { GetPostForumDto } from "@/interfaces/PublicationInterface/Post/getPostForumDto";
import { Box, Typography } from "@mui/material";
import SubPostItem from "./SubPostItem";

interface SubPostListProps {
  data: GetPostForumDto[];
  onDetails?: (post: GetPostForumDto) => void;
}

const SubPostList: React.FC<SubPostListProps> = ({ data, onDetails }) => {
  const handlePostDetails = (post: GetPostForumDto) => {
    onDetails?.(post);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#24292f", mb: 1 }}
      >
        Réponses
      </Typography>

      {data.map((post) => (
        <SubPostItem
          key={post.id}
          dataitem={post}
          OnDetails={handlePostDetails}
        />
      ))}
    </Box>
  );
};

export default SubPostList;
