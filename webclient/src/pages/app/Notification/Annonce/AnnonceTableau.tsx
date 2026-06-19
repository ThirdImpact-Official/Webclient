import React, { FC } from "react";
import { GetAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import { Typography, Box } from "@mui/material";

interface AnnonceTabsProps {
  data: GetAnnonceDto[];
  columns: { label: string; accessor: keyof GetAnnonceDto }[];
  onDetails: (org: GetAnnonceDto) => void;
  onUpdate: (org: GetAnnonceDto) => void;
}

const AnnonceTabs: FC<AnnonceTabsProps> = ({ data, columns, onDetails, onUpdate }) => {
  const handleDetails = (item: GetAnnonceDto) => onDetails(item);
  const handleUpdate = (item: GetAnnonceDto) => onUpdate(item);

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: "#57606a" }}>No data available</Typography>
      </Box>
    );
  }

  return (
    <GenericTable
      data={data}
      columns={columns}
      OnDetails={handleDetails}
      OnUpdate={handleUpdate}
    />
  );
};

export default AnnonceTabs;
