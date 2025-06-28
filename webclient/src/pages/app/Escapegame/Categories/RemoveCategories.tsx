import { Card, CardContent, CircularProgress, Stack, Alert, Box, Button, CardHeader, Typography, Chip } from '@mui/material';
import { GetCategoryDto } from '@/interfaces/EscapeGameInterface/Category/getCategoryDto';
import { useState, useEffect, useCallback } from 'react';
import { UnitofAction } from '@/actions/UnitofAction';

interface RemoveCategoriesFromEscapeProps {
    escapegameId: number;
}

export const RemoveCategoriesFromEscape: React.FC<RemoveCategoriesFromEscapeProps> = ({ escapegameId }) => {
    const [escapeGameCategories, setEscapeGameCategories] = useState<GetCategoryDto[]>([]);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [removingCategoryId, setRemovingCategoryId] = useState<number | null>(null);
    
    const action = new UnitofAction();

    // Fetch categories for the escape game
    const fetchEscapeGameCategories = useCallback(async () => {
        if (!escapegameId) return;
        
        setLoading(true);
        setError("");
        
        try {
            const response = await action.categoryAction.GetEscapeGamecategory(escapegameId);
            console.log(response);
            
            if (response.Success) {
                setEscapeGameCategories(response.Data as GetCategoryDto[]);
            } else {
                setError(response.Message || "Failed to fetch categories");
            }
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }, [escapegameId, action.categoryAction]);

    // Handle category removal
    const handleRemoveCategory = async (categoryId: number) => {
        if (!categoryId || removingCategoryId) return;
        
        setRemovingCategoryId(categoryId);
        setError("");
        setSuccess("");
        
        try {
            const response = await action.categoryAction.RemoveEscapeGameDto(escapegameId, categoryId);
            console.log(response);
            
            if (response.Success) {
                setSuccess(response.Message || "Category removed successfully");
                // Refresh the categories list
                await fetchEscapeGameCategories();
            } else {
                setError(response.Message || "Failed to remove category");
            }
        } catch (err) {
            console.error("Error removing category:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setRemovingCategoryId(null);
        }
    };

    // Clear success/error messages
    const clearMessage = (type: 'error' | 'success') => {
        if (type === 'error') {
            setError('');
        } else {
            setSuccess('');
        }
    };

    // Fetch categories on component mount and when escapegameId changes
    useEffect(() => {
        fetchEscapeGameCategories();
    }, []);

    return (
        <Card>
            <CardHeader 
                title={
                    <Typography variant="h6" className="text-center">
                        Retrait de catégories
                    </Typography>
                } 
            />
            <CardContent className="text-center">
                <Stack spacing={3}>
                    {/* Error Alert */}
                    {error && (
                        <Alert 
                            severity="error" 
                            onClose={() => clearMessage('error')}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Success Alert */}
                    {success && (
                        <Alert 
                            severity="success" 
                            onClose={() => clearMessage('success')}
                        >
                            {success}
                        </Alert>
                    )}

                    {/* Categories Section */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Catégories actuelles présentes dans l'escape game
                        </Typography>
                        
                        {loading ? (
                            <Box display="flex" justifyContent="center" p={2}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : escapeGameCategories.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                                Aucune catégorie trouvée pour cet escape game
                            </Typography>
                        ) : (
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    gap: 1, 
                                    justifyContent: 'center',
                                    mt: 2 
                                }}
                            >
                                {escapeGameCategories.map((category) => (
                                    <Chip
                                        key={category.catId}
                                        label={category.catName}
                                        onClick={() => handleRemoveCategory(category.catId)}
                                        onDelete={() => handleRemoveCategory(category.catId)}
                                        disabled={removingCategoryId === category.catId}
                                        variant="outlined"
                                        color="error"
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: 'error.light',
                                                color: 'error.contrastText',
                                                transform: 'translateY(-1px)',
                                                boxShadow: 2
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Refresh Button */}
                    <Box>
                        <Button
                            variant="outlined"
                            onClick={fetchEscapeGameCategories}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={16} /> : undefined}
                        >
                            {loading ? 'Chargement...' : 'Actualiser'}
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};