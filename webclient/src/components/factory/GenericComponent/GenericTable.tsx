

import { TableProps } from "@/interfaces/GenericInterface/GenericInterfaceComponent";
import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import Table from "@mui/material/Table";
import { TableRow, TableHead, Button, TableBody, TableCell } from "@mui/material";

function GenericTable<T>({ data, columns, actions }: TableProps<T>) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
    });

    const handleSort = (columnKey: keyof T) => {
        setSortConfig((prevConfig) => {
            if (prevConfig?.key === columnKey) {
                return { key: columnKey, direction: prevConfig.direction === "asc" ? "desc" : "asc" };
            }
            return { key: columnKey, direction: "asc" };
        });
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map(({ key, label, sortable }) => (
                        <TableCell key={String(key)}>
                            <div className="flex items-center gap-2">
                                {label}
                                {sortable && (
                                    <Button variant="text"  onClick={() => handleSort(key)}>
                                        {sortConfig?.key === key ? (
                                            sortConfig.direction === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                                        ) : (
                                            <ArrowUp size={16} className="opacity-50" />
                                        )}
                                    </Button>
                                )}
                            </div>
                        </TableCell>
                    ))}
                    {actions && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedData.map((row, index) => (
                    <TableRow key={index}>
                        {columns.map(({ key, render }) => (
                            <TableCell key={String(key)}>
                            {render ? render(row[key], row) : row[key] ?? "N/A"}
                        </TableCell>
                        ))}
                        {actions && <TableCell>{actions(row)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default GenericTable;
