import { GetSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import { Box, Divider, Chip, Stack, CircularProgress, Alert, Typography, Card, CardContent } from "@mui/material";
import { FC, useEffect, useState } from 'react';
import { GetEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import RenderDetail from "@/components/factory/GenericComponent/RenderDetails";
import FormUtils from '@/classes/FormUtils';
import { EscapeGameAction } from "@/actions/EscapeGameAction";
import { SessionAction } from "@/actions/SessionAction";

interface SessionDetailsProps {
  data: GetSessionGameDto;
  columns: { label: string; accessor: keyof GetSessionGameDto }[];
  OnUpdate: (org: GetSessionGameDto) => void;
}

const SessionDetails: FC<SessionDetailsProps> = ({ data, columns, OnUpdate }) => {
  const [session, setSession] = useState<GetSessionGameDto>(data);
  const [escape, setEscape] = useState<GetEscapeGameDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(data.isDeleted);

  const escapeAction = new EscapeGameAction();
  const sessionAction = new SessionAction();

  const fetchEscapeGame = async () => {
    setLoading(true);
    try {
      const response = await escapeAction.getEscapeGameById(data.escapeGameId);
      if (response.Success) {
        setEscape(response.Data as GetEscapeGameDto);
      } else {
        setError(response.Message || "Failed to load escape game");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchSession = async () => {
    setLoading(true);
    try {
      const response = await sessionAction.getSessionById(data.segId);
      if (response.Success) {
        setSession(response.Data as GetSessionGameDto);
      } else {
        setError(response.Message);
      }
    } catch {
      setError("An error has occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await sessionAction.deleteSessionGame(data.segId);
      if (response.Success) {
        setDeleted(true);
      }
    } catch {
      setError("An error has occurred");
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    fetchEscapeGame();
  }, [data.escapeGameId]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!escape) return null;

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Session Details
        </Typography>

        <Stack spacing={2}>
          <RenderDetail label="Escape Game" value={escape.esgTitle} />
          <RenderDetail label="Places Available" value={session.placeAvailable} />
          <RenderDetail label="Maximum Capacity" value={session.placeMaximum} />
          <RenderDetail label="Price" value={`${session.price} €`} />
          <RenderDetail label="Session Date" value={FormUtils.FormatDate(session.date)} />
          <RenderDetail label="Status" value={deleted ? "Deleted" : "Active"} />
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Actions */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Chip
            label="Reservation"
            variant="outlined"
            color="success"
            onClick={() => (window.location.href = `session/${data.segId}/reservation`)}
            sx={{ cursor: "pointer" }}
          />

          <Chip
            label="Update"
            variant="outlined"
            color="primary"
            onClick={() => OnUpdate(session)}
            sx={{ cursor: "pointer" }}
          />

          <Chip
            label="Delete"
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{ cursor: "pointer" }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SessionDetails;
