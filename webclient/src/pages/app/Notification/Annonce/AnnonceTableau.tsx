import React, { FC } from "react";
import { GetAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import GenericTable from "@/components/factory/GenericComponent/GenericTable";
import { data } from "react-router-dom";
import { Typography } from "@mui/material";

interface AnnonceTabsProps {
    data:GetAnnonceDto[];
    columns: {label:string; accessor: keyof GetAnnonceDto}[];
    onDetails:(org:GetAnnonceDto) => void;
    onUpdate:(org:GetAnnonceDto) => void;
}
const Anoncetabs:FC<AnnonceTabsProps> = (props) => {
    const handleDetails = (org:GetAnnonceDto) => {
        props.onDetails(org);
    }
    const handleUpdate = (org:GetAnnonceDto) => {
        props.onUpdate(org);
    }
    if(data === null || data === undefined)
    {

        return
        (
            <>
                <Typography>No data </Typography>
            </>
        )
    }
    else{
            return (
                <>
                    <GenericTable data={props.data} 
                    columns={props.columns} 
                    OnDetails={handleDetails} 
                    OnUpdate={handleUpdate}/>
                </>
            )
    }
}

export default Anoncetabs;