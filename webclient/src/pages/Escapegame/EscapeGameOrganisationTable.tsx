import { FC } from 'react';
import { GetEscapeGameDto } from '../../interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

interface EscapeGameOrganisationTableProps {
    data: GetEscapeGameDto [];
    OnDetails:(org: GetEscapeGameDto) => void;
    OnUpdate: (org: GetEscapeGameDto) => void;

}

const EscapeGameOrganisationTable: FC<EscapeGameOrganisationTableProps> = ({data, OnDetails, OnUpdate}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Creation Date</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Update</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((escapeGame) => (
                        <TableRow key={escapeGame.eSGId}>
                            <TableCell>{escapeGame.eSGId}</TableCell>
                            <TableCell>{escapeGame.eSGContent}</TableCell>
                            <TableCell>{escapeGame.eSGNom}</TableCell>
                            <TableCell>
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                }).format(new Date(escapeGame.eSG_CreationDate))}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => OnDetails(escapeGame)}>Details</Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => OnUpdate(escapeGame)}>Update</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EscapeGameOrganisationTable;