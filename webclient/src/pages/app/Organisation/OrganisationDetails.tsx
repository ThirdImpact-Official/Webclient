import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import { DensityMedium } from '@mui/icons-material';
import { Box, Button, Card, Divider, Typography, CardContent, CardHeader, Menu, MenuItem, Stack } from '@mui/material';
import { FC,useEffect,useState } from 'react';
import EscapeGame from '../Escapgame';
import RenderDetail from '@/components/factory/GenericComponent/RenderDetails';


interface OrganisationDetailsProps
{
    data: GetOrganisationDto;
}
const OrganisationDetails: FC<OrganisationDetailsProps> = ({ data }) => {
    if (!data) {
        return null;
    }
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
                title={
                    <Typography variant="h4">{data.name}</Typography>} 
                action={<>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                  >
                    <DensityMedium />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>EscapeGame</MenuItem>
                    <MenuItem onClick={handleClose}>De Activate</MenuItem>
                 
                  </Menu>
                </>
                }        />
            <CardContent>
                <Box component={"img"} src={data.logo} alt={data.name} sx={{width: "100%", height: "100%", borderRadius: "10px"}}/>
                <Stack direction={"column"} className='mt-4 pt-4' spacing={2}>
                {[
                    { label: 'Name', value: data.name },
                    { label: 'Email', value: data.email },
                    { label: 'Description', value: data.website },
                    { label: 'Description', value: data.description },
                    { label: 'Address', value: data.address },
                    { label: 'Phone', value: data.phoneNumber },
                    { label: 'Email', value: data.email },
                    ].map((item, index) => (
                    <RenderDetail
                        key={index}
                        label={item.label}
                        value={item.value}
                    />
                    ))}
                    </Stack>
            </CardContent>
        </Card>
    );
}
export default OrganisationDetails;