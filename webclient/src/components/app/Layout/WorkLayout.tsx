import { Box, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface workLayoutProps {
  title: string;
  subtitle?: string;
  sidebar?: ReactNode;
  children: ReactNode;
}

const WorkLayout: FC<workLayoutProps> = ({
  title,
  subtitle,
  sidebar,
  children
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f6f8fa",
        p: { xs: 1.5, sm: 2, md: 4 },
      }}
    >
      {/* Header GitHub-style */}
      <Box
        sx={{
          mb: { xs: 2, md: 3 },
          pb: { xs: 1, md: 2 },
          borderBottom: "1px solid #d0d7de",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#24292f",
            fontSize: { xs: "1.3rem", md: "1.6rem" },
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            sx={{
              color: "#57606a",
              mt: 0.5,
              fontSize: { xs: "0.85rem", md: "1rem" },
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Layout GitHub-style */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: sidebar
            ? {
                xs: "1fr",
                sm: "1fr",
                md: "280px 1fr",
                lg: "300px 1fr",
              }
            : "1fr",
          gap: { xs: 2, md: 3 },
        }}
      >
        {/* Sidebar */}
        {sidebar && (
          <Box
            sx={{
              border: "1px solid #d0d7de",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              p: { xs: 1.5, md: 2 },
              height: "fit-content",
              position: "relative",
              top: 0,
            }}
          >
            {sidebar}
          </Box>
        )}

        {/* Content */}
        <Box
          sx={{
            border: "1px solid #d0d7de",
            borderRadius: "6px",
            backgroundColor: "#ffffff",
            p: { xs: 1.5, md: 2 },
            minHeight: "200px",
            overflowX: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default WorkLayout;
