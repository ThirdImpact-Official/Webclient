import { FC } from "react";
import {
    Table,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    Button,
    Paper,
    Skeleton,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import FormUtils from "@/classes/FormUtils";

interface GenerationTableProps<T> {
    data: T[];
    columns: { label: string; accessor: keyof T }[];
    OnDetails?: (item: T) => void;
    OnUpdate?: (item: T) => void;
}

const GenericTable = <T,>({
    data,
    columns,
    OnDetails,
    OnUpdate
}: GenerationTableProps<T>) => {

    if (!data || data.length === 0) {
        return (
            <Box sx={{ p: 3 }}>
                <Skeleton variant="rectangular" height={200} />
                <Typography variant="body2" sx={{ mt: 2, color: "#57606a" }}>
                    No results found.
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: "6px",
                border: "1px solid #d0d7de",
                overflow: "hidden",
                backgroundColor: "#ffffff",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: "#f6f8fa",
                            borderBottom: "1px solid #d0d7de",
                        }}
                    >
                        {columns.map((col) => (
                            <TableCell
                                key={String(col.accessor)}
                                sx={{
                                    fontWeight: 600,
                                    color: "#24292f",
                                    fontSize: "0.875rem",
                                }}
                            >
                                {col.label}
                            </TableCell>
                        ))}

                        {(OnDetails || OnUpdate) && (
                            <TableCell
                                align="center"
                                sx={{
                                    fontWeight: 600,
                                    color: "#24292f",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Actions
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((item, index) => (
                        <TableRow
                            key={index}
                            hover
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#f6f8fa",
                                },
                                borderBottom: "1px solid #d8dee4",
                            }}
                        >
                            {columns.map((col) => {
                                const value = item[col.accessor];
                                const isDate =
                                    value instanceof Date ||
                                    (typeof value === "string" && !isNaN(Date.parse(value)));

                                return (
                                    <TableCell
                                        key={String(col.accessor)}
                                        sx={{ color: "#24292f" }}
                                    >
                                        {isDate
                                            ? FormUtils.FormatDate(value?.toString() ?? "")
                                            : value != null
                                            ? String(value)
                                            : ""}
                                    </TableCell>
                                );
                            })}

                            {(OnDetails || OnUpdate) && (
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} justifyContent="center">
                                        {OnDetails && (
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => OnDetails(item)}
                                                sx={{
                                                    borderColor: "#d0d7de",
                                                    color: "#24292f",
                                                    textTransform: "none",
                                                    "&:hover": {
                                                        backgroundColor: "#f3f4f6",
                                                        borderColor: "#b9c1c9",
                                                    },
                                                }}
                                            >
                                                Details
                                            </Button>
                                        )}

                                        {OnUpdate && (
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => OnUpdate(item)}
                                                sx={{
                                                    textTransform: "none",
                                                    borderColor: "#0969da",
                                                    "&:hover": {
                                                        backgroundColor: "#e7f3ff",
                                                        borderColor: "#0550ae",
                                                    },
                                                }}
                                            >
                                                Update
                                            </Button>
                                        )}
                                    </Stack>
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
