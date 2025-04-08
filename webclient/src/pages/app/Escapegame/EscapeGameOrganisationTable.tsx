import { FC, useState } from 'react';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper} from '@mui/material';
import { format } from 'path';


interface EscapeGameOrganisationTableProps {
    data: GetEscapeGameDto [];
    OnDetails:(org: GetEscapeGameDto) => void;
    OnUpdate: (org: GetEscapeGameDto) => void;

}

const EscapeGameOrganisationTable: FC<EscapeGameOrganisationTableProps> = ({data, OnDetails, OnUpdate}) => {
    const [escageData]=useState<GetEscapeGameDto[]>(data);
    function FormatDate(dateString: string | null | undefined) {
        if (!dateString) return 'Date inconnue';
    
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Date inconnue' : new Intl.DateTimeFormat('fr-FR').format(date);
    
    }
    console.log("insertion data ");
    console.log(JSON.stringify(escageData));
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Titre</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Creation Date</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Session</TableCell>
                        <TableCell>Event</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {escageData.map((escapeGame) => (
                        <TableRow key={escapeGame.esgId.toString()}>
                            <TableCell>{escapeGame.esgId}</TableCell>
                            <TableCell>{escapeGame.esgTitle}</TableCell>
                            <TableCell>{escapeGame.esgContent}</TableCell>
                            <TableCell>
                                {FormatDate(escapeGame.esg_CreationDate)}
                            </TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EscapeGameOrganisationTable;