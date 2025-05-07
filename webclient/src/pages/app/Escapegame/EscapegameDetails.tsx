import { FC, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Menu,
  MenuItem,
  Stack,
  Divider,
} from '@mui/material';
import { DensityMedium } from '@mui/icons-material';
import NotFound from '@/pages/app/NotFound';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import RenderDetail from '@/components/factory/GenericComponent/RenderDetails';

interface EscapeGameDetailsProps {
  data?: GetEscapeGameDto | null;
  displayButton?: boolean;
  onUpdateButton?: (org: GetEscapeGameDto) => void;
}

const EscapeGameDetails: FC<EscapeGameDetailsProps> = ({
  data,
  displayButton,
  onUpdateButton,
}) => {
  if (!data) return <NotFound />;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="m-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all">
      <CardHeader
        title={<Typography variant="h4">{data.esgTitle}</Typography>}
        action={
          <>
            <Button
              id="escape-button"
              aria-controls={open ? 'escape-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <DensityMedium />
            </Button>
            <Menu
              id="escape-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ 'aria-labelledby': 'escape-button' }}
            >
              <MenuItem onClick={() => window.location.href = `${data.esgId}/session`}>Session</MenuItem>
              <MenuItem onClick={() => window.location.href = `${data.esgId}/event`}>Event</MenuItem>
              <MenuItem onClick={() => window.location.href = `${data.esgId}/activity`}>Activity</MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent>
        <Box
          component="img"
          src={data.esgImgResources}
          alt={data.esgTitle}
          sx={{
            width: '100%',
            height: '300px',
            borderRadius: '10px',
            objectFit: 'cover',
            mb: 3,
          }}
        />
        <Stack direction="column" spacing={2}>
          {[
            { label: 'ID', value: data.esgId },
            { label: 'Title', value: data.esgTitle },
            { label: 'Content', value: data.esgContent },
            { label: 'Phone Number', value: data.esgPhoneNumber },
            { label: 'Is For Children', value: data.esg_IsForChildren ? 'Yes' : 'No' },
            { label: 'Website', value: data.esgWebsite },
            { label: 'Price', value: data.esg_Price_Id },
            { label: 'Difficulty', value: data.difficultyLevel },
            { label: 'Creation Date', value: data.esg_CreationDate },
            { label: 'Update Date', value: data.esg_UpdateTime },
          ].map((item, index) => (
            <RenderDetail key={index} label={item.label} value={item.value} />
          ))}
        </Stack>
        {displayButton && (
          <>
            <Divider className="mt-4 mb-4" />
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="outlined"
                color="success"
                onClick={() => window.location.href = `${data.esgId}/session`}
              >
                Session
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.href = `${data.esgId}/event`}
              >
                Event
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.href = `${data.esgId}/activity`}
              >
                Activity
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onUpdateButton?.(data)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onUpdateButton?.(data)}
              >
                Delete
              </Button>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EscapeGameDetails;
