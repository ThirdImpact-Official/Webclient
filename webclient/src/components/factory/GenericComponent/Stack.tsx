import Item from "./Item";
import { Divider, Stack, Box } from '@mui/material';

interface StacksProps {
  direction: string;
  children: React.ReactNode[];
}

export default function Stacks({ direction, children }: StacksProps) {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#ffffff",
        border: "1px solid #d0d7de",
        borderRadius: "6px",
      }}
    >
      <Stack
       
        spacing={2}
        divider={
          <Divider
            orientation={direction === "row" ? "vertical" : "horizontal"}
            flexItem
            sx={{ borderColor: "#d8dee4" }}
          />
        }
        sx={{
          "& > *": {
            padding: 1,
            borderRadius: "6px",
            backgroundColor: "#f6f8fa",
            border: "1px solid #d0d7de",
            transition: "background-color 0.15s ease",
            "&:hover": {
              backgroundColor: "#f3f4f6",
            }
          }
        }}
      >
        {children.map((child, index) => (
          <Item key={index}>{child}</Item>
        ))}
      </Stack>
    </Box>
  );
}
