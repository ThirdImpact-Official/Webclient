import { AddCategoryDto } from '@/interfaces/EscapeGameInterface/Category/addCategoryDto';
import { Card, CardContent, CircularProgress,Stack,Alert,Box, FormControl, InputLabel, Select, MenuItem, Button,CardHeader,Typography,Chip } from '@mui/material';
import { GetCategoryDto } from '@/interfaces/EscapeGameInterface/Category/getCategoryDto';
import { useState,useEffect } from 'react';
import { UnitofAction } from '@/actions/UnitofAction';
import EscapeGame from '../../Escapgame';
import RenderDetail from '@/components/factory/GenericComponent/RenderDetails';


interface AddCategoriesProps
{
    escapegameId:number;
}

export const AddCategoryToEscapeGame:React.FC<AddCategoriesProps> = (props)=>{
    const [categories, setCategories] = useState<GetCategoryDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [EscapeGameCategorie,setEscapeGameCategories]= useState<GetCategoryDto[]>([]);
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
                console.log(Error)
                setError(response.Message);
            }
        } catch (err) {
            setError("Erreur lors du chargement des catégories");
        }
        setLoading(false);
    };
    /**
     * 
     */
    const fetchCategortiesescape= async ()=>
    {
        try
        {
            const response= await action.categoryAction.GetEscapeGamecategory(props.escapegameId);
            console.log(response);
            if(response.Success)
            {
                setEscapeGameCategories(response.Data as GetCategoryDto[])
            }else{
                setError(response.Message)
            }
        }
        catch(err)
        {

        }
    }
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
    }, [props.escapegameId]); // Add empty dependency array to prevent in
    useEffect(()=>{
        fetchCategortiesescape()
    },[validateAndSubmit])
    if(loading)
    {
        return (
            <Card>
                <CardContent className='text-center items-center justify-center'>
                    <CircularProgress/>
                </CardContent>
            </Card>
        )
    }

    return (<>
        <Card>
              <CardHeader title={
                            <Typography className="text-center">
                                Ajout d'une catégories a un escapegame
                            </Typography>
                        } />
            <CardContent className='text-center items-center justify-center'>
                <Box sx={{ p: 2}}>
                    <Stack spacing={3} >
                        { success && (
                              <Alert severity='error' onClose={()=>setError("")}>
                                {error}
                            </Alert>)
                        }
                        {error && (
                            <Alert severity='success' onClose={()=>setError("")}>
                                {success}
                            </Alert>)
                        }
                        <FormControl fullWidth>
                            <InputLabel>
                                Selectionner une categories 
                            </InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={selectedCategory}
                                label="Sélectionner une catégorie"
                                onChange={handleCategoryChange}
                                disabled={loading}
                            >
                            <MenuItem value={0}><em>aucune catégories sélectionnéee</em></MenuItem>
                            {
                                categories.map((item)=>(
                                    <MenuItem key={item.catId} value={item.catId} >
                                        {item.catName}
                                    </MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                        <Box>
                            <Typography>
                                Categories Actuelles présentes dans l'escapegame
                            </Typography>
                            <Box>
                            { 
                                EscapeGameCategorie.map((item)=>(
                                    <Chip label={item.catName} variant="outlined"/>
                                ))
                            }
                            </Box>
                        </Box>
                        <Box>
                            <Button 
                            onClick={validateAndSubmit}
                             variant="contained"
                        
                            disabled={loading || selectedCategory === 0}
                            sx={{ alignSelf: 'flex-start' }}
                            >
                                ajouter la catégories
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    </>)
}