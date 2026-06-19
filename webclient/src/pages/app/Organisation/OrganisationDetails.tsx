import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  CardContent,
  CardHeader,
  Menu,
  MenuItem,
  Stack,
  Chip,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import { DensityMedium } from '@mui/icons-material';
import { FC, useState } from 'react';
import RenderDetail from '@/components/factory/GenericComponent/RenderDetails';

interface OrganisationDetailsProps {
  data?: GetOrganisationDto | null;
  isLoading?: boolean;
  error?: string | null;
  onNavigateToEscapeGames?: () => void;
  onDeactivate?: () => void;
}

const OrganisationDetails: FC<OrganisationDetailsProps> = ({
  data,
  isLoading = false,
  error = null,
  onNavigateToEscapeGames,
  onDeactivate
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">No organisation data available</Alert>
      </Box>
    );
  }

  const organisationDetails = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Website', value: data.website },
    { label: 'Description', value: data.description },
    { label: 'Address', value: data.address },
    { label: 'Phone', value: data.phoneNumber },
  ].filter(item => item.value);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d0d7de",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header GitHub-style */}
      <CardHeader
        title={
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#24292f" }}>
              {data.name}
            </Typography>

            <Chip
              label={data.isActive ? "Actif" : "Inactif"}
              color={data.isActive ? "success" : "default"}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        }
        action={
          <>
            <IconButton onClick={handleMenuClick}>
              <DensityMedium />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'organisation-menu-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onNavigateToEscapeGames?.();
                }}
              >
                Escape Games
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onDeactivate?.();
                }}
                sx={{ color: "error.main" }}
              >
                Deactivate
              </MenuItem>
            </Menu>
          </>
        }
        sx={{
          borderBottom: "1px solid #d8dee4",
          pb: 1,
        }}
      />

      {/* Content */}
      <CardContent sx={{ p: 3 }}>
        {/* Logo */}
        <Box
          component="img"
          src={data.logo || '/default-organization-logo.png'}
          alt={data.name}
          sx={{
            width: "100%",
            height: "180px",
            borderRadius: "6px",
            objectFit: "contain",
            backgroundColor: "#f6f8fa",
            border: "1px solid #d0d7de",
            mb: 3,
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-organization-logo.png';
          }}
        />

        {/* Details */}
        <Stack
          direction="column"
          spacing={2}
          divider={<Divider flexItem sx={{ borderColor: "#d8dee4" }} />}
        >
          {organisationDetails.map((item, index) => (
            <RenderDetail key={index} label={item.label} value={item.value} />
          ))}
        </Stack>

        {/* Status */}
        {data.status && (
          <Box sx={{ mt: 3 }}>
            <Chip
              label={`Status: ${data.status}`}
              color={data.status === 'Active' ? 'success' : 'default'}
              variant="outlined"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default OrganisationDetails;
