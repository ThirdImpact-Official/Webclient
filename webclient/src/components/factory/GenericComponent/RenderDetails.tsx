import FormUtils from "@/classes/FormUtils";
import {  Grid2, Typography,Box } from "@mui/material";

import { FC } from "react";
import Item from "./Item";

interface RenderProps {
    label: string;
    value?: unknown;
}

const RenderDetail: FC<RenderProps> = ({ label, value }) => {

    const formatValue = (value: unknown): string => {
        if (value === null || value === undefined) return '';

        if (typeof value === 'number') {
            return value.toFixed(2);
        }

        if (typeof value === 'string') {
            // Vérifie si c'est une date ISO et la convertit
            if (!isNaN(Date.parse(value))) {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }); // Format MM/DD/YYYY
            }
            return value;
        }

        if (typeof value === 'boolean') {
            return value ? 'true' : 'false';
        }

        if (value instanceof Date) {
            return value.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }); // Format MM/DD/YYYY
        }

        if (typeof value === 'object') {
            if (FormUtils.isGetDifficultyLevelDto(value)) {
                return value.dowName;
            }

            if (FormUtils.isGetPriceDto(value)) {
                return value.indicePrice.toString();
            }

            return JSON.stringify(value, null, 2); // Format JSON plus lisible
        }

        return '';
    };

    return (
        <Grid2 container spacing={2} >
            <Box className="flex gap-4 justify-between text">
                <Box >
                    <Typography variant="h6" sx={{ textAlign: "start", color: "black" }}>
                        {label}:
                    </Typography>
                </Box>
                <Box sx={{ textAlign: "start", color: "black" }} >
                    <Typography variant="body1">
                        {formatValue(value)}
                    </Typography>
                </Box>
            </Box>
        </Grid2>
    );
};

export default RenderDetail;
