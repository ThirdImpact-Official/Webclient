import { GetActivityPlaceDto } from "@/interfaces/EscapeGameInterface/ActivityPlace/getActivityPlaceDto";
import { Button, Divider, Box, Stack, Typography, Grid, Chip, Card, CardContent } from "@mui/material";
import { FC } from "react";

interface ActivityProps {
    data: GetActivityPlaceDto;
    onUpdate: (item: GetActivityPlaceDto) => void;
}

const ActivityDetails: FC<ActivityProps> = ({ data, onUpdate }) => {
    if (!data) {
        return (
            <Box textAlign="center" p={4}>
                <Typography color="text.secondary">Aucune donnée disponible</Typography>
            </Box>
        );
    }

    const renderImage = (src: string) => (
        <Box
            component="img"
            src={src}
            alt="Lieu d'activité"
            sx={{
                width: '100%',
                maxHeight: 300,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 2
            }}
            onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
            }}
        />
    );

    return (
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
                <Stack spacing={2}>
                    {/* Image principale */}
                    {data.imgressources && renderImage(data.imgressources)}

                    {/* Titre et description */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            {data.name}
                        </Typography>
                        <Typography color="text.secondary">
                            {data.description}
                        </Typography>
                    </Box>

                    <Divider />

                    {/* Métadonnées */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                                ID
                            </Typography>
                            <Typography>{data.acpId}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                                ID Escape Game
                            </Typography>
                            <Typography>{data.escapegameId}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Type d'activité
                            </Typography>
                            <Chip 
                                label={data.activityType?.name || 'Non spécifié'} 
                                size="small"
                                sx={{ mt: 0.5 }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                                ID Type
                            </Typography>
                            <Typography>{data.activityTypeId}</Typography>
                        </Grid>
                    </Grid>

                    <Divider />

                    {/* Bouton d'action */}
                    <Box display="flex" justifyContent="flex-center">
                        <Button 
                            variant="contained" 
                            onClick={() => onUpdate(data)}
                            sx={{ minWidth: 120 }}
                        >
                            Modifier
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ActivityDetails;