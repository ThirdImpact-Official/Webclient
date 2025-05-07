import { FC, useEffect, useState } from 'react';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Stack, Typography } from '@mui/material';
import { format } from 'path';


interface EscapeGameOrganisationTableProps {
    data: GetEscapeGameDto [];
    OnDetails:(org: GetEscapeGameDto) => void;
    OnUpdate: (org: GetEscapeGameDto) => void;

}

const EscapeGameOrganisationTable: FC<EscapeGameOrganisationTableProps> = ({data, OnDetails, OnUpdate}) => {
    const [escageData,setEscapeData]=useState<GetEscapeGameDto[]>(data);
    function FormatDate(dateString: string | null | undefined) {
        if (!dateString) return 'Date inconnue';
    
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Date inconnue' : new Intl.DateTimeFormat('fr-FR').format(date);
    
    }
    useEffect(() => {
        setEscapeData(data);
    },[data])
    return (
        <TableContainer 
            className='m-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all'
            sx={{ borderRadius: 4, boxShadow: 3 }}
            component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                            Id</Typography>
                            </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Titre
                            </Typography>
                            </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Content
                        </Typography>
                            </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Creation Date
                        </Typography>
                            </TableCell>
                        <TableCell align='center' >
                        <Typography variant="subtitle2" fontWeight="bold">
                            Actions</Typography>
                            </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {escageData.map((escapeGame) => (
                        <TableRow key={escapeGame.esgId.toString()} hover>
                            <TableCell>{escapeGame.esgId}</TableCell>
                            <TableCell>{escapeGame.esgTitle}</TableCell>
                            <TableCell>{escapeGame.esgContent}</TableCell>
                            <TableCell>
                                {FormatDate(escapeGame.esg_CreationDate)}
                            </TableCell>
                            <Stack direction="row" spacing={1} justifyContent={"center"}>
                            <TableCell>
                                <Button variant='contained' onClick={() => OnDetails(escapeGame)}>Details</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant='contained' onClick={() => OnUpdate(escapeGame)}>Update</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant='contained' onClick={() =>window.location.href =(`${escapeGame.esgId}/session`)}>session</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant='contained' onClick={() =>window.location.href =(`${escapeGame.esgId}/event`)}>Event</Button>
                            </TableCell>
                            </Stack>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EscapeGameOrganisationTable;