import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Paper,
  Box,
  Typography,
  Divider
} from '@mui/material';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';

interface OrganisationTableProps {
  Organisation: GetOrganisationDto[];
  OnDetails: (org: GetOrganisationDto) => void;
  OnUpdate: (org: GetOrganisationDto) => void;
  onAddress: (org: GetOrganisationDto) => void;
}

const OrganisationTable = ({
  Organisation,
  OnDetails,
  OnUpdate,
  onAddress
}: OrganisationTableProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      
      {/* Title GitHub-style */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "#24292f", mb: 1 }}
        >
          Organisations
        </Typography>
        <Divider sx={{ borderColor: "#d0d7de" }} />
      </Box>

      {/* Table GitHub-style */}
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #d0d7de",
          borderRadius: "6px",
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell align="center">Details</TableCell>
              <TableCell align="center">Update</TableCell>
              <TableCell align="center">Address</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Organisation.map((org) => (
              <TableRow
                key={org.orgId}
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
                <TableCell>{org.orgId}</TableCell>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.email}</TableCell>
                <TableCell>{org.phoneNumber}</TableCell>

                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => OnDetails(org)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#d0d7de",
                      "&:hover": { borderColor: "#b9c1c9" },
                    }}
                  >
                    Details
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => OnUpdate(org)}
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
                    Update
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onAddress(org)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#d0d7de",
                      "&:hover": { borderColor: "#b9c1c9" },
                    }}
                  >
                    Address
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrganisationTable;
