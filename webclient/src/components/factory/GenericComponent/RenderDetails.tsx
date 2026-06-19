import FormUtils from "@/classes/FormUtils";
import { Stack, Typography, Box } from "@mui/material";
import { FC } from "react";

interface RenderProps {
  label: string;
  value?: unknown;
}

const RenderDetail: FC<RenderProps> = ({ label, value }) => {
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "";

    if (typeof value === "number") {
      return value.toFixed(2);
    }

    if (typeof value === "string") {
      if (!isNaN(Date.parse(value))) {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
      return value;
    }

    if (typeof value === "boolean") {
      return value ? "true" : "false";
    }

    if (value instanceof Date) {
      return value.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    if (typeof value === "object") {
      if (FormUtils.isGetDifficultyLevelDto(value)) {
        return value.dileLevel.toString();
      }

      if (FormUtils.isGetPriceDto(value)) {
        return value.indicePrice.toString();
      }

      return JSON.stringify(value, null, 2);
    }

    return "";
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
        width: "100%",
        py: 1.5,
        borderBottom: "1px solid #d8dee4",
      }}
    >
      {/* Label GitHub-style */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: "#57606a",
          fontSize: "0.9rem",
        }}
      >
        {label}
      </Typography>

      {/* Value GitHub-style */}
      <Typography
        variant="body1"
        sx={{
          color: "#24292f",
          whiteSpace: "pre-wrap",
          textAlign: "right",
          maxWidth: "60%",
          fontSize: "0.95rem",
        }}
      >
        {formatValue(value)}
      </Typography>
    </Stack>
  );
};

export default RenderDetail;
