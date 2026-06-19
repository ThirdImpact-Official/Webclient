import { GetPostForumDto } from "@/interfaces/PublicationInterface/Post/getPostForumDto";
import { Box, Typography, Container } from "@mui/material";
import PostItem from "./PostItem";

interface PostListProps {
  data: GetPostForumDto[];
  onDetails?: (post: GetPostForumDto) => void;
}

const PostList: React.FC<PostListProps> = ({ data, onDetails }) => {
  const handlePostDetails = (post: GetPostForumDto) => {
    onDetails?.(post);
  };

  return (
    <Container sx={{ px: 0 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#24292f", mb: 2 }}
      >
        Réponses
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {data.map((post) => (
          <PostItem
            key={post.id}
            dataitem={post}
            OnDetails={handlePostDetails}
          />
        ))}
      </Box>
    </Container>
  );
};

export default PostList;
