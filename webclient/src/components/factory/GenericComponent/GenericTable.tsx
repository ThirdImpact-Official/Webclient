import FormUtils from "@/classes/FormUtils";
import { Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Button, Paper, Skeleton } from "@mui/material";

interface GenerationTableProps<T> {
    data: T[];
    columns: { label: string; accessor: keyof T }[];
    OnDetails?: (org: T) => void;
    OnUpdate?: (org: T) => void;
}

const GenericTable = <T,>({ data, columns, OnDetails, OnUpdate }: GenerationTableProps<T>) => {
    // Affiche un Skeleton en mode chargement ou si aucune donnée n'est renvoyée.
    if (data.length === 0)
        return (
            <>
                <Skeleton variant="rectangular" height={200} />
            </>
        );

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={String(col.accessor)}>{col.label}</TableCell>
                        ))}
                        {OnDetails && <TableCell>Details</TableCell>}
                        {OnUpdate && <TableCell>Update</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            {columns.map((col) => {
                                  const value = item[col.accessor];
                                  const isDate = value instanceof Date || (!isNaN(Date.parse(value as string)) && typeof value === 'string');

                                  return (
                                    <TableCell key={String(col.accessor)}>
                                        {isDate
                                            ? FormUtils.FormatDate(value.toString())
                                            : value != null
                                                ? String(value)
                                                : ''}
                                    </TableCell>
                                );
                            })}
                            {OnDetails && (
                                <TableCell>
                                    <Button variant="outlined" onClick={() => OnDetails(item)}>
                                        Details
                                    </Button>
                                </TableCell>
                            )}
                            {OnUpdate && (
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => OnUpdate(item)}>
                                        Update
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GenericTable;
