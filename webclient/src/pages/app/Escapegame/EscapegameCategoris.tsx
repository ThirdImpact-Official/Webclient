import React, { useEffect, useState } from "react";
import {
    Select,
    Stack,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
    Typography,
    Alert,
    CircularProgress,
    CardContent,
    Box,
    Card
} from "@mui/material";
import { GetCategoryDto } from '@/interfaces/EscapeGameInterface/Category/getCategoryDto';
import { UnitofAction } from "@/actions/UnitofAction";

interface ManageCategoriesProps {
    escapegameId: number;
}

const ManageCategories: React.FC<ManageCategoriesProps> = (props) => {
    const [categories, setCategories] = useState<GetCategoryDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const action = new UnitofAction();

    const fetchAllCategories = async () => {
        setLoading(true);
        try {
            const response = await action.categoryAction.getAllCategories();
            if (response.Success) {
                setCategories(response.Data as GetCategoryDto[]);
            } else {
                setError(response.Message);
            }
        } catch (err) {
            setError("Erreur lors du chargement des catégories");
        }
        setLoading(false);
    };

    const linkEscapeGame = async () => {
        if (selectedCategory === 0) {
            setError("Veuillez sélectionner une catégorie");
            return;
        }

        setLoading(true);
        try {
            // Assuming there's a method to link category to escape game
            const response = await action.categoryAction.AddEscapeGameDto(
                props.escapegameId, 
                selectedCategory
            );
            if (response.Success) {
                setSuccess("Catégorie ajoutée avec succès");
                setSelectedCategory(0); // Reset selection
            } else {
                setError(response.Message);
            }
        } catch (err) {
            setError("Erreur lors de l'ajout de la catégorie");
        }
        setLoading(false);
    };

    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value);
        setError(""); // Clear any previous errors
    };

    const validateAndSubmit = () => {
        linkEscapeGame();
    };

    useEffect(() => {
        fetchAllCategories();
    }, []); // Add empty dependency array to prevent infinite loop

    if (loading && categories.length === 0) {
        return (
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                        <CircularProgress />
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Gérer les catégories
                    </Typography>

                    <Stack spacing={3}>
                        {/* Affichage des messages */}
                        {error && (
                            <Alert severity="error" onClose={() => setError('')}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" onClose={() => setSuccess('')}>
                                {success}
                            </Alert>
                        )}

                        <FormControl fullWidth>
                            <InputLabel id="category-select-label">
                                Sélectionner une catégorie
                            </InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={selectedCategory}
                                label="Sélectionner une catégorie"
                                onChange={handleCategoryChange}
                                disabled={loading}
                            >
                                <MenuItem value={0}>
                                    <em>Aucune catégorie sélectionnée</em>
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.catId} value={category.catId} >
                                        {category.catName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            onClick={validateAndSubmit}
                            disabled={loading || selectedCategory === 0}
                            sx={{ alignSelf: 'flex-start' }}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={20} sx={{ mr: 1 }} />
                                    Ajout en cours...
                                </>
                            ) : (
                                'Ajouter la catégorie'
                            )}
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ManageCategories;