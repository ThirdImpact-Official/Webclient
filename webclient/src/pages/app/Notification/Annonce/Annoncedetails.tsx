import {
  Box,
  Divider,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Chip
} from "@mui/material";
import { GetAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import FormUtils from "@/classes/FormUtils";

interface AnnonceDetailsProps {
  data: GetAnnonceDto;
  onUpdate: (annonce: GetAnnonceDto) => void;
  onDelete?: (annonce: GetAnnonceDto) => void;
}

const AnnonceDetails: React.FC<AnnonceDetailsProps> = ({ data, onUpdate, onDelete }) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          
          {/* Image + Title */}
          <Box sx={{ textAlign: "center" }}>
            {data.image && (
              <Box
                component="img"
                src={data.image}
                alt={data.name}
                sx={{
                  width: "100%",
                  maxHeight: 280,
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #d0d7de",
                  mb: 2,
                }}
              />
            )}

            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#24292f" }}
            >
              {data.name}
            </Typography>
          </Box>

          <Divider />

          {/* Description */}
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#24292f", mb: 1 }}
            >
              Description
            </Typography>
            <Typography sx={{ color: "#24292f" }}>
              {data.description}
            </Typography>
          </Box>

          <Divider />

          {/* Metadata */}
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#24292f", mb: 1 }}
            >
              Informations
            </Typography>

            <Stack direction="row" spacing={1}>
              <Chip
                label={`Créé le : ${FormUtils.FormatDate(data.createdDate)}`}
                variant="outlined"
                sx={{ borderColor: "#d0d7de" }}
              />
              <Chip
                label={`Mis à jour le : ${FormUtils.FormatDate(data.updatedDate)}`}
                variant="outlined"
                sx={{ borderColor: "#d0d7de" }}
              />
            </Stack>
          </Box>

          <Divider />

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            {onDelete && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(data)}
                sx={{
                  textTransform: "none",
                  borderColor: "#cf222e",
                  "&:hover": {
                    backgroundColor: "rgba(207,34,46,0.1)",
                    borderColor: "#a40e26",
                  },
                }}
              >
                Supprimer
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => onUpdate(data)}
              sx={{
                backgroundColor: "#2da44e",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#2c974b" },
              }}
            >
              Modifier
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AnnonceDetails;
