import { GetRatingDto } from "@/interfaces/EscapeGameInterface/Rating/Rating"
import { FC, useState } from "react";
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Button, Paper, Pagination, Box, Typography, Divider } from '@mui/material';

interface RatingtableProps
{
    data: GetRatingDto[];
    onClick:(item:GetRatingDto)=> void;
}

const RatingTable :FC<RatingtableProps> =(props)=> {

    const [dataTable,setDatatable]=useState<GetRatingDto[]>(props.data);
    return(
          <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>Id</TableCell>
                      <TableCell>titre</TableCell>
                        <TableCell>notes</TableCell>
                          <TableCell>Date de creation</TableCell>
                            <TableCell>details</TableCell>
                </TableHead>
                <TableBody>
                 
                    {dataTable.map((rate) => (
                        <TableRow key={rate.rateId}>
                            <TableCell>{rate.rateTitle}</TableCell>
                            <TableCell>{rate.notes}</TableCell>
                            <TableCell>{rate.creationDate}</TableCell>
                            <TableCell>
                                <Button onClick={() => props.onClick(rate)}>Details</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    </Table>
          </TableContainer>
    )
};

export default RatingTable;