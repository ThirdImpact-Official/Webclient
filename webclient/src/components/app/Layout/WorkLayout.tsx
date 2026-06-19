// components/layout/DashboardLayout.tsx
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
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Header GitHub-style */}
      <Box
        sx={{
          mb: 3,
          pb: 2,
          borderBottom: "1px solid #d0d7de",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#24292f" }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography sx={{ color: "#57606a", mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Layout GitHub-style */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: sidebar ? { xs: "1fr", md: "300px 1fr" } : "1fr",
          gap: 3,
        }}
      >
        {/* Sidebar */}
        {sidebar && (
          <Box
            sx={{
              border: "1px solid #d0d7de",
              borderRadius: "6px",
              backgroundColor: "#ffffff",
              p: 2,
              height: "fit-content",
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
            p: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default WorkLayout;
