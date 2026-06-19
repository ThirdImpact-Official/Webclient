import { FC, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Box
} from '@mui/material';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';

interface EscapeGameOrganisationTableProps {
  data: GetEscapeGameDto[];
  OnDetails: (org: GetEscapeGameDto) => void;
  OnUpdate: (org: GetEscapeGameDto) => void;
}

const EscapeGameOrganisationTable: FC<EscapeGameOrganisationTableProps> = ({
  data,
  OnDetails,
  OnUpdate
}) => {
  const [escapeData, setEscapeData] = useState<GetEscapeGameDto[]>(data);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Date inconnue"
      : new Intl.DateTimeFormat("fr-FR").format(date);
  };

  const navigateTo = (path: string) => {
    window.location.href = `escapegame/${path}`;
  };

  useEffect(() => {
    setEscapeData(data);
  }, [data]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f6f8fa",
              "& th": {
                fontWeight: 600,
                color: "#24292f",
                borderBottom: "1px solid #d0d7de",
              },
            }}
          >
            <TableCell>Id</TableCell>
            <TableCell>Titre</TableCell>
            <TableCell>Creation Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {escapeData.map((escapeGame) => (
            <TableRow
              key={escapeGame.esgId}
              hover
              sx={{
                "& td": {
                  borderBottom: "1px solid #d8dee4",
                  color: "#24292f",
                },
                "&:hover": {
                  backgroundColor: "#f6f8fa",
                },
              }}
            >
              <TableCell>{escapeGame.esgId}</TableCell>
              <TableCell>{escapeGame.esgTitle}</TableCell>
              <TableCell>{formatDate(escapeGame.esg_CreationDate)}</TableCell>

              <TableCell align="center">
                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => OnDetails(escapeGame)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#0969da",
                      color: "#0969da",
                      "&:hover": {
                        borderColor: "#054da7",
                        backgroundColor: "rgba(9,105,218,0.1)",
                      },
                    }}
                  >
                    Details
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => OnUpdate(escapeGame)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#d0d7de",
                      "&:hover": { borderColor: "#b9c1c9" },
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigateTo(`${escapeGame.esgId}/session`)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#d0d7de",
                      "&:hover": { borderColor: "#b9c1c9" },
                    }}
                  >
                    Session
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigateTo(`${escapeGame.esgId}/event`)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#d0d7de",
                      "&:hover": { borderColor: "#b9c1c9" },
                    }}
                  >
                    Event
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EscapeGameOrganisationTable;
