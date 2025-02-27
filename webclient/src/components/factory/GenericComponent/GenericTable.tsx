import { Table, TableRow, TableCell,TableContainer,TableHead,TableBody, Button, Paper } from "@mui/material";


interface GenerationTableProps<T> {
    data: T[];
    columns: {label:string; accessor: keyof T}[];
    OnDetails: (org: T) => void;
    OnUpdate: (org: T) => void;
}


/**
 * GenericTable renders a table with columns and rows based on the given data.
 * It accepts an array of data and an array of column objects, where each column
 * object has a label and accessor key. It also accepts two optional functions
 * OnDetails and OnUpdate, which are called when the Details or Update buttons
 * are clicked.
 * @param {GenerationTableProps} props
 * @returns {React.ReactElement}
 */
const GenericTable =<T,> ({data, columns, OnDetails, OnUpdate}: GenerationTableProps<T>) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                        <TableCell key={col.accessor as string}>{col.label}</TableCell>
                    ))}
                    {OnDetails && <TableCell>Details</TableCell>}
                    {OnUpdate && <TableCell>Update</TableCell>}
                  
                    </TableRow>
                </TableHead>
                <TableBody>
                {data.map((item, index) => (
                        <TableRow key={index}>
                            {columns.map((col) => (
                            <TableCell key={col.accessor as string}>{String(item[col.accessor])}</TableCell>
                            ))}
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
    )
};

export default GenericTable;