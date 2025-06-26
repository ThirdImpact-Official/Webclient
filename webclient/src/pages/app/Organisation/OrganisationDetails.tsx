import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import { DensityMedium } from '@mui/icons-material';
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
  Alert
} from '@mui/material';
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

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box p={2}>
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
  ].filter(item => item.value); // Only show fields with values

  return (
    <Card className="m-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all">
      <CardHeader 
        title={
          <Typography variant="h4" component="h1">
            {data.name}
          </Typography>
        } 
        action={
          <div>
            <Button
              id="organisation-menu-button"
              aria-controls={open ? 'organisation-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuClick}
            >
              <DensityMedium />
            </Button>
            <Menu
              id="organisation-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'organisation-menu-button',
              }}
            >
              <MenuItem onClick={() => {
                handleMenuClose();
                onNavigateToEscapeGames?.();
              }}>
                Escape Games
              </MenuItem>
              <MenuItem onClick={() => {
                handleMenuClose();
                onDeactivate?.();
              }}>
                Deactivate
              </MenuItem>
            </Menu>
          </div>
        }
      />
      
      <CardContent>
        <Box 
          component="img" 
          src={data.logo || '/default-organization-logo.png'} 
          alt={data.name} 
          sx={{
            width: "100%", 
            height: "200px", 
            borderRadius: "10px",
            objectFit: "contain",
            backgroundColor: 'grey.100',
            mb: 3
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-organization-logo.png';
          }}
        />
        
        <Stack direction="column" spacing={2} divider={<Divider flexItem />}>
          {organisationDetails.map((item, index) => (
            <RenderDetail
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </Stack>

        {data.status && (
          <Box mt={2}>
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
}

export default OrganisationDetails;