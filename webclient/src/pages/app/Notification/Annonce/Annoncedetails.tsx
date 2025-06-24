import { Box, Divider, Button, Card, CardContent, Stack, Typography, Chip } from "@mui/material";
import { GetAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import FormUtils from "@/classes/FormUtils";

interface AnnonceDetailsProps {
    data: GetAnnonceDto;
    onUpdate: (annonce: GetAnnonceDto) => void;
    onDelete?: (annonce: GetAnnonceDto) => void;
}

const AnnonceDetails: React.FC<AnnonceDetailsProps> = ({ data, onUpdate, onDelete }) => {
    return (
        <Card variant="outlined" sx={{ borderRadius: 2, maxWidth: 800, margin: '0 auto' }}>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header with image and title */}
                    <Box display="flex" flexDirection="column" alignItems="center">
                        {data.imageressources && (
                            <Box
                                component="img"
                                src={data.imageressources}
                                alt={data.name}
                                sx={{
                                    width: '100%',
                                    maxHeight: 300,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    mb: 2
                                }}
                            />
                        )}
                        <Typography variant="h4" component="h1" gutterBottom>
                            {data.name}
                        </Typography>
                    </Box>

                    <Divider />

                    {/* Description */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <Typography paragraph>
                            {data.description}
                        </Typography>
                    </Box>

                    <Divider />

                    {/* Metadata */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Informations
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <Chip 
                                label={`Créé le: ${FormUtils.FormatDate(data.createdDate)}`} 
                                variant="outlined"
                            />
                            <Chip 
                                label={`Mis à jour le: ${FormUtils.FormatDate(data.updatedDate)}`} 
                                variant="outlined"
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    {/* Action buttons */}
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        {onDelete && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => onDelete(data)}
                                sx={{ minWidth: 120 }}
                            >
                                Supprimer
                            </Button>
                        )}
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

export default AnnonceDetails;