import { GetSessionGameDto } from "@/interfaces/EscapeGameInterface/Session/getSessionGameDto";
import { Box, Divider, Chip, Stack, CircularProgress, Alert } from "@mui/material";
import { FC, useEffect, useState } from 'react';
import { GetEscapeGameDto } from "@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto";
import RenderDetail from "@/components/factory/GenericComponent/RenderDetails";
import FormUtils from '@/classes/FormUtils';
import {EscapeGameAction} from "@/actions/EscapeGameAction"; // Utilisez import ES6 au lieu de require
import { Label } from '@mui/icons-material';
import { SessionAction } from "@/actions/SessionAction";

interface SessionDetailsProps {
    data: GetSessionGameDto;
    columns: { label: string; accessor: keyof GetSessionGameDto }[];
    OnUpdate: (org: GetSessionGameDto) => void;
}

const SessionDetails: FC<SessionDetailsProps> = ({ data, columns, OnUpdate }) => {
    const [getdata,setData]=useState<GetSessionGameDto>(data);
    const [escape, setEscape] = useState<GetEscapeGameDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [deleted,setdeleted]=useState<boolean>(getdata.isDeleted);
    const action= new EscapeGameAction();
    const actionsession= new SessionAction();
    const fetchEscapeGame = async () => {
        setLoading(true);
        try {
            const escapeGame = await action.getEscapeGameById(data.escapeGameId);
            if (escapeGame.Success) {
                setEscape(escapeGame.Data as GetEscapeGameDto);
            } else {
                setError(escapeGame.Message || "Failed to load escape game");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error fetching escape game:", err);
        } finally {
            setLoading(false);
        }
    };
    const FetchDatasession=async()=>{
            setLoading(true)
        try
        {
            const response=await actionsession.getSessionById(data.segId);
            if(response.Success)
            {
                setData(response.Data as GetSessionGameDto);
              
            }
            else
            {
                setError(response.Message)
            }
        }
        catch
        {
            setError("an error has occured ")
        }
        finally
        {
            setLoading(false);
        }
    }
    const handleUpdate = () => {
        OnUpdate(getdata);
    };
    const handleDelete=async ()=>{
        try
        {
            const response= await actionsession.deleteSessionGame(data.segId);
            if(response.Success)
            {
                  setdeleted(true);
            }
        }
        catch
        {
setError("an error has occured ")
        }
    }
    useEffect(()=>{
        FetchDatasession();
    },[])
    useEffect(() => {
        fetchEscapeGame();
    }, [data.escapeGameId]); // Ajoutez la dépendance pour recharger si l'ID change

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!escape) {
        return null; // Ou un message d'erreur approprié
    }

    return (
        <Box className="flex flex-col items-center justify-center">
            
            <Stack spacing={2}>
                <RenderDetail value={escape.esgTitle} label="Escape Game" />
                <RenderDetail value={getdata.placeAvailable} label="Places Available" />
                <RenderDetail value={getdata.placeMaximum} label="Maximum Capacity" />
                <RenderDetail value={`${getdata.price} €`} label="Price" />
                <RenderDetail 
                    value={FormUtils.FormatDate(getdata.date)} 
                    label="Session Date" 
                />
                <RenderDetail 
                    value={deleted ? "supprimer" : "active"} 
                    label="Status" 
                />
            </Stack>

            <Divider className="mt-4 p-4" orientation="horizontal" flexItem />

            <Stack direction="row" spacing={2} className="items-center mt-4">
                <Chip 
                    color="success"
                    variant="outlined"
                    label="Reservation" 
                    onClick={() => window.location.href=`session/${data.segId}/reservation`} 
                />
                <Divider orientation="vertical" flexItem />
                <Chip 
                    variant="outlined"
                    color="primary" 
                    label="Update"
                    onClick={handleUpdate} 
                />
                <Divider orientation="vertical" flexItem />
                <Chip 
                    variant="outlined"
                    color="error" 
                    label="Delete" 
                    onClick={handleDelete}
                    // Ajoutez un handler pour delete si nécessaire
                />
            </Stack>
        </Box>
    );
};

export default SessionDetails;