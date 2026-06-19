import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { Box, Button, Typography } from "@mui/material";
import ForumTabItem from "./ForumTabItem";

interface ForumTabListProps {
  data: GetForumDto[];
  OnDetails: (org: GetForumDto) => void;
}

const ForumTabList: React.FC<ForumTabListProps> = ({ data, OnDetails }) => {
  const handleDetails = (item: GetForumDto) => {
    OnDetails(item);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      {data.map((item) => (
        <ForumTabItem
          key={item.id}
          dataitem={item}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderColor: "#0969da",
              color: "#0969da",
              "&:hover": {
                borderColor: "#054da7",
                backgroundColor: "rgba(9,105,218,0.1)",
              },
            }}
            onClick={() => handleDetails(item)}
          >
            View
          </Button>
        </ForumTabItem>
      ))}
    </Box>
  );
};

export default ForumTabList;
