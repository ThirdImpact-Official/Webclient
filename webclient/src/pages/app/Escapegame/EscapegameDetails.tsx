import React, { FC, useEffect, useState } from 'react';
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
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DensityMedium } from '@mui/icons-material';
import NotFound from '@/pages/app/NotFound';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import RenderDetail from '@/components/factory/GenericComponent/RenderDetails';
import FormUtils from '@/classes/FormUtils';
import { UnitofAction } from '@/actions/UnitofAction';
import { GetPriceDto } from '@/interfaces/EscapeGameInterface/Price/getPriceDto';
import { GetDifficultyLevelDto } from '@/interfaces/EscapeGameInterface/DifficultyLevel/getDifficultyLevelDto';
import { GetCategoryDto } from '@/interfaces/EscapeGameInterface/Category/getCategoryDto';

interface EscapeGameDetailsProps {
  data?: GetEscapeGameDto | null;
  displayButton?: boolean;
  onUpdateButton?: (org: GetEscapeGameDto) => void;
  onDeleteButton?: (org: GetEscapeGameDto) => void;
}

const action = new UnitofAction();

const EscapeGameDetails: FC<EscapeGameDetailsProps> = ({ 
  data, 
  displayButton, 
  onUpdateButton,
  onDeleteButton 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [getPrice, setPrice] = useState<GetPriceDto[] | null>(null);
  const [getDifficulty, setDifficulty] = useState<GetDifficultyLevelDto[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [getcategories,setcategoris]= useState<GetCategoryDto[] | null>(null)
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (path: string) => {
    window.location.href = `escapegame/${data.esgId}/${path}`;
  };

  const handleCateByEscapegame= async ()=>{
    try
    {
      const response = await  action.categoryAction.GetEscapeGamecategory(data.esgId)
      {
        if(response.Success)
        {
          setcategoris(response.Data);
        }
      }
    }
    catch(error)
    {

    }

  }
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [priceResponse, difficultyResponse] = await Promise.all([
          action.escapeGameAction.GetPriceIndice(),
          action.escapeGameAction.GetDifficultyLevelDto()
        ]);

        if (priceResponse.Success) setPrice(priceResponse.Data);
        if (difficultyResponse.Success) setDifficulty(difficultyResponse.Data);
        
        if (!priceResponse.Success || !difficultyResponse.Success) {
          setError('Could not load additional game information');
        }
      } catch (error) {
        console.error('Error fetching escape game details:', error);
        setError('Failed to load game details');
      } finally {
        setIsLoading(false);
      }
    };

    if (data) {
      fetchData();
      handleCateByEscapegame();
    }
  }, [data]);

  if (!data) return <NotFound />;

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

  const priceInfo = getPrice?.find(price => price.id === data.esg_Price_Id);
  const difficultyInfo = getDifficulty?.find(difficulty => difficulty.dileId === data.esg_DILE_Id);

  return (
    <Card className="m-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all">
      <CardHeader
        title={<Typography variant="h4">{data.esgTitle}</Typography>}
        action={
          displayButton && (
            <>
              <Button
                id="escape-button"
                aria-controls={open ? 'escape-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuClick}
              >
                <DensityMedium />
              </Button>
              <Menu
                id="escape-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{ 'aria-labelledby': 'escape-button' }}
              >
                <MenuItem onClick={() => navigateTo('session')}>Session</MenuItem>
                <MenuItem onClick={() => navigateTo('event')}>Event</MenuItem>
                <MenuItem onClick={() => navigateTo('activity')}>Activity</MenuItem>
                <MenuItem onClick={() => navigateTo('rating')}>Evalutation</MenuItem>
                <MenuItem onClick={() => navigateTo('categories')}>catégories</MenuItem>
                <MenuItem onClick={()=>navigateTo("reservation")}>Reservation</MenuItem>
              </Menu>
            </>
          )
        }
      />
      <CardContent>
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip
            label={`Created: ${FormUtils.FormatDate(data.esg_CreationDate)}`}
            variant="outlined"
          />
          {data.esg_UpdateTime && (
            <Chip
              label={`Updated: ${FormUtils.FormatDate(data.esg_UpdateTime)}`}
              variant="outlined"
            />
          )}
         
            <Chip
              label={`status: ${data.esg_IsDeleting ? "invisible" :"Visible"}`}
              variant="outlined"
            />
         
        </Stack>

        <Box
          component="img"
          src={data.esgImgResources || '/default-game-image.jpg'}
          alt={data.esgTitle}
          sx={{
            width: '100%',
            height: '300px',
            borderRadius: '10px',
            objectFit: 'cover',
            mb: 3,
            backgroundColor: 'grey.100'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-game-image.jpg';
          }}
        />

        <Stack direction="column" spacing={2} mb={3}>
          {[
            { label: 'Content', value: data.esgContent },
            { label: 'Phone Number', value: data.esgPhoneNumber },
            { label: 'Suitable for Children', value: data.esg_IsForChildren ? 'Yes' : 'No' },
            { label: 'Website', value: data.esgWebsite },
          ].map((item, index) => (
            item.value && <>
              <RenderDetail key={index} label={item.label} value={item.value} />
              <Divider key={`divider-${index}`} />
            </>
          ))}
        </Stack>
        <Stack direction="column" spacing={2} mb={3}>
          { getcategories !== null ? 
            (getcategories.map((item)=> (
                <React.Fragment>
                    <Chip 
                      label={item.catName}
                      variant="outlined"
                    />
                </React.Fragment>
            ))
            ) :(
              <Chip 
              variant='outlined'
              label="Undefined"
              />
            )
        }  
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
          {priceInfo && (
            <Chip 
              label={`Price: ${priceInfo.indicePrice} ${priceInfo.currency || '€'}`} 
              variant="outlined" 
              color="success" 
            />
          )}
          {difficultyInfo && (
            <Chip 
              label={`Difficulty: ${difficultyInfo.dileLevel}`} 
              variant="outlined" 
              color="secondary" 
            />
          )}
        </Stack>

        {displayButton && (
          <>
            <Divider sx={{ my: 3 }} />
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Chip
                label="Update"
                variant="outlined"
                color="primary"
                onClick={() => onUpdateButton?.(data)}
              />
              <Chip
                label="Delete"
                variant="outlined"
                color="error"
                onClick={() => onDeleteButton?.(data)}
              />
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EscapeGameDetails;