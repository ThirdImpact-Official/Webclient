import { FC } from 'react';
import { Typography, Box, Divider, Button, Grid2 } from '@mui/material';
import NotFound from '@/pages/app/NotFound';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import RenderDetail from '@/components/factory/GenericComponent/RenderDetails';
import Item from '@/components/factory/GenericComponent/Item';
 

interface EscapeGameDetailsProps {
    data?: GetEscapeGameDto | null;
    displayButton?:boolean;
    onUpdateButton?:(org: GetEscapeGameDto)=> void;
}

/**
 * A component that displays the details of an escape game.
 * If the data property is falsy, it renders a NotFound component.
 * Otherwise, it renders a table of key-value pairs for each property of the escape game.
 * The rendered values are formatted according to the type of the value. For example, numbers are formatted with two decimal places.
 * Dates are formatted with the year, month and day. Booleans are displayed as either "true" or "false".
 * Objects that are not Dates or Booleans are displayed as JSON strings.
 * Difficulty levels are displayed as the name of the difficulty level.
 * Prices are displayed as the price value.
 */

const EscapeGameDetails: FC<EscapeGameDetailsProps> = ({
    data,
    onUpdateButton,displayButton
}) => {
    if (!data) return <NotFound />;

    return (
        <Box className="bg-white column items-center mx-15 space-y-6 px-10">
    
            <Typography variant="h4">Escape Game Details</Typography>
            <Grid2 container spacing={4}>
                <Grid2 size={8}>
                    <RenderDetail label="ID" value={data.eSGId} />
                    <RenderDetail label="Title" value={data.eSGTitle} />
                    <RenderDetail label="Content" value={data.eSGContent} />
                    <RenderDetail label="Phone Number" value={data.eSGPhoneNumber} />
                    <RenderDetail label="Is For Children" value={data.eSG_IsForChildren} />
                    <RenderDetail label="Website" value={data.eSGWebsite} />
                </Grid2>
                <Grid2 size={6}>
                    <RenderDetail label="Price" value={data.price.indicePrice} />
                    <RenderDetail label="Difficulty" value={data.difficultyLevel.dowName} />
                    <RenderDetail label="Creation Date" value={data.eSG_CreationDate} />
                    <RenderDetail label="Update Date" value={data.eSG_UpdateTime} />
                </Grid2>
                <Grid2 size={6}>
                    <Item>
                        <img src={data.eSGImgResources} alt="Image" />
                    </Item>
                </Grid2>
            </Grid2>
            <Divider className="mt-4 p-4" orientation="horizontal" flexItem />
            { displayButton ? 
                <Box className="flex flex-row  justify-center items-center gap-4">
                    <Button onClick={() => onUpdateButton(data)} color='success'> Session </Button>
                    <Divider orientation='vertical' flexItem />
                    <Button onClick={() =>window.location.href =(`${data.eSGId}/event`)}>Event</Button>
                    <Divider orientation='vertical' flexItem />
                    <Button onClick={() =>window.location.href =(`${data.eSGId}/activity`)}>Activity</Button>
                    <Divider orientation="vertical" flexItem /> 
                    <Button color="primary" onClick={() => onUpdateButton(data)}>Update</Button>
                    <Divider orientation='vertical' flexItem />
                    <Button color="error" onClick={() => onUpdateButton(data)}>Delete</Button>
                </Box>
                :
                <>
                </>}
        </Box>
    );
};

export default EscapeGameDetails;

