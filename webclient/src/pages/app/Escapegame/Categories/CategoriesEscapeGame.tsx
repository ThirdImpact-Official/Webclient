import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { UnitofAction } from '@/actions/UnitofAction';
import { useEffect } from 'react';
import { GetRatingDto } from '@/interfaces/EscapeGameInterface/Rating/Rating';
import { useState,useRef } from 'react';
import { useParams, data } from 'react-router-dom';
import {Stack,Box, Card, CircularProgress,CardContent} from '@mui/material'
import EscapeGameDetails from '../EscapegameDetails';
import GenericTabs, { TabItem } from '@/components/factory/GenericComponent/TabGénéric';
import { AddCategoryToEscapeGame } from './AddCategories';
import { RemoveCategoriesFromEscape } from './RemoveCategories';


const PAGE_SIZE= 5;

const CategoriesEscapeGame =() => {

    const{id} =useParams();
    const action = new UnitofAction();
    const [isloading,setloading ]=useState<boolean>(false);
    const [tabEscape,setEscape]=useState<GetEscapeGameDto>();
    const [getRating,setRatig]=useState<GetRatingDto [] |null>(null);
    const [selectrating,setselectrating]=useState<GetRatingDto|null>(null);
    const [page,setpage]=useState<number>(0);
    const [isLoading,setLoading] =useState<boolean>(true)
    
    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    const fetchEscapeGame = async () => {
        setloading(true);
        try {
            const escapeGame = await action.escapeGameAction.getEscapeGameById(Number(id));
            if (escapeGame.Success) {
                setEscape(escapeGame.Data as GetEscapeGameDto);
            } else {
                console.log(escapeGame.Message || "Failed to load escape game");
            }
        } catch (err) {
            console.log("An unexpected error occurred");
            console.error("Error fetching escape game:", err);
        } finally {
            setloading(false);
        }
    };
    const fetchRating = async () => {
        
        try
        {
            const response = await action.ratingAction.GetAllRatingbyEscapeGameId(Number.parseInt(id!),page,PAGE_SIZE);
            if (response.Success) {
                setRatig(response.Data as GetRatingDto[]);
            }
        }
        catch (error) {
            console.error(error);
        }
    
    }
    const handleSelect=(item:GetRatingDto)=>{
        setselectrating(item);
        goToTab(1);
    }
    const tab:TabItem[]=[
        {
            label: "Ajouter une categories",
            content: (
               (
                    <>
                        <AddCategoryToEscapeGame escapegameId={Number(id)} />
                    </>
                ) 
            )
        },
        {   
            label:"enlever une categories",
            content: (<>
                <RemoveCategoriesFromEscape escapegameId={Number(id)} />
            </>)
        }
    ]

/**
 * Navigates to the specified tab index.
 * Utilizes the tabsRef to change the current tab.
 * @param index The index of the tab to navigate to.
 */
  const goToTab = (index: number) => {
    if (tabsRef.current !== null) {
      tabsRef.current.changeTab(index);
    }
 };

useEffect(() => {
    setLoading(true);
    try
    {
        
            fetchEscapeGame();
          
        }
        catch(error)
        {
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }, [id]);

    if(!id)
    {
        return(
            <Card>
                <CardContent>
                    <CircularProgress/>
                </CardContent>
            </Card>
        )
    }
    if(isLoading)
    {
    return(
                <Card>
                    <CardContent>
                        <CircularProgress/>
                    </CardContent>
                </Card>
            )
    }
    return(
        <Stack
         sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
            columnGap: 0,
            rowGap: 0,
            width: '100%',
            height: 'auto',
            p: 2,
            }}
        >
            <Box 
                sx={{
        margin: 2,
        width: '100%',
        height: 'auto',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)' ,
        },
      }}
            >
            <EscapeGameDetails data={tabEscape}  />
            </Box>
            <Box  
                sx={{
        margin: 2,
        width: '100%',
        height: 'auto',
        cursor: 'pointer' ,
        transition: 'transform 0.2s',
        '&:hover': {
          transform:'scale(1.02)',
          borderShadow: 2
        },
      }}
            >
            <GenericTabs ref={tabsRef} tabs={tab} defaultTab={0} ChangeTab={goToTab} ariaLabel="generic tabs"/>
            </Box>
        </Stack>
    )
}
export default CategoriesEscapeGame;